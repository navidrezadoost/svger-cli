#!/usr/bin/env node
import { Command } from "commander";
import { buildAll, generateSVG } from "./builder.js";
import { lockFiles, unlockFiles } from "./lock.js";
import { initConfig, setConfig, showConfig } from "./config.js";
import { watchSVGs } from "./watch.js";
import { clean } from "./clean.js";

const program = new Command();

/**
 * svger-cli CLI
 * Custom SVG to React component converter.
 */
program
  .name("svger-cli")
  .description("Custom SVG to React component converter")
  .version("1.0.0");

// -------- Build Command --------
/**
 * Build all SVGs from a source folder to an output folder.
 *
 * @param {string} src - Source folder containing SVG files.
 * @param {string} out - Output folder for generated React components.
 */
program
  .command("build <src> <out>")
  .description("Build all SVGs from source to output")
  .action(async (src: string, out: string) => {
    console.log("🛠️  Building SVGs...");
    console.log("Source:", src);
    console.log("Output:", out);
    await buildAll({ src, out });
  });

// -------- Watch Command --------
/**
 * Watch a source folder and rebuild SVGs automatically on changes.
 *
 * @param {string} src - Source folder to watch.
 * @param {string} out - Output folder for generated components.
 */
program
  .command("watch <src> <out>")
  .description("Watch source folder and rebuild SVGs automatically")
  .action((src: string, out: string) => {
    console.log("🚀 Starting watch mode...");
    watchSVGs({ src, out });
  });

// -------- Generate Single SVG --------
/**
 * Generate a React component from a single SVG file.
 *
 * @param {string} svgFile - Path to the SVG file.
 * @param {string} out - Output folder for the generated component.
 */
program
  .command("generate <svgFile> <out>")
  .description("Convert a single SVG file into a React component")
  .action(async (svgFile: string, out: string) => {
    await generateSVG({ svgFile, outDir: out });
  });

// -------- Lock / Unlock --------
/**
 * Lock one or more SVG files to prevent accidental overwrites.
 *
 * @param {string[]} files - Paths to SVG files to lock.
 */
program
  .command("lock <files...>")
  .description("Lock one or more SVG files")
  .action((files: string[]) => lockFiles(files));

/**
 * Unlock one or more SVG files to allow modifications.
 *
 * @param {string[]} files - Paths to SVG files to unlock.
 */
program
  .command("unlock <files...>")
  .description("Unlock one or more SVG files")
  .action((files: string[]) => unlockFiles(files));

// -------- Config --------
/**
 * Manage svger-cli configuration.
 *
 * Options:
 * --init: Create default .svgconfig.json
 * --set key=value: Set a configuration value
 * --show: Show current configuration
 *
 * @param {Object} opts - CLI options
 */
program
  .command("config")
  .description("Manage svger-cli configuration")
  .option("--init", "Create default .svgconfig.json")
  .option("--set <keyValue>", "Set config key=value")
  .option("--show", "Show current config")
  .action((opts) => {
    if (opts.init) return initConfig();
    if (opts.set) {
      const [key, value] = opts.set.split("=");
      if (!key || value === undefined) {
        console.error("❌ Invalid format. Use key=value");
        process.exit(1);
      }
      const parsedValue = !isNaN(Number(value)) ? Number(value) : value;
      return setConfig(key, parsedValue);
    }
    if (opts.show) return showConfig();
    console.log("❌ No option provided. Use --init, --set, or --show");
  });

// -------- Clean Command --------
/**
 * Remove all generated SVG React components from an output folder.
 *
 * @param {string} out - Output folder to clean.
 */
program
  .command("clean <out>")
  .description("Remove all generated SVG React components from output folder")
  .action(async (out: string) => {
    await clean(out);
  });

program.parse();
