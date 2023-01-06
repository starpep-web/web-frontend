pipeline {
  agent {
    label 'local-agent'
  }

  options {
    ansiColor('xterm')
    timestamps()
  }

  environment {
    DOCKER_IMAGE = 'webpep/web-frontend'
    DOCKER_REGISTRY = credentials('docker_registry')
  }

  stages {
    stage('Install Dependencies') {
      steps {
        echo 'Installing dependencies...'

        sh 'npm ci'
      }
    }

    stage('Run Tests') {
      steps {
        echo 'Running tests...'

        sh 'npm run lint'
      }
    }

    stage('Build Docker Image') {
      when {
        allOf {
          branch 'master'

          not {
            changeRequest()
          }
        }
      }

      steps {
        echo 'Building docker image...'

        script {
          image = docker.build(DOCKER_IMAGE)
        }
      }
    }

    stage('Deploy Docker Image') {
      when {
        allOf {
          branch 'master'

          not {
            changeRequest()
          }
        }
      }

      steps {
        echo 'Deploying docker image to registry...'

        script {
          docker.withRegistry(DOCKER_REGISTRY, 'nexus_account') {
            image.push('latest')
          }
        }
      }
    }
  }
}
