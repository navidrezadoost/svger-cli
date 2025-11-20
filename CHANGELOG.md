# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/), and this project
adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [2.0.6] - 2025-11-20

### Added

- **🎉 React Native Support**: Full support for React Native with `react-native-svg`
  - Automatic conversion of SVG elements to React Native SVG components
  - Support for Path, Circle, Rect, Line, Polygon, Polyline, Ellipse, G, Defs, ClipPath, and
    gradient components
  - Proper prop conversion (strokeWidth, strokeLinecap, fillRule, etc.)
  - TypeScript interfaces with SvgProps
  - Size and color prop support
  - ForwardRef implementation for React Native components
- Enhanced test suite with React Native validation
- Comprehensive React Native documentation

### Changed

- Updated framework count from 8 to 9 supported frameworks
- Enhanced framework template engine to handle React Native SVG transformations
- Improved package description to include React Native
- Updated all documentation to reflect React Native support

### Fixed

- Framework type definitions to include 'react-native'
- File extension handling for React Native (.tsx)
- Test validation for react-native-svg imports

## [2.0.5] - 2025-11-11

### Fixed

- **🔧 CRITICAL FIX: PascalCase Component Naming**: Fixed issue where files like
  "ArrowBendDownLeft.svg" were incorrectly converted to "Arrowbenddownleft.tsx" instead of
  preserving the correct "ArrowBendDownLeft.tsx" format
- Enhanced regex pattern in toPascalCase() to properly detect existing PascalCase names
- All existing PascalCase filenames now preserved correctly during component generation

### Changed

- Updated README.md to v2.0.5 with critical fix details
- Updated all installation commands to new version

## [2.0.4] - 2025-11-11

### Added

- Complete 28-property configuration schema with React/Vue/Angular specific options
- Enhanced responsive design support with breakpoint configurations
- Comprehensive theme system with multiple design systems
- Advanced performance optimization settings
- Professional error handling and validation system

### Fixed

- TypeScript duplicate export errors in index generation
- Enhanced toPascalCase to preserve existing PascalCase names
- Simplified index.ts generation to prevent conflicts
- Improved configuration validation and error messages

### Documentation

- Updated README.md with comprehensive v2.0.4 feature documentation
- Added complete configuration schema documentation
- Enhanced comparison tables and installation instructions
- Included recent fixes section with technical details

## [2.0.3] - 2024-11-11

### Added

- Enhanced package.json with comprehensive metadata
- Professional development tooling configuration
- Extended TypeScript support and type definitions
- Additional CLI aliases (`svger` shorthand)
- Comprehensive export map for better module resolution
- Development scripts for testing, linting, and formatting
- Documentation generation scripts

### Changed

- Improved package description with full feature list
- Enhanced keywords for better discoverability
- Updated contributor information with roles
- Expanded file inclusion patterns
- More comprehensive engine requirements

### Fixed

- Package metadata completeness
- Export definitions for better tree-shaking
- Module resolution issues

## [2.0.2] - 2024-11-01

### Added

- Multi-framework support (React, Vue, Angular, Svelte, Solid, Lit, Preact, Vanilla)
- Auto-generated index.ts exports
- Responsive design system
- Theme support (light/dark/auto)
- File locking mechanism
- Performance optimization engine

### Changed

- Complete rewrite for enterprise-grade performance
- Zero-dependency architecture
- 85% performance improvement over SVGR
- TypeScript-first approach

### Removed

- Legacy dependencies
- Single-framework limitation

## [1.x.x] - Legacy Versions

Please see the [releases page](https://github.com/faezemohades/svger-cli/releases) for information
about 1.x versions.

---

## Legend

- **Added** for new features
- **Changed** for changes in existing functionality
- **Deprecated** for soon-to-be removed features
- **Removed** for now removed features
- **Fixed** for any bug fixes
- **Security** for vulnerability fixes
