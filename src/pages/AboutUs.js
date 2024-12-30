import { FaFacebook, FaTwitter, FaLinkedin, FaEnvelope } from "react-icons/fa";
import { BsFillTelephoneFill } from "react-icons/bs";
import { Background } from "../components/Background";
import { Navbar } from "../components/Navbar";

export const AboutUs = () => {
  const coreValues = [
    {
      title: "Transparency",
      description: "We ensure complete transparency in all electoral processes",
      image: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c"
    },
    {
      title: "Integrity",
      description: "Maintaining highest standards of integrity in every action",
      image: "https://images.unsplash.com/photo-1507537297725-24a1c029d3ca"
    },
    {
      title: "Security",
      description: "Providing robust security measures for safe elections",
      image: "https://images.unsplash.com/photo-1639322537228-f710d846310a"
    },
    {
      title: "Accessibility",
      description: "Making voting accessible to every eligible citizen",
      image: "https://images.unsplash.com/photo-1560264280-88b68371db39"
    }
  ];

  const teamMembers = [
    { name: 'Muhammed Yasinhan Yaşar', role: 'CEO', image: "/images/person1.jpeg" }, 
    { name: 'Melike Erdem', role: 'CEO', image: "/images/person2.jpeg" } 
  ];

  return (
    <Background>
      <Navbar />
      <div className="min-h-screen">
        <div className="py-16 text-white text-center">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">About Us</h1>
            <p className="text-lg md:text-xl max-w-3xl mx-auto text-center">
              We are dedicated to providing a secure, transparent, and efficient election system that empowers democracy and ensures every voice is heard.
            </p>
          </div>
        </div>

        <div className="container mx-auto px-4 py-16 bg-gray-600">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-white mb-6">Our Mission</h2>
            <p className="text-lg text-white">
              To revolutionize the electoral process by leveraging cutting-edge technology while maintaining the highest standards of security, accessibility, and transparency, ensuring every citizen"s right to participate in the democratic process.
            </p>
          </div>
        </div>

        <div className="bg-gray-400 py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl font-bold text-gray-600 mb-6">Our Vision</h2>
              <p className="text-lg text-gray-700">
                To become the global standard for digital democracy, creating a world where every eligible voter can participate in elections seamlessly, securely, and confidently.
              </p>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-12">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">Our Core Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {coreValues.map((value, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden transform hover:scale-105 transition-transform duration-300">
                <img
                  src={value.image}
                  alt={value.title}
                  className="w-full h-40 object-cover"
                  onError={(e) => {
                    e.target.src = "https://images.unsplash.com/photo-1584824486509-112e4181ff6b";
                  }}
                />
                <div className="p-4">
                  <h3 className="text-lg font-bold text-blue-800 mb-2">{value.title}</h3>
                  <p className="text-sm text-gray-600">{value.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-gray-400 py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-white mb-12 text-center">Our Leadership Team</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {teamMembers.map((member, index) => (
                <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden transform hover:scale-105 transition-transform duration-300">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-64 object-cover"
                  />
                  <div className="p-6 text-center">
                    <h3 className="text-xl font-bold text-fuchsia-900 mb-2">{member.name}</h3>
                    <p className="text-gray-600">{member.role}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <footer className="bg-fuchsia-950 text-white py-12">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-8">Contact Us</h2>
              <div className="flex flex-wrap justify-center gap-8 mb-8">
                <a href="mailto:info@electionsystem.com" className="flex items-center gap-2 hover:text-blue-200 transition-colors transform hover:scale-105">
                  <FaEnvelope className="text-xl" />
                  <span>info@electionsystem.com</span>
                </a>
                <a href="tel:+1234567890" className="flex items-center gap-2 hover:text-blue-200 transition-colors transform hover:scale-105">
                  <BsFillTelephoneFill className="text-xl" />
                  <span>(+90) 553 203 6465</span>
                </a>
              </div>
              <div className="flex justify-center gap-6">
                <a href="#" className="text-2xl hover:text-blue-200 transition-colors transform hover:scale-110">
                  <FaFacebook />
                </a>
                <a href="#" className="text-2xl hover:text-blue-200 transition-colors transform hover:scale-110">
                  <FaTwitter />
                </a>
                <a href="#" className="text-2xl hover:text-blue-200 transition-colors transform hover:scale-110">
                  <FaLinkedin />
                </a>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </Background>
  );
};
