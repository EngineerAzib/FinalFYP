import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';

// Configure notification handling
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

// Initialize notification channel (Android)
async function setupNotificationChannel() {
  if (Platform.OS === 'android') {
    await Notifications.setNotificationChannelAsync('default', {
      name: 'Default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }
}

// Register device for push notifications
export async function registerForPushNotifications(studentId) {
  await setupNotificationChannel();

  const { status: existingStatus } = await Notifications.getPermissionsAsync();
  let finalStatus = existingStatus;

  if (existingStatus !== 'granted') {
    const { status } = await Notifications.requestPermissionsAsync();
    finalStatus = status;
  }

  if (finalStatus !== 'granted') {
    alert('Failed to get push token for push notification!');
    return;
  }

  const token = (await Notifications.getExpoPushTokenAsync()).data;
  
  // Send token to backend
  await saveTokenToBackend(studentId, token);
  
  return token;
}

async function saveTokenToBackend(studentId, token) {
  try {
    const response = await fetch('https://your-api.com/api/devices', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer YOUR_AUTH_TOKEN'
      },
      body: JSON.stringify({
        studentId: studentId,
        expoPushToken: token
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to save token');
    }
  } catch (error) {
    console.error('Error saving token:', error);
  }
}

// Call this when user logs in
export async function initNotifications(studentId) {
  await registerForPushNotifications(studentId);
}