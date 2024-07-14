import React, { useState } from 'react';
import TableModal from './Public_Logic/TableModal';

const Detail_Get = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [modalType, setModalType] = useState('');

  const containerStyle = {
    width: '100%',
    maxWidth: '1200px',
    height: '100%',
    position: 'relative',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  };

  const bannerStyle = {
    width: '100%',
    height: '290px',
    left: '0',
    top: '0',
    position: 'absolute',
    background: '#FDFDFD',
    boxShadow: '4px 4px 4px rgba(0, 0, 0, 0.25)',
    borderRadius: '20px',
    border: '1px white solid',
  };

  const mainContentStyle = {
    width: '834.32px',
    height: '253.07px',
    left: '40px',
    top: '20px',
    position: 'absolute',
    paddingLeft: '20%',
    gap: '20px',
    alignItems: 'flex-end',
    display: 'inline-flex',
  };

  const boxStyle = (background) => ({
    width: '250px',
    height: '240px',
    position: 'relative',
    background: background,
    borderRadius: '20px',
    boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
    transition: 'transform 0.3s',
  });

  const detailButtonStyle = (background, top) => ({
    width: '124px',
    height: '43.68px',
    paddingLeft: '10px',
    paddingRight: '10px',
    paddingTop: '5px',
    paddingBottom: '5px',
    left: '66px',
    top: top,
    position: 'absolute',
    background: background,
    borderRadius: '20px',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '10px',
    display: 'inline-flex',
    fontSize: '22px',
    fontWeight: 'bold',
    cursor: 'pointer',
  });

  const detailTextStyle = {
    textAlign: 'center',
    color: 'rgba(0, 0, 0, 0.70)',
    fontSize: '20px',
    fontFamily: 'Roboto Slab',
    fontWeight: '700',
    wordWrap: 'break-word',
  };

  const imageStyle = (width, height, left, top, rotation = 0) => ({
    width: width,
    height: height,
    left: left,
    top: top,
    position: 'absolute',
    transform: `rotate(${rotation}deg)`,
    transformOrigin: '0 0',
    borderRadius: '10px',
  });

  const textStyle = {
    width: '210px',
    height: '130px',
    left: '18px',
    top: '15px',
    position: 'absolute',
    color: 'black',
    fontSize: '30px',
    fontFamily: 'Roboto Slab',
    fontWeight: '700',
    wordWrap: 'break-word',
  };

  const handleMouseOver = (e) => {
    e.currentTarget.style.transform = 'scale(1.05)';
  };

  const handleMouseOut = (e) => {
    e.currentTarget.style.transform = 'scale(1)';
  };

  const openModal = (type) => {
    setModalType(type);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  return (
    <div style={containerStyle}>
      <div style={bannerStyle}></div>
      <div style={mainContentStyle}>
        <div
          style={boxStyle('#FDF4E5')}
          onMouseOver={handleMouseOver}
          onMouseOut={handleMouseOut}
        >
          <img
            style={imageStyle('255px', '250px', '0', '0px', 0)}
            src="/Detail_Get/Group1.png"
            alt="BoxBackground1"
          />
          <div
            style={detailButtonStyle('#FFE3B8', '190px')}
            onClick={() => openModal('certification')}
          >
            <div style={detailTextStyle}>Detail</div>
          </div>
          <img
            style={imageStyle('130px', '140px', '63px', '29.93px')}
            src="/Detail_Get/1symbol.png"
            alt="1symbol"
          />
        </div>
        <div
          style={boxStyle('#F9F6FF')}
          onMouseOver={handleMouseOver}
          onMouseOut={handleMouseOut}
        >
          <img
            style={imageStyle('255px', '250px', '0', '0px', 0)}
            src="/Detail_Get/Group2.png"
            alt="BoxBackground2"
          />
          <div
            style={detailButtonStyle('#EDE3FF', '190px')}
            onClick={() => openModal('footprint')}
          >
            <div style={detailTextStyle}>Detail</div>
          </div>
          <img
            style={imageStyle('120.40px', '140px', '61.13px', '26.93px')}
            src="/Detail_Get/2symbol.png"
            alt="2symbol"
          />
        </div>
        <div
          style={boxStyle('#F8FCEE')}
          onMouseOver={handleMouseOver}
          onMouseOut={handleMouseOut}
        >
          <img
            style={imageStyle('255px', '250px', '0', '0px', 0)}
            src="/Detail_Get/Group3.png"
            alt="BoxBackground3"
          />
          <div
            style={detailButtonStyle('#F0FDC4', '187.70px')}
            onClick={() => openModal('compensation')}
          >
            <div style={detailTextStyle}>Detail</div>
          </div>
          <img
            style={{
              width: '124.63px',
              height: '128.42px',
              left: '57.21px',
              top: '29.64px',
              position: 'absolute',
              borderRadius: '10px',
            }}
            src="/Detail_Get/3symbol.png"
            alt="3symbol"
          />
        </div>
      </div>
      <img
        style={{
          width: '150px',
          height: '150px',
          left: '75px',
          top: '120px',
          position: 'absolute',
          borderRadius: '10px',
        }}
        src="/Detail_Get/background.png"
        alt="Placeholder"
      />
      <div style={textStyle}>Click to get the Detail!<br /><br /></div>
      <TableModal
        visible={modalVisible}
        onClose={closeModal}
        type={modalType}
      />
    </div>
  );
};

export default Detail_Get;
