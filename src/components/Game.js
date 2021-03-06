import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Text, View } from 'react-native';

class App extends React.Component {
    static propTypes = {
        randomNumberCount: PropTypes.number.isRequired,
    };
    randomNumbers = Array
        .from({ length: this.props.randomNumberCount })
        .map(() => 1 + Math.floor(10 * Math.random()));
    target = this.randomNumbers
        .slice(0, this.props.randomNumberCount - 2)
        .reduce((acc, curr) => acc + curr, 0);
    //TODO: Shuffle random numbers.
    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.target}>{this.target}</Text>
                <View style={styles.numberContainer}>
                    {this.randomNumbers.map((randomNumber, i) =>
                        <Text key={i} style={styles.number}>{randomNumber}</Text>
                    )}
                </View>
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
        fontSize: 50,
        backgroundColor: '#bbb',
        margin: 50,
        textAlign: 'center',
        borderRadius: 20
    },

    numberContainer: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        marginHorizontal: 20,
        marginTop: 30,

    },

    number: {
        backgroundColor: '#999',
        width: 100,
        margin: 15,
        textAlign: 'center',
        fontSize: 35,
        borderRadius: 20,
    }

});

export default App;
