import React from 'react';
import { SafeAreaView, StyleSheet, Text, View, TouchableOpacity, TextInput } from 'react-native';
import WheelOfFortune from 'react-native-wheel-of-fortune';

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


  const wheelOptions = {
    rewards: participants,
    knobSize: 30,
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

    </View>
  );
}

const styles = StyleSheet.create({
  container:{
    flex:1
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