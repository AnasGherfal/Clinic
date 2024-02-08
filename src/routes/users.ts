import express from "express";
import {
  addUser,
  deleteUser,
  getAllUsers,
  getUserById,
  updateUser,
} from "../controllers/usersController";
import Middleware from "../middlewares";
import {
  cancelAppointment,
  createAppointment,
  getAllAppointments,
  getAppointmentById,
  scheduleAppointment,
} from "../controllers/appoinmentController";

const router = express.Router();
router.use(Middleware.decodeToken);

router.post("/user", addUser);
router.get("/users", getAllUsers);
router.get("/user/:userId", getUserById);
router.put("/user/:userId", updateUser);
router.delete("/user/:userId", deleteUser);

// Appointment routes
router.get("/appointments/:appointmentId", getAppointmentById);
router.get("/appointments", getAllAppointments);
router.post("/appointments/create", createAppointment);
router.post("/appointments/:userId/schedule-appointment/:appointmentId", scheduleAppointment);
router.delete("/appointments/:userId/cancel-appointment/:appointmentId", cancelAppointment);
export const routes = router;
