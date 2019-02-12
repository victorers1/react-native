import React, {Component} from 'react'
import {StyleSheet, View, KeyboardAvoidingView, StatusBar, TouchableOpacity, TextInput} from 'react-native'

export default class Colab extends Component {
    static navigationOptions = {
        header: null,
    };

    render() {
        return (
            <KeyboardAvoidingView behavior='padding' style={styles.container}>
                <Text>Olá</Text>
            </KeyboardAvoidingView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});