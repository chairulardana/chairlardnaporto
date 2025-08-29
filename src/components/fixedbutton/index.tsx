import { Link } from "react-router-dom";

function FixedButton({ href, children }) {
  return (
    <Link
      to={href}
      className="fixed top-5 left-5 z-50 h-10 w-10 bg-white rounded-full flex justify-center items-center cursor-pointer shadow-lg hover:bg-gray-100 transition-colors"
    >
      {children}
    </Link>
  );
}

export default FixedButton;