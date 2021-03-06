import React from 'react';
import {
  StyleSheet,
  View,
  Text,
} from 'react-native';

const App = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Step 1</Text>
      <Text style={styles.title}>Step 2</Text>
      <Text style={styles.title}>Step 3</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 40,
    backgroundColor: 'orange',
    flex: 1,
    justifyContent: 'space-around',
    // alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    color: 'blue',
    backgroundColor: 'grey',
    flex: 1,
    margin: 10,
  },
});

export default App;