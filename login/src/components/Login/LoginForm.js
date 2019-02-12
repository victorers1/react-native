import React from 'react';
import { StyleSheet, View, TextInput, TouchableOpacity, AppRegistry, Text, Button, AsyncStorage } from 'react-native';
import api from '../../services/api'

export default class LoginForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
        }
    }
    render() {
        return (
            <View style={styles.container}>
                <TextInput
                    placeholder='Usuário'
                    underlineColorAndroid='transparent'
                    style={styles.input}
                    onChangeText={(username) => this.setState({ username })} />

                <TextInput
                    placeholder='Senha'
                    underlineColorAndroid='transparent'
                    secureTextEntry
                    style={styles.input}
                    onChangeText={(password) => this.setState({ password })} />

                <TouchableOpacity
                    style={styles.buttonContainer}
                    onPress={this.login}>
                    <Text style={styles.buttonText}>Entrar</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => this.props.navigation.navigate('Signup')}>
                    <Text style={styles.textSignUp}>Cadastrar nova conta</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => this.props.navigation.navigate('Home')}>
                    <Text style={styles.textSignUp}>Entrar como administrador</Text>
                </TouchableOpacity>
            </View>
        )
    };

    login = () => { //Função acionada ao apertar o botão 'Entrar' da tela inicial 
        const data = { //Dado enviado
            'username': this.state.username,
            'senha': this.state.password,
        }
        api
            .post('login', data)
            .then(res => {
                console.warn(res.data);

                if (res.data.sucesso[0] == 1) {  // Sucesso no login
                    AsyncStorage.setItem('loggedUser', res.data.sucesso[1]); //Salva usuário logado
                    AsyncStorage.setItem('token', res.data.sucesso[2]);  //Salva token
                    this.props.navigation.navigate('Home');  //Entra na página das empresas
                } else if (res.data.sucesso[0] == 0) { //Fracasso no login
                    alert('Usuário ou senha incorretos');
                }
            })
            .catch(error => console.log(error));
    }

    componentDidMount() {
        AsyncStorage
            .getItem('loggedUser')
            .then(username => {
                if (username !== '' && username != null) {
                    //this.state.username = username;
                    this.props.navigation.navigate('Home');
                }
            });
    }
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
    },
    input: {
        height: 40,
        backgroundColor: 'rgba(255,255,255,0.7)',
        marginBottom: 20,
        color: 'rgba(0,0,0,0.7)',
        paddingHorizontal: 10,
    },
    buttonContainer: {
        backgroundColor: '#df7c35',
        paddingVertical: 15,
        marginBottom: 20,
    },
    buttonText: {
        textAlign: 'center',
        color: '#FFFFFF',
        fontWeight: '700',
    },
    textSignUp: {
        textAlign: 'left',
        color: 'rgba(255,255,255,0.7)',
        textDecorationLine: 'underline',

    },
});

AppRegistry.registerComponent('login', () => LoginForm);
