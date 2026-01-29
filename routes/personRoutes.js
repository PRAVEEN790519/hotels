const express = require('express');
const router = express.Router();
const Person = require('../models/person');

/* ======================
   POST - Add new person
====================== */
router.post('/', async (req, res) => {
  try {
    const newPerson = new Person(req.body);
    const response = await newPerson.save();
    res.status(201).json(response);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

/* ======================
   GET - All persons
====================== */
router.get('/', async (req, res) => {
  try {
    const persons = await Person.find();
    res.status(200).json(persons);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

/* ======================
   GET - Persons by work type (chef/manager/waiter)
====================== */
router.get('/:workType', async (req, res) => {
  try {
    const workType = req.params.workType;

    if (!['chef', 'manager', 'waiter'].includes(workType)) {
      return res.status(404).json({ error: 'Invalid work type' });
    }

    const response = await Person.find({ work: workType });
    res.status(200).json(response);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

/* ======================
   DELETE - Delete person by ID
====================== */
router.delete('/:id', async (req, res) => {
  try {
    const personId = req.params.id;
    const deletedPerson = await Person.findByIdAndDelete(personId);

    if (!deletedPerson) {
      return res.status(404).json({ error: 'Person not found' });
    }

    res.status(200).json({
      message: 'Person deleted successfully',
      deletedPerson
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
