import React from 'react';

const G_Search_Detail = () => {
  const containerStyle = {
    width: '100%',
    maxWidth: '1200px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '10px 0', // 增加一些内边距
  };

  const searchBarContainerStyle = {
    display: 'flex',
    alignItems: 'center',
    // flex: 1, // 确保搜索栏占据剩余空间，删除这一行
  };

  const searchBarStyle = {
    width: '450px', // 设置固定宽度
    height: '45px',
    background: 'white',
    borderRadius: '30px',
    border: '1px black solid',
    display: 'flex',
    alignItems: 'center',
    padding: '0 20px', // 增加内边距以确保内容不紧贴边缘
  };

  const searchBarTextStyle = {
    color: 'rgba(0, 0, 0, 0.50)',
    fontSize: '24px',
    fontFamily: 'Roboto',
    fontWeight: '400',
  };

  const filterIconStyle = {
    width: '60px',
    height: '60px',
    marginLeft: '20px', // 确保过滤图标与搜索栏之间有一定间距
  };

  return (
    <div style={containerStyle}>
      <div style={searchBarContainerStyle}>
        <div style={searchBarStyle}>
          <span style={searchBarTextStyle}>Search Address</span>
        </div>
      </div>
      <img style={filterIconStyle} src="/G_Search_Detail/Filter.png" alt="Filter Icon" />
    </div>
  );
};

export default G_Search_Detail;
