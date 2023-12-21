import React, { useEffect } from "react";
import { Tabs, message } from 'antd';
import DoctorsList from "./DoctorsList";
import UsersLists from "./UsersList";
import { useDispatch } from "react-redux";
import { ShowLoader } from "../../redux/loaderSlice";
import { GetUserById } from "../../apicalls/users";


function Admin() {

    const [isAdmin, setIsAdmin] = React.useState(false);
    const user = JSON.parse(localStorage.getItem("user"));
    
    const dispatch = useDispatch();


    const checkIsAdmin = async () => {
        try {
            dispatch(ShowLoader(true));
            const response = await GetUserById(user.id);
            if(response.success && response.data.role === "admin")
            {
                setIsAdmin(true);
            }else{
                throw new Error("You are not an Admin " + response);
            }
        } catch (error) {
            dispatch(ShowLoader(false));
            message.error(error.message);
        }
    };

    useEffect(() => {
        checkIsAdmin();
    }, []);

    return (
        isAdmin && <div className="bg-white p-1">
            <Tabs>
                <Tabs.TabPane tab="Users" key="1">
                    <UsersLists />
                </Tabs.TabPane>
                <Tabs.TabPane tab="Doctors" key="2">
                    <DoctorsList />
                </Tabs.TabPane>
            </Tabs>
        </div>
    );
}

export default Admin;