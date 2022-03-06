import styled from "styled-components";
import DBrandLogo from "../Icons/DBrandLogo";
import Colors from "../constants/colors";
import FontSizes from "../constants/fontSizes";

const Wrapper = styled.div`
  height: 50px;
  width: 100%;
  color: ${Colors.White};
  background-color: ${Colors.Black};
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: ${FontSizes.H3};
`;

const TitleBar = () => {
  return (
    <Wrapper>
      <DBrandLogo size={20} style={{ marginRight: 10 }} /> Crazy Eights
    </Wrapper>
  );
};

export default TitleBar;
