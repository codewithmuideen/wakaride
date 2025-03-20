import React, { useState } from "react";

const OpenRouteService = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchMatrix = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch("https://api.openrouteservice.org/v2/matrix/driving-car", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "5b3ce3597851110001cf624890ea788ee71c4081a512348822df3178",
        },
        body: JSON.stringify({
          locations: [
            [9.70093, 48.477473],
            [9.207916, 49.153868],
            [37.573242, 55.801281],
            [115.663757, 38.106467]
          ],
          metrics: ["distance", "duration"],
        }),
      });
      
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      
      const result = await response.json();
      setData(result);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>OpenRouteService Matrix API</h2>
      <button onClick={fetchMatrix} disabled={loading}>
        {loading ? "Loading..." : "Fetch Data"}
      </button>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {data && (
        <pre>{JSON.stringify(data, null, 2)}</pre>
      )}
    </div>
  );
};

export default OpenRouteService;
