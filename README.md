SVG-Tool CLI Commands Reference

Version: 1.0.0
Purpose: Convert SVGs into React components with configurable defaults, watch mode, and selective rebuilding.

1. Build Command
Command	Example
svg-tool build [options]	svg-tool build --src ./src/assets/svg --out ./src/components/icons

What It Does

Converts every .svg in the source folder into a React component.

Applies default width, height, fill, and style rules from .svgconfig.json if present.

Skips locked files.

Generates component names based on PascalCase (configurable).

2. Watch Command
Command	Example
svg-tool watch [options]	svg-tool watch --src ./src/assets/svg --out ./src/components/icons

What It Does

Continuously monitors the source folder for new, updated, or deleted SVG files.

Automatically rebuilds React components for added or modified files.

Deletes components if SVG files are removed.

Skips locked files.

Ideal for development with frequent SVG updates.

3. Generate Command
Command	Example
svg-tool generate <svgFile> [options]	svg-tool generate ./src/assets/svg/heart.svg --out ./src/components/icons

What It Does

Converts a specific SVG file into a React component.

Useful for adding a single icon to an existing collection.

Honors default configuration values.

4. Lock Command
Command	Example
svg-tool lock <svgFile> [options]	svg-tool lock ./src/assets/svg/logo.svg

What It Does

Marks one or more SVG files as locked.

Locked files are skipped during build or watch operations.

Ensures that branded or protected icons remain unchanged.

5. Unlock Command
Command	Example
svg-tool unlock <svgFile> [options]	svg-tool unlock ./src/assets/svg/logo.svg

What It Does

Removes files from the locked state.

Locked files can now be rebuilt normally.

6. Config Command
Command	Example
svg-tool config [options]	svg-tool config --init or svg-tool config --set defaultWidth=32

What It Does

Creates or modifies .svgconfig.json for default build settings.

--init — creates a new configuration file.

--set <key=value> — updates configuration properties like source, output, defaultWidth, defaultHeight, defaultFill, etc.

--show — displays current configuration.

7. Clean Command
Command	Example
svg-tool clean --out <folder>	svg-tool clean --out ./src/components/icons

What It Does

Deletes all previously generated React component files in the specified output folder.

Useful for rebuilding everything from scratch.

8. Full One-Line Command (Bash / PowerShell / Mac / Linux)
svg-tool config --init && \
svg-tool config --set source=./src/assets/svg && \
svg-tool config --set output=./src/components/icons && \
svg-tool config --set watch=true && \
svg-tool config --set defaultWidth=24 && \
svg-tool config --set defaultHeight=24 && \
svg-tool config --set defaultFill=currentColor && \
svg-tool lock ./src/assets/svg/logo.svg && \
svg-tool build --src ./src/assets/svg --out ./src/components/icons --verbose && \
svg-tool generate ./src/assets/svg/new-icon.svg --out ./src/components/icons && \
svg-tool unlock ./src/assets/svg/logo.svg && \
svg-tool watch --src ./src/assets/svg --out ./src/components/icons && \
svg-tool clean --out ./src/components/icons


What It Does

Initializes configuration, sets defaults, locks specific icons.

Builds all SVGs, generates a new one, unlocks, and starts watch mode.

Cleans output folder at the end if needed.