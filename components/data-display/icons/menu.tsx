import Svg, { ClipPath, Defs, G, Path, SvgProps } from "react-native-svg";

export default function Menu(props: SvgProps) {
  return (
    <Svg fill="none" height={24} stroke="#000" width={24} {...props}>
      <G
        clipPath="url(#a)"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
      >
        <Path d="M4 8h16M4 16h16" />
      </G>
      <Defs>
        <ClipPath id="a">
          <Path d="M0 0h24v24H0z" fill="#fff" />
        </ClipPath>
      </Defs>
    </Svg>
  );
}
