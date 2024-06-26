import { StatusBar } from "expo-status-bar";
import {
  Dimensions,
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { getClinics } from "../src/api";
import React,{ useEffect } from "react";

const { width, height } = Dimensions.get("window");

const images = [
  { id: "1", url: "https://picsum.photos/200/300" },
  { id: "2", url: "https://picsum.photos/200/300" },
  { id: "3", url: "https://picsum.photos/200/300" },
];

export default function HomeScreen({ navigation }) {


  const [clinics, setClinics] = React.useState([]);

  useEffect(()=>{
    getClinics().then((res)=>{
      setClinics(res)
    }).catch((err)=>{
      console.log(err)
    })
  },[])

  const renderClinicItem = ({ item }) => (
    <TouchableOpacity style={styles.clinicItem}
    onPress={()=>navigation.navigate('ClinicDetails',{clinic:item})}>
      <Image source={{ uri: `http://10.0.2.2:5000/uploads/${item.image}` }} style={styles.imageClinic} />
      <Text style={styles.itemText}>{item.name}</Text>
    </TouchableOpacity>
  );




  const renderImageItem = ({ item }) => (
    <TouchableOpacity style={styles.imageItem}>
      <Image source={{ uri: item.url }} style={styles.image} />
    </TouchableOpacity>
  );
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.carousalTitle}>Features Images</Text>
      <FlatList
        data={images}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        renderItem={renderImageItem}
        contentContainerStyle={styles.carouselContainer}
      />

      <Text style={styles.title}>select clinics</Text>

      <FlatList
        data={clinics}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        renderItem={renderClinicItem}
        contentContainerStyle={styles.clinicContainer}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: width * 0.05,
    backgroundColor: "#fff",
  },
  imageItem: {
    width: width * 0.8,
    marginRight: width * 0.02,
    // height:height*0.3
  },
  image: {
    width: "100%",
    height: "100%",
    // borderRadius:width*0.06/2,
    // marginRight:width*0.02,
    // marginBottom:width*0.02,
    // marginTop:width*0.02,
    // marginLeft:width*0.02,
    // borderWidth:1,
    // borderColor:'#000'
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
  clinicContainer:{
    flexDirection:'row',
    // flexWrap:'wrap',
    justifyContent:'space-between'
  },
  clinicItem:{
    alignItems: 'center',
    justifyContent:'center',
    padding:width*0.05,
    marginHorizontal:width*0.02,
    borderWidth:1,
    borderColor:'#000',
    borderRadius:width*0.05/2,
    width:width*0.4,
    height:width*0.4,
    marginBottom:width*0.02,
  },
  imageClinic:{
    width:width*0.25,
    height:width*0.25,
    borderRadius:width*0.125,
    marginBottom:width*0.02,
    marginTop:width*0.02,
    marginLeft:width*0.02,
    marginRight:width*0.02,
    borderWidth:1,
  }
});
