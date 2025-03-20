import { useEffect, useState } from "react"
import { View, Text, FlatList, Alert } from "react-native"

import { styles } from "./styles"
import { Item } from "@/components/Item"
import { Input } from "@/components/Input"
import { Button } from "@/components/Button"

//Tinybase
import { createStore } from "tinybase"


const TABLE_NAME = "products"
const store = createStore()

type ProductStore = {
  description: string,
  done: boolean
}

type Product = ProductStore & {id: string}

export function Home() {
  const [description, setDescription] = useState("")
  const [products, setProducts] = useState<Product[]>([])

  function get(){
    const data = store.getTable(TABLE_NAME)
    // console.log(data)
    const response = Object.entries(data).map(([id, product]) =>({
      id,
      description:  String(product.description),
      done:         Boolean(product.done)
    }))

    setProducts(response)
  }

  function add(){
    if(description.trim() === ""){
      return Alert.alert("Atenção", "Informe o produto")
    }
    //"1234":{} formato de dados, o id fica de fora
    const id = Math.random().toString(30).substring(2,20) //gera o id
    // console.log(id)
    store.setRow(TABLE_NAME, id, {description, done: false})
    setDescription("")
    get()
  }

  useEffect(() => {
    get();
  },[])

  return (
    <View style={styles.container}>
      <View style={styles.form}>
        <Input
          placeholder="O que você precisa comprar?"
          onChangeText={setDescription}
          value={description}
        />

        <Button title="Adicionar" onPress={add}/>
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
