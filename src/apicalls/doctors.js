import { addDoc, collection, getDocs, doc, query, where, setDoc, updateDoc, getDoc } from 'firebase/firestore';
import fireStoreDataBase from '../firebaseConfig';


export const AddDoctor = async (payload) => {
    try {
        await setDoc(doc(fireStoreDataBase, "doctors", payload.userId), payload);

        //update role
        //
        await updateDoc(doc(fireStoreDataBase, "users", payload.userId), {
            role: "doctor",
        });
        //
        return {
            success: true,
            message: "Doctor added succesfully , please wait for approval",
        };
    } catch (error) {
        return {
            success: false,
            message: error.message,
        };
    }
};


export const checkIfDoctorAccountIsApplied = async (id) => {
    try {
        const doctor = await getDocs(query(collection(fireStoreDataBase, "doctors"), where("userId", "==", id)));
        if (doctor.size > 0) {
            return {
                success: true,
                message: "Doctor account already applied",
                data: doctor.docs.map((doc) =>{
                    return{
                        ...doc.data(),
                        id: doc.id,
                    };

                })[0]
            };
        }
        else {
            return {
                success: false,
                message: "Doctor account not applied",
            };
        };
    } catch (error) {
        return {
            success: false,
            message: error.message,
        };
    }
};


export const GetAllDoctors = async () => {
    try {
        const doctors = await getDocs(collection(fireStoreDataBase, "doctors"));
        return {
            success: true,
            data: doctors.docs.map((doc) => {
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


export const UpdateDoctor = async (payload) => {
    try {
        await setDoc(doc(fireStoreDataBase, "doctors", payload.id), payload);
        return {
            success: true,
            message: "Doctor update succeesfully",
        };
    } catch (error) {
        return {
            success: false,
            message: error.message,
        };
    }
}

export const GetDoctorById = async (id) => {
    try {
        const doctor = await getDoc(doc(fireStoreDataBase, "doctors", id));
        return {
            success: true,
            data: doctor.data(),
        };
    } catch (error) {
        return {
            success: false,
            message: error.message,
        };
    }
}
