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
  Modal,
  TouchableHighlight,
} from 'react-native';
import Die, {DieValue} from './Die';
import ColorPicker from './ColorPicker';
import {Color, ColorId} from './models/color';

type Player = {
  name: string;
  color: Color;
};

export const colors: Color[] = [
  {
    id: 'ORANGE',
    value: '#FFA500',
  },
  {
    id: 'YELLOW',
    value: '#F3F925',
  },
  {
    id: 'WHITE',
    value: '#FFFFFF',
  },
  {
    id: 'RED',
    value: '#F92525',
  },
];

function rollDie(min: DieValue = 1, max: DieValue = 6): DieValue {
  return Math.floor(Math.random() * (max - min) + min) as DieValue;
}

const App = () => {
  const [dice, setDice] = useState<DieValue[]>([rollDie()]);
  const [players, setPlayers] = useState<Player[]>([]);
  const [newPlayer, setNewPlayer] = useState<Player>({
    name: '',
    color: colors[0],
  });
  const [turnIndex, setTurnIndex] = useState(0);
  const [settingsModalVisible, setSettingsModalVisible] = useState(true);
  const total = dice.reduce((sum, die) => sum + die, 0);

  function getNextColor(players: Player[]) {
    const colorIndex = players.length % colors.length;
    return colors[colorIndex];
  }

  function addPlayer() {
    const newPlayers = [...players, newPlayer];
    setPlayers(newPlayers);
    setNewPlayer({
      name: '',
      color: getNextColor(newPlayers),
    });
  }

  return (
    <>
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
            <View>
              {/* Players Settings */}
              <Modal
                animationType="fade"
                transparent={true}
                visible={settingsModalVisible}>
                <View>
                  <View style={styles.modalView}>
                    <TouchableHighlight
                      onPress={() => setSettingsModalVisible(false)}>
                      <Text>Close</Text>
                    </TouchableHighlight>
                    <View style={styles.playerInputs}>
                      <TextInput
                        style={styles.input}
                        value={newPlayer.name}
                        onChangeText={(name) =>
                          setNewPlayer({...newPlayer, name})
                        }
                        onSubmitEditing={() => {
                          addPlayer();
                        }}
                      />
                      <ColorPicker
                        selected={newPlayer.color}
                        onChange={(color) => {
                          setNewPlayer((newPlayer) => ({
                            ...newPlayer,
                            color,
                          }));
                        }}
                        options={colors}
                      />
                    </View>

                    <View>
                      {players.map((player, i) => (
                        <View key={i} style={styles.playerInputs}>
                          <Text
                            onPress={() => {
                              setPlayers((players) =>
                                players.filter((player, index) => index !== i),
                              );
                            }}>
                            X
                          </Text>
                          <TextInput
                            style={styles.input}
                            value={player.name}
                            onChangeText={(name) =>
                              setPlayers((players) =>
                                players.map((player, index) => {
                                  if (index !== i) return player;

                                  return {
                                    ...player,
                                    name,
                                  };
                                }),
                              )
                            }
                            onSubmitEditing={() => {
                              addPlayer();
                            }}
                          />
                          <ColorPicker
                            selected={player.color}
                            onChange={(color) => {
                              setPlayers((players) =>
                                players.map((player, index) => {
                                  if (index !== i) return player;

                                  return {
                                    ...player,
                                    color,
                                  };
                                }),
                              );
                            }}
                            options={colors}
                          />
                        </View>
                      ))}
                    </View>
                  </View>
                </View>
              </Modal>

              <TouchableHighlight
                onPress={() => {
                  setSettingsModalVisible(true);
                }}>
                <Text>Edit Players</Text>
              </TouchableHighlight>
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
  playerInputs: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 20,
  },
  input: {
    fontSize: 20,
    height: 40,
    width: 150,
    borderColor: 'black',
    borderWidth: 1,
    backgroundColor: 'white',
    padding: 5,
    marginRight: 5,
  },
  buttonContainer: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 10,
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

  modalView: {
    marginTop: 50,
    // flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  // openButton: {
  //   borderRadius: 80,
  //   width: 40,
  //   height: 40,
  //   borderWidth: 3,
  //   borderColor: 'black',
  //   elevation: 2,
  // },
});

export default App;
