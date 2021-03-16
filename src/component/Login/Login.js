
import firebase from "firebase/app";
import "firebase/auth";
import { useContext, useState } from 'react';
import { useHistory, useLocation } from "react-router";
import { UserContext } from "../../App";
import firebaseConfig from "./firebase.config";



if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig)
}



function Login() {
  const provider = new firebase.auth.GoogleAuthProvider();

  const [loggedInUser, setLoggedInUser] = useContext(UserContext)
  const history = useHistory()
  const location = useLocation()
  let { from } = location.state || { from: { pathname: "/" } };
  const [newUser, setNewUser] = useState(false)
  const [user, setUser] = useState({
    isSignedIn: false,
    name: '',
    email: '',
    password: '',
    photo: '',
    error: '',
    success: false
  })

  const handleSign = () => {
    firebase.auth().signInWithPopup(provider)
      .then(res => {
        console.log(res)
        const { photoURL, email, displayName } = res.user
        const signedIn = {
          isSignedIn: true,
          name: displayName,
          email: email,
          photo: photoURL
        }
        setUser(signedIn)
      })
  }


  const handleSubmit = (e) => {
    if (newUser && user.email && user.password) {
      firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
        .then(res => {
          const newUserInfo = { ...user }
          newUserInfo.error = '';
          newUserInfo.success = true
          setUser(newUserInfo)
          updatedUser(user.name)
        })
        // .then((userCredential) => {
        //   // Signed in 
        //   var user = userCredential.user;
        //   // ...
        // })
        .catch((error) => {
          const newUserInfo = { ...user }
          newUserInfo.error = error.message
          newUserInfo.success = false
          setUser(newUserInfo)

        });
    }
    if (!newUser && user.email && user.password) {
      firebase.auth().signInWithEmailAndPassword(user.email, user.password)
        .then(res => {
          const newUserInfo = { ...user }
          newUserInfo.error = '';
          newUserInfo.success = true
          setUser(newUserInfo)
          setLoggedInUser(newUserInfo)
          history.replace(from);
          console.log('sign is user', res.user)
        })
        .catch((error) => {
          const newUserInfo = { ...user }
          newUserInfo.error = error.message
          newUserInfo.success = false
          setUser(newUserInfo)
        });

    }
    e.preventDefault()
  }

  const handleBlur = (e) => {

    let isFormValid;
    if (e.target.name === 'email') {
      isFormValid = /\S+@\S+\.\S+/.test(e.target.value);

    }
    if (e.target.name === 'password') {
      const passLength = e.target.value.length > 6
      const isPassValid = /\d{1}/.test(e.target.value)
      isFormValid = isPassValid && passLength
    }
    if (isFormValid) {
      const newUserInfo = { ...user };
      newUserInfo[e.target.name] = e.target.value
      setUser(newUserInfo)
    }

   
  }
  const updatedUser = name => {
    const user = firebase.auth().currentUser;

    user.updateProfile({
      displayName: name
    }).then(function () {
     console.log('user name updated');
    }).catch(function (error) {
    console.log(error);
    });
  }
  return (
    <div style={{textAlign: 'center'}}>
      <button onClick={handleSign}>Sign In</button>
      {
        user.isSignedIn && <div>
          {/* <p>Welcome, {user.name}</p> */}
          <p>Your Email: {user.email}</p>
          <img src={user.photo} alt=""></img>
        </div>
      }
        <p>Name: {user.name}</p>
        <p>email: {user.email}</p>
        <p>pass:{user.password}</p>
        <form onSubmit={handleSubmit}>
        <input onChange={() => setNewUser(!newUser)} type="checkbox" name="newUser" id="" />
        <label htmlFor="newUser">New User Sign In</label>
        <br />
        {newUser && <input type="text" name="name" onBlur={handleBlur} placeholder="Your Name" />}
        
        <br />
        <input type="text" name="email" onBlur={handleBlur} required placeholder="Your email" />
        <br />
        <input type="password" onBlur={handleBlur} name="password" required placeholder="your Password" id="" />
        <br />
        <input type="submit" value="Submit" />
      </form>
      <p style={{ color: 'red' }}>{user.error}</p>
      {
        user.success && <p style={{ color: 'green' }}>user {newUser ? 'created' : 'logged in'} successfully</p>
      }
    </div>
  );
}

export default Login;
