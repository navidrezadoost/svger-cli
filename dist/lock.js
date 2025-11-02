import fs from "fs-extra";
import path from "path";
const LOCK_FILE = ".svg-lock";
function getLockFilePath() {
    return path.resolve(LOCK_FILE);
}
function readLockFile() {
    if (!fs.existsSync(getLockFilePath()))
        return [];
    const data = fs.readFileSync(getLockFilePath(), "utf-8");
    return JSON.parse(data);
}
function writeLockFile(files) {
    fs.writeFileSync(getLockFilePath(), JSON.stringify(files, null, 2), "utf-8");
}
export function lockFiles(files) {
    const absFiles = files.map(f => path.resolve(f)); // ⚡ مسیر کامل
    const current = readLockFile();
    const newFiles = Array.from(new Set([...current, ...absFiles]));
    writeLockFile(newFiles);
    console.log(`🔒 Locked files: ${newFiles.join(", ")}`);
}
export function unlockFiles(files) {
    const absFiles = files.map(f => path.resolve(f)); // ⚡ مسیر کامل
    const current = readLockFile();
    const remaining = current.filter(f => !absFiles.includes(f));
    writeLockFile(remaining);
    console.log(`🔓 Unlocked files: ${files.join(", ")}`);
}
export function isLocked(file) {
    const current = readLockFile();
    return current.includes(path.resolve(file)); // ⚡ مسیر کامل
}
