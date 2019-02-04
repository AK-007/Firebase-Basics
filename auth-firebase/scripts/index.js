/*jshint esversion: 6 */
const guideList = document.querySelector('.guides');
const loggedOut = document.querySelectorAll('.logged-out');
const loggedIn = document.querySelectorAll('.logged-in');
const account = document.querySelector('.account-details');

const setupUI = (user) => {
  if(user){
    const html = `<div>Logged in as ${user.email}</div>`;
    account.innerHTML=html;
    loggedIn.forEach(item => {
      item.style.display = 'block';
    });
    loggedOut.forEach(item => {
      item.style.display = 'none';
    });
  }else{
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