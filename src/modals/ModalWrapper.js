import { Modal } from "@mui/material";
import Colors from "../constants/colors";

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
