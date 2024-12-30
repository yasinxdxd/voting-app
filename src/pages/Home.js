import React, { useState } from "react";
import { FaUserCircle, FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import { Navbar } from "../components/Navbar";
import { Background } from "../components/Background";

export const Home = () => {
  const [hasVoted, setHasVoted] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [selectedElection, setSelectedElection] = useState(null);

  const elections = [
    {
      id: 1,
      title: "Presidential Election 2024",
      description: "Vote for the next president of the country",
      candidates: [
        {
          id: 1,
          name: "Sarah Johnson",
          position: "Presidential Candidate",
          party: "Progressive Party",
          image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3"
        },
        {
          id: 2,
          name: "Michael Chen",
          position: "Presidential Candidate",
          party: "Democratic Alliance",
          image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3"
        },
        {
          id: 3,
          name: "Emma Rodriguez",
          position: "Presidential Candidate",
          party: "People's Choice",
          image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?ixlib=rb-4.0.3"
        }
      ]
    },
    {
      id: 2,
      title: "Senate Election 2024",
      description: "Vote for your state senator",
      candidates: [
        {
          id: 4,
          name: "David Wilson",
          position: "Senate Candidate",
          party: "Progressive Party",
          image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?ixlib=rb-4.0.3"
        },
        {
          id: 5,
          name: "Lisa Anderson",
          position: "Senate Candidate",
          party: "Democratic Alliance",
          image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3"
        }
      ]
    }
  ];

  const handleVoteClick = (candidate, electionId) => {
    if (!hasVoted[electionId]) {
      setSelectedCandidate(candidate);
      setSelectedElection(electionId);
      setShowModal(true);
    }
  };

  const handleConfirmVote = () => {
    setHasVoted(prev => ({
      ...prev,
      [selectedElection]: true
    }));
    setShowModal(false);
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 3000);
  };

  return (
    <Background>
    <Navbar />
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">Online Voting Portal</h1>
          <p className="text-lg text-white">
            Cast your vote in multiple elections. Choose wisely - you can only vote once per election!
          </p>
        </div>

        <div className="space-y-12">
          {elections.map((election) => (
            <div key={election.id} className="bg-white/80 backdrop-blur-sm rounded-lg shadow-lg p-6 border border-fuchsia-200">
              <h2 className="text-2xl font-bold text-fuchsia-800 mb-4">{election.title}</h2>
              <p className="text-purple-600 mb-6">{election.description}</p>

              {hasVoted[election.id] ? (
                <div className="bg-fuchsia-50 border border-fuchsia-200 rounded-lg p-6 text-center">
                  <FaCheckCircle className="w-16 h-16 text-fuchsia-500 mx-auto mb-4" />
                  <h2 className="text-2xl font-semibold text-fuchsia-800 mb-2">
                    Thank you for voting in {election.title}!
                  </h2>
                  <p className="text-purple-600">
                    Your vote has been recorded. You cannot vote again in this election.
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {election.candidates.map((candidate) => (
                    <div
                      key={candidate.id}
                      className="bg-white/90 rounded-lg shadow-lg overflow-hidden transition transform hover:scale-105 border border-pink-200"
                    >
                      <div className="w-full h-32 flex items-center justify-center overflow-hidden">
                        <img
                          src={candidate.image}
                          alt={candidate.name}
                          className="w-full h-full object-cover object-center"
                          onError={(e) => {
                            e.target.src = "https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-4.0.3";
                          }}
                        />
                      </div>
                      <div className="p-6">
                        <h3 className="text-xl font-semibold text-fuchsia-900 mb-2">
                          {candidate.name}
                        </h3>
                        <p className="text-purple-600 mb-2">{candidate.position}</p>
                        <p className="text-pink-500 mb-4">{candidate.party}</p>
                        <button
                          onClick={() => handleVoteClick(candidate, election.id)}
                          className="w-full bg-gradient-to-r from-pink-500 to-fuchsia-500 text-white py-2 px-4 rounded-md hover:from-pink-600 hover:to-fuchsia-600 transition duration-300"
                        >
                          Vote
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white/90 backdrop-blur-sm rounded-lg p-6 max-w-md w-full border border-fuchsia-200">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-semibold text-fuchsia-900">Confirm Your Vote</h3>
                <button
                  onClick={() => setShowModal(false)}
                  className="text-purple-500 hover:text-purple-700"
                >
                  <IoMdClose className="w-6 h-6" />
                </button>
              </div>
              <p className="mb-4 text-purple-700">
                Are you sure you want to vote for {selectedCandidate?.name}?
              </p>
              <div className="flex space-x-4">
                <button
                  onClick={handleConfirmVote}
                  className="flex-1 bg-gradient-to-r from-pink-500 to-fuchsia-500 text-white py-2 px-4 rounded-md hover:from-pink-600 hover:to-fuchsia-600 transition duration-300"
                >
                  Confirm
                </button>
                <button
                  onClick={() => setShowModal(false)}
                  className="flex-1 bg-purple-100 text-purple-700 py-2 px-4 rounded-md hover:bg-purple-200 transition duration-300"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        {showNotification && (
          <div className="fixed bottom-4 right-4 bg-gradient-to-r from-pink-500 to-fuchsia-500 text-white px-6 py-3 rounded-lg shadow-lg">
            <div className="flex items-center space-x-2">
              <FaCheckCircle className="w-5 h-5" />
              <span>Vote successfully recorded!</span>
            </div>
          </div>
        )}
      </div>
    </div>
    </Background>
  );
};
