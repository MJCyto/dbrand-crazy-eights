import { Alert } from "@mui/material";
import styled from "styled-components";

const Wrapper = styled.div`
  position: relative;
  max-width: 300px;
  margin: 0 auto;
`;

const InnerWrap = styled.div`
  position: absolute;
  top: 70px;
  margin: 0 auto;
  width: 100%;
  z-index: 5;
`;

const ErrorAlert = ({ message }) => {
  return (
    <Wrapper>
      <InnerWrap>
        <Alert variant="filled" severity="error">
          {message}
        </Alert>
      </InnerWrap>
    </Wrapper>
  );
};

export default ErrorAlert;
