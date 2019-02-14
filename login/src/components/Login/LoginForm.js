import React from 'react';
import { StyleSheet, View, TextInput, TouchableOpacity, AppRegistry, Text, AsyncStorage, StatusBar } from 'react-native';
import api from '../../services/api'

export default class LoginForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
        }
    }

    async componentDidMount() {
        await AsyncStorage
            .getItem('@Home:logged')
            .then(async logged => {
                if (logged == 'false') { // Já houve usuários logados, mas não há no momento
                    await AsyncStorage.setItem('@Home:loggedUser', '');

                } else if (logged == null) { //Nunca houve usuário logado
                    await AsyncStorage.setItem('@Home:logged', 'false');

                } else if (logged == 'true') { // Há um usuário logado no momento
                    await AsyncStorage
                        .getItem('@Home:loggedUser')
                        .then(username => {
                            if (username != '' && username != null) { // Testo se username existe mesmo só por precaução
                                this.setState({ username: username }) // Recupero username
                                this.props.navigation.replace('Home', {username: username});
                            } else {
                                alert('Alguém estava logado, mas não há nome de usuário salvo.');
                            }
                        });
                }
            });
    }

    render() {
        return (
            <View style={styles.container}>
                <TextInput
                    placeholder='Nome de Usuário'
                    value={this.state.username}
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
            .then(async res => { // res = resposta
                if (res.data.sucesso[0] == 1) {  // Sucesso no login
                    await AsyncStorage.setItem('@Home:loggedUser', res.data.sucesso[1]);
                    await AsyncStorage.setItem('@Home:token', res.data.sucesso[2]);
                    await AsyncStorage.setItem('@Home:logged', 'true'); //variável indicando se há um usuário logado

                    this.props.navigation.replace('Home', {username: this.state.username});  //Entra na página das empresas
                } else if (res.data.sucesso[0] == 0) { //Fracasso no login
                    alert('Usuário ou senha incorretos');
                }
            })
            .catch(error => console.warn(error));
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
        elevation: 2,
    },
    textSignUp: {
        textAlign: 'left',
        color: 'rgba(255,255,255,0.7)',
        textDecorationLine: 'underline',
    },
});

AppRegistry.registerComponent('login', () => LoginForm);
