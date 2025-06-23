# playwright-bdd-example

Example project that uses [playwright-bdd](https://github.com/vitalets/playwright-bdd) to run BDD tests.

> [!IMPORTANT]
> If you are using [Yarn Plug'n'Play](https://yarnpkg.com/features/pnp), please check out [yarn-pnp](https://github.com/vitalets/playwright-bdd-example/tree/yarn-pnp) branch. 

## How to report a bug

1. [Fork](https://github.com/vitalets/playwright-bdd-example/fork) the repo!
2. Clone it to your local machine

   ```
   git clone https://github.com/YOUR_GITHUB_USERNAME/playwright-bdd-example.git
   ```

3. Change directory to `playwright-bdd-example`

   ```
   cd playwright-bdd-example
   ```

4. Install dependencies

```bash
npm install
```

5. Install browsers

   ```
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

