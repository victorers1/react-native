import React, { Component } from 'react'
import { StyleSheet, View, Text, FlatList, TouchableOpacity, Button, AsyncStorage, StatusBar } from 'react-native'
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
        title: 'Empresas',
        headerStyle: {
            backgroundColor: '#ef8c45',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
            fontWeight: 'bold',
        },
    })

    async componentDidMount() { //Carrega as variáveis de estado
        this.setState({ username: await AsyncStorage.getItem('@Home:loggedUser'), token: await AsyncStorage.getItem('@Home:token') });
        //this.state.username = await AsyncStorage.getItem('@Home:loggedUser');
        //this.state.token = await AsyncStorage.getItem('@Home:token');
        this.loadEnterprises();
    }

    //Carrega a lista de empresas na variável de estado "enterprises: []"
    loadEnterprises() {
        const data = {
            'username': this.state.username,
            'token': this.state.token,
        }
        api
            .post('empresas', data) //Primeiro manda os dados: 'username' e 'token'
            .then(async res => {  //Depois recebe as empresas
                if (res.data.validado == 1) {
                    this.setState({ enterprises: res.data.empresas });
                } else {
                    alert('Erro ao carregar empresas.');
                    await AsyncStorage.setItem('@Home:loggedUser', '');
                    await AsyncStorage.setItem('@Home:token', '');
                    await AsyncStorage.setItem('@Home:logged', 'false');
                    this.props.navigation.replace('Login');
                }
            })
    }

    logout = async () => {
        await AsyncStorage.setItem('@Home:loggedUser', '');
        await AsyncStorage.setItem('@Home:token', '');
        await AsyncStorage.setItem('@Home:logged', 'false');
        this.props.navigation.replace('Login');
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

    renderHeader = () => (
        <View style={styles.lHeaderContainer} >
            <Text style={styles.lHeaderText}>Olá, {this.state.username}</Text>
        </View>
    )

    renderFooter = () => (
        <TouchableOpacity
            onPress={this.logout}
            style={styles.accessButton} >

            <Text style={styles.accessText}>Sair</Text>
        </TouchableOpacity>
    )

    render() {
        return (
            <View style={styles.container}>
                <FlatList
                    contentContainerStyle={styles.list}
                    data={this.state.enterprises}
                    keyExtractor={item => item.id_empresa.toString()}
                    renderItem={this.renderItem}
                    ListHeaderComponent={this.renderHeader}
                    ListFooterComponent={this.renderFooter}
                />
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
    logoutButton: {
        height: 42,
        borderRadius: 5,
        backgroundColor: '#ffac55',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
        elevation: 2,
    },
    lHeaderContainer: {
        alignItems: 'center',
        backgroundColor: '#fafafa',
        marginBottom: 10,
    },
    lHeaderText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
    }
});