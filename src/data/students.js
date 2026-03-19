import { z } from 'zod';

const studentSchema = z.object({
  ine: z.string().length(11),
  firstName: z.string().min(2),
  lastName: z.string().min(2),
  email: z.email(),
  grade: z.number().min(0).max(20),
  field: z.enum([
    'informatique',
    'mathématiques',
    'physique',
    'chimie',
    'français',
    'sport',
    'histoire',
    'géographie',
    'philosophie',
    'économie',
    'biologie',
    'musique',
    'arts-plastiques',
  ]),
});

function formatIne(number) {
  return `INE${String(number).padStart(8, '0')}`;
}

let nextIne = 21;

let students = [
  {
    ine: 'INE00000001',
    firstName: 'Alice',
    lastName: 'Dupont',
    email: 'alice.dupont@example.com',
    grade: 15.5,
    field: 'informatique',
  },
  {
    ine: 'INE00000002',
    firstName: 'Bob',
    lastName: 'Martin',
    email: 'bob.martin@example.com',
    grade: 12.0,
    field: 'mathématiques',
  },
  {
    ine: 'INE00000003',
    firstName: 'Charlie',
    lastName: 'Durand',
    email: 'charlie.durand@example.com',
    grade: 18.2,
    field: 'physique',
  },
  {
    ine: 'INE00000004',
    firstName: 'Diana',
    lastName: 'Leroy',
    email: 'diana.leroy@example.com',
    grade: 10.5,
    field: 'chimie',
  },
  {
    ine: 'INE00000005',
    firstName: 'Eve',
    lastName: 'Moreau',
    email: 'eve.moreau@example.com',
    grade: 16.8,
    field: 'informatique',
  },
  {
    ine: 'INE00000006',
    firstName: 'François',
    lastName: 'Petit',
    email: 'francois.petit@example.com',
    grade: 13.4,
    field: 'français',
  },
  {
    ine: 'INE00000007',
    firstName: 'Gisèle',
    lastName: 'Robert',
    email: 'gisele.robert@example.com',
    grade: 14.7,
    field: 'histoire',
  },
  {
    ine: 'INE00000008',
    firstName: 'Hugo',
    lastName: 'Lambert',
    email: 'hugo.lambert@example.com',
    grade: 11.9,
    field: 'géographie',
  },
  {
    ine: 'INE00000009',
    firstName: 'Isabelle',
    lastName: 'Rousseau',
    email: 'isabelle.rousseau@example.com',
    grade: 17.2,
    field: 'philosophie',
  },
  {
    ine: 'INE00000010',
    firstName: 'Julien',
    lastName: 'Mercier',
    email: 'julien.mercier@example.com',
    grade: 14.1,
    field: 'économie',
  },
  {
    ine: 'INE00000011',
    firstName: 'Karine',
    lastName: 'Faure',
    email: 'karine.faure@example.com',
    grade: 15.0,
    field: 'biologie',
  },
  {
    ine: 'INE00000012',
    firstName: 'Laurent',
    lastName: 'Morel',
    email: 'laurent.morel@example.com',
    grade: 12.8,
    field: 'musique',
  },
  {
    ine: 'INE00000013',
    firstName: 'Mélanie',
    lastName: 'Durant',
    email: 'melanie.durant@example.com',
    grade: 16.3,
    field: 'arts-plastiques',
  },
  {
    ine: 'INE00000014',
    firstName: 'Nicolas',
    lastName: 'Perrin',
    email: 'nicolas.perrin@example.com',
    grade: 13.9,
    field: 'sport',
  },
  {
    ine: 'INE00000015',
    firstName: 'Océane',
    lastName: 'Lemaire',
    email: 'oceane.lemaire@example.com',
    grade: 14.6,
    field: 'mathématiques',
  },
  {
    ine: 'INE00000016',
    firstName: 'Paul',
    lastName: 'Renaud',
    email: 'paul.renaud@example.com',
    grade: 11.7,
    field: 'physique',
  },
  {
    ine: 'INE00000017',
    firstName: 'Quentin',
    lastName: 'Garnier',
    email: 'quentin.garnier@example.com',
    grade: 17.5,
    field: 'chimie',
  },
  {
    ine: 'INE00000018',
    firstName: 'Romain',
    lastName: 'Blanc',
    email: 'romain.blanc@example.com',
    grade: 13.2,
    field: 'informatique',
  },
  {
    ine: 'INE00000019',
    firstName: 'Sophie',
    lastName: 'Bouchet',
    email: 'sophie.bouchet@example.com',
    grade: 15.9,
    field: 'économie',
  },
  {
    ine: 'INE00000020',
    firstName: 'Théo',
    lastName: 'Cardinal',
    email: 'theo.cardinal@example.com',
    grade: 12.3,
    field: 'biologie',
  },
];

export function resetStudents() {
  students = [
    {
      ine: 'INE00000001',
      firstName: 'Alice',
      lastName: 'Dupont',
      email: 'alice.dupont@example.com',
      grade: 15.5,
      field: 'informatique',
    },
    {
      ine: 'INE00000002',
      firstName: 'Bob',
      lastName: 'Martin',
      email: 'bob.martin@example.com',
      grade: 12.0,
      field: 'mathématiques',
    },
    {
      ine: 'INE00000003',
      firstName: 'Charlie',
      lastName: 'Durand',
      email: 'charlie.durand@example.com',
      grade: 18.2,
      field: 'physique',
    },
    {
      ine: 'INE00000004',
      firstName: 'Diana',
      lastName: 'Leroy',
      email: 'diana.leroy@example.com',
      grade: 10.5,
      field: 'chimie',
    },
    {
      ine: 'INE00000005',
      firstName: 'Eve',
      lastName: 'Moreau',
      email: 'eve.moreau@example.com',
      grade: 16.8,
      field: 'informatique',
    },
    {
      ine: 'INE00000006',
      firstName: 'François',
      lastName: 'Petit',
      email: 'francois.petit@example.com',
      grade: 13.4,
      field: 'français',
    },
    {
      ine: 'INE00000007',
      firstName: 'Gisèle',
      lastName: 'Robert',
      email: 'gisele.robert@example.com',
      grade: 14.7,
      field: 'histoire',
    },
    {
      ine: 'INE00000008',
      firstName: 'Hugo',
      lastName: 'Lambert',
      email: 'hugo.lambert@example.com',
      grade: 11.9,
      field: 'géographie',
    },
    {
      ine: 'INE00000009',
      firstName: 'Isabelle',
      lastName: 'Rousseau',
      email: 'isabelle.rousseau@example.com',
      grade: 17.2,
      field: 'philosophie',
    },
    {
      ine: 'INE00000010',
      firstName: 'Julien',
      lastName: 'Mercier',
      email: 'julien.mercier@example.com',
      grade: 14.1,
      field: 'économie',
    },
    {
      ine: 'INE00000011',
      firstName: 'Karine',
      lastName: 'Faure',
      email: 'karine.faure@example.com',
      grade: 15.0,
      field: 'biologie',
    },
    {
      ine: 'INE00000012',
      firstName: 'Laurent',
      lastName: 'Morel',
      email: 'laurent.morel@example.com',
      grade: 12.8,
      field: 'musique',
    },
    {
      ine: 'INE00000013',
      firstName: 'Mélanie',
      lastName: 'Durant',
      email: 'melanie.durant@example.com',
      grade: 16.3,
      field: 'arts-plastiques',
    },
    {
      ine: 'INE00000014',
      firstName: 'Nicolas',
      lastName: 'Perrin',
      email: 'nicolas.perrin@example.com',
      grade: 13.9,
      field: 'sport',
    },
    {
      ine: 'INE00000015',
      firstName: 'Océane',
      lastName: 'Lemaire',
      email: 'oceane.lemaire@example.com',
      grade: 14.6,
      field: 'mathématiques',
    },
    {
      ine: 'INE00000016',
      firstName: 'Paul',
      lastName: 'Renaud',
      email: 'paul.renaud@example.com',
      grade: 11.7,
      field: 'physique',
    },
    {
      ine: 'INE00000017',
      firstName: 'Quentin',
      lastName: 'Garnier',
      email: 'quentin.garnier@example.com',
      grade: 17.5,
      field: 'chimie',
    },
    {
      ine: 'INE00000018',
      firstName: 'Romain',
      lastName: 'Blanc',
      email: 'romain.blanc@example.com',
      grade: 13.2,
      field: 'informatique',
    },
    {
      ine: 'INE00000019',
      firstName: 'Sophie',
      lastName: 'Bouchet',
      email: 'sophie.bouchet@example.com',
      grade: 15.9,
      field: 'économie',
    },
    {
      ine: 'INE00000020',
      firstName: 'Théo',
      lastName: 'Cardinal',
      email: 'theo.cardinal@example.com',
      grade: 12.3,
      field: 'biologie',
    },
  ];
  nextIne = 21;
}

export function getAllStudents() {
  return students;
}

export function getStudentById(ine) {
  return students.find(s => s.ine === ine);
}

export function addStudent(studentData) {
  const newStudent = { ...studentData, ine: formatIne(nextIne++) };
  students.push(newStudent);
  return newStudent;
}

export function updateStudent(ine, updateData) {
  const index = students.findIndex(s => s.ine === ine);
  if (index === -1) return null;
  students[index] = { ...students[index], ...updateData };
  return students[index];
}

export function deleteStudent(ine) {
  const index = students.findIndex(s => s.ine === ine);
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