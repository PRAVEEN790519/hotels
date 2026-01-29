const express = require('express');
const app = express();

// ======================
// Models
// ======================
const Person = require('./models/person');

// ======================
// Routes
// ======================
const menuItemRoutes = require('./routes/menuitemRoutes');

// ======================
// DB Connection
// ======================
require('./db');

// ======================
// Middleware
// ======================
app.use(express.json());

// ======================
// BASIC CHECK
// ======================
app.get('/', (req, res) => {
  res.send('Server is running 🚀');
});

// ======================
// PERSON ROUTES
// ======================

// POST → add new person
app.post('/persons', async (req, res) => {
  try {
    const person = new Person(req.body);
    const response = await person.save();
    res.status(201).json(response);
  } catch (err) {
    console.error('POST /persons error:', err.message);
    res.status(500).json({ error: err.message });
  }
});

// GET → all persons
app.get('/persons', async (req, res) => {
  try {
    const persons = await Person.find();
    res.status(200).json(persons);
  } catch (err) {
    console.error('GET /persons error:', err.message);
    res.status(500).json({ error: err.message });
  }
});

// GET → persons by work type
app.get('/persons/:workType', async (req, res) => {
  try {
    const workType = req.params.workType;

    if (!['chef', 'manager', 'waiter'].includes(workType)) {
      return res.status(400).json({ error: 'Invalid work type' });
    }

    const persons = await Person.find({ work: workType });
    res.status(200).json(persons);
  } catch (err) {
    console.error('GET /persons/:workType error:', err.message);
    res.status(500).json({ error: err.message });
  }
});

// ======================
// MENU ROUTES
// ======================
app.use('/menu', menuItemRoutes);

// ======================
// SERVER START
// ======================
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
