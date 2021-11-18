import React from 'react';
import { SafeAreaView, StyleSheet, Text, View, TouchableOpacity, TextInput, Button } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const Home = ({navigation}) => {
    const [input, setInput] = React.useState('');
    const [participants, setParticipants] = React.useState([])

    const addTextToParticipantsList = () =>{
        setInput('')
        setParticipants([...participants,input])
      }
    
    return (
        <SafeAreaView style={styles.container}>
            <Text>Decider Pro</Text>
            <View style={{flexDirection:'row', justifyContent:'center',alignItems:'center',marginHorizontal:10}}>
            <View style={styles.textInputContainer}>
                <TextInput value={input} onChangeText={(t)=> setInput(t)} placeholder="Your Text..." />
            </View>
            <View style={styles.inputButtonContainer}>
                <TouchableOpacity onPress={()=>{addTextToParticipantsList()}}>
                <Icon style={{color:'#fff'}} name='add' />
                </TouchableOpacity>
            </View>
            </View>
        <Button title="CLick me" onPress={()=> navigation.navigate('Spinner', {name: participants}) } />
        </SafeAreaView>
    );
};

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
export default Home;