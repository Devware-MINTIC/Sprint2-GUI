import React, { useEffect, useState, forwardRef, useCallback } from "react";
import useAuth from "../hooks/useAuth";

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

import { createSale } from "../services/sales";
import { getProducts } from "../services";

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

const Sales = () => {
  const [dataProducts, setDataProducts] = useState([]);
  const [customerIdNumber, setCustomerIdNumber] = useState("");
  const [customerName, setCustomerName] = useState("");
  const { user, setIsLoading } = useAuth();

  const isSaleValid =
    dataProducts?.some((product) => product.amount > 0) &&
    !!customerIdNumber &&
    !!customerName;

  const columns = [
    { title: "uid", field: "uid", hidden: true, editable: "never" },
    { title: "Nombre del producto", field: "name", editable: "never" },
    { title: "Precio", field: "value", editable: "never" },
    {
      title: "Cantidad",
      field: "amount",
      editable: "onUpdate",
      type: "numeric",
      validate: (rowData) => rowData.amount >= 0,
    },
  ];

  const handleRowUpdate = (newData, oldData, resolve) => {
    const dataUpdate = [...dataProducts];
    const index = oldData.tableData.id;
    dataUpdate[index] = newData;
    setDataProducts([...dataUpdate]);
    resolve();
  };

  const handleCreateSale = () => {
    setIsLoading(true);
    const products = dataProducts
      .filter((product) => product.amount > 0)
      .map((product) => {
        const { tableData, state, ...rest } = product;
        return rest;
      });
    createSale({
      products,
      customerIdNumber,
      customerName,
      salesManager: user.email,
    }).then((response) => {
      setCustomerIdNumber("");
      setCustomerName("");
      getAllProducts();
    }).finally(() => setIsLoading(false));
  };

  const getAllProducts = useCallback(() => {
    setIsLoading(true);
    getProducts().then((data) => {
      const newProducts = data?.products
        .filter((product) => product.state)
        .map((product) => ({
          ...product,
          amount: 0,
        }));
      setDataProducts(newProducts);
    }).finally(() => setIsLoading(false));
  }, [setIsLoading]);

  useEffect(() => {
    getAllProducts();
  }, [getAllProducts]);

  return (
    <div className="container">
      <div class="my-3 row">
        <div class="col">
          <label>Documento del cliente</label>
          <input
            type="text"
            class="form-control"
            value={customerIdNumber}
            onChange={(e) => setCustomerIdNumber(e.target.value)}
          />
        </div>
        <div class="col">
          <label>Nombre del cliente</label>
          <input
            type="text"
            class="form-control"
            value={customerName}
            onChange={(e) => setCustomerName(e.target.value)}
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
        <h2>
          Total:{" "}
          {dataProducts?.reduce((total, product) => {
            return total + product.value * product.amount;
          }, 0)}
        </h2>
        <button
          disabled={!isSaleValid}
          className="btn btn-success px-5"
          onClick={handleCreateSale}
        >
          Generar venta
        </button>
      </div>
    </div>
  );
};

export default Sales;
