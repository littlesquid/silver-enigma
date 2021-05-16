const functions = require("firebase-functions");

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

const axios = require('axios')
const { lineCredentials } = require('./config');
const { googleSheetCredentials } = require('./config');
const { getGoogleSheetData } = require("./googlesheet");
const LINE_MESSAGING_API = 'https://api.line.me/v2/bot/message'
const LINE_HEADER = {
  'Content-Type': 'application/json',
  Authorization: `Bearer ${lineCredentials.ACCESS_TOKEN}`
}

//exports.lineWebhook = functions.https.onRequest(async (req, res) => {
exports.lineWebhook = functions.pubsub.schedule("* * * * *").timeZone("Asia/Bangkok").onRun(async context => {
    const googleSheetData = await getGoogleSheetData(googleSheetCredentials.SHEET_NAME,
        googleSheetCredentials.RANGE)
    
    broadcast(googleSheetData)

    return res.send("ok");
})
const broadcast = (datas) => {
    console.log("==== start broadcast ====")
    console.log(datas.values[0])
    let messages = [{
        "type":"flex",
        "altText":"Sales Report",
        "contents": 
            {
                "type": "bubble",
                "direction": "ltr",
                "header": {
                  "type": "box",
                  "layout": "vertical",
                  "backgroundColor": "#FFC66CFF",
                  "contents": [
                    {
                      "type": "text",
                      "text": "ยอดขายวันที่",
                      "weight": "bold",
                      "size": "lg",
                      "color": "#FFFFFFFF",
                      "align": "center",
                      "contents": []
                    },
                    {
                      "type": "text",
                      "text": getCurrentDate(),
                      "weight": "bold",
                      "size": "md",
                      "color": "#FFFFFFFF",
                      "align": "center",
                      "contents": []
                    }
                  ]
                },
                "body": {
                  "type": "box",
                  "layout": "vertical",
                  "contents": [
                    {
                      "type": "text",
                      "text": datas.values[0] + " บาท",
                      "weight": "bold",
                      "size": "lg",
                      "align": "center",
                      "contents": []
                    },
                    {
                      "type": "text",
                      "text": " xxxx ลิตร",
                      "weight": "bold",
                      "size": "lg",
                      "align": "center",
                      "contents": []
                    }
                  ]
                }
              }
        }]
    lineRestCaller("/broadcast", "post", messages)

    console.log("==== end broadcast ====")
}

const lineRestCaller = (endpoint, method, msgs) => {
    return axios({
        method: method,
        url: LINE_MESSAGING_API + endpoint,
        headers: LINE_HEADER,
        data: JSON.stringify({
            messages: msgs
        })
    })

}

const getCurrentDate = () => {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();
    return dd + '/' + mm + '/' + yyyy;
  }