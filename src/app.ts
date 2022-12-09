import cors from 'cors';
import express from 'express'
import healthRouter from './routes/health';
import restaurantRouter from './routes/RestaurantRoutes';
import userRouter from './routes/UserRoutes';
import authRouter from './routes/AuthRoutes';
import cookieParser from "cookie-parser"

const corsConfig = {
    origin: true,
    credentials: true,
  };

const application = () => {

    const app = express();

    app.use(express.json());
    
    app.use(express.urlencoded());
    
    app.use(cookieParser());

    app.use(cors(corsConfig));

    app.use(healthRouter);

    app.use(restaurantRouter);
    
    app.use(userRouter);

    app.use(authRouter);

    app.listen(process.env.PORT, () => {
        console.log(`Listening on port ${process.env.PORT}`);
    })
}

export default application;