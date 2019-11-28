import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, KeyboardAvoidingView, Alert, Picker} from 'react-native';
import { Platform } from '@unimodules/core';
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import DatePicker from 'react-native-datepicker';
import moment from 'moment';
import api from '../services/api';

export default function LivroCad() {
    const [nome, setNome] = useState('');
    const [valor, setValor] = useState('');
    const [volume, setVolume] = useState('');
    const [dataPublicacao, setDataPublicacao] = useState(moment(new Date(), 'YYYY-MM-DD'));
    const [idGenero, setIdGenero] = useState('');
    const [idAutor, setIdAutor] = useState('');
    const [idEditora, setIdEditora] = useState('');
    const [generos, setGeneros] = useState([]);
    const [autores, setAutores] = useState([]);
    const [editoras, setEditoras] = useState([]);
    
    async function carregarGeneros() {
        try {
            const response = await api.get('/generos');
            setGeneros(response.data);            
        } catch (error) {
            console.log(error);
            Alert.alert('Erro ao realizar a operação, tente novamente mais tarde!');
        }

    }
    async function carregarAutores() {
        try {
            const response = await api.get('/autores');
            setAutores(response.data);
        } catch (error) {
            Alert.alert('Erro ao carregar a lista de generos');
        }
    }
    async function carregarEditora() {
        try {
            const response = await api.get('/editoras');
            setEditoras(response.data);
        } catch (error) {
            Alert.alert('Erro ao carregar a lista de editoras');
        }
    }

    useEffect(() => {
        carregarGeneros()
        carregarAutores()
        carregarEditora()
    }, []);
    
    async function handleSubmit() {
        try {
            const response = await api.post('/livros', {
                nome, valor, volume, dataPublicacao, genero :{id : idGenero}, autor : {id : idAutor}, editora : {id : idEditora}
            });
            setNome('');
            setValor('');
            setVolume('');
            setDataPublicacao('');
            setIdGenero('');

            Alert.alert('Livro salvo com sucesso!');
        } catch (error) {
            console.log(error);
            Alert.alert('Erro ao realizar a operação, tente novamente mais tarde!');
        }
    }

    return(
        <KeyboardAvoidingView enable={Platform.OS == 'ios'} 
        behavior="padding"
        style={styles.container}>
            <Text style={styles.titulo}>Cadastro de Livro</Text>
            <View style={styles.form}>
                <Text style={styles.label}>Nome: *</Text>
                <TextInput style={styles.input}
                    placeholder="Nome do livro"
                    placeholderTextColor="#999"
                    value={nome}
                    onChangeText={setNome}/>
                <Text style={styles.label}>Valor: *</Text>
                <TextInput keyboardType="decimal-pad" 
                    style={styles.input}
                    placeholder="Valor do livro"
                    placeholderTextColor="#999"
                    value={valor}
                    onChangeText={setValor}/>
                <Text style={styles.label}>Volume: *</Text>
                <TextInput keyboardType="numeric" 
                    style={styles.input}
                    placeholder="Volume do livro"
                    placeholderTextColor="#999"
                    value={volume}
                    onChangeText={setVolume}/>
                <Text style={styles.label}>Data Publicação: *</Text>
                <DatePicker
                    style={{width: 200}}
                    date={dataPublicacao}
                    mode="date"
                    placeholder="select date"
                    format="DD/MM/YYYY"
                    minDate="01/05/2016"
                    maxDate="31/12/2019"
                    confirmBtnText="Confirm"
                    cancelBtnText="Cancel"
                    customStyles={{
                    dateIcon: {
                        position: 'absolute',
                        left: 0,
                        top: 4,
                        marginLeft: 0
                    },
                    dateInput: {
                        marginLeft: 36
                    }
                    }}
                    onDateChange={(date) => {setDataPublicacao(moment(date, 'YYYY-MM-DD'))}}
                />
                <Text style={styles.label}>Selecione Genero: *</Text>
                <Picker selectedValue={idGenero} onValueChange={setIdGenero}>
                    {
                        generos.map((genero) => {
                            return <Picker.Item key={genero.id} label={genero.descricao} value={genero.id}/>
                        })
                    }
                </Picker>
                <Text style={styles.label}>Selecione Autor: *</Text>
                <Picker selectedValue={idAutor} onValueChange={setIdAutor}>
                    {
                        autores.map((autor) => {
                            return <Picker.Item key={autor.id} label={autor.nome} value={autor.id}/>
                        })
                    }
                </Picker>
                <Text style={styles.label}>Selecione Editora: *</Text>
                <Picker selectedValue={idEditora} onValueChange={setIdEditora}>
                    {
                        editoras.map((editora) => {
                            return <Picker.Item key={editora.id} label={editora.nome} value={editora.id}/>
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