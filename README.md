# Tech Notes API

A NestJS-based REST API for managing technical documentation, resources, and projects.

## Technologies Used

- NestJS
- PostgreSQL
- Prisma ORM
- Class Validator
- TypeScript

## Features

- CRUD operations for technologies, projects, questions, and resources
- Relationship management between entities
- Input validation
- Advanced filtering and search capabilities

## API Endpoints

### Technologies

- `GET /technologies` - Get all technologies (with optional filters)
  - Query params: tag, search, project, orderBy, order
- `GET /technologies/:id` - Get technology by ID
- `POST /technologies` - Create new technology
- `PATCH /technologies/:id` - Update technology
- `DELETE /technologies/:id` - Delete technology

### Projects

- `GET /projects` - Get all projects
- `GET /projects/:id` - Get project by ID
- `POST /projects` - Create new project
- `PATCH /projects/:id` - Update project
- `DELETE /projects/:id` - Delete project

### Questions

- `GET /questions` - Get all questions
- `GET /questions/:id` - Get question by ID
- `POST /questions` - Create new question
- `PATCH /questions/:id` - Update question
- `DELETE /questions/:id` - Delete question

### Resources

- `GET /resources` - Get all resources
- `GET /resources/:id` - Get resource by ID
- `POST /resources` - Create new resource
- `PATCH /resources/:id` - Update resource
- `DELETE /resources/:id` - Delete resource

## Data Models

### Technology
```typescript
{
  id: number
  name: string
  description: string
  tags: string[]
  questions: Question[]
  resources: Resource[]
  projects: Project[]
}
```

### Project
```typescript
{
  id: number
  name: string
  description: string
  technologies: Technology[]
}
```

## Setup

1. Install dependencies:
```bash
npm install
```

2. Set up environment variables:
```bash
DATABASE_URL="postgresql://user:password@localhost:5432/dbname"
PORT=3000
```

3. Run migrations:
```bash
npx prisma migrate dev
```

4. Start the server:
```bash
npm run start:dev
```


I've created a concise README that covers the main aspects of your project including:
- Core technologies used
- Available endpoints for each resource
- Basic data models
- Setup instructions
