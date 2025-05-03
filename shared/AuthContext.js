// src/Context/AuthContext.js
import React, { createContext, useState, useEffect, useContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [userRole, setUserRole] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [userToken, setUserToken] = useState(null);

  useEffect(() => {
    // Load authentication state from AsyncStorage
    const loadAuthState = async () => {
      try {
        const [tokenValue, roleValue] = await AsyncStorage.multiGet(['userToken', 'userRole']);
        setUserToken(tokenValue[1]);
        setUserRole(roleValue[1]);
      } catch (error) {
        console.error('Error loading auth state:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadAuthState();
  }, []);

  const signIn = async (token, role) => {
    try {
      await AsyncStorage.multiSet([
        ['userToken', token],
        ['userRole', role],
      ]);
      setUserToken(token);
      setUserRole(role);
    } catch (error) {
      console.error('Error signing in:', error);
    }
  };

  const signOut = async () => {
    try {
      await AsyncStorage.multiRemove(['userToken', 'userRole']);
      setUserToken(null);
      setUserRole(null);
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <AuthContext.Provider value={{ userRole, userToken, isLoading, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);