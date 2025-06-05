import { Slot } from "expo-router";
import { AuthProvider } from "@/src/AuthContext";

export default function RootLayout() {
  return (
    <AuthProvider>
      <Slot />
    </AuthProvider>
  );
}
