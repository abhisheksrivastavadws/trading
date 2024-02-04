import React from "react";
import GoogleSignin from "../img/btn_google_signin_dark_pressed_web.png";
import { auth } from "../../Firebase/Firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useNavigate  } from "react-router-dom";

const NavBar = () => {
  const [user] = useAuthState(auth);
  const navigate = useNavigate();

  const googleSignIn = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider);
  };

  const signOut = () => {
    auth.signOut();
  };
  const navigateToHome = () => {
    navigate('/')
  }
  return (
    <nav className="nav-bar">
      <h1 onClick={navigateToHome}>Traders View</h1>
      {user ? (
        <button onClick={signOut} className="sign-out" type="button">
          Sign Out
        </button>
      ) : (
        <button className="sign-in">
          <img
            onClick={googleSignIn}
            src={GoogleSignin}
            alt="sign in with google"
            type="button"
          />
        </button>
      )}
    </nav>
  );
};

export default NavBar;
