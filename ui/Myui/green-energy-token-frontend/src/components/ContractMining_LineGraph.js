import React from 'react';
import { useEthereum } from '../context/EthereumContext';

const ContractMiningLineGraph = () => {
  const { isOwner } = useEthereum();

  const containerStyle = {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: '20px',
    marginTop: '20px',
    padding: '20px',
    backgroundColor: isOwner ? '#EDF9FC' : '#F7FCED', // Ensure background matches the theme
   
  };

  const graphContainerStyle = {
    width: '100%',
    maxWidth: '1140px',
    background: '#FFFAFA',
    boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
    borderRadius: '20px',
    padding: '20px',
    boxSizing: 'border-box',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  };

  const contentStyle = {
    width: '100%',
    height: '100%',
    position: 'relative',
  };

  const imageStyle = {
    width: '100%',
    height: 'auto',
    borderRadius: '10px',
  };

  const topBarStyle = {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '20px',
  };

  const buttonContainerStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '14px',
  };

  const buttonStyle = {
    paddingLeft: '10px',
    paddingRight: '10px',
    paddingTop: '5px',
    paddingBottom: '5px',
    background: 'black',
    borderRadius: '10px',
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex',
    cursor: 'pointer',
  };

  const buttonTextStyle = {
    textAlign: 'center',
    color: 'white',
    fontSize: '15px',
    fontFamily: 'Roboto Slab',
    fontWeight: '600',
    wordWrap: 'break-word',
  };

  const balanceContainerStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '40px',
  };

  const balanceInnerContainerStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '20px',
  };

  const balanceTextStyle = {
    textAlign: 'right',
    color: 'black',
    fontSize: '30px',
    fontFamily: 'Roboto Slab',
    fontWeight: '400',
    wordWrap: 'break-word',
  };

  const dividerStyle = {
    height: '40px',
    borderLeft: '3px solid rgba(0, 0, 0, 0.44)',
  };

  const balanceValueContainerStyle = {
    display: 'flex',
    alignItems: 'center',
  };

  const balanceValueTextStyle = {
    textAlign: 'right',
    color: 'black',
    fontSize: '40px',
    fontFamily: 'Times New Roman',
    fontWeight: '400',
    wordWrap: 'break-word',
  };

  const balanceImageStyle = {
    width: '50px',
    height: '50px',
    marginLeft: '10px',
  };

  const horizontalLineStyle = {
    width: '100%',
    height: '4px',
    background: isOwner ? '#84E3FC' : '#DEF2B1',
    marginTop: '10px',
    border: 'none', // Ensure no border is added
  };

  return (
    <div style={containerStyle}>
      <div style={graphContainerStyle}>
        <div style={contentStyle}>
          <div style={topBarStyle}>
            <div style={buttonContainerStyle}>
              {['All', 'YTD', '12M', '3M', '1M'].map((text) => (
                <div key={text} style={buttonStyle}>
                  <div style={buttonTextStyle}>{text}</div>
                </div>
              ))}
            </div>
            <div style={balanceContainerStyle}>
              <div style={balanceInnerContainerStyle}>
                <div style={balanceTextStyle}>GET Balance</div>
                <div style={dividerStyle}></div>
                <div style={balanceValueContainerStyle}>
                  <div style={balanceValueTextStyle}>15</div>
                  <img style={balanceImageStyle} src="/ContractMining_LineGraph/GetToken.png" alt="Balance Icon" />
                </div>
              </div>
            </div>
          </div>
          <img style={imageStyle} src="/ContractMining_LineGraph/Line_graph.png" alt="Line Graph" />
          <div style={horizontalLineStyle}></div>
        </div>
      </div>
    </div>
  );
};

export default ContractMiningLineGraph;
