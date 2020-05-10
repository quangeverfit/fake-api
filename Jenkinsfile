def agentLabel
if (BRANCH_NAME == "dev") {
    agentLabel = "slave01"
} else {
    agentLabel = "slave01"
}

def agentCredential
agentCredential = "${agentLabel.toUpperCase()}_USERNAME_PASSWORD"

pipeline {
  agent {
    node {
      label agentLabel
    }
  }

  environment {
    AWS_ACCESS_KEY_ID     = credentials('AWS_ACCESS_KEY')
    AWS_SECRET_ACCESS_KEY = ""
  }

  stages {
    stage('Build') {
      when {
        branch 'dev'
      }
      environment {
          USERNAME_PASSWORD = credentials("${agentCredential}")
      }
      steps {
        withCredentials(bindings: [file(credentialsId: 'SAMPLE_ENV_FILE', variable: 'envfile')]) {
          sh "echo $USERNAME_PASSWORD_PSW | sudo -S cp $envfile .env"
          sh "cat .env"
        }
        sh 'bash ./ci/jenkin.sh'
      }
    }

    stage('Clean') {
      steps {
        sh 'bash ./ci/clean.sh'
      }
    }
  }
}
