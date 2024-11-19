import Svg, { ClipPath, Defs, G, Path, SvgProps } from "react-native-svg";

export default function ArrowBack(props: SvgProps) {
  return (
    <Svg fill="none" height={24} stroke="#040415" width={24} {...props}>
      <G clipPath="url(#a)">
        <Path
          d="m9 11-4 4m0 0 4 4m-4-4h11a4 4 0 1 0 0-8h-1"
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
