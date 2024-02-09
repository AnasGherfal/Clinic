import { Request, Response, NextFunction } from "express";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  getDoc,
  setDoc,
} from "firebase/firestore";
import firebase from ".././db";
import { getDatabase, ref, get, child, set } from "firebase/database";
import { v4 as uuidv4 } from "uuid";
import Appointment from "../models/appointment";
import { db } from "../config/firebase-config";

const realtimeDatabase = getDatabase(firebase);
const firestore = getFirestore(firebase);

export const createAppointment = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { title, start, end } = req.body;

    // Check for any existing appointments that overlap with the new appointment
    const overlappingAppointmentsRef = db
      .ref("appointments")
      .orderByChild("start")
      .endAt(end) // Ends at or before the new appointment end time
      .startAt(start); // Starts at or after the new appointment start time
    const overlappingAppointmentsSnapshot =
      await overlappingAppointmentsRef.once("value");
    const overlappingAppointments = overlappingAppointmentsSnapshot.val();

    if (overlappingAppointments) {
      // Loop through overlapping appointments to check for exact overlaps
      const isExactOverlap = Object.values(overlappingAppointments).some(
        (appointment: any) => {
          const appointmentStart = appointment.start;
          const appointmentEnd = appointment.end;
          return (
            (appointmentStart >= start && appointmentStart < end) ||
            (appointmentEnd > start && appointmentEnd <= end)
          );
        }
      );

      if (isExactOverlap) {
        res.status(403).send("An appointment already exists at this time");
        return;
      }
    }

    // If no exact overlapping appointments found, create the new appointment
    const appointmentRef = db.ref("appointments").push();
    await appointmentRef.set({
      title,
      start,
      end,
      bookedBy: "", // Initially no user is booked
      available: true, // Initially available for booking
    });
    res.status(201).send(`Appointment created with ID: ${appointmentRef.key}`);
  } catch (error: any) {
    res.status(400).send(error.message);
  }
};

// Function to schedule an appointment for a user
export const scheduleAppointment = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { appointmentId, userId } = req.body;

    const appointmentRef = db.ref(`appointments/${appointmentId}`);
    const appointmentSnapshot = await appointmentRef.once("value");
    const appointmentData = appointmentSnapshot.val();
    if (!appointmentData) {
      res.status(404).send("Appointment not found");
      return;
    }

    if (!appointmentData.available) {
      res.status(403).send("Appointment is already booked");
      return;
    }

    // Check if user already has an appointment
    const userAppointmentsRef = db
      .ref("appointments")
      .orderByChild("bookedBy")
      .equalTo(userId);
    const userAppointmentsSnapshot = await userAppointmentsRef.once("value");
    if (userAppointmentsSnapshot.exists()) {
      res.status(403).send("User already has an appointment");
      return;
    }

    await appointmentRef.update({
      bookedBy: userId,
      available: false,
    });

    res.status(200).send("Appointment scheduled successfully");
  } catch (error: any) {
    res.status(400).send(error.message);
  }
};

// Function to get an appointment by ID
export const getAppointmentById = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const appointmentId = req.params.appointmentId;
    const appointmentSnapshot = await db
      .ref(`appointments/${appointmentId}`)
      .once("value");
    const appointmentData = appointmentSnapshot.val();

    if (!appointmentData) {
      res.status(404).send("Appointment not found");
      return;
    }

    res.status(200).send(appointmentData);
  } catch (error: any) {
    res.status(400).send(error.message);
  }
};

// Function to cancel an appointment
export const cancelAppointment = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const appointmentId = req.params.appointmentId;
    const userId = req.params.userId;

    const appointmentRef = db.ref(`appointments/${appointmentId}`);
    const appointmentSnapshot = await appointmentRef.once("value");
    const appointmentData = appointmentSnapshot.val();

    if (!appointmentData) {
      res.status(404).send("Appointment not found");
      return;
    }

    if (appointmentData.bookedBy !== userId) {
      res.status(403).send("You are not authorized to cancel this appointment");
      return;
    }

    // If the appointment is booked by the user, proceed with cancellation
    await appointmentRef.update({
      bookedBy: null,
      available: true,
    });

    res.status(200).send("Appointment canceled successfully");
  } catch (error: any) {
    res.status(400).send(error.message);
  }
};

// Function to get all appointments
// Modify backend to listen for real-time updates
export const getAllAppointments = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const appointmentsRef = db.ref("appointments");

    // Listen for real-time updates
    appointmentsRef.on("value", (snapshot) => {
      const appointmentsData = snapshot.val();
      if (!appointmentsData) {
        res.status(404).send("No appointments found");
        return;
      }

      const appointments = Object.keys(appointmentsData).map((key) => ({
        id: key,
        ...appointmentsData[key],
      }));

      res.status(200).send(appointments);
    });
  } catch (error: any) {
    res.status(400).send(error.message);
  }
};

// Function to delete an appointment
export const deleteAppointment = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const appointmentId = req.params.appointmentId;
    await db.ref(`appointments/${appointmentId}`).remove();
    res.status(200).send("Appointment deleted successfully");
  } catch (error: any) {
    res.status(400).send(error.message);
  }
};
