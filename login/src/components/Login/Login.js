import React from 'react';
import {StyleSheet, View, Image, KeyboardAvoidingView, AsyncStorage, StatusBar} from 'react-native';
import LoginForm from './LoginForm';

export default class Login extends React.Component {
    static navigationOptions = {
        header: null,
    };

    componentDidMount() {
        this._loadInitialState().done();
    }

    _loadInitialState = async () => { //Esta função verificará se já tem um usuário logado no App
        var value = await AsyncStorage.getItem('user');
        if( value !== null) {
            this.props.navigation.navigate('Inicio');
        }
    }

    render() {
        return (
            <KeyboardAvoidingView behavior='padding' style={styles.container}>
            <StatusBar backgroundColor='#ef8c45' />
                <View style={styles.logoContainer}>
                    <Image style={styles.logo}
                    source = {require('../../images/incuba.png')} />
                </View>
                <View style={styles.formContainer}>
                    <LoginForm navigation={this.props.navigation} />
                </View>
            </KeyboardAvoidingView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#ef8c45',
        flex: 1,
    },
    formContainer: {

    },
    logoContainer: {
        alignItems: 'center',
        flexGrow: 1,
        justifyContent: 'center',
    },
    logo: {
        width: 150, //150
        height: 129, //129
    }
});