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
    stage('Run Tests') {
      agent {
        docker {
          image 'node:16-alpine'
          reuseNode true
        }
      }

      steps {
        echo 'Running tests...'

        sh 'npm ci'
        sh 'npm run lint'
        sh 'npm test'
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
