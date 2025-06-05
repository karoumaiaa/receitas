import React, { useState } from "react"
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  StatusBar,
} from "react-native"
import { Feather, AntDesign } from "@expo/vector-icons"

export default function Home() {
  const [expandedRecipes, setExpandedRecipes] = useState<Record<number, boolean>>({})

  const expandir = (recipeId: number) => {
    setExpandedRecipes((prev) => ({
      ...prev,
      [recipeId]: !prev[recipeId],
    }))
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.header}>
        <Image source={require("../../../assets/images/receita.jpg")} style={styles.imagem} />
        <Text style={styles.headerTitulo}>Receita das Gurias</Text>

        <TouchableOpacity style={styles.loginButton}>
          <Feather name="log-in" size={16} color="#fff" style={{ marginRight: 6 }} />
          <Text style={styles.loginButtonText}>Login</Text>
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {dados.map((recipe) => (
          <View key={recipe.id} style={styles.receitaCard}>
            <View style={styles.recipeHeader}>
              <View style={styles.userInfo}>
                <Image source={{ uri: recipe.userAvatar }} style={styles.userAvatar} />
                <View>
                  <Text style={styles.username}>{recipe.username}</Text>
                  <Text style={styles.location}>{recipe.location}</Text>
                </View>
              </View>
              <TouchableOpacity>
                <Feather name="more-horizontal" size={24} color="#333" />
              </TouchableOpacity>
            </View>

            <Image source={{ uri: recipe.image }} style={styles.recipeImage} />

            <View style={styles.recipeActions}>
              <View style={styles.leftActions}>
                <TouchableOpacity style={styles.actionButton}>
                  <AntDesign name="heart" size={24} color={recipe.liked ? "#FF3B30" : "#333"} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.actionButton}>
                  <Feather name="message-circle" size={24} color="#333" />
                </TouchableOpacity>
              </View>
              <TouchableOpacity>
                <Feather name="bookmark" size={24} color={recipe.saved ? "#007AFF" : "#333"} />
              </TouchableOpacity>
            </View>

            <View style={styles.recipeInfo}>
              <Text style={styles.likes}>{recipe.likes} likes</Text>
              <Text style={styles.recipeTitle}>{recipe.title}</Text>
              <Text style={styles.recipeDescription}>
                <Text style={styles.username}>{recipe.username}</Text> {recipe.description}
              </Text>

              <View style={styles.recipeContent}>
                <Text style={styles.recipeContentTitle}>Receita:</Text>
                <View>
                  {expandedRecipes[recipe.id] ? (
                    <Text style={styles.recipeText}>{recipe.fullRecipe}</Text>
                  ) : (
                    <Text style={styles.recipeText}>{recipe.fullRecipe.substring(0, 100)}...</Text>
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
  )
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
    comments: 89,
    liked: true,
    saved: true,
    cookTime: "15 min",
    servings: 2,
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
      "Ingredientes:\n- 1kg de feijão preto\n- 300g de carne seca\n- 300g de costela de porco\n- 300g de lombo de porco\n- 200g de linguiça calabresa\n- 200g de paio\n- 2 cebolas grandes\n- 4 dentes de alho\n- 3 folhas de louro\n- Óleo, sal e pimenta a gosto\n\nModo de Preparo:\n1. Deixe o feijão e as carnes de molho separadamente por 12 horas, trocando a água das carnes algumas vezes.\n2. Cozinhe o feijão na panela de pressão por cerca de 30 minutos.\n3. Em outra panela, refogue a cebola e o alho no óleo.\n4. Acrescente as carnes cortadas em pedaços e refogue.\n5. Junte o feijão cozido, as folhas de louro, sal e pimenta.\n6. Cozinhe em fogo baixo por mais 30 minutos.\n7. Sirva com arroz branco, couve refogada, laranja e farofa.",
    likes: 2568,
    liked: false,
    saved: false,
    cookTime: "3 horas",
    servings: 8,
  },
]

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
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
  receitaCard: {
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
    fontSize: 16,
    marginBottom: 5,
  },
  recipeDescription: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 10,
  },
  recipeContent: {
    marginTop: 10,
    padding: 10,
    backgroundColor: "#F9F9F9",
    borderRadius: 8,
  },
  recipeContentTitle: {
    fontWeight: "bold",
    fontSize: 16,
    marginBottom: 8,
    color: "#F4a7c1",
  },
  recipeText: {
    fontSize: 14,
    lineHeight: 20,
  },
  seeMoreButton: {
    color: "#F4a7c1",
    fontWeight: "bold",
    marginTop: 8,
    alignSelf: "flex-end",
  },
})
