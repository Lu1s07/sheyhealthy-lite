import { addDoc, collection, query, where, getDocs, updateDoc, doc } from "firebase/firestore";
import fireStoreDataBase from "../firebaseConfig";


export const BookDoctorAppointment = async (payload) => {
    try {
        await addDoc(collection(fireStoreDataBase, "appointments"), payload);
        return { success: true, message: "Appointment booked successfully" };
    } catch (error) {
        return { success: false, message: error.message };
    }
};

export const GetDoctorAppointmentsOnDate = async (doctorId, date) => {
    try {
        const querySnapshot = await getDocs(
            query(
                collection(fireStoreDataBase, "appointments"),
                where("doctorId", "==", doctorId),
                where("date", "==", date)
            )
        );
        const data = [];
        querySnapshot.forEach((doc) => {
            data.push(doc.data());
        });
        return { success: true, data };

    } catch (error) {
        return { success: false, message: error.message };
    }
};

export const GetDoctorAppointments = async (doctorId) => {
    try {
        const querySnapshot = await getDocs(
            query(
                collection(fireStoreDataBase, 'appointments'),
                where("doctorId", "==", doctorId)
            )
        );
        const data = [];
        querySnapshot.forEach((doc) => {
            data.push({
                ...doc.data(),
                id: doc.id,
            });
        });
        return { success: true, data };

    } catch (error) {
        return { success: false, message: error.message };
    }
};


export const GetUserAppointments = async (userId) => {
    try {
        const querySnapshot = await getDocs(
            query(
                collection(fireStoreDataBase, 'appointments'),
                where("userId", "==", userId)
            )
        );
        const data = [];
        querySnapshot.forEach((doc) => {
            data.push({
                ...doc.data(),
                id: doc.id,
            });
        });
        return { success: true, data };
    } catch (error) {
        return { success: false, message: error.message };
    }
};

export const UpdateAppointmentStatus = async (id, status) => {
    try {
        await updateDoc(doc(fireStoreDataBase, "appointments", id), {
            status,
        });

        return { success: true, message: "Appoinments status updated" };

    } catch (error) {

        return { success: false, message: error.message };
    }
};