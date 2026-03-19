import { Hono } from 'hono';
import { swaggerUI } from '@hono/swagger-ui';
import studentsRouter from './routes/students.js';

const app = new Hono();

// Swagger UI
app.get('/docs', swaggerUI({ url: '/openapi.json' }));

// OpenAPI spec
app.get('/openapi.json', (c) => {
  return c.json({
    openapi: '3.0.0',
    info: {
      title: 'Student Directory API',
      version: '1.0.0',
      description: 'API for managing students',
    },
    paths: {
      '/students': {
        get: {
          summary: 'Get all students',
          responses: {
            200: {
              description: 'List of students',
              content: {
                'application/json': {
                  schema: {
                    type: 'array',
                    items: { $ref: '#/components/schemas/Student' },
                  },
                },
              },
            },
          },
        },
        post: {
          summary: 'Create a new student',
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/StudentInput' },
              },
            },
          },
          responses: {
            201: {
              description: 'Student created',
              content: {
                'application/json': {
                  schema: { $ref: '#/components/schemas/Student' },
                },
              },
            },
            400: { description: 'Validation error' },
            409: { description: 'Email already exists' },
          },
        },
      },
      '/students/{ine}': {
        get: {
          summary: 'Get student by INE',
          parameters: [
            {
              name: 'ine',
              in: 'path',
              required: true,
              schema: { type: 'string', pattern: '^INE\\d{8}$' },
            },
          ],
          responses: {
            200: {
              description: 'Student data',
              content: {
                'application/json': {
                  schema: { $ref: '#/components/schemas/Student' },
                },
              },
            },
            400: { description: 'Invalid INE' },
            404: { description: 'Student not found' },
          },
        },
        put: {
          summary: 'Update student (partial updates allowed)',
          parameters: [
            {
              name: 'ine',
              in: 'path',
              required: true,
              schema: { type: 'string', pattern: '^INE\\d{8}$' },
            },
          ],
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/StudentUpdateInput' },
              },
            },
          },
          responses: {
            200: {
              description: 'Student updated',
              content: {
                'application/json': {
                  schema: { $ref: '#/components/schemas/Student' },
                },
              },
            },
            400: { description: 'Validation error' },
            404: { description: 'Student not found' },
            409: { description: 'Email already exists' },
          },
        },
        delete: {
          summary: 'Delete student',
          parameters: [
            {
              name: 'ine',
              in: 'path',
              required: true,
              schema: { type: 'string', pattern: '^INE\\d{8}$' },
            },
          ],
          responses: {
            200: { description: 'Student deleted' },
            404: { description: 'Student not found' },
          },
        },
      },
      '/students/stats': {
        get: {
          summary: 'Get students statistics',
          responses: {
            200: {
              description: 'Statistics',
              content: {
                'application/json': {
                  schema: { $ref: '#/components/schemas/Stats' },
                },
              },
            },
          },
        },
      },
      '/students/search': {
        get: {
          summary: 'Search students',
          parameters: [
            {
              name: 'q',
              in: 'query',
              required: true,
              schema: { type: 'string' },
            },
          ],
          responses: {
            200: {
              description: 'Search results',
              content: {
                'application/json': {
                  schema: {
                    type: 'array',
                    items: { $ref: '#/components/schemas/Student' },
                  },
                },
              },
            },
            400: { description: 'Missing query' },
          },
        },
      },
    },
    components: {
      schemas: {
        Student: {
          type: 'object',
          properties: {
            ine: {
              type: 'string',
              description: 'Identifiant National Étudiant (INE)',
              example: 'INE00000001',
            },
            firstName: { type: 'string' },
            lastName: { type: 'string' },
            email: { type: 'string', format: 'email' },
            grade: { type: 'number', minimum: 0, maximum: 20 },
            field: {
              type: 'string',
              enum: [
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
              ],
            },
          },
        },
        StudentInput: {
          type: 'object',
          required: ['firstName', 'lastName', 'email', 'grade', 'field'],
          properties: {
            firstName: { type: 'string', minLength: 2 },
            lastName: { type: 'string', minLength: 2 },
            email: { type: 'string', format: 'email' },
            grade: { type: 'number', minimum: 0, maximum: 20 },
            field: {
              type: 'string',
              enum: [
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
              ],
            },
          },
        },
        StudentUpdateInput: {
          type: 'object',
          properties: {
            firstName: { type: 'string', minLength: 2 },
            lastName: { type: 'string', minLength: 2 },
            email: { type: 'string', format: 'email' },
            grade: { type: 'number', minimum: 0, maximum: 20 },
            field: {
              type: 'string',
              enum: [
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
              ],
            },
          },
        },
        Stats: {
          type: 'object',
          properties: {
            totalStudents: { type: 'integer' },
            averageGrade: { type: 'number' },
            studentsByField: {
              type: 'object',
              additionalProperties: { type: 'integer' },
            },
            bestStudent: { $ref: '#/components/schemas/Student' },
          },
        },
      },
    },
  });
});

app.route('/', studentsRouter);

export default app;
