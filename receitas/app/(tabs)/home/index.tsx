import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  StatusBar,
} from "react-native";
import { Feather, AntDesign } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useAuth } from "../../../src/AuthContext";
export default function Home() {
  const [expandedRecipes, setExpandedRecipes] = useState<Record<number, boolean>>({});
  const { isAuthenticated } = useAuth();
  const router = useRouter();
  const [receitas, setReceitas] = useState<any[]>([]);
  const nomesAleatorios = ["maria_chef", "joana_cook", "ana_receitas", "chef_lu", "sabores_da_lu", "Chef_ana", "Cozinha_top", "Receitas_da_vó", "Amante_da_culinaria", "Duda_receitas"];
  const locaisAleatorios = ["Curitiba, Paraná", "Salvador, Bahia", "Recife, Pernambuco", "Florianópolis, Santa Catarina", "Porto Velho, Rondônia"];
   const avatares = [
    "https://randomuser.me/api/portraits/women/10.jpg",
    "https://randomuser.me/api/portraits/women/20.jpg",
    "https://randomuser.me/api/portraits/women/30.jpg",
    "https://randomuser.me/api/portraits/women/40.jpg",
    "https://randomuser.me/api/portraits/women/50.jpg",
  ];

  const sortear = (lista: string[]) => lista[Math.floor(Math.random() * lista.length)];

  const listarReceitas = (): any[] => {
    return JSON.parse(localStorage.getItem('receitas') || '[]');
  };

  useEffect(() => {
    const dados2 = listarReceitas();
    setReceitas(dados2);
  }, []);

  const expandir = (recipeId: number) => {
    setExpandedRecipes((prev) => ({
      ...prev,
      [recipeId]: !prev[recipeId],
    }));
  };



  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFDF9" />
      <View style={styles.header}>
        <Image
          source={require("../../../assets/images/receita.jpg")}
          style={styles.imagem}
        />
        <Text style={styles.headerTitulo}>Receita das Gurias</Text>

        {!isAuthenticated ? (
          <TouchableOpacity
            style={styles.loginButton}
            onPress={() => router.push("/login")}
          >
            <Feather
              name="log-in"
              size={16}
              color="#fff"
              style={{ marginRight: 6 }}
            />
            <Text style={styles.loginButtonText}>Login</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={styles.addButton}
            onPress={() => router.push("/add.receita")}
          >
            <Feather
              name="plus"
              size={16}
              color="#fff"
              style={{ marginRight: 6 }}
            />
            <Text style={styles.addButtonText}>Adicionar Receita</Text>
          </TouchableOpacity>
        )}
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {receitas.map((recipe) => (
          <View key={recipe.id} style={styles.receitaCard}>
            <View style={styles.recipeHeader}>
              <View style={styles.userInfo}>
                <Image
                  source={{ uri: recipe.userAvatar || sortear(avatares) }}
                  style={styles.userAvatar}
                />
                <View>
                  <Text style={styles.username}>{recipe.username || sortear(nomesAleatorios)}</Text>
                  <Text style={styles.location}>{recipe.location || sortear(locaisAleatorios)}</Text>

                </View>
              </View>
              <TouchableOpacity>
                <Feather name="more-horizontal" size={24} color="#333" />
              </TouchableOpacity>
            </View>

            <Image source={{ uri: recipe.imagem }} style={styles.recipeImage} />

            <View style={styles.recipeActions}>
              <View style={styles.leftActions}>
                <TouchableOpacity style={styles.actionButton}>
                  <AntDesign
                    name="heart"
                    size={24}
                    color={recipe.liked ? "#FF3B30" : "#333"}
                  />
                </TouchableOpacity>
                <TouchableOpacity style={styles.actionButton}>
                  <Feather name="message-circle" size={24} color="#333" />
                </TouchableOpacity>
              </View>
              <TouchableOpacity>
                <Feather
                  name="bookmark"
                  size={24}
                  color={recipe.saved ? "#007AFF" : "#333"}
                />
              </TouchableOpacity>
            </View>

            <View style={styles.recipeInfo}>
              <Text style={styles.likes}>{recipe.likes} likes</Text>
              <Text style={styles.recipeTitle}>{recipe.titulo}</Text>
              <Text style={styles.recipeDescription}>
                <Text style={styles.username}>{recipe.username || "usuario_local"}</Text> {recipe.descricao}
              </Text>

              <View style={styles.recipeContent}>
                <Text style={styles.recipeContentTitle}>Receita:</Text>
                <View>
                  {expandedRecipes[recipe.id] ? (
                    <Text style={styles.recipeText}>{recipe.receitaC}</Text>
                  ) : (
                    <Text style={styles.recipeText}>
                      {recipe.receitaC.substring(0, 100)}...
                    </Text>
                  )}
                  <TouchableOpacity onPress={() => expandir(recipe.id)}>
                    <Text style={styles.seeMoreButton}>
                      {expandedRecipes[recipe.id] ? "Ver menos" : "Ver mais"}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        ))}
      </ScrollView>

    </SafeAreaView>
  );
}

const dados = [
  {
    id: 1,
    username: "maria_chef",
    userAvatar: "https://randomuser.me/api/portraits/women/65.jpg",
    location: "São Paulo, Brasil",
    image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c",
    title: "Salada Tropical com Manga",
    description: "Uma salada refrescante perfeita para o verão! Combinação de frutas e vegetais.",
    fullRecipe:
      "Ingredientes:\n- 1 manga madura\n- 1 abacate\n- 200g de folhas verdes variadas\n- 1 cebola roxa pequena\n- 1/2 xícara de nozes\n- Suco de 1 limão\n- 2 colheres de sopa de azeite de oliva\n- Sal e pimenta a gosto\n\nModo de Preparo:\n1. Corte a manga e o abacate em cubos.\n2. Fatie a cebola roxa finamente.\n3. Em uma tigela grande, misture as folhas verdes, manga, abacate, cebola e nozes.\n4. Para o molho, misture o suco de limão, azeite, sal e pimenta.\n5. Regue a salada com o molho e sirva imediatamente.",
    likes: 1243,
    liked: true,
    saved: true,
  },
  {
    id: 2,
    username: "chef_paulo",
    userAvatar: "https://randomuser.me/api/portraits/men/32.jpg",
    location: "Rio de Janeiro, Brasil",
    image: "https://images.unsplash.com/photo-1551183053-bf91a1d81141",
    title: "Feijoada Tradicional",
    description: "Receita clássica brasileira, perfeita para reunir a família no fim de semana!",
    fullRecipe:
      "Ingredientes:\n- 1kg de feijão preto\n- 300g de carne seca\n- 300g de costela de porco\n- 300g de lombo de porco\n- 200g de linguiça calabresa\n- 200g de paio\n- 2 cebolas grandes\n- 4 dentes de alho\n- 3 folhas de louro\n- Óleo, sal e pimenta a gosto\n\nModo de Preparo:\n1. Deixe o feijão e as carnes de molho separadamente por 12 horas.\n2. Cozinhe o feijão na pressão por 30 minutos.\n3. Refogue cebola e alho.\n4. Acrescente as carnes e depois o feijão.\n5. Cozinhe por mais 30 minutos.\n6. Sirva com arroz, couve e farofa.",
    likes: 2568,
    liked: false,
    saved: false,
  },
];

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFDF9",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 15,
    height: 60,
    borderBottomWidth: 1,
    borderBottomColor: "#EFEFEF",
  },
  imagem: {
    width: 50,
    height: 50,
    borderRadius: 15,
  },
  headerTitulo: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#F4a7c1",
  },
  loginButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F4a7c1",
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
    shadowColor: "#F4a7c1",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 5,
  },
  loginButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 14,
  },
  addButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F4a7c1",
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
    shadowColor: "#F4a7c1",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 5,
  },
  addButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 14,
  },
  receitaCard: {
    width: "50%",
    alignSelf: "center",
    marginBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#EFEFEF",
  },
  recipeHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 15,
  },
  userInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  userAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  username: {
    fontWeight: "bold",
    fontSize: 14,
  },
  location: {
    fontSize: 12,
    color: "#666",
  },
  recipeImage: {
    width: "100%",
    height: 400,
    resizeMode: "cover",
  },
  recipeActions: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 15,
  },
  leftActions: {
    flexDirection: "row",
  },
  actionButton: {
    marginRight: 15,
  },
  recipeInfo: {
    paddingHorizontal: 15,
    paddingBottom: 15,
  },
  likes: {
    fontWeight: "bold",
    marginBottom: 5,
  },
  recipeTitle: {
    fontWeight: "bold",
    fontSize: 18,
    marginBottom: 5,
  },
  recipeDescription: {
    marginBottom: 8,
  },
  recipeContent: {
    marginTop: 10,
  },
  recipeContentTitle: {
    fontWeight: "bold",
    marginBottom: 4,
  },
  recipeText: {
    fontSize: 14,
    lineHeight: 20,
  },
  seeMoreButton: {
    marginTop: 5,
    color: "#F4a7c1",
    fontWeight: "bold",
  },
});