import { useState, useEffect } from "react"; // Importiere useState und useEffect für den Zustand und das Timing
import "./CopyToClipboard.css"; // Optionale CSS-Datei für das Styling

export default function CopyToClipboard({ hex }) {
  const [isCopied, setIsCopied] = useState(false); // Zustand für die Bestätigungsmeldung

  // Funktion zum Kopieren des Hex-Codes in die Zwischenablage
  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(hex); // Kopiere den Hex-Code in die Zwischenablage
      setIsCopied(true); // Ändere den Button-Text zu "SUCCESSFULLY COPIED"
    } catch (error) {
      console.error("Failed to copy: ", error); // Fehlerbehandlung, falls das Kopieren fehlschlägt
    }
  }

  // Nutze useEffect, um den Button-Text nach 3 Sekunden zurückzusetzen
  useEffect(() => {
    if (isCopied) {
      const timer = setTimeout(() => {
        setIsCopied(false); // Setze den Zustand nach 3 Sekunden zurück
      }, 3000);

      return () => clearTimeout(timer); // Aufräumen des Timers
    }
  }, [isCopied]); // Effekt wird erneut ausgelöst, wenn sich isCopied ändert

  return (
    <div className="copy-container">
      <button onClick={handleCopy}>
        {isCopied ? "SUCCESSFULLY COPIED" : "Copy"}{" "}
        {/* Dynamischer Button-Text */}
      </button>
    </div>
  );
}
