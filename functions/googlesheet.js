const {google} = require('googleapis')
const sheets = google.sheets('v4')
const serviceAccount = require('./credential.json')
const {googleSheetCredentials} = require('./config')

const getGoogleSheetData = async (sheet, range) => {
    const jwtClient = new google.auth.JWT({
        email: serviceAccount.client_email,
        key: serviceAccount.private_key,
        scopes: ['https://www.googleapis.com/auth/spreadsheets']
    })

    const params = {
        auth: jwtClient,
        spreadsheetId: googleSheetCredentials.SPREADSHEET_ID,
        range: `${sheet}!${range}`
      }
    let data = []
      try {
        data = (await sheets.spreadsheets.values.get(params)).data
      } catch (err) {
        console.error(err.message)
      }
    return data
}

    module.exports = { getGoogleSheetData }
