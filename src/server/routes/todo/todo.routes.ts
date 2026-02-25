import { TRPCError } from '@trpc/server';
import { randomUUID } from 'node:crypto';
import { router, publicProcedure } from '../../trpc';
import { z } from 'zod';
import {
    createTodoInputModel,
    createTodoOutputModel,
    deleteTodoInputModel,
    deleteTodoOutputModel,
    getAllTodosOutputModel,
    getTodoByIdInputModel,
    getTodoByIdOutputModel,
    Todo,
    updateTodoInputModel,
    updateTodoOutputModel
} from './models';

const TODOS: Todo[] = [
    { id: '1', isCompleted: false, title: 'First Todo', description: 'This is the first todo' }
];

const findTodoIndex = (todoId: string) => TODOS.findIndex((todo) => todo.id === todoId);

export const todoRouter = router({
    getAllTodos : publicProcedure
    .meta({
        openapi: {
            method: 'GET',
            path: '/todos',
            tags: ['Todo'],
            description: 'Get all todos',
        }
    })
    .input(z.undefined())
    .output(getAllTodosOutputModel)
    .query(() => {
        return {
            todos: TODOS
        }
    }),
    getTodoById: publicProcedure
    .meta({
        openapi: {
            method: 'GET',
            path: '/todos/{todoId}',
            tags: ['Todo'],
            description: 'Get a todo by id',
        }
    })
    .input(getTodoByIdInputModel)
    .output(getTodoByIdOutputModel)
    .query(({ input }) => {
        const todo = TODOS.find((item) => item.id === input.todoId);
        if (!todo) {
            throw new TRPCError({
                code: 'NOT_FOUND',
                message: 'Todo not found'
            });
        }
        return { todo };
    }),
    createTodo: publicProcedure
    .meta({
        openapi: {
            method: 'POST',
            path: '/todos',
            tags: ['Todo'],
            description: 'Create a new todo',
        }
    })
    .input(createTodoInputModel)
    .output(createTodoOutputModel)
    .mutation(({ input }) => {
        const todo: Todo = {
            id: randomUUID(),
            title: input.title,
            description: input.description ?? null,
            isCompleted: false
        };
        TODOS.push(todo);
        return {
            status: 201,
            todo
        };
    }),
    updateTodo: publicProcedure
    .meta({
        openapi: {
            method: 'PATCH',
            path: '/todos/{todoId}',
            tags: ['Todo'],
            description: 'Update a todo',
        }
    })
    .input(updateTodoInputModel)
    .output(updateTodoOutputModel)
    .mutation(({ input }) => {
        if (
            input.title === undefined &&
            input.description === undefined &&
            input.isCompleted === undefined
        ) {
            throw new TRPCError({
                code: 'BAD_REQUEST',
                message: 'At least one field must be provided'
            });
        }
        const todoIndex = findTodoIndex(input.todoId);
        if (todoIndex < 0) {
            throw new TRPCError({
                code: 'NOT_FOUND',
                message: 'Todo not found'
            });
        }
        const currentTodo = TODOS[todoIndex];
        const updatedTodo: Todo = {
            ...currentTodo,
            title: input.title ?? currentTodo.title,
            description: input.description !== undefined ? input.description : currentTodo.description,
            isCompleted: input.isCompleted ?? currentTodo.isCompleted
        };
        TODOS[todoIndex] = updatedTodo;
        return { todo: updatedTodo };
    }),
    deleteTodo: publicProcedure
    .meta({
        openapi: {
            method: 'DELETE',
            path: '/todos/{todoId}',
            tags: ['Todo'],
            description: 'Delete a todo',
        }
    })
    .input(deleteTodoInputModel)
    .output(deleteTodoOutputModel)
    .mutation(({ input }) => {
        const todoIndex = findTodoIndex(input.todoId);
        if (todoIndex < 0) {
            throw new TRPCError({
                code: 'NOT_FOUND',
                message: 'Todo not found'
            });
        }
        const [todo] = TODOS.splice(todoIndex, 1);
        return {
            status: 200,
            todo
        };
    })
}); 