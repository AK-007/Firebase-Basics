document.addEventListener('DOMContentLoaded', event => {
    const app = firebase.app();
    const db = firebase.firestore();
    const obj = db.collection('posts').doc('LWfIyzBa6SRPn1T3ruLS');
    obj.onSnapshot(doc => {
        const mypost = doc.data();
        document.querySelector('#title').innerHTML = mypost.Title;
    });
    const productobj = db.collection('products');
    const query = productobj.where('price','>=',24);
    query.get().then(product => {
        product.forEach(doc => {
            var x = document.createElement("LI");
            var t = document.createTextNode(doc.data().name);
            x.appendChild(t);
            document.getElementById('product').appendChild(x);
        });
    });
});

function googleLogin(){
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider)
        .then(result => {
            const user = result.user;
            document.write(`Hello ${user.displayName}`);
            console.log(user);
        })
        .catch(console.log);
}

function update(e){
    const db = firebase.firestore();
    const obj = db.collection('posts').doc('LWfIyzBa6SRPn1T3ruLS');
    obj.update({ Title: e.target.value});
}

function upload(files){
    const storageRef = firebase.storage().ref();
    const horse = storageRef.child('event1.png');
    const file = files.item(0);
    const task = horse.put(file);

    task.then(snapshot => {
        console.log(snapshot);
        snapshot.ref.getDownloadURL().then(url => {
            document.querySelector('#imgupload').setAttribute('src',url);
        })
        .catch(console.log);
        
    });
}