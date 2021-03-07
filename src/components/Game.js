import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Text, View } from 'react-native';

import RandomNumber from './RandomNumber';

class App extends React.Component {
    static propTypes = {
        randomNumberCount: PropTypes.number.isRequired,
    };
    state = {
        selectedNumberIds: [],
    };
    randomNumbers = Array
        .from({ length: this.props.randomNumberCount })
        .map(() => 1 + Math.floor(10 * Math.random()));
    target = this.randomNumbers
        .slice(0, this.props.randomNumberCount - 2)
        .reduce((acc, curr) => acc + curr, 0);
    //TODO: Shuffle random numbers.

    isNumberSelected = (numberIndex) => {
        return this.state.selectedNumberIds.indexOf(numberIndex) >= 0;
    }
    selectNumber = (numberIndex) => {
        this.setState((prevState) => ({
            selectedNumberIds: [...prevState.selectedNumberIds, numberIndex]
        }));
    }
    gameStatus = () => {
        const sumSelected = this.state.selectedNumberIds.reduce((acc, curr) => {
            return acc + this.randomNumbers[curr];
        }, 0);
        if (sumSelected < this.target) {
            return 'PLAYING';
        }
        if (sumSelected == this.target) {
            return 'WON';
        }
        if (sumSelected > this.target) {
            return 'LOST';
        }
    };
    render() {
        const gameStatus = this.gameStatus();
        return (
            <View style={styles.container}>
                <Text style={[styles.target, styles[`STATUS_${gameStatus}`]]}>{this.target}</Text>
                <View style={styles.numberContainer}>
                    {this.randomNumbers.map((randomNumber, i) =>
                        <RandomNumber
                            key={i}
                            id={i}
                            number={randomNumber}
                            isDisabled={this.isNumberSelected(i) || gameStatus !== 'PLAYING'}
                            onPress={this.selectNumber}
                        />
                    )}
                </View>
                <Text>{gameStatus}</Text>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        backgroundColor: '#282c34',
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
        marginHorizontal: 30,
        marginTop: 50,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-around',

    },

    STATUS_PLAYING: {
        backgroundColor: '#bbb'
    },

    STATUS_WON: {
        backgroundColor: 'green'
    },

    STATUS_LOST: {
        backgroundColor: 'red'
    }
});

export default App;
