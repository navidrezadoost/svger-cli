import fs from "fs-extra";
import path from "path";
export async function clean(outDir) {
    const targetDir = path.resolve(outDir);
    if (!fs.existsSync(targetDir)) {
        console.log(`⚠️ Directory not found: ${targetDir}`);
        return;
    }
    await fs.emptyDir(targetDir);
    console.log(`🧹 Cleaned all generated SVG components in: ${targetDir}`);
}
