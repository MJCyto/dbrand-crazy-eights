// Taken from https://sean.brunnock.com/SVG/suits.html

import Colors from "../constants/colors";

export const ClubsIcon = props => {
  const { size, color } = props;
  return (
    <svg width={size} height={size} fill={color} viewBox="0 0 60 60" {...props}>
      <circle cx={18} cy={35} r={14} />
      <circle cx={30} cy={15} r={14} />
      <circle cx={42} cy={35} r={14} />
      <path d="M30 30q0 20-10 30h20Q30 50 30 30" />
    </svg>
  );
};

ClubsIcon.defaultProps = {
  size: 15,
  color: Colors.White,
};

export const DiamondIcon = props => {
  const { size, color } = props;

  return (
    <svg width={size} height={size} fill={color} viewBox="0 0 60 60" {...props}>
      <path fill={color} transform="rotate(45 30 30)" d="M10 10h40v40H10z" />
    </svg>
  );
};

DiamondIcon.defaultProps = {
  size: 15,
  color: Colors.DBrandYellow,
};

export const HeartIcon = props => {
  const { size, color } = props;

  return (
    <svg width={size} height={size} viewBox="0 0 600 600" {...props}>
      <g transform="rotate(45 300 300)" fill={color}>
        <path d="M150 150h350v350H150z" />
        <circle cx={150} cy={325} r={175} />
        <circle cx={325} cy={150} r={175} />
      </g>
    </svg>
  );
};

HeartIcon.defaultProps = {
  size: 15,
  color: Colors.DBrandYellow,
};

export const SpadeIcon = props => {
  const { size, color } = props;

  return (
    <svg width={size} height={size} fill={color} viewBox="0 0 60 60" {...props}>
      <g transform="rotate(225 30 30)">
        <path d="M20 20h30v30H20z" />
        <circle cx={20} cy={35} r={15} />
        <circle cx={35} cy={20} r={15} />
      </g>
      <path d="M30 30q0 20-10 30h20Q30 50 30 30" />
    </svg>
  );
};

SpadeIcon.defaultProps = {
  size: 15,
  color: Colors.White,
};
