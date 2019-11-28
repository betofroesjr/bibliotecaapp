import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, KeyboardAvoidingView, Alert, Picker} from 'react-native';
import { Platform } from '@unimodules/core';
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import api from '../services/api';

export default function EnderecoCad() {
    const [bairro, setBairro] = useState('');
    const [cidade, setCidade] = useState('');
    const [complemento, setComplemento] = useState('');
    const [estado, setEstado] = useState('');
    const [lote, setLote] = useState('');
    const [numero, setNumero] = useState('');
    const [pais, setPais] = useState('');
    const [quadra, setQuadra] = useState('');
    const [rua, setRua] = useState('');
    
    async function handleSubmit() {
        try {
            const response = await api.post('/enderecos', {
                bairro, cidade, complemento, estado, lote, numero, pais, quadra, rua
            });
        
            setBairro('')
            setCidade('')
            setComplemento('')
            setEstado('')
            setLote('')
            setNumero('')
            setPais('')
            setQuadra('')
            setRua('')

            Alert.alert('Endereço salvo com sucesso!');
        } catch (error) {
            console.log(error);
            Alert.alert('Erro ao realizar a operação, tente novamente mais tarde!');
        }
    }

    return(
        <KeyboardAvoidingView enable={Platform.OS == 'ios'} 
        behavior="padding"
        style={styles.container}>
            <Text style={styles.titulo}>Cadastro de Endereço</Text>
            <View style={styles.form}>
                <TextInput style={styles.input}
                    placeholder="Rua *"
                    placeholderTextColor="#999"
                    value={rua}
                    onChangeText={setRua}/>
                <TextInput style={styles.input}
                    placeholder="Quadra: *"
                    placeholderTextColor="#999"
                    value={quadra}
                    onChangeText={setQuadra}/>
                <TextInput style={styles.input}
                    placeholder="Lote: *"
                    placeholderTextColor="#999"
                    value={lote}
                    onChangeText={setLote}/>
                <TextInput style={styles.input}
                    placeholder="Número: *"
                    placeholderTextColor="#999"
                    value={numero}
                    onChangeText={setNumero}/>
                <TextInput style={styles.input}
                    placeholder="Complemento: *"
                    placeholderTextColor="#999"
                    value={complemento}
                    onChangeText={setComplemento}/>
                <TextInput style={styles.input}
                    placeholder="Bairro: *"
                    placeholderTextColor="#999"
                    value={bairro}
                    onChangeText={setBairro}/>
                <TextInput style={styles.input}
                    placeholder="Cidade: *"
                    placeholderTextColor="#999"
                    value={cidade}
                    onChangeText={setCidade}/>
                <TextInput style={styles.input}
                    placeholder="Estado: *"
                    placeholderTextColor="#999"
                    value={estado}
                    onChangeText={setEstado}/>
                <TextInput style={styles.input}
                    placeholder="País: *"
                    placeholderTextColor="#999"
                    value={pais}
                    onChangeText={setPais}/>
                <TouchableOpacity style={styles.botao} onPress={handleSubmit}>
                    <Text style={styles.botaoTexto}>Salvar</Text>
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
        
    ); 
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    titulo: {
        fontSize: 16
    },
    form : {
        alignSelf: 'stretch',
        paddingHorizontal: 30,
        marginTop: 30
    },
    label: {
        fontWeight: 'bold',
        color: '#444',
        marginBottom: 8
    },
    input: {
        borderWidth: 1,
        borderColor: '#ddd',
        paddingHorizontal: 20,
        fontSize: 16,
        color: '#444',
        marginBottom: 20,
        borderRadius: 2
    },
    botao: {
        height: 42,
        backgroundColor: '#76dce3',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 2
    },
    botaoTexto: {
        color: '#FFF',
        fontWeight: 'bold',
        fontSize: 16
    }
});