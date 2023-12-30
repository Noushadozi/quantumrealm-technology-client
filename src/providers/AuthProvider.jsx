import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile, GoogleAuthProvider, deleteUser } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import auth from "../config/firbase.config";
import axios from "axios";

export const AuthContext = createContext()
const provider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {

    const [user, setUser] = useState([]);
    const [loading, setLoading] = useState(true);

    const logIn = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password)
    }

    const googleSignIn = () => {
        setLoading(true);
        return signInWithPopup(auth, provider);
    }

    const createUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password)
    }

    const update = (name, photoUrl) => {
        return updateProfile(auth.currentUser, {
            displayName: name,
            photoURL: photoUrl
        })
    }

    const remove = () => {
        return deleteUser(user)
    }

    useEffect(() => {
        const unSubscribe = onAuthStateChanged(auth, currentUser => {
            setUser(currentUser)
            const userInfo = { email: currentUser?.email }
            if (currentUser) {
                axios.post('https://quantumrealm-technology-server.vercel.app/jwt', userInfo, { withCredentials: true })
                    .then(res => {
                        console.log('token response', res.data)
                    });
                setLoading(false);
            }
            else {
                axios.post('https://quantumrealm-technology-server.vercel.app/logOut', userInfo, { withCredentials: true })
                    .then(res => {
                        console.log('token response', res.data)
                    });
                setLoading(false);
            }
        })
        return () => {
            unSubscribe();
        }
    }, []);

    const logOut = () => {
        setLoading(true);
        return signOut(auth);
    }

    const authInfo = {
        user,
        loading,
        createUser,
        update,
        remove,
        logIn,
        googleSignIn,
        logOut,
    }

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;