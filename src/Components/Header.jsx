// Header.js
import React from 'react';

const Header = () => {
  return (
    <header
      style={{
        background: '#0078D7',
        color: '#fff',
        padding: '10px 20px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
    >
      <h1 style={{ margin: 0, fontSize: '18px' }}>WanderWise</h1>
      <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
        <input
          type="text"
          placeholder="Search..."
          style={{
            padding: '8px 12px',
            borderRadius: '4px',
            border: '1px solid #ccc',
          }}
        />
        <button
          style={{
            background: '#fff',
            border: 'none',
            borderRadius: '50%',
            width: '30px',
            height: '30px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
          }}
        >
          🔔
        </button>
        <div
          style={{
            width: '30px',
            height: '30px',
            borderRadius: '50%',
            background: '#fff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '14px',
            fontWeight: 'bold',
            color: '#0078D7',
          }}
        >
          PJ
        </div>
      </div>
    </header>
  );
};

export default Header;