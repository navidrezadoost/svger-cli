import fs from 'fs';
import { promisify } from 'util';
/**
 * Native Node.js utilities to replace external dependencies
 */
/**
 * Convert a string to PascalCase, preserving existing capital letters.
 *
 * @param {string} str - Input string to convert.
 * @returns {string} PascalCase string.
 *
 * @example
 * toPascalCase('hello-world') => 'HelloWorld'
 * toPascalCase('hello_world') => 'HelloWorld'
 * toPascalCase('hello world') => 'HelloWorld'
 * toPascalCase('ArrowBendDownLeft') => 'ArrowBendDownLeft'
 */
export function toPascalCase(str) {
    // If the string is already in PascalCase format (no separators and starts with capital), preserve it
    if (/^[A-Z]/.test(str) && !/[-_\s]/.test(str)) {
        return str;
    }
    return str
        .replace(/[-_\s]+(.)?/g, (_, char) => (char ? char.toUpperCase() : ''))
        .replace(/^(.)/, char => char.toUpperCase());
}
/**
 * Convert a string to camelCase.
 *
 * @param {string} str - Input string to convert.
 * @returns {string} camelCase string.
 *
 * @example
 * toCamelCase('hello-world') => 'helloWorld'
 */
export function toCamelCase(str) {
    const pascal = toPascalCase(str);
    return pascal.charAt(0).toLowerCase() + pascal.slice(1);
}
/**
 * Convert a string to kebab-case.
 *
 * @param {string} str - Input string to convert.
 * @returns {string} kebab-case string.
 *
 * @example
 * toKebabCase('HelloWorld') => 'hello-world'
 * toKebabCase('hello_world') => 'hello-world'
 */
export function toKebabCase(str) {
    return str
        .replace(/([a-z])([A-Z])/g, '$1-$2')
        .replace(/[\s_]+/g, '-')
        .toLowerCase();
}
/**
 * Native file system utilities (replaces fs-extra package)
 */
export class FileSystem {
    static _readFile = promisify(fs.readFile);
    static _writeFile = promisify(fs.writeFile);
    static _readdir = promisify(fs.readdir);
    static _stat = promisify(fs.stat);
    static _mkdir = promisify(fs.mkdir);
    static _rmdir = promisify(fs.rmdir);
    static _unlink = promisify(fs.unlink);
    static async exists(path) {
        try {
            await this._stat(path);
            return true;
        }
        catch {
            return false;
        }
    }
    static async readFile(path, encoding = 'utf8') {
        return this._readFile(path, encoding);
    }
    static async writeFile(path, content, encoding = 'utf8') {
        return this._writeFile(path, content, encoding);
    }
    static async readDir(path) {
        return this._readdir(path);
    }
    static async ensureDir(dirPath) {
        try {
            await this._mkdir(dirPath, { recursive: true });
        }
        catch (error) {
            if (error.code !== 'EEXIST') {
                throw error;
            }
        }
    }
    static async removeDir(dirPath) {
        try {
            const files = await this._readdir(dirPath);
            for (const file of files) {
                const filePath = `${dirPath}/${file}`;
                const stats = await this._stat(filePath);
                if (stats.isDirectory()) {
                    await this.removeDir(filePath);
                }
                else {
                    await this._unlink(filePath);
                }
            }
            await this._rmdir(dirPath);
        }
        catch (error) {
            if (error.code !== 'ENOENT') {
                throw error;
            }
        }
    }
    static async emptyDir(dirPath) {
        if (!(await this.exists(dirPath))) {
            return;
        }
        const files = await this._readdir(dirPath);
        for (const file of files) {
            const filePath = `${dirPath}/${file}`;
            const stats = await this._stat(filePath);
            if (stats.isDirectory()) {
                await this.removeDir(filePath);
            }
            else {
                await this._unlink(filePath);
            }
        }
    }
    static async unlink(filePath) {
        return this._unlink(filePath);
    }
    static readJSONSync(path) {
        try {
            const content = fs.readFileSync(path, 'utf8');
            return JSON.parse(content);
        }
        catch {
            return {};
        }
    }
    static writeJSONSync(path, data, options) {
        const content = JSON.stringify(data, null, options?.spaces || 0);
        fs.writeFileSync(path, content, 'utf8');
    }
    static existsSync(path) {
        try {
            fs.statSync(path);
            return true;
        }
        catch {
            return false;
        }
    }
    static ensureDirSync(dirPath) {
        try {
            fs.mkdirSync(dirPath, { recursive: true });
        }
        catch (error) {
            if (error.code !== 'EEXIST') {
                throw error;
            }
        }
    }
}
/**
 * Simple CLI argument parser (replaces commander package)
 */
export class CLI {
    commands = new Map();
    programName = '';
    programDescription = '';
    programVersion = '';
    name(name) {
        this.programName = name;
        return this;
    }
    description(desc) {
        this.programDescription = desc;
        return this;
    }
    version(version) {
        this.programVersion = version;
        return this;
    }
    command(signature) {
        return new CommandBuilder(signature, this);
    }
    addCommand(signature, description, action, options) {
        const [command] = signature.split(' ');
        this.commands.set(command, {
            description,
            action: action,
            options,
        });
    }
    async parse() {
        const args = process.argv.slice(2);
        if (args.length === 0 || args[0] === '--help' || args[0] === '-h') {
            this.showHelp();
            return;
        }
        if (args[0] === '--version' || args[0] === '-v') {
            console.log(this.programVersion);
            return;
        }
        const [commandName, ...remainingArgs] = args;
        const command = this.commands.get(commandName);
        if (!command) {
            console.error(`Unknown command: ${commandName}`);
            this.showHelp();
            process.exit(1);
        }
        const { parsedArgs, options } = this.parseArgs(remainingArgs, command.options);
        try {
            await command.action(parsedArgs, options);
        }
        catch (error) {
            console.error('Command failed:', error);
            process.exit(1);
        }
    }
    parseArgs(args, commandOptions) {
        const parsedArgs = [];
        const options = {};
        let i = 0;
        while (i < args.length) {
            const arg = args[i];
            if (arg.startsWith('--')) {
                const optionName = arg.slice(2);
                const optionConfig = commandOptions.get(optionName);
                if (optionConfig) {
                    if (optionConfig.hasValue) {
                        options[optionName] = args[i + 1];
                        i += 2;
                    }
                    else {
                        options[optionName] = true;
                        i++;
                    }
                }
                else {
                    // Handle key=value format
                    if (arg.includes('=')) {
                        const [key, value] = arg.slice(2).split('=');
                        options[key] = value;
                        i++;
                    }
                    else {
                        i++;
                    }
                }
            }
            else {
                parsedArgs.push(arg);
                i++;
            }
        }
        return { parsedArgs, options };
    }
    showHelp() {
        console.log(`${this.programName} - ${this.programDescription}`);
        console.log(`Version: ${this.programVersion}\n`);
        console.log('Commands:');
        for (const [name, cmd] of this.commands) {
            console.log(`  ${name.padEnd(15)} ${cmd.description}`);
        }
        console.log('\nOptions:');
        console.log('  --help, -h      Show help');
        console.log('  --version, -v   Show version');
    }
}
class CommandBuilder {
    signature;
    desc = '';
    cli;
    options = new Map();
    constructor(signature, cli) {
        this.signature = signature;
        this.cli = cli;
    }
    description(desc) {
        this.desc = desc;
        return this;
    }
    option(flag, description) {
        const hasValue = flag.includes('<') || flag.includes('[');
        const optionName = flag.split(' ')[0].replace(/^--/, '');
        this.options.set(optionName, { description, hasValue });
        return this;
    }
    action(fn) {
        this.cli.addCommand(this.signature, this.desc, fn, this.options);
    }
}
/**
 * File watcher using native fs.watch (replaces chokidar)
 */
export class FileWatcher {
    watchers = [];
    callbacks = new Map();
    watch(path, options) {
        try {
            const watcher = fs.watch(path, {
                recursive: options?.recursive || false,
                persistent: true,
            }, (eventType, filename) => {
                if (filename) {
                    this.emit(eventType, `${path}/${filename}`);
                }
            });
            this.watchers.push(watcher);
        }
        catch (error) {
            console.error(`Failed to watch ${path}:`, error);
        }
        return this;
    }
    on(event, callback) {
        if (!this.callbacks.has(event)) {
            this.callbacks.set(event, []);
        }
        this.callbacks.get(event).push(callback);
        return this;
    }
    emit(event, ...args) {
        const callbacks = this.callbacks.get(event) || [];
        callbacks.forEach(callback => {
            try {
                callback(...args);
            }
            catch (error) {
                console.error('Watcher callback error:', error);
            }
        });
    }
    close() {
        this.watchers.forEach(watcher => watcher.close());
        this.watchers = [];
        this.callbacks.clear();
    }
}
