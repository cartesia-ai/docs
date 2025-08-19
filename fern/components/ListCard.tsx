import { BulletList } from './BulletList';

export const ListCard = ({ items, title, description, color = '#e879f9' }) => {
  return (
    <div style={{ 
      padding: '16px 20px', 
      border: `2px solid ${color}`, 
      borderRadius: '12px',
      backgroundColor: `${color}0D`, // hex with alpha
      marginBottom: '24px',
      position: 'relative'
    }}>
      <div style={{
        position: 'absolute',
        top: '-1px',
        left: '-1px',
        right: '-1px',
        bottom: '-1px',
        background: `linear-gradient(135deg, ${color}, ${color}CC)`,
        borderRadius: '12px',
        zIndex: -1,
        opacity: 0.1
      }} />
      {title && (
        <h3 style={{ 
          fontSize: '16px', 
          fontWeight: '600', 
          marginBottom: description ? '8px' : '12px',
          margin: `0 0 ${description ? '8px' : '12px'} 0`,
          color: color
        }}>
          {title}
        </h3>
      )}
      {description && (
        <p style={{ 
          fontSize: '14px', 
          margin: '0 0 12px 0',
          color: 'inherit',
          lineHeight: '1.4'
        }}>
          {description}
        </p>
      )}
      <BulletList items={items} color={color} />
    </div>
  );
};