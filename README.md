# ☁️ CloudPulse – Smart Cloud Monitoring & Incident Management Platform

CloudPulse is a Python Flask-based web application designed to monitor service health, detect failures, track incidents, and maintain notification history through a centralized dashboard.

The goal of this project is to build a practical cloud monitoring platform and gradually integrate DevOps tools and cloud technologies.

## 🎯 Project Objectives

- Monitor application and service health.
- Detect service failures automatically.
- Create and track incidents.
- Generate alerts when services go down.
- Track service recovery.
- Display monitoring information through a centralized dashboard.
- Learn and implement real-world DevOps practices.

## 🚀 Features Implemented

- **Monitoring Dashboard:** Displays overall system status and service information.
- **HTTP Health Check:** Monitors a test service through an HTTP health endpoint.
- **Incident Management:** Automatically creates incidents when the monitored service goes down.
- **Incident Resolution:** Detects recovery and resolves open incidents.
- **Notification History:** Stores service-down and recovery notifications.
- **Auto Refresh:** Updates dashboard information every 10 seconds.
- **SQLite Database:** Stores incident and notification records.

## 🛠️ Technology Stack

| Category        | Technologies          |
| --------------- | --------------------- |
| Backend         | Python, Flask         |
| Frontend        | HTML, CSS, JavaScript |
| Database        | SQLite                |
| HTTP Monitoring | Python Requests       |
| Version Control | Git, GitHub           |

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
  +---- HTTP Health Check
  |          |
  |          v
  |      Test Service
  |
  +---- SQLite Database
  |          |
  |          +---- Incidents
  |          +---- Notifications
  |
  v
Dashboard Updates
```

## 📂 Project Structure

```text
CloudPulse/
│
├── app.py
├── mock_service.py
├── requirements.txt
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

```bash
py -m venv venv
```

### 3. Activate the environment (Windows PowerShell)

```powershell
.\venv\Scripts\Activate.ps1
```

### 4. Install dependencies

```bash
pip install -r requirements.txt
```

### 5. Start the test service

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

## 🧪 Testing

- Start both applications and verify that the Test Service shows Healthy.
- Stop the test service using `Ctrl + C` and check whether CloudPulse detects the failure.
- Verify that an incident and a service-down notification are created.
- Restart the test service and verify that the incident is resolved and a recovery notification appears.

## 🔮 Future Enhancements / Roadmap

The following features are planned for future development:

- [ ] Docker containerization
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
