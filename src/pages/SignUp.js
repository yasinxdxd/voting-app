import React, { useState, useRef, useEffect } from "react";
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

const InputFirstName = ({value, onChange}) => {
    return (
        <div>
            <Label
                text={"Ad"}
                name={"first_name"}
            />
            <Input
                type={"text"}
                name={"first_name"}
                required={true}
                value={value}
                onChange={onChange}
            />
        </div>
    );
}

const InputLastName = ({value, onChange}) => {
    return (
        <div>
            <Label
                text={"Soyad"}
                name={"last_name"}
            />
            <Input
                type={"text"}
                name={"last_name"}
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

const InputBirthDate = ({value, onChange}) => {
    return (
        <div>
            <Label
                text={"Birth Date"}
                name={"birthdate"}
            />
            <Input
                type={"date"}
                name={"birthdate"}
                // placeholder={"••••••••"}
                required={true}
                value={value}
                onChange={onChange}
            />
        </div>
    );
}

const InputGender = ({ value, onChange }) => {
    return (
        <div>
            <Label
                text={"Gender"}
                name={"gender"}
            />
            <select
                name="gender"
                required={true}
                value={value}
                onChange={onChange}
                className="input-class" // Add styling if needed
            >
                <option value="" disabled>
                    Select Gender
                </option>
                <option value="M">Male</option>
                <option value="F">Female</option>
                <option value="O">Other</option>
            </select>
        </div>
    );
};

const Modal = ({ open, onClose, children }) => {
    return (
      // backdrop
      <div
        onClick={onClose}
        className={`
          fixed inset-0 flex justify-center items-center transition-colors
          ${open ? "visible bg-black/20" : "invisible"}
        `}
      >
        {/* modal */}
        <div
          onClick={(e) => e.stopPropagation()}
          className={`
            bg-white rounded-xl shadow p-6 transition-all
            ${open ? "scale-100 opacity-100" : "scale-125 opacity-0"}
          `}
        >
          <button
            onClick={onClose}
            className="absolute top-2 right-2 p-1 rounded-lg text-gray-400 bg-white hover:bg-gray-50 hover:text-gray-600"
          >
            x
          </button>
          {children}
        </div>
      </div>
    )
}

const ModatText = () => {
  return (
    <>
    <h3 className="h-3 p-6">Terms and Conditions</h3>
    <p className="leading-2">
        Here you can include the terms and conditions text that users need to agree to.
    </p>
    <div className="overflow-y-auto max-h-[70vh] text-sm text-gray-700 dark:text-gray-300">
      <h3 className="font-semibold mb-2">1. Acceptance of Terms</h3>
      <p>
          By accessing our platform, you confirm that you have read, understood, and agreed to these
          Terms and Conditions. These Terms and Conditions may be updated at any time, and it is your
          responsibility to review them periodically.
      </p>

      <h3 className="font-semibold mt-4 mb-2">2. Eligibility</h3>
      <p>
          You must be at least 18 years old or the age of majority in your jurisdiction to use our
          services. By using our services, you represent and warrant that you meet the eligibility
          requirements.
      </p>

      <h3 className="font-semibold mt-4 mb-2">3. User Obligations</h3>
      <ul className="list-disc list-inside space-y-2">
          <li>Use our services in compliance with all applicable laws and regulations.</li>
          <li>Maintain the confidentiality of your account information and password.</li>
          <li>
          Avoid using our services to spread malware, spam, or engage in any fraudulent activities.
          </li>
      </ul>

      <h3 className="font-semibold mt-4 mb-2">4. Content and Intellectual Property</h3>
      <p>
          All content on this platform, including text, graphics, logos, and software, is owned by
          [Your Company Name] or licensed to us. You may not reproduce, distribute, or create
          derivative works based on our content without prior written consent.
      </p>

      {/* Add more sections as needed */}
    </div>
    </>
  );
}


const TermsAndConditions = ({ value, onChange, setShowModal }) => {

    return (
        <>
        <div className="flex items-start">
            <CheckBox
                name={"terms"}
                value={value}
                required={true}
                onChange={onChange}
                htmlText={"I agree with"}
            />
            <a
                href="#"
                onClick={(e) => {
                    e.preventDefault(); // Prevent default anchor behavior
                    setShowModal(true)
                }}
                className="ms-2 text-sm text-blue-700 hover:underline dark:text-blue-500"
            >
                Terms and Conditions
            </a>
        </div>
      </>
    );
    
};

export const SignUp = () => {

    const [showModal, setShowModal] = useState(false);

    const [credentials, setCredentials] = useState({
        tc_no: "",
        first_name: "",
        last_name: "",
        birthdate: null,
        password: "",
        gender: "O",
    });

    const navigate = useNavigate();

    const changeHandler = (event) => {
        const { name, type, checked, value } = event.target;
        setCredentials((prev) => ({
            ...prev,
            [name]: name === "gender"
                ? value
                : (name === "birthdate" && value !== null)
                ? value.split("T")[0] // Ensure the correct format
                : type === "checkbox"
                ? checked
                : value,
        }));
        console.log(credentials);
    };

    const submitHandler = async (e) => {
        e.preventDefault();

        const response = await fetch('http://localhost:5000/auth/signup', {
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
            navigate('/home'); // Redirect to the home page
        } else {
            alert(result.message);
        }
    };

    return (
      <Background numOfParticles={20}>
        <div className="flex justify-center items-center h-screen w-screen bg-cover bg-center">
            <div className="w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
                <form className="space-y-6" onSubmit={submitHandler}>
                    <h5 className="text-xl font-medium text-gray-900 dark:text-white">Sign in to our platform</h5>

                    <InputTc
                        value={credentials.tc_no}
                        onChange={changeHandler}
                        />
                    <InputFirstName
                        value={credentials.first_name}
                        onChange={changeHandler}
                        />
                    <InputLastName
                        value={credentials.last_name}
                        onChange={changeHandler}
                        />
                    <InputPassword
                        value={credentials.password}
                        onChange={changeHandler}
                        />
                    
                    <InputBirthDate
                        value={credentials.birthdate}
                        onChange={changeHandler}
                    />

                    <InputGender
                        value={credentials.gender}
                        onChange={changeHandler}
                    />

                    <TermsAndConditions
                        onChange={changeHandler}
                        value={"I agree with"}
                        setShowModal={setShowModal}
                    />

                    <button type="submit" className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Create your account</button>

                    <div className="text-sm font-medium text-gray-500 dark:text-gray-300">
                        Already have an account? <a href="/signin" className="text-blue-700 hover:underline dark:text-blue-500">Login</a>
                    </div>
                </form>
            </div>
        </div>
            
        <Modal open={showModal} onClose={() => setShowModal(false)}>
          <ModatText/>
        </Modal>

      </Background>

    );
}
