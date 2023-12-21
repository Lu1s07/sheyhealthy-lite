import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { ShowLoader } from "../../redux/loaderSlice";
import { Button, message, Table } from "antd";
import { GetAllDoctors, UpdateDoctor } from "../../apicalls/doctors";


function DoctorsList() {
   const [doctors, setDoctors] = React.useState([]);
   const dispatch = useDispatch();

   const getData = async () => {
      try {
         dispatch(ShowLoader(true));
         const response = await GetAllDoctors();
         dispatch(ShowLoader(false));
      
        // console.log(response);
         //setDoctors(response.data);

         if (response.success) {
            setDoctors(response.data);
         } else {
            throw new Error(response.message);
         }

      } catch (error) {
         dispatch(ShowLoader(false));
         message.error(error.message);
      }
   }

   const changeStatus = async (payload) => {
      try {
         dispatch(ShowLoader(true));
         const response = await UpdateDoctor(payload);
         dispatch(ShowLoader(false));
        // setDoctors(response.data);
        //console.log(response);

         if (response.success) {
            message.success(response.message);
            getData();
            //setDoctors(response.data);
         } else {
            throw new Error(response.message);
         }
      } catch (error) {
         message.error(error.message)
         dispatch(ShowLoader(false));
      }
   };

   useEffect(() => {
      getData();
   }, []);

   const columns = [
      {
         title: "First Name",
         dataIndex: "firstName"
      },
      {
         title: "Last Name",
         dataIndex: "lastName"
      },
      {
         title: "Email",
         dataIndex: "email"
      },
      {
         title: "Phone",
         dataIndex: "phone"
      },
      {
         title: "Speciality",
         dataIndex: "speciality"
      },
      {
         title: "Status",
         dataIndex: "status",
         render: (text,record) =>{
            return text.toUpperCase()
         }
      },
      {
         title: 'Actions',
         dataIndex: 'actions',
         render: (text, record) => {
            if (record.status === 'pending') {
               return (
                  <div className="flex gap-1">
                     <span className="underline cursor-pointer"
                        onClick={() => changeStatus({
                           ...record,
                           status: "rejected",
                        })}
                     >Reject</span>
                     <span className="underline cursor-pointer"
                     onClick={() => changeStatus({
                        ...record,
                        status: "approved",
                     })}
                     >Approve</span>
                  </div>
               );
            }

            if (record.status === "approved") {
               return (
                  <div className="flex gap-1">
                     <span className="underline cursor-pointer"
                     onClick={() => changeStatus({
                        ...record,
                        status: "blocked",
                     })}
                     >Block</span>
                  </div>
               );
            }

            if (record.status === "blocked") {
               return (
                  <div className="flex gap-1">
                     <span className="underline cursor-pointer"
                     onClick={() => changeStatus({
                        ...record,
                        status: "approved",
                     })}
                     >Unblock</span>
                  </div>
               );
            }

         },
      },
   ];
   return (
      <div>
         <Table columns={columns} dataSource={doctors} />
      </div>
   )
}

export default DoctorsList;