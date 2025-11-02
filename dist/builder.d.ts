/**
 * Converts all SVG files from a source directory into React components and writes them to an output directory.
 *
 * @param {Object} config - Configuration object.
 * @param {string} config.src - Path to the source folder containing SVG files.
 * @param {string} config.out - Path to the output folder where React components will be generated.
 * @returns {Promise<void>} Resolves when all SVGs have been processed.
 */
export declare function buildAll(config: {
    src: string;
    out: string;
}): Promise<void>;
/**
 * Generates a single React component from an SVG file.
 *
 * @param {Object} params - Parameters object.
 * @param {string} params.svgFile - Path to the SVG file to be converted.
 * @param {string} params.outDir - Path to the output folder for the generated component.
 * @returns {Promise<void>} Resolves when the SVG has been converted.
 */
export declare function generateSVG({ svgFile, outDir, }: {
    svgFile: string;
    outDir: string;
}): Promise<void>;
