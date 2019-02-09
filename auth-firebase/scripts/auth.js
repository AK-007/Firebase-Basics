/*jshint esversion: 6 */
//addAdmin
const adminForm = document.querySelector('.admin-actions');
adminForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const adminEmail = document.querySelector('#admin-email').value;
    const addAdminRole = functions.httpsCallable('addAdminRole');
    addAdminRole({email:adminEmail}).then(res => {
        console.log(res);
    });
});

// auth status changes
auth.onAuthStateChanged(user => {
    if(user){
        user.getIdTokenResult().then(id =>{
            user.admin = id.claims.admin;
            setupUI(user);
        });
        console.log('User logged in.');
        //get data
        db.collection('guides').onSnapshot(snapshot => {
            setupGuides(snapshot.docs);
            setupUI(user);
        }, err => {
            console.log(err.message);
        });

    }
    else{
        console.log('User logged out.');
        setupUI();
        setupGuides([]);
    }
});

//create new guide
const createForm = document.querySelector('#create-form');
createForm.addEventListener('submit', (e) => {
    e.preventDefault();
    db.collection('guides').add({
        title: createForm.title.value,
        content: createForm.content.value
    }).then(() => {
        const modal = document.querySelector('#modal-create');
        M.Modal.getInstance(modal).close();
        createForm.reset();
    }).catch(err => {
        console.log('Please Log In');
    });
});

const signupForm = document.querySelector('#signup-form');
signupForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const email = signupForm['signup-email'].value;
    const password = signupForm['signup-password'].value;

    auth.createUserWithEmailAndPassword(email, password)
        .then( cred => {
            return db.collection('users').doc(cred.user.uid).set({
                bio: signupForm['signup-bio'].value
            });
        }).then(() => {
            const modal = document.querySelector('#modal-signup');
            M.Modal.getInstance(modal).close();
            signupForm.reset();
            signupForm.querySelector('.error').innerHTML = '';
        }).catch(err => {
            signupForm.querySelector('.error').innerHTML = err.message;
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
            login.querySelector('.error').innerHTML = '';
        }).catch(err => {
            login.querySelector('.error').innerHTML = err.message;
        });
});