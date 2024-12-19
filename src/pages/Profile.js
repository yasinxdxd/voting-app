import React from "react";
import { Background } from "../components/Background";
import { Bar } from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

export const Profile = () => {
    const userData = {
        profilePicture: "https://via.placeholder.com/150", // Kullanıcı resmi URL'si
        name: "Bilge",
        fullName: "Elif Bilge Doğan",
        age: 18,
        mobile: "05562356545",
        email: "aşkkadın@gmail.com",
        address: "cebeci site kız yurdu",
    };

    const surveys = [
        {
            id: 1,
            title: "Favorite Programming Language",
            userVote: "JavaScript",
            results: {
                JavaScript: 50,
                Python: 30,
                Java: 20,
            },
        },
        {
            id: 2,
            title: "Best Movie of 2024",
            userVote: "Inception 2",
            results: {
                "Inception 2": 40,
                "Avatar 3": 35,
                "The Batman": 25,
            },
        },
    ];

    const renderSurveyResults = (survey) => {
        const data = {
            labels: Object.keys(survey.results),
            datasets: [
                {
                    label: "Votes",
                    data: Object.values(survey.results),
                    backgroundColor: ["#4caf50", "#ff9800", "#2196f3"],
                },
            ],
        };

        return (
            <div key={survey.id} className="mb-4">
                <h4 className="text-md font-medium text-gray-800 dark:text-white mb-2">
                    {survey.title}
                </h4>
                <div style={{ height: '200px', width: '100%' }}>
                    <Bar data={data} options={{ responsive: true, maintainAspectRatio: false }} />
                </div>
                <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                My Vote: <span className="font-bold">{survey.userVote}</span>
                </p>
            </div>
        );
    };

    return (
        <Background>
            <div className="flex flex-col md:flex-row h-screen w-screen bg-cover bg-center z-50 p-6">
                {/* Sol Panel */}
                <div className="w-full md:w-1/3 bg-white border-gray-200 rounded-lg shadow p-6 dark:bg-gray-800 dark:border-gray-700">
                    <div className="text-center flex justify-center">
                        <img
                            className="w-24 h-24 border-4 border-gray-300"
                            src={userData.profilePicture}
                            alt="User Profile"
                        />
                    </div>

                    <h2 className="text-center text-xl font-medium text-gray-900 dark:text-white mt-4">
                        {userData.name}
                    </h2>
                    <hr className="my-4 border-gray-300 dark:border-gray-600" />
                    <ul className="text-center text-sm text-gray-600 dark:text-gray-400 space-y-2">
                        <li>
                            <strong>Full Name:</strong> {userData.fullName}
                        </li>
                        <li>
                            <strong>Age:</strong> {userData.age}
                        </li>
                        <li>
                            <strong>Mobile:</strong> {userData.mobile}
                        </li>
                        <li>
                            <strong>Email:</strong> {userData.email}
                        </li>
                        <li>
                            <strong>Address:</strong> {userData.address}
                        </li>
                    </ul>

                    {/* Edit Profil Button */}
                   <button type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center me-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                    <svg class="w-[12px] h-[12px] text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                     <path fill-rule="evenodd" d="M14 4.182A4.136 4.136 0 0 1 16.9 3c1.087 0 2.13.425 2.899 1.182A4.01 4.01 0 0 1 21 7.037c0 1.068-.43 2.092-1.194 2.849L18.5 11.214l-5.8-5.71 1.287-1.31.012-.012Zm-2.717 2.763L6.186 12.13l2.175 2.141 5.063-5.218-2.141-2.108Zm-6.25 6.886-1.98 5.849a.992.992 0 0 0 .245 1.026 1.03 1.03 0 0 0 1.043.242L10.282 19l-5.25-5.168Zm6.954 4.01 5.096-5.186-2.218-2.183-5.063 5.218 2.185 2.15Z" clip-rule="evenodd"/>
                    </svg>

                     Edit Profile
                    </button>

                    
                </div>

                {/* Sağ Panel */}
                <div className="w-full md:w-2/3 mt-6 md:mt-0 md:ml-6 bg-white border border-gray-200 rounded-lg shadow p-6 dark:bg-gray-800 dark:border-gray-700">
                    <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-4">Surveys you participated in</h3>
                    {surveys.map(renderSurveyResults)}
                </div>
            </div>
        </Background>
    );
};
