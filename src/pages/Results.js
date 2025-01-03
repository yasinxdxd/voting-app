import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Background } from "../components/Background";
import { Navbar } from "../components/Navbar";

const ElectionsChart = () => {
    const [elections, setElections] = useState([]);
    const [selectedElection, setSelectedElection] = useState(null);
    const [chartData, setChartData] = useState(null);

    useEffect(() => {
        const fetchElections = async () => {
            try {
                const response = await fetch('http://localhost:5000/vote/AllVotes', {
                    method: 'GET',
                    headers: {
                        'x-api-key': process.env.REACT_APP_VOTING_API_BACKEND_KEY,
                    },
                    credentials: 'include',
                });

                const data = await response.json();
                setElections(data.elections);
                if (data.elections.length > 0) {
                    setSelectedElection(data.elections[0]); // Default to the first election
                }
            } catch (error) {
                console.error("Error fetching elections:", error);
            }
        };

        fetchElections();
    }, []);

    useEffect(() => {
        if (selectedElection) {
            const labels = selectedElection.candidates.map(c => c.candidate_name);
            const votes = selectedElection.candidates.map(c => c.votes);

            setChartData({
                labels,
                datasets: [
                    {
                        label: `Votes for ${selectedElection.election_name}`,
                        data: votes,
                        backgroundColor: 'rgba(75, 192, 192, 0.6)',
                        borderColor: 'rgba(75, 192, 192, 1)',
                        borderWidth: 1,
                    },
                ],
            });
        }
    }, [selectedElection]);

    return (
        <Background>
        <Navbar />
        <div>
        <h1 className="text-3xl font-bold text-center mb-6">Elections Chart</h1>

        {/* Dropdown to select an election */}
        {elections.length > 0 && (
            <div className="flex justify-center mb-6">
                <select
                    onChange={(e) =>
                        setSelectedElection(elections.find(el => el.election_id === parseInt(e.target.value)))
                    }
                    value={selectedElection?.election_id || ''}
                    className="px-4 py-2 text-lg border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    {elections.map(election => (
                        <option key={election.election_id} value={election.election_id}>
                            {election.election_name}
                        </option>
                    ))}
                </select>
            </div>
        )}

           {/* Chart */}
            {chartData && (
                <div className="w-full max-w-3xl mx-auto p-4">
                    <Bar
                        data={chartData}
                        options={{
                            responsive: true,
                            scales: {
                                y: {
                                    beginAtZero: true,
                                },
                            },
                        }}
                    />
                </div>
            )}
        </div>
        </Background>
    );
};

export default ElectionsChart;
