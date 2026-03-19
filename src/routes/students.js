import { Hono } from 'hono';
import {
  getAllStudents,
  getStudentById,
  addStudent,
  updateStudent,
  deleteStudent,
  getStudentsStats,
  searchStudents,
  studentSchema,
} from '../data/students.js';

const router = new Hono();

// GET /students
router.get('/students', (c) => {
  const students = getAllStudents();
  return c.json(students);
});

// GET /students/stats
router.get('/students/stats', (c) => {
  const stats = getStudentsStats();
  return c.json(stats);
});

// GET /students/search?q=...
router.get('/students/search', (c) => {
  const q = c.req.query('q');
  if (!q) {
    return c.json({ error: 'Query parameter q is required' }, 400);
  }
  const results = searchStudents(q);
  return c.json(results);
});

// GET /students/:ine
router.get('/students/:ine', (c) => {
  const ine = c.req.param('ine');
  if (!ine || !/^INE\d{8}$/.test(ine)) {
    return c.json({ error: 'Invalid INE' }, 400);
  }
  const student = getStudentById(ine);
  if (!student) {
    return c.json({ error: 'Student not found' }, 404);
  }
  return c.json(student);
});

// POST /students
router.post('/students', async (c) => {
  const body = await c.req.json();
  const { firstName, lastName, email, grade, field } = body;

  // Check required fields
  if (!firstName || !lastName || !email || grade === undefined || !field) {
    return c.json({ error: 'All fields are required' }, 400);
  }

  // Validate
  try {
    studentSchema.parse({ ine: 'INE00000001', firstName, lastName, email, grade, field });
  } catch (e) {
    return c.json({ error: 'Validation error', details: e.errors }, 400);
  }

  // Check unique email
  const existing = getAllStudents().find(s => s.email === email);
  if (existing) {
    return c.json({ error: 'Email already exists' }, 409);
  }

  const newStudent = addStudent({ firstName, lastName, email, grade, field });
  return c.json(newStudent, 201);
});

// PUT /students/:ine
router.put('/students/:ine', async (c) => {
  const ine = c.req.param('ine');
  if (!ine || !/^INE\d{8}$/.test(ine)) {
    return c.json({ error: 'Invalid INE' }, 400);
  }
  const body = await c.req.json();
  const updates = body;

  // Récupérer l'étudiant existant
  const existingStudent = getAllStudents().find(s => s.ine === ine);
  if (!existingStudent) {
    return c.json({ error: 'Student not found' }, 404);
  }

  // Merge ancien + nouveau
  const merged = { ...existingStudent, ...updates };

  try {
    studentSchema.parse(merged);
  } catch (e) {
    return c.json({ error: 'Validation error', details: e.errors }, 400);
  }

  // Vérifier email unique (si modifié)
  if (updates.email) {
    const emailExists = getAllStudents().find(
      s => s.email === updates.email && s.ine !== ine
    );
    if (emailExists) {
      return c.json({ error: 'Email already exists' }, 409);
    }
  }

  const updated = updateStudent(ine, updates);
  return c.json(updated);
});

// DELETE /students/:ine
router.delete('/students/:ine', (c) => {
  const ine = c.req.param('ine');
  if (!ine || !/^INE\d{8}$/.test(ine)) {
    return c.json({ error: 'Invalid INE' }, 400);
  }
  const deleted = deleteStudent(ine);
  if (!deleted) {
    return c.json({ error: 'Student not found' }, 404);
  }
  return c.json({ message: 'Student deleted' });
});

export default router;