import User from './models/user';
import Driver from './models/driver';
import Restaurant from './models/restaurant';
import ReceiverDetails from './models/receiverdetails';
import Transaction from './models/usertransactions';
import Address from './models/address';
import ServiceType from './models/servicetype';
import Booking from './models/booking';
import DriverDocs from './models/driver_documents';
import RideRequest from './models/riderequest';
async function init() {
    const isDev = true;

    await User.sync({ alter: isDev });
    await Driver.sync({ alter: isDev });
    await Restaurant.sync({ alter: isDev});
    await ReceiverDetails.sync({ alter: isDev});
    await Transaction.sync({ alter: isDev});
    await Address.sync({ alter: isDev});
    await ServiceType.sync({ alter: isDev});
    await Booking.sync({ alter: isDev});
    await DriverDocs.sync({ alter: isDev});
    await RideRequest.sync({ alter: isDev});
}

const dbInit = async () => {
    try {
        await init();
        console.log('Database initialized successfully');
    } catch (error) {
        console.error('Error initializing the database:', error);
    }
};

export default dbInit;
