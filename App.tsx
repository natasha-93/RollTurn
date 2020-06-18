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

type ColorId = 'ORANGE' | 'YELLOW' | 'WHITE' | 'RED';

type Color = {
  id: ColorId;
  value: string;
};

const colors: Color[] = [
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

type Player = {
  name: string;
  color: Color;
};

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
  const [modalVisible, setModalVisible] = useState(true);
  const total = dice.reduce((sum, die) => sum + die, 0);

  function getNextColor() {
    const colorIndex = players.length % colors.length;
    return colors[colorIndex];
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
              <View style={styles.newPlayerInputs}>
                <TextInput
                  style={{
                    height: 40,
                    width: 150,
                    borderColor: 'gray',
                    borderWidth: 1,
                    backgroundColor: 'white',
                  }}
                  value={newPlayer.name}
                  onChangeText={(name) => setNewPlayer({...newPlayer, name})}
                  onSubmitEditing={() => {
                    setPlayers([...players, newPlayer]);
                    setNewPlayer({name: '', color: getNextColor()});
                  }}
                />
                <Modal
                  animationType="slide"
                  transparent={true}
                  visible={modalVisible}>
                  <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                      {colors.map((color) => (
                        <TouchableHighlight
                          key={color.id}
                          onPress={() => {
                            setNewPlayer((newPlayer) => ({
                              ...newPlayer,
                              color,
                            }));
                            setModalVisible(!modalVisible);
                          }}
                          style={{
                            ...styles.openButton,
                            backgroundColor: color.value,
                          }}>
                          <Text />
                        </TouchableHighlight>
                      ))}

                      {/* <Text style={styles.modalText}>Many colors...</Text> */}
                      {/* <TouchableHighlight
                        style={{
                          ...styles.openButton,
                          backgroundColor: '#2196F3',
                        }}
                        onPress={() => {
                          setModalVisible(!modalVisible);
                        }}>
                        <Text style={styles.textStyle}>Hide Modal</Text>
                      </TouchableHighlight> */}
                    </View>
                  </View>
                </Modal>

                <TouchableHighlight
                  style={{
                    ...styles.openButton,
                    backgroundColor: newPlayer.color.value,
                  }}
                  onPress={() => {
                    setModalVisible(true);
                  }}>
                  <Text style={styles.textStyle}></Text>
                </TouchableHighlight>
              </View>
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
  newPlayerInputs: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 20,
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
  centeredView: {
    flex: 1,
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    marginTop: 50,
    flexDirection: 'row',
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
  openButton: {
    borderRadius: 80,
    width: 40,
    height: 40,
    borderWidth: 3,
    borderColor: 'black',
    elevation: 2,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});

export default App;
