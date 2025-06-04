import React, { useEffect, useState } from "react"
import {
  View,
  Text,
  Image,
  ScrollView,
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
} from "react-native"
import { Feather } from "@expo/vector-icons"

interface ReceitaLocal {
  id: number
  titulo: string
  descricao: string
  imagem: string
  tempo: string
  receitaC: string
  likes: number
  comments: number
  liked: boolean
  saved: boolean
}

export default function Pesquisar() {
  const [receitas, setReceitas] = useState<ReceitaLocal[]>([])
  const [loading, setLoading] = useState(true)
  const [expanded, setExpanded] = useState<number | null>(null)

  useEffect(() => {
    loadReceitasLocal()
  }, [])

  const loadReceitasLocal = () => {
    setLoading(true)
    try {
      const dadosString = localStorage.getItem("receitas")
      if (dadosString) {
        const dados: ReceitaLocal[] = JSON.parse(dadosString)
        setReceitas(dados)
      } else {
        setReceitas([])
      }
    } catch (err) {
      console.log("Erro ao carregar receitas do localStorage:", err)
      setReceitas([])
    }
    setLoading(false)
  }

  const renderReceitas = () => {
    if (loading) {
      return <ActivityIndicator size="large" color="#F4a7c1" style={{ marginTop: 30 }} />
    } else if (receitas.length === 0) {
      return <Text style={{ textAlign: "center", marginTop: 30, color: "#777" }}>Nenhuma receita salva.</Text>
    } else {
      return (
        <ScrollView contentContainerStyle={{ padding: 16 }}>
          {receitas.map((r) => (
            <View key={r.id} style={styles.card}>
              {r.imagem ? (
                <Image source={{ uri: r.imagem }} style={styles.img} />
              ) : (
                <View style={[styles.img, { justifyContent: "center", alignItems: "center", backgroundColor: "#eee" }]}>
                  <Text style={{ color: "#999" }}>Sem imagem</Text>
                </View>
              )}
              <Text style={styles.name}>{r.titulo}</Text>
              <Text style={styles.cat}>Tempo: {r.tempo}</Text>
              <Text style={styles.desc}>
                {expanded === r.id ? r.receitaC : r.receitaC?.slice(0, 200) + (r.receitaC.length > 200 ? "..." : "")}
              </Text>

              {r.receitaC.length > 200 && (
                <TouchableOpacity
                  style={styles.expand}
                  onPress={() => {
                    setExpanded(expanded === r.id ? null : r.id)
                  }}
                >
                  <Text style={styles.expandText}>
                    {expanded === r.id ? "Ver menos" : "Ver mais"}
                  </Text>
                </TouchableOpacity>
              )}
            </View>
          ))}
        </ScrollView>
      )
    }
  }

  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      <View style={styles.header}>
        <Text style={styles.title}>Receitas Salvas</Text>
        <TouchableOpacity style={styles.button} onPress={loadReceitasLocal}>
          <Feather name="rotate-ccw" size={20} color="#fff" />
          <Text style={styles.btnText}>Atualizar</Text>
        </TouchableOpacity>
      </View>
      {renderReceitas()}
    </View>
  )
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    borderBottomWidth: 1,
    borderColor: "#eee",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#F4a7c1",
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F4a7c1",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  btnText: {
    color: "#fff",
    marginLeft: 6,
    fontWeight: "bold",
  },
  card: {
  backgroundColor: "#fff",
  borderRadius: 8,
  marginBottom: 20,
  elevation: 2,
  overflow: "hidden",
  width: "50%",      
  alignSelf: "center" 
},

  img: {
    width: "100%",
    height: 400,
  },
  name: {
    fontSize: 16,
    fontWeight: "bold",
    padding: 10,
    color: "#F4a7c1",
  },
  cat: {
    fontSize: 14,
    paddingHorizontal: 10,
    color: "#777",
  },
  desc: {
    fontSize: 14,
    padding: 10,
    color: "#333",
  },
  expand: {
    backgroundColor: "#F4a7c1",
    padding: 10,
    alignItems: "center",
  },
  expandText: {
    color: "#fff",
    fontWeight: "bold",
  },
})
