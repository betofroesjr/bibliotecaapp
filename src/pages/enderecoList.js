import React, { useState, useEffect } from 'react'; 
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Alert} from 'react-native';
import api from '../services/api';

export default function EnderecoList() {
    const [enderecos, setEnderecos] = useState([]);
    async function carregar() {
        try {
            const response = await api.get('/enderecos');
            setEnderecos(response.data);          
        } catch (error) {
            console.log(error);
            Alert.alert('Erro ao realizar a operação, tente novamente mais tarde!');
        }
    }
    useEffect(()=>{
        carregar();
    },[])
    
    return(
        <View style={styles.container}>
           <Text style={styles.titulo}>Lista de endereços</Text>
           <FlatList data={enderecos}
            style={styles.lista}
            keyExtractor={endereco => `${endereco.id}`}
            renderItem={({item}) => (
                <View style={styles.container}>
                    <View style={styles.card}>
                        <Text style={styles.label}>Id: {item.id}</Text>
                        <Text style={styles.label}>Rua: {item.rua}</Text>
                        <Text style={styles.label}>Número: {item.numero}</Text>
                        <Text style={styles.label}>Quadra: {item.quadra}</Text>
                        <Text style={styles.label}>Lote: {item.lote}</Text>
                        <Text style={styles.label}>Complemento: {item.complemento}</Text>
                        <Text style={styles.label}>Bairro: {item.bairro}</Text>
                        <Text style={styles.label}>Cidade: {item.cidade}</Text>
                        <Text style={styles.label}>Estado: {item.estado}</Text>
                        <Text style={styles.label}>País: {item.pais}</Text>
                        <TouchableOpacity onPress={async () => {
                            try {
                                const id = item.id;
                                await api.delete(`/enderecos/${id}`);
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