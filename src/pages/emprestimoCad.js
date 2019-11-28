import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, KeyboardAvoidingView, Alert, Picker} from 'react-native';
import { Platform } from '@unimodules/core';
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import DatePicker from 'react-native-datepicker';
import moment from 'moment';
import api from '../services/api';

export default function EmprestimoCad() {
    const [clientes, setClientes] = useState([]);
  const [livros, setLivros] = useState([]);
  const [idCliente, setIdCliente] = useState('');
  const [dataDeDevolucao, setDataDeDevolucao] = useState(moment(Date.now()));
  const [dataDoEmprestimo, setDataDoEmprestimo] = useState(moment(Date.now()));
  const [idLivro, setIdLivro] = useState('');
  const [valorDoEmprestimo, setValorDoEmprestimo] = useState('');

  async function carregarLivros() {
    try {
      const response = await api.get('/livros');
      setLivros(response.data);
    } catch (error) {
        Alert.alert('Erro ao realizar a operação de busca de livros, tente novamente mais tarde!');
    }
  }

  async function carregarClientes() {
    try {
      const response = await api.get('/clientes');
      setClientes(response.data);
    } catch (error) {
        Alert.alert('Erro ao realizar a operação de busca clientes, tente novamente mais tarde!');
    }
  }

  useEffect(() => {
    carregarClientes()
    carregarLivros()
  }, []);

  async function handleSubmit() {
    try {
      const response = await api.post('/emprestimos',
        {
          cliente: { id: idCliente },
          dataDeDevolucao:moment(dataDeDevolucao, 'DD/MM/YYYY').format('YYYY-MM-DD') ,
          dataDoEmprestimo:moment(dataDoEmprestimo, 'DD/MM/YYYY').format('YYYY-MM-DD'),
          livro: { id: idLivro },
          valorDoEmprestimo
        }).catch((error) =>{
          console.log(error);
        });
      Alert.alert('Emprestimo cadastrado com sucesso!')
      setIdCliente('')
      setDataDeDevolucao('')
      setDataDoEmprestimo('')
      setIdLivro('')
      setValorDoEmprestimo('')
    } catch (error) {
      console.log(error);
      Alert.alert('Erro ao realizar a operação, tente novamente mais tarde!');
    }
  }

    return(
        <KeyboardAvoidingView enable={Platform.OS == 'ios'} 
        behavior="padding"
        style={styles.container}>
            <Text style={styles.titulo}>Cadastro de Emprestimo</Text>
            <View style={styles.form}>
                <Text style={styles.label}>Selecione Cliente: *</Text>
                <Picker selectedValue={idCliente} onValueChange={setIdCliente}>
                    {
                        clientes.map((cliente) => {
                            return <Picker.Item key={cliente.id} label={cliente.nome} value={cliente.id}/>
                        })
                    }
                </Picker>
                <Text style={styles.label}>--------------------------------------------------------</Text>
                <Text style={styles.label}>Selecione Livro: *</Text>
                <Picker selectedValue={idLivro} onValueChange={setIdLivro}>
                    {
                        livros.map((livro) => {
                            return <Picker.Item key={livro.id} label={livro.nome} value={livro.id}/>
                        })
                    }
                </Picker>
                <Text style={styles.label}>--------------------------------------------------------</Text>
                <Text style={styles.label}>Data Emprestimo: *</Text>
                <DatePicker
                    style={{width: 200}}
                    date={dataDoEmprestimo}
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
                    onDateChange={(date) => {setDataDoEmprestimo(moment(date, 'YYYY-MM-DD'))}}
                />
                <Text style={styles.label}>--------------------------------------------------------</Text>
                <Text style={styles.label}>Data Devolução: *</Text>
                <DatePicker
                    style={{width: 200}}
                    date={dataDeDevolucao}
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
                    onDateChange={(date) => {setDataDeDevolucao(moment(date, 'YYYY-MM-DD'))}}
                />
                <Text style={styles.label}>Valor Emprestimo: *</Text>
                <TextInput style={styles.input}
                    keyboardType="decimal-pad"
                    placeholder="valor do emprestimo"
                    placeholderTextColor="#999"
                    value={valorDoEmprestimo}
                    onChangeText={setValorDoEmprestimo}/>
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