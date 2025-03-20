import { useState } from "react"
import { View, Text, FlatList } from "react-native"

import { styles } from "./styles"
import { Item } from "@/components/Item"
import { Input } from "@/components/Input"
import { Button } from "@/components/Button"

export function Home() {
  const [description, setDescription] = useState("")
  const [products, setProducts] = useState([])

  return (
    <View style={styles.container}>
      <View style={styles.form}>
        <Input
          placeholder="O que você precisa comprar?"
          onChangeText={setDescription}
          value={description}
        />

        <Button title="Adicionar" />
      </View>

      <FlatList
        data={products}
        renderItem={({ item }) => (
          <Item data={item} onStatus={() => {}} onRemove={() => {}} />
        )}
        showsVerticalScrollIndicator={false}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={() => (
          <Text style={styles.empty}>Nenhum item aqui.</Text>
        )}
        style={styles.list}
      />
    </View>
  )
}
