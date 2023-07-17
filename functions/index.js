/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

const {onRequest} = require("firebase-functions/v2/https");
const logger = require("firebase-functions/logger");

// const functions = require("firebase-functions");
// // const bigquery = require("@google-cloud/bigquery");
// const admin = require("firebase-admin");
// admin.initializeApp(functions.config().firebase);

// // query my bigquery table with project-id of: whoheskatefor
// const bigQuery = bigQuery({projectId: "whoheskatefor"});
// bigQuery.query({
//   query: "SELECT * FROM `whoheskatefor.testdataset.CombinedView` LIMIT 10",
// }).then((results) => {
//   // var ref = admin.database().ref('');

//   const rows = results[0]; // get all fetched table rows

//   console.log(rows);
//   // rows.forEach(function(row){ //iterate through each row
//   //         column1:row['col1'],
//   //         column2:row['col2']
//   //     });
//   // });
//   // return result
// }).catch((error) => {
//   // return an error
//   console.log(error);
// });


// Create and deploy your first functions
// https://firebase.google.com/docs/functions/get-started

exports.helloWorld = onRequest((request, response) => {
  logger.info("Hello logs!", {structuredData: true});
  response.send("Hello from Firebase!");
});
