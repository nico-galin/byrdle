const functions = require("firebase-functions");
const admin = require('firebase-admin');

exports.generateWords = functions.pubsub.schedule('0 0 * * *')
    .timeZone('America/Los_Angeles') // Users can choose timezone - default is America/Los_Angeles
    .onRun(async (context) => {
    admin.initializeApp();
    const today = new Date().toLocaleString("en-US", {timeZone: "America/Los_Angeles"})
    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    const yyyy = today.getFullYear();
    Promise.all([
        fetch("https://api.datamuse.com/words?sp=????"),
        fetch("https://api.datamuse.com/words?sp=?????"),
        fetch("https://api.datamuse.com/words?sp=??????"),
    ]).then(([four, five, six]) => {
        admin.firestore().collection('words').add({
            4: four[Math.floor(Math.random()*four.length)]["word"],
            5: five[Math.floor(Math.random()*five.length)]["word"],
            6: six[Math.floor(Math.random()*six.length)]["word"],
            "date": `${mm}${dd}${yyyy}`
        }).then(writeResult => {
            // write is complete here
            console.log( `[${mm}${dd}${yyyy}] Added words`)
        });
    })
});