import { StatusBar } from "expo-status-bar";
import {
    Alert,
  Dimensions,
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Button
} from "react-native";

import { getClinics, getDoctors } from "../src/api";
import React, { useEffect } from "react";

const { width, height } = Dimensions.get("window");

export default function ClinicDetails({ route, navigation }) {
  const { clinic } = route.params;

  const [selectedService, setSelectedService] = React.useState(null);
  const [selectedDoctor, setSelectedDoctor] = React.useState(null);

  const [doctors, setDoctor] = React.useState([]);

  useEffect(() => {
    getDoctors().then((res) => {
      setDoctor(res);
    });
  }, []);

  const toggleService = (service) => {
    if (selectedService === service) {
      setSelectedService(null);
    } else {
      setSelectedService(service);
    }
  };

  const handleAppointmentClick = () => {
    if (selectedService && selectedDoctor) {
      navigation.navigate("Appointment", {
        clinic,
        selectedService,
        selectedDoctor,
      });
    }else{
        Alert.alert('Error', 'Please select both service and doctor');
    }
  };

  const selectedDoctorInsance =(doc)=>{
    setSelectedDoctor(doc)
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.clinicHeader}>
        <Image
          source={{ uri: `http://10.0.2.2:5000/uploads/${clinic.image}` }}
          style={styles.image}
        />
        <Text style={styles.title}>{clinic.name}</Text>
        <Text style={styles.titledesc}>{clinic.description}</Text>
      </View>

      <Text style={styles.sectionTitle}>services Offered</Text>
      <View style={styles.serviceContainer}>
        {clinic.services.map((service, index) => {
          return (
            <TouchableOpacity
              key={index}
              style={[
                styles.serviceItem,
                selectedService === service && styles.selectedSeviceItem,
              ]}
              onPress={() => toggleService(service)}
            >
              <Text style={styles.serviceText}>{service}</Text>
            </TouchableOpacity>
          );
        })}
      </View>
      {selectedService && (
        <>
          <Text style={styles.sectionTitle}>Select Doctor</Text>
          <View style={styles.doctorConatiner}>
            {doctors.map((doctor, index) => {
              return (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.item,
                    selectedDoctor == doctor && styles.selectedItem,
                  ]}
                  onPress={() =>
                    selectedDoctorInsance(doctor)
                  }
                >
                  <Image
                    source={{
                      uri: `http://10.0.2.2:5000/uploads/${doctor.image}`,
                    }}
                    style={styles.image}
                  />
                  <Text style={styles.itemText}>{doctor.name}</Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </>
      )}


      <Button
        title="Book Appointment"
        onPress={handleAppointmentClick}
        disabled={!selectedService || !selectedDoctor}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: width * 0.05,
  },
  clinicHeader: {
    alignItems: "center",
    marginBottom: height * 0.02,
  },
  title: {
    fontSize: width * 0.06,
    textAlign: "center",
    fontWeight: "bold",
    color: "#000",
    marginVertical: height * 0.01,
  },
  titledesc: {
    fontSize: width * 0.04,
    textAlign: "center",
    color: "#000",
    marginVertical: height * 0.01,
  },
  image: {
    width: width * 0.9,
    height: height * 0.3,
    borderRadius: 8,
    marginVertical: height * 0.01,
    resizeMode: "cover",
  },
  serviceContainer: {
    marginBottom: height * 0.02,
  },
  selectedItem: {
    backgroundColor: "lightblue",
    color: "#fff",
    borderRadius:'50%'
  },
  serviceItem: {
    padding: height * 0.01,
    marginVertical: height * 0.01,
    marginHorizontal: width * 0.02,
    backgroundColor: "#fff",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#000",
  },
  selectedSeviceItem: {
    backgroundColor: "lightblue",
  },
  serviceText: {
    fontSize: width * 0.04,
    textAlign: "center",
    color: "#000",
  },
  sectionTitle: {
    fontSize: width * 0.05,
    textAlign: "center",
    fontWeight: "bold",
    color: "#000",
    marginVertical: height * 0.01,
  },
  image:{
    width: width * 0.25,
    height: width * 0.25,
    borderRadius: 50,
    marginVertical: height * 0.01,
    resizeMode: "cover",
  },
  doctorConatiner:{
    flexDirection:'row',
    flexWrap:'wrap',
    justifyContent: 'space-around'
  }
});
