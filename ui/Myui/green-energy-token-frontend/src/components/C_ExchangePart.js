import React from 'react';

const ExchangeComponent = ({ onButtonClick }) => {
  const containerStyle = {
    width: '320px',
    height: '300px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    backgroundImage: 'url(BuyPart/BackGround_Exchange.png)',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    borderRadius: 20,
  };

  const textContainerStyle = {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    gap: 5,
    display: 'flex',
    zIndex: 1,
  };

  const titleStyle = {
    width: 230,
    height: 60,
    textAlign: 'center',
    color: 'black',
    fontSize: 50,
    fontFamily: 'Roboto Serif',
    fontWeight: '700',
    wordWrap: 'break-word',
  };

  const iconsContainerStyle = {
    height: 64,
    justifyContent: 'center',
    alignItems: 'center',
    display: 'inline-flex',
    zIndex: 1,
  };

  const iconStyle = {
    width: 50,
    height: 50,
  };

  const linesContainerStyle = {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 14,
    display: 'inline-flex',
  };

  const lineStyle = {
    width: 60,
    height: 0,
    border: '2px black solid',
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
        <div style={titleStyle}>Exchange<br/></div>
        <div style={iconsContainerStyle}>
          <img style={iconStyle} src="BuyPart/ETHIcon.png" alt="Icon 1" />
          <div style={linesContainerStyle}>
            <div style={lineStyle}></div>
            <div style={lineStyle}></div>
          </div>
          <img style={iconStyle} src="BuyPart/GETIcon.png" alt="Icon 2" />
        </div>
        <div style={buttonContainerStyle} onClick={onButtonClick}>
          <div style={buttonTextStyle}>Buy</div>
        </div>
      </div>
    </div>
  );
};

export default ExchangeComponent;
