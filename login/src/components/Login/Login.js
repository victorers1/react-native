import React from 'react';
import {StyleSheet, View, Image, KeyboardAvoidingView, AsyncStorage, StatusBar} from 'react-native';
import LoginForm from './LoginForm';

export default class Login extends React.Component {
    static navigationOptions = {
        header: null,
    };

    async componentWillMount() { // Vê se já há um usuário logado
        const log = await AsyncStorage.getItem('@Home:logged');
        if(log == 'true') {  // Se já tem usuário logado
            this.props.navigation.replace('Home'); // Vai direto para Home
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