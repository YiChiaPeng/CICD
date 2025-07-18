pipeline {
    agent any

    environment {
        UFS_BIN_FILE = 'ace6.bin'
      
        PYTHON = 'python3.8' // 如果你用的是 Windows 或 pyenv，這裡可以改成 python
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

            parallel {
                stage('Main Job'){
                    steps {
                        echo 'Run Engineering Sample Test (ES)'
                        sh "${PYTHON} ./script/SVD-ACEHandler.py -sys VCT6 -pjn ${env.JOB_NAME} -tv ES"
                    }
                }
                
                stage("Sending Email"){
                    
                    steps {
                        script {

                            def totalHours = 0
                            def startTime = new Date().format("yyyy-MM-dd HH:mm:ss")
                            while (totalHours < 72) {
                                
                                def htmlBody = """
                                <html>
                                <body>
                                <h3>📋 SVD ACE6 測試報告</h3>
                                <table border="1" cellpadding="5" cellspacing="0" style="border-collapse: collapse;">
                                <tr><th>項目</th><th>內容</th></tr>
                                <tr><td>Platform</td><td>ACE6 (@SVD_Lab)</td></tr>
                                <tr><td>SVD Lab ACE6 Project</td><td>RT_ACE6600_DVT_Web_Test</td></tr>
                                <tr><td>SVD Lab ACE6 Project IP</td><td><a href="https://svdno6.siliconmotion.com.tw/home/groups/26">連結</a></td></tr>
                                <tr><td>SVD Lab ACE6 u-boot</td><td>Congrats提供</td></tr>
                                <tr><td>FW version</td><td>Congrats提供</td></tr>
                                <tr><td>Sample</td><td>Congrats提供</td></tr>
                                <tr><td>MP method</td><td>Congrats提供</td></tr>
                                <tr><td>Start Time</td><td>${startTime}</td></tr>
                                <tr><td>Ongoing Time</td><td>${totalHours}小時</td></tr>
                                <tr><td>Reflow status</td><td>ESDVT</td></tr>
                                <tr><td>Jenkins Job URL</td><td><a href="${env.BUILD_URL}">${env.BUILD_URL}</a></td></tr>
                                </table>
                                </body>
                                </html>
                                """
                        
                                mail (
                                    to: 'kent.peng@siliconmotion.com',
                                    subject: "📋 [SVD ACE6 測試報告] ${env.JOB_NAME} #${env.BUILD_NUMBER}",
                                    body: htmlBody,
                                    mimeType: 'text/html'
                                )
                                sleep time: 24, unit: 'HOURS'
                                totalHours += 24
                            }
                        }
                        
                    }
                }
            
            }    
            
        }

       




        // stage('Qualified Sample Test (QS)') {
        //     steps {
        //         echo 'Run Qualified Sample Test (QS)'
        //         sh "${PYTHON} ./script/SVD-ACEHandler.py -sys VCT6 -pjn ${env.JOB_NAME} -tv QS"
                
        //     }
        // }


        // stage('Commercial Test (CS)') {
        //     steps {
        //         echo 'Run Commercial Test (CS)'
        //         sh "${PYTHON} ./script/SVD-ACEHandler.py -sys VCT6 -pjn ${env.JOB_NAME} -tv CS"
                
        //     }
        // }



        
        

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