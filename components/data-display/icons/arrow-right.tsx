import Svg, { ClipPath, Defs, G, Path, SvgProps } from "react-native-svg";

export default function ArrowRight(props: SvgProps) {
  return (
    <Svg fill="none" height={24} stroke="#000" width={24} {...props}>
      <G
        clipPath="url(#a)"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
      >
        <Path d="M5 12h14M13 18l6-6M13 6l6 6" />
      </G>
      <Defs>
        <ClipPath id="a">
          <Path d="M0 0h24v24H0z" fill="#fff" />
        </ClipPath>
      </Defs>
    </Svg>
  );
}
