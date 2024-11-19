import Svg, { ClipPath, Defs, G, Path, SvgProps } from "react-native-svg";

export default function X(props: SvgProps) {
  return (
    <Svg fill="none" height={24} stroke="#000" width={24} {...props}>
      <G
        clipPath="url(#a)"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
      >
        <Path d="M18 6 6 18M6 6l12 12" />
      </G>
      <Defs>
        <ClipPath id="a">
          <Path d="M0 0h24v24H0z" fill="#fff" />
        </ClipPath>
      </Defs>
    </Svg>
  );
}
