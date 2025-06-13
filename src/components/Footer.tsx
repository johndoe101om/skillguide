import { Link } from "react-router-dom";

const Footer = () => {
  const quickLinks = [
    { path: "/register", label: "Register" },
    { path: "/dashboard", label: "Dashboard" },
    { path: "/reports", label: "Reports" },
    { path: "/analytics", label: "Analytics" },
    { path: "/test", label: "Test" },
  ];

  const helpLinks = [
    { path: "/help", label: "Help Center" },
    { path: "/documentation", label: "Documentation" },
    { path: "/contact", label: "Contact Us" },
    { path: "/privacy", label: "Privacy Policy" },
  ];

  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8">
          <div className="col-span-2">
            <div className="text-2xl font-bold text-white mb-4">SKILLGUIDE</div>
            <p className="text-gray-400 mb-4">
              Empowering learners with intelligent training management,
              personalized learning paths, and AI-driven insights. Transforming
              education through innovative technology.
            </p>
            <p className="text-gray-400 text-sm">
              Built for modern learning environments with advanced analytics and
              mobile-first design.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-white mb-4">Quick Links</h3>
            <ul className="space-y-2 text-gray-400">
              {quickLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-white mb-4">Support</h3>
            <ul className="space-y-2 text-gray-400">
              {helpLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>
            © 2024 SkillGuide Technologies. All rights reserved. Skill
            Navigator Application.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
