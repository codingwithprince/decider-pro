import React from 'react';
import { SafeAreaView, StyleSheet, Text, View, TouchableOpacity, TextInput, Image } from 'react-native';
import WheelOfFortune from 'react-native-wheel-of-fortune';
import Icon from 'react-native-vector-icons/MaterialIcons';

export default function Spinner({ navigation, route }) {
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
  const removeWinner = () => {
    for (let i = 0; i < participants.length; i++) {
      if (participants[i] === participants[winnerIndex]) {
        participants.splice(i, 1)
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
          <TouchableOpacity style={styles.startButton} onPress={() => buttonPress()}>
            <Text style={{ color: '#fff', paddingRight: 5 }}>Spin</Text>
            <Icon style={{ color: '#fff' }} name='arrow-forward' size={20} />
          </TouchableOpacity>
        </View>
      )}

      {/* === showing results === */}
     
        {winnerIndex != null && (
          <View style={styles.winnerView}>
            <Image style={[styles.winnerImg, {height:50, marginBottom:10}]} source={require('../assets/cel.gif') } />
           {/* <Text style={{fontSize:15, textTransform:'uppercase'}}>Results</Text> */}
            <Text style={styles.winnerText}>{participants[winnerIndex]}</Text>
            <Image style={styles.winnerImg} source={require('../assets/winner.gif') } />
        </View>
        )}
      

      {/* ======== Try Again ========== */}
      {winnerIndex != null && (
        <View style={styles.startButtonView}>
          {/* === checking if there is only two participant left === */}
          {
            participants.length == 2 ? null
              :
              <TouchableOpacity style={styles.startButton}
                onPress={() => {
                  removeWinner()
                  setWinnerIndex(null)
                  child._tryAgain();
                }}>
                <Text style={{ color: '#fff', paddingRight: 5 }}>Spin</Text>
                <Icon style={{ color: '#fff' }} name='arrow-forward' size={20} />
              </TouchableOpacity>
          }
        </View>
      )}

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems:'center',
    justifyContent:'center'
  },
  wheelContainer: {
    width: '100%',
    position: 'absolute',
    top: 200
  },
  startButtonView: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    bottom: 40
  },
  startButton: {
    flexDirection: 'row',
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: '#00a3e9',
    padding: 7,
    paddingHorizontal: 15,
    borderRadius: 5
  },
  startButtonText: {
    fontSize: 50,
    color: '#fff',
    fontWeight: 'bold',
  },
  winnerView: {
    height:70,
    flexDirection:'row',
    position: 'absolute',
    paddingHorizontal: 10,
    paddingVertical: 10,
    alignItems: 'center',
    backgroundColor: '#fff',
    elevation: 20,
    borderRadius:10,
    marginHorizontal:10
  },
  tryAgainButton: {
    padding: 10,
  },
  winnerImg:{
    height:50,
    width:50
  },
  winnerText: {
    fontSize: 25,
    textTransform: 'uppercase',
    marginHorizontal:20
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