import React from 'react';

interface IntroSlideProps {
  color: string;
  icon: React.ReactNode;
  title: string;
  subtitle: string;
}

const IntroSlide: React.FC<IntroSlideProps> = ({ color, icon, title, subtitle }) => {
  return (
    <div
      style={{
        backgroundColor: color,
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
      }}
    >
      {/* Status Bar */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          width: '100%',
          backgroundColor: 'black',
          color: 'white',
          padding: '10px',
          textAlign: 'center',
          fontSize: '14px',
        }}
      >
        10:14
      </div>
      {/* Title */}
      <h1 style={{ color: 'black', fontSize: '28px', marginTop: '50px' }}>{title}</h1>
      {/* Icon */}
      <div style={{ marginTop: '20px' }}>{icon}</div>
      {/* Subtitle */}
      <p style={{ color: 'black', fontSize: '18px', marginTop: '20px' }}>{subtitle}</p>
    </div>
  );
};

export default IntroSlide;