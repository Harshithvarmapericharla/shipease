import express from 'express';
import userRouter from './user.routes';  // Adjust the path as necessary
import driverRouter from './driver.routes';  // Adjust the path as necessary
import restaurantRouter from './restaurant.routes';
import receiverRoutes from './receiverdetails.routes'

const routes = express.Router();

// Use the imported routers for different paths
routes.use('/users', userRouter);
routes.use('/drivers', driverRouter);
routes.use('./restaurant',restaurantRouter);
routes.use('./receiverdetails',receiverRoutes)

export default routes;
