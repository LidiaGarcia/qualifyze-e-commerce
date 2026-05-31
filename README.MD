# E-Commerce Test Suite

Automated test suite for e-commerce platform using Playwright and TypeScript.

## Requirements

- Node.js >= 18
- npm >= 9

## Installation

Clone the repository and install dependencies:

```bash
git clone <repo-url> //todo
cd qualifyze-e-commerce
npm install
npx playwright install
```

## Run Tests

Run all tests:
```bash
npx playwright test
```

Run all tests in headed mode (visible browser):
```bash
npx playwright test --headed
```

Run smoke tests only:
```bash
npx playwright test --grep @smoke
```

Run a specific test file:
```bash
npx playwright test tests/login.spec.ts
```

## Reports

After running tests, open the HTML report:
```bash
npx playwright show-report
```

## Automation vs Manual Rationale

//todo 