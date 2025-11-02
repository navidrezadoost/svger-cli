/**
 * Lock one or more SVG files to prevent them from being processed.
 *
 * @param {string[]} files - Paths to SVG files to lock.
 */
export declare function lockFiles(files: string[]): void;
/**
 * Unlock one or more SVG files, allowing them to be processed again.
 *
 * @param {string[]} files - Paths to SVG files to unlock.
 */
export declare function unlockFiles(files: string[]): void;
/**
 * Check if a specific SVG file is locked.
 *
 * @param {string} file - Path to the SVG file to check.
 * @returns {boolean} True if the file is locked, false otherwise.
 */
export declare function isLocked(file: string): boolean;
