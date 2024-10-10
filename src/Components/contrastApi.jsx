export async function checkContrast(foreground, background) {
  const response = await fetch(
    "https://www.aremycolorsaccessible.com/api/are-they",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        foreground: foreground,
        background: background,
      }),
    }
  );

  if (!response.ok) {
    throw new Error("Error fetching contrast data");
  }

  const data = await response.json();
  return data;
}
