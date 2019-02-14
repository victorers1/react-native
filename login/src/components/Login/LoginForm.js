import React from 'react';
import { StyleSheet, View, TextInput, TouchableOpacity, AppRegistry, Text, AsyncStorage } from 'react-native';
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
                //console.warn(res.data.sucesso[0]==1);

                if (res.data.sucesso[0] == 1) {  // Sucesso no login
                    await AsyncStorage.setItem('@Home:loggedUser', res.data.sucesso[1]); //Salva usuário logado
                    await AsyncStorage.setItem('@Home:password', this.state.password);
                    await AsyncStorage.setItem('@Home:token', res.data.sucesso[2]);  //Salva token
                    //console.warn('Login realizado, user:' + await AsyncStorage.getItem('@Home:loggedUser')+ ', token: '+ await AsyncStorage.getItem('@Home:token'));

                    this.props.navigation.navigate('Home', {res: res.data.sucesso});  //Entra na página das empresas

                } else if (res.data.sucesso[0] == 0) { //Fracasso no login
                    alert('Usuário ou senha incorretos');
                }
            })
            .catch(error => console.log(error));
    }

    async componentWillMount() {
        AsyncStorage
            .getItem('@Home:loggedUser')
            .then(async username => {
                if (username !== '' && username != null) {
                    this.setState({username: username, password: await AsyncStorage.getItem('@Home:password')})
                    this.login();
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
        elevation: 2,
    },
    textSignUp: {
        textAlign: 'left',
        color: 'rgba(255,255,255,0.7)',
        textDecorationLine: 'underline',
    },
});

AppRegistry.registerComponent('login', () => LoginForm);
