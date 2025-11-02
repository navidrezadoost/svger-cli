import fs from "fs-extra";
import path from "path";

const CONFIG_FILE = ".svgconfig.json";

function getConfigPath(): string {
  return path.resolve(CONFIG_FILE);
}

export function readConfig(): Record<string, any> {
  if (!fs.existsSync(getConfigPath())) return {};
  return fs.readJSONSync(getConfigPath());
}

export function writeConfig(config: Record<string, any>) {
  fs.writeJSONSync(getConfigPath(), config, { spaces: 2 });
}

export function initConfig() {
  if (fs.existsSync(getConfigPath())) {
    console.log("⚠️  Config file already exists:", getConfigPath());
    return;
  }
  const defaultConfig = {
    source: "./src/assets/svg",
    output: "./src/components/icons",
    watch: false,
    defaultWidth: 24,
    defaultHeight: 24,
    defaultFill: "currentColor",
    exclude: [],
    styleRules: {
      fill: "inherit",
      stroke: "none",
    },
  };
  writeConfig(defaultConfig);
  console.log("✅ Config file created:", getConfigPath());
}

export function setConfig(key: string, value: any) {
  const config = readConfig();
  config[key] = value;
  writeConfig(config);
  console.log(`✅ Set config ${key}=${value}`);
}

export function showConfig() {
  const config = readConfig();
  console.log("📄 Current Config:");
  console.log(JSON.stringify(config, null, 2));
}
