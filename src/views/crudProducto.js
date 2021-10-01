import React from 'react';
//import logo from './logo.svg';
//import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Table, Button, Container, Modal, ModalBody, ModalHeader, FormGroup, ModalFooter} from 'reactstrap';

const data = [
  {id: 1, nombre: "Producto A", valor:"$10000", estado:"Disponible"},
  {id: 2, nombre: "Producto B", valor:"$20000", estado:"No Disponible"},
  {id: 3, nombre: "Producto C", valor:"$30000", estado:"Disponible"},
];

class CrudProducto extends React.Component{
      
      state = {
        data : data,
        modalActualizar: false,
        modalInsertar: false,
        form: {
          id: "",
          nombre: "",
          valor: "",
          estado: "",
        },
      }

      mostrarModalActualizar = (dato) => {
        this.setState({
          form: dato,
          modalActualizar: true,
        });
      };
    
      cerrarModalActualizar = () => {
        this.setState({ modalActualizar: false });
      };
    
      mostrarModalInsertar = () => {
        this.setState({
          modalInsertar: true,
        });
      };
    
      cerrarModalInsertar = () => {
        this.setState({ modalInsertar: false });
      };

      editar = (dato) => {
        var contador = 0;
        var arreglo = this.state.data;
        arreglo.map((registro) => {
          if (dato.id == registro.id) {
            arreglo[contador].nombre = dato.nombre;
            arreglo[contador].valor = dato.valor;
            arreglo[contador].estado = dato.estado;
          }
          contador++;
        });
        this.setState({ data: arreglo, modalActualizar: false });
      };
    
      eliminar = (dato) => {
        var opcion = window.confirm("Estás Seguro que deseas Eliminar el elemento "+dato.id);
        if (opcion == true) {
          var contador = 0;
          var arreglo = this.state.data;
          arreglo.map((registro) => {
            if (dato.id == registro.id) {
              arreglo.splice(contador, 1);
            }
            contador++;
          });
          this.setState({ data: arreglo, modalActualizar: false });
        }
      };
    
      insertar= ()=>{
        var valorNuevo= {...this.state.form};
        valorNuevo.id=this.state.data.length+1;
        var lista= this.state.data;
        lista.push(valorNuevo);
        this.setState({ modalInsertar: false, data: lista });
      }

      handleChange = (e) => {
        this.setState({
          form: {
            ...this.state.form,
            [e.target.name]: e.target.value,
          },
        });
      };

      render(){
         return(
         <>
         <Container>
            <h1>Productos</h1>
            <br/>
            <Button color="success" onClick={()=>this.mostrarModalInsertar()}>Insertar nuevo producto</Button>
            <br/><br/>

            <Table>
              <thead><tr>
                <th>Id</th>
                <th>Nombre</th>
                <th>Valor</th>
                <th>Estado</th>
                <th>Acciones</th>
              </tr></thead>
              <tbody>
                {this.state.data.map((elemento) => (
                  <tr>

                    <td>{elemento.id}</td>
                    <td>{elemento.nombre}</td>
                    <td>{elemento.valor}</td>
                    <td>{elemento.estado}</td>

                    <td><Button color="primary" onClick={() => this.mostrarModalActualizar(elemento)}>Editar</Button>{' '} 
                    <   Button color="danger" onClick={()=> this.eliminar(elemento)}>Eliminar</Button></td>
                  </tr>
                ))}
              </tbody>
            </Table>
         </Container>
         
         <Modal isOpen={this.state.modalActualizar}>
          <ModalHeader>
           <div><h3>Editar producto</h3></div>
          </ModalHeader>

          <ModalBody>
            <FormGroup>
              <label>
               Id:
              </label>
            
              <input
                className="form-control"
                readOnly
                type="text"
                value={this.state.form.id}
              />
            </FormGroup>
            
            <FormGroup>
              <label>
                Nombre: 
              </label>
              <input
                className="form-control"
                name="nombre"
                type="text"
                onChange={this.handleChange}
                value={this.state.form.nombre}
              />
            </FormGroup>
            
            <FormGroup>
              <label>
                Valor: 
              </label>
              <input
                className="form-control"
                name="valor"
                type="text"
                onChange={this.handleChange}
                value={this.state.form.valor}
              />
            </FormGroup>

            <FormGroup>
              <label>
                Estado: 
              </label>
              <input
                className="form-control"
                name="estado"
                type="text"
                onChange={this.handleChange}
                value={this.state.form.estado}
              />
            </FormGroup>

          </ModalBody>

          <ModalFooter>
            <Button
              color="primary"
              onClick={() => this.editar(this.state.form)}
            >
              Editar
            </Button>
            <Button
              color="danger"
              onClick={() => this.cerrarModalActualizar()}
            >
              Cancelar
            </Button>
          </ModalFooter>
        </Modal>



        <Modal isOpen={this.state.modalInsertar}>
          <ModalHeader>
           <div><h3>Agregar producto</h3></div>
          </ModalHeader>

          <ModalBody>
            <FormGroup>
              <label>
                Id: 
              </label>
              
              <input
                className="form-control"
                readOnly
                type="text"
                value={this.state.data.length+1}
              />
            </FormGroup>
            
            <FormGroup>
              <label>
                Nombre: 
              </label>
              <input
                className="form-control"
                name="nombre"
                type="text"
                onChange={this.handleChange}
              />
            </FormGroup>
            
            <FormGroup>
              <label>
                Valor: 
              </label>
              <input
                className="form-control"
                name="valor"
                type="text"
                onChange={this.handleChange}
              />
            </FormGroup>

            <FormGroup>
              <label>
                Estado: 
              </label>
              <input
                className="form-control"
                name="estado"
                type="text"
                onChange={this.handleChange}
              />
            </FormGroup>

          </ModalBody>

          <ModalFooter>
            <Button
              color="primary"
              onClick={() => this.insertar()}
            >
              Insertar
            </Button>
            <Button
              className="btn btn-danger"
              onClick={() => this.cerrarModalInsertar()}
            >
              Cancelar
            </Button>
          </ModalFooter>
        </Modal>

         </>)
      }
}

export default CrudProducto;