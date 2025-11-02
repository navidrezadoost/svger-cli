/**
 * Generates a React functional component string from an SVG file's content.
 *
 * This template replaces XML/DOCTYPE declarations, cleans up formatting,
 * and injects React props (`width`, `height`, `fill`, and any others via `...props`)
 * directly into the root `<svg>` tag.
 *
 * @param {Object} params - Template generation parameters.
 * @param {string} params.componentName - The name of the generated React component.
 * @param {string} params.svgContent - The raw SVG markup to transform into a React component.
 * @param {number} [params.defaultWidth=24] - Default width of the SVG (used if none is provided via props).
 * @param {number} [params.defaultHeight=24] - Default height of the SVG (used if none is provided via props).
 * @param {string} [params.defaultFill="currentColor"] - Default fill color of the SVG.
 *
 * @returns {string} The complete TypeScript React component code as a string.
 *
 * @example
 * const svg = '<svg viewBox="0 0 24 24"><path d="M0 0h24v24H0z"/></svg>';
 * const componentCode = reactTemplate({
 *   componentName: "MyIcon",
 *   svgContent: svg,
 *   defaultWidth: 32,
 *   defaultHeight: 32,
 * });
 *
 * // Result: a ready-to-write .tsx file containing a typed React component
 * console.log(componentCode);
 */
export function reactTemplate({ componentName, svgContent, defaultWidth = 24, defaultHeight = 24, defaultFill = "currentColor", }) {
    const cleaned = svgContent
        .replace(/<\?xml.*?\?>/g, "") // Remove XML declarations
        .replace(/<!DOCTYPE.*?>/g, "") // Remove DOCTYPE lines
        .replace(/\r?\n|\r/g, "") // Remove newlines
        .trim();
    return `import * as React from "react";

export const ${componentName}: React.FC<React.SVGProps<SVGSVGElement>> = ({
  width = ${defaultWidth},
  height = ${defaultHeight},
  fill = "${defaultFill}",
  ...props
}) => (
  ${cleaned.replace(/<svg/, `<svg width={width} height={height} fill={fill} {...props}`)}
);

export default ${componentName};
`;
}
