# Contributing to svger-cli

Thank you for your interest in contributing to svger-cli! We welcome contributions from the community to help improve and grow this zero-dependency enterprise SVG processing framework. This document outlines the guidelines and processes for contributing.

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [How to Contribute](#how-to-contribute)
- [Development Setup](#development-setup)
- [Reporting Issues](#reporting-issues)
- [Submitting Pull Requests](#submitting-pull-requests)
- [Code Style and Standards](#code-style-and-standards)
- [Testing](#testing)
- [Commit Guidelines](#commit-guidelines)
- [License](#license)

## Code of Conduct

This project adheres to a [Code of Conduct](CODE_OF_CONDUCT.md). By participating, you are expected to uphold this code. Please report unacceptable behavior to the maintainers.

## How to Contribute

There are many ways to contribute to svger-cli:

- **Report bugs** and request features via GitHub Issues
- **Improve documentation** by fixing typos or adding examples
- **Write code** by submitting pull requests
- **Review pull requests** from other contributors
- **Help others** in discussions and issue threads
- **Add framework support** for new UI libraries
- **Optimize performance** and reduce bundle size

## Development Setup

1. **Fork and Clone**: Fork the repository on GitHub and clone your fork locally.

   ```bash
   git clone https://github.com/your-username/svger-cli.git
   cd svger-cli
   ```

2. **Install Dev Dependencies**: Install TypeScript and development tools.

   ```bash
   npm install
   ```

3. **Build the Project**: Compile TypeScript to JavaScript.

   ```bash
   npm run build
   ```

4. **Test the CLI**: Run the built CLI to ensure it works.

   ```bash
   node dist/cli.js --help
   ```

## Reporting Issues

When reporting issues, please include:

- A clear and descriptive title
- Steps to reproduce the issue
- Expected behavior
- Actual behavior
- Environment details (OS, Node.js version, etc.)
- Any relevant SVG files or error messages
- Framework you're targeting (React, Vue, etc.)

Use GitHub Issues for bug reports and feature requests.

## Submitting Pull Requests

1. **Create a Branch**: Create a feature branch from `main`.

   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make Changes**: Implement your changes, following the code style guidelines.

3. **Test Manually**: Since automated tests are not yet implemented, thoroughly test your changes manually.

4. **Update Documentation**: Update README.md or other docs if necessary.

5. **Commit Changes**: Use clear commit messages (see [Commit Guidelines](#commit-guidelines)).

6. **Push and Create PR**: Push your branch and create a pull request on GitHub.

   - Provide a clear description of the changes
   - Reference any related issues
   - Include before/after screenshots for UI changes
   - Test with multiple frameworks if applicable

## Code Style and Standards

- **Language**: TypeScript is the primary language
- **Zero Dependencies**: Maintain zero runtime dependencies - use only native Node.js APIs
- **Modular Architecture**: Follow the service-oriented architecture in `src/`
- **Naming**: Use descriptive names for variables, functions, and classes
- **Comments**: Add JSDoc comments for public APIs
- **Error Handling**: Use the centralized error handler for consistent error management
- **Performance**: Optimize for speed and memory usage

Build and test your changes:

```bash
npm run build
node dist/cli.js [your-test-command]
```

## Testing

Currently, the project relies on manual testing. Future contributions that add automated testing infrastructure are highly encouraged.

When testing:

- Test with various SVG files (simple and complex)
- Test all supported frameworks
- Test edge cases like malformed SVGs
- Verify performance doesn't regress

## Commit Guidelines

- Use the imperative mood in commit messages (e.g., "Add feature" not "Added feature")
- Keep the first line under 50 characters
- Provide a detailed description in the body if needed
- Reference issue numbers when applicable (e.g., "Fix #123")

Example:

```
Add Vue.js framework support

- Implement Vue composition API template
- Add Vue-specific prop handling
- Update framework detection logic

Closes #456
```

## License

By contributing to this project, you agree that your contributions will be licensed under the [MIT License](LICENSE).