import express from 'express';
import * as trpcExpress from '@trpc/server/adapters/express';
import { createContext } from './server/context';
import { appRouter } from './server';
import { generateOpenApiDocument, createOpenApiExpressMiddleware } from 'trpc-to-openapi';
import { create } from 'node:domain';

const app = express();

app.use(express.json());

const openapiDocument = generateOpenApiDocument(appRouter, {
    baseUrl: 'http://localhost:8000/api',
    title: 'Expresso API',
    version: '1.0.0',
})

app.get('/', (req, res) => {
    return res.json({status: 'Server is up and running'})
})

app.get('/openapi.json', (req, res) => {
    return res.json(openapiDocument);
})

app.use('/api', createOpenApiExpressMiddleware({
    router: appRouter,
    createContext,
}))

app.use(
    '/trpc',
    trpcExpress.createExpressMiddleware({
        router: appRouter,
        createContext,
        })
);

app.listen(8000, () => console.log(`Express server is running on PORT 8000`));
