import React, { Component } from 'react'
import { StyleSheet, View, Text, KeyboardAvoidingView, StatusBar, TouchableOpacity, AsyncStorage } from 'react-native'
import api from '../../services/api'

export default class Home extends Component {
    static navigationOptions = {
        title: 'Olá, ',
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
            username: AsyncStorage.getItem('loggedUser').catch(error => console.warn(error)),
            token: AsyncStorage.getItem('token').catch(error => console.warn(error)),
            count: 0,
            enterprises: [],
        }
    }
    componentDidMount() {
        this.loadEnterprises();
    }

    loadEnterprises = async () => {
        //Primeiro manda os dados
        api
            .post('empresas', { username, token })
            .then(res => {  //Depois recebe as empresas
                empresas = res.data;
                console.warn(empresas);

                if(res.data.validado==1){
                    renderItems();
                } else {
                    console.warn('Não foi possível autenticar o usuário.');
                }
            })
    }

    renderItems() {

    }
    render() {
        return (
            <KeyboardAvoidingView behavior='padding' style={styles.container}>
                <Text>Olá, recebi {this.state.count} empresas.</Text>
            </KeyboardAvoidingView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});