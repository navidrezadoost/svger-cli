/**
 * Cleans the specified output directory by removing all files and folders inside it.
 * Typically used to clear previously generated SVG React components before a new build.
 *
 * @param {string} outDir - Path to the output directory to be cleaned.
 * @returns {Promise<void>} Resolves when the directory has been emptied.
 */
export declare function clean(outDir: string): Promise<void>;
