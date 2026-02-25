# Contract Driven API Development

> First write the contract: define and identify the requirements before implementation.

This README documents the contract and the implemented API. The contract is now fully implemented.

## Implementation Status

- **Complete** - all endpoints in the contract are implemented.
- OpenAPI document available at **GET** `/openapi.json`.
- tRPC procedures are available under `/trpc/todo.*`.

## API Contract

### `/todos`

#### GET

- **Description:** Returns all the todos.
- **Response Type:** JSON.
- **Response Structure:**
  ```json
  {
    "todos": [
      {
        "id": "string",
        "title": "string",
        "description": "string | null",
        "isCompleted": false
      }
    ]
  }
  ```

#### POST

- **Description:** Create a new todo.
- **Request Body:**
  ```json
  {
    "title": "string",
    "description": "string"
  }
  ```
- **Response Structure (suggested):**
  ```json
  {
    "status": 201,
    "todo": {
      "id": "string",
      "title": "string",
      "description": "string | null",
      "isCompleted": false
    }
  }
  ```

### `/todos/{todoId}`

#### Parameters

- `todoId` - The unique identifier of the todo.

#### GET

- **Description:** Returns a single todo.
- **Response Structure:**
  ```json
  {
    "todo": {
      "id": "string",
      "title": "string",
      "description": "string | null",
      "isCompleted": false
    }
  }
  ```

#### PATCH

- **Description:** Update fields on a todo.
- **Request Body:**
  ```json
  {
    "title": "string",
    "description": "string | null",
    "isCompleted": true
  }
  ```
- **Response Structure:**
  ```json
  {
    "todo": {
      "id": "string",
      "title": "string",
      "description": "string | null",
      "isCompleted": false
    }
  }
  ```

#### DELETE

- **Description:** Remove a todo.
- **Response Structure:**
  ```json
  {
    "status": 200,
    "todo": {
      "id": "string",
      "title": "string",
      "description": "string | null",
      "isCompleted": false
    }
  }
  ```

## Data Types

### Todo

```typescript
{
  id: string;
  title: string;
  description?: string | null;
  isCompleted?: boolean;
}
```

## Notes: Contract-Driven Approach

1. Define the contract first (paths, methods, request/response shapes).
2. Model input/output with Zod and keep the shapes consistent with the contract.
3. Implement tRPC procedures using those models.
4. Add OpenAPI metadata to each procedure.
5. Expose the OpenAPI document and the REST layer via `trpc-openapi`.
6. Serve everything through Express.

## Architecture Notes

We write procedures (functions) in tRPC. Then, we wrap these procedures with `trpc-openapi` to expose an HTTP API layer. Finally, we serve everything through an Express app.

```
tRPC Procedures -> trpc-openapi -> Express App
```

## Local Development

### Run

```bash
pnpm install
pnpm dev
```

### Useful Endpoints

- `GET http://localhost:8000/` - health check
- `GET http://localhost:8000/openapi.json` - OpenAPI document
- `GET http://localhost:8000/api/todos` - OpenAPI endpoint
- `POST http://localhost:8000/api/todos` - create todo
- `GET http://localhost:8000/api/todos/{todoId}` - get todo by id
- `PATCH http://localhost:8000/api/todos/{todoId}` - update todo
- `DELETE http://localhost:8000/api/todos/{todoId}` - delete todo
- `GET http://localhost:8000/trpc/todo.getAllTodos` - tRPC endpoint
- `GET http://localhost:8000/trpc/todo.getTodoById` - tRPC endpoint
- `POST http://localhost:8000/trpc/todo.createTodo` - tRPC endpoint
- `PATCH http://localhost:8000/trpc/todo.updateTodo` - tRPC endpoint
- `DELETE http://localhost:8000/trpc/todo.deleteTodo` - tRPC endpoint
