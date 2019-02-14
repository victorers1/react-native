import React from 'react'
import { StyleSheet, Text, KeyboardAvoidingView, TouchableOpacity, TextInput } from 'react-native'
import api from '../../services/api.js'

export default class SingUp extends React.Component {
    static navigationOptions = {
        title: 'Criar conta',
        headerStyle: {
            backgroundColor: '#ef8c45',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
            fontWeight: 'normal',
        },
    };

    
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            username: '',
            password: '',
            email: '',
        }
    }

    render() {
        return (
            <KeyboardAvoidingView behavior='padding' style={styles.container}>
                <TextInput
                    placeholder='Seu Nome'
                    underlineColorAndroid='transparent'
                    style={styles.input}
                    onChangeText={(name) => this.setState({ name })} />

                <TextInput
                    placeholder='Nome de Usuário'
                    underlineColorAndroid='transparent'
                    style={styles.input}
                    onChangeText={(username) => this.setState({ username })} />

                <TextInput
                    placeholder='E-mail'
                    underlineColorAndroid='transparent'
                    style={styles.input}
                    onChangeText={(email) => this.setState({ email })} />

                <TextInput
                    placeholder='Senha'
                    secureTextEntry
                    underlineColorAndroid='transparent'
                    style={styles.input}
                    onChangeText={(password) => this.setState({ password })} />

                <TouchableOpacity
                    style={styles.buttonContainer}
                    onPress={this.signup}>
                    <Text style={styles.buttonText}>Cadastrar</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => this.props.navigation.navigate('Login')} >
                    <Text style={styles.textSignIn}>Já possuo conta</Text>
                </TouchableOpacity>
            </KeyboardAvoidingView>
        );
    };

    signup = () => {
        if(this.state.name == ''){
            alert('Preencha o campo de nome');
            return;
        } else if(this.state.username == ''){
            alert('Prencha o campo de usuário');
            return;
        } else if (this.state.email == ''){
            alert('Prencha o campo de email');
            return;
        } else if (this.state.password == ''){
            alert('Prencha o campo de senha');
            return;
        }

        const data = {
            'nome': this.state.name,
            'username': this.state.username,
            'email': this.state.password,
            'senha': this.state.email,
        }
        api
            .post('cadastrar', data)
            .then(res => {
                if(res.data.sucesso == 1){
                    alert('Cadastro efetuado com sucesso');
                    this.props.navigation.goBack();

                } else if(res.data.sucesso == 2){
                    alert('Os campos não foram todos preenchidos');
                } else if(res.data.sucesso == 3){
                    alert('Usuário já é cadastrado');
                }
            })
            .catch(error => console.log(error));
    }
}

const styles = StyleSheet.create({
    container: {
        padding: 8,
        backgroundColor: '#ef8c45',
        flex: 1,
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
    textSignIn: {
        textAlign: 'left',
        color: 'rgba(255,255,255,0.7)',
        textDecorationLine: 'underline',
    },
});