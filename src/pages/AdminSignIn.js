import React, {useState} from "react";
import { useNavigate } from 'react-router-dom';
import { Label, Input, CheckBox } from "../components/BasicComponents";
import { Background } from "../components/Background";

const InputAdminUserName = ({value, onChange}) => {
    return (
        <div>
            <Label
                text={"Admin Kullanıcı Adı"}
                name={"username"}
            />
            <Input
                type={"text"}
                placeholder={""}
                name={"username"}
                required={true}
                value={value}
                onChange={onChange}
            />
        </div>
    );
}

const InputAdminPassword = ({value, onChange}) => {
    return (
        <div>
            <Label
                text={"Admin Password"}
                name={"password"}
            />
            <Input
                type={"password"}
                placeholder={"••••••••"}
                required={true}
                value={value}
                onChange={onChange}
            />
        </div>
    );
}

export const AdminSignIn = () => {
    const [credentials, setCredentials] = useState({
        username: "",
        password: "",
    });

    const navigate = useNavigate();

    const changeHandler = (event) => {
        const { name, type, checked, value } = event.target;
        setCredentials({
            ...credentials,
            [name]: value
        })
        console.log(credentials);
    };

    const submitHandler = async (e) => {
        e.preventDefault();

        const response = await fetch('http://localhost:5000/admin/signin', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-api-key': process.env.REACT_APP_VOTING_API_BACKEND_KEY
             },
            body: JSON.stringify(credentials),
            credentials: 'include', // Include session cookies
        });

        const result = await response.json();
        console.log(result);
        if (response.ok) {
            alert(result.message);
            navigate('/admin/home'); // Redirect to the home page
        } else {
            alert(result.message);
        }
    };


    return (
      <Background numOfParticles={20}>
        <div className="flex justify-center items-center h-screen w-screen bg-cover bg-center z-50">
            <div className="w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
                <form className="space-y-6" onSubmit={submitHandler}>
                    <h5 className="text-xl font-medium text-gray-900 dark:text-white">Sign in to our platform</h5>

                    <InputAdminUserName
                        value={credentials.username}
                        onChange={changeHandler}
                    />
                    <InputAdminPassword
                        value={credentials.password}
                        onChange={changeHandler}
                    />

                    <button type="submit" className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Login to your account</button>
                </form>
            </div>
        </div>
      </Background>
    );
}
