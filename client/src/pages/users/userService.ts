// userService.ts

import httpClient from "../../services/http-client";
import { UserCreate } from "./model";

export const getUsers = async () => {
  try {
    const response = await httpClient.get(`users`);

    return response.data; // Return the fetched users
  } catch (error) {
    console.error(error);
    throw error; // Rethrow the error to handle it in the component
  }
};

export const createUser = async (userData: UserCreate) => {
  try {
    const response = await httpClient.post(`user`, userData);

    return response.data; // Return the created user
  } catch (error) {
    throw error; // Rethrow the error to handle it in the component
  }
};

export const getUserById = async (userId: string) => {
  try {
    const response = await httpClient.get(`user/${userId}`);

    // Assuming the response contains the user data
    return response.data; // Return the fetched user by ID
  } catch (error) {
    console.error(error);
    throw error; // Rethrow the error to handle it in the component
  }
};

export const updateUser = async (
  userId: string,
  updatedUserData: UserCreate
) => {
  try {
    const response = await httpClient.put(`user/${userId}`, updatedUserData);

    // Assuming the response contains the updated user
    return response.data; // Return the updated user
  } catch (error) {
    console.error(error);
    throw error; // Rethrow the error to handle it in the component
  }
};

export const deleteUser = async (userId: string) => {
  try {
    const response = await httpClient.delete(`user/${userId}`);

    // Assuming the response contains a message or confirmation
    return response.data; // Return the response from the delete operation
  } catch (error) {
    console.error(error);
    throw error; // Rethrow the error to handle it in the component
  }
};
