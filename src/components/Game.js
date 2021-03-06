import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

class App extends React.Component {
    target = 10 + Math.floor(40 * Math.random());
    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.target}>{this.target}</Text>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        backgroundColor: '#ddd',
        flex: 1,
        paddingTop: 30,
    },

    target: {
        fontSize: 40,
        backgroundColor: '#aaa',
        marginHorizontal: 50,
        textAlign: 'center',
    }
});

export default App;
