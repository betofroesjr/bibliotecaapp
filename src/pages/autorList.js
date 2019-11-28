import React, { useState } from 'react'; 
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Alert} from 'react-native';
import api from '../services/api';
export default function AutorList() {
    const [autores, setAutores] = useState([]);
    async function carregarAutores() {
        try {
            const response = await api.get('/autores');
            setAutores(response.data);          
        } catch (error) {
            console.log(error);
            Alert.alert('Erro ao realizar a operação, tente novamente mais tarde!');
        }
    }
    carregarAutores();
    return(
        <View style={styles.container}>
           <Text style={styles.titulo}>Lista de autores</Text>
           <FlatList data={autores}
            style={styles.lista}
            keyExtractor={autor => `${autor.id}`}
            renderItem={({item}) => (
                <View style={styles.container}>
                    <View style={styles.card}>
                        <Text style={styles.label}>Id: {item.id}</Text>
                        <Text style={styles.label}>Nome: {item.nome}</Text>
                        <Text style={styles.label}>Sexo: {item.sexo}</Text>
                        <TouchableOpacity onPress={async () => {
                            try {
                                const id = item.id;
                                await api.delete(`/autores/${id}`);
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