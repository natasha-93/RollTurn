import React, {useState, useContext} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  StatusBar,
  SafeAreaView,
} from 'react-native';
import ColorPicker from './ColorPicker';
import {colors, Player} from './App';
import {PlayerContext} from './context/player';
import {ScrollView} from 'react-native-gesture-handler';

export default function Sidebar() {
  const {players, setPlayers} = useContext(PlayerContext);
  const [newPlayer, setNewPlayer] = useState<Player>({
    name: '',
    color: colors[0],
  });

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
    <View>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={{
            ...styles.scrollView,
            backgroundColor: 'lightgrey',
          }}>
          <View
            style={{
              ...styles.appContainer,
            }}>
            <View>
              <View style={styles.inputsContainer}>
                <View style={styles.playerInputs}>
                  <TextInput
                    placeholder="Add player..."
                    style={styles.input}
                    value={newPlayer.name}
                    onChangeText={(name) => setNewPlayer({...newPlayer, name})}
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
                        style={styles.deleteButton}
                        onPress={() => {
                          setPlayers((players) =>
                            players.filter((player, index) => index !== i),
                          );
                        }}>
                        x
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
  inputsContainer: {
    justifyContent: 'center',
  },
  playerInputs: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
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
    marginLeft: 5,
  },
  buttonContainer: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 10,
  },
  deleteButton: {
    fontSize: 30,
    height: 40,
  },
});
