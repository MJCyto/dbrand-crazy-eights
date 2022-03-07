import { Modal } from "@mui/material";
import Colors from "../constants/colors";
import styled from "styled-components";
import FontSizes from "../constants/fontSizes";

const StyledModal = styled(Modal)`
  margin: auto;
  outline: none;
  height: fit-content;
  width: fit-content;
  > *:focus-visible {
    outline: none;
  }
`;

const Wrapper = styled.div`
  background-color: ${Colors.Jet};
  box-shadow: 0 5px 30px rgba(0, 0, 0, 0.8);
  border-radius: 5px;
  padding: 20px;
  width: calc(100vw - 20px);
`;

export const ModalTitleWrap = styled.div`
  color: ${Colors.DBrandYellow};
  font-size: ${FontSizes.H3};
  text-align: center;
  margin-bottom: 20px; ;
`;

export const ModalMessageWrap = styled.div`
  color: ${Colors.White};
  text-align: center;
  margin-bottom: 30px;
`;

export const ButtonWrap = styled.div`
  display: flex;
  justify-content: space-between;
  column-gap: 10px;
`;

const ModalWrapper = ({ children, open, style }) => {
  return (
    <StyledModal open={open}>
      <Wrapper style={style}>{children}</Wrapper>
    </StyledModal>
  );
};

export default ModalWrapper;
