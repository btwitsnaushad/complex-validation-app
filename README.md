# 🚀 Complex Validation Hooks

A React multi-step form built with custom hooks, regex-based validation, asynchronous form submission, and a clean responsive UI. 

### 🔗 Project Links
* **Live Demo:** [https://complex-validation-app.vercel.app](https://complex-validation-app.vercel.app)
* **GitHub Repository:** [https://github.com/btwitsnaushad/complex-validation-app](https://github.com/btwitsnaushad/complex-validation-app)

---

## ✨ Features & Implementation

### 1. Core Functionality (The "Happy Path")
* **Multi-Step Architecture:** Seamless navigation between form steps with state preservation.
* **Real-time Custom Validation:** Strict Regex-based validation for usernames (alphanumeric, 3-15 chars) and account numbers (exactly 10 digits).
* **Telemetry Simulation:** Console logging integrated for interaction tracking.

### 2. Edge Case Handling (The "Unhappy Path")
* **Async Submission & 3G Simulation:** Handles slow network conditions flawlessly. Form inputs and buttons are locked/disabled during the 2.5s simulated processing time to prevent duplicate submissions.
* **Error States:** Instant red highlighting and descriptive error messages for malformed data.
* **Enterprise Security:** Built-in XSS input sanitization to prevent malicious script injection.

### 3. Premium UI/UX & Accessibility
* **Modern Design System:** Monochromatic green and white palette, floating card design, dynamic input focus rings, and smooth page-load entrance animations.
* **Zero CSS Dependencies:** Completely styled using pure CSS and component-scoped styling.
* **Accessibility (a11y):** ARIA labels integrated across all interactive elements for screen reader support.

---

## 🛠️ Tech Stack
* **Framework:** React.js + Vite
* **State Management:** React Hooks (`useState`, `useEffect`)
* **Deployment:** Vercel

---

## 📦 How to Run Locally

1. Clone the repository:
   ```bash
git clone https://github.com/btwitsnaushad/complex-validation-app.git