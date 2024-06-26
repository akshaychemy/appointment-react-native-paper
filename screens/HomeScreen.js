import React, { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import {
  Dimensions,
  FlatList,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import { getProducts } from "../src/api"; // Assuming API function to fetch products
import { Card, Text, TouchableRipple, Searchbar } from "react-native-paper";

const { width, height } = Dimensions.get("window");

const images = [
  { id: "1", url: "https://picsum.photos/200/300" },
  { id: "2", url: "https://picsum.photos/200/300" },
  { id: "3", url: "https://picsum.photos/200/300" },
];

export default function HomeScreen({ navigation }) {
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    getProducts()
      .then((res) => {
        setProducts(res);
        setFilteredProducts(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const onChangeSearch = (query) => {
    setSearchQuery(query);
    if (query) {
      setFilteredProducts(
        products.filter((product) =>
          product.name.toLowerCase().includes(query.toLowerCase())
        )
      );
    } else {
      setFilteredProducts(products);
    }
  };

  const renderProductItem = ({ item }) => (
    <TouchableRipple
      style={styles.productItem}
      onPress={() => navigation.navigate("ProductDetails", { product: item })}
    >
      <Card style={styles.card}>
        <Card.Cover source={{ uri: item.images[0] }} style={styles.imageProduct} />
        <Card.Content>
          <Text style={styles.itemText}>{item.name}</Text>
          <Text style={styles.itemText}>Price: ${item.price}</Text>
        </Card.Content>
      </Card>
    </TouchableRipple>
  );

  const renderImageItem = ({ item }) => (
    <TouchableRipple style={styles.imageItem}>
      <Card style={styles.card}>
        <Card.Cover source={{ uri: item.url }} style={styles.image} />
      </Card>
    </TouchableRipple>
  );

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.carousalTitle}>Featured Images</Text>
      <FlatList
        data={images}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        renderItem={renderImageItem}
        contentContainerStyle={styles.carouselContainer}
      />

      <Searchbar
        placeholder="Search Products"
        onChangeText={onChangeSearch}
        value={searchQuery}
        style={styles.searchbar}
      />

      <Text style={styles.title}>Featured Products</Text>

      <FlatList
        data={filteredProducts}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        renderItem={renderProductItem}
        contentContainerStyle={styles.productContainer}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: width * 0.05,
    backgroundColor: "#fff",
    marginTop: height * 0.06,
  },
  searchbar: {
    marginTop: height * 0.04,
    marginBottom: height * 0.02,
  },
  imageItem: {
    width: width * 0.8,
    marginRight: width * 0.02,
  },
  image: {
    width: "100%",
    height: "100%",
  },
  carouselContainer: {
    marginBottom: height * 0.02,
    height: height * 0.3,
  },
  carousalTitle: {
    fontSize: width * 0.05,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: height * 0.02,
    marginTop: height * 0.02,
    color: "#000",
  },
  title: {
    fontSize: width * 0.05,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: height * 0.02,
    marginTop: height * 0.02,
    color: "#000",
  },
  productContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  productItem: {
    alignItems: "center",
    justifyContent: "center",
    padding: width * 0.05,
    marginHorizontal: width * 0.02,
    borderRadius: (width * 0.05) / 2,
    width: width * 0.4,
    height: width * 0.6,
    marginBottom: width * 0.02,
  },
  imageProduct: {
    width: width * 0.25,
    height: width * 0.25,
    borderRadius: width * 0.125,
    marginBottom: width * 0.02,
    marginTop: width * 0.02,
    marginLeft: width * 0.02,
    marginRight: width * 0.02,
  },
  card: {
    flex: 1,
    justifyContent: "center",
  },
  itemText: {
    textAlign: "center",
    marginTop: 10,
  },
});
