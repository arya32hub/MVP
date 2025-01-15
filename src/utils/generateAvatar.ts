const generateAvatar = (initials: string, bgColor: string = "#6A5ACD") => {
  const svg = `
      <svg xmlns="http://www.w3.org/2000/svg" width="123" height="123" style="border-radius: 16px; background: ${bgColor};">
        <text x="50%" y="50%" font-size="48" fill="white" text-anchor="middle" alignment-baseline="middle" font-family="Arial, sans-serif">
          ${initials}
        </text>
      </svg>
    `;

  // Encode the SVG as Base64 using a UTF-8 encoder
  return `data:image/svg+xml;base64,${Buffer.from(svg).toString("base64")}`;
};

export { generateAvatar };
