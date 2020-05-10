def agentLabel
if (BRANCH_NAME == "dev") {
    agentLabel = "slave01"
} else {
    agentLabel = "slave01"
}


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
        USERNAME_PASSWORD = credentials('SAMPLE_USERNAME_PASSWORD_CREDENTIAL')
      }
      steps {
        sh 'printenv'
        withCredentials(bindings: [file(credentialsId: 'SAMPLE_ENV_FILE', variable: 'envfile')]) {
          sh "cp $envfile .env"
          sh "cat .env"
        }
        sh 'docker --version'
        sh 'docker-compose --version'
        sh 'bash ./ci/jenkin.sh'
      }
    }
  }
}
