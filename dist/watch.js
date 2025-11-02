import fs from "fs-extra";
import path from "path";
import chokidar from "chokidar";
import { generateSVG } from "./builder.js";
import { isLocked } from "./lock.js";
import { readConfig } from "./config.js";
/**
 * Watches a source folder for changes to SVG files and automatically
 * rebuilds React components when SVGs are added, modified, or deleted.
 *
 * @param {Object} config - Watch configuration object.
 * @param {string} config.src - Source folder containing SVG files to watch.
 * @param {string} config.out - Output folder where React components are generated.
 * @returns {import("chokidar").FSWatcher} A chokidar file watcher instance.
 *
 * @example
 * watchSVGs({ src: "./src/assets/svg", out: "./src/components/icons" });
 *
 * // Watches the SVG folder and:
 * // - Generates new components when files are added.
 * // - Updates components when files change.
 * // - Removes components when SVGs are deleted.
 */
export function watchSVGs(config) {
    const srcDir = path.resolve(config.src);
    const outDir = path.resolve(config.out);
    const svgConfig = readConfig();
    if (!fs.existsSync(srcDir)) {
        console.error("❌ Source folder not found:", srcDir);
        process.exit(1);
    }
    console.log(`👀 Watching for SVG changes in: ${srcDir}`);
    console.log("🚀 Watch mode active — waiting for file changes...");
    const watcher = chokidar.watch(srcDir, {
        persistent: true,
        ignoreInitial: false,
        depth: 0,
        awaitWriteFinish: { stabilityThreshold: 500, pollInterval: 100 },
        ignored: /(^|[\/\\])\../, // Ignore hidden files
    });
    // ---- Handle new SVG files ----
    watcher.on("add", async (filePath) => {
        if (path.extname(filePath) !== ".svg")
            return;
        console.log("Detected new file:", filePath);
        if (isLocked(filePath)) {
            console.log(`⚠️ Skipped locked file: ${path.basename(filePath)}`);
            return;
        }
        console.log(`➕ New SVG detected: ${path.basename(filePath)}`);
        await generateSVG({ svgFile: filePath, outDir });
    });
    // ---- Handle modified SVG files ----
    watcher.on("change", async (filePath) => {
        if (path.extname(filePath) !== ".svg")
            return;
        console.log("Detected change in file:", filePath);
        if (isLocked(filePath)) {
            console.log(`⚠️ Skipped locked file: ${path.basename(filePath)}`);
            return;
        }
        console.log(`✏️ SVG updated: ${path.basename(filePath)}`);
        await generateSVG({ svgFile: filePath, outDir });
    });
    // ---- Handle deleted SVG files ----
    watcher.on("unlink", async (filePath) => {
        if (path.extname(filePath) !== ".svg")
            return;
        const componentName = path.basename(filePath, ".svg");
        const outFile = path.join(outDir, `${componentName}.tsx`);
        if (fs.existsSync(outFile)) {
            await fs.remove(outFile);
            console.log(`🗑️ Removed component: ${componentName}.tsx`);
        }
    });
    return watcher;
}
