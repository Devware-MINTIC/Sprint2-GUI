import React from 'react';
//import logo from './logo.svg';
//import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Table, Button, Container, Modal, ModalBody, ModalHeader, FormGroup, ModalFooter} from 'reactstrap';

const data = [
  {id: 1, valortotal: "$10000", estado:"En proceso", totalproductos:"5", productosPrecio: "$2000", 
  fechadeVenta:"20210929", Documento:"12345678", nombreCliente:"Armando Quijano", encargadoVenta: "Natalia Fernández"},
  {id: 2, valortotal: "$20000", estado:"Cancelado", totalproductos:"5", productosPrecio: "$4000", 
  fechadeVenta:"20210927", Documento:"87654321", nombreCliente:"Yudy Vallejo", encargadoVenta: "Yimmer Fernández"},
  {id: 3, valortotal: "$100000", estado:"Entrgado", totalproductos:"10", productosPrecio: "$10000", 
  fechadeVenta:"20210927", Documento:"937452642", nombreCliente:"Jessica Pinzon", encargadoVenta: "Tulio Salazar"},
];

class CrudVenta extends React.Component{
      
      state = {
        data : data,
        modalActualizar: false,
        modalInsertar: false,
        form: {
          id: "",
          valortotal: "",
          estado: "",
          totalproductos: "",
          productosPrecio: "",
          fechadeVenta: "",
          Documento: "",
          nombreCliente: "",
          encargadoVenta: "",
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
            arreglo[contador].valortotal = dato.valortotal;
            arreglo[contador].estado = dato.estado;
            arreglo[contador].totalproductos = dato.totalproductos;
            arreglo[contador].productosPrecio = dato.productosPrecio;
            arreglo[contador].fechadeVenta = dato.fechadeVenta;
            arreglo[contador].Documento = dato.Documento;
            arreglo[contador].nombreCliente = dato.nombreCliente;
            arreglo[contador].encargadoVenta = dato.encargadoVenta;

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
            <h1>Detalle de ventas</h1>
            <br/>
            <Button color="success" onClick={()=>this.mostrarModalInsertar()}>Insertar nuevo detalle de venta</Button>
            <br/><br/>

            <Table>
              <thead><tr>
                <th>Id</th>
                <th>valor Total</th>
                <th>Estado</th>
                <th>Total productos</th>
                <th>Precio Producto</th>
                <th>Fecha de Venta</th>
                <th>Documento</th>
                <th>Nombre de cliente</th>
                <th>Encargado de Venta</th>
                <th>Acciones</th>
              </tr></thead>
              <tbody>
                {this.state.data.map((elemento) => (
                  <tr>

                    <td>{elemento.id}</td>
                    <td>{elemento.valortotal}</td>
                    <td>{elemento.estado}</td>
                    <td>{elemento.totalproductos}</td>
                    <td>{elemento.productosPrecio}</td>
                    <td>{elemento.fechadeVenta}</td>
                    <td>{elemento.Documento}</td>
                    <td>{elemento.nombreCliente}</td>
                    <td>{elemento.encargadoVenta}</td>

                    <td><Button color="primary" onClick={() => this.mostrarModalActualizar(elemento)}>Editar</Button>{' '} 
                    <   Button color="danger" onClick={()=> this.eliminar(elemento)}>Eliminar</Button></td>
                  </tr>
                ))}
              </tbody>
            </Table>
         </Container>
         
         <Modal isOpen={this.state.modalActualizar}>
          <ModalHeader>
           <div><h3>Editar Registro</h3></div>
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
                Valor Total: 
              </label>
              <input
                className="form-control"
                name="valortotal"
                type="text"
                onChange={this.handleChange}
                value={this.state.form.valortotal}
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

            <FormGroup>
              <label>
                Total Productos: 
              </label>
              <input
                className="form-control"
                name="totalproductos"
                type="text"
                onChange={this.handleChange}
                value={this.state.form.totalproductos}
              />
            </FormGroup>

            <FormGroup>
              <label>
                Precios Productos: 
              </label>
              <input
                className="form-control"
                name="productosPrecio"
                type="text"
                onChange={this.handleChange}
                value={this.state.form.productosPrecio}
              />
            </FormGroup>

            <FormGroup>
              <label>
                Fecha de Venta: 
              </label>
              <input
                className="form-control"
                name="fechadeVenta"
                type="text"
                onChange={this.handleChange}
                value={this.state.form.fechadeVenta}
              />
            </FormGroup>

            <FormGroup>
              <label>
                Documento: 
              </label>
              <input
                className="form-control"
                name="Documento"
                type="text"
                onChange={this.handleChange}
                value={this.state.form.Documento}
              />
            </FormGroup>

            <FormGroup>
              <label>
                Nombre del Cliente: 
              </label>
              <input
                className="form-control"
                name="nombreCliente"
                type="text"
                onChange={this.handleChange}
                value={this.state.form.nombreCliente}
              />
            </FormGroup>

            <FormGroup>
              <label>
                Encargado de venta: 
              </label>
              <input
                className="form-control"
                name="encargadoVenta"
                type="text"
                onChange={this.handleChange}
                value={this.state.form.encargadoVenta}
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
           <div><h3>Agregar detalle de venta</h3></div>
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
                Valor Total: 
              </label>
              <input
                className="form-control"
                name="valortotal"
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

            <FormGroup>
              <label>
                Total productos: 
              </label>
              <input
                className="form-control"
                name="totalproductos"
                type="text"
                onChange={this.handleChange}
              />
            </FormGroup>

            <FormGroup>
              <label>
                Precio de productos: 
              </label>
              <input
                className="form-control"
                name="productosPrecio"
                type="text"
                onChange={this.handleChange}
              />
            </FormGroup>

            <FormGroup>
              <label>
                Fecha de venta: 
              </label>
              <input
                className="form-control"
                name="fechadeVenta"
                type="text"
                onChange={this.handleChange}
              />
            </FormGroup>

            <FormGroup>
              <label>
                Documento: 
              </label>
              <input
                className="form-control"
                name="Documento"
                type="text"
                onChange={this.handleChange}
              />
            </FormGroup>

            <FormGroup>
              <label>
                Nombre de cliente: 
              </label>
              <input
                className="form-control"
                name="nombreCliente"
                type="text"
                onChange={this.handleChange}
              />
            </FormGroup>

            <FormGroup>
              <label>
                Encargado de Venta: 
              </label>
              <input
                className="form-control"
                name="encargadoVenta"
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

export default CrudVenta;