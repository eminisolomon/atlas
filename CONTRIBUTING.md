# Contributing to @xinnovations/atlas

Thank you for considering contributing to @xinnovations/atlas! 🌍

## Quick Start

```bash
# Fork and clone
git clone https://github.com/eminisolomon/atlas.git
cd atlas

# Install and test
npm install
npm test
```

## Ways to Contribute

### 🐛 Report Bugs

- Steps to reproduce
- Expected vs actual behavior
- Code example

### 💡 Suggest Features

- The problem you're solving
- Your proposed solution

### 📊 Correct Data

- Current incorrect data
- Correct data with source

## Making Changes

### 1. Create a Branch

```bash
git checkout -b feat/your-feature
```

### 2. Make Your Changes

- Follow existing code style
- Add tests for new features

### 3. Test

```bash
npm test
npm run build
```

### 4. Commit

Use [Conventional Commits](https://www.conventionalcommits.org/):

```bash
git commit -m "feat: add new feature"
```

## Code Guidelines

### TypeScript

```typescript
// ✅ Good
export function getCountry(name: string): Country | undefined { ... }
```

## Project Structure

```sh
atlas/
├── src/
│   ├── lib/              # Core library functions
│   │   ├── country.ts
│   │   ├── state.ts
│   │   ├── city.ts
│   │   └── index.ts
│   ├── data/             # Data source
│   │   ├── countryData.ts
│   │   └── index.ts
│   ├── utils/            # Utilities
│   │   └── index.ts
│   ├── interfaces/       # Type definitions
│   │   ├── types.ts
│   │   └── index.ts
│   └── index.ts          # Main entry
├── test/
│   └── index.spec.ts     # Tests
├── docs/                 # VitePress docs
```

## Code of Conduct

Be respectful and constructive.

---

**Thank you for contributing!**
