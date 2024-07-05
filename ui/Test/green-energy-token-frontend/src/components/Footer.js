import React from 'react';
import { useEthereum } from '../context/EthereumContext';

const Footer = () => {
  const { isOwner } = useEthereum();

  const containerStyle = {
    width: '100%',
    height: '40px',
    position: 'fixed',
    bottom: 0,
    left: 0,
    background: isOwner ? '#EDF9FC' : '#F7FCED',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  };

  const mainContentStyle = {
    width: '100%',
    maxWidth: 1440,
    height: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '0 20px',
  };

  const textStyle = {
    color: 'rgba(0, 0, 0, 0.50)',
    fontSize: 11,
    fontFamily: 'RocknRoll One',
    fontWeight: '400',
    wordWrap: 'break-word',
  };

  const contactIconsContainerStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
  };

  const iconContainerStyle = {
    width: '37px',
    height: '37px',
    position: 'relative',
  };

  const iconBackgroundStyle = {
    width: '100%',
    height: '100%',
    background: '#D9D9D9',
    borderRadius: '50%',
    position: 'absolute',
    top: 0,
    left: 0,
  };

  const imageStyle = (width, height, left = 0, top = 0) => ({
    width: width,
    height: height,
    left: left,
    top: top,
    position: 'absolute',
  });

  const MaskedIcon = ({ src, imageWidth, imageHeight, imageLeft, imageTop, link }) => (
    <a href={link} target="_blank" rel="noopener noreferrer">
      <div style={iconContainerStyle}>
        <div style={iconBackgroundStyle} />
        <img
          style={imageStyle(imageWidth, imageHeight, imageLeft, imageTop)}
          src={src}
          alt="Icon"
        />
      </div>
    </a>
  );

  return (
    <div style={containerStyle}>
      <div style={mainContentStyle}>
        <div style={{ ...textStyle, width: '220px' }}>
          ©2024 WangHao All rights reserved.
        </div>
        <div style={{ ...textStyle, width: '175px' }}>
          <a href="mailto:wh15513683215@gmail.com" style={{ color: 'inherit', textDecoration: 'none' }}>
            wh15513683215@gmail.com
          </a>
        </div>
        <div style={contactIconsContainerStyle}>
          <MaskedIcon
            src="/Footer_Bar/X.png"
            imageWidth="37px"
            imageHeight="37px"
            link="https://x.com/HaoWang0809"
          />
          <MaskedIcon
            src="/Footer_Bar/Linkin.png"
            imageWidth="34.46px"
            imageHeight="37.97px"
            imageLeft="3.23px"
            imageTop="0"
            link="https://www.linkedin.com/in/wang-hao-wh99999"
          />
          <MaskedIcon
            src="/Footer_Bar/GithubIcon.png"
            imageWidth="37px"
            imageHeight="37px"
            link="https://github.com/wh15513683215"
          />
        </div>
      </div>
    </div>
  );
};

export default Footer;
