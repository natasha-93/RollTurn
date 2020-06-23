import React, {useState, useContext} from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  SafeAreaView,
} from 'react-native';
import ColorPicker from './ColorPicker';
import {Player} from './App';
import {colors} from './models/color';
import {PlayerContext} from './context/player';
import {ScrollView} from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';
import {Icon} from 'react-native-elements';

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
    <SafeAreaView style={{flex: 1}}>
      <LinearGradient
        colors={['#a8edea', 'white']}
        style={styles.linearGradient}>
        <ScrollView
          style={{flex: 1}}
          contentInsetAdjustmentBehavior="automatic">
          <View style={styles.appContainer}>
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
                    <TouchableOpacity
                      onPress={() => {
                        setPlayers((players) =>
                          players.filter((player, index) => index !== i),
                        );
                      }}>
                      <Icon name="delete" type="ionicons" size={30} />
                    </TouchableOpacity>

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
        </ScrollView>
      </LinearGradient>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  scrollView: {},
  appContainer: {
    flex: 1,
    alignItems: 'center',
    // minHeight: '100%',
    // minWidth: '100%',
  },
  linearGradient: {
    flex: 1,
    // minWidth: '100%',
    // minHeight: '100%',
  },
  inputsContainer: {
    justifyContent: 'center',
    minWidth: 270,
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
  deleteButton: {
    fontSize: 30,
    height: 40,
  },
});
