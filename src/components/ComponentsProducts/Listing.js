import React from 'react';
import './card.css';
import DogIcon from '../../images/icons/dog.svg';
import champion from '../../images/champion.jpg';


import './card.css';

const Listing = ({
  listings,
  handleEditClick,
  handleDeleteClick,
}) => {
  return (
    <div className="listing">
      {listings.map((listing) => (
        <CompleteCard
          key={listing.id}
          data={listing}
          handleEditClick={handleEditClick}
          handleDeleteClick={handleDeleteClick}
        />
      ))}
    </div>
  );
};

const CompleteCard = ({ data, handleEditClick, handleDeleteClick }) => {
  return (
    <div className="card">
      <CardImg
        title={data.title}
        handleEditClick={handleEditClick}
        handleDeleteClick={handleDeleteClick}
        id={data.id}
      />
      <CardTitle title={data.title} />
      <hr />
      <CardDetails location={data.location} />
      <hr />
      <CardPrice price={data.price} />
    </div>
  );
};
//Details
const CardDetails = ({ location }) => {
  return (
    <div className="cardDetails">
      <div className="details__detail">
        <img
          className="detail__icon"
          src={DogIcon}
          alt="Dog Icon"
        />
        <p className="details__detail__text">{location}</p>
      </div>
    </div>
  );
};

//ImageCard
const CardImg = ({
  title,
  id,
  handleEditClick,
  handleDeleteClick,
}) => {
  return (
    <div className="cardImg">
      <img src={champion} alt={title} className="cardImg__img" />
      <button
        className="cardImg__editButton"
        onClick={handleEditClick}
        value={id}
      >
        Editar
      </button>
      <button
        className="cardImg__deleteButton"
        onClick={handleDeleteClick}
        value={id}
      >
        Eliminar
      </button>
    </div>
  );
};
//Price
const CardPrice = ({ price }) => {
  const priceContent = price.toLocaleString();
  return <h4 className="cardPrice">{`$ ${priceContent} COP`}</h4>;
};

//title
const CardTitle = ({ title }) => {
  return <h2 className="cardTitle">{title}</h2>;
};
export default Listing;
