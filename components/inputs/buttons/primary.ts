import { Button, styled } from "tamagui";

export const PrimaryButton = styled(Button, {
  bg: "$primary",
  color: "$white",
});

export const PrimaryOutlinedButton = styled(Button, {
  borderColor: "$primary",
  borderWidth: "$1",
  color: "$textPrimary",
});
