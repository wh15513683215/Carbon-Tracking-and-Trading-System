# Front-End Software Performance Report

## Introduction

This report evaluates the front-end software developed for our project, focusing on its main features, technical implementation, performance metrics, and future development plans. The goal is to provide both software engineers and project managers with a comprehensive understanding of the current state and future direction of the front-end software.

## Project Overview

The software project aims to create a user-friendly web application that integrates blockchain technology for carbon footprint tracking. The primary features include:

- **Wallet Connection:** Integration with Ethereum for secure wallet connections.
- **Token Transactions:** Handling transactions using GETToken.
- **Carbon Footprint Tracking:** Monitoring and displaying carbon emissions data recorded on the blockchain.
- **User Management:** Allowing government and company users to manage their profiles and data.
- **Interactive Dashboard:** Providing a comprehensive dashboard for users to view and analyze their data.

The objective is to enable transparent and efficient tracking of carbon emissions, empowering users to make informed decisions about their carbon footprint.

## Technical Details

The front-end of the application is built using the React framework, leveraging its component-based architecture to create reusable and maintainable code. Key design decisions include:

- **Component-Based Architecture:** React was chosen for its ability to create reusable components, enhancing maintainability and scalability.
- **State Management:** The application uses Context API for managing global state, ensuring efficient data flow and state updates across components.
- **Styling:** CSS modules are used for styling components, providing scoped and maintainable styles.


### Design Decisions and Figma Usage

The design of the front-end was meticulously planned using Figma. Figma was chosen for the following reasons:

- **Collaboration:** Figma allows real-time collaboration between designers and developers, ensuring that design and implementation are in sync.
- **Prototyping:** Interactive prototypes created in Figma helped in visualizing the user experience and making necessary adjustments before development.
- **Consistency:** Design components and styles defined in Figma ensured a consistent look and feel throughout the application.

### Ethereum Context Implementation

The Ethereum Context is a crucial part of the front-end, managing interactions with the Ethereum blockchain. It uses the Ethers.js library to interact with smart contracts and provides various methods and states to manage these interactions. The context includes:

- **provider:** Ethers.js provider instance.
- **signer:** Ethers.js signer instance.
- **account:** Current account address.
- **balance:** Current account balance.
- **isOwner:** Whether the current account is the contract owner.
- **ownerAddress:** Contract owner address.
- **contractAddress:** Contract address.
- **contractBalance:** Contract balance.
- **totalSupply:** Total supply of tokens.
- **certifiedCompanies:** List of certified companies.
- **certifiedIotDevices:** List of certified IoT devices.
- **carbonFootprintRecords:** List of carbon footprint records.
- **setTotalSupply:** Function to set the total supply of tokens.
- **setCertifiedCompanies:** Function to set the list of certified companies.
- **setCertifiedIotDevices:** Function to set the list of certified IoT devices.
- **addCarbonFootprintRecord:** Function to add a carbon footprint record.

#### Example Usage of Ethereum Context

```javascript
import React from 'react';
import { useEthereum } from './EthereumProvider';

const MyComponent = () => {
  const { account, balance, certifiedCompanies, addCarbonFootprintRecord } = useEthereum();

  const handleAddRecord = () => {
    addCarbonFootprintRecord('company-address', 100); // Add a carbon footprint record
  };

  return (
    <div>
      <p>Account: {account}</p>
      <p>Balance: {balance} ETH</p>
      <p>Certified Companies: {certifiedCompanies.join(', ')}</p>
      <button onClick={handleAddRecord}>Add Carbon Footprint Record</button>
    </div>
  );
};

export default MyComponent;
```

## Performance Analysis

The performance of the front-end software was evaluated using several metrics and benchmarks:

### Lighthouse Scores

The Lighthouse audit revealed the following scores:

- **Performance:** 64
- **Accessibility:** 81
- **Best Practices:** 85
- **SEO:** 83

#### Performance Score Analysis

The performance score of 64 indicates that there is significant room for optimization. The primary issues affecting performance include:

1. **Chrome Extensions:** Extensions negatively impacted the page's load performance. It is recommended to audit the page in incognito mode or from a Chrome profile without extensions.
2. **Stored Data:** Data stored in IndexedDB may affect loading performance. Auditing the page in an incognito window can prevent these resources from affecting scores.

### Company Part React Performance Analysis

The performance analysis of React components showed that the most time-consuming components are:

- **TokenOperate:** 0.1ms of 4.1ms
- **TransitionGroup:** 0.1ms of 3.7ms
- **Context.Provider:** <0.1ms of 3.6ms
- **BuyDetail:** 0.2ms of 0.2ms

#### Areas for Optimization

- **Reduce Unused Code and Libraries:** Ensure that only necessary code and libraries are loaded.
- **Lazy Loading:** Implement lazy loading for components and resources to improve initial load time.
- **Memoization:** Use `React.memo` and `useMemo` to prevent unnecessary re-renders of components.
- **Code Splitting:** Implement code splitting to load only the required code for each route, reducing initial bundle size.
- **Optimize CSS and JavaScript:** Minify and compress CSS and JavaScript files to reduce their size and improve load times.

## Future Plans

To further enhance the front-end software, the following development plans are proposed:

- **Progressive Web App (PWA) Implementation:** Converting the application into a PWA to improve performance and provide offline capabilities.
- **Enhanced Security:** Implementing advanced security measures, such as two-factor authentication and end-to-end encryption.
- **User Feedback Integration:** Continuously collecting and integrating user feedback to improve the user interface and experience.
- **Performance Optimization:** Further optimizing code and assets to reduce load times and improve rendering performance.
- **Feature Expansion:** Adding new features based on user requirements, such as detailed analytics and reporting tools for carbon footprint data.

By following these plans, we aim to deliver a robust, efficient, and user-friendly front-end application that meets the evolving needs of our users and stays ahead of technological advancements.