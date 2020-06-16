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

type Color = 'ORANGE' | 'BLUE' | 'WHITE' | 'BLACK';

type Player = {
  name: string;
  color: Color;
};

function rollDie(min = 1, max = 6) {
  return Math.floor(Math.random() * (max - min) + min);
}

const App = () => {
  const [dice, setDice] = useState([rollDie()]);
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
          style={styles.scrollView}>
          <View style={styles.appContainer}>
            <View>
              <TextInput
                style={{
                  height: 40,
                  width: 150,
                  borderColor: 'gray',
                  borderWidth: 1,
                }}
                value={newPlayerName}
                onChangeText={(text) => setNewPlayerName(text)}
                onSubmitEditing={() => {
                  setPlayers([
                    ...players,
                    {name: newPlayerName, color: 'BLACK'},
                  ]);
                  setNewPlayerName('');
                }}
              />
            </View>
            <Button
              title="Roll Dice"
              onPress={() => {
                setDice((dice) => dice.map(() => rollDie()));
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
                <Text key={i} style={styles.die}>
                  {die}
                </Text>
              ))}
            </View>
            <Text style={styles.total}>{total}</Text>
            {players.map((player, i) => (
              <Text key={i}>{player.name}</Text>
            ))}
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: 'white',
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
    fontSize: 30,
    textAlign: 'center',
    textAlignVertical: 'center',
    height: 50,
    width: 50,
    borderStyle: 'solid',
    borderColor: 'black',
    borderWidth: 5,
  },
  total: {
    fontWeight: 'bold',
    fontSize: 30,
    marginTop: 20,
  },
});

export default App;
