
const refreshBtn = document.getElementById("refreshBtn");


// ========================================
// 1. FORMAT APPLICATION UPTIME
// ========================================

function formatUptime(seconds) {

    const days = Math.floor(seconds / 86400);
    const hours = Math.floor((seconds % 86400) / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = Math.floor(seconds % 60);

    return `${days}d ${hours}h ${minutes}m ${remainingSeconds}s`;
}


// ========================================
// 2. DISPLAY SERVICE CARDS
// ========================================

function renderServices(services) {

    const serviceGrid = document.getElementById("serviceGrid");

    serviceGrid.innerHTML = "";

    services.forEach(service => {

        let badgeClass = "status-pending";

        if (service.status === "Healthy") {
            badgeClass = "status-healthy";
        }
        else if (service.status === "Down") {
            badgeClass = "status-down";
        }

        const card = document.createElement("div");
        card.className = "service-card";

        const name = document.createElement("h3");
        name.textContent = service.name;

        const description = document.createElement("p");
        description.textContent = service.description;

        const footer = document.createElement("div");
        footer.className = "service-footer";

        const type = document.createElement("span");
        type.className = "service-type";
        type.textContent = service.type;

        const badge = document.createElement("span");
        badge.className = `status-badge ${badgeClass}`;
        badge.textContent = service.status;

        footer.append(type, badge);
        card.append(name, description, footer);

        serviceGrid.appendChild(card);

    });
}


// ========================================
// 3. DISPLAY INCIDENT HISTORY
// ========================================

function renderIncidents(incidents) {

    const incidentList = document.getElementById("incidentList");

    incidentList.innerHTML = "";

    if (!incidents || incidents.length === 0) {

        incidentList.textContent = "No incidents recorded yet.";
        return;
    }

    incidents.forEach(incident => {

        const card = document.createElement("div");
        card.className = "incident-item";

        const title = document.createElement("h4");
        title.textContent = incident.service_name;

        const message = document.createElement("p");
        message.textContent = incident.message;

        const status = document.createElement("span");
        status.className = "incident-status";
        status.textContent = incident.status;

        const time = document.createElement("small");

        time.textContent =
            "Created: " +
            new Date(incident.created_at).toLocaleString();

        card.append(title, message, status, time);

        incidentList.appendChild(card);

    });
}


// ========================================
// 4. PROFESSIONAL NOTIFICATION CENTER
// ========================================

function renderNotifications(notifications) {

    const notificationList = document.getElementById("notificationList");

    notificationList.innerHTML = "";

    if (!notifications || notifications.length === 0) {

        const emptyMessage = document.createElement("p");

        emptyMessage.textContent = "No notifications available.";

        notificationList.appendChild(emptyMessage);

        return;
    }

    notifications.forEach(notification => {

        const isDown = notification.alert_type === "Down";

        // Main notification card
        const item = document.createElement("div");

        item.className = "notification-item";

        item.classList.add(
            isDown ? "notification-down" : "notification-recovery"
        );


        // Alert title
        const title = document.createElement("h4");

        title.textContent = isDown
            ? "⚠ SERVICE DOWN ALERT"
            : "✓ SERVICE RECOVERED";


        // Severity badge
        const badge = document.createElement("span");

        badge.className = "notification-badge";

        badge.textContent = isDown ? "CRITICAL" : "RESOLVED";

        badge.classList.add(
            isDown ? "badge-critical" : "badge-resolved"
        );


        // Service name
        const service = document.createElement("h3");

        service.textContent = notification.service_name;


        // Service status
        const status = document.createElement("p");

        status.className = "notification-status";

        status.textContent = isDown
            ? "SERVICE UNAVAILABLE"
            : "SERVICE RESTORED";


        // Notification message
        const message = document.createElement("p");

        message.textContent = notification.message;


        // Notification time
        const time = document.createElement("small");

        time.textContent =
            "Alert Time: " +
            new Date(notification.created_at).toLocaleString();


        // Add all elements to card
        item.append(
            title,
            badge,
            service,
            status,
            message,
            time
        );

        notificationList.appendChild(item);

    });
}


// ========================================
// 5. LOAD DASHBOARD DATA
// ========================================

async function loadDashboard() {

    if (!refreshBtn) {
        console.error("Refresh button not found.");
        return;
    }

    refreshBtn.disabled = true;
    refreshBtn.textContent = "Refreshing...";

    try {

        const response = await fetch("/api/dashboard");

        if (!response.ok) {
            throw new Error("Dashboard API failed");
        }

        const data = await response.json();

        const services = data.services || [];

        // Display incidents and notifications
        renderIncidents(data.incidents);
        renderNotifications(data.notifications);


        // Calculate service statistics
        const healthy = services.filter(
            service => service.status === "Healthy"
        ).length;

        const down = services.filter(
            service => service.status === "Down"
        ).length;

        const pending = services.filter(
            service => service.status === "Not Connected"
        ).length;


        // Update total services
        document.getElementById("totalServices").textContent =
            services.length;

        document.getElementById("healthyServices").textContent =
            healthy;

        document.getElementById("downServices").textContent =
            down;

        document.getElementById("pendingServices").textContent =
            pending;


        // Update overall system status
        const overallStatus =
            document.getElementById("overallStatus");

        if (down > 0) {

            overallStatus.textContent = "Issues Detected";
            overallStatus.style.color = "#f87171";

        }
        else {

            overallStatus.textContent = "Operational";
            overallStatus.style.color = "#4ade80";

        }


        // Update application uptime
        document.getElementById("uptime").textContent =
            formatUptime(data.uptime_seconds);


        // Update last checked time
        document.getElementById("lastChecked").textContent =
            new Date(data.last_checked).toLocaleTimeString();


        // Display service cards
        renderServices(services);


    }

    catch (error) {

        document.getElementById("overallStatus").textContent =
            "Connection Error";

        document.getElementById("overallStatus").style.color =
            "#f87171";

        document.getElementById("serviceGrid").textContent =
            "Unable to load service information.";

        console.error("Monitoring error:", error);

    }

    finally {

        refreshBtn.disabled = false;
        refreshBtn.textContent = "↻ Refresh";

    }
}


// ========================================
// 6. MANUAL REFRESH
// ========================================

if (refreshBtn) {

    refreshBtn.addEventListener("click", loadDashboard);

}


// ========================================
// 7. INITIAL DASHBOARD LOAD
// ========================================

loadDashboard();


// ========================================
// 8. AUTOMATIC REFRESH EVERY 10 SECONDS
// ========================================

setInterval(loadDashboard, 10000);
