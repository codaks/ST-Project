
# ERP Portal: Faculty Registration Module

## Project Overview
This project implements a module for an ERP portal focusing on faculty registration and course management. The module includes:
- Login/Signup functionality
- Profile editing
- Course addition, deletion, and updates

The purpose of this project is to test the client-side code by designing test cases that bypass validation and perform mutation testing.

The project is developed using **React** (client-side), **Node.js** (server-side), and **MySQL** (database).

## Key Features
1. **Client-Side Validation**: Tested for bypass vulnerabilities.
2. **Mutation Testing**: Integrated Stryker to evaluate robustness.

## Test Strategy
**Bypass Testing**:
- Designed test cases that directly manipulate form inputs or script data to bypass client-side validation.
- Sent altered/corrupt data to the server.

**Tools Used**:
- **Stryker**: Mutation testing tool.
- Browser dev tools for form/script manipulation.

### Login Component Test Cases
- **renders login page correctly**: Verifies that the login page is rendered with appropriate fields and buttons.
- **shows error for empty fields on login**: Ensures error messages appear when the login form is submitted with empty fields.
- **shows error for incorrect credentials**: Tests the error handling when the login credentials are incorrect.
- **allows login with valid credentials**: Ensures the login form can be submitted successfully with valid credentials.
- **redirects to dashboard after successful login**: Verifies that the user is redirected to the dashboard after a successful login.

### Signup Component Test Cases
- **renders all input fields and the register button**: Verifies that all input fields and the "Register" button are rendered correctly.
- **shows error messages for empty fields on form submission**: Ensures that error messages appear when required fields are not filled during signup.
- **shows error for invalid phone number**: Ensures that an error message appears when an invalid phone number is entered.
- **clears error messages when inputs are corrected**: Verifies that error messages are cleared when incorrect fields are corrected.
- **allows form submission with valid inputs**: Ensures the form can be submitted successfully with valid inputs and verifies the API call.

### CourseDetails Component Test Cases
- **renders course details page correctly**: Verifies that the course details page is rendered correctly.
- **shows error for missing fields when adding a course**: Ensures that error messages appear when required fields are missing during course creation.

### Profile Component Test Cases
- **renders profile page correctly**: Verifies that the profile page loads correctly with the user’s data.
- **allows profile update with valid inputs**: Tests that the profile can be updated successfully with valid data.
- **shows error for empty fields when updating profile**: Ensures that error messages appear when required fields are left empty while updating the profile.
- **shows error for invalid phone number during profile update**: Ensures the profile update shows an error when an invalid phone number is entered.
- **shows success message after profile update**: Verifies that a success message is shown after successfully updating the profile.



## How to Run

### Backend Setup
1. Navigate to the backend folder:
   ```bash
   cd backend
   ```
2. Install backend dependencies:
   ```bash
   npm install
   ```
3. Set up the MySQL database:
   - Run the SQL scripts provided in `backend/sql/` to create the necessary database schema and tables.
   - Update the `backend/config/db.js` file with your MySQL credentials:
     ```javascript
     const dbConfig = {
         host: 'localhost',
         user: 'your-username',
         password: 'your-password',
         database: 'erp_portal_db'
     };
     ```
4. Start the backend server:
   ```bash
   npm start
   ```

### Frontend Setup
1. Open a new terminal and navigate to the frontend folder:
   ```bash
   cd frontend
   ```
2. Install frontend dependencies:
   ```bash
   npm install
   ```
3. Start the React development server:
   ```bash
   npm start
   ```

### Running Tests
- To run mutation tests using Stryker, navigate to the `frontend` or `backend` folder (where configured) and run:
   ```bash
   npx stryker run
   ```
- To run other tests, use the `npm test` command in the appropriate folder.

## Results
- **Mutation Testing Score**: 85% mutation coverage.
- **Screenshots**:
  ![Bypass Test Screenshot](screenshots/s2.png)

## Team Contributions
| Team Member                          | Contribution                                           |
|--------------------------------------|-----------------------------------------------------------|
| Chitransh Kulshrestha MT2023047      | Edit Profile, Updating, Deleting, and Adding new courses with test cases    |
| Gramya Gupta MT2023047               | Functionality of Login and Signup with test cases|

