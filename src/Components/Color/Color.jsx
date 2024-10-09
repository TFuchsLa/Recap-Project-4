import { useState } from "react";
import ColorForm from "../ColorForm/ColorForm";
import "./Color.css";

export default function Color({ color, onDelete, onEdit }) {
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [isEditing, setIsEditing] = useState(false); // Zustand für Bearbeitungsmodus

  const handleDeleteClick = () => {
    setConfirmDelete(true);
  };

  const confirmDeleteHandler = () => {
    onDelete(color.id);
    setConfirmDelete(false);
  };

  const cancelDeleteHandler = () => {
    setConfirmDelete(false);
  };

  const handleEditClick = () => {
    setIsEditing(true); // Bearbeitungsmodus aktivieren
  };

  const handleSubmitEdit = (updatedColor) => {
    onEdit(color.id, updatedColor);
    setIsEditing(false); // Bearbeitungsmodus deaktivieren
  };

  return (
    <div
      className="color-card"
      style={{
        background: color.hex,
        color: color.contrastText,
      }}
    >
      {isEditing ? ( // Wenn im Bearbeitungsmodus, dann zeige Formular
        <ColorForm
          onSubmitColor={handleSubmitEdit}
          initialData={color}
          isEditing={isEditing} // Zustand weitergeben
        />
      ) : (
        <>
          <h3 className="color-card-headline">{color.hex}</h3>
          <h4>{color.role}</h4>
          <p>Kontrast: {color.contrastText}</p>
          <button onClick={handleDeleteClick}>Delete</button>
          {confirmDelete && (
            <div className="color-card-highlight">
              <p>Are you sure you want to delete this color?</p>
              <button onClick={confirmDeleteHandler}>Yes</button>
              <button onClick={cancelDeleteHandler}>No</button>
            </div>
          )}
          <button onClick={handleEditClick}>Edit</button>
        </>
      )}
    </div>
  );
}
