import React, {useState, useContext} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import {Icon} from 'react-native-elements';
import Die, {DieValue} from './Die';
import {colors} from './models/color';
import {PlayerContext} from './context/player';
import LinearGradient from 'react-native-linear-gradient';
import {
  TouchableWithoutFeedback,
  TouchableHighlight,
} from 'react-native-gesture-handler';

function rollDie(min: DieValue = 1, max: DieValue = 6): DieValue {
  return Math.floor(Math.random() * (max - min) + min) as DieValue;
}

export default function HomeScreen() {
  const [dice, setDice] = useState<DieValue[]>([rollDie()]);
  const [turnIndex, setTurnIndex] = useState(0);
  const {players} = useContext(PlayerContext);

  const total = dice.reduce((sum, die) => sum + die, 0);

  players[turnIndex]?.color.value ?? colors[0].value;

  return (
    <SafeAreaView style={{flex: 1}}>
      <LinearGradient
        colors={[players[turnIndex]?.color.value ?? '#a8edea', 'white']}
        style={styles.linearGradient}>
        <TouchableOpacity
          style={{flex: 1, minWidth: '100%'}}
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
          <ScrollView
            contentInsetAdjustmentBehavior="automatic"
            contentContainerStyle={{minHeight: '100%'}}
            style={{flex: 1}}>
            <View style={styles.rollBtn}>
              <Text style={styles.btnText}>Roll Dice</Text>
            </View>

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

            <View style={styles.diceContainer}>
              {dice.map((die, i) => (
                <Die
                  key={i}
                  value={die}
                  style={styles.die}
                  size={100 - dice.length * 7}
                />
              ))}
            </View>
            <View style={styles.detailsContainer}>
              <Text style={styles.total}>{total}</Text>
              {players.length > 0 && (
                <>
                  <Text style={styles.playerTurn}>
                    {players[turnIndex].name}
                  </Text>

                  <TouchableOpacity
                    onPress={() => {
                      setDice((dice) => dice.map(() => rollDie()));
                    }}>
                    <Icon name="refresh" type="ionicons" size={30} />
                  </TouchableOpacity>
                </>
              )}
            </View>
          </ScrollView>
        </TouchableOpacity>
      </LinearGradient>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  linearGradient: {
    flex: 1,
    alignItems: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  rollBtn: {
    padding: 20,
    alignItems: 'center',
  },
  dieNumberBtn: {
    padding: 10,
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
    alignItems: 'center',
    marginLeft: 'auto',
    marginRight: 'auto',
    maxWidth: 330,
  },
  die: {
    margin: 20,
  },
  detailsContainer: {
    flex: 1,
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  total: {
    fontWeight: 'bold',
    fontSize: 70,
  },
  playerTurn: {
    fontSize: 40,
  },
});
