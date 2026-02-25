# Contract Driven API Development

> First write the contract: define and identify the requirements before implementation

## API Endpoints

### `/todos`

#### GET

- **Description:** Returns all the todos
- **Response Type:** JSON
- **Response Structure:**
  ```json
  {
    "todos": Todo[]
  }
  ```

#### POST

- **Description:** Create a new TODO
- **Request Body:**
  ```json
  {
    "title": "string"
  }
  ```
- **Response Structure:**
  ```json
  {
    "status": 201
  }
  ```

### `/todos/{todoId}`

#### Parameters

- `todoId` - The unique identifier of the todo

## Data Types

### Todo

```typescript
{
  id: string;
  title: string;
  isCompleted: boolean;
}
```

## Architecture Notes

We write procedures (functions) in tRPC using the tRPC client. Then, we wrap these procedures in `trpc-openapi` to have an API layer on top. Finally, we expose all this through an Express app.

```
tRPC Procedures → trpc-openapi → Express App
```
