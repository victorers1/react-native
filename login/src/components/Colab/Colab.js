import React, { Component } from 'react'
import { StyleSheet, View, Text, FlatList, StatusBar} from 'react-native'
import api from '../../services/api';

export default class Colab extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            id_enterprise: '',
            token: '',
            colab: [],
        }
    }

    static navigationOptions = ({ navigation }) => ({
        title: navigation.state.params.enterprise.nome,
        headerStyle: {
            backgroundColor: '#ef8c45',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
            fontWeight: 'bold',
        },
    })

    componentDidMount() {
        this.loadColab();
    }

    //Carrega a lista de colaboradores em "colab: []"
    loadColab() {
        const data = {
            'username': this.props.navigation.state.params.username,
            'idempresa': this.props.navigation.state.params.enterprise.id_empresa,
            'token': this.props.navigation.state.params.token,
        }
        api
            .post('colaboradores', data)
            .then(res => {
                if (res.data.validado == 1) {
                    this.setState({ colab: res.data.colaboradores });
                } else {
                    alert('Erro ao carregar colaboradores.');
                }
            });
    }

    renderItem = ({ item }) => (
        <View style={styles.colabContainer}>
            <Text style={styles.colabName}>{item.nome}</Text>
            <Text style={styles.colabDesc}>CPF: {item.cpf}</Text>
            <Text style={styles.colabDesc}>Email: {item.email}</Text>
        </View>
    )

    render() {
        return (
            <View style={styles.container}>
                <FlatList
                    contentContainerStyle={styles.list}
                    data={this.state.colab}
                    keyExtractor={item => item.cpf}
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
    colabContainer: {
        backgroundColor: '#FFF',
        borderWidth: 1,
        borderColor: '#DDD',
        borderRadius: 5,
        padding: 20,
        marginBottom: 20,

        elevation: 2,
    },
    colabName: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
    },
    colabDesc: {
        fontSize: 16,
        color: '#999',
        marginTop: 5,
        lineHeight: 24,
    },
});