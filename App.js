import React from 'react';
import { SafeAreaView, StyleSheet, Text, View, TouchableOpacity, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Spinner from './screens/Spinner';
import Home from './screens/Home'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

export default function App() {
  const [input, setInput] = React.useState('');
  const [participants, setParticipants] = React.useState(['sdf'])
  
  const Stack = createNativeStackNavigator();

  
  return (

    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={Home}
          options={{ title: 'Home' }}
        />
        <Stack.Screen name="Spinner" component={Spinner} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#222',
  },
  textInputContainer:{
    flex:1,
    borderRadius:7,
    paddingVertical:5,
    paddingHorizontal:5,
    backgroundColor:'#fff'
  },
  inputButtonContainer:{
    height:40,
    width:40,
    justifyContent:'center',
    alignItems:'center',
    backgroundColor:'#FFDD00',
    borderRadius:25,
    marginLeft:10
  },
});