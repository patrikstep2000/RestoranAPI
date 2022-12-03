import cors from 'cors';
import express from 'express'
import healthRouter from './routes/health';
import restaurantRouter from './routes/RestaurantRoutes';

const corsOption = {
    origin: "*",
};

const application = () => {

    const app = express();

    app.use(express.json());
    
    app.use(express.urlencoded());

    app.use(cors(corsOption));

    app.use(healthRouter);

    app.use(restaurantRouter);

    app.listen(process.env.PORT, () => {
        console.log(`Listening on port ${process.env.PORT}`);
    })
}

export default application;