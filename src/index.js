const express = require('express');
const bodyParser = require('body-parser');
const initialData = require('./initialData');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

let studentArray = [...initialData];

app.get('/api/student', (req, res) => {
  res.status(200).json(studentArray);
});

app.get('/api/student/:id', (req, res) => {
  const studentId = parseInt(req.params.id);
  const studentRecord = studentArray.find((student) => student.id === studentId);
  if (studentRecord) {
    res.status(200).json(studentRecord);
  } else {
    res.status(404).send('Student record not found');
  }
});

app.post('/api/student', (req, res) => {
  const { name, currentClass, division } = req.body;
  if (name && currentClass && division) {
    const newStudentRecord = {
      id: studentArray.length + 1,
      name: name,
      currentClass: currentClass,
      division: division
    };
    studentArray.push(newStudentRecord);
    res.status(200).json({ id: newStudentRecord.id });
  } else {
    res.status(400).send('Incomplete details provided');
  }
});

app.put('/api/student/:id', (req, res) => {
  const studentId = parseInt(req.params.id);
  const { name } = req.body;
  const studentRecordIndex = studentArray.findIndex((student) => student.id === studentId);
  if (studentRecordIndex !== -1 && name) {
    studentArray[studentRecordIndex].name = name;
    res.status(200).send('Student record updated successfully');
  } else {
    res.status(400).send('Invalid update provided');
  }
});

app.delete('/api/student/:id', (req, res) => {
  const studentId = parseInt(req.params.id);
  const studentRecordIndex = studentArray.findIndex((student) => student.id === studentId);
  if (studentRecordIndex !== -1) {
    studentArray.splice(studentRecordIndex, 1);
    res.status(200).send('Student record deleted successfully');
  } else {
    res.status(404).send('Student record not found');
  }
});

const port = 8080;
app.listen(port, () => console.log(`App listening on port ${port}!`));

module.exports = app;
