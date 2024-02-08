import  httpClient  from "../../services/http-client";

export const createAppointment = async (appointmentData: any) => {
  try {
    const response = await httpClient.post('appointments/create',appointmentData);

    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getAppointments = async () => {
  try {
    const response = await httpClient.get(`appointments`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getAppointmentById = async (appointmentId: string) => {
  try {
    const response = await httpClient.get(
      `appointments/${appointmentId}`,
      
    );

    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const scheduleAppointment = async (
  userId: string,
  appointmentId: string,
  appointmentData: any
) => {
  try {
    const response = await httpClient.post(
      `appointments/${userId}/schedule-appointment/${appointmentId}`,
      appointmentData,
      
    );

    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const cancelAppointment = async (
  userId: string,
  appointmentId: string,

) => {
  try {
    const response = await httpClient.delete(
      `appointments/${userId}/cancel-appointment/${appointmentId}`,
      
    );

    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
