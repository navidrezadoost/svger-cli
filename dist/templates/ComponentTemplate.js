export function reactTemplate({ componentName, svgContent, defaultWidth = 24, defaultHeight = 24, defaultFill = "currentColor", }) {
    const cleaned = svgContent
        .replace(/<\?xml.*?\?>/g, "")
        .replace(/<!DOCTYPE.*?>/g, "")
        .replace(/\r?\n|\r/g, "")
        .trim();
    return `import * as React from "react";

export const ${componentName}: React.FC<React.SVGProps<SVGSVGElement>> = ({
  width = ${defaultWidth},
  height = ${defaultHeight},
  fill = "${defaultFill}",
  ...props
}) => (
  ${cleaned
        .replace(/<svg/, `<svg width={width} height={height} fill={fill} {...props}`)}
);

export default ${componentName};
`;
}
