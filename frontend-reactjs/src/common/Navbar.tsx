import { Link } from "react-router-dom";
import { useAuth } from "../features/auth/context/useAuthContext";

function Navbar() {
  const { user, logout } = useAuth();

  const links = [
    { to: "/", label: "Home" },
    { to: "/login", label: "Login" },
    { to: "/register", label: "Register" },
  ];

  return (
    <nav className="border-b border-gray-200 bg-white px-6 py-4">
      <div className="mx-auto flex max-w-5xl items-center justify-between">
        <ul className="flex items-center gap-4">
          {links.map((link, index) => (
            <li key={index}>
              <Link
                className="text-sm font-medium hover:text-blue-600"
                to={link.to}
              >
                {link.label}
              </Link>
            </li>
          ))}
          <li>
            <Link
              className="text-sm font-medium hover:text-blue-600"
              to={"/profile"}
            >
              Profile
            </Link>
          </li>
          <li>
            <Link
              className="text-sm font-medium hover:text-blue-600"
              to={"/users"}
            >
              All users
            </Link>
          </li>
        </ul>
        <div className="flex items-center gap-4">
          {user && <span className="text-sm text-gray-600">{user.email}</span>}
          <button
            type="button"
            onClick={logout}
            className="rounded-lg bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-700"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
