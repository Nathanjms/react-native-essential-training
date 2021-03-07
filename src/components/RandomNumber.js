import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';



export default class RandomNumber extends Component {

    static propTypes = {
        id: PropTypes.number.isRequired,
        number: PropTypes.number.isRequired,
        isDisabled: PropTypes.bool.isRequired,
        onPress: PropTypes.func.isRequired,
    };

    handlePress = () => {
        this.props.onPress(this.props.id);
    };


    render() {
        return (
            <TouchableOpacity onPress={this.handlePress}>
                <Text style={[styles.number, this.props.isDisabled ? styles.disabled : '']}>{this.props.number}</Text>
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    number: {
        backgroundColor: '#999',
        width: 100,
        margin: 30,
        textAlign: 'center',
        fontSize: 35,
        borderRadius: 20,
        padding: 15
    },
    disabled: {
        opacity: 0.5,
        color: 'white',
        backgroundColor: '#7b26ad',
    },
});
