#!/usr/bin/env node
import { Command } from "commander";
import { buildAll, generateSVG } from "./builder.js";
import { lockFiles, unlockFiles } from "./lock.js";
import { initConfig, setConfig, showConfig } from "./config.js";
import { watchSVGs } from "./watch.js";
import { clean } from "./clean.js";
const program = new Command();
program
    .name("svger")
    .description("Custom SVG to React component converter")
    .version("1.0.0");
// -------- Build Command --------
program
    .command("build <src> <out>")
    .description("Build all SVGs from source to output")
    .action(async (src, out) => {
    console.log("🛠️  Building SVGs...");
    console.log("Source:", src);
    console.log("Output:", out);
    await buildAll({ src, out });
});
// -------- Watch Command --------
program
    .command("watch <src> <out>")
    .description("Watch source folder and rebuild SVGs automatically")
    .action((src, out) => {
    console.log("🚀 Starting watch mode...");
    watchSVGs({ src, out });
});
// -------- Generate Single SVG --------
program
    .command("generate <svgFile> <out>")
    .description("Convert a single SVG file into a React component")
    .action(async (svgFile, out) => {
    await generateSVG({ svgFile, outDir: out });
});
// -------- Lock / Unlock --------
program
    .command("lock <files...>")
    .description("Lock one or more SVG files")
    .action((files) => lockFiles(files));
program
    .command("unlock <files...>")
    .description("Unlock one or more SVG files")
    .action((files) => unlockFiles(files));
// -------- Config --------
program
    .command("config")
    .description("Manage svger configuration")
    .option("--init", "Create default .svgconfig.json")
    .option("--set <keyValue>", "Set config key=value")
    .option("--show", "Show current config")
    .action((opts) => {
    if (opts.init)
        return initConfig();
    if (opts.set) {
        const [key, value] = opts.set.split("=");
        if (!key || value === undefined) {
            console.error("❌ Invalid format. Use key=value");
            process.exit(1);
        }
        const parsedValue = !isNaN(Number(value)) ? Number(value) : value;
        return setConfig(key, parsedValue);
    }
    if (opts.show)
        return showConfig();
    console.log("❌ No option provided. Use --init, --set, or --show");
});
// -------- Clean Command --------
program
    .command("clean <out>")
    .description("Remove all generated SVG React components from output folder")
    .action(async (out) => {
    await clean(out);
});
program.parse();
