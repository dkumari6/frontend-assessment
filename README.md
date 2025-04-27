# Frontend Technical Assessment – Dibyani Kumari
This project contains solutions for the technical assessment, consisting of two parts: JavaScript solutions and Angular solutions. Refer to the project structure and the details below for instructions on how to run the scripts.

### Install
```bash
git clone https://github.com/dkumari6/frontend-assessment.git
cd frontend-assessment
```

### Project Structure
```bash
/frontend-assessment
│
├── /angular
│   └── /ECT-angular-project
│       └── /src
│           └── /app
│               ├── /pipes
│               │   └── custom-sort.pipe.ts
│               ├── /components
│               │   └── /repeater
│               │       ├── repeater.component.ts
│               │       └── repeater.component.html
│               ├── app.component.html
│               └── app.component.ts
│
└── /javascript
    ├── deepCopy.js
    ├── checkEquivalence.js
    └── executeCode.js

```

## JavaScript Solutions

### Question 1. Deep Copy Function
This function creates a deep copy of a given object. It uses a `WeakMap` to keep track of already copied objects to prevent infinite loops due to circular references.

#### Run the script using Node.js:
```bash
node javascript/deepCopy.js
```
### Question 2. Equivalence Check Function
This function checks if two values are deeply equal. It compares the values recursively and returns true if they are deeply equal and false otherwise.
#### Run the script using Node.js:
```bash
node javascript/checkEquivalence.js
```
### Question 3. JavaScript Code Executor
This function executes a string of JavaScript code dynamically with user-defined variables and built-in global functions for math operations and logging.
### Run the script using Node.js:
```bash
node javascript/executeCode.js
```

## Angular Solutions

This project contains two Angular solutions: a custom sorting pipe and a repeater component.

## Features

### 1. Custom Sort Pipe (`custom-sort.pipe`)

A custom pipe that allows sorting of arrays of string, number, date, or other primitive types.

### 2. Repeater Component (repeater.component)
This component repeats the enclosed template based on the number of elements in the input array.

### Run using ng serve
```bash
npm install
ng serve -o
```