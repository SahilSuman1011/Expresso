import express from 'express';

const app = express();

//routes
app.get('/', (req, res, next) => {
    res.json({message: "welcome to elib apis"});
});




export default app;