import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createDrawerNavigator } from 'react-navigation-drawer';
import GeneroCad from './pages/generoCad';
import GeneroList from './pages/generoList';
import LivroList from './pages/livroList';
import LivroCad from './pages/livroCad';
import EditoraCad from './pages/editoraCad';
import EditoraList from './pages/editoraList';
import AutorCad from './pages/autorCad';
import AutorList from './pages/autorList';
import ClienteCad from './pages/clienteCad';
import ClienteList from './pages/clienteList'
import EmprestimoCad from './pages/emprestimoCad'
import EmprestimoList from './pages/emprestimoList'
import EnderecoCAd from './pages/enderecoCad'
import EnderecoList from './pages/enderecoList'

const Routes = createAppContainer(
    createDrawerNavigator({
        CadastroLivro: {
            screen: LivroCad,
            navigationOptions: {
                drawerLabel: "Cadastro de Livro"
            }
        },
        ListaLivro: {
            screen: LivroList,
            navigationOptions: {
                drawerLabel: "Lista de livros"
            }
        },        
        CadastroGenero: {
            screen: GeneroCad,
            navigationOptions: {
                drawerLabel: "Cadastro de genero"
            }
        },
        ListaGenero: {
            screen: GeneroList,
            navigationOptions: {
                drawerLabel: "Lista de genero"
            }
        },        
        CadastroEditora: {
            screen: EditoraCad,
            navigationOptions: {
                drawerLabel: "Cadastro de editora"
            }
        },
        ListaEditora: {
            screen: EditoraList,
            navigationOptions: {
                drawerLabel: "Lista de editora"
            }
        },
        CadastroAutor: {
            screen: AutorCad,
            navigationOptions: {
                drawerLabel: "Cadastro de autor"
            }
        },
        ListaAutor: {
            screen: AutorList,
            navigationOptions: {
                drawerLabel: "Lista de autor"
            }
        },
        CadastroEndereco: {
            screen: EnderecoCAd,
            navigationOptions: {
                drawerLabel: "Cadastro de endereços"
            }
        },
        ListaEndereco: {
            screen: EnderecoList,
            navigationOptions: {
                drawerLabel: "Lista de endereços"
            }
        },
        CadastroCliente: {
            screen: ClienteCad,
            navigationOptions: {
                drawerLabel: "Cadastro de cliente"
            }
        },
        ListaCliente: {
            screen: ClienteList,
            navigationOptions: {
                drawerLabel: "Lista de cliente"
            }
        },
        CadastroEmprestimo: {
            screen: EmprestimoCad,
            navigationOptions: {
                drawerLabel: "Cadastro do emprestimo"
            }
        },
        ListaEmprestimo: {
            screen: EmprestimoList,
            navigationOptions: {
                drawerLabel: "Lista dos emprestimos"
            }
        }
    })
);
export default Routes;