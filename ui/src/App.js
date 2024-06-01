import React, { useEffect, useState } from "react";
import Web3 from "web3";
import "./App.css";
import {
  GREEN_ENERGY_CONTRACT_ADDRESS,
  GREEN_ENERGY_TOKEN_ABI,
} from "./contractAbis/greenEnergy";
import { Switch, Route, BrowserRouter } from "react-router-dom";
import BuyGet from "./components/buyGet/buyGet";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import Compensate from "./components/compensate/Compensate";

function App() {
  const [instance, setInstance] = useState();
  const [web3Instance, setWeb3Instance] = useState();
  const [account, setAccount] = useState();
  const [contractOwner, setContractOwner] = useState(null); // State to store contract owner address

  useEffect(() => {
    const createInstance = async () => {
      if (window.ethereum) {
        window.ethereum
          .request({ method: "eth_requestAccounts" })
          .then(async (accounts) => {
            setAccount(accounts[0]);
            const web3 = new Web3(window.ethereum);
            setWeb3Instance(web3);
  
            window.ethereum.on("accountsChanged", (accounts) =>
              setAccount(accounts[0] || "")
            );
  
            const getInstance = new web3.eth.Contract(
              GREEN_ENERGY_TOKEN_ABI,
              GREEN_ENERGY_CONTRACT_ADDRESS
            );
            setInstance(getInstance);
  
            try {
              // Call the owner function to retrieve the contract owner address
              const owner = await getInstance.methods.owner().call();
              setContractOwner(owner);
              console.log("Contract Owner:", owner); // Print contract owner address to console
            } catch (error) {
              console.error("Error fetching owner:", error); // Error handling if the call fails
            }
          })
          .catch((error) => {
            console.error("Error on account request:", error);
          });
      } else {
        // If user doesn't have MetaMask, show error or installation guide
        console.log("Please install MetaMask.");
      }
    };
  
    createInstance();
  }, []);
  

  return (
    <BrowserRouter>
      {!instance ? null : (
        <Header instance={instance} account={account} contractOwner={contractOwner} /> // Pass contract owner to Header component
      )}
      <div className="container">
        {!instance ? null : (
          <Switch>
            <Route
              path="/"
              component={() => (
                <BuyGet
                  instance={instance}
                  web3={web3Instance}
                  account={account}
                />
              )}
              exact
            />
            <Route
              path="/compensate"
              component={() => (
                <Compensate
                  instance={instance}
                  account={account}
                  web3={web3Instance}
                />
              )}
            />
          </Switch>
        )}
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
