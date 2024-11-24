const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mysql = require("mysql2");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const app = express();
const PORT = 5000;
const JWT_SECRET = "your_secret_key";

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MySQL connection
const db = mysql.createConnection({
  host: "localhost",
  user: "chitransh",
  password: "Chitransh07&",
  database: "st_project",
});

db.connect((err) => {
  if (err) throw err;
  console.log("Connected to MySQL!");
});

// Routes
app.post("/signup", async (req, res) => {
  const {
    name,
    email,
    password,
    phone,
    department,
    qualifications,
    experience,
    intro,
    position,
  } = req.body;

  try {
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // SQL query to insert new user
    const query = `
      INSERT INTO users (name, email, password, phone, department, qualifications, experience, intro, position)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    // Insert user data into the database
    db.query(
      query,
      [name, email, hashedPassword, phone, department, qualifications, experience, intro, position],
      (err) => {
        if (err) {
          if (err.code === "ER_DUP_ENTRY") {
            return res.status(400).json({ message: "Email already exists" });
          }
          return res.status(500).json({ message: "Error creating user" });
        }
        res.json({ message: "User registered successfully!" });
      }
    );
  } catch (error) {
    res.status(500).json({ message: "Error processing request" });
  }
});

app.post("/login", (req, res) => {
  const { email, password } = req.body;

  const query = "SELECT * FROM users WHERE email = ?";
  db.query(query, [email], async (err, results) => {
    if (err) return res.status(500).json({ message: "Error logging in" });

    if (results.length === 0) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const user = results[0];
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: "1h" });

    // Exclude sensitive information (like the password) from the user object
    const { password: _, ...userData } = user;

    res.json({
      message: "Login successful!",
      token,
      user: userData, // Send user data back
    });
  });
});

app.put("/update-profile", async (req, res) => {
  const { name, email, phone, department, qualifications, experience, intro, position } = req.body;
  const { userId } = req.query; // Assuming userId is passed as a query parameter, you could alternatively extract it from the JWT token.

  if (!userId) {
    return res.status(400).json({ message: "User ID is required" });
  }

  // Ensure that at least one field is provided
  if (!name && !email && !phone && !department && !qualifications && !experience && !intro && !position) {
    return res.status(400).json({ message: "At least one field is required to update" });
  }

  // Construct SQL query dynamically to update only provided fields
  const updates = [];
  const values = [];

  if (name) {
    updates.push("name = ?");
    values.push(name);
  }
  if (email) {
    updates.push("email = ?");
    values.push(email);
  }
  if (phone) {
    updates.push("phone = ?");
    values.push(phone);
  }
  if (department) {
    updates.push("department = ?");
    values.push(department);
  }
  if (qualifications) {
    updates.push("qualifications = ?");
    values.push(qualifications);
  }
  if (experience) {
    updates.push("experience = ?");
    values.push(experience);
  }
  if (intro) {
    updates.push("intro = ?");
    values.push(intro);
  }
  if (position) {
    updates.push("position = ?");
    values.push(position);
  }

  // Add userId to the values array at the end
  values.push(userId);

  // Construct SQL query string with dynamic fields
  const query = `
    UPDATE users SET ${updates.join(", ")} WHERE id = ?
  `;

  // Execute the SQL query
  db.query(query, values, (err) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: "Error updating profile" });
    }

    res.json({ message: "Profile updated successfully!" });
  });
});


// Get all courses for a specific faculty
app.get("/courses/:facultyId", (req, res) => {
  const facultyId = req.params.facultyId;

  const query = `
      SELECT * FROM courses WHERE faculty_id = ?;
  `;
  db.query(query, [facultyId], (err, results) => {
      if (err) {
          return res.status(500).json({ error: err.message });
      }
      res.json(results);
  });
});

// Add a new course for a specific faculty
app.post("/courses", (req, res) => {
  const { course_code, course_name, faculty_id, description, max_students } = req.body;

  if (!course_code || !course_name || !faculty_id || !description || !max_students) {
      return res.status(400).json({ message: "All fields are required." });
  }

  const query = `
      INSERT INTO courses (course_code, course_name, faculty_id, description, max_students)
      VALUES (?, ?, ?, ?, ?);
  `;
  db.query(
      query,
      [course_code, course_name, faculty_id, description, max_students],
      (err) => {
          if (err) {
              return res.status(500).json({ error: err.message });
          }
          res.json({ message: "Course added successfully." });
      }
  );
});

// Update an existing course
app.put("/courses/:id", (req, res) => {
  const courseId = req.params.id;
  const { course_code, course_name, description, max_students } = req.body;

  const query = `
      UPDATE courses
      SET course_code = ?, course_name = ?, description = ?, max_students = ?
      WHERE id = ?;
  `;
  db.query(
      query,
      [course_code, course_name, description, max_students, courseId],
      (err) => {
          if (err) {
              return res.status(500).json({ error: err.message });
          }
          res.json({ message: "Course updated successfully." });
      }
  );
});

// Delete a course
app.delete("/courses/:id", (req, res) => {
  const courseId = req.params.id;

  const query = `DELETE FROM courses WHERE id = ?;`;
  db.query(query, [courseId], (err) => {
      if (err) {
          return res.status(500).json({ error: err.message });
      }
      res.json({ message: "Course deleted successfully." });
  });
});



// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});


