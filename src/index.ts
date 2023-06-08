import express from 'express';
import 'dotenv/config';

const app = express();
const PORT = process.env.PORT || 5000;

app.get('/', (req: any, res: any) => {
    res.send('Express + TypeScript Server');
});

app.listen(PORT, () => {
    console.log(`[server]: Server is running at ${process.env.HOST}:${PORT}`)
});