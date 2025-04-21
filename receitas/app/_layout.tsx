import { Tabs } from "expo-router"
import { Feather } from "@expo/vector-icons"

export default function Layout() {
  return (
    <Tabs screenOptions={{
      headerShown: false,
      tabBarActiveTintColor: "#F4a7c1",
      tabBarInactiveTintColor: "#aaa",
    }}>
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
        name="add.receita/index"
        options={{
          tabBarLabel: "Adicionar",
          tabBarIcon: ({ color, size }) => (
            <Feather name="plus" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  )
}
