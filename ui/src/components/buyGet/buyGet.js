import React, { useEffect, useState } from "react";
import "./buyGet.css";
import { getShortAddress } from "../../utils/addressUtils";

// 假设每1 ETH可以兑换1000 GET
const FIXED_CONVERSION_RATE = 1000;

// 这是一个简单的函数，返回ETH到GET的固定转换率
function getConversionRate() {
  // 在实际应用中，这里可能是一个调用外部API或智能合约的操作
  return Promise.resolve(FIXED_CONVERSION_RATE);
}

export default function BuyGet({ instance, account, web3 }) {
  const [ethAmount, setEthAmount] = useState("");
  const [getAmount, setGetAmount] = useState("");
  const [buyEvents, setBuyEvents] = useState([]);
  const [totalCost, setTotalCost] = useState(0);
  const [conversionRate, setConversionRate] = useState(0); // 添加转换率状态

  const onEthAmountChange = (e) => {
    const ethValue = e.target.value;
    setEthAmount(ethValue);
    const calculatedGet = ethValue * conversionRate; // 使用转换率计算GET
    setGetAmount(calculatedGet.toFixed(2)); // 固定小数点位数
  };

  useEffect(() => {
    // 添加获取转换率的逻辑
    const fetchConversionRate = async () => {
      // 假设有一个函数可以获取ETH到GET的转换率
      const rate = await getConversionRate();
      setConversionRate(rate);
    };

    fetchConversionRate();
  }, []);
  
  useEffect(() => {
    if (!instance) return;  // 确保实例已经加载

    const eventSubscription = instance.events.Buy({
      fromBlock: 'latest'
    })
    .on('data', event => {
      if (event.returnValues.to.toLowerCase() === account.toLowerCase()) {
        setBuyEvents(prevEvents => [...prevEvents, event]);
      }
    })
    .on('error', error => console.error("Error handling Buy event:", error));

    return () => {
      eventSubscription.unsubscribe((error, success) => {
        if (error) {
          console.error("Error unsubscribing from Buy event:", error);
        } else if (success) {
          console.log("Successfully unsubscribed from Buy event");
        }
      });
    };
  }, [instance, account]);  // 依赖项包括instance和account，确保订阅逻辑正确执行
  useEffect(() => {
    const handleBuyEvent = (error, event) => {
      if (error) {
        console.error("Error handling Buy event:", error);
      } else if (event.returnValues.to.toLowerCase() === account.toLowerCase()) {
        setBuyEvents((prevEvents) => [...prevEvents, event]);
      }
    };


  
      instance.events.Buy({}, (error, event) => {
        handleBuyEvent(error, event);
      });

    return () => {
      instance.events.Buy().unsubscribe((error, success) => {
        if (success) console.log("Successfully unsubscribed from Buy event");
        else console.error("Error unsubscribing from Buy event:", error);
      });
    };
  }, [instance, account]);



  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // 将输入的GET转换为合约需要的单位
    const getAmountUnits = web3.utils.toWei(getAmount, "ether");
    // 将输入的ETH转换为合约需要的单位
    const ethAmountUnits = web3.utils.toWei(ethAmount, "ether");
  
    try {
      // 检查用户账户余额是否足够
      const balance = await web3.eth.getBalance(account);
      if (Number(balance) < Number(ethAmountUnits)) {
        alert("Insufficient ETH balance to complete the transaction.");
        return;
      }
  
      // 估算交易的Gas费用
      const gasPrice = await web3.eth.getGasPrice();
      const gasEstimate = await instance.methods.buy(getAmountUnits).estimateGas({ 
        from: account,
        value: ethAmountUnits 
      });
      const totalGasCost = gasPrice * gasEstimate;
  
      // 计算总成本（ETH购买量 + Gas费用）
      const totalEthCost = Number(ethAmountUnits) + totalGasCost;
  
      // 再次检查余额是否足够支付总成本
      if (Number(balance) < totalEthCost) {
        alert("Insufficient balance to cover the purchase and transaction fees.");
        return;
      }
  
      // 定义receipt变量
      let receipt;
  
      // 发送交易至智能合约执行购买
      try {
        receipt = await web3.eth.sendTransaction({
          from: account,
          to: instance.options.address,
          value: ethAmountUnits,
          gasPrice: gasPrice,
          gas: gasEstimate,
        });
      } catch (error) {
        console.error("Transaction failed:", error);
        if(error.code === -32000) {
          alert("Transaction failed: " + error.message);
        } else {
          alert("An unexpected error occurred");
        }
        return; // Ensure we exit if transaction fails
      }
  
      // 交易成功后的操作
      alert("Success! GET tokens purchased. Transaction hash: " + receipt.transactionHash);
      setEthAmount("");
      setGetAmount("");
      setTotalCost(web3.utils.fromWei(totalEthCost.toString(), 'ether'));
  
    } catch (error) {
      console.error("Error purchasing GET tokens:", error);
      alert("Error occurred: " + error.message);
    }
  };
  
  

 return (
  <>
    <section className="col text-center">
      <h2>Buy GET Tokens</h2>
    </section>
    <section id="buySection" className="row">
      <section id="buyGetFormSection" className="col-md-6 text-center">
        <form className="buyForm" onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="ethAmount">ETH to spend</label>
            <input
              type="text"
              className="form-control"
              id="ethAmount"
              placeholder="0.00"
              onChange={onEthAmountChange}
              value={ethAmount}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="getAmount">GET to receive (estimated)</label>
            <input
              type="text"
              className="form-control"
              id="getAmount"
              placeholder="0.00"
              value={getAmount}
              readOnly
            />
          </div>
          <div className="mb-3">
            <p>Total Cost: {totalCost} ETH</p>
          </div>
          <button type="submit" className="btn btn-primary">
            Buy GET
          </button>
        </form>
      </section>
      <section className="col-md-6 text-center">
        <img src="img/buy.png" alt="Purchase illustration" width="600" />
      </section>
    </section>
    <div id="buyHistorySection">
      <h3>GET Purchase History</h3>
      {buyEvents && buyEvents.length > 0 ? (
        <table className="history-table table table-hover">
          <thead>
            <tr>
              <th>Receiver</th>
              <th>Footprint at time of purchase</th>
              <th>GET Amount (units)</th>
              <th>GET Amount</th>
            </tr>
          </thead>
          <tbody>
            {buyEvents.map((e) => (
              <tr key={e.id}>
                <td>{getShortAddress(e.returnValues.to)}</td>
                <td>{e.returnValues.footPrint}</td>
                <td>{e.returnValues.amount}</td>
                <td>{`${e.returnValues.amount / Math.pow(10, 18)} GET`}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No purchase history available.</p>
      )}
    </div>
  </>
);
}