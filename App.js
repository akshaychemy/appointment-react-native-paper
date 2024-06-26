import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { AuthProvider } from './context/AuthContext';
import { NavigationContainer } from '@react-navigation/native';

//screens
import HomeScreen from './screens/HomeScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import ClinicDetails from './screens/ClinicDetails';
import AppointmentScreen from './screens/AppointmentScreen';

const stack =createStackNavigator()

export default function App() {
  return (
    <AuthProvider>
      <NavigationContainer>
        <stack.Navigator initialRouteName='Home'>
          <stack.Screen name="Register" component={RegisterScreen} />
          <stack.Screen name="Login" component={LoginScreen} />
          <stack.Screen name="Home" component={HomeScreen} options={{headerShown:false}} />
          <stack.Screen name="Appointment" component={AppointmentScreen} />
          <stack.Screen name="ClinicDetails" component={ClinicDetails} />
        </stack.Navigator>
      </NavigationContainer>
    </AuthProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
