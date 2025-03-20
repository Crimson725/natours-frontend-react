import { Link } from "react-router-dom";
import {
  FaRegSun,
  FaShoppingBasket,
  FaRegStar,
  FaRegMap,
  FaUserFriends,
} from "react-icons/fa";
import { BsCreditCard } from "react-icons/bs";

const sideNavIcons = {
  settings: FaRegSun,
  basket: FaShoppingBasket,
  star: FaRegStar,
  card: BsCreditCard,
  map: FaRegMap,
  users: FaUserFriends,
};

const SideNavIcon = ({ Icon }: { Icon: React.ElementType }) => {
  return <Icon />;
};

const SideNavItem = ({
  link,
  text,
  icon,
  active = false,
}: {
  link: string;
  text: string;
  icon: string;
  active?: boolean;
}) => {
  return (
    <li className={`${active === true ? "side-nav--active" : ""}`}>
      <Link to={link}>
        <SideNavIcon Icon={sideNavIcons[icon as keyof typeof sideNavIcons]} />
        {text}
      </Link>
    </li>
  );
};

export default SideNavItem;
