import React, { useEffect } from "react";
import { Col, Row, Form, Checkbox, message } from "antd";
import { useDispatch } from "react-redux";
import { ShowLoader } from "../../redux/loaderSlice";
import { AddDoctor,UpdateDoctor,checkIfDoctorAccountIsApplied } from "../../apicalls/doctors";
import { useNavigate } from "react-router-dom";

function DoctorForm() {
    const [form] = Form.useForm();
    const [alreadyApproved, setAlreadyApproved] = React.useState(false);

    const [days, setDays] = React.useState([]);
    const [alreadyApplied , setAlreadyApplied] = React.useState(false);


    const dispatch = useDispatch();
    const navigate = useNavigate();
    const onFinish = async(values) => {
       try {
        dispatch(ShowLoader(true));
        const payload = {
            ...values,
            days,
            userId: JSON.parse(localStorage.getItem("user")).id, 
            status:"pending"
        };
        let response = null;
        if(alreadyApproved){
            
            payload.id = JSON.parse(localStorage.getItem("user")).id;
            payload.status = "approved";
            response = await UpdateDoctor(payload);
        }else{
            response = await AddDoctor(payload);
        }

        if(response.success)
        {
            message.success(response.message);
            navigate("/profile");        
        }
        else{
            message.error(response.message);        
        }
        dispatch(ShowLoader(false));
       } catch (error) {
        dispatch(ShowLoader(false));
        message.error(error.message);
       }
    };


    const checkIfAlreadyApplied = async () => {
        try {
            dispatch(ShowLoader(true));
            const response  =  await checkIfDoctorAccountIsApplied(JSON.parse(localStorage.getItem("user")).id);
            if(response.success)
            {
                setAlreadyApplied(true);
                if(response.data.status === "approved"){
                    setAlreadyApproved(true);
                    //metodos para los updates de los formularios
                    form.setFieldsValue(response.data);
                    setDays(response.data.days);

                }

            }
            dispatch(ShowLoader(false));
        } catch (error) {
            dispatch(ShowLoader(false));
            message.error(error.message);
        }
    };

    useEffect(() => {
        checkIfAlreadyApplied();
    },[]);

    return (
        <div className="bg-white p-2">
            {!alreadyApplied  || alreadyApproved && (<> 
                                    {" "}
                <h3 className="uppercase my-1">
                {alreadyApproved ? "Update your information" : "Apply as a Doctor"}
            </h3>
            <hr />
            <Form layout="vertical" className="my-1" onFinish={onFinish} form={form}>
                <Row gutter={[16, 16]} >
                    <Col span={24}>
                        <h4 className="uppercase">
                            <b>Personal Information</b>
                        </h4>
                    </Col>
                    <Col span={8}>
                        <Form.Item label="First Name" name="firstName"
                            rules={[{
                                required: true,
                                message: "Required!",
                            },
                            ]}
                        >
                            <input type="text"></input>
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item label="Last Name" name="lastName"
                            rules={[{
                                required: true,
                                message: "Required!",
                            },
                            ]}
                        >
                            <input type="text"></input>
                        </Form.Item>

                    </Col>
                    <Col span={8}>
                        <Form.Item label="Email" name="email"
                            rules={[{
                                required: true,
                                message: "Required!",
                            },
                            ]}
                        >
                            <input type="text"></input>
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item label="Phone" name="phone"
                            rules={[{
                                required: true,
                                message: "Required!",
                            },
                            ]}
                        >
                            <input type="number"></input>
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item label="WebSite" name="website"
                            rules={[{
                                required: true,
                                message: "Required!",
                            },
                            ]}
                        >
                            <input type="text"></input>
                        </Form.Item>
                    </Col>
                    <Col span={24}>
                        <Form.Item label="Address" name="address"
                            rules={[{
                                required: true,
                                message: "Required!",
                            },
                            ]}
                        >
                            <textarea type="text"></textarea>
                        </Form.Item>
                    </Col>

                    <Col span={24}><hr /></Col>
                    {/* -------------------Profesinal Info*/}
                    <Col span={24}>
                        <h4 className="uppercase">
                            <b>Profesional Information</b>
                        </h4>
                    </Col>
                    <Col span={8}>
                        <Form.Item
                            label="Speciality"
                            name="speciality"
                            rules={[{
                                required: true,
                                message: "Required!",
                            }]}
                        >
                            <select>
                                <option value="General">General</option>
                                <option value="Dermatologist">Dermatologist</option>
                                <option value="Cardiologist">Cardiologist</option>
                                <option value="Gynecologist">Gynecologist</option>
                                <option value="Neurologist">Neurologist</option>
                                <option value="Orthopedic">Orthopedic</option>
                                <option value="Pediatrician">Pediatrician</option>
                                <option value="Psychiatrist">Psychiatrist</option>
                                <option value="Surgeon">Surgeon</option>
                                <option value="Urologist">Urologist</option>
                            </select>
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item label="Experience" name="experience"
                            rules={[{
                                required: true,
                                message: "Required!",
                            },
                            ]}
                        >
                            <input type="number"></input>
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item label="Qualification" name="qualification"
                            rules={[{
                                required: true,
                                message: "Required!",
                            },
                            ]}
                        >
                            <select>
                                <option value="Nothing">Nothing</option>
                                <option value="MBBS">MBBS</option>
                                <option value="MBBS">MD</option>
                                <option value="MBBS">MS</option>
                                <option value="MBBS">MDS</option>
                            </select>
                        </Form.Item>
                    </Col>
                    <Col span={24}><hr /></Col>
                    <Col span={24}>
                        <h4 className="uppercase">
                            <b>Work Hours</b>
                        </h4>
                    </Col>
                    <Col span={8}>
                        <Form.Item label="Start Time" name="startTime"
                            rules={[{
                                required: true,
                                message: "Required!",
                            },
                            ]}
                        >
                            <input type="time"></input>
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item label="End Time" name="endTime"
                            rules={[{
                                required: true,
                                message: "Required!",
                            },
                            ]}
                        >
                            <input type="time"></input>
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item label="Fee" name="fee"
                            rules={[{
                                required: true,
                                message: "Required!",
                            },
                            ]}
                        >
                            <input type="number"></input>
                        </Form.Item>
                    </Col>

                    <Col span={24}>
                        <div className="flex gap-2"> 
                            {
                                [
                                    'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'
                                ].map(
                                    (day, index) => (
                                       <div className="flex items-center">
                                         <input type="checkbox" 
                                         key={index} 
                                         checked={days.includes(day)}
                                         value={day}                                          
                                         onChange ={(e) => {
                                            if(e.target.checked){
                                                setDays([...days, e.target.value]);
                                            }else{
                                                setDays(days.filter((item) => item !== e.target.value));
                                            }
                                         }}
                                         />
                                        <label>{day}</label>
                                        </div>
                                    )
                                )
                            }
                        </div>
                    </Col>
                </Row>
                <div className="flex justify-end gap-2">                    
                <button className="outlined-btn" type="button">Cancel</button>
                <button className="contained-btn" type="submit">Submit</button>
                </div>
            </Form>
            </>
            )}

            {alreadyApplied && !alreadyApproved && (
            <div className="flex flex-col items-center gap-2">
                <h3 className="text-secondary">You have already applied for this doctor account,
                please wait for the admin to approve the request</h3>
            </div>
            )}
        </div>
    );
}

export default DoctorForm;