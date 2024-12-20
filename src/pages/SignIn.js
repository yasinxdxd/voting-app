import React, {useState} from "react";
import { useNavigate } from 'react-router-dom';
import { Label, Input, CheckBox } from "../components/BasicComponents";
import { Background } from "../components/Background";

const InputTc = ({value, onChange}) => {
    return (
        <div>
            <Label
                text={"TC Kimlik Numarası"}
                name={"tc_no"}
            />
            <Input
                type={"text"}
                placeholder={"örn: 75353564654"}
                name={"tc_no"}
                required={true}
                value={value}
                onChange={onChange}
            />
        </div>
    );
}

const InputPassword = ({value, onChange}) => {
    return (
        <div>
            <Label
                text={"Your Password"}
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

export const SignIn = () => {
    const [credentials, setCredentials] = useState({
        tc_no: "",
        password: "",
        remember_me: false,
    });

    const navigate = useNavigate();

    const changeHandler = (event) => {
        const { name, type, checked, value } = event.target;
        setCredentials({
            ...credentials,
            [name]: type === 'checkbox' ? checked : value,
        })
        console.log(credentials);
    };

    const submitHandler = async (e) => {
        e.preventDefault();

        const response = await fetch('http://localhost:5000/auth/signin', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-api-key': process.env.VOTING_API_BACKEND_KEY
             },
            body: JSON.stringify(credentials),
            credentials: 'include', // Include session cookies
        });

        const result = await response.json();
        console.log(result);
        if (response.ok) {
            alert(result.message);
            navigate('/home'); // Redirect to the home page
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

                    <InputTc
                        value={credentials.tc_no}
                        onChange={changeHandler}
                    />
                    <InputPassword
                        value={credentials.password}
                        onChange={changeHandler}
                    />
                    
                    <div className="flex items-start">
                        <CheckBox
                            name={"remember_me"}
                            value={credentials.remember_me}
                            onChange={changeHandler}
                            htmlText={"Remember me"}
                        />
                        <a href="#" className="ms-auto text-sm text-blue-700 hover:underline dark:text-blue-500">Lost Password?</a>
                    </div>

                    <button type="submit" className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Login to your account</button>

                    <div className="text-sm font-medium text-gray-500 dark:text-gray-300">
                        Not registered? <a href="/signup" className="text-blue-700 hover:underline dark:text-blue-500">Create account</a>
                    </div>
                </form>
            </div>
        </div>
      </Background>
    );
}
