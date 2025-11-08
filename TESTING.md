# SVGER-CLI Testing Guide

## Automated Framework Tests

The project includes comprehensive testing for all 8 supported frameworks.

### Run All Framework Tests

```bash
node test-frameworks.js
```

This test suite validates:
- ✅ Component generation for React, Vue, Svelte, Angular, Solid, Preact, Lit, Vanilla
- ✅ TypeScript type correctness
- ✅ Framework-specific patterns and best practices
- ✅ Correct file extensions per framework
- ✅ Code syntax validity

### Test Output

All generated test components are saved to `test-output/` directory for manual inspection.

## Manual CLI Testing

### Test React (Default)

```bash
svger-cli build my-svgs test-react
```

Expected: `.tsx` files with React.forwardRef components

### Test Vue Composition API

```bash
svger-cli build my-svgs test-vue --framework vue --composition
```

Expected: `.vue` files with `<script setup lang="ts">`

### Test Vue Options API

```bash
svger-cli build my-svgs test-vue-options --framework vue
```

Expected: `.vue` files with `defineComponent`

### Test Svelte

```bash
svger-cli build my-svgs test-svelte --framework svelte
```

Expected: `.svelte` files with TypeScript props

### Test Angular Standalone

```bash
svger-cli build my-svgs test-angular --framework angular --standalone
```

Expected: `.component.ts` files with `standalone: true`

### Test Angular Module

```bash
svger-cli build my-svgs test-angular-module --framework angular
```

Expected: `.component.ts` files without standalone flag

### Test Solid

```bash
svger-cli build my-svgs test-solid --framework solid
```

Expected: `.tsx` files with Solid Component types

### Test Preact

```bash
svger-cli build my-svgs test-preact --framework preact
```

Expected: `.tsx` files with Preact FunctionComponent

### Test Lit

```bash
svger-cli build my-svgs test-lit --framework lit
```

Expected: `.ts` files with @customElement decorator

### Test Vanilla JS

```bash
svger-cli build my-svgs test-vanilla --framework vanilla
```

Expected: `.ts` files with factory functions

## Build Verification

After making changes:

```bash
# Clean build
npm run build

# Run automated tests
node test-frameworks.js

# Manual CLI test
svger-cli build my-svgs test-output --framework vue
```

## Test Results

Latest test run (2025-11-07):

```
Total Tests: 10
✅ Passed: 10
❌ Failed: 0

Frameworks Tested:
- React ✅
- Vue (Composition) ✅
- Vue (Options) ✅
- Svelte ✅
- Angular (Standalone) ✅
- Angular (Module) ✅
- Solid ✅
- Preact ✅
- Lit ✅
- Vanilla ✅
```

All frameworks generate valid, idiomatic components that follow framework best practices.
