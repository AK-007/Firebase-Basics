const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);

exports.sendmessage = functions.firestore
    .document('products/{productId}')
    .onCreate((snapshot,event) => {
        const doc = event.params.productId;
        const name = snapshot.data().name;
        const productRef = admin.firestore().collection('products').doc(doc);
        return productRef.update({message: `Nice ${name} - Love Cloud`});
    });