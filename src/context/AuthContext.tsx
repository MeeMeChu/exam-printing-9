import { createContext, useContext, useEffect, useState, ReactNode, FC } from "react";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, User } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { auth, db } from "../config/firebase-config";

type UserProfile = {
    userRole : string
}

type AuthContextType = {
    currentUser : User | null,
    userProfile : UserProfile | null,
    userLoggedIn : boolean,
    loading : boolean,
    signUpWithEmail: (email: string, password: string, userFname: string, userLname: string, userRole: string) => void;
    signInWithEmail: (email: string, password: string) => void;
    logout: () => void;
};  
const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
    return useContext(AuthContext);
}

export const AuthProvider : FC<{children: ReactNode}> = (props) => {
    const { children } = props;
    const [ currentUser, setCurrentUser ] = useState<User | null>(null);
    const [ userProfile, setUserProfile] = useState<UserProfile | null>(null);
    const [ userLoggedIn, setUserLoggedIn ] = useState<boolean>(false);
    const [ loading, setLoading ] = useState<boolean>(true);

    console.log("Login แล้วหรือยัง : ", userLoggedIn);
    console.log("Profile", userProfile)

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(async (user) => {
            if (user) {
                setCurrentUser(user);
                setUserLoggedIn(true);

                const userDoc = await getDoc(doc(db, "users", user.uid));
                if (userDoc.exists()) {
                    const userData = userDoc.data();
                    setUserProfile({
                        userRole: userData.userRole
                    });
                }

            } else {
                setCurrentUser(null);
                setUserLoggedIn(false);
                setUserProfile(null);
            }
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    const signUpWithEmail = async (email: string, password: string, userFname: string, userLname: string, userRole: string) => {
        try {
            const result = await createUserWithEmailAndPassword(auth, email, password);
            const user = result.user;

            const userDocRef = doc(db, "users", user.uid);
            const userDoc = await getDoc(userDocRef);

            if (!userDoc.exists()) {
                // ถ้าไม่มี บันทึกผู้ใช้ใหม่ลง Firestore พร้อมกำหนด role "NORMAL"
                await setDoc(userDocRef, {
                    uid: user.uid,
                    userEmail: user.email,
                    userFname: userFname,
                    userLname: userLname,
                    userRole: userRole,
                });
                setUserProfile({
                    userRole: userRole,
                });
            } 


        } catch (error) {
            // console.error("Error during email registration:", error);
            throw new Error("Error during email registration: ");
        }
    }

    const signInWithEmail = async (email: string, password: string) => {
        try {
            await signInWithEmailAndPassword(auth, email, password);
        } catch (error) {
            // console.error("Error during email sign-in:", error);
            throw new Error("Error during  email sign-in");
        }
    };


    const logout = async () => {
        try {
            await signOut(auth);
            setUserProfile(null);
        } catch (error) {
            console.error("Error during logout:", error);
        }
    };

    const value = {
        currentUser,
        userProfile,
        userLoggedIn,
        loading,
        signUpWithEmail,
        signInWithEmail,
        logout,
    }

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
}