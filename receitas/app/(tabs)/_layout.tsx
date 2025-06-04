import { Tabs } from "expo-router";
import { Feather } from "@expo/vector-icons";
import { useAuth } from "@/src/AuthContext";

export default function TabsLayout() {
  const { isAuthenticated } = useAuth();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#F4a7c1",
        tabBarInactiveTintColor: "#aaa",
      }}
    >
      <Tabs.Screen
        name="home/index"
        options={{
          tabBarLabel: "Início",
          tabBarIcon: ({ color, size }) => (
            <Feather name="home" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="api-pesquisar/pesquisar"
        options={{
          tabBarLabel: "Pesquisar",
          tabBarIcon: ({ color, size }) => (
            <Feather name="search" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name={isAuthenticated ? "add.receita/index" : "login/index"}
        options={{
          tabBarLabel: isAuthenticated ? "Adicionar Receita" : "Login",
          tabBarIcon: ({ color, size }) => (
            <Feather
              name={isAuthenticated ? "plus" : "log-in"}
              size={size}
              color={color}
            />
          ),
        }}
      />
    </Tabs>
  );
}