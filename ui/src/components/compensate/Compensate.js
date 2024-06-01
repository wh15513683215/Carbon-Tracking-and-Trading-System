import React, { useEffect, useState } from "react";
import { getShortAddress } from "../../utils/addressUtils";
import "./Compensate.css";

export default function Compensate({ instance, account }) {
  const [getAmount, setGetAmount] = useState("");
  const [footprintToCompensate, setFootprintToCompensate] = useState("");
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      instance.events.Compensate(
        {},
        { fromBlock: 0, to: "latest" },
        (err, event) => {
          if (err) {
            console.log(err);
          } else {
            // Filter get only current company related events
            if (event.returnValues.to.toLowerCase() === account.toLowerCase()) {
              setEvents((prevEvents) => [...prevEvents, event]);
            }
          }
        }
      );
    };
    loadData();
  }, [account, instance]);

  const onGetAmountChange = (e) => {
    setGetAmount(e.target.value);
  };

  const onFootprintToCompensateChange = (e) => {
    setFootprintToCompensate(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (getAmount === "" || footprintToCompensate === "") {
      alert("Fields cannot be empty");
      return;
    }

    if (isNaN(getAmount) || isNaN(footprintToCompensate)) {
      alert("Please enter numbers only");
      return;
    }

    const tokenDecimals = await instance.methods.decimals().call();
    const footprintToCompensateUnits = footprintToCompensate * Math.pow(10, tokenDecimals);
    const currentFootprint = await instance.methods.getFootPrint(account).call();

    // Calculate the required GET amount based on the current footprint and the footprint to compensate
    const requiredGetAmount = (footprintToCompensateUnits / currentFootprint) * Math.pow(10, tokenDecimals);

    instance.methods
      .compensate(requiredGetAmount.toString())
      .send({ from: account })
      .then((receipt) => {
        alert(
          `Success!\nTransaction hash ${receipt.transactionHash}\nGas used: ${receipt.gasUsed}`
        );
        setGetAmount("");
        setFootprintToCompensate("");
      })
      .catch((err) => console.error(err));
  };

  return (
    <>
      <section className="col text-center">
        <h2>Compensate footprint</h2>
      </section>
      <section id="buySection" className="row">
        <section id="buyGetFormSection" className="col text-center">
          <form className="buyForm" onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="getAmount">GET to pay</label>
              <input
                type="text"
                className="form-control"
                id="getAmount"
                placeholder="0.00"
                onChange={onGetAmountChange}
                value={getAmount}
              />
              <label htmlFor="footprintToCompensate" className="mt-3">
                Footprint to compensate
              </label>
              <input
                type="text"
                className="form-control"
                id="footprintToCompensate"
                placeholder="0.00"
                onChange={onFootprintToCompensateChange}
                value={footprintToCompensate}
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Pay GET
            </button>
          </form>
        </section>
        <section className="col text-center">
          <img src="img/compensate.png" alt="green" width="250" height="300" />
        </section>
      </section>
      <div id="buyHistorySection">
        <h3>Compensate history</h3>
        {events && events.length > 0 ? (
          <table className="history-table table table-hover">
            <thead>
              <tr>
                <th>Receiver</th>
                <th>Footprint at time of compensation</th>
                <th>GET Amount (units)</th>
                <th>GET Amount</th>
              </tr>
            </thead>
            <tbody>
              {events?.map((e) => (
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
          <p>No events so far...</p>
        )}
      </div>
    </>
  );
}