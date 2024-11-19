import authRoute from "./routes/auth.js"
import photoUploadRoute from "./routes/photosUploader.js"
import placesRoute from "./routes/place.js"
import bookingsRoute from "./routes/bookings.js"
import paymentRoute from "./routes/payments.js"
import { checkAuthCookie } from "./middlewares/auth.js";
import { connectDB } from "./database/connection.js";
export {
    connectDB,
    authRoute,
    photoUploadRoute,
    placesRoute,
    bookingsRoute,
    paymentRoute,
    checkAuthCookie
}
