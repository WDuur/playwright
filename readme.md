# 🎭 Playwright End-to-End Test Suite

This project contains end-to-end (E2E) tests using [Microsoft Playwright](https://playwright.dev/). Playwright enables fast and reliable testing for web applications across Chromium, Firefox, and WebKit.

---

## 🧰 Requirements

- [Node.js](https://nodejs.org/) v16+ recommended
- npm (comes with Node.js)
- Git (optional, for version control)

---

## 🚀 Getting Started

### 1. Clone the repository (if applicable)

```bash
git clone https://github.com/your-org/your-project.git
cd your-project
```

### 2. Install dependencies

```bash
npm install
```

### 3. Install Playwright browsers

```bash
npx playwright install
```

This installs Chromium, Firefox, and WebKit for testing.

---

## 🧪 Running Tests

### Run all tests

```bash
npx playwright test
```

### Run tests with UI (headed mode)

```bash
npx playwright test --headed
```

### Run a specific test file

```bash
npx playwright test tests/example.spec.ts
```

---

## 🕵️ Debugging / Viewing Test Runs

### Show the test runner with UI (Playwright Test Inspector)

```bash
npx playwright test --debug
```

---

## 📸 Test Reports

After running tests, a test report is generated:

```bash
npx playwright show-report
```

You can also configure automatic report generation in `playwright.config.ts`.

---

## ⚙️ Configuration

Playwright uses a configuration file:

```ts
// playwright.config.ts
import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  use: {
    baseURL: 'https://your-app-url.com',
    headless: true,
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },
});
```

You can override settings using CLI flags.

---

## 🧼 Cleanup

To remove Playwright’s downloaded browsers:

```bash
npx playwright install --with-deps
```

Or remove `.playwright` and `node_modules`:

```bash
rm -rf node_modules .playwright
```

---

## 📁 Project Structure (Example)

```
.
├── tests/                  # Your test files
│   └── example.spec.ts
├── playwright.config.ts    # Playwright configuration
├── package.json
└── README.md
```

---

## 📚 Useful Links

- [Playwright Documentation](https://playwright.dev/docs/intro)
- [Playwright Test API](https://playwright.dev/docs/test-api)
- [Playwright GitHub](https://github.com/microsoft/playwright)

---

## 💬 Need Help?

Open an issue or reach out to your QA/dev team.

