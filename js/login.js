

document.addEventListener("DOMContentLoaded", event => {
  const app= firebase.app();
  console.log(app);
})

//var firebase = require("firebase");
//firebase.initializeApp(config);
//look in the HTML for config

function toggleOverlay(){

  let self = userTypeOnSubmit;

  let el = document.querySelector('#overlay');
  let el_display = el.style.display;

  if ( el_display == '' && !self.calledMoreThanOnce )
  {
    self.calledMoreThanOnce = true;
    el.style.display = 'flex';
  }
  else if ( el_display == 'none' )
  {
    el.style.display = 'flex';
  }
  else if ( el_display == 'flex' )
  {
    el.style.display = 'none';
  }
  else
  {
    throw `${self.name}: ${el.id} had a display value of '${el_display}'.
    It should only toggle between 'flex' and 'none'`;
  }
}

function userTypeOnSubmit() 
{
  toggleOverlay();
}

function googleLogin()
{
  const provider = new firebase.auth.GoogleAuthProvider();
  let temp = firebase.auth().signInWithPopup(provider);
  
  temp.then(result=> {
    const user = result.user;
    console.log(`${user.displayName}`);
    console.log(user);
    
  })

  .catch(
    (error) => {console.log(error)
  });
}