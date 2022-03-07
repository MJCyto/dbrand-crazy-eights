import TitleBar from "../pages/TitleBar";
import Colors from "../constants/colors";
import styled from "styled-components";

const InnerWrapper = styled.div`
  background-color: ${Colors.Black};
  color: ${Colors.White};
  height: calc(100% - 50px);
`;

const PageWrapper = ({ children }) => {
  return (
    <div style={{ height: "100vh" }}>
      <TitleBar />
      <InnerWrapper>{children}</InnerWrapper>
    </div>
  );
};

export default PageWrapper;
