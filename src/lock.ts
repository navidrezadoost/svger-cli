import fs from "fs-extra";
import path from "path";

const LOCK_FILE = ".svg-lock";

function getLockFilePath(): string {
  return path.resolve(LOCK_FILE);
}

function readLockFile(): string[] {
  if (!fs.existsSync(getLockFilePath())) return [];
  try {
    const data = fs.readFileSync(getLockFilePath(), "utf-8");
    return JSON.parse(data);
  } catch (e) {
    return [];
  }
}

function writeLockFile(files: string[]) {
  fs.writeFileSync(getLockFilePath(), JSON.stringify(files, null, 2), "utf-8");
}

export function lockFiles(files: string[]) {
  const fileNames = files.map(f => path.basename(f));
  const current = readLockFile();
  const newFiles = Array.from(new Set([...current, ...fileNames]));
  writeLockFile(newFiles);
  console.log(`🔒 Locked files: ${newFiles.join(", ")}`);
}

export function unlockFiles(files: string[]) {
  const fileNames = files.map(f => path.basename(f));
  const current = readLockFile();
  const remaining = current.filter(f => !fileNames.includes(f));
  writeLockFile(remaining);
  console.log(`🔓 Unlocked files: ${fileNames.join(", ")}`);
}

export function isLocked(file: string): boolean {
  const current = readLockFile();
  return current.includes(path.basename(file));
}
