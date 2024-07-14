# Project Documentation

## Table of Contents
- [Project Overview](#project-overview)
- [Getting Started](#getting-started)
- [Directory Structure](#directory-structure)
- [Page Structure](#page-structure)
- [Important Files](#important-files)
- [Common Commands](#common-commands)
- [Additional Resources](#additional-resources)

## Project Overview
This project is a web application built using React, which includes Ethereum integration for wallet connection, token transactions, and carbon footprint tracking. The application consists of several main pages and components designed to provide a seamless user experience.

## Getting Started

### Prerequisites
- Node.js and npm installed
- A modern web browser
- An Ethereum wallet (e.g., MetaMask)

### Installation
1. Clone the repository:
    ```sh
    git clone https://github.com/wh15513683215
    ```
2. Navigate to the project directory:
    ```sh
    cd <project-directory>
    ```
3. Install the dependencies:
    ```sh
    npm install
    ```

### Running the Project
1. Start the development server:
    ```sh
    npm start
    ```
2. Open your browser and navigate to `http://localhost:3000`.

## Directory Structure
Below is an overview of the project directory structure:

```
├── README.md
├── Page_Structure.md
├── directory_structure.md
├── package-lock.json
├── package.json
├── public
│   ├── BuyPart
│   │   ├── BackGround_Burn.png
│   │   ├── BackGround_Exchange.png
│   │   ├── BurnIcon.png
│   │   ├── ETHIcon.png
│   │   ├── GETIcon.png
│   │   ├── Line_exchange1.png
│   │   └── Line_exchange2.png
│   ├── Buy_Detail
│   │   ├── Bottom.png
│   │   ├── ETH.png
│   │   ├── Get.png
│   │   └── Top.png
│   ├── Compensate_Detail
│   │   ├── Bottom.png
│   │   ├── Carbon.png
│   │   ├── Get.png
│   │   └── Top.png
│   ├── ContractMining_LineGraph
│   │   ├── GetToken.png
│   │   └── Line_graph.png
│   ├── Detail_Get
│   │   ├── 1symbol.png
│   │   ├── 2symbol.png
│   │   ├── 3symbol.png
│   │   ├── Group1.png
│   │   ├── Group2.png
│   │   ├── Group3.png
│   │   └── background.png
│   ├── Footer_Bar
│   │   ├── Ellipse_Linkin.png
│   │   ├── GithubIcon.png
│   │   ├── Linkin.png
│   │   └── X.png
│   ├── G_Company_Manage
│   │   ├── Authority.png
│   │   ├── Background.png
│   │   └── CarbonAdd.png
│   ├── G_Contract_Manage
│   │   ├── Background.png
│   │   ├── Mining.png
│   │   └── Withdraw.png
│   ├── G_Search_Detail
│   │   └── Filter.png
│   ├── Header
│   │   ├── AuthoF.png
│   │   ├── AuthoT.png
│   │   ├── ConnectStatusF.png
│   │   ├── ConnectStatusT.png
│   │   ├── MetaMask.png
│   │   ├── Trademark.svg
│   │   └── reminder.png
│   ├── Main_Board
│   │   └── ETH.png
│   ├── Nav_Bar
│   │   ├── HomeIcon.png
│   │   ├── ManageIcon.png
│   │   ├── ReportIcon.png
│   │   └── TokenIcon.png
│   ├── WelcomeBoard
│   │   └── WelcomeBoard.png
│   ├── favicon.ico
│   ├── index.html
│   ├── logo192.png
│   ├── logo512.png
│   ├── manifest.json
│   └── robots.txt
└── src
    ├── App.css
    ├── App.js
    ├── App.test.js
    ├── TokenInteractions.js
    ├── components
    │   ├── Buy_Detail.js
    │   ├── C_BurnPart.js
    │   ├── C_ExchangePart.js
    │   ├── C_Nav_Bar.js
    │   ├── CompanyPage.js
    │   ├── Company_ManagePage.js
    │   ├── Compensate_Detail.js
    │   ├── ContractMining_LineGraph.js
    │   ├── Contract_ManagePage.js
    │   ├── Detail_Get.js
    │   ├── Footer.js
    │   ├── G_Company_Manage.js
    │   ├── G_Contract_Manage.js
    │   ├── G_Search_Detail.js
    │   ├── GovernmentPage.js
    │   ├── Header.js
    │   ├── HomePage.js
    │   ├── MainBoard.js
    │   ├── Public_Logic
    │   │   ├── AnimatedModal.js
    │   │   ├── ConfirmModal.css
    │   │   ├── ConfirmModal.js
    │   │   ├── ErrorModal.css
    │   │   ├── ErrorModal.js
    │   │   ├── TableModal.js
    │   │   ├── WaitingAnimation.css
    │   │   ├── WaitingAnimation.js
    │   │   └── useCertification.js
    │   ├── ReportPage.js
    │   ├── StatusBar.js
    │   ├── Sub_Buy_Detail
    │   │   ├── BuyDetailStyles.js
    │   │   └── useBuyTokens.js
    │   ├── Sub_Compensate_Detail
    │   │   ├── CompensateDetailStyles.js
    │   │   └── useCompensateDetail.js
    │   ├── Sub_G_Company_Manage
    │   │   ├── G_Company_ManageStyles.js
    │   │   └── useCompanyManagement.js
    │   ├── Sub_G_Contract_Manage
    │   │   ├── G_Contract_ManageStyles.js
    │   │   ├── useMintTokens.js
    │   │   └── useWithdraw.js
    │   ├── TokenOperate.js
    │   ├── Utils
    │   │   └── reportUtils.js
    │   └── WelcomeBoard.js
    ├── constants.js
    ├── context
    │   └── EthereumContext.js
    ├── index.css
    ├── index.js
    ├── logo.svg
    ├── reportWebVitals.js
    ├── setupTests.js
    ├── styles
    │   └── C_Buy_Brun.css
    └── styles.css
```

## Page Structure
The `Page_Structure.md` document outlines the structure and functionality of each main page in the application:

### Home Page
- Path: `src/components/HomePage.js`
- Description: The main landing page of the application.

### Government Page
- Path: `src/components/GovernmentPage.js`
- Description: Interface for government-related functionalities.

### Company Page
- Path: `src/components/CompanyPage.js`
- Description: Interface for company-related functionalities.

### Report Page
- Path: `src/components/ReportPage.js`
- Description: Page to view and generate reports.

### Additional Pages
- Each additional page component follows a similar structure, providing specific functionalities as outlined in their respective files.

## Important Files

### `package.json`
- Contains metadata about the project and its dependencies.

### `public/index.html`
- The main HTML file that serves the React application.

### `src/App.js`
- The root component that sets up routing and renders other components.

### `src/index.js`
- The entry point of the React application.

## Common Commands

### Start Development Server
```sh
npm start
```
Starts the development server and opens the application in your default web browser.

### Run Tests
```sh
npm test
```
Runs the test suite to ensure code quality and correctness.

### Build Project
```sh
npm run build
```
Builds the project for production, creating an optimized bundle in the `build` directory.

### Lint Code
```sh
npm run lint
```
Checks the code for linting errors and potential issues.

## Additional Resources

### React Documentation
- [React Official Docs](https://reactjs.org/docs/getting-started.html

)

### Ethereum Integration
- [Web3.js Documentation](https://web3js.readthedocs.io/en/v1.3.4/)

### Project Repository
- [GitHub Repository](https://github.com/wh15513683215) - Link to the GitHub repository for more details and contributions.

This documentation should help you understand the structure and functionality of the project, as well as how to set up and run the application. For further assistance, refer to the additional resources or contact the project maintainers.