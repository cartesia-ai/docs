export const BulletList = ({ items, color = '#e879f9' }) => {
  return (
    <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
      {items.map((item, index) => (
        <li key={index} style={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: '12px', 
          marginBottom: index === items.length - 1 ? 0 : '3px',
          fontSize: '14px',
          lineHeight: '1.5'
        }}>
          <span style={{ color: color, fontSize: '10px' }}>
            {(item.optional ?? false) ? '●' : '○'}
          </span>
          <span style={{ opacity: (item.optional ?? false) ? 0.7 : 1 }}>
            <span dangerouslySetInnerHTML={{ __html: item.text }} />
            {(item.optional ?? false) && <span style={{ color: color, fontSize: '12px', marginLeft: '8px' }}>(optional)</span>}
          </span>
        </li>
      ))}
    </ul>
  );
};