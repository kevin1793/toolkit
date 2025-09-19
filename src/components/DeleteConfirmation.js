import React, { useEffect, useState } from 'react';

import "./../styles/DeleteConfirmationModal.css"; // Optional: You can style the modal

const DeleteConfirmationModal = ({ isOpen, onClose, onDelete }) => {
    const [showModal, setShowModal] = useState(isOpen);


  // Ensure modal only renders when it's meant to
  useEffect(() => {
    if (isOpen) {
      setShowModal(true);
    } else {
      // Delay closing modal to allow for the fade-out effect
      const timer = setTimeout(() => {
        setShowModal(false);
      }, 300); // Matches the fade-out duration
      return () => clearTimeout(timer); // Cleanup on unmount
    }
  }, [isOpen]);

  if (!showModal) return null; // Don't render modal if it's closed

  return (
    <div className={`modal-overlay ${isOpen ? "fade-in" : "fade-out"}`}>
      <div className={`modal-content ${isOpen ? "slide-up" : "slide-down"}`}>
        <h2>Are you sure?</h2>
        <p>This action <strong>cannot be undone</strong>.</p>
        <div className="modal-buttons">
          <button className="cancel-button" onClick={onClose}>
            Cancel
          </button>
          <button className="delete-button" onClick={onDelete}>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmationModal;