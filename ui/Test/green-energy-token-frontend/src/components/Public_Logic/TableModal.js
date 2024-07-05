import React, { useState, useEffect } from 'react';
import { Modal, Button, Table } from 'antd';
import 'antd/dist/reset.css';
import { useEthereum } from '../../context/EthereumContext';
import { ethers } from 'ethers';
import { contractAddress, contractABI } from '../../constants';

const TableModal = ({ visible, onClose, type }) => {
  const [columns, setColumns] = useState([]);
  const [tableData, setTableData] = useState([]);
  const { signer } = useEthereum();

  useEffect(() => {
    if (type === 'certification') {
      fetchCertifiedCompanies();
    } else if (type === 'footprint') {
      fetchFootprintRecords();
    } else if (type === 'compensation') {
      fetchCompensationRecords();
    }
  }, [type, signer]);

  const fetchCertifiedCompanies = async () => {
    if (signer) {
      const contract = new ethers.Contract(contractAddress, contractABI, signer);
      try {
        const companies = await contract.getCertifiedAddresses();
        const devices = await Promise.all(companies.map(async (company) => await contract.getIOT(company)));
        setColumns([
          { title: 'Company Address', dataIndex: 'companyAddress', key: 'companyAddress' },
          { title: 'IoT Device Address', dataIndex: 'iotDeviceAddress', key: 'iotDeviceAddress' },
        ]);
        setTableData(companies.map((company, index) => ({
          key: index,
          companyAddress: company,
          iotDeviceAddress: devices[index],
        })));
      } catch (error) {
        console.error('Error fetching certified companies:', error);
      }
    }
  };

  const fetchFootprintRecords = async () => {
    if (signer) {
      const contract = new ethers.Contract(contractAddress, contractABI, signer);
      try {
        const records = await contract.getFootprintRecords();
        const formattedRecords = records.map(record => ({
          timestamp: new Date(record.timestamp.toNumber() * 1000).toLocaleString(),
          company: record.company,
          footprint: record.footprint.toString()
        }));
        setColumns([
          { title: 'Timestamp', dataIndex: 'timestamp', key: 'timestamp' },
          { title: 'Company Address', dataIndex: 'company', key: 'company' },
          { title: 'Carbon Footprint', dataIndex: 'footprint', key: 'footprint' },
        ]);
        setTableData(formattedRecords.map((record, index) => ({
          key: index,
          ...record,
        })));
      } catch (error) {
        console.error('Error fetching footprint records:', error);
      }
    }
  };

  const fetchCompensationRecords = async () => {
    if (signer) {
      const contract = new ethers.Contract(contractAddress, contractABI, signer);
      try {
        const records = await contract.getCompensationRecords();
        const formattedRecords = records.map(record => ({
          timestamp: new Date(record.timestamp.toNumber() * 1000).toLocaleString(),
          company: record.company,
          compensatedAmount: ethers.utils.formatUnits(record.compensatedAmount, 'ether'),
          remainingAmount: ethers.utils.formatUnits(record.remainingAmount, 'ether')
        }));
        setColumns([
          { title: 'Compensation Time', dataIndex: 'timestamp', key: 'timestamp' },
          { title: 'Compensation Address', dataIndex: 'company', key: 'company' },
          { title: 'Compensated Amount', dataIndex: 'compensatedAmount', key: 'compensatedAmount' },
          { title: 'Remaining Uncompensated Amount', dataIndex: 'remainingAmount', key: 'remainingAmount' },
        ]);
        setTableData(formattedRecords.map((record, index) => ({
          key: index,
          ...record,
        })));
      } catch (error) {
        console.error('Error fetching compensation records:', error);
      }
    }
  };

  return (
    <Modal
      title="Detail Information"
      visible={visible}
      onCancel={onClose}
      footer={[
        <Button key="close" onClick={onClose}>
          Close
        </Button>,
      ]}
      centered
      bodyStyle={{ maxHeight: '70vh', overflowY: 'auto' }}
    >
      <Table columns={columns} dataSource={tableData} pagination={false} />
    </Modal>
  );
};

export default TableModal;
