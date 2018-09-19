

document.addEventListener("DOMContentLoaded", event => {
  const app= firebase.app();
  console.log(app);
})

//var firebase = require("firebase");
//firebase.initializeApp(config);
//look in the HTML for config

function userTypeOnSubmit() 
{
   
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