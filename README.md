# AccuKnox User Management Automation Tests

This repository contains automation tests for the OrangeHRM User Management module using **Playwright** and **Page Object Model (POM)**.

---

##  Project Setup

1. **Clone the repository:**

```bash
git clone https://github.com/PoonamMomale/AccuKnox-user-management-tests.git
cd AccuKnox-user-management-tests
```

2. **Install dependencies**
   
```
npm install
```

3. **Install Playwright browsers (if not already installed):**

```
npx playwright install
```

## Run Test Cases

1. **Run all tests:**

```
npx playwright test
```

2. **Run a specific test file:**

```
npx playwright test tests/userManagement.test.js
```

3. **Run tests in headed mode (for debugging):**

```
npx playwright test --headed
```

## Folder Structure

accunox-user-management-tests/
├── pages/                 # Page Object Models
├── tests/                 # Test cases
├── docs/                  # Test case Excel sheet
├── package.json
├── README.md
└── .gitignore

## Playwright Version (used in project)

- @playwright/test: ^1.56.1

## Notes

Tests use Page Object Model (POM) for maintainability.
Meaningful selectors are used (data-* attributes or visible text).
Proper waits for elements are included to ensure stable execution.
Each test case is in a separate test() block in userManagement.test.js.

## Test Case Document
Located in docs/User-management-test-cases.xlsx
Includes test scenarios, pre-conditions, test steps, test data, and expected results.

