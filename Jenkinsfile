
pipeline {
    agent any

    options {
        timestamps()
        disableConcurrentBuilds()
    }

    stages {

        stage('Checkout') {
            steps {
                checkout scm
                echo 'CloudPulse source code checked out successfully'
            }
        }

        stage('Python Setup') {
            steps {
                bat '"C:\\Users\\VICTUS\\AppData\\Local\\Programs\\Python\\Python312\\python.exe" --version'
                bat '"C:\\Users\\VICTUS\\AppData\\Local\\Programs\\Python\\Python312\\python.exe" -m venv .venv'
                bat '.venv\\Scripts\\python.exe -m pip install -r requirements.txt'
            }
        }

        stage('Code Validation') {
            steps {
                bat '.venv\\Scripts\\python.exe -m py_compile app.py mock_service.py'
                echo 'Python syntax validation successful'
            }
        }

        stage('Docker Environment Check') {
            steps {
                bat 'docker --version'
                bat 'docker info --format "{{.ServerVersion}}"'
                echo 'Docker is accessible from Jenkins'
            }
        }


        stage('Docker Image Build') {
            steps {
                bat 'docker build -t cloudpulse:latest .'
                echo 'CloudPulse Docker image built successfully'
            }
        }

    }

    post {
        success {
            echo 'CloudPulse CI Pipeline completed successfully!'
        }

        failure {
            echo 'CloudPulse CI Pipeline failed. Check the console output.'
        }
    }
}
