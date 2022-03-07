import { Modal } from "@mui/material";
import Colors from "../constants/colors";
import styled from "styled-components";
import FontSizes from "../constants/fontSizes";

export const ModalTitleWrap = styled.div`
  color: ${Colors.DBrandYellow};
  font-size: ${FontSizes.H3};
`;

export const ModalMessageWrap = styled.div`
  color: ${Colors.Jet};
`;

const ModalWrapper = ({ children, open }) => {
  return (
    <Modal open={open}>
      <div
        style={{
          backgroundColor: Colors.White,
          border: `1px solid ${Colors.Black}`,
          padding: 20,
          margin: "auto",
        }}
      >
        {children}
      </div>
    </Modal>
  );
};

export default ModalWrapper;
