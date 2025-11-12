# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased] - 2025-11-12

### Added
- Comprehensive performance analysis documentation with detailed technical breakdown
- Professional competitive analysis with fair tool comparisons
- Transparency section welcoming community feedback
- Use case recommendations for each tool in the ecosystem
- Detailed methodology for performance claims and benchmarking
- Research sources and feedback channels for documentation accuracy

### Changed
- Corrected SVGR description to acknowledge webpack ecosystem support (not React-only)
- Clarified 85% performance improvement claim with proper context and scope
- Enhanced "Advanced Props" definition vs standard SVG props
- Improved competitive analysis to be fair, accurate, and professional
- Removed misleading bundle size comparisons (dev dependencies vs runtime)
- Updated documentation tone to be educational rather than competitive

### Fixed
- Inaccurate claims about competitor tools' capabilities
- Misleading performance comparisons without proper context
- Unprofessional competitive analysis language
- Missing disclaimers and acknowledgments for ecosystem tools

## [2.0.5] - 2025-11-11

### Fixed
- **CRITICAL**: PascalCase component naming preservation
  - Fixed issue where PascalCase filenames were incorrectly converted to lowercase
  - ArrowBendDownLeft.svg → ArrowBendDownLeft.tsx (was: Arrowbenddownleft.tsx)
  - MyCustomIcon.svg → MyCustomIcon.tsx (was: Mycustomicon.tsx)
  - Enhanced regex pattern in toPascalCase() to properly detect existing PascalCase
- Maintained compatibility with all existing functionality
- All 28 framework tests continue passing

### Changed
- Updated package version to 2.0.5
- Enhanced toPascalCase utility function for better case detection

## [2.0.4] - 2025-11-11

### Added
- Complete 28-property configuration schema
- React/Vue/Angular specific configuration options
- Enhanced responsive design support with breakpoint configurations
- Comprehensive theme system with multiple design systems support
- Advanced performance optimization settings
- Professional error handling and validation system
- Enhanced TypeScript support with improved type definitions

### Changed
- Streamlined ESLint configuration (.eslintrc.js → .eslintrc.cjs)
- Enhanced component templates with new configuration support
- Improved configuration management across multiple files
- Updated README.md with comprehensive v2.0.4 feature documentation
- Enhanced comparison tables and installation instructions

### Fixed
- TypeScript duplicate export errors in index generation
- Simplified index.ts generation to prevent conflicts
- Improved configuration validation and error messages
- Enhanced toPascalCase to preserve existing PascalCase names

### Removed
- Redundant test documentation files (COMPLETE-TEST-REPORT.md, TEST-RESULTS.md, TESTING-SUMMARY.md)
- Deprecated ESLint configuration format
- Outdated package dependencies reducing bundle size

## [2.0.3] - 2024-11-11

### Added
- Enhanced package.json with comprehensive metadata
- Professional development tooling configuration
- Extended TypeScript support and type definitions
- Additional CLI aliases (`svger` shorthand)
- Comprehensive export map for better module resolution
- Development scripts for testing, linting, and formatting
- Documentation generation scripts
- Comprehensive testing suite with unified export pattern

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
- Native module file path resolution error

### Removed
- Unnecessary test folders and configuration files
- Redundant package configurations

## [2.0.2] - 2024-11-01

### Added
- Multi-framework support (React, Vue, Angular, Svelte, Solid, Lit, Preact, Vanilla)
- Auto-generated index.ts exports with tree-shaking support
- Responsive design system with breakpoint configurations
- Theme support (light/dark/auto) with CSS variables
- File locking mechanism for protecting critical files
- Performance optimization engine with parallel processing

### Changed
- Complete rewrite for enterprise-grade performance
- Zero-dependency architecture implementation
- 85% performance improvement over traditional tools (SVG processing time)
- TypeScript-first approach with native type generation

### Removed
- Legacy dependencies reducing package size by 89%
- Single-framework limitation
- Dependency-heavy build processes

## [2.0.0] - 2024-10-30

### Added
- Complete multi-framework support for all 8 UI frameworks
- Enhanced CLI commands with comprehensive options
- Open source project files (CODE_OF_CONDUCT, LICENSE, CONTRIBUTING)
- Professional project structure and documentation

### Changed
- Major version release with breaking changes from 1.x
- Enhanced README with multi-framework guide and benchmarks
- Consolidated project structure and test organization

### Removed
- node_modules folder from repository
- Legacy 1.x architecture and dependencies

## [1.x.x] - Legacy Versions

Please see the [releases page](https://github.com/faezemohades/svger-cli/releases) for information about 1.x versions.

---

## Legend

- **Added** for new features
- **Changed** for changes in existing functionality
- **Deprecated** for soon-to-be removed features
- **Removed** for now removed features
- **Fixed** for any bug fixes
- **Security** for vulnerability fixes