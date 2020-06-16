/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, {useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Button,
  TextInput,
} from 'react-native';
import Die, {DieValue} from './Die';

type Color = 'ORANGE' | 'YELLOW' | 'WHITE' | 'LIGHTPINK';

type Player = {
  name: string;
  color: Color;
};

const colors: Color[] = ['ORANGE', 'YELLOW', 'WHITE', 'LIGHTPINK'];

function rollDie(min: DieValue = 1, max: DieValue = 6): DieValue {
  return Math.floor(Math.random() * (max - min) + min) as DieValue;
}

const App = () => {
  const [dice, setDice] = useState<DieValue[]>([rollDie()]);
  const [players, setPlayers] = useState<Player[]>([]);
  const [newPlayerName, setNewPlayerName] = useState('');
  const [turnIndex, setTurnIndex] = useState(0);
  const total = dice.reduce((sum, die) => sum + die, 0);
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={{
            ...styles.scrollView,
            // backgroundColor: 'grey',
            backgroundColor: `${(
              players[turnIndex]?.color ?? 'orange'
            ).toLowerCase()}`,
          }}>
          <View
            style={{
              ...styles.appContainer,
            }}>
            <View>
              <TextInput
                style={{
                  height: 40,
                  width: 150,
                  borderColor: 'gray',
                  borderWidth: 1,
                  backgroundColor: 'white',
                  margin: 10,
                }}
                value={newPlayerName}
                onChangeText={(text) => setNewPlayerName(text)}
                onSubmitEditing={() => {
                  setPlayers([
                    ...players,
                    {name: newPlayerName, color: colors[players.length]},
                  ]);
                  setNewPlayerName('');
                }}
              />
            </View>
            <Button
              title="Roll Dice"
              onPress={() => {
                setDice((dice) => dice.map(() => rollDie()));
                setTurnIndex((turnIndex) => {
                  if (turnIndex < players.length - 1) {
                    return turnIndex + 1;
                  } else {
                    return 0;
                  }
                });
              }}
            />
            <View style={styles.buttonContainer}>
              <Button
                title="+"
                onPress={() => setDice((dice) => [...dice, rollDie()])}
              />
              <Button
                title="-"
                onPress={() => setDice((dice) => dice.slice(0, -1))}
              />
            </View>

            <View style={styles.diceContainer}>
              {dice.map((die, i) => (
                <Die key={i} value={die} style={styles.die} />
              ))}
            </View>
            <Text style={styles.total}>{total}</Text>
            {players.length > 0 && <Text>{players[turnIndex].name}</Text>}
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

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
    margin: 30,
  },
  diceContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  die: {
    margin: 20,
  },
  total: {
    fontWeight: 'bold',
    fontSize: 30,
    marginTop: 20,
  },
});

export default App;
