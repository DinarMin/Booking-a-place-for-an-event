import express from "express";
import bookingRoutes from "./routes/bookingRoutes";
import eventRoutes from "./routes/eventRoutes";
import getTablesRoutes from "./routes/getTablesRoutes";
import { initDB } from "./db/postgres";

const app = express();

app.listen(3000, async () => {
  await initDB();
  console.log(" Сервер запущен http://localhost:3000");
});

app.use(express.json());

app.use("/api/bookings", bookingRoutes);
app.use("/api/events", eventRoutes);
app.use("/api/get", getTablesRoutes);

