
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
                bat 'py --version'
                bat 'py -m venv .venv'
                bat '.venv\\Scripts\\python.exe -m pip install -r requirements.txt'
            }
        }

        stage('Code Validation') {
            steps {
                bat '.venv\\Scripts\\python.exe -m py_compile app.py mock_service.py'
                echo 'Python syntax validation successful'
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
