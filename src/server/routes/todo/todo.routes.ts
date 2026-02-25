import { router, publicProcedure } from '../../trpc';
import {z} from 'zod';
import { getAllTodosOutputModel, Todo } from './models';

const TODOS : Todo[] = [{id: '1', isCompleted: false, title: 'First Todo', description: 'This is the first todo'}]

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
    })
}); 