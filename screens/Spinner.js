import React from 'react';
import { SafeAreaView, StyleSheet, Text, View, TouchableOpacity, TextInput, Image, ImageBackground } from 'react-native';
import WheelOfFortune from 'react-native-wheel-of-fortune';
import Icon from 'react-native-vector-icons/MaterialIcons';

import {
  AdMobBanner,
  AdMobInterstitial
} from 'expo-ads-admob';

export default function Spinner({ navigation, route }) {
  const [child, setChild] = React.useState(null);
  const [winnerValue, setWinnerValue] = React.useState(null);
  const [winnerIndex, setWinnerIndex] = React.useState(null);
  const [started, setStarted] = React.useState(false);
  const participants = route.params.name;

// this is admob
  const bannerID = "ca-app-pub-5240090040309390/8358015989";
  const intAdID = "ca-app-pub-5240090040309390/2722545929"; 
 
// this is test
  // const bannerID = "ca-app-pub-3940256099942544/6300978111";
  // const intAdID = "ca-app-pub-3940256099942544/1033173712";

  // interstitial ad
  const interstitial = async () => {
    await AdMobInterstitial.setAdUnitID(intAdID);
    try {
      await AdMobInterstitial.requestAdAsync();
      await AdMobInterstitial.showAdAsync();
    } catch (error) {
      console.log(error)
    }
  }

  React.useEffect(()=>{
    if(started == false){
      interstitial();
    }
  },[])
  
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

 {/* =========== H O M E   A D M O B ========== */}
           <AdMobBanner
              style={{ position:'absolute', top:0}}
              bannerSize="fullBanner"
              adUnitID={bannerID}
            />


      {/* === Checking Started Or Not === */}
      {!started && (
        <View style={styles.startButtonView}>
          <TouchableOpacity style={styles.startButton} onPress={() => buttonPress()}>
            <Text style={{ color: '#fff', paddingRight: 5 }}>GET WINNER</Text>
            <Icon style={{ color: '#fff' }} name='sync' size={20} />
          </TouchableOpacity>
        </View>
      )}

      {/* === showing results === */}

      {winnerIndex != null && (
        <View style={styles.winnerView}>
          <ImageBackground source={require('../assets/party.gif')} style={{width:'100%', height:'100%', alignItems:'center', justifyContent:'center'}}>
            <View style={{backgroundColor:'#fff', alignItems:'center', borderRadius:7}}>
              <View style={{ flexDirection: 'row' }}>
                <Image style={[styles.winnerImg, { marginBottom: 10, paddingBottom: 10 }]} source={require('../assets/cel.gif')} />
                <Text style={{ fontSize: 15, textTransform: 'uppercase', marginTop: 7,color:'#444' }}>winner</Text>
                <Image style={[styles.winnerImg, { marginBottom: 10, paddingBottom: 10 }]} source={require('../assets/cel.gif')} />
              </View>
              <Text style={styles.winnerText}>{participants[winnerIndex]}</Text>
          </View>
          </ImageBackground>
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
                <Text style={{ color: '#fff', paddingRight: 5 }}>GET WINNER</Text>
                <Icon style={{ color: '#fff' }} name='sync' size={20} />
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
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor:'#e3e3e3'
    // backgroundColor: '#E3E3E3'
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
    bottom: 10
  },
  startButton: {
    flexDirection: 'row',
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: '#0086F5',
    padding: 7,
    paddingHorizontal: 15,
    borderRadius: 5,
    marginBottom:10
  },
  startButtonText: {
    fontSize: 50,
    color: '#fff',
    fontWeight: 'bold',
  },
  winnerView: {
    height: 180,
    width: '70%',
    flexDirection: 'column',
    justifyContent: 'space-around',
    position: 'absolute',
    paddingHorizontal: 10,
    alignItems: 'center',
    backgroundColor: '#fff',
    elevation: 20,
    borderRadius: 10,
    marginHorizontal: 10
  },
  tryAgainButton: {
    padding: 10,
  },
  winnerImg: {
    height: 30,
    width: 30,
    marginHorizontal: 20
  },
  winnerText: {
    fontSize: 30,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    marginHorizontal: 20,
    color:'#333'
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