import React, { useEffect, useState, forwardRef } from "react";

import MaterialTable from "material-table";
import AddBox from '@material-ui/icons/AddBox';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';

import useAuth from "../hooks/useAuth"

import { getProducts, updateProductById, createProduct } from "../services/products";
//updateProductById
//getProducts

const tableIcons = {
  Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
  Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
  Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
  DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
  Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
  Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
  FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
  LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
  NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
  ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
  SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
  ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
  ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
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
    { title: "Nombre del Producto", field: "name", type: "string", validate: (rowData) => !!rowData.name },
    { title: "Precio", field: "value", type: "numeric", validate: (rowData) => rowData.value >= 0 },
    { title: "Disponibilidad", field: "state", lookup: { true: "Disponible", false: "No disponible" }, validate: (rowData) => !!rowData.state },
  ];

  const handleRowUpdate = (newData, oldData, resolve) => {
    setIsLoading(true);
    const boolState = newData.state === 'true' ? true : false;
    updateProductById({
      uid: newData.uid,
      state: boolState,
      value: newData.value,
      name: newData.name,
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
    const {name, value, state} = newData;
    const boolState = state === 'true' ? true : false;
    createProduct({
      name,
      value,
      state: boolState
    }).then((response) => {
      const dataUpdate = [...dataProducts];
      dataUpdate.push(response.product);
      setDataProducts([...dataUpdate]);
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