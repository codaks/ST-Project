# ERP Portal: Faculty Registration Module

## Project Overview
This project implements a module for an ERP portal focusing on faculty registration and course management. The module includes:
- Login/Signup functionality
- Profile editing
- Course addition, deletion, and updates

The purpose of this project is to test the client-side code by designing test cases that bypass validation and perform mutation testing.

## Key Features
1. **Client-Side Validation**: Tested for bypass vulnerabilities.
2. **Mutation Testing**: Integrated Stryker to evaluate robustness.
3. Approximately 1000+ lines of code implementing key functionalities.

## Test Strategy
**Bypass Testing**: 
- Designed test cases that directly manipulate form inputs or script data to bypass client-side validation.
- Sent altered/corrupt data to the server.

**Tools Used**:
- **Stryker**: Mutation testing tool.
- Browser dev tools for form/script manipulation.

## How to Run
1. Clone the repository: [Repository Link]
2. Navigate to the project folder and follow the setup instructions in the repository.
3. Use `npm test` or the equivalent command to execute test cases.

## Results
- Mutation testing score: [Include details, e.g., mutation coverage percentage].
- Screenshots of bypass test results: [Attach links or file paths].

## Team Contributions
| Team Member                          | Contribution                                           |
|--------------------------------------|-----------------------------------------------------------|
| Chitransh Kulshrestha MT2023047      | Edit Profile, Updating, Deleting and Adding new courses with test cases    |
| Gramya Gupta MT2023047               | Functionality of Login and Signup with test cases|

## Contact
For any queries, contact [Your Email].
