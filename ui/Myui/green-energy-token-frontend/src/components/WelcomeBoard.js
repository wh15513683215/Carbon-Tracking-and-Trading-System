import React, { useState, useEffect } from 'react';
import { useEthereum } from '../context/EthereumContext';

const WelcomeBoard = () => {
  const { account, contractAddress } = useEthereum();
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    if (account) {
      setConnected(true);
    } else {
      setConnected(false);
    }
  }, [account]);

  const handleContractClick = () => {
    if (connected) {
      const url = `https://holesky.beaconcha.in/address/${contractAddress}`;
      window.open(url, "_blank");
    }
  };

  const containerStyle = {
    width: '100%', // Ensure width does not exceed Sidebar position
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '20px', // Add some padding to ensure content is not tight to the edges
  };

  const backgroundStyle = {
    width: '100%',
    maxWidth: '1140px', // Set max width
    height: 325,
    background: 'white',
    boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
    borderRadius: 20,
    border: '1px #FFF2DE solid',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  };

  const contentStyle = {
    width: '100%',
    maxWidth: '1080.95px',
    height: '100%',
    padding: '20px 34px', // Vertical 20px, horizontal 34px
    borderRadius: 20,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  };

  const textContainerStyle = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
  };

  const titleInnerContainerStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 20,
  };

  const titleTextStyle = {
    color: 'black',
    fontSize: 45,
    fontFamily: 'Seaweed Script',
    fontWeight: '400',
    wordWrap: 'break-word',
  };

  const subtitleTextStyle = {
    width: '100%',
    textAlign: 'center',
    color: 'black',
    fontSize: 25,
    fontFamily: 'Roboto Serif',
    fontStyle: 'italic',
    fontWeight: '400',
    wordWrap: 'break-word',
    marginTop: '10px', // Add some top margin
  };

  const imageContainerStyle = {
    position: 'relative', // Position for absolute positioning of the button
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
    marginLeft: '20px', // Add some left margin
  };

  const imageStyle = {
    width: 605,
    height: 280,
  };

  const bottomTextContainerStyle = {
    position: 'absolute', // Absolute positioning
    top: '50%', // Vertically centered
    left: '50%', // Horizontally centered
    transform: 'translate(-50%, -50%)', // Center align
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 15,
  };

  const bottomTextStyle = {
    width: 400,
    textAlign: 'center',
    color: 'black',
    fontSize: 38,
    fontFamily: 'Roboto Slab',
    fontWeight: '600',
    wordWrap: 'break-word',
  };

  const buttonContainerStyle = {
    width: 240,
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 5,
    paddingBottom: 5,
    background: 'black',
    borderRadius: 20,
    overflow: 'hidden',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
    cursor: 'pointer',
  };

  const buttonTextStyle = {
    textAlign: 'center',
    color: 'white',
    fontSize: 25,
    fontFamily: 'Roboto Serif',
    fontWeight: '600',
    wordWrap: 'break-word',
  };

  return (
    <div style={containerStyle}>
      <div style={backgroundStyle}>
        <div style={contentStyle}>
          <div style={textContainerStyle}>
            <div style={titleInnerContainerStyle}>
              <img width={100} height={100} src="/Header/Trademark.svg" alt="Logo" />
              <div style={titleTextStyle}>Carbontracing</div>
            </div>
            <div style={subtitleTextStyle}>
              {connected
                ? 'You are now successfully connected to the Ethers network!'
                : 'Connection to the Ethers network failed!'}
            </div>
          </div>
          <div style={imageContainerStyle}>
            <img style={imageStyle} src="WelcomeBoard/WelcomeBoard.png" alt="Placeholder" />
            <div style={bottomTextContainerStyle}>
              <div style={bottomTextStyle}>Get information of the current Contract</div>
              <div style={buttonContainerStyle} onClick={handleContractClick}>
                <div style={buttonTextStyle}>Contract</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomeBoard;
