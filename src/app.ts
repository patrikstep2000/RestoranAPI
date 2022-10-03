import express from 'express'
import healthRouter from './routes/health';

const application = () => {

    const app = express();

    app.use(healthRouter);

    app.listen(process.env.PORT, () => {
        console.log(`Listening on port ${process.env.PORT}`);
    })
}

export default application;