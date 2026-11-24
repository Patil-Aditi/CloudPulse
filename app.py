
import sqlite3
import requests
import time

from flask import Flask, render_template, jsonify
from datetime import datetime, timezone


app = Flask(__name__)

# Database configuration
DATABASE = "cloudpulse.db"


# Current timestamp
def current_time():
    return datetime.now(timezone.utc).isoformat()


# Create database tables
def init_db():
    conn = sqlite3.connect(DATABASE)

    # Notifications table
    conn.execute("""
        CREATE TABLE IF NOT EXISTS notifications (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            service_name TEXT NOT NULL,
            message TEXT NOT NULL,
            alert_type TEXT NOT NULL,
            created_at TEXT NOT NULL
        )
    """)

    # Incidents table
    conn.execute("""
        CREATE TABLE IF NOT EXISTS incidents (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            service_name TEXT NOT NULL,
            message TEXT NOT NULL,
            status TEXT NOT NULL,
            created_at TEXT NOT NULL,
            resolved_at TEXT
        )
    """)

    conn.commit()
    conn.close()


# Create a new incident
def create_incident(service_name):
    conn = sqlite3.connect(DATABASE)

    conn.execute(
        """
        INSERT INTO incidents
        (service_name, message, status, created_at)
        VALUES (?, ?, ?, ?)
        """,
        (
            service_name,
            f"{service_name} is Down",
            "Open",
            current_time()
        )
    )

    conn.commit()
    conn.close()


# Resolve an open incident
def resolve_incident(service_name):
    conn = sqlite3.connect(DATABASE)

    conn.execute(
        """
        UPDATE incidents
        SET status = ?, resolved_at = ?
        WHERE service_name = ? AND status = ?
        """,
        (
            "Resolved",
            current_time(),
            service_name,
            "Open"
        )
    )

    conn.commit()
    conn.close()


# Get incident history
def get_incidents():
    conn = sqlite3.connect(DATABASE)
    conn.row_factory = sqlite3.Row

    incidents = conn.execute(
        """
        SELECT * FROM incidents
        ORDER BY id DESC
        """
    ).fetchall()

    conn.close()

    return [dict(incident) for incident in incidents]


# Create notification
def create_notification(service_name, message, alert_type):
    conn = sqlite3.connect(DATABASE)

    conn.execute(
        """
        INSERT INTO notifications
        (service_name, message, alert_type, created_at)
        VALUES (?, ?, ?, ?)
        """,
        (
            service_name,
            message,
            alert_type,
            current_time()
        )
    )

    conn.commit()
    conn.close()


# Get notification history
def get_notifications():
    conn = sqlite3.connect(DATABASE)
    conn.row_factory = sqlite3.Row

    notifications = conn.execute(
        """
        SELECT * FROM notifications
        ORDER BY id DESC
        """
    ).fetchall()

    conn.close()

    return [dict(notification) for notification in notifications]


# Application start time
start_time = time.monotonic()


# Home route
@app.route("/")
def home():
    return render_template("index.html")


# Health check route
@app.route("/health")
def health():
    return jsonify({
        "project": "CloudPulse",
        "status": "Healthy",
        "message": "Application is running successfully"
    })


# Dashboard API
@app.route("/api/dashboard")
def dashboard():

    uptime_seconds = int(time.monotonic() - start_time)

    services = [
        {
            "name": "CloudPulse API",
            "type": "Backend",
            "status": "Healthy",
            "description": "Flask application"
        },
        {
            "name": "Database",
            "type": "Storage",
            "status": "Not Connected",
            "description": "Database integration pending"
        },
        {
            "name": "Background Worker",
            "type": "Worker",
            "status": "Not Connected",
            "description": "Worker integration pending"
        },
        {
            "name": "Cache Service",
            "type": "Cache",
            "status": "Not Connected",
            "description": "Cache integration pending"
        }
    ]

    # Check Test Service health
    try:
        response = requests.get(
            "http://test-service:5001/health",
            timeout=3
        )

        print(
            "Test Service HTTP Status:",
            response.status_code,
            flush=True
        )

        if response.status_code == 200:
            test_status = "Healthy"
        else:
            test_status = "Down"

    except requests.RequestException as error:

        print(
            "Test Service Error:",
            repr(error),
            flush=True
        )

        test_status = "Down"

    # Check open incident
    conn = sqlite3.connect(DATABASE)

    open_incident = conn.execute(
        """
        SELECT id FROM incidents
        WHERE service_name = ? AND status = ?
        """,
        ("Test Service", "Open")
    ).fetchone()

    conn.close()

    # Incident detection
    if test_status == "Down":

        if open_incident is None:

            create_incident("Test Service")

            create_notification(
                "Test Service",
                "Test Service is Down. Service is not responding.",
                "Down"
            )

    else:

        if open_incident is not None:

            resolve_incident("Test Service")

            create_notification(
                "Test Service",
                "Test Service recovered successfully.",
                "Recovery"
            )

    # Add Test Service
    services.append({
        "name": "Test Service",
        "type": "Monitoring",
        "status": test_status,
        "description": "External Flask test service"
    })

    # Get incident and notification history
    incidents = get_incidents()
    notifications = get_notifications()

    # Calculate overall status
    overall_status = (
        "Issues Detected"
        if any(service["status"] == "Down" for service in services)
        else "Operational"
    )

    # Return dashboard data
    return jsonify({
        "project": "CloudPulse",
        "overall_status": overall_status,
        "uptime_seconds": uptime_seconds,
        "last_checked": current_time(),
        "services": services,
        "incidents": incidents,
        "notifications": notifications
    })


# Start application
if __name__ == "__main__":

    init_db()

    app.run(
        host="0.0.0.0",
        port=5000,
        debug=True
    )
