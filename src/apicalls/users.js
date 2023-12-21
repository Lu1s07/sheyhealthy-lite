import fireStoreDataBase from "../firebaseConfig";
import { collection, addDoc, Firestore, query, where, getDocs, doc, getDoc } from "firebase/firestore";
import CryptoJS from "crypto-js";
import { message } from "antd";

export const CreateUser = async (payload) => {

    try {
        //check if user already exists using email
        const qry = query(collection(fireStoreDataBase, "users"), where("email", "==", payload.email));
        const querySnapshot = await (getDocs(qry));
        if (querySnapshot.size > 0) {
            throw new Error("User Already Exists");
        }
        //hash password
        const hashedPassword = CryptoJS.AES.encrypt(payload.password, "sheyjobs-lite").toString();
        payload.password = hashedPassword;


        const docRef = collection(fireStoreDataBase, "users");
        await addDoc(docRef, payload);
        return {
            success: true,
            message: "User created succesfully",
        };
        //await addDoc(collection(fireStoreDataBase,"users"), payload);
    } catch (error) {
        return error;
    }
}

export const LoginUser = async (payload) => {
    try {
        const qry = query(collection(fireStoreDataBase, "users"), where("email", "==", payload.email));
        const userSnapshot = await (getDocs(qry));
        if (userSnapshot.size === 0) {
            throw new Error("User does not Exist");
        }

        //decrypt
        const user = userSnapshot.docs[0].data();
        user.id = userSnapshot.docs[0].id;

        const bytes = CryptoJS.AES.decrypt(user.password, "sheyjobs-lite");
        const originalPassword = bytes.toString(CryptoJS.enc.Utf8);

        if (originalPassword !== payload.password) {
            throw new Error("Incorrect Password");
        }

        return {
            success: true,
            message: "User logged in succefully",
            data: user,
        };

    } catch (error) {
        return error;
    }
};


export const GetAllUsers = async () => {
    try {
        const users = await getDocs(collection(fireStoreDataBase, "users"));
        return {
            success: true,
            data: users.docs.map((doc) => {
                return {
                    ...doc.data(),
                    id: doc.id,
                };
            }),
        };
    } catch (error) {
        return {
            success: false,
            message: error.message,
        };
    }
}


export const GetUserById = async (id) => {
    try {
        const user = await getDoc(doc(fireStoreDataBase, "users", id));
        return {
            success: true,
            data: {
                ...user.data(),
                id: user.id,
            },
        };
    } catch (error) {
        return error;
    }
}