import { Stack } from "expo-router";
import "./global.css";
import { StatusBar } from "react-native";
import '@/i18n'; // Import i18n configuration

export default function RootLayout() {
  return (
    <>

    <StatusBar hidden={true}/> 
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="movie/[id]" options={{ headerShown: false }} />
    </Stack>
    </>
    
  );
}
