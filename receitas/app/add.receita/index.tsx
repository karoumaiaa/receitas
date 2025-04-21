import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';

const AddRecipeScreen = ({ navigation }: any) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');
  const [cookTime, setCookTime] = useState('');
  const [ingredients, setIngredients] = useState('');
  const [fullRecipe, setFullRecipe] = useState('');
  const [difficulty, setDifficulty] = useState('');
  const [servings, setServings] = useState('');

  const handleSubmit = () => {
    const newRecipe = {
      id: Math.floor(Math.random() * 1000),
      username: "maria_chef",
      userAvatar: "https://randomuser.me/api/portraits/women/65.jpg",
      image,
      title,
      description,
      fullRecipe,
      cookTime,
      difficulty,
      servings,
      likes: 0,
      comments: 0,
      liked: false,
      saved: false,
    };

    navigation.navigate('Home', { newRecipe });
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.header}>🍰 Nova Receita</Text>

        <TextInput
          style={styles.input}
          placeholder="Título da Receita"
          placeholderTextColor="#aaa"
          value={title}
          onChangeText={setTitle}
        />
        <TextInput
          style={styles.input}
          placeholder="Descrição"
          placeholderTextColor="#aaa"
          value={description}
          onChangeText={setDescription}
        />
        <TextInput
          style={styles.input}
          placeholder="URL da Imagem"
          placeholderTextColor="#aaa"
          value={image}
          onChangeText={setImage}
        />
        <TextInput
          style={styles.input}
          placeholder="Tempo de Preparo"
          placeholderTextColor="#aaa"
          value={cookTime}
          onChangeText={setCookTime}
        />
        <TextInput
          style={styles.input}
          placeholder="Ingredientes (separe por vírgulas)"
          placeholderTextColor="#aaa"
          value={ingredients}
          onChangeText={setIngredients}
        />
        <TextInput
          style={styles.input}
          placeholder="Modo de Preparo"
          placeholderTextColor="#aaa"
          multiline
          numberOfLines={4}
          value={fullRecipe}
          onChangeText={setFullRecipe}
        />
        <View style={styles.row}>
          <TextInput
            style={[styles.input, styles.halfInput]}
            placeholder="Dificuldade"
            placeholderTextColor="#aaa"
            value={difficulty}
            onChangeText={setDifficulty}
          />
          <TextInput
            style={[styles.input, styles.halfInput]}
            placeholder="Porções"
            placeholderTextColor="#aaa"
            value={servings}
            onChangeText={setServings}
          />
        </View>

        <TouchableOpacity onPress={handleSubmit} style={styles.button}>
          <Text style={styles.buttonText}>Publicar Receita</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFDF9',
  },
  scrollContainer: {
    paddingHorizontal: 24,
    paddingTop: 30,
    paddingBottom: 60,
  },
  header: {
    fontSize: 32,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 30,
    color: '#4E3620',
    fontFamily: Platform.OS === 'ios' ? 'Georgia' : 'serif',
  },
  input: {
    backgroundColor: '#FFF',
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 16,
    fontSize: 16,
    color: '#333',
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#E6E3DD',
    shadowColor: '#000',
    shadowOpacity: 0.03,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    elevation: 1,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  halfInput: {
    width: '48%',
  },
  button: {
    backgroundColor: '#FF6F61',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#FF6F61',
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 5,
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
});

export default AddRecipeScreen;
