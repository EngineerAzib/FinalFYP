import * as FileSystem from 'expo-file-system';
import * as MediaLibrary from 'expo-media-library';
import axios from 'axios';
import { Alert } from 'react-native';
import { API_BASE_URL } from '../Config';

// Function to download and save a file
const Downloadpdf = async (fileName) => {
  const downloadUrl = `${API_BASE_URL}/api/Image/download-file/${fileName}`;  // File name passed as parameter

  try {
    // Use axios to download the file
    const response = await axios({
      url: downloadUrl,
      method: 'GET',
      responseType: 'arraybuffer',  // Ensure binary data is downloaded
    });

    if (response.status === 200) {
      // Convert ArrayBuffer to Base64 string
      const base64Data = arrayBufferToBase64(response.data);

      // Define the local file path (save in the app's document directory)
      const downloadsDirectory = FileSystem.documentDirectory + 'downloads/';
      const path = downloadsDirectory + fileName;

      // Ensure the downloads directory exists
      await FileSystem.makeDirectoryAsync(downloadsDirectory, { intermediates: true });

      // Save the file as a Base64 string to the device
      await FileSystem.writeAsStringAsync(path, base64Data, { encoding: FileSystem.EncodingType.Base64 });

      // Request media library permissions
      const permission = await MediaLibrary.requestPermissionsAsync();
      if (permission.granted) {
        // Save the file to the media library (gallery)
        const asset = await MediaLibrary.createAssetAsync(path);
        await MediaLibrary.createAlbumAsync('Downloaded', asset, false);  // You can change the album name
        Alert.alert('Success', 'File has been downloaded and saved to your gallery!');
      } else {
        Alert.alert('Permission Denied', 'You need to grant access to save the file.');
      }
    } else {
      Alert.alert('Error', 'Failed to download the file.');
    }
  } catch (error) {
    console.error('Error downloading or saving the file:', error);
    Alert.alert('Error', 'An error occurred while downloading or saving the file.');
  }
};

// Helper function to convert ArrayBuffer to Base64
const arrayBufferToBase64 = (buffer) => {
  let binary = '';
  const bytes = new Uint8Array(buffer);
  const length = bytes.byteLength;
  for (let i = 0; i < length; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return window.btoa(binary);  // Converts to Base64
};

export default Downloadpdf;
