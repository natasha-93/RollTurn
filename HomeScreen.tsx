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
import Die, {DieValue} from './Die';
import {colors} from './App';
import {PlayerContext} from './context/player';

function rollDie(min: DieValue = 1, max: DieValue = 6): DieValue {
  return Math.floor(Math.random() * (max - min) + min) as DieValue;
}

export default function HomeScreen() {
  const [dice, setDice] = useState<DieValue[]>([rollDie()]);
  const [turnIndex, setTurnIndex] = useState(0);
  const {players, setPlayers} = useContext(PlayerContext);

  const total = dice.reduce((sum, die) => sum + die, 0);

  return (
    <View>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={{
            ...styles.scrollView,
            backgroundColor: players[turnIndex]?.color.value ?? colors[0].value,
          }}>
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
                style={styles.dieNumberBtn}
                onPress={() => setDice((dice) => [...dice, rollDie()])}>
                <Text style={styles.btnText}>+</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.dieNumberBtn}
                onPress={() => setDice((dice) => dice.slice(0, -1))}>
                <Text style={styles.btnText}>-</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.diceContainer}>
              {dice.map((die, i) => (
                <Die key={i} value={die} style={styles.die} />
              ))}
            </View>
            <View style={styles.detailsContainer}>
              <Text style={styles.total}>{total}</Text>
              {players.length > 0 && (
                <Text style={styles.playerTurn}>{players[turnIndex].name}</Text>
              )}
            </View>
          </View>
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
    alignItems: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 10,
  },
  rollBtn: {
    marginTop: 10,
  },
  dieNumberBtn: {
    padding: 8,
    marginLeft: 10,
    marginRight: 10,
  },
  btnText: {
    fontSize: 30,
  },
  diceContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  die: {
    margin: 20,
  },
  detailsContainer: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
    height: 500,
  },
  total: {
    fontWeight: 'bold',
    fontSize: 50,
    marginTop: 40,
  },
  playerTurn: {
    fontSize: 30,
  },
});
