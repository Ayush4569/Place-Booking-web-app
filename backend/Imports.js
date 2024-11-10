import { connnectDB } from "./connection.js";
import authRoute from "./routes/auth.js"
import photoUploadRoute from "./routes/photosUploader.js"
import placesRoute from "./routes/place.js"
import bookingsRoute from "./routes/bookings.js"
import paymentRoute from "./routes/payments.js"
import { checkAuthCookie } from "./middlewares/auth.js";

export {
    connnectDB,
    authRoute,
    photoUploadRoute,
    placesRoute,
    bookingsRoute,
    paymentRoute,
    checkAuthCookie
}
