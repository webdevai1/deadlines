import { ReactNode } from "react";
import { useTheme, View } from "tamagui";
import { StyleSheet } from "react-native";
import { Circle, G, Svg } from "react-native-svg";
import Animated, {
  Easing,
  ReduceMotion,
  useAnimatedProps,
  withTiming,
} from "react-native-reanimated";

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

type DonutChartProps = {
  children?: ReactNode;
  circleStrokeWidth?: number;
  circleVisible?: boolean;
  completePercentage: number;
  radius: number;
  strokeWidth: number;
};

export default function DonutChart({
  children,
  circleStrokeWidth = 5,
  circleVisible = true,
  completePercentage,
  radius,
  strokeWidth,
}: DonutChartProps) {
  const { bg, primary, primaryLight } = useTheme();

  const halfCircle = radius + strokeWidth;
  const circleCircumference = radius * 2 * Math.PI;
  const timingConfig = {
    duration: 1000,
    easing: Easing.inOut(Easing.quad),
    reduceMotion: ReduceMotion.System,
  };

  const strokeDashoffset = useAnimatedProps(() => {
    const angle = ((360 * completePercentage) / 100) * (Math.PI / 180);
    return {
      strokeDashoffset: withTiming(
        circleCircumference - angle * radius,
        timingConfig,
      ),
    };
  });

  const cirqlePosition = useAnimatedProps(() => {
    const angle = ((360 * completePercentage) / 100) * (Math.PI / 180);
    return {
      cx: withTiming(halfCircle + radius * Math.cos(angle), timingConfig),
      cy: withTiming(halfCircle + radius * Math.sin(angle), timingConfig),
    };
  });
  return (
    <View>
      <View ai={"center"} jc={"center"} style={[StyleSheet.absoluteFillObject]}>
        {children}
      </View>
      <Svg
        height={radius * 2}
        viewBox={`0 0 ${halfCircle * 2} ${halfCircle * 2}`}
        width={radius * 2}
      >
        <G origin={halfCircle} rotation={-90}>
          <Circle
            cx="50%"
            cy="50%"
            fill="transparent"
            r={radius}
            stroke={primaryLight.val}
            strokeWidth={strokeWidth}
          />
          <AnimatedCircle
            animatedProps={strokeDashoffset}
            cx="50%"
            cy="50%"
            fill="transparent"
            r={radius}
            stroke={primary.val}
            strokeDasharray={circleCircumference}
            strokeLinecap="round"
            strokeWidth={strokeWidth}
          />

          {circleVisible && (
            <AnimatedCircle
              animatedProps={cirqlePosition}
              fill={bg.val}
              r={strokeWidth / 2.5}
              stroke={primary.val}
              strokeWidth={circleStrokeWidth}
            />
          )}
        </G>
      </Svg>
    </View>
  );
}
