import React, { useState } from 'react';
import ExchangeComponent from './C_ExchangePart';
import BurnComponent from './C_BurnPart';
import BuyDetail from './Buy_Detail';
import CompensateDetail from './Compensate_Detail';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import '../styles/C_Buy_Brun.css'

const TokenOperate = () => {
  const [activeDetail, setActiveDetail] = useState('buy'); // Initialize with 'buy'

  const containerStyle = {
    width: '1178px',
    height: '742px',
    background: 'white',
    position: 'relative',
    display: 'flex',
    flexDirection: 'row',
    gap: '30px',
    padding: '20px',
    boxSizing: 'border-box',
  };

  const leftColumnStyle = {
    display: 'flex',
    flexDirection: 'column',
    gap: '40px',
    justifyContent: 'center',
    alignItems: 'center',
    boxSizing: 'border-box',
  };

  const rightColumnStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    boxSizing: 'border-box',
  };

  const handleButtonClick = (detailType) => {
    setActiveDetail(detailType);
  };

  return (
    <div style={containerStyle}>
      <div style={leftColumnStyle}>
        <ExchangeComponent onButtonClick={() => handleButtonClick('buy')} />
        <BurnComponent onButtonClick={() => handleButtonClick('compensate')} />
      </div>
      <div style={rightColumnStyle}>
        <TransitionGroup>
          <CSSTransition
            key={activeDetail}
            timeout={300}
            classNames="fade"
          >
            {activeDetail === 'buy' ? <BuyDetail /> : <CompensateDetail />}
          </CSSTransition>
        </TransitionGroup>
      </div>
    </div>
  );
};

export default TokenOperate;
