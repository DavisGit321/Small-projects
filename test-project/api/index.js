const express = require('express');
const Joi = require('@hapi/joi');
const cors = require('cors');

const app = express();
const courses = [
  { id: 1, name: 'course1' },
  { id: 1, name: 'course1' },
  { id: 2, name: 'course1' },
];

app.use(cors());
app.use(express.json());

function validateCourse(course) {
  const schema = {
    name: Joi.string().min(3).required(),
  };

  return Joi.validate(course, schema);
}


app.get('/', (req, res) => {
  res.send('hello world??');
});


app.get('/api/courses', (req, res) => {
  res.send(courses[0]);
});


app.get('/api/courses/:id', (req, res) => {
  const course = courses.find(c => c.id === parseInt(req.params.id, 10));
  if (!course) return res.status(404).send('The course with the given ID does not exist');
  return res.send(course);
});


app.post('/api/courses', (req, res) => {
  const { error } = validateCourse(req.body);
  if (error) {
    res.status(400).send(error.details[0].message);
    return;
  }

  const course = {
    id: courses.length + 1,
    name: req.body.name,
  };
  courses.push(course);
  res.send(course);
});


app.put('/api/courses/:id', (req, res) => {
  const course = courses.find(c => c.id === parseInt(req.params.id, 10));
  if (!course) {
    return res.status(404).send('The course with the given ID does not exist');
  }

  const { error } = validateCourse(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  course.name = req.body.name;
  return res.send(course);
});


app.delete('/api/courses/:id', (req, res) => {
  const course = courses.find(c => c.id === parseInt(req.params.id, 10));
  if (!course) return res.status(404).send('The course with the given ID does not exist');

  const index = courses.indexOf(course);
  courses.splice(index, 1);

  return res.send(course);
});


//  PORT
const port = 9000;
app.listen(port, () => console.log(`listening on port ${port}...`));
