import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Text, View, Button, Image } from 'react-native';

import RandomNumber from './RandomNumber';
import shuffle from 'lodash.shuffle';

class App extends React.Component {
    static propTypes = {
        randomNumberCount: PropTypes.number.isRequired,
        initialSeconds: PropTypes.number.isRequired,
        onPlayAgain: PropTypes.func.isRequired,
        winStreak: PropTypes.number.isRequired,
        globalWin: PropTypes.bool.isRequired,
    };

    state = {
        selectedNumberIds: [],
        remainingSeconds: this.props.initialSeconds,
    };

    gameStatus = 'PLAYING';

    randomNumbers = Array
        .from({ length: this.props.randomNumberCount })
        .map(() => 1 + Math.floor(10 * Math.random()));

    target = this.randomNumbers
        .slice(0, this.props.randomNumberCount - 2)
        .reduce((acc, curr) => acc + curr, 0);

    shuffledRandomNumbers = shuffle(this.randomNumbers);

    componentDidMount() {
        this.intervalId = setInterval(() => {
            this.setState((prevState) => {
                return { remainingSeconds: prevState.remainingSeconds - 1 };
            }, () => {
                if (this.state.remainingSeconds === 0) {
                    clearInterval(this.intervalId);
                }
            });
        }, 1000);
    }

    componentWillUnmount() {
        clearInterval(this.intervalId);
    }

    isNumberSelected = (numberIndex) => {
        return this.state.selectedNumberIds.indexOf(numberIndex) >= 0;
    }

    selectNumber = (numberIndex) => {
        this.setState((prevState) => ({
            selectedNumberIds: [...prevState.selectedNumberIds, numberIndex]
        }));
    }

    UNSAFE_componentWillUpdate(nextProps, nextState) {
        if (
            nextState.selectedNumberIds !== this.state.selectedNumberIds ||
            nextState.remainingSeconds === 0
        ) {
            this.gameStatus = this.calcGameStatus(nextState);
            if (this.gameStatus !== 'PLAYING') {
                clearInterval(this.intervalId);
            }
        }
    }

    calcGameStatus = (nextState) => {
        const sumSelected = nextState.selectedNumberIds.reduce((acc, curr) => {
            return acc + this.shuffledRandomNumbers[curr];
        }, 0);
        if (nextState.remainingSeconds === 0) {
            return 'LOST';
        }
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
        const gameStatus = this.gameStatus;
        let endGameText;
        if (gameStatus === 'WON') {
            endGameText = <Text style={{ color: 'white', fontSize: 20, paddingBottom: 15, textAlign: 'center' }}>Won! Your streak: {this.props.winStreak + 1}</Text>;
        } else {
            endGameText = <Text style={{ color: 'white', fontSize: 20, paddingBottom: 15, textAlign: 'center' }}>Lost! Your streak: {this.props.winStreak}</Text>;
        }

        if (this.props.globalWin) {
            return (
                <View
                    style={{
                        flex: 1,
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: '#282c34'
                    }}
                >
                    <Image source={require('../images/rickoCongrats.png')} style={{
                        width: 400, height: 300
                    }
                    } />
                    <Button title="Continue?" onPress={() => this.props.onPlayAgain('WON')} />
                </View >
            );
        }

        return (
            <View style={styles.container}>
                <View style={[styles.headerContainer, styles[`STATUS_${gameStatus}`]]}>
                    <Text style={styles.target}>Target: {this.target}</Text>
                    <Text style={styles.timer}>Remaining: {this.state.remainingSeconds}</Text>
                </View>
                <View style={styles.numberContainer}>
                    {this.shuffledRandomNumbers.map((randomNumber, i) =>
                        <RandomNumber
                            key={i}
                            id={i}
                            number={randomNumber}
                            isDisabled={this.isNumberSelected(i) || gameStatus !== 'PLAYING'}
                            onPress={this.selectNumber}
                        />
                    )}
                </View>
                {gameStatus !== 'PLAYING' && (
                    <View>
                        {endGameText}
                        <Button title="Play Again?" onPress={() => this.props.onPlayAgain(gameStatus)} />
                    </View>
                )
                }
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

    headerContainer: {
        backgroundColor: '#bbb',
        margin: 30,
        textAlign: 'center',
        borderRadius: 20,
    },

    timer: {
        fontSize: 20,
        marginHorizontal: 30,
        textAlign: 'center',
        borderRadius: 20
    },

    target: {
        fontSize: 50,
        textAlign: 'center',
        borderRadius: 20
    },

    numberContainer: {
        flex: 1,
        marginHorizontal: 20,
        marginTop: 10,
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
    },



    button: {
        marginVertical: 20,
        color: '#7b26ad'
    }
});

export default App;
