import React from 'react';
import PropTypes, { number } from 'prop-types';
import { StyleSheet, Text, View } from 'react-native';

import RandomNumber from './RandomNumber';

class App extends React.Component {
    static propTypes = {
        randomNumberCount: PropTypes.number.isRequired,
    };
    state = {
        selectedNumbers: [],
    };
    randomNumbers = Array
        .from({ length: this.props.randomNumberCount })
        .map(() => 1 + Math.floor(10 * Math.random()));
    target = this.randomNumbers
        .slice(0, this.props.randomNumberCount - 2)
        .reduce((acc, curr) => acc + curr, 0);
    //TODO: Shuffle random numbers.

    isNumberSelected = (numberIndex) => {
        return this.state.selectedNumbers.indexOf(numberIndex) >= 0;
    }
    selectNumber = (numberIndex) => {
        this.setState((prevState) => ({
            selectedNumbers: [...prevState.selectedNumbers, numberIndex]
        }));
    }
    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.target}>{this.target}</Text>
                <View style={styles.numberContainer}>
                    {this.randomNumbers.map((randomNumber, i) =>
                        <RandomNumber
                            key={i}
                            id={i}
                            number={randomNumber}
                            isDisabled={this.isNumberSelected(i)}
                            onPress={this.selectNumber}
                        />
                    )}
                </View>
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
});

export default App;
