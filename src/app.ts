import express from "express";
import  dbInit  from "./db/init"; // Import the dbInit function
import userRoutes from "./db/routes/user.routes";
import driverRoutes from "./db/routes/driver.routes";
import restaurantRoutes from "./db/routes/restaurant.routes";
import receiverdetailsRoutes from "./db/routes/receiverdetails.routes";
import transactionRoutes from "./db/routes/usertransactions.routes";
import addressRoutes from "./db/routes/address.routes";
import servicetypeRoutes from "./db/routes/servicetype.routes";
import bookingRoutes from "./db/routes/booking.routes";
import driverdocsRoutes from "./db/routes/driver_documents.routes";
import riderequestRoutes from "./db/routes/riderequest.routes";

const port = 3009;

const app = express();

app.use(express.json());

// Initialize the database
dbInit();

app.use('/users', userRoutes);
app.use('/drivers', driverRoutes);
app.use('/restaurants',restaurantRoutes);
app.use('/recieverdetails',receiverdetailsRoutes);
app.use('./transactions',transactionRoutes);
app.use('/address',addressRoutes);
app.use('/servicetype', servicetypeRoutes);
app.use('/bookings',bookingRoutes);
app.use('/driverdocs',driverdocsRoutes);
app.use('/riderequest', riderequestRoutes);
app.get('/', (req, res) => {
    res.send("Hello, world!");
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
