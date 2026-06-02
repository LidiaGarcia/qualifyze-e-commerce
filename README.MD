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

## Load Testing

Although load testing is not an area I work with on a daily basis, I wanted to explore it for this assessment using k6, a modern JavaScript-based load testing tool.

> **Note:** Saucedemo processes authentication entirely client-side with no HTTP requests 
> to a backend. Therefore, traditional load testing of the login flow is not applicable. 
> Instead, the load test simulates multiple concurrent users loading the application, 
> which is the actual server-side operation that would be under stress in a real scenario.
> In a production app with a REST authentication API, the same script would target 
> the login endpoint directly.

Requires k6 installed: https://k6.io/docs/get-started/installation/

Run load tests:
```bash
npm run k6:run
```

### Results

| Metric | Run 1 | Run 2 | Run 3 |
|---|---|---|---|
| Checks passed | 100% | 99.64% | 99.64% |
| Avg response time | 25.53ms | 21.76ms | 24.88ms |
| p95 response time | 39.38ms | 29.68ms | 33.56ms |
| Error rate | 0% | 0.35% | 0.35% |
| Total requests | 295 | 282 | 279 |

### Analysis

The application handled the simulated load without any significant degradation. Response times were consistently fast across all three runs, with a p95 below 40ms and results stable between executions.

The single failure in Run 2 and Run 3 was caused by a network timeout (`wsarecv`) on the client side, unrelated to server load. The maximum iteration duration of 19s in both runs is explained by this timeout and does not represent the application's normal behavior.
