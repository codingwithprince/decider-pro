import React from 'react';
import { SafeAreaView, StyleSheet, Text, View, TouchableOpacity, TextInput } from 'react-native';
import WheelOfFortune from 'react-native-wheel-of-fortune';
import Icon from 'react-native-vector-icons/MaterialIcons';

export default function Spinner({navigation,route}) {
  const [child, setChild] = React.useState(null);
  const [winnerValue, setWinnerValue] = React.useState(null);
  const [winnerIndex, setWinnerIndex] = React.useState(null);
  const [started, setStarted] = React.useState(false);
  
const participants = route.params.name;

  const buttonPress = () => {
    setStarted(true);
    child._onPress();
  };

  // removing winner
  const removeWinner = () =>{
      for(let i=0; i < participants.length; i++ ){
        if(participants[i] === participants[winnerIndex]){
           participants.splice(i,1)
        }
      }
  }

  const wheelOptions = {
    rewards: participants,
    knobSize: 20,
    borderWidth: 5,
    borderColor: '#fff',
    innerRadius: 30,
    duration: 6000,
    backgroundColor: 'transparent',
    textAngle: 'horizontal',
    knobSource: require('../knob.png'),
    onRef: ref => setChild(ref),
  };

  return (
    <View style={styles.container}>
      
        <WheelOfFortune
              options={wheelOptions}
              getWinner={(value, index) => {
              setWinnerValue(value);
              setWinnerIndex(index)
            }}
          />
    
     

      {/* === Checking Started Or Not === */}
       {!started && (
          <View style={styles.startButtonView}>
            <TouchableOpacity style={styles.startButton} onPress={()=> buttonPress() }>
                  <Text style={{color:'#fff', paddingRight:5}}>Spin</Text>
                  <Icon style={{color:'#fff'}} name='arrow-forward' size={20} />
              </TouchableOpacity>
          </View>
        )}

      {/* === showing results === */}
      {winnerIndex != null && (
          <View style={styles.winnerView}>
            <Text>Winner :  </Text>
            <Text style={styles.winnerText}>{participants[winnerIndex]} 🏆
            </Text>

            {/* === checking if there is only two participant left === */}
            {
              participants.length == 2 ? null
            :
            <TouchableOpacity
              onPress={() => {
                removeWinner()
                setWinnerIndex(null)
                child._tryAgain();
              }}
              style={styles.tryAgainButton}>
              <Text style={styles.tryAgainText}>TRY AGAIN</Text>
            </TouchableOpacity> 
            }
            {/* <TouchableOpacity
              onPress={() => {
                removeWinner()
                setWinnerIndex(null)
                child._tryAgain();
              }}
              style={styles.tryAgainButton}>
              <Text style={styles.tryAgainText}>TRY AGAIN</Text>
            </TouchableOpacity> */}
          </View>
        )}

    </View>
  );
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    flexDirection:'column',
  },
  wheelContainer:{
    width:'100%',
    position:'absolute',
    top:200
  },
  startButtonView:{
    flexDirection:'row',
    justifyContent:'center',
    alignItems:'center',
    bottom:40
  },
  startButton: {
      flexDirection:'row',
      alignItems:"center",
      justifyContent:"center",
      backgroundColor:'#00a3e9',
      padding:7,
      paddingHorizontal:15,
      borderRadius:5
  },
  startButtonText: {
    fontSize: 50,
    color: '#fff',
    fontWeight: 'bold',
  },
  winnerView: {
    width:'100%',
    position: 'absolute',
    paddingHorizontal:20,
    paddingVertical:10, 
    justifyContent:'center',   
    alignItems: 'center',
    backgroundColor:'#fff',
    elevation:20,
  },
  tryAgainButton: {
    padding: 10,
  },
  winnerText: {
    fontSize: 17,
    textTransform:'uppercase'
  },
  tryAgainButton: {
    padding: 5,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  tryAgainText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
});