import {router} from './trpc';
import {todoRouter} from './routes/todo/todo.routes';

// Root Router
export const appRouter = router({
    todo: todoRouter
});

export type AppRouter = typeof appRouter;