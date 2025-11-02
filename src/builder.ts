import fs from "fs-extra";
import path from "path";
import { pascalCase } from "change-case";
import { reactTemplate } from "./templates/ComponentTemplate.js";
import { isLocked } from "./lock.js";
import { readConfig } from "./config.js"; // ✅ اضافه شد

export async function buildAll(config: { src: string; out: string }) {
  const svgConfig = readConfig(); // ✅ خواندن .svgconfig.json
  const srcDir = path.resolve(config.src);
  const outDir = path.resolve(config.out);

  if (!fs.existsSync(srcDir)) {
    console.error("❌ Source folder not found:", srcDir);
    process.exit(1);
  }

  await fs.ensureDir(outDir);
  const files = (await fs.readdir(srcDir)).filter((f: string) => f.endsWith(".svg"));

  if (!files.length) {
    console.log("⚠️  No SVG files found in", srcDir);
    return;
  }

  for (const file of files) {
    const svgPath = path.join(srcDir, file);

    // ⚠️ بررسی فایل قفل شده
    if (isLocked(svgPath)) {
      console.log(`⚠️ Skipped locked file: ${file}`);
      continue;
    }

    const svgContent = await fs.readFile(svgPath, "utf-8");
    const componentName = pascalCase(file.replace(".svg", ""));
    const componentCode = reactTemplate({
      componentName,
      svgContent,
      defaultWidth: svgConfig.defaultWidth,
      defaultHeight: svgConfig.defaultHeight,
      defaultFill: svgConfig.defaultFill,
    });

    const outFile = path.join(outDir, `${componentName}.tsx`);
    await fs.writeFile(outFile, componentCode, "utf-8");
    console.log(`✅ Generated: ${componentName}.tsx`);
  }

  console.log("🎉 All SVGs have been converted successfully!");
}

export async function generateSVG({
  svgFile,
  outDir,
}: {
  svgFile: string;
  outDir: string;
}) {
  const svgConfig = readConfig(); // ✅ خواندن .svgconfig.json
  const filePath = path.resolve(svgFile);

  // ⚠️ بررسی فایل قفل شده
  if (isLocked(filePath)) {
    console.log(`⚠️ Skipped locked file: ${path.basename(svgFile)}`);
    return;
  }

  if (!fs.existsSync(filePath)) {
    console.error("❌ SVG file not found:", filePath);
    process.exit(1);
  }

  const svgContent = await fs.readFile(filePath, "utf-8");
  const componentName = pascalCase(path.basename(svgFile, ".svg"));
  const componentCode = reactTemplate({
    componentName,
    svgContent,
    defaultWidth: svgConfig.defaultWidth,
    defaultHeight: svgConfig.defaultHeight,
    defaultFill: svgConfig.defaultFill,
  });

  const outputFolder = path.resolve(outDir);
  await fs.ensureDir(outputFolder);

  const outFile = path.join(outputFolder, `${componentName}.tsx`);
  await fs.writeFile(outFile, componentCode, "utf-8");

  console.log(`✅ Generated: ${componentName}.tsx`);
}
