import React, { useEffect, useState, forwardRef, useCallback } from "react";

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

import useAuth from "../hooks/useAuth"

import { getProducts, updateProductById, createProduct } from "../services/products";

const tableIcons = {
  Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
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
  const [name, setName] = useState("");
  const [value, setValue] = useState("");
  const [status, setStatus] = useState(true);

  const isSaleValid =
  dataProducts?.some((product) => product.value > 0) &&
  !!name &&
  !!status;

  useEffect(() => {
    setIsLoading(true);
    getProducts().then((data) => {
      setDataProducts(data?.products);
    }).finally(() => setIsLoading(false));
  }, []);

  const columns = [
    { title: "uid", field: "uid", hidden: true, editable: "never" },
    { 
      title: "Nombre del producto", 
      field: "name", 
      editable: "onUpdate" 
    },
    { 
      title: "Precio", 
      field: "value", 
      editable: "onUpdate",
      type: "numeric",
      validate: (rowData) => rowData.value >= 0,
    },
    {
      title: "Disponibilidad",
      field: "state",
      editable: "onUpdate",
      type: "boolean",
      
    },
    
   
  ];

  const handleRowUpdate = (newData, oldData, resolve) => {
    setIsLoading(true);
    updateProductById({
      uid: newData.uid,
      state: newData.state,
    }).then(() => {
      const dataUpdate = [...dataProducts];
      const index = oldData.tableData.id;
      dataUpdate[index] = newData;
      setDataProducts([...dataUpdate]);
      resolve();
    }).finally(() => setIsLoading(false));
  };
  const handleCreateProduct = () => {
    setIsLoading(true);
    const products = dataProducts
      .filter((product) => product.value > 0)
      .map((product) => {
        const { tableData, state, ...rest } = product;
        return rest;
      });
    createProduct({
      name,
      value,
      status,
    }).then((response) => {
      setName("");
      setValue();
      setStatus(true);

    }).finally(() => setIsLoading(false));
  };

  const getAllProducts = useCallback(() => {
    setIsLoading(true);
    setTimeout(() => {
      getProducts().then((data) => {
        const newProducts = data?.products
          .filter((product) => product.state)
          .map((product) => ({
            ...product,
            value: 0,
          }));
        setDataProducts(newProducts);
      }).finally(() => setIsLoading(false));
    }, 200)
    
  }, [setIsLoading]);

  useEffect(() => {
    getAllProducts();
  }, [getAllProducts]);
   

  return (
    <div className="container">
      <div class="my-3 row">
        <div class="col">
          <label>Nombre del producto</label>
          <input
            type="text"
            class="form-control"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div class="col">
          <label>Precio del producto</label>
          <input
            type="number"
            class="form-control"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
        </div>
        <div class="col">
          <label>Disponibilidad</label>
          <input
            type="boolean"
            class="form-control"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          />
        </div>
      </div>
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
        }}
        options={{
          actionsColumnIndex: -1,
        }}
        style={{
          display: "grid",
          height: "350px",
        }}
      />
      <div className="d-flex justify-content-between mt-5">
         <button
          disabled={!isSaleValid}
          className="btn btn-success px-5"
          onClick={handleCreateProduct}
        >
          Crear Producto
        </button>
      </div>
    </div>
  );
};


export default Products;