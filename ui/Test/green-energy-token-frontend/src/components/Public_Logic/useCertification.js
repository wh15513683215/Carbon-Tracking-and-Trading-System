// src/hooks/useCertification.js

import { useEffect, useState } from 'react';
import { useEthereum } from '../../context/EthereumContext';

const useCertification = () => {
  const { account, certifiedCompanies } = useEthereum();
  const [isCertified, setIsCertified] = useState(false);

  useEffect(() => {
    if (account) {
      setIsCertified(certifiedCompanies.includes(account.toLowerCase()));
    } else {
      setIsCertified(false);
    }
  }, [account, certifiedCompanies]);

  return isCertified;
};

export default useCertification;
