import { nanoid } from "nanoid"; // Import nanoid for unique IDs
import { initialColors } from "./lib/colors"; // Import the initial colors
import Color from "./Components/Color/Color"; // Import the Color component
import ColorForm from "./Components/ColorForm/ColorForm"; // Import the ColorForm component
import "./App.css"; // Import the CSS file for the App
import useLocalStorageState from "use-local-storage-state";

function App() {
  const [colors, setColors] = useLocalStorageState("colors", {
    defaultValue: initialColors, // Set initial colors
  });

  function handleAddColor(newColor) {
    const id = nanoid(); // Generiere eine neue ID
    const colorWithId = { id, ...newColor }; // Füge die ID zu den neuen Farbwerten hinzu
    setColors((prevColors) => [colorWithId, ...prevColors]); // Füge die neue Farbe an den Anfang der Liste hinzu
  }

  function handleEditColor(id, updatedColor) {
    setColors((prevColors) =>
      prevColors.map((color) =>
        color.id === id ? { ...color, ...updatedColor } : color
      )
    );
  }

  function handleDeleteColor(id) {
    setColors((prevColors) => prevColors.filter((color) => color.id !== id)); // Entferne die Farbe anhand der ID
  }

  return (
    <>
      <h1>Theme Creator</h1>
      <ColorForm onSubmitColor={handleAddColor} />

      {colors.length > 0 ? (
        colors.map((color) => (
          <Color
            key={color.id}
            color={color}
            onDelete={handleDeleteColor}
            onEdit={handleEditColor}
          />
        ))
      ) : (
        <p>
          No colors left. Please add new colors!
        </p> /* Nachricht, wenn keine Farben mehr vorhanden sind */
      )}
    </>
  );
}

export default App;
