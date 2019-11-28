import React, { useState } from 'react'; 
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Alert} from 'react-native';
import api from '../services/api';
export default function ClienteList() {
    const [clientes, setClientes] = useState([]);
    async function carregarClientes() {
        try {
            const response = await api.get('/clientes');
            setClientes(response.data);          
        } catch (error) {
            console.log(error);
            Alert.alert('Erro ao realizar a operação, tente novamente mais tarde!');
        }
    }
    carregarClientes();
    return(
        <View style={styles.container}>
           <Text style={styles.titulo}>Lista de clientes</Text>
           <FlatList data={clientes}
            style={styles.lista}
            keyExtractor={cliente => `${cliente.id}`}
            renderItem={({item}) => (
                <View style={styles.container}>
                    <View style={styles.card}>
                        <Text style={styles.label}>Id: {item.id}</Text>
                        <Text style={styles.label}>Nome: {item.nome}</Text>
                        <Text style={styles.label}>CPF: {item.cpf}</Text>
                        <Text style={styles.label}>email: {item.email}</Text>
                        <Text style={styles.label}>Telefone: {item.telefone}</Text>
                        <Text style={styles.label}>Endereço: {item.endereco.rua}, {item.endereco.bairro}, {item.endereco.cidade}, {item.endereco.estado}</Text>
                        <TouchableOpacity onPress={async () => {
                            try {
                                const id = item.id;
                                await api.delete(`/clientes/${id}`);
                            } catch (error) {
                                console.log(error);
                                Alert.alert('Erro ao realizar a operação, tente novamente mais tarde!');
                            }
                        }}>
                            <Text style={styles.botaoTexto}>Excluir</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            )}
           />
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        marginTop: 10,
        backgroundColor: '#3385ff',
        flex: 1,
        justifyContent: 'center',
        alignItems: "stretch"
    },
    lista: {
        paddingHorizontal: 20
    },
    titulo: {
        fontSize: 18,
        marginTop: 30,
        color: '#FFF',
        fontWeight: 'bold',
        textAlign: 'center'
    },
    label: {
        fontWeight: 'bold',
        color: '#444'
    },
    card: {
        backgroundColor: '#FFF',
        borderRadius: 5,
        padding: 10
    },
    botaoTexto: {
        color: '#f05a5b',
        fontWeight: 'bold',
        fontSize: 16,
        textAlign: 'right'
    }
});