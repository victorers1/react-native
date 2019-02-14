import React, { Component } from 'react'
import { StyleSheet, View, Text, FlatList, TouchableOpacity } from 'react-native'
import api from '../../services/api'

export default class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            token: '',
            enterprises: [],
        }
    }

    static navigationOptions = ({ navigation }) => ({
        title: 'Olá, ' + navigation.state.params.res[1],
        headerStyle: {
            backgroundColor: '#ef8c45',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
            fontWeight: 'bold',
        },
    })

    componentDidMount() {
        this.state.username = this.props.navigation.state.params.res[1];
        this.state.token = this.props.navigation.state.params.res[2];
        this.loadEnterprises();
    }

    loadEnterprises() {
        //Primeiro manda os dados
        //console.warn('postando:' + this.state.username + ' ' + this.state.token)
        api
            .post('empresas', { 'username': this.state.username, 'token': this.state.token })
            .then(res => {  //Depois recebe as empresas
                //console.warn('Dados recebidos: ' + res.data.empresas);
                if (res.data.validado == 1) {
                    this.setState({ enterprises: res.data.empresas });
                    //console.warn('lista de empresas: ' + this.state.enterprises);
                } else {
                    alert('Erro ao carregar empresas.');
                    this.props.navigation.navigate('Login');
                }
            })
    }

    renderItem = ({ item }) => (
        <View style={styles.enterpriseContainer}>
            <Text style={styles.enterpriseName}>{item.nome}</Text>
            <Text style={styles.enterpriseDesc}>CNPJ: {item.cnpj}</Text>

            <TouchableOpacity
                style={styles.accessButton}
                onPress={() => {
                    this.props.navigation.navigate('Colab', { enterprise: item, token: this.state.token, username: this.state.username }) //id_empresa é um número
                }}>
                <Text style={styles.accessText}>Acessar</Text>
            </TouchableOpacity>
        </View>
    )


    render() {
        return (
            <View style={styles.container}>
                <FlatList
                    contentContainerStyle={styles.list}
                    data={this.state.enterprises}
                    keyExtractor={item => item.id_empresa.toString()}
                    renderItem={this.renderItem} />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f9f9f9',
    },
    list: {
        padding: 20,
    },
    enterpriseContainer: {
        backgroundColor: '#FFF',
        borderWidth: 1,
        borderColor: '#DDD',
        borderRadius: 5,
        padding: 20,
        marginBottom: 20,

        elevation: 2,
    },
    enterpriseName: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
    },
    enterpriseDesc: {
        fontSize: 16,
        color: '#999',
        marginTop: 5,
        lineHeight: 24,
    },
    accessButton: {
        height: 42,
        borderRadius: 5,
        //borderWidth: 2,
        //borderColor: '#DA552F',
        backgroundColor: '#ffac55',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
        elevation: 2,
    },
    accessText: {
        fontSize: 16,
        color: '#FFF',
        fontWeight: 'bold',
    },
});