svger CLI Commands Reference

Version: 1.0.0
Purpose: Convert SVGs into React components with configurable defaults, watch mode, and selective rebuilding.

1. Build Command
Command	Example
svger build [options]	svger build --src ./src/assets/svg --out ./src/components/icons

What It Does

Converts every .svg in the source folder into a React component.

Applies default width, height, fill, and style rules from .svgconfig.json if present.

Skips locked files.

Generates component names based on PascalCase (configurable).

2. Watch Command
Command	Example
svger watch [options]	svger watch --src ./src/assets/svg --out ./src/components/icons

What It Does

Continuously monitors the source folder for new, updated, or deleted SVG files.

Automatically rebuilds React components for added or modified files.

Deletes components if SVG files are removed.

Skips locked files.

Ideal for development with frequent SVG updates.

3. Generate Command
Command	Example
svger generate <svgFile> [options]	svger generate ./src/assets/svg/heart.svg --out ./src/components/icons

What It Does

Converts a specific SVG file into a React component.

Useful for adding a single icon to an existing collection.

Honors default configuration values.

4. Lock Command
Command	Example
svger lock <svgFile> [options]	svger lock ./src/assets/svg/logo.svg

What It Does

Marks one or more SVG files as locked.

Locked files are skipped during build or watch operations.

Ensures that branded or protected icons remain unchanged.

5. Unlock Command
Command	Example
svger unlock <svgFile> [options]	svger unlock ./src/assets/svg/logo.svg

What It Does

Removes files from the locked state.

Locked files can now be rebuilt normally.

6. Config Command
Command	Example
svger config [options]	svger config --init or svger config --set defaultWidth=32

What It Does

Creates or modifies .svgconfig.json for default build settings.

--init — creates a new configuration file.

--set <key=value> — updates configuration properties like source, output, defaultWidth, defaultHeight, defaultFill, etc.

--show — displays current configuration.

7. Clean Command
Command	Example
svger clean --out <folder>	svger clean --out ./src/components/icons

What It Does

Deletes all previously generated React component files in the specified output folder.

Useful for rebuilding everything from scratch.

8. Full One-Line Command (Bash / PowerShell / Mac / Linux)
svger config --init && \
svger config --set source=./src/assets/svg && \
svger config --set output=./src/components/icons && \
svger config --set defaultWidth=24 && \
svger config --set defaultHeight=24 && \
svger config --set defaultFill=currentColor && \
svger lock ./src/assets/svg/logo.svg && \
svger build ./src/assets/svg ./src/components/icons && \
svger generate ./src/assets/svg/new-icon.svg ./src/components/icons && \
svger unlock ./src/assets/svg/logo.svg && \
svger watch ./src/assets/svg ./src/components/icons && \
svger clean ./src/components/icons


What It Does

Initializes configuration, sets defaults, locks specific icons.

Builds all SVGs, generates a new one, unlocks, and starts watch mode.

Cleans output folder at the end if needed.



Acknowledgements

This project was implemented by Faeze Mohadespor, following the ADR authored by Navid Rezadoost and based on the TDR prepared by Ehsan Jafari. Their guidance and documentation on SVG integration methods in React were instrumental in shaping the design and functionality of the svger CLI.