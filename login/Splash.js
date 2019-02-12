import React, {Component} from 'react'
import { View, Text, StyleSheet } from 'react-native'

export default class Splash extends Component{
    render() {
        return (
            <View style={styles.wrapper}>
                <View style={styles.titleWrapper}>
                    <Text style={styles.title}>Olá, Mundo.</Text>
                </View>
                <Text style={styles.subtitle}>Powered by React-Native</Text>
            </View>
        )
    };
}

const styles = StyleSheet.create({
    wrapper: {
        backgroundColor: '#27ae60',
        flex: 1, //Ajusta-se para ocupar a tela toda
        justifyContent:'center',
        alignItems: 'center'
    },
    title: {
        color: 'white',
        fontSize: 35,
        fontWeight: 'bold'
    },
    subtitle: {
        color: 'white',
        fontWeight: '200',
        paddingBottom: 20,
    },
    titleWrapper: {
        flex: 1,
        justifyContent: 'center'
    }

});