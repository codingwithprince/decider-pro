import React from 'react';
import Spinner from './screens/Spinner';
import Home from './screens/Home'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

export default function App() {
  
  const Stack = createNativeStackNavigator();

  
  return (

    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={Home}
          options={{ title: 'Participants',
        headerStyle:{
          // backgroundColor:'#ff3939'
          backgroundColor:'#E9003E',
        },
        headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
        />
        <Stack.Screen name="Spinner" component={Spinner} 
        options={{ title: 'Get Winner',
        headerStyle:{
          backgroundColor:'#E9003E',
        },
        headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
