export function reactTemplate({ componentName, svgContent, defaultWidth = 24, defaultHeight = 24, defaultFill = "currentColor", }) {
    const cleaned = svgContent
        .replace(/<\?xml.*?\?>/g, "")
        .replace(/<!DOCTYPE.*?>/g, "")
        .replace(/\r?\n|\r/g, "")
        .replace(/\s{2,}/g, " ")
        .replace(/style="[^"]*"/g, "")
        .replace(/\s+xmlns(:xlink)?="[^"]*"/g, "")
        .trim()
        .replace(/^.*?<svg[^>]*>(.*?)<\/svg>.*$/i, "$1");
    return `import type { SVGProps } from "react";
const Svg${componentName} = (props: SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 ${defaultWidth} ${defaultHeight}"
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    width={props.width || ${defaultWidth}}
    height={props.height || ${defaultHeight}}
    fill={props.fill || "${defaultFill}"}
    stroke={props.stroke || "none"}
    className={props.className}
    {...props}
  >
    ${cleaned}
  </svg>
);
export default Svg${componentName};
`;
}
