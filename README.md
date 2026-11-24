# ☁️ CloudPulse – Smart Cloud Monitoring & Incident Management Platform

CloudPulse is a Python Flask-based web application designed to monitor service health, detect failures, track incidents, and maintain notification history through a centralized dashboard.

The project uses Docker and Docker Compose to run the application and its test service in separate containers. The goal is to build a practical cloud monitoring platform while learning real-world Cloud and DevOps practices.

## 🎯 Project Objectives

- Monitor application and service health.
- Detect service failures automatically.
- Create and track incidents.
- Generate alerts when services go down.
- Track service recovery.
- Display monitoring information through a centralized dashboard.
- Implement containerization and DevOps practices.

## 🚀 Features Implemented

- **Monitoring Dashboard:** Displays overall system status and service information.
- **HTTP Health Check:** Monitors a test service through an HTTP health endpoint.
- **Incident Management:** Automatically creates incidents when the monitored service goes down.
- **Incident Resolution:** Detects service recovery and resolves open incidents.
- **Notification History:** Stores service-down and recovery notifications.
- **Auto Refresh:** Updates dashboard information every 10 seconds.
- **SQLite Database:** Stores incident and notification records.
- **Docker Containerization:** Runs CloudPulse and Test Service in separate containers.
- **Docker Compose:** Manages multiple containers through a single configuration file.
- **Docker Networking:** Enables communication between containers using service names.
- **Docker Ignore:** Excludes unnecessary files from the Docker build context.

## 🛠️ Technology Stack

| Category                | Technologies          |
| ----------------------- | --------------------- |
| Backend                 | Python, Flask         |
| Frontend                | HTML, CSS, JavaScript |
| Database                | SQLite                |
| HTTP Monitoring         | Python Requests       |
| Containerization        | Docker                |
| Container Orchestration | Docker Compose        |
| Version Control         | Git, GitHub           |

## 🏗️ Project Architecture

```text
                  User
                    |
                    v
            CloudPulse Dashboard
                    |
                    v
              Flask Backend
                    |
          HTTP Health Check
                    |
                    v
              Test Service
                    |
             Docker Network
                    |
                    v
             Health Response

              Flask Backend
                    |
                    v
              SQLite Database
               /          \
              v            v
          Incidents    Notifications
              \            /
               v          v
             Dashboard Updates
```

### Docker Architecture

- `cloudpulse` – Flask monitoring application running on port 5000.
- `test-service` – External Flask test service running on port 5001.
- Both containers communicate through the Docker Compose default network.
- CloudPulse accesses the test service using `http://test-service:5001/health`.

## 📂 Project Structure

```text
CloudPulse/
│
├── app.py
├── mock_service.py
├── requirements.txt
├── Dockerfile
├── Dockerfile.test
├── docker-compose.yml
├── .dockerignore
├── .gitignore
│
├── templates/
│   └── index.html
│
└── static/
    ├── css/
    │   └── style.css
    └── js/
        └── script.js
```

## ⚙️ Run Locally

### 1. Clone the repository

```bash
git clone https://github.com/Patil-Aditi/CloudPulse.git
cd CloudPulse
```

### 2. Create a virtual environment

```powershell
py -m venv venv
```

### 3. Activate the environment

```powershell
.\venv\Scripts\Activate.ps1
```

### 4. Install dependencies

```bash
pip install -r requirements.txt
```

### 5. Start the Test Service

Open a separate terminal:

```bash
py mock_service.py
```

### 6. Start CloudPulse

In the project terminal:

```bash
py app.py
```

### 7. Open the dashboard

Visit:

http://127.0.0.1:5000

## 🐳 Run Using Docker Compose

Make sure Docker Desktop is running.

### 1. Build and start containers

```bash
docker compose up --build -d
```

### 2. Check running containers

```bash
docker compose ps
```

### 3. Access CloudPulse Dashboard

http://127.0.0.1:5000

### 4. Access Test Service

http://127.0.0.1:5001/health

### 5. View application logs

```bash
docker compose logs -f
```

### 6. Stop containers

```bash
docker compose down
```

## 🧪 Testing

### Service Health Testing

- Start both applications and verify that Test Service shows Healthy.
- Stop the test service:

```bash
docker compose stop test-service
```

- Verify that CloudPulse detects the failure.
- Check that an incident and a critical notification are created.
- Restart the test service:

```bash
docker compose start test-service
```

- Verify that the service becomes Healthy.
- Confirm that the incident is resolved and a recovery notification appears.

## 🔮 Future Enhancements / Roadmap

- [x] Flask monitoring dashboard
- [x] HTTP health checks
- [x] Incident management and resolution
- [x] Notification history
- [x] Docker containerization
- [x] Docker Compose
- [x] Docker networking
- [ ] Jenkins CI pipeline
- [ ] Kubernetes deployment
- [ ] Google Kubernetes Engine (GKE) deployment
- [ ] Cloud monitoring integration
- [ ] Real database and cache health monitoring
- [ ] Background worker monitoring
- [ ] Advanced alerting and monitoring features

## 📌 Project Status

**Currently in Development**

CloudPulse is being developed step by step as a hands-on Cloud and DevOps learning project. New features and infrastructure integrations will be added progressively.

## 👩‍💻 Author

**Aditi Patil**

- GitHub: https://github.com/Patil-Aditi
- Project: https://github.com/Patil-Aditi/CloudPulse
