import React from 'react';

const BurnComponent = ({ onButtonClick }) => {
  const containerStyle = {
    width: '320px',
    height: '300px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    backgroundImage: 'url(BuyPart/BackGround_Burn.png)',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    borderRadius: 20,
  };

  const textContainerStyle = {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    gap: 10,
    display: 'flex',
    zIndex: 1,
  };

  const titleStyle = {
    width: 210,
    height: 60,
    textAlign: 'center',
    color: 'black',
    fontSize: 50,
    fontFamily: 'Roboto Serif',
    fontWeight: '700',
    wordWrap: 'break-word',
  };

  const iconStyle = {
    width: 60,
    height: 60,
  };

  const buttonContainerStyle = {
    width: 240,
    height: 80,
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 5,
    paddingBottom: 5,
    background: 'black',
    borderRadius: 20,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
    display: 'inline-flex',
    zIndex: 1,
    cursor: 'pointer', // 添加鼠标悬停效果
  };

  const buttonTextStyle = {
    textAlign: 'center',
    color: 'white',
    fontSize: 35,
    fontFamily: 'Roboto Serif',
    fontWeight: '600',
    wordWrap: 'break-word',
  };

  return (
    <div style={containerStyle}>
      <div style={textContainerStyle}>
        <div style={titleStyle}>Burn<br/></div>
        <img style={iconStyle} src="BuyPart/BurnIcon.png" alt="Icon" />
        <div style={buttonContainerStyle} onClick={onButtonClick}>
          <div style={buttonTextStyle}>Compensate</div>
        </div>
      </div>
    </div>
  );
};

export default BurnComponent;
