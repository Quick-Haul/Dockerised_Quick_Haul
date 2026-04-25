import React from 'react';

const MapComponent = ({ center, markers = [], height = "300px" }) => {
  // Extract info from markers if available
  const activeCenter = markers.length > 0 ? markers[0] : null;

  return (
    <div style={{ 
      height, 
      width: '100%', 
      borderRadius: '12px', 
      overflow: 'hidden', 
      border: '1px solid rgba(61, 159, 255, 0.2)',
      background: 'linear-gradient(135deg, #f8faff 0%, #ffffff 100%)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px',
      textAlign: 'center'
    }}>
      <div style={{ fontSize: '48px', marginBottom: '15px' }}>📍</div>
      {activeCenter ? (
        <>
          <h3 style={{ margin: '0 0 10px 0', color: '#1a1a2e', fontSize: '20px' }}>
            {activeCenter.name || "Location Selected"}
          </h3>
          <p style={{ margin: '0', color: '#6b7280', maxWidth: '80%' }}>
            {activeCenter.address || "Address details will appear here"}
          </p>
          {activeCenter.phone && (
            <p style={{ marginTop: '10px', color: '#3d9fff', fontWeight: '600' }}>
              📞 {activeCenter.phone}
            </p>
          )}
        </>
      ) : (
        <p style={{ color: '#9ca3af', fontStyle: 'italic' }}>
          Select a center to see location details
        </p>
      )}
    </div>
  );
};

export default MapComponent;
