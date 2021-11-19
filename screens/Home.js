import React from 'react';
import { SafeAreaView, StyleSheet, Text, View, TouchableOpacity, TextInput, Image, Alert, ScrollView, ToastAndroid } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const Home = ({navigation}) => {
    const [input, setInput] = React.useState('');
    const [participants, setParticipants] = React.useState([])

    const addTextToParticipantsList = () =>{
        if(input == ''){
          Alert.alert('Wrong input', `No input was found. Please type something`)
        }
        else{
          if(!participants.includes(input)){
            setParticipants([...participants,input])
            setInput('')
          } else{
            setInput('')
            ToastAndroid.show("Already Exist", ToastAndroid.SHORT)
          }
          
        }
      }

    // deleting item form list
    const deleteItem = (itemId) =>{
      const newLists = participants.filter( item => item != itemId);
      setParticipants(newLists)
    }

    // clear all array
    const clearArray = () => {
      Alert.alert('Confirm', 'Are you sure you want to clear all?', [
        {text: 'No'},
        {text: 'Yes', onPress: ()=> setParticipants([])}
      ]);
    }


    // list component
    const List = ({data}) => {
      return(
        <View style={styles.listStyle}>
          <Text style={{ textTransform:'capitalize',fontSize:15, paddingVertical:10, backgroundColor:'#E3E3E3'}}>{data}</Text>
          <TouchableOpacity onPress={()=> deleteItem(data)}>
            <Icon name="cancel" size={25} color="#ff3939" />
          </TouchableOpacity>
         
        </View>
      )
    }
    return (
        <SafeAreaView style={styles.container}>
          {/* === Header === */}
            <View style={{flexDirection:'row', justifyContent:'center',alignItems:'center',marginHorizontal:10}}>
              <View style={styles.textInputContainer}>
                  <TextInput value={input} onChangeText={(t)=> setInput(t)} placeholder="Your Text..." onSubmitEditing={()=>{addTextToParticipantsList()}} />
              </View>
              <TouchableOpacity style={styles.inputButtonContainer} onPress={()=>{addTextToParticipantsList()}}>
               <Icon style={{color:'#fff'}} name='add' size={20} />
              </TouchableOpacity>
            </View>

             {/* === blank Page === */}
              <View style={styles.blankPage}>
                  {
                      participants == '' &&  <View style={styles.emptyContainer}> 
                          <Image style={styles.addItemLogo} source={require('../assets/box.png')} />
                          <Text style={{fontSize: 20, color: '#777', marginVertical:10}}>No Items</Text>
                          <Text  style={{fontSize: 12, color: '#888', marginVertical:10, position:'absolute', bottom:10}}>Made By Prince</Text>
                      </View>
                    }
                </View>

            {/* === FlatList === */}
            {
              participants != '' && 
              <ScrollView 
              showsVerticalScrollIndicator={false}
              style={styles.flatListContainer}> 
                {
                  participants.map(d=> <List data={d} key={d} />)
                }
            </ScrollView>
            }
            

           
            {/* === home footer === */}
            { participants.length >= 2 && 
                                    <View style={styles.homeFooter}>
                                    <TouchableOpacity style={styles.clearBtn} onPress={()=> clearArray()}>
                                      <Icon style={{color:'#fff'}} name='delete' size={20} />
                                        <Text style={{color:'#fff', paddingRight:5}}>Clear</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={styles.nextBtn} onPress={()=> navigation.navigate('Spinner', {name: participants}) }>
                                        <Text style={{color:'#fff', paddingRight:5}}>Next</Text>
                                        <Icon style={{color:'#fff'}} name='done' size={20} />
                                    </TouchableOpacity>
                                    {/* <Button title="Next" onPress={()=> navigation.navigate('Spinner', {name: participants}) } /> */}
                                    </View>
            }
            
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      backgroundColor:'#E3E3E3'
    },
    textInputContainer:{
      flex:1,
      borderRadius:7,
      paddingVertical:10,
      paddingHorizontal:10,
      backgroundColor:'#fff',
      marginVertical:10,
      elevation:5
    },
    inputButtonContainer:{
      height:40,
      width:40,
      justifyContent:'center',
      alignItems:'center',
      backgroundColor:'#00C36C',
      borderRadius:25,
      marginLeft:10,
      elevation:10
    },
    flatListContainer:{
      width:'100%',
      paddingHorizontal:10,
      paddingBottom:100,
      marginBottom:80
    },
    listStyle:{
      marginHorizontal:15,
      paddingVertical:3,
      borderBottomWidth:2, 
      borderBottomColor:'#d6d6d6',
      flexDirection:'row',
      justifyContent:'space-between',
      alignItems:'center'
    },
    homeFooter:{
      position:'absolute',
      bottom:30,
      flexDirection:'row',
      justifyContent:'space-around',
      alignItems:"center",
      width:'100%'
    },
    clearBtn:{
      flexDirection:'row',
      alignItems:"center",
      justifyContent:"center",
      backgroundColor:'#ff3939',
      paddingHorizontal:15,
      padding:7,
      borderRadius:5
    },
    nextBtn:{
      flexDirection:'row',
      alignItems:"center",
      justifyContent:"center",
      backgroundColor:'#00a3e9',
      padding:7,
      paddingHorizontal:15,
      borderRadius:5
    },
    emptyContainer:{
      flex:1,
      alignItems:'center',
      justifyContent:'center',
      marginBottom:100
    },
    addItemLogo:{
      height:100,
      width:100,
      opacity:0.5
    },
    blankPage:{
      alignItems:'center',
      justifyContent:'center'
    }
  });
export default Home;