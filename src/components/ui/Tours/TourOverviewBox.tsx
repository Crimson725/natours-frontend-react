import { FaRegCalendar, FaRegUser, FaRegStar, FaSignal } from "react-icons/fa";
import { IconType } from "react-icons/lib";

type TourOverviewBoxProps = {
  label: string;
  text: string;
  icon: keyof typeof tourOverviewIcons;
};

const tourOverviewIcons = {
  date: FaRegCalendar,
  difficulty: FaSignal,
  participants: FaRegUser,
  rating: FaRegStar,
};

const TourOverviewIcon = ({ Icon }: { Icon: IconType }) => {
  return <Icon className="overview-box__icon" />;
};

const TourOverviewBox = ({ label, text, icon }: TourOverviewBoxProps) => {
  return (
    <div className="overview-box__detail">
      <TourOverviewIcon Icon={tourOverviewIcons[icon]} />
      <span className="overview-box__label">{label}</span>
      <span className="overview-box__text">{text}</span>
    </div>
  );
};

export default TourOverviewBox;
