import fs from "fs-extra";
import path from "path";
import chokidar from "chokidar";
import { generateSVG } from "./builder.js";
import { isLocked } from "./lock.js";
import { readConfig } from "./config.js";
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
        ignored: /(^|[\/\\])\../, // فقط فایل‌های مخفی نادیده گرفته شوند
    });
    watcher
        .on("add", async (filePath) => {
        if (path.extname(filePath) !== ".svg")
            return;
        console.log("Detected new file:", filePath);
        if (isLocked(filePath)) {
            console.log(`⚠️ Skipped locked file: ${path.basename(filePath)}`);
            return;
        }
        console.log(`➕ New SVG detected: ${path.basename(filePath)}`);
        await generateSVG({ svgFile: filePath, outDir });
    })
        .on("change", async (filePath) => {
        if (path.extname(filePath) !== ".svg")
            return;
        console.log("Detected change in file:", filePath);
        if (isLocked(filePath)) {
            console.log(`⚠️ Skipped locked file: ${path.basename(filePath)}`);
            return;
        }
        console.log(`✏️ SVG updated: ${path.basename(filePath)}`);
        await generateSVG({ svgFile: filePath, outDir });
    })
        .on("unlink", async (filePath) => {
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
