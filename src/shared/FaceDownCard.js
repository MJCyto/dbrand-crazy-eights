import styled from "styled-components";
import Colors from "../constants/colors";

const FaceDownCard = styled.button`
  background-image: url("https://i0.wp.com/i.redd.it/614xxx8vxit31.jpg?ssl=1");
  background-size: 300px;
  background-position: center;
  height: 143px;
  width: 90px;
  border-radius: 10px;
  outline: 2px solid ${Colors.White};
  transition: 0.1s ease-in-out;

  ${props =>
    !props.nonSelectable &&
    `
    :focus-visible {
      outline-color: ${Colors.DBrandYellow};
    }
  
    :hover {
      outline-color: ${Colors.DBrandYellow};
    }
  `}
`;

export default FaceDownCard;
