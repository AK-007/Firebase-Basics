/*jshint esversion: 6 */
const guideList = document.querySelector('.guides');
const loggedOut = document.querySelectorAll('.logged-out');
const loggedIn = document.querySelectorAll('.logged-in');
const account = document.querySelector('.account-details');
const adminItems = document.querySelectorAll('.admin');
const setupUI = (user) => {
  if(user){
    if(user.admin){
      adminItems.forEach(item => {
        item.style.display = 'block';
      });
    }
    db.collection('users').doc(user.uid).get().then(doc => {
      const html = `<div>Logged in as ${user.email}</div><div>${doc.data().bio}</div><div class="pink-text">${user.admin ? 'Admin' : ''}</div>`;
      account.innerHTML=html;
    });
    loggedIn.forEach(item => {
      item.style.display = 'block';
    });
    loggedOut.forEach(item => {
      item.style.display = 'none';
    });
  }else{
    adminItems.forEach(item => {
      item.style.display = 'none';
    });
    account.innerHTML="";
    loggedIn.forEach(item => {
      item.style.display = 'none';
    });
    loggedOut.forEach(item => {
      item.style.display = 'block';
    });
  }
} 

//setup guides
const setupGuides = (data) => {

  if(data.length){
    let html = '';
      data.forEach(doc => {
      const guide = doc.data();
      const li = `<li><div class="collapsible-header grey lighten-4">${guide.title}</div><div class="collapsible-body white">${guide.content}</div></li>`;
      html+=li;
    });
    guideList.innerHTML = html;
  }
  else{
    guideList.innerHTML = '<h5 class="center-align">Login to view guides</h5>';
  }
}
// setup materialize components
document.addEventListener('DOMContentLoaded', function() {

  var modals = document.querySelectorAll('.modal');
  M.Modal.init(modals);

  var items = document.querySelectorAll('.collapsible');
  M.Collapsible.init(items);

});