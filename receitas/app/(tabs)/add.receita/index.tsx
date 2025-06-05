
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';

const Formulario = () => {
  const [titulo, setTitulo] = useState('');
  const [descricao, setDescricao] = useState('');
  const [imagem, setImagem] = useState('');
  const [tempo, setTempo] = useState('');
  const [receitaC, setReceitaC] = useState('');

  const handleSubmit = () => {
    const novaReceita = {
      id: Math.floor(Math.random() * 100000),
      imagem,
      titulo,
      descricao,
      receitaC,
      tempo,
      likes: 0,
      comments: 0,
      liked: false,
      saved: false,
    };

    // localStorage não funciona no React Native, substitua por AsyncStorage ou outra solução
    // Aqui vou deixar um alerta para você adaptar depois:
    alert('Receita publicada com sucesso! (implemente salvamento local ou remoto)');

    // Resetar os inputs
    setTitulo('');
    setDescricao('');
    setImagem('');
    setTempo('');
    setReceitaC('');
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <Text style={styles.header}>🍰 Nova Receita</Text>

      <TextInput
        style={styles.input}
        placeholder="Título da Receita"
        placeholderTextColor="#aaa"
        value={titulo}
        onChangeText={setTitulo}
      />
      <TextInput
        style={styles.input}
        placeholder="Descrição"
        placeholderTextColor="#aaa"
        value={descricao}
        onChangeText={setDescricao}
      />
      <TextInput
        style={styles.input}
        placeholder="URL da Imagem"
        placeholderTextColor="#aaa"
        value={imagem}
        onChangeText={setImagem}
      />
      <TextInput
        style={styles.input}
        placeholder="Tempo de Preparo"
        placeholderTextColor="#aaa"
        value={tempo}
        onChangeText={setTempo}
      />
      <TextInput
        style={styles.input}
        multiline={true}
        placeholder="Modo de Preparo"
        placeholderTextColor="#aaa"
        value={receitaC}
        onChangeText={setReceitaC}
      />

      <TouchableOpacity onPress={handleSubmit} style={styles.button}>
        <Text style={styles.buttonText}>Publicar Receita</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    paddingHorizontal: 24,
    paddingTop: 30,
    paddingBottom: 60,
    backgroundColor: '#FFFDF9',
  },
  header: {
    fontSize: 32,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 30,
    color: '#4E3620',
    fontFamily: 'serif',
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

export default Formulario;
