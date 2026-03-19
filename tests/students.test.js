import { describe, it, expect, beforeEach } from 'vitest';
import { testClient } from 'hono/testing';
import app from '../src/app.js';
import { resetStudents } from '../src/data/students.js';

const client = testClient(app);

beforeEach(() => {
  resetStudents();
});

describe('GET /students', () => {
  it('should return 200 and an array', async () => {
    const res = await client.students.$get();
    expect(res.status).toBe(200);
    const data = await res.json();
    expect(Array.isArray(data)).toBe(true);
  });

  it('should return all initial students', async () => {
    const res = await client.students.$get();
    const data = await res.json();
    expect(data.length).toBe(5);
    expect(data[0].firstName).toBe('Alice');
  });
});

describe('GET /students/:id', () => {
  it('should return student for valid id', async () => {
    const res = await client.students[':id'].$get({ param: { id: '1' } });
    expect(res.status).toBe(200);
    const data = await res.json();
    expect(data.id).toBe(1);
    expect(data.firstName).toBe('Alice');
  });

  it('should return 404 for non-existent id', async () => {
    const res = await client.students[':id'].$get({ param: { id: '999' } });
    expect(res.status).toBe(404);
  });

  it('should return 400 for invalid id', async () => {
    const res = await client.students[':id'].$get({ param: { id: 'abc' } });
    expect(res.status).toBe(400);
  });
});

describe('POST /students', () => {
  it('should create student with valid data', async () => {
    const newStudent = {
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      grade: 14.0,
      field: 'informatique',
    };
    const res = await client.students.$post({ json: newStudent });
    expect(res.status).toBe(201);
    const data = await res.json();
    expect(data.id).toBe(6);
    expect(data.firstName).toBe('John');
  });

  it('should return 400 for missing required field', async () => {
    const invalidStudent = {
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      // missing grade and field
    };
    const res = await client.students.$post({ json: invalidStudent });
    expect(res.status).toBe(400);
  });

  it('should return 400 for invalid grade', async () => {
    const invalidStudent = {
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      grade: 25,
      field: 'informatique',
    };
    const res = await client.students.$post({ json: invalidStudent });
    expect(res.status).toBe(400);
  });

  it('should return 409 for duplicate email', async () => {
    const duplicateStudent = {
      firstName: 'New',
      lastName: 'User',
      email: 'alice.dupont@example.com', // existing
      grade: 10,
      field: 'mathématiques',
    };
    const res = await client.students.$post({ json: duplicateStudent });
    expect(res.status).toBe(409);
  });
});

describe('PUT /students/:id', () => {
  it('should update student with valid data', async () => {
    const updateData = {
      firstName: 'Alice',
      lastName: 'Updated',
      email: 'alice.updated@example.com',
      grade: 16.0,
      field: 'informatique',
    };
    const res = await client.students[':id'].$put({ param: { id: '1' }, json: updateData });
    expect(res.status).toBe(200);
    const data = await res.json();
    expect(data.lastName).toBe('Updated');
  });

  it('should return 404 for non-existent id', async () => {
    const updateData = {
      firstName: 'Test',
      lastName: 'Test',
      email: 'test@example.com',
      grade: 10,
      field: 'physique',
    };
    const res = await client.students[':id'].$put({ param: { id: '999' }, json: updateData });
    expect(res.status).toBe(404);
  });
});

describe('DELETE /students/:id', () => {
  it('should delete student for valid id', async () => {
    const res = await client.students[':id'].$delete({ param: { id: '1' } });
    expect(res.status).toBe(200);
  });

  it('should return 404 for non-existent id', async () => {
    const res = await client.students[':id'].$delete({ param: { id: '999' } });
    expect(res.status).toBe(404);
  });
});

describe('GET /students/stats', () => {
  it('should return statistics', async () => {
    const res = await client.students.stats.$get();
    expect(res.status).toBe(200);
    const data = await res.json();
    expect(data).toHaveProperty('totalStudents', 5);
    expect(data).toHaveProperty('averageGrade');
    expect(data).toHaveProperty('studentsByField');
    expect(data).toHaveProperty('bestStudent');
  });
});

describe('GET /students/search', () => {
  it('should return search results', async () => {
    const res = await client.students.search.$get({ query: { q: 'Alice' } });
    expect(res.status).toBe(200);
    const data = await res.json();
    expect(data.length).toBe(1);
    expect(data[0].firstName).toBe('Alice');
  });

  it('should return 400 for missing query', async () => {
    const res = await client.students.search.$get();
    expect(res.status).toBe(400);
  });
});