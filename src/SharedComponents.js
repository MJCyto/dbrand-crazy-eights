import styled from "styled-components";
import Colors from "./constants/colors";
import Fonts from "./constants/Fonts";
import FontSizes from "./constants/fontSizes";

export const Button = styled.button`
  background-color: ${Colors.Jet};
  border: none;
  border-radius: 5px;
  color: ${Colors.White};
  font-family: ${Fonts.Default};
  font-size: ${FontSizes.H2};
  transition: 0.1s ease-in-out;

  :hover {
    color: ${Colors.DBrandYellow};
  }
`;

export const CardAnimation = styled.div`
    return <div/>
`;
