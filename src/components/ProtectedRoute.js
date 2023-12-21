import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function ProtectedRoute({ children }) {
    const navigate = useNavigate();
    let user;

    try {
        user = JSON.parse(localStorage.getItem('user'));
    } catch (error) {
        console.error("Error reading from localStorage:", error);
        // Manejar el error, por ejemplo, redirigir al usuario o mostrar un mensaje
    }

    useEffect(() => {
        try {
            if (!user) {
                navigate('/login');
            }
        } catch (error) {
            console.error("Navigation error:", error);
            // Manejar el error de navegación aquí
        }
    }, [user, navigate]);

    const handleLogout = () => {
        try {
            localStorage.removeItem("user");
            navigate("/login");
        } catch (error) {
            console.error("Logout error:", error);
            // Manejar el error aquí
        }
    };

    return (
        <div className="layout p-1">
            <div className='header bg-white p-2 flex justify-between items-center'>
                <h2 className='cursor-pointer' onClick={() => navigate("/")}>
                    <strong className='text-primary'>Appointments</strong>
                    <strong className='text-secondary'>WebApp</strong>
                </h2>

                {user && (
                    <div className='flex gap-2 items-center'>
                        <div className='flex gap-1 items-center'>
                            <i className="ri-shield-user-line"></i>
                            <h4 className='uppercase cursor-pointer underline'
                             onClick={() => {
                                if (user.role === "admin") navigate("/admin");
                                else navigate("/profile");
                            }}
                            >{user.name}
                            </h4>
                        </div>
                        <i className="ri-logout-box-r-line" onClick={handleLogout}></i>
                    </div>
                )}
            </div>
            <div className='content my-1'>{children}</div>
        </div>
    );
}

export default ProtectedRoute;
