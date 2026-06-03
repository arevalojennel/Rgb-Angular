# RGB Angular

Technical Exam Submission for Hitachi Payment Solutions Incorporated

## Overview

RGB Angular is a simple Angular application developed as part of the technical examination process for Hitachi Payment Solutions Incorporated.

The application demonstrates:

* Angular standalone components
* Routing and navigation
* Component communication
* Form validation
* Modal implementation
* Responsive UI design
* Carousel functionality
* External website integration
* Basic user session handling

---

## Features

### Login Screen

* Username input validation
* Custom UI styling
* PIN verification modal
* Error handling and user feedback

### PIN Verification

* Six-digit PIN entry
* Individual PIN input boxes
* Modal-based verification workflow
* Validation before submission

### Dashboard

* User profile display
* Profile image support with fallback avatar
* Social media shortcuts
* Logout action sheet

### Social Media Pages

* YouTube
* Spotify
* Facebook

Each social platform can be accessed through the dashboard and opens its corresponding website.

### Others Page

* Auto-playing brand carousel
* Infinite looping navigation
* Previous and next controls
* Dot indicators
* External website redirection

---

## Technologies Used

* Angular
* TypeScript
* SCSS
* Angular Router
* HTML5

---

## Project Structure

```text
src/
├── app/
│   ├── login/
│   ├── dashboard/
│   ├── social-detail/
│   ├── others/
│   ├── models/
│   └── services/
├── assets/
│   └── images/
├── styles.scss
└── main.ts
```

---

## Installation

### Clone the repository

```bash
git clone <repository-url>
cd rgb-angular
```

### Install dependencies

```bash
npm install
```

### Run the application

```bash
ng serve
```

Open the application in your browser:

```text
http://localhost:4200
```

---

## Build

Generate a production build:

```bash
ng build
```

The build output will be generated in:

```text
dist/rgb-angular
```

---

## Application Flow

1. User enters a username.
2. User proceeds to PIN verification.
3. Upon successful verification, the user is redirected to the dashboard.
4. Dashboard provides access to social media pages and the brand carousel page.
5. External links are opened in a new browser tab.

---

## Notes

* This project was created solely for the purpose of the technical examination.
* The implementation focuses on Angular fundamentals, component architecture, routing, and UI development.
* No backend services are included in this submission.
* The application is intended to demonstrate frontend development skills using Angular.

---

## Technical Exam Information

**Company:** Hitachi Payment Solutions Incorporated

**Submission Type:** Technical Examination

**Project Name:** RGB Angular

---

## Requirements

### Development Environment

* Node.js 18 or later
* npm 9 or later
* Angular CLI 20.x

Verify installed versions:

```bash
node -v
npm -v
ng version
```

---

## Running in Development Mode

Start the development server:

```bash
ng serve
```

Or specify a port:

```bash
ng serve --port 4200
```

The application will automatically reload when source files are modified.

---

## Author

Submitted as part of the technical examination process for Hitachi Payment Solutions Incorporated.
