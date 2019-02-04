/*jshint esversion: 6 */
// auth status changes
auth.onAuthStateChanged(user => {
    if(user){
        console.log('User logged in.');
        //get data
        db.collection('guides').get().then(snapshot => {
            setupGuides(snapshot.docs);
        });

    }
    else{
        console.log('User logged out.');
        setupGuides([]);
    }
});


const signupForm = document.querySelector('#signup-form');
signupForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const email = signupForm['signup-email'].value;
    const password = signupForm['signup-password'].value;

    auth.createUserWithEmailAndPassword(email, password)
        .then( cred => {
            const modal = document.querySelector('#modal-signup');
            M.Modal.getInstance(modal).close();
            signupForm.reset();
        });
    
});

const logout = document.querySelector('#logout');
logout.addEventListener('click', (e) => {
    e.preventDefault();
    auth.signOut();
});

const login = document.querySelector('#login-form');
login.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = login['login-email'].value;
    const password = login['login-password'].value;
    auth.signInWithEmailAndPassword(email, password)
        .then(cred => {
            const modal = document.querySelector('#modal-login');
            M.Modal.getInstance(modal).close();
            login.reset();
        });
});