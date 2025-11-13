import express from "express";
import bookingRoutes from "./routes/bookingRoutes";

const app = express();

app.listen(3000, () => console.log(" Сервер запущен http://localhost:3000"))

app.use(express.json());

app.use("/api/bookings", bookingRoutes);
app.use("/api/events", eventRoutes);
