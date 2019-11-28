import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, KeyboardAvoidingView, Alert, Picker} from 'react-native';
import { Platform } from '@unimodules/core';
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import api from '../services/api';

export default function ClienteCad() {
    const [nome, setNome] = useState('');
    const [cpf, setCpf] = useState('');
    const [telefone, setTelefone] = useState('');
    const [email, setEmail] = useState('');
    const [idEndereco, setIdEndereco] = useState('');
    const [enderecos, setEnderecos] = useState([]);
    
    async function carregarEnderecos() {
        try {
            const response = await api.get('/enderecos');
            setEnderecos(response.data);            
        } catch (error) {
            console.log(error);
            Alert.alert('Erro ao realizar a operação, tente novamente mais tarde!');
        }
    }

    useEffect(()=>{
        carregarEnderecos();
    },[])

    async function handleSubmit() {
        try {
            const response = await api.post('/clientes', {
                nome, cpf, telefone, email, endereco : { id : idEndereco}
            });
            setNome('');
            setCpf('');
            setTelefone('')
            setEmail('')

            Alert.alert('Cliente salvo com sucesso!');
        } catch (error) {
            console.log(error);
            Alert.alert('Erro ao realizar a operação, tente novamente mais tarde!');
        }
    }

    return(
        <KeyboardAvoidingView enable={Platform.OS == 'ios'} 
        behavior="padding"
        style={styles.container}>
            <Text style={styles.titulo}>Cadastro de Cliente</Text>
            <View style={styles.form}>
                <Text style={styles.label}>Nome: *</Text>
                <TextInput style={styles.input}
                    placeholder="Nome do Cliente"
                    placeholderTextColor="#999"
                    value={nome}
                    onChangeText={setNome}/>
                <Text style={styles.label}>Telefone: *</Text>
                <TextInput style={styles.input}
                    placeholder="numero do telefone"
                    placeholderTextColor="#999"
                    value={telefone}
                    onChangeText={setTelefone}/>
                <Text style={styles.label}>CPF: *</Text>
                <TextInput style={styles.input}
                    placeholder="digite CPF"
                    placeholderTextColor="#999"
                    value={cpf}
                    onChangeText={setCpf}/>
                <Text style={styles.label}>Email: *</Text>
                <TextInput style={styles.input}
                    placeholder="digite o Email"
                    placeholderTextColor="#999"
                    value={email}
                    onChangeText={setEmail}/>
                <Text style={styles.label}>Selecione Endereço: *</Text>
                <Picker selectedValue={idEndereco} onValueChange={setIdEndereco}>
                    {
                        enderecos.map((endereco) => {
                            return <Picker.Item key={endereco.id} label={endereco.rua+' '+endereco.numero+' '+endereco.quadra+' '+endereco.lote+' '+endereco.complemento+' '+endereco.bairro+' '+endereco.cidade+' '+endereco.estado+' '+endereco.pais} value={endereco.id}/>
                        })
                    }
                </Picker>
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
        fontSize: 20
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