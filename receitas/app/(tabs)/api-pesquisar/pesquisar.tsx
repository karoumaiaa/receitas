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
import axios from "axios"
import { Feather } from "@expo/vector-icons"

interface Receita {
  idMeal: string
  strMeal: string
  strMealThumb: string
  strCategory: string
  strInstructions: string
}

export default function Pesquisar() {
  const [receitas, setReceitas] = useState<Receita[]>([])
  const [loading, setLoading] = useState(true)
  const [expanded, setExpanded] = useState<string | null>(null)

  useEffect(() => {
    loadReceitas()
  }, [])

  const loadReceitas = async () => {
    setLoading(true)
    try {
      const reqs = []
      for (let i = 0; i < 6; i++) {
        reqs.push(axios.get("https://www.themealdb.com/api/json/v1/1/random.php"))
      }
      const res = await Promise.all(reqs)
      const data: Receita[] = res.map(r => r.data.meals[0])
      setReceitas(data)
    } catch (err) {
      console.log("Erro:", err)
    }
    setLoading(false)
  }

  const renderReceitas = () => {
    if (loading) {
      return <ActivityIndicator size="large" color="#F4a7c1" style={{ marginTop: 30 }} />
    } else {
      return (
        <ScrollView contentContainerStyle={{ padding: 16 }}>
          {receitas.map((r) => (
            <View key={r.idMeal} style={styles.card}>
              <Image source={{ uri: r.strMealThumb }} style={styles.img} />
              <Text style={styles.name}>{r.strMeal}</Text>
              <Text style={styles.cat}>Categoria: {r.strCategory}</Text>

              <Text style={styles.desc}>
                
                {(() => {
                  if (expanded === r.idMeal) {
                    return r.strInstructions
                  } else {
                    return r.strInstructions.slice(0, 200) + "..."
                  }
                })()}
              </Text>

              <TouchableOpacity
                style={styles.expand}
                onPress={() => {
                  if (expanded === r.idMeal) {
                    setExpanded(null)
                  } else {
                    setExpanded(r.idMeal)
                  }
                }}
              >
                <Text style={styles.expandText}>
                  {(() => {
                    if (expanded === r.idMeal) {
                      return "Ver menos"
                    } else {
                      return "Ver mais"
                    }
                  })()}
                </Text>
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>
      )
    }
  }

  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      <View style={styles.header}>
        <Text style={styles.title}>Receitas Aleatórias</Text>
        <TouchableOpacity style={styles.button} onPress={loadReceitas}>
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
    width: "50%",       // diminui a largura para 90% da tela
    alignSelf: "center"
  },
  img: {
    width: "100%",
    height: 200,
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