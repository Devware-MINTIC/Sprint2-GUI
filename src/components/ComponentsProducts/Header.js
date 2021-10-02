import React from 'react';
import './header.css';
import { LOCATIONS } from './constant';

const Header = ({
  query,
  handleQueryChange,
  title,
  setTitle,
  price,
  setPrice,
  location,
  setLocation,
  isEdit,
  clearInput,
  handleAddOrEditClick,
}) => {
  return (
    <div className="Header">
      <h1>Productos</h1>
      <RealEstateInputs
        title={title}
        setTitle={setTitle}
        price={price}
        setPrice={setPrice}
        location={location}
        setLocation={setLocation}
        isEdit={isEdit}
        clearInput={clearInput}
        handleAddOrEditClick={handleAddOrEditClick}
      />
      <RealEstateFilter query={query} handleQueryChange={handleQueryChange} />
    </div>
  );
};


//Filter
const RealEstateFilter = ({ query, handleQueryChange }) => {
  return (
    <div className="Filter">
      <div className="inputGroup">
        <label htmlFor="Filtro Disponibilidad">Filtrar</label>
        <select
          name="locationFilter"
          value={query}
          onChange={handleQueryChange}
        >
          <option value="">Seleccione Disponibilidad</option>
          {LOCATIONS.map((location) => (
            <option key={location.value} value={location.title}>
              {location.title}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

//Inputs
const RealEstateInputs = ({
  isEdit,
  title,
  setTitle,
  price,
  setPrice,
  location,
  setLocation,
  clearInput,
  handleAddOrEditClick,
}) => {
  const buttonContent = isEdit ? 'Guardar' : 'Agregar';
  return (
    <div>
      <div className="inputGroup">
        <label htmlFor="title">Nombre del Producto</label>
        <input
          type="text"
          name="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div className="inputGroup">
        <label htmlFor="price">Precio Unitario</label>
        <input
          type="text"
          name="price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
      </div>
      <div className="inputGroup">
        <label htmlFor="location">Disponibilidad</label>
        <select
          name="location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        >
          <option value="">Seleccione disponibilidad</option>
          {LOCATIONS.map((location) => (
            <option key={location.value} value={location.title}>
              {location.title}
            </option>
          ))}
        </select>
      </div>
      <button className="button" onClick={handleAddOrEditClick}>
        {buttonContent}
      </button>
      <button className="button" onClick={clearInput}>
        Borrar
      </button>
    </div>
  );
};
export default Header;