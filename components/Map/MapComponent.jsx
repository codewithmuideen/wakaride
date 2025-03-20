"use client";

import { useEffect, useState } from "react";

export default function OpenRouteImage() {
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.src = "https://openrouteservice.org/wp-content/uploads/2017/07/Screen-Shot-2017-07-21-at-13.59.05-750x377.png";
    img.onload = () => setImageLoaded(true);
  }, []);

  return (
    <div>
      <br /> <br />
      <h2 style={{fontWeight:600, fontSize:'20px'}}>Map</h2>
      {imageLoaded ? (
        <img
          src="https://openrouteservice.org/wp-content/uploads/2017/07/Screen-Shot-2017-07-21-at-13.59.05-750x377.png"
          alt="OpenRouteService Example"
          style={{ width: "100%", maxWidth: "1000px", height: "auto", border: "2px solid #000" }}
        />
      ) : (
        <p>Loading image...</p>
      )}
    </div>
  );
}
