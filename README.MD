# E-Commerce Test Suite

Automated test suite for e-commerce platform using Playwright and TypeScript.

## Requirements

- Node.js >= 18
- npm >= 9

## Installation

Clone the repository and install dependencies:

```bash
git clone https://github.com/LidiaGarcia/qualifyze-e-commerce.git
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
npx playwright test --grep "@smoke"
```

Run a specific test file:
```bash
npx playwright test tests/login.spec.ts
```

Run a specific test:
```bash
npx playwright test --grep "@test-1"
```


## Reports

After running tests, open the HTML report:
```bash
npx playwright show-report
```

In case some test fail, it is possible to see the trace and a screenshoot in /playwright-report. 

## Automation vs Manual Rationale

The user journeys/e2e tests that are candidates for automation are the ones that are stable, repetitive and critical for the business. The ones that should remain manual are the ones that need a human visual checks or changes frequently. 
For this assessment I kept it simple and automate the most relevant and high-impact tests for me:
- **Login feature**: login successfully and login with locked out user/invalid credential, I also added the invalid credentials because it was trivial to add since it is the same code for the locked out user.
- **Checkout and Cart feature**: I decided to make two user journey tests. One that is a complete end-to-end journey for the whole purchase process and other one for remove items from cart. For these two tests they cover all the test cases defined for Checkout feature in the Test Plan and most of the Cart feature.

| Test Case | Approach | Rationale |
|---|---|---|
| Successful login with valid credentials | Automated | Stable, critical, runs on every deploy |
| Login with invalid credentials | Automated | Stable, trivial to add |
| Login with locked out user | Automated | Stable, trivial to add |
| Session persistence after browser refresh | Manual | Automatable but deprioritized given time constraints of this assessment |
| Checkout cannot be completed if mandatory fields are empty | Automated | Covered in purchase flow test |
| Checkout overview shows items info and price total | Automated | Covered in purchase flow test |
| Happy path: fill form, finish order, confirmation | Automated | Critical business flow, repetitive |
| Add items to cart | Automated | Covered in purchase flow test |
| Remove items from cart | Automated | Stable, repetitive |
| Cart items persist across page navigation | Automated | Covered in purchase flow test |
| Cart empty after finish checkout | Automated | Covered in purchase flow test |
| Checkout with empty cart | Manual | Edge case, low frequency, simple to verify manually |