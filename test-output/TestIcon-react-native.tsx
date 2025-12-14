import React from "react";
import Svg, {
  Path,
  Circle,
  Rect,
  Line,
  Polygon,
  Polyline,
  Ellipse,
  G,
  Defs,
  ClipPath,
  LinearGradient,
  RadialGradient,
  Stop,
} from "react-native-svg";
import type { SvgProps } from "react-native-svg";

export interface TestIconProps extends SvgProps {
  size?: number | string;
  color?: string;
}

const TestIcon = React.forwardRef<Svg, TestIconProps>(
  ({ size, color, ...props }, ref) => {
    const dimensions = size ? { width: size, height: size } : {
      width: props.width || 24,
      height: props.height || 24
    };

    return (
      <Svg
        ref={ref}
        viewBox="0 0 24 24"
        width={dimensions.width}
        height={dimensions.height}
        fill={color || props.fill || "currentColor"}
        {...props}
      >
        <Path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
      </Svg>
    );
  }
);

TestIcon.displayName = "TestIcon";

export default TestIcon;
