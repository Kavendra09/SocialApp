import React, { createContext, useContext, useState, useEffect } from 'react';
import { MMKV } from 'react-native-mmkv';

// Initialize MMKV
const storage = new MMKV();

// Create Context
const UserContext = createContext(null);

// Function to get user data from MMKV
export const getUserData = () => {
  const user = storage.getString('user');
  return user ? JSON.parse(user) : null;
};

// Function to save user data in MMKV
export const setUserData = (user) => {
  storage.set('user', JSON.stringify(user));  // Save the entire user object in MMKV
};

// Create Provider Component
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState({ userId: null, username: null });
  
  // Load user data from MMKV on app start
  useEffect(() => {
    const storedUser = getUserData(); // Use the function to get user data
    if (storedUser) {
      setUser(storedUser); // Set the user state if data is found
    }
  }, []);
  
  // Logout function
  const clearUserData = () => {
    storage.delete('user');  // Delete user data from MMKV
    setUser({ userId: null, username: null }); // Reset state
  };

  return (
    <UserContext.Provider value={{ user, setUserData, clearUserData }}>
      {children}
    </UserContext.Provider>
  );
};

// Custom Hook to Access Context
export const useUser = () => useContext(UserContext);

