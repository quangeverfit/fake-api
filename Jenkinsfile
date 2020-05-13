def agentLabel
def repoNamespace
if (BRANCH_NAME == "dev") {
  agentLabel    = "slave01"
  repoNamespace = "dev"
} else {
  if (BRANCH_NAME == "master") {
    agentLabel    = "slave01"
    repoNamespace = "prod"
  }
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
    AWS_ACCESS_KEY_ID     = credentials('AWS_ACCESS_KEY_ID')
    AWS_SECRET_ACCESS_KEY = credentials('AWS_SECRET_ACCESS_KEY')
    AWS_DEFAULT_REGION    = credentials('AWS_DEFAULT_REGION')
    IMAGE_REPOSITORY_URL  = credentials('IMAGE_REPOSITORY_URL')
    REPO_NAMESPACE        = "${repoNamespace}"
    IMAGE_TAG_DATE        = """${sh(
                               returnStdout: true,
                               script: "date +%Y%m%d%H%M"
                            )}"""
    IMAGE_TAG             = "${BUILD_NUMBER}.${IMAGE_TAG_DATE}"
    IMAGE_URL_WITHOUT_VER = "$IMAGE_REPOSITORY_URL/everfit-demo-$REPO_NAMESPACE/api"
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
        sh 'bash ./ci/build.sh'
      }
    }

    stage('Push') {
      steps {
        sh 'bash ./ci/push.sh'
      }
    }
  }
  post { 
    always { 
      sh 'bash ./ci/clean.sh'
    }
  }
}
