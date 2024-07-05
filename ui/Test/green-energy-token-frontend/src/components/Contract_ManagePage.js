import React from 'react';
import G_Contract_Manage from './G_Contract_Manage';
import G_Search_Detail from './G_Search_Detail';


const Contract_ManagePage = () => {
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
      <G_Contract_Manage />
      <G_Search_Detail />
  
    </div>
  );
};

export default Contract_ManagePage;
