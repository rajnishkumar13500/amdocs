import { Facebook, Instagram, Github } from "lucide-react"

const Footer = () => {
  return (
    <footer className="bg-white text-blue-600 py-8 mt-auto shadow-md">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Company Info */}
          <div>
            <h3 className="text-xl font-bold mb-4 text-blue-600">Course Recommender</h3>
            <p className="text-gray-600">
              Helping you find the perfect learning path through personalized course recommendations.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-4 text-blue-600">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="/" className="text-gray-600 hover:text-blue-600 transition">Home</a></li>
              <li><a href="/about" className="text-gray-600 hover:text-blue-600 transition">About</a></li>
              <li><a href="/courses" className="text-gray-600 hover:text-blue-600 transition">Courses</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-bold mb-4 text-blue-600">Contact Us</h3>
            <div className="space-y-2 text-gray-600">
              <p>Email: contact@courserecommender.com</p>
              <p>Phone: +91 9572682114</p>
              <p>Address: National Institute of Technology, Agartala, Tripura, India</p>
            </div>
          </div>

        </div>

        <div className="flex gap-4 justify-center mt-8">
          <a href="https://github.com" target="_blank" rel="noopener noreferrer">
            <Github className="w-6 h-6 cursor-pointer text-gray-600 hover:text-blue-600" />
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
            <Instagram className="w-6 h-6 cursor-pointer text-gray-600 hover:text-blue-600" />
          </a>
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
            <Facebook className="w-6 h-6 cursor-pointer text-gray-600 hover:text-blue-600" />
          </a>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-200 mt-8 pt-8 text-center">
          <p className="text-gray-600">© {new Date().getFullYear()} Course Recommender. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
