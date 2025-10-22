export const ListCard = ({ items, title, description, color = "#e879f9" }) => {
  const BulletList = ({ items, color = "#e879f9" }) => {
    return (
      <ul className="list-none p-0 m-0">
        {items.map((item, index) => {
          const isOptional = item.optional ?? false;
          return (
            <li
              key={index}
              className={`flex items-center gap-3 text-sm leading-relaxed ${index !== items.length - 1 ? "mb-1" : ""}`}
            >
              <span className="text-[10px] flex-shrink-0" style={{ color }}>
                {isOptional ? "○" : "●"}
              </span>
              <span className={isOptional ? "opacity-70" : "opacity-100"}>
                <span dangerouslySetInnerHTML={{ __html: item.text }} />
                {isOptional && (
                  <span className="text-xs ml-2" style={{ color }}>
                    (optional)
                  </span>
                )}
              </span>
            </li>
          );
        })}
      </ul>
    );
  };

  // Convert hex to RGB for tailwind-compatible opacity
  const hexToRgb = (hex) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
      ? {
          r: parseInt(result[1], 16),
          g: parseInt(result[2], 16),
          b: parseInt(result[3], 16),
        }
      : { r: 232, g: 121, b: 249 }; // fallback to default color
  };

  const rgb = hexToRgb(color);
  const bgColor = `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.05)`;

  return (
    <div
      className="relative p-4 px-5 rounded-xl mb-6"
      style={{
        border: `2px solid ${color}`,
        backgroundColor: bgColor,
      }}
    >
      {title && (
        <h3 className={`text-base mt-0 font-semibold ${description ? "mb-2" : "mb-3"}`} style={{ color }}>
          {title}
        </h3>
      )}
      {description && <p className="text-sm m-0 mb-3 leading-snug">{description}</p>}
      <BulletList items={items} color={color} />
    </div>
  );
};
