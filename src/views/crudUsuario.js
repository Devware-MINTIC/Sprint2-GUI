import React from 'react';
//import logo from './logo.svg';
//import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Table, Button, Container, Modal, ModalBody, ModalHeader, FormGroup, ModalFooter} from 'reactstrap';

const data = [
  {id: 1, correo: "usuario1@devware.com", rol:"Administrador", estado:"Autorizado"},
  {id: 2, correo: "usuario2@devware.com", rol:"Usuario", estado:"No Autorizado"},
  {id: 3, correo: "usuario3@devware.com", rol:"Otro Usuario", estado:"Pendiente"},
];

class CrudUsuario extends React.Component{
      
      state = {
        data : data,
        modalActualizar: false,
        modalInsertar: false,
        form: {
          id: "",
          correo: "",
          rol: "",
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
            arreglo[contador].correo = dato.correo;
            arreglo[contador].rol = dato.rol;
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
            <h1>Usuarios</h1>
            <br/>
            <Button color="success" onClick={()=>this.mostrarModalInsertar()}>Insertar nuevo usuario</Button>
            <br/><br/>

            <Table>
              <thead><tr>
                <th>Id</th>
                <th>Correo</th>
                <th>Rol</th>
                <th>Estado</th>
                <th>Acciones</th>
              </tr></thead>
              <tbody>
                {this.state.data.map((elemento) => (
                  <tr>

                    <td>{elemento.id}</td>
                    <td>{elemento.correo}</td>
                    <td>{elemento.rol}</td>
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
           <div><h3>Editar usuario</h3></div>
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
                Correo: 
              </label>
              <input
                className="form-control"
                name="correo"
                type="text"
                onChange={this.handleChange}
                value={this.state.form.correo}
              />
            </FormGroup>
            
            <FormGroup>
              <label>
                Rol: 
              </label>
              <input
                className="form-control"
                name="rol"
                type="text"
                onChange={this.handleChange}
                value={this.state.form.rol}
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
           <div><h3>Agregar usuario</h3></div>
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
                Correo: 
              </label>
              <input
                className="form-control"
                name="correo"
                type="text"
                onChange={this.handleChange}
              />
            </FormGroup>
            
            <FormGroup>
              <label>
                Rol: 
              </label>
              <input
                className="form-control"
                name="rol"
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

export default CrudUsuario;