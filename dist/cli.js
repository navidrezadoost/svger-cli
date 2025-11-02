#!/usr/bin/env node
import { Command } from "commander";
import { buildAll } from "./builder.js";
import { generateSVG } from "./builder.js";
import { lockFiles, unlockFiles } from "./lock.js";
import { initConfig, setConfig, showConfig } from "./config.js";
import { watchSVGs } from "./watch.js";
import { clean } from "./clean.js";
const program = new Command();
program
    .name("svger")
    .description("Custom SVG to React component converter")
    .version("1.0.0");
program
    .command("build")
    .option("--src <path>", "Source SVG folder", "./my-svgs")
    .option("--out <path>", "Output folder for React components", "./my-icons")
    .action(async (opts) => {
    console.log("🛠️  Building SVGs...");
    console.log("Source:", opts.src);
    console.log("Output:", opts.out);
    await buildAll({ src: opts.src, out: opts.out });
});
program
    .command("watch")
    .option("--src <src>", "source folder")
    .option("--out <out>", "output folder")
    .action((options) => {
    watchSVGs({ src: options.src, out: options.out });
});
program
    .command("generate <svgFile>")
    .description("Convert a single SVG file into a React component")
    .option("--out <path>", "Output folder", "./my-icons")
    .action(async (svgFile, opts) => {
    await generateSVG({ svgFile, outDir: opts.out });
});
program
    .command("lock <files...>")
    .description("Lock one or more SVG files")
    .action((files) => {
    lockFiles(files);
});
program
    .command("unlock <files...>")
    .description("Unlock one or more SVG files")
    .action((files) => {
    unlockFiles(files);
});
program
    .command("config")
    .description("Manage svger configuration")
    .option("--init", "Create a new .svgconfig.json with default settings")
    .option("--set <keyValue>", "Set a config key=value")
    .option("--show", "Show current configuration")
    .action((opts) => {
    if (opts.init) {
        initConfig();
        return;
    }
    if (opts.set) {
        const [key, value] = opts.set.split("=");
        if (!key || value === undefined) {
            console.error("❌ Invalid format. Use key=value");
            process.exit(1);
        }
        const parsedValue = !isNaN(Number(value)) ? Number(value) : value;
        setConfig(key, parsedValue);
        return;
    }
    if (opts.show) {
        showConfig();
        return;
    }
    console.log("❌ No option provided. Use --init, --set, or --show");
});
program
    .command("clean")
    .description("Remove all generated SVG React components from the output folder")
    .requiredOption("--out <dir>", "Output directory to clean")
    .action(async (options) => {
    await clean(options.out);
});
program.parse();
