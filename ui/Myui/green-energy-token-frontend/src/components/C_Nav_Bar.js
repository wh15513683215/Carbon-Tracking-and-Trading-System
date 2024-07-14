import React from 'react';
import { Link } from 'react-router-dom';
import { useEthereum } from '../context/EthereumContext';

const Sidebar = ({ selectedPage, setSelectedPage }) => {
  const { isOwner } = useEthereum();

  const containerStyle = {
    width: '262px',
    height: 'calc(100vh - 106px)',
    position: 'fixed',
    top: '66px',
    left: 0,
    background: isOwner ? '#EDF9FC' : '#F7FCED',
    padding: '10px 0',
  };

  const menuStyle = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    gap: '28px',
    paddingLeft: '26px',
  };

  const menuItemStyle = {
    width: '210px',
    height: '50px',
    position: 'relative',
  };

  const menuItemBackgroundStyle = (isSelected) => ({
    width: '210px',
    height: '50px',
    position: 'absolute',
    background: isSelected
      ? isOwner
        ? '#84E3FC'
        : '#DEF2B1'
      : isOwner
      ? '#EDF9FC'
      : '#F7FCED',
    borderRadius: '20px',
  });

  const menuItemContentStyle = (width, height, left, top) => ({
    width: width,
    height: height,
    left: left,
    top: top,
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '8px',
    display: 'inline-flex',
  });

  const imageStyle = (width, height) => ({
    width: width,
    height: height,
  });

  const textStyle = (isSelected) => ({
    color: 'black',
    fontSize: '24px',
    fontFamily: 'Roboto Slab',
    fontWeight: isSelected ? '800' : '400',
    wordWrap: 'break-word',
  });

  return (
    <div style={containerStyle}>
      <div style={menuStyle}>
        <Link to="/" style={{ textDecoration: 'none' }} onClick={() => setSelectedPage('home')}>
          <div style={menuItemStyle}>
            <div style={menuItemBackgroundStyle(selectedPage === 'home')} />
            <div style={menuItemContentStyle(124, 38, 10, 6)}>
              <img style={imageStyle(38, 38)} src="/Nav_Bar/HomeIcon.png" alt="Home Icon" />
              <div style={textStyle(selectedPage === 'home')}>Home</div>
            </div>
          </div>
        </Link>
        {isOwner ? (
          <>
            <Link to="/company" style={{ textDecoration: 'none' }} onClick={() => setSelectedPage('company')}>
              <div style={menuItemStyle}>
                <div style={menuItemBackgroundStyle(selectedPage === 'company')} />
                <div style={menuItemContentStyle(155, 45, 10, 5)}>
                  <div style={{ width: '41px', height: '45px', justifyContent: 'flex-start', alignItems: 'flex-end', display: 'flex' }}>
                    <img style={imageStyle(35.04, 47)} src="/Nav_Bar/ManageIcon.png" alt="Company Icon" />
                  </div>
                  <div style={{ justifyContent: 'center', alignItems: 'center', display: 'flex' }}>
                    <div style={textStyle(selectedPage === 'company')}>Company</div>
                  </div>
                </div>
              </div>
            </Link>
            <Link to="/contract" style={{ textDecoration: 'none' }} onClick={() => setSelectedPage('contract')}>
              <div style={menuItemStyle}>
                <div style={menuItemBackgroundStyle(selectedPage === 'contract')} />
                <div style={menuItemContentStyle(143, 33.78, 10, 8)}>
                  <img style={imageStyle(38, 33.78)} src="/Nav_Bar/ReportIcon.png" alt="Contract Icon" />
                  <div style={textStyle(selectedPage === 'contract')}>Contract</div>
                </div>
              </div>
            </Link>
          </>
        ) : (
          <>
            <Link to="/token" style={{ textDecoration: 'none' }} onClick={() => setSelectedPage('token')}>
              <div style={menuItemStyle}>
                <div style={menuItemBackgroundStyle(selectedPage === 'token')} />
                <div style={menuItemContentStyle(120, 45, 10, 5)}>
                  <div style={{ width: '39px', height: '39px', justifyContent: 'flex-start', alignItems: 'center', display: 'flex' }}>
                    <img style={imageStyle(39, 39)} src="/Nav_Bar/TokenIcon.png" alt="Token Icon" />
                  </div>
                  <div style={{ justifyContent: 'center', alignItems: 'center', display: 'flex' }}>
                    <div style={textStyle(selectedPage === 'token')}>Token</div>
                  </div>
                </div>
              </div>
            </Link>
            <Link to="/report" style={{ textDecoration: 'none' }} onClick={() => setSelectedPage('report')}>
              <div style={menuItemStyle}>
                <div style={menuItemBackgroundStyle(selectedPage === 'report')} />
                <div style={menuItemContentStyle(120, 33.78, 10, 8)}>
                  <img style={imageStyle(38, 33.78)} src="/Nav_Bar/ReportIcon.png" alt="Report Icon" />
                  <div style={textStyle(selectedPage === 'report')}>Report</div>
                </div>
              </div>
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
