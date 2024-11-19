import Svg, { ClipPath, Defs, G, Path, SvgProps } from "react-native-svg";

export default function CalendarSearch(props: SvgProps) {
  return (
    <Svg fill="none" height={24} stroke="#040415" width={24} {...props}>
      <G
        clipPath="url(#a)"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
      >
        <Path d="M11.5 21H6a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v4.5M16 3v4M8 3v4M4 11h16" />
        <Path d="M15 18a3 3 0 1 0 6 0 3 3 0 0 0-6 0ZM20.2 20.2 22 22" />
      </G>
      <Defs>
        <ClipPath id="a">
          <Path d="M0 0h24v24H0z" fill="#fff" />
        </ClipPath>
      </Defs>
    </Svg>
  );
}
