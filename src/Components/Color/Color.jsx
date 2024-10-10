import { useState, useEffect } from "react";
import ColorForm from "../ColorForm/ColorForm";
import CopyToClipboard from "../CopyToClipboard/CopyToClipboard"; // Importiere die CopyToClipboard-Komponente
import "./Color.css";

export default function Color({ color, onDelete, onEdit }) {
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [contrastScore, setContrastScore] = useState(""); // Zustand für das Kontrastverhältnis

  // API-Aufruf zur Überprüfung des Kontrasts, wenn sich die Farbe ändert oder bearbeitet wird
  useEffect(() => {
    async function postFetch() {
      try {
        const response = await fetch(
          "https://www.aremycolorsaccessible.com/api/are-they",
          {
            method: "POST",
            body: JSON.stringify({
              colors: [color.contrastText, color.hex], // Senden der Farben im richtigen Format
            }),
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        // Überprüfen, ob die Antwort OK ist
        if (!response.ok) {
          const errorMessage = await response.text(); // Hole die Fehlermeldung
          console.error("API error:", errorMessage);
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        console.log("Received from API:", data); // Debugging-Ausgabe
        setContrastScore(data.overall); // Gesamtbewertung setzen
      } catch (error) {
        console.error("Error fetching contrast data:", error);
        setContrastScore("Error"); // Fehlerzustand setzen
      }
    }

    // API aufrufen, wenn die Farben sich ändern
    if (color.hex && color.contrastText) {
      postFetch();
    } else {
      console.warn("Hex or contrastText is missing"); // Warnung, wenn die Werte fehlen
    }
  }, [color.hex, color.contrastText, isEditing]);

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
    setIsEditing(true);
  };

  const handleSubmitEdit = (updatedColor) => {
    onEdit(color.id, updatedColor);
    setIsEditing(false);
  };

  // Bestimme die Stile basierend auf dem Kontrastwert
  let contrastStyle = {};
  if (contrastScore === "Nope") {
    contrastStyle = {
      backgroundColor: "red",
      color: "black",
      display: "inline",
    }; // Rot für Nope
  } else if (contrastScore === "Kinda") {
    contrastStyle = {
      backgroundColor: "orange",
      color: "black",
      display: "inline",
    }; // Orange für Kinda
  } else if (contrastScore === "Yup") {
    contrastStyle = {
      backgroundColor: "green",
      color: "black",
      display: "inline",
    }; // Grün für Yup
  }

  return (
    <div
      className="color-card"
      style={{ background: color.hex, color: color.contrastText }}
    >
      {isEditing ? (
        <>
          <ColorForm
            onSubmitColor={handleSubmitEdit}
            initialData={color}
            isEditing
          />
          <button onClick={() => setIsEditing(false)}>CANCEL</button>
        </>
      ) : (
        <>
          <div className="hex-code-container">
            <h3 className="color-card-headline">{color.hex}</h3>
            <CopyToClipboard hex={color.hex} />
          </div>
          <h4>{color.role}</h4>
          <p className="contrast-score" style={contrastStyle}>
            Contrast Score: {contrastScore || "Loading..."}
          </p>{" "}
          {/* Zeige das Kontrastverhältnis an */}
          {/* Buttons unter dem Contrast Score */}
          <div>
            <button onClick={handleDeleteClick}>Delete</button>
            {confirmDelete && (
              <div className="color-card-highlight">
                <p>Are you sure you want to delete this color?</p>
                <button onClick={confirmDeleteHandler}>Yes</button>
                <button onClick={cancelDeleteHandler}>No</button>
              </div>
            )}
            <button onClick={handleEditClick}>Edit</button>
          </div>
        </>
      )}
    </div>
  );
}
