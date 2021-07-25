const functions = require('firebase-functions');
const nodemailer = require('nodemailer');
const _cors = require("cors");
// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//     response.send("Hello from Firebase!");
// });


// exports.anotherHelloWorld = functions.https.onRequest((request, response) => {
//     response.send("Hello from Firebase!");
// });
const _ = require('lodash');
const { google } = require('googleapis');
const sheets = google.sheets('v4')

const spreadsheetId = '1oJQjNA1cdGmpTyo17rWZXzivdn0ZfW-rFdBSvCt9qKI'

const serviceAccount = require('./serviceAccount.json')

const jwtClient = new google.auth.JWT({
    email: serviceAccount.client_email,
    key: serviceAccount.private_key,
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],  // read and write sheets
})
const jwtAuthPromise = jwtClient.authorize()
const cors = _cors({ origin: true });

const new_line = "\n\xA0";

exports.sendEmail = functions.https.onRequest((request, response) => {
    cors(request, response, () => {
        var transporter = nodemailer.createTransport({
            //service: 'Gmail',
            host: 'smtp.zoho.com',
            port: 465,
            secure: true,
            auth: {
                user: 'support@nombox.app', // Your email id
                pass: 'Passworder123' // Your password
            }
        });
        var text = `Welcome ${request.body.fullName}! ${new_line} You are set to be Early Access Member at NomBox as ${request.body.registrationType} .`;
        var mailOptions = {
            from: 'support@nombox.app', // sender address
            to: request.body.email, // list of receivers
            subject: 'Nombox Membership Confirmation', // Subject line
            text: text, //, // plaintext body     
        };

        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
                response.json({ notSent: error });
            } else {
                console.log('Message sent: ' + info.response);
                response.json({ sent: info.response });
            };
        });
    });
});
exports.copyDataToSheet = functions.database.ref('/registrationData').onUpdate(change => {
    const data = change.after.val()
    console.info(jwtAuthPromise, "jwtAuthPromise")
    console.info(data, "DATA_____>AFTERCHANGEE")
    // Sort the scores.  scores is an array of arrays each containing name and score.
    const users = []
    _.map(data, (value, key) => {
        if (typeof value === "object") {
            //  [key,'']  
            users.push([key, " "])
            _.map(value, (val, key) => {
                users.push([key, val])
            })
        }
        // console.info(data, "data----->check data", value, "---->value", key, "---->key")

        //    return [key, value]
        return users
    }
    )
    // users.sort((a, b) => { return b[1] - a[1] })
    console.info("users____>>>>", users)
    // const users = data

    console.info(jwtAuthPromise, "jwtAuthPromise")
    jwtAuthPromise
    console.info(jwtAuthPromise, "jwtAuthPromise----->Await")
    sheets.spreadsheets.values.update({
        auth: jwtClient,
        spreadsheetId: spreadsheetId,
        range: 'RegistrationData!A2:B1000',  // update this range of cells
        valueInputOption: 'RAW',
        requestBody: { values: users }
    }, {})
})