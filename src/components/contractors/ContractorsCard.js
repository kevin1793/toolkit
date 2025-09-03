import React from "react";

export default function ContractorsCard({ contractor }) {
  return (
    <div className="contractor-card">
      <div className="contractor-image">
        {contractor.image ? (
          <img src={contractor.image} alt={contractor.name} />
        ) : (
          <div className="placeholder-image">No Image Available</div>
        )}
      </div>

      <div className="contractor-content">
        <h3>{contractor.name}</h3>
        <p>{contractor.specialty}</p>
        <p>{contractor.location}</p>
        <p>
          ⭐ {contractor.rating} ({contractor.reviews} reviews)
        </p>
        <p>Price: {contractor.priceRange}</p>
      </div>
    </div>
  );
}
