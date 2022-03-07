import styled from "styled-components";
import Colors from "../constants/colors";
import Fonts from "../constants/Fonts";
import FontSizes from "../constants/fontSizes";

export const NumCardsButton = styled.button`
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

export const ButtonVariants = Object.freeze({
  PRIMARY: "PRIMARY",
  SECONDARY: "SECONDARY",
  TERTIARY: "TERTIARY",
});

export const ButtonBase = styled.button`
  padding: 10px;
  font-family: ${Fonts.Default};
  font-size: ${FontSizes.H6};
  border: none;
  border-radius: 3px;
  transition: 0.1s ease-in-out;

  :focus-visible {
    outline: none;
  }

  :hover {
    box-shadow: 0 5px 10px rgba(0, 0, 0, 0.8);
  }
`;

const PrimaryButton = styled(ButtonBase)`
  background-color: ${Colors.Black};
  color: ${Colors.White};
`;

const SecondaryButton = styled(ButtonBase)`
  background-color: ${Colors.DBrandYellow};
`;

const TertiaryButton = styled(ButtonBase)``;

export const Button = props => {
  const { variant } = props;

  switch (variant) {
    case ButtonVariants.PRIMARY: {
      return <PrimaryButton {...props} />;
    }
    case ButtonVariants.SECONDARY: {
      return <SecondaryButton {...props} />;
    }
    case ButtonVariants.TERTIARY: {
      return <TertiaryButton {...props} />;
    }
  }
};

Button.defaultProps = {
  variant: ButtonVariants.PRIMARY,
};
