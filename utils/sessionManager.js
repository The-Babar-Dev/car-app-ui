// Save user token to sessionStorage
export const saveUserSession = (token) => {
  sessionStorage.setItem("session-token", token);
};

// Get user token from sessionStorage
export const getUserSession = () => {
  return sessionStorage.getItem("session-token");
};

// Delete user token from sessionStorage
export const deleteUserSession = () => {
  sessionStorage.removeItem("session-token");
};
