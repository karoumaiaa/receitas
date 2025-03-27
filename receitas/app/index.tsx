import { Text, View } from "react-native";
import { Link } from "expo-router";

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>Receita das Gurias! Aqui você pode compartilhar o seu amor em forma de comida.</Text>
      <Link href={"/settings"}>Início</Link>
      <Link href={"/login"}>Login</Link>
      <Link href={"/settings/admin"}>Receitas em Geral</Link>
      <Link href={"/register"}>Compartilha tua receita com a gente</Link>
    </View>
  );
}
