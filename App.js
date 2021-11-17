import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { SafeAreaView, StyleSheet, Text, View, TouchableOpacity, TextInput } from 'react-native';
import WheelOfFortune from 'react-native-wheel-of-fortune';
import Icon from 'react-native-vector-icons/MaterialIcons'

export default function App() {
  const [child, setChild] = React.useState(null);
  const [winnerValue, setWinnerValue] = React.useState(null);
  const [winnerIndex, setWinnerIndex] = React.useState(null);
  const [started, setStarted] = React.useState(false);
  const [input, setInput] = React.useState('');
  

const p = ['prince', 'asdf']

  const buttonPress = () => {
    setStarted(true);
    child._onPress();
  };

  const addTextToParticipantsList = () =>{
    setInput('')
    p.push([...p,input])
    console.log(p);
  }

  // const wheelOptions = {
  //   rewards: participants,
  //   knobSize: 30,
  //   borderWidth: 5,
  //   borderColor: '#fff',
  //   innerRadius: 30,
  //   duration: 5000,
  //   backgroundColor: 'transparent',
  //   textAngle: 'horizontal',
  //   knobSource: require('./knob.png'),
  //   onRef: ref => setChild(ref),
  // };

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

 <WheelOfFortune
            options={
              {
                rewards: p,
                knobSize: 30,
                borderWidth: 5,
                borderColor: '#fff',
                innerRadius: 30,
                duration: 5000,
                backgroundColor: 'transparent',
                textAngle: 'horizontal',
                knobSource: require('./knob.png'),
                onRef: ref => setChild(ref),
              }
            }
            getWinner={(value, index) => {
            setWinnerValue(value);
            setWinnerIndex(index)
          }}
      />
      {/* <WheelOfFortune
            options={
              {
                rewards: participants,
                knobSize: 30,
                borderWidth: 5,
                borderColor: '#fff',
                innerRadius: 30,
                duration: 5000,
                backgroundColor: 'transparent',
                textAngle: 'horizontal',
                knobSource: require('./knob.png'),
                onRef: ref => setChild(ref),
              }
            }
            getWinner={(value, index) => {
            setWinnerValue(value);
            setWinnerIndex(index)
          }}
        /> */}

      {/* === Checking Started Or Not === */}
       {!started && (
          <View style={styles.startButtonView}>
            <TouchableOpacity
              onPress={() => buttonPress()}
              style={styles.startButton}>
              <Text style={styles.startButtonText}>Spin to win!</Text>
            </TouchableOpacity>
          </View>
        )}

      {/* === showing results === */}
      {winnerIndex != null && (
          <View style={styles.winnerView}>
            <Text style={styles.winnerText}>
              You win {participants[winnerIndex]}
            </Text>
            <TouchableOpacity
              onPress={() => {
                setWinnerIndex(null)
                child._tryAgain();
              }}
              style={styles.tryAgainButton}>
              <Text style={styles.tryAgainText}>TRY AGAIN</Text>
            </TouchableOpacity>
          </View>
        )}

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#222',
    marginTop:30
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
  startButtonView: {
    position: 'absolute',
  },
  startButton: {
    backgroundColor: 'rgba(0,0,0,.5)',
    marginTop: 50,
    padding: 5,
  },
  startButtonText: {
    fontSize: 50,
    color: '#fff',
    fontWeight: 'bold',
  },
  winnerView: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
  },
  tryAgainButton: {
    padding: 10,
  },
  winnerText: {
    fontSize: 30,
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