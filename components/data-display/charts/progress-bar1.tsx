import { View } from "tamagui";

type ProgressBar1Props = {
  bg?: string;
  height?: string;
  progress: number;
  progressBg?: string;
  width?: string;
};
export default function ProgressBar1({
  bg = "$primaryLight",
  height = "$0.75",
  progress,
  progressBg = "$primary",
  width = "100%",
}: ProgressBar1Props) {
  return (
    <View bg={bg} br={"$12"} h={height} overflow={"hidden"} w={width}>
      <View bg={progressBg} h={"100%"} w={`${progress}%`} />
    </View>
  );
}
