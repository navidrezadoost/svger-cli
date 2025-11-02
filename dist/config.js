import fs from "fs-extra";
import path from "path";
const CONFIG_FILE = ".svgconfig.json";
function getConfigPath() {
    return path.resolve(CONFIG_FILE);
}
// خواندن کانفیگ
export function readConfig() {
    if (!fs.existsSync(getConfigPath()))
        return {};
    return fs.readJSONSync(getConfigPath());
}
// ذخیره کانفیگ
export function writeConfig(config) {
    fs.writeJSONSync(getConfigPath(), config, { spaces: 2 });
}
// ایجاد کانفیگ اولیه
export function initConfig() {
    if (fs.existsSync(getConfigPath())) {
        console.log("⚠️  Config file already exists:", getConfigPath());
        return;
    }
    const defaultConfig = {
        source: "./my-svgs",
        output: "./my-icons",
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
// تغییر یک کلید
export function setConfig(key, value) {
    const config = readConfig();
    config[key] = value;
    writeConfig(config);
    console.log(`✅ Set config ${key}=${value}`);
}
// نمایش کانفیگ
export function showConfig() {
    const config = readConfig();
    console.log("📄 Current Config:");
    console.log(JSON.stringify(config, null, 2));
}
