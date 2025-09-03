import React from "react";

export default function ContractorsItem({ contractor }) {
  return (
    <div className="contractor-list-item">
      <h3>{contractor.name}</h3>
      <p>{contractor.specialty}</p>
      <p>{contractor.location}</p>
      <p>
        ⭐ {contractor.rating} ({contractor.reviews} reviews)
      </p>
      <p>Price: {contractor.priceRange}</p>
    </div>
  );
}
