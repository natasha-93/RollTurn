import React, {useState, useContext} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import {Icon} from 'react-native-elements';
import Die, {DieValue} from './Die';
import {colors} from './models/color';
import {PlayerContext} from './context/player';
import LinearGradient from 'react-native-linear-gradient';

function rollDie(min: DieValue = 1, max: DieValue = 6): DieValue {
  return Math.floor(Math.random() * (max - min) + min) as DieValue;
}

export default function HomeScreen() {
  const [dice, setDice] = useState<DieValue[]>([rollDie()]);
  const [turnIndex, setTurnIndex] = useState(0);
  const {players, setPlayers} = useContext(PlayerContext);

  const total = dice.reduce((sum, die) => sum + die, 0);

  players[turnIndex]?.color.value ?? colors[0].value;

  return (
    <View>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={styles.scrollView}>
          <LinearGradient
            colors={[players[turnIndex]?.color.value ?? '#a8edea', 'white']}
            style={styles.linearGradient}>
            <View
              style={{
                ...styles.appContainer,
              }}>
              <TouchableOpacity
                style={styles.rollBtn}
                onPress={() => {
                  setDice((dice) => dice.map(() => rollDie()));
                  setTurnIndex((turnIndex) => {
                    if (turnIndex < players.length - 1) {
                      return turnIndex + 1;
                    } else {
                      return 0;
                    }
                  });
                }}>
                <Text style={styles.btnText}>Roll Dice</Text>
              </TouchableOpacity>

              <View style={styles.buttonContainer}>
                <TouchableOpacity
                  style={{
                    ...styles.dieNumberBtn,
                    opacity: dice.length > 5 ? 0.3 : 1,
                  }}
                  disabled={dice.length > 5}
                  onPress={() => setDice((dice) => [...dice, rollDie()])}>
                  <Text style={styles.btnText}>+</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{
                    ...styles.dieNumberBtn,
                    opacity: dice.length <= 1 ? 0.3 : 1,
                  }}
                  disabled={dice.length <= 1}
                  onPress={() => setDice((dice) => dice.slice(0, -1))}>
                  <Text style={styles.btnText}>-</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.detailsContainer}>
                <View style={styles.diceContainer}>
                  {dice.map((die, i) => (
                    <Die
                      key={i}
                      value={die}
                      style={styles.die}
                      // size={dice.length > 4 ? 70 : 100}
                      size={100 - dice.length * 5}
                    />
                  ))}
                </View>

                <Text style={styles.total}>{total}</Text>
                {players.length > 0 && (
                  <>
                    <Text style={styles.playerTurn}>
                      {players[turnIndex].name}
                    </Text>
                    <TouchableOpacity
                      style={styles.rollBtn}
                      onPress={() => {
                        setDice((dice) => dice.map(() => rollDie()));
                      }}>
                      <Icon name="refresh" type="ionicons" size={30} />
                    </TouchableOpacity>
                  </>
                )}
              </View>
            </View>
          </LinearGradient>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    minHeight: '100%',
  },
  appContainer: {
    flex: 1,
    alignItems: 'center',
    minHeight: '100%',
    minWidth: '100%',
  },
  linearGradient: {
    flex: 1,
    minWidth: '100%',
    minHeight: '100%',
  },
  buttonContainer: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 10,
  },
  rollBtn: {
    marginTop: 5,
    padding: 20,
  },
  dieNumberBtn: {
    padding: 15,
    marginLeft: 25,
    marginRight: 25,
  },
  btnText: {
    fontSize: 40,
  },
  diceContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    maxWidth: 300,
  },
  die: {
    margin: 20,
  },
  detailsContainer: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
    // height: 500,
  },
  total: {
    fontWeight: 'bold',
    fontSize: 80,
  },
  playerTurn: {
    fontSize: 40,
  },
});
