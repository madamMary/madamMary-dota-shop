import image from "../../assets/images/logo.png";
import { Link } from "react-router-dom";

const Logo = () => {
  return (
    <Link to="/" className="logo">
      <img src={image} alt="DotaShop" />
    </Link>
  );
};

export default Logo;
