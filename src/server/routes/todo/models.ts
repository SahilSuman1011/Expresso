import {z} from 'zod';

export const todoModel = z.object({
    id: z.string().describe('UUID of the todo'),
    title: z.string().describe('Title of the todo'),
    description: z.string().optional().nullable().describe('Description of the todo'),
    isCompleted: z.boolean().optional().default(false).describe('If the todo is completed or not'),
})

export type Todo = z.infer<typeof todoModel>

export const getAllTodosOutputModel = z.object({
    todos: z.array(todoModel)
})

export const getTodoByIdInputModel = z.object({
    todoId: z.string().describe('UUID of the todo')
})

export const getTodoByIdOutputModel = z.object({
    todo: todoModel
})

export const createTodoInputModel = z.object({
    title: z.string().min(1).describe('Title of the todo'),
    description: z.string().optional().nullable().describe('Description of the todo')
})

export const createTodoOutputModel = z.object({
    status: z.number().int().describe('HTTP status code'),
    todo: todoModel
})

export const updateTodoInputModel = z.object({
    todoId: z.string().describe('UUID of the todo'),
    title: z.string().min(1).optional().describe('Updated title of the todo'),
    description: z.string().optional().nullable().describe('Updated description of the todo'),
    isCompleted: z.boolean().optional().describe('Updated completion state')
})

export const updateTodoOutputModel = z.object({
    todo: todoModel
})

export const deleteTodoInputModel = z.object({
    todoId: z.string().describe('UUID of the todo')
})

export const deleteTodoOutputModel = z.object({
    status: z.number().int().describe('HTTP status code'),
    todo: todoModel
})