import { RadiusTokens, View } from "tamagui";

type ProgressBar2Props = {
  bg?: string;
  br?: RadiusTokens;
  progress: number;
};
export default function ProgressBar2({
  bg = "$primary",
  br = "$12",
  progress,
}: ProgressBar2Props) {
  return (
    <View
      animation={"medium"}
      bg={bg}
      br={br}
      h={"100%"}
      scaleX={progress / 100}
    />
  );
}
