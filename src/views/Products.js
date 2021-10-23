import React, { useEffect, useState, forwardRef } from "react";

import MaterialTable from "material-table";
import ArrowDownward from "@material-ui/icons/ArrowDownward";
import Check from "@material-ui/icons/Check";
import ChevronLeft from "@material-ui/icons/ChevronLeft";
import ChevronRight from "@material-ui/icons/ChevronRight";
import Clear from "@material-ui/icons/Clear";
import Edit from "@material-ui/icons/Edit";
import FirstPage from "@material-ui/icons/FirstPage";
import LastPage from "@material-ui/icons/LastPage";
import Search from "@material-ui/icons/Search";
import AddBox from '@material-ui/icons/AddBox';

import useAuth from "../hooks/useAuth"

import { getProducts, updateProductById, createProduct } from "../services/products";
//updateProductById
//getProducts

const tableIcons = {
  Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
  Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
  Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
  FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
  LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
  NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  PreviousPage: forwardRef((props, ref) => (
    <ChevronLeft {...props} ref={ref} />
  )),
  ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
  SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
};


const Products = () => {
  const { setIsLoading } = useAuth();
  const [dataProducts, setDataProducts] = useState([]);
  
  useEffect(() => {
    setIsLoading(true);
    getProducts().then((data) => {
      setDataProducts(data?.products);
    }).finally(() => setIsLoading(false));
  }, []);

  const columns = [
    { title: "uid", field: "uid", hidden: true, editable: "never" },
    { title: "Nombre del Producto", field: "name", editable: "never" },
    { title: "Precio", field: "value", editable: "onUpdate" },
    { 
      title: "Disponibilidad", 
      field: "state", 
      editable: "onUpdate",
      lookup: {
        true: "Disponible",
        false: "No Disponible"
      },
    },
    
  ];
  const handleRowUpdate = (newData, oldData, resolve) => {
    setIsLoading(true);
    console.log(newData)
    updateProductById({
      uid: newData.uid,
      state: newData.state,
      value: newData.value,
      //name: newData.name,

    }).then(() => {
      const dataUpdate = [...dataProducts];
      const index = oldData.tableData.id;
      dataUpdate[index] = newData;
      setDataProducts([...dataUpdate]);
      resolve();
    }).finally(() => setIsLoading(false));
  };

  const handleCreateProduct = (newData, resolve) => {
    setIsLoading(true);
    const{name, value, state}=newData;
    createProduct({
      name,
      value,
      state,
    }).then((response) => {

      console.log(response)
      //setName("");
      //setValue();
      //setState(true);
      resolve();
    }).finally(() => setIsLoading(false));
  };

  return (
    <div className="container">
      <h1 className="my-3">Productos</h1>
      <MaterialTable
        title=""
        columns={columns}
        data={dataProducts}
        icons={tableIcons}
        editable={{
          onRowUpdate: (newData, oldData) =>
            new Promise((resolve) => {
              handleRowUpdate(newData, oldData, resolve);
            }),
            onRowAdd: (newData) =>
            new Promise((resolve) => {
              handleCreateProduct(newData, resolve)
            }),
        }}
        options={{
          actionsColumnIndex: -1,
          sorting: true,
        }}
      />
    </div>
  );
};

export default Products;