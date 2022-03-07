import styled from "styled-components";
import FontSizes from "../../constants/fontSizes";
import { ModalTitleWrap } from "../../modals/ModalWrapper";
import { Button } from "../../shared/SharedComponents";
import { useRouter } from "next/router";
import routes from "../../constants/routes";

const Wrapper = styled.div`
  margin: 0 20px;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const Message = styled.div`
  font-size: ${FontSizes.H6};
  margin: 10px 0 20px;
`;

const GameNotFound = () => {
  const router = useRouter();
  return (
    <Wrapper>
      <ModalTitleWrap>Oops...</ModalTitleWrap>
      <Message>
        It seems like you haven&apos;t started a game yet. Click the button below to set one up.
      </Message>
      <Button
        onClick={() => router.replace(routes.homeRoute)}
        style={{ width: "fit-content", alignSelf: "center" }}
      >
        Game Setup
      </Button>
    </Wrapper>
  );
};

export default GameNotFound;
