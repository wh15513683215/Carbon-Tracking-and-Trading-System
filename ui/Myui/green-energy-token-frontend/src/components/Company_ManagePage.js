import React from 'react';
import G_Company_Manage from './G_Company_Manage';
import G_Search_Detail from './G_Search_Detail';
import Detail_Get from './Detail_Get';

const Company_ManagePage = () => {
  const containerStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    height: 'calc(100vh - 66px - 40px)', // Adjust based on Header and Footer height
    overflowY: 'auto',
    paddingTop: '20px', // Ensure padding if needed
  };

  return (
    <div style={containerStyle}>
      <G_Company_Manage />
      <G_Search_Detail />
      <Detail_Get />
    </div>
  );
};

export default Company_ManagePage;
