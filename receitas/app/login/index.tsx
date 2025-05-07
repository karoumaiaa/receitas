import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import Swal from 'sweetalert2';
import { auth } from '@/src/firebase.config'
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useRouter } from "expo-router"
import { useAuth } from '@/src/AuthContext';


export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();
  const { login } = useAuth();

  const handleLogin = () => {

    if (!email.trim() || !password.trim()) {
      Swal.fire({
        title: 'Campos obrigatórios',
        text: 'Por favor, preencha o e-mail e a senha.',
        icon: 'warning',
        confirmButtonColor: '#be185d',
      });
      return; }
    
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        login();
        const user = userCredential.user;
          Swal.fire({
            title: 'Sucesso!',
            text: 'Login efetuado com sucesso!',
            icon: 'success',
            confirmButtonColor: '#be185d',
          });
          router.replace('/home')
      })
      .catch((error) => {
        Swal.fire({
          title: 'Erro',
          text: 'E-mail ou senha incorretos.',
          icon: 'error',
          confirmButtonColor: '#be185d',
        });
      });
  }
  return (
    <View style={styles.container}>
      <Text style={styles.welcome}>Bem-vindo!</Text>
      <Text style={styles.subtitle}>Faça login para adicionar uma receita.</Text>

      <TextInput
        style={styles.input}
        placeholder="Digite o seu e-mail"
        keyboardType="email-address"
        autoCapitalize="none"
        autoComplete='email'
        value={email}
        onChangeText={setEmail}
        placeholderTextColor="#9ca3af"
      />

      <TextInput
        style={styles.input}
        placeholder="Digite a sua senha"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
        placeholderTextColor="#9ca3af"
      />

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Entrar</Text>
      </TouchableOpacity>

      <TouchableOpacity>
        <Text style={styles.forgotPassword}>Esqueceu a senha?</Text>
      </TouchableOpacity>
    </View>


    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8c9d2', 
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 40,
  },
  welcome: {
    fontSize: 28,
    fontWeight: '700',
    color: '#be185d',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#6b7280',
    marginBottom: 32,
    textAlign: 'center',
  },
  input: {
    width: '80%',
    height: 50,
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingHorizontal: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#f9a8d4',
    fontSize: 16,
  },
  button: {
    backgroundColor: '#f4a7c1',
    width: '80%',
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 8,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  forgotPassword: {
    color: '#9d174d',
    fontSize: 14,
    marginTop: 16,
    textDecorationLine: 'underline',
  },
});