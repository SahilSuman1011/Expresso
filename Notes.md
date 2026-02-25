// Contract Driven API Development
=> First write the contract like define and identify the
requirements first
// Requirements:

/todos (this is contract)
.GET
Desc: Returns all the todos
Response Type: JSON
Response Structure: {todos: Todo[]}

// making post request to TODO
POST
Desc: Create a new TODO
Request Body: {title: String}
Response Structure: {status: 201}

/todos/{todoId}

TODO(Type)
ID: String
Title: String
isCompleted: bool
