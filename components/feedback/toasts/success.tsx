import { SizableText, View } from "tamagui";

type SuccessToastProps = {
  message: string;
};
export default function SuccessToast({ message }: SuccessToastProps) {
  return (
    <View
      alignSelf="center"
      bg={"$teal-9"}
      br={"$12"}
      m="$2"
      px={"$5"}
      py={"$3"}
    >
      <SizableText color={"$white"} fontWeight={"700"}>
        {message}
      </SizableText>
    </View>
  );
}
