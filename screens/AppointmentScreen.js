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
  Button,
} from "react-native";

import { bookAppointment, getClinics, getDoctors } from "../src/api";
import React, { useEffect, useState } from "react";
import { TextInput } from "react-native-paper";
import DateTimePicker from "@react-native-community/datetimepicker";
const { width, height } = Dimensions.get("window");

export default function AppointmentScreen({ route, navigation }) {
  const { clinic, selectedService, selectedDoctor } = route.params;
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);
  const [dateSelected, setDateSelected] = useState(false);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState(null);

  const timeSlots = [
    "09:00 AM",
    "10:00 AM",
    "11:00 AM",
    "12:00 AM",
    "01:00 PM",
    "02:00 PM",
    "03:00 PM",
    "04:00 PM",
    "05:00 PM",
    "06:00 PM",
    // "07:00 PM","08:00 PM","09:00 PM","10:00 PM","11:00 PM"
  ];

  const showDatePicker = () => {
    setShow(true);
    setMode('date');
  };

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setDate(currentDate);
    setShow(false);
    if (mode == "date") {
      setDateSelected(true);
    }
  };

  const handleConfirmedAppointment=async()=>{
    if(!name ||!phoneNumber || !dateSelected || !selectedTimeSlot){
        alert("Please select your name and phone number and time slot and date");
        return;
    }

    const appopintdata={
        name,
        phoneNumber,
        clinic:clinic._id,
        selectedDoctor:selectedDoctor._id,
        date:date.toDateString(),
        timeSlot:selectedTimeSlot,
        selectedService:selectedService
    };
    try{
        await bookAppointment(appopintdata);
        alert(`Appointment confirmed for ${name} with dr. ${selectedDoctor.name} at ${clinic.name} for ${selectedService} on ${date.toDateString()} at ${selectedTimeSlot}`)


    }catch(err){
        console.log(err);
    }

  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.clinicHeader}>
        <Text style={styles.text}>Clinic Name{clinic.name}</Text>
        <Text style={styles.text}>services:{selectedService}</Text>
        <Text style={styles.text}>Doctor: {selectedDoctor.name}</Text>
      </View>

      <TextInput
        style={styles.input}
        placeholder="Enter Your name"
        value={name}
        onChangeText={setName}
      />

      <TextInput
        style={styles.input}
        placeholder="Enter Your phone number"
        value={phoneNumber}
        onChangeText={setPhoneNumber}
        keyboardType="phone-pad"
      />

      <View>
        <Button onPress={showDatePicker} title="select Date" />
      </View>

      {show && (
        <DateTimePicker
          testID="datetimePicker"
          value={date}
          mode={mode}
          is24Hour={true}
          display="default"
          onChange={onChange}
        />
      )}

      {dateSelected && (
        <>
        <Text style={styles.title}>select Time Slots</Text>
          <View style={styles.timeSlotcontainer}>
            {timeSlots.map((timeSlot) => (
              <TouchableOpacity
                key={timeSlot}
                style={[styles.timeSlot,selectedTimeSlot===timeSlot && styles.selectedSlot]}
                onPress={() => setSelectedTimeSlot(timeSlot)}
              >
                <Text style={styles.slotText}>{timeSlot}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </>
      )}

      <Text>Selected date:{date.toDateString()}</Text>
      <Text>Selected Time:{selectedTimeSlot}</Text>
      <View>
        <Button
          title="Confimed Appointment"
          onPress={handleConfirmedAppointment}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrowl: 1,
    padding: width * 0.05,
    backgroundColor: "#fff",
    minHeight: height,
  },
  text:{
    fontSize:width * 0.04,
    marginBottom:height*0.01,
    color:'#333'
  },
  input:{
    width:'100%',
    height:height*0.05,
    borderColor:'#ccc',
    borderWidth:1,
    marginBottom:height*0.01,
    padding:height*0.01
  },
  timeSlotcontainer:{
    flexDirection:'row',
    flexWrap:'wrap',
    justifyContent:'space-between',
    marginBottom:height*0.02
  },
  timeSlot:{
    paddingVertical:height*0.02,
    paddingHorizontal:width*0.05,
    margin:width*0.01,
    borderWidth:1,
    alignItems: 'center',
    backgroundColor:'#fffff',
    borderRadius:10,
    marginBottom:height*0.01,
  },
  selectedSlot:{
    backgroundColor:'grey',
    borderColor:'#007bff',
  },
  slotText:{
    fontSize:width*0.04,
    color:'#33333'
  }

});
