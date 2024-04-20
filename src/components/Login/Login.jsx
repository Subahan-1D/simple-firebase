
import { GithubAuthProvider, GoogleAuthProvider, getAuth, signInWithPopup, signOut } from "firebase/auth";
import app from "../../firebase/firebase.init";
import { useState } from "react";
const Login = () => {
    const [user, setUser] = useState([]);
    const auth = getAuth(app);
    const googleProvider = new GoogleAuthProvider();
    const githubProvider = new GithubAuthProvider();

    const handleGoogleSignIn = () => {
        signInWithPopup(auth, googleProvider)
            .then(resutl => {
                const userLoginSignUp = resutl.user;
                console.log(userLoginSignUp)
                setUser(userLoginSignUp)
            })
            .catch(error => {
                console.log('error', error.message)
            })
    }
    const handleSignOUt = () => {
        signOut(auth)
            .then(resutl => {
                console.log(resutl);
                setUser(null)
            })
            .catch(error => {
                console.log(error)
            })
    }

    const handleGithubLogin = () =>{
        signInWithPopup(auth,githubProvider)
        .then(result =>{
            const loggedInUser = result.user
            console.log(loggedInUser)
            setUser(loggedInUser)
            
        })
        .catch(error =>{
            console.log(error);
        })

    }
    return (
        <div>
           { user ?
             <button onClick={handleSignOUt}> Sign Out</button> :
             <>
             <button onClick={handleGoogleSignIn}>Google Login</button>
             <button onClick={handleGithubLogin}>Github Login</button>
             </>
           }
            {
                user && <div>
                    <p> Name : {user.displayName}</p>
                    <h3>User : {user.email}</h3>
                    <img src={user.photoURL} alt="" />
                </div>
            }
        </div>
    );
};

export default Login;