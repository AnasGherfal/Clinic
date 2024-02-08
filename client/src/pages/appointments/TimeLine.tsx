import React, { useRef, useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent"; 
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useAuth } from "../../config/AuthContext";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import {
  cancelAppointment,
  scheduleAppointment,
  getAppointmentById,
  createAppointment,
} from "../../pages/appointments/appService";
import { renderTimeViewClock } from "@mui/x-date-pickers";
import { database } from "../../config/firebase-config";
import { ref, get, onValue } from "firebase/database";

interface Appointment {
  bookedBy: string;
  id: string;
  title: string;
  start: string | Date;
  end?: string | Date;
  available: boolean;
}

const FullCalendarTimeline: React.FC = () => {
  const calendarRef = useRef<FullCalendar>(null);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [openCreateDialog, setOpenCreateDialog] = useState(false);
  const [appointmentTitle, setAppointmentTitle] = useState("");
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [selectedAppointmentId, setSelectedAppointmentId] = useState<
    string | null
  >(null);
  const [selectedAppointmentAvailability, setSelectedAppointmentAvailability] =
    useState<boolean>(false);
  const [selectedBookedById, setSelectedBookedById] = useState<string | null>(
    null
  );
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [openEventDialog, setOpenEventDialog] = useState(false);
  const { currentUser } = useAuth();
  const [snackbarSeverity, setSnackbarSeverity] =
    useState<AlertProps["severity"]>("success");

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const appointmentsRef = ref(database, "appointments");
        const snapshot = await get(appointmentsRef);
        const appointmentsData: Appointment[] = [];
        snapshot.forEach((childSnapshot) => {
          const appointment = childSnapshot.val();
          appointmentsData.push({
            id: childSnapshot.key,
            title: appointment.title,
            start: appointment.start,
            end: appointment.end,
            bookedBy: appointment.bookedBy,
            available: appointment.available,
          });
        });
        setAppointments(appointmentsData);
      } catch (error) {
        setSnackbarSeverity("error");
        setSnackbarMessage(`${error}`);
        setOpenSnackbar(true);
      }
    };

    fetchAppointments();

    // Subscribe to real-time updates
    const appointmentsRef = ref(database, "appointments");
    const onDataChange = async (snapshot: any) => {
      const appointmentsData: Appointment[] = [];
      snapshot.forEach((childSnapshot: any) => {
        const appointment = childSnapshot.val();
        appointmentsData.push({
          id: childSnapshot.key,
          title: appointment.title,
          start: appointment.start,
          end: appointment.end,
          bookedBy: appointment.bookedBy,
          available: appointment.available,
        });
      });
      setAppointments(appointmentsData);
    };

    const handleDataChange = async () => {
      const snapshot = await get(appointmentsRef);
      onDataChange(snapshot);
    };

    handleDataChange();

    const unsubscribe = onValue(appointmentsRef, handleDataChange);

    // Unsubscribe from real-time updates when component unmounts
    return () => {
      unsubscribe();
    };
  }, []);

  const handleEventClick = async (arg: any) => {
    const { id } = arg.event;
    const appointment = appointments.find((app) => app.id === id);
    setSelectedAppointmentId(id);
    if (!appointment) return;
    setSelectedBookedById(appointment.bookedBy);
    setSelectedAppointmentAvailability(appointment.available);

    if (appointment.bookedBy === currentUser?.uid) {
      setOpenEventDialog(true);
      if (!appointment.available) {
      } else if (appointment.bookedBy === "") {
        setOpenEventDialog(true);
      }
    } else {
      try {
        await getAppointmentById(id);

        setOpenEventDialog(true);
      } catch (error) {
        console.error("Error fetching appointment details:", error);
      }
    }
  };

  const handleEventDialogClose = () => {
    setOpenEventDialog(false);
  };

  const handleCreateAppointment = () => {
    setOpenCreateDialog(true);
  };

  const handleCreateDialogClose = () => {
    setOpenCreateDialog(false);
  };

  const handleCreateAppointmentSubmit = async () => {
    try {
      await createAppointment({
        title: appointmentTitle,
        start: startDate,
        end: endDate,
      });

      setSnackbarMessage("Appointment created successfully!");
      setOpenSnackbar(true);
    } catch (error) {
      console.error("Error creating appointment:", error);
      setSnackbarSeverity("error");
      setSnackbarMessage("Error creating appointment.");
      setOpenSnackbar(true);
    }

    handleCreateDialogClose();
  };

  const handleScheduleAppointment = async (id: any) => {
    if (id) {
      try {
        await scheduleAppointment(currentUser?.uid || "", id, {
          userId: currentUser?.uid,
          appointmentId: id,
        });
        setOpenEventDialog(false);
        setSnackbarMessage("Appointment scheduled successfully!");
        setOpenSnackbar(true);
      } catch (error: any) {
        console.error("Error scheduling appointment:", error);
        setSnackbarSeverity("error");
        setSnackbarMessage(`${error.response.data}`);
        setOpenSnackbar(true);
      }
    }
  };

  const handleCancelAppointment = async (id: any) => {
    try {
      await cancelAppointment(
        currentUser?.uid || "",
        selectedAppointmentId || ""
      );
      setOpenEventDialog(false);
      setSnackbarMessage("Appointment canceled successfully!");
      setOpenSnackbar(true);
    } catch (error) {
      console.error("Error canceling appointment:", error);
      setSnackbarMessage("Error canceling appointment.");
      setOpenSnackbar(true);
    }
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };
  return (
    <Card>
      <CardContent>
        <Button
          variant="contained"
          sx={{ backgroundColor: "#2358ba" }}
          onClick={handleCreateAppointment}
        >
          Create Appointment
        </Button>
        <FullCalendar
          ref={calendarRef}
          plugins={[timeGridPlugin, dayGridPlugin]}
          initialView="timeGridFourDay"
          views={{
            timeGridFourDay: {
              type: "timeGrid",
              duration: { days: 7 },
              slotMinTime: "09:00:00",
              slotMaxTime: "16:00:00",
            },
          }}
          events={appointments.map((appointment) => ({
            id: appointment.id,
            title: appointment.title,
            start: appointment.start,
            end: appointment.end,
            bookedBy: appointment.bookedBy,
            allDay: false,
            backgroundColor: appointment.available
              ? "#3EB489" // Available appointments are green
              : appointment.bookedBy === currentUser?.uid
              ? "#2358ba" // Appointments booked by the signed-in user are blue
              : "#F24949", // Appointments booked by other users are red
          }))}
          eventClick={handleEventClick}
        />

        <Dialog open={openCreateDialog} onClose={handleCreateDialogClose}>
          <DialogContent>
            <TextField
              label="Appointment Title"
              variant="outlined"
              value={appointmentTitle}
              onChange={(e) => setAppointmentTitle(e.target.value)}
              fullWidth
              margin="normal"
            />
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DateTimePicker
                value={startDate}
                label="start Date"
                onChange={(newValue: Date | null) => setStartDate(newValue)}
                viewRenderers={{
                  hours: renderTimeViewClock,
                  minutes: renderTimeViewClock,
                }}
              />
              <DateTimePicker
                value={endDate}
                label="End Date"
                onChange={(newValue: Date | null) => setEndDate(newValue)}
                viewRenderers={{
                  hours: renderTimeViewClock,
                  minutes: renderTimeViewClock,
                }}
              />
            </LocalizationProvider>
            <Button
              variant="contained"
              onClick={handleCreateAppointmentSubmit}
              disabled={!appointmentTitle || !startDate || !endDate}
            >
              Create
            </Button>
            <Button
              variant="contained"
              color="error"
              onClick={handleCreateDialogClose}
            >
              Cancel
            </Button>
          </DialogContent>
        </Dialog>
        <Dialog open={openEventDialog} onClose={handleEventDialogClose}>
          <DialogContent>
            <h2>Schedule Appointment</h2>
            <p>Event ID: {selectedAppointmentId}</p>
            {selectedAppointmentId &&
            currentUser?.uid !== selectedBookedById &&
            !selectedAppointmentAvailability ? (
              <p>This appointment is already booked by another user.</p>
            ) : (
              <>
                {selectedAppointmentAvailability ? (
                  <Button
                    sx={{ backgroundColor: "#3EB489" }}
                    variant="contained"
                    onClick={() =>
                      handleScheduleAppointment(selectedAppointmentId || "")
                    }
                  >
                    Schedule
                  </Button>
                ) : (
                  <Button
                    variant="contained"
                    color="error"
                    onClick={() =>
                      handleCancelAppointment(selectedAppointmentId)
                    }
                  >
                    Cancel Appointment
                  </Button>
                )}
              </>
            )}
            <Button
              variant="contained"
              color="secondary"
              onClick={handleEventDialogClose}
            >
              Close
            </Button>
          </DialogContent>
        </Dialog>
        <Snackbar
          open={openSnackbar}
          autoHideDuration={6000}
          onClose={handleCloseSnackbar}
        >
          <MuiAlert
            elevation={6}
            variant="filled"
            onClose={handleCloseSnackbar}
            severity={snackbarSeverity}
          >
            {snackbarMessage}
          </MuiAlert>
        </Snackbar>
      </CardContent>
    </Card>
  );
};

export default FullCalendarTimeline;
