pipeline {
    agent any

    environment {
        UFS_BIN_FILE = 'ace6.bin'
      
        PYTHON = 'python' // 如果你用的是 Windows 或 pyenv，這裡可以改成 python
    }

    stages {
        stage('Checkout') {
            steps {
                echo '🔄 Clone GitHub Repo: CICD...'
                git url: 'https://github.com/YiChiaPeng/CICD.git', branch: 'main'
            }
        }

        stage('Firmware upload') {
            steps {
                echo 'Firmware upload'
                sh "${PYTHON} ./script/SVD-ACEHandler.py -sys VCT6 -pjn ${env.JOB_NAME} -pth ${UFS_BIN_FILE}"
                
            }
        }
        

        stage('Engineering Sample Test (ES)') {
            steps {
                echo 'Run Engineering Sample Test (ES)'
                sh "${PYTHON} ./script/SVD-ACEHandler.py -sys VCT6 -pjn ${env.JOB_NAME} -tv ES"
                
            }
        }


        stage('Qualified Sample Test (QS)') {
            steps {
                echo 'Run Qualified Sample Test (QS)'
                sh "${PYTHON} ./script/SVD-ACEHandler.py -sys VCT6 -pjn ${env.JOB_NAME} -tv QS"
                
            }
        }


        stage('Commercial Test (CS)') {
            steps {
                echo 'Run Commercial Test (CS)'
                sh "${PYTHON} ./script/SVD-ACEHandler.py -sys VCT6 -pjn ${env.JOB_NAME} -tv CS"
                
            }
        }



        
        

        // stage('Deploy .bin to Remote Server') {
        //     steps {
        //         script {
        //             if (fileExists("${BIN_FILE}")) {
        //                 echo "🚀 上傳 ${BIN_FILE} 到 ${DEPLOY_HOST}:${DEPLOY_PATH}/"
        //                 sshagent(credentials: ['deploy-key']) {
        //                     sh """
        //                         ssh -o StrictHostKeyChecking=no ${DEPLOY_USER}@${DEPLOY_HOST} '
        //                             mkdir -p ${DEPLOY_PATH}'
        //                         scp ${BIN_FILE} ${DEPLOY_USER}@${DEPLOY_HOST}:${DEPLOY_PATH}/
        //                     """
        //                 }
        //             } else {
        //                 error "❌ 找不到 ${BIN_FILE}，請確認它存在於 repo 中"
        //             }
        //         }
        //     }
        // }
    }

        
    
    // post {
    //     success {
    //         slackSend(
    //             webhookUrl: "${SLACK_WEBHOOK}",
    //             message: "✅ Jenkins Pipeline 成功：`.bin` 已上傳，Python 測試通過。",
    //             color: 'good'
    //         )
    //     }
    //     failure {
    //         slackSend(
    //             webhookUrl: "${SLACK_WEBHOOK}",
    //             message: "❌ Pipeline 失敗：${env.JOB_NAME} #${env.BUILD_NUMBER}，請查看 Console Output。",
    //             color: 'danger'
    //         )
    //     }
    // }
}