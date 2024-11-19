import Svg, { ClipPath, Defs, G, Path, SvgProps } from "react-native-svg";

export default function Check(props: SvgProps) {
  return (
    <Svg fill="none" height={24} stroke="#040415" width={24} {...props}>
      <G clipPath="url(#a)">
        <Path
          d="m5 12 5 5L20 7"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
        />
      </G>
      <Defs>
        <ClipPath id="a">
          <Path d="M0 0h24v24H0z" fill="#fff" />
        </ClipPath>
      </Defs>
    </Svg>
  );
}
