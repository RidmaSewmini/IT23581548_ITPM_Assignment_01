# Assignment 01 – Automated Testing using Playwright

## Student Registration Number
**IT23581548**

---

## Project Description

This project focuses on automated end-to-end testing of a publicly available **Singlish to Sinhala Translator** web application using **Playwright**.

Since the source code of the system is not available, testing is performed as **black-box testing** using only the publicly accessible URL. The objective is to validate:

- Functional correctness  
- Robustness against invalid inputs  
- UI usability and behavior  
- Cross-browser compatibility  

---

## Application Under Test (AUT)

- **Name:** Singlish to Sinhala Translator  
- **Type:** Web-based Transliteration Tool  
- **Access Method:** Public URL  
- **Testing Approach:** Black-box testing  

---

## Testing Scope

### ✅ Positive Functional Testing

- Daily sentences  
- Compound and complex sentences  
- Interrogative, imperative, and negative forms  
- Multi-word expressions  
- Mixed English & Singlish sentences  
- Tense validation (past / present)  
- Proper handling of punctuation and spacing  

### ❌ Negative Functional Testing

- Joined words without spaces  
- Unsupported symbols  
- Chat abbreviations and netspeak  
- Capital-only inputs  
- Foreign languages  
- Alphanumeric words  
- Extreme input length  
- Robustness validation  

### 🖥️ UI / Usability Testing

- Real-time translation behavior  
- Undo button behavior  
- Input/output synchronization  
- Empty input handling  

---

## Tools & Technologies Used

- **Playwright** – End-to-End Test Automation  
- **JavaScript** – Test scripting language  
- **Node.js** – Runtime environment  
- **Playwright Test Runner** – Test execution  
- **HTML Reporter** – Test result visualization  

---

## Project Structure

```
ITPM_Assignment_01/
│
├── tests/
│   ├── positive.spec.js     # Positive functional test cases
│   ├── negative.spec.js     # Negative / robustness test cases
│   └── ui.spec.js           # UI and usability test cases
│
├── playwright.config.js     # Playwright configuration
├── package.json             # Project dependencies
├── README.md                # Project documentation
└── test-results/            # Generated test reports
```

---

## Cloning the Git Repository

Follow the steps below to clone this repository to your local machine.

### 1️⃣ Install Git

Ensure Git is installed:

```bash
git --version
```

If not installed, download from: https://git-scm.com/

### 2️⃣ Clone the Repository

```bash
git clone <REPOSITORY_URL>
```

Replace `<REPOSITORY_URL>` with the actual GitHub repository URL.

### 3️⃣ Navigate to Project Directory

```bash
cd ITPM_Assignment_01
```

---

## Installation & Setup

### 1️⃣ Prerequisites

Ensure the following are installed:

- Node.js (v18 or later recommended)  
- npm  

Verify installation:

```bash
node -v
npm -v
```

### 2️⃣ Install Dependencies

```bash
npm install
```

### 3️⃣ Install Playwright Browsers

```bash
npx playwright install
```

---

## Running the Tests

### ▶ Run All Tests (All Browsers)

```bash
npx playwright test
```

### ▶ Run Tests in Headed Mode

```bash
npx playwright test --headed
```

### ▶ Run a Specific Test File

```bash
npx playwright test tests/positive.spec.js
npx playwright test tests/negative.spec.js
npx playwright test tests/ui.spec.js
```

---

## Viewing Test Reports

```bash
npx playwright show-report
```

The report displays:

- Passed / Failed test cases  
- Screenshots  
- Error traces  
- Browser-specific results  

---

## Cross-Browser Testing

Tests are executed on:

- ✅ Chromium (Chrome)  
- ✅ Firefox  
- ✅ WebKit (Safari)  

This ensures browser compatibility and real-world reliability.

---

## Key Observations

- Translator performs well for daily Singlish sentences  
- Edge cases (netspeak, all-caps, alphanumeric words) fail as expected  
- Undo button UI behavior does not fully restore previous input/output  
- Firefox browser is more sensitive to timing, requiring stable waits  

---

## Conclusion

This project demonstrates:

- Black-box automated testing  
- Real-world UI and functional validation  
- Playwright best practices  
- Robust handling of asynchronous UI behavior  
- Professional test documentation  

