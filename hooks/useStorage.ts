import { useState, useCallback, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const defaultData = {
  wpm: [],
  lang: 'en'
}

const useAsyncStorage = () => {
  const [username, setUsernameState] = useState<string>('Anonymous');

  // Load username on initialization
  useEffect(() => {
    const loadUsername = async () => {
      try {
        const storedUsername = await AsyncStorage.getItem('__current_username') || 'Anonymous';
        setUsernameState(storedUsername);
      } catch (error) {
        console.error('Error loading username:', error);
      }
    };

    loadUsername();
  }, []);


  const setCurrentUser = useCallback(async (newUsername: string) => {
    try {
      await AsyncStorage.setItem('__current_username', newUsername);
      setUsernameState(newUsername);
      console.log(`Username updated to: ${newUsername}`);
    } catch (error) {
      console.error('Error setting username:', error);
    }
  }, []);

  const readData = useCallback(async (key: string) => {
    try {
      const value = await AsyncStorage.getItem(username) || JSON.stringify(defaultData);
      const data = JSON.parse(value) || defaultData
      return isAlphanumeric(data[key]) ? data[key] : JSON.parse(data[key]);
    } catch (error) {
      console.error('Error reading data:', defaultData, error);
      return null;
    }
  }, []);

  const writeData = useCallback(async (key: string, value: string) => {
    try {
      const currentData = await AsyncStorage.getItem(username) || JSON.stringify(defaultData);
      const data = JSON.parse(currentData) || defaultData
      data[key] = value;
      await AsyncStorage.setItem(username, JSON.stringify(data))
      console.log(`data saved: ${data}`);
    } catch (error) {
      console.error('Error writing data:', error);
    }
  }, []);

  function isAlphanumeric(content: string) {
    const regex = /^[a-zA-Z0-9]+$/;
    return regex.test(content);
  }

  return {
    username,
    setCurrentUser,
    readData,
    writeData,
  };
};

export default useAsyncStorage;
