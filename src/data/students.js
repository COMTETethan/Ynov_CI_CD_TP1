// Since ES module, use import

// But for simplicity, define schema with zod.

import { z } from 'zod';

const studentSchema = z.object({
  id: z.number().int().positive(),
  firstName: z.string().min(2),
  lastName: z.string().min(2),
  email: z.string().email(),
  grade: z.number().min(0).max(20),
  field: z.enum(['informatique', 'mathématiques', 'physique', 'chimie']),
});

let students = [
  {
    id: 1,
    firstName: 'Alice',
    lastName: 'Dupont',
    email: 'alice.dupont@example.com',
    grade: 15.5,
    field: 'informatique',
  },
  {
    id: 2,
    firstName: 'Bob',
    lastName: 'Martin',
    email: 'bob.martin@example.com',
    grade: 12.0,
    field: 'mathématiques',
  },
  {
    id: 3,
    firstName: 'Charlie',
    lastName: 'Durand',
    email: 'charlie.durand@example.com',
    grade: 18.2,
    field: 'physique',
  },
  {
    id: 4,
    firstName: 'Diana',
    lastName: 'Leroy',
    email: 'diana.leroy@example.com',
    grade: 10.5,
    field: 'chimie',
  },
  {
    id: 5,
    firstName: 'Eve',
    lastName: 'Moreau',
    email: 'eve.moreau@example.com',
    grade: 16.8,
    field: 'informatique',
  },
];

let nextId = 6;

export function resetStudents() {
  students = [
    {
      id: 1,
      firstName: 'Alice',
      lastName: 'Dupont',
      email: 'alice.dupont@example.com',
      grade: 15.5,
      field: 'informatique',
    },
    {
      id: 2,
      firstName: 'Bob',
      lastName: 'Martin',
      email: 'bob.martin@example.com',
      grade: 12.0,
      field: 'mathématiques',
    },
    {
      id: 3,
      firstName: 'Charlie',
      lastName: 'Durand',
      email: 'charlie.durand@example.com',
      grade: 18.2,
      field: 'physique',
    },
    {
      id: 4,
      firstName: 'Diana',
      lastName: 'Leroy',
      email: 'diana.leroy@example.com',
      grade: 10.5,
      field: 'chimie',
    },
    {
      id: 5,
      firstName: 'Eve',
      lastName: 'Moreau',
      email: 'eve.moreau@example.com',
      grade: 16.8,
      field: 'informatique',
    },
  ];
  nextId = 6;
}

export function getAllStudents() {
  return students;
}

export function getStudentById(id) {
  return students.find(s => s.id === id);
}

export function addStudent(studentData) {
  const newStudent = { ...studentData, id: nextId++ };
  students.push(newStudent);
  return newStudent;
}

export function updateStudent(id, updateData) {
  const index = students.findIndex(s => s.id === id);
  if (index === -1) return null;
  students[index] = { ...students[index], ...updateData };
  return students[index];
}

export function deleteStudent(id) {
  const index = students.findIndex(s => s.id === id);
  if (index === -1) return false;
  students.splice(index, 1);
  return true;
}

export function getStudentsStats() {
  const totalStudents = students.length;
  const averageGrade = totalStudents > 0 ? students.reduce((sum, s) => sum + s.grade, 0) / totalStudents : 0;
  const studentsByField = students.reduce((acc, s) => {
    acc[s.field] = (acc[s.field] || 0) + 1;
    return acc;
  }, {});
  const bestStudent = students.reduce((best, s) => s.grade > best.grade ? s : best, students[0] || null);
  return {
    totalStudents,
    averageGrade: Math.round(averageGrade * 100) / 100,
    studentsByField,
    bestStudent,
  };
}

export function searchStudents(query) {
  const lowerQuery = query.toLowerCase();
  return students.filter(s =>
    s.firstName.toLowerCase().includes(lowerQuery) ||
    s.lastName.toLowerCase().includes(lowerQuery)
  );
}

export { studentSchema };