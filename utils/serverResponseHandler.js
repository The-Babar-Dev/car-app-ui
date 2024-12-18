"use client";

import { deleteUserSession } from "./sessionManager";
import {
  showErrorNotification,
  showSuccessNotification,
  showWarningNotification,
} from "./notificationManager";

export const handleApiResponse = (response, router) => {
  const { data, status } = response;

  console.log(data);

  switch (status) {
    case 200:
    case 201:
      showSuccessNotification(data?.message || "Operation successful");
      break;

    case 400:
    case 404:
    case 409:
    case 500:
      showErrorNotification(data?.message || "Something went wrong");
      break;

    case 401:
      showWarningNotification("Session expired. Please log in again.");
      deleteUserSession();
      router.push("/login");
      break;

    default:
      break;
  }
};
