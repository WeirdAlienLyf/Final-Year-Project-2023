import React, { useState, useEffect } from "react";
import getBlockchain from "./ethereum.js";
import "./index.css";

function App() {
  const [factoryContract, setFactoryContract] = useState(undefined);
  const [name, setName] = useState(undefined);
  const [contractAddresses, setContractAddresses] = useState([]);
  const [owner, setOwner] = useState(undefined);
  const [sr_number, setSrNumber] = useState(undefined);
  const [branch, setBranch] = useState(undefined);
  const [date, setDate] = useState(undefined);
  const [grade, setGrade] = useState(undefined);

  useEffect(() => {
    const init = async () => {
      const { factoryContract } = await getBlockchain();
      setFactoryContract(factoryContract);
      setOwner(owner);
      setName(name);
      setSrNumber(sr_number);
      setBranch(branch);
      setDate(date);
      setGrade(grade);
    };

    init();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getDeployedContracts = async (e) => {
    e.preventDefault();
    const name = e.target.elements[0].value;
    const sr_number = e.target.elements[1].value;
    const branch = e.target.elements[2].value;
    const date = e.target.elements[4].value;
    const grade = e.target.elements[3].value;
    const tx = await factoryContract.createContract(
      name,
      sr_number,
      branch,
      date,
      grade
    );
    const owner = await factoryContract.getOwner();
    await tx.wait();
    const contractAddresses = await factoryContract.getDeployedContracts();
    setContractAddresses(contractAddresses);
    setName(name);
    setOwner(owner);
    setSrNumber(sr_number);
    setBranch(branch);
    setDate(date);
    setGrade(grade);
  };
  
  const first_div = async e => {
    e.preventDefault();
    var address = e.target.elements[0].value;
    
    if((contractAddresses.indexOf(address) > -1) === true){
      alert("Land register is authentic - verification is a success ");
      
    }
    else {
      alert("Abnormal/Unauthorized Land register");
    
    }
  };

  if (typeof factoryContract === "undefined") {
    return "Install MetaMask and connect to BSC TestNet to access the site.";
  }

  return (
    <div className="container">
      <div className="row">
    <div className='col-sm-6'>

        <h2>Certificate Verification </h2>
        <form className="form-inline" onSubmit={e => first_div(e)}>
       
            <input 
              width = "90px"
              type="text" 
              className="form-control" 
              placeholder="Contract Address"
            />
             <button 
              type="submit" 
              className="btn btn-primary"
            >
              Verify
            </button>
            
            </form>
            
        </div>

        <div className="col-sm-6">
          <h2>Land Registry Embedment </h2>
          <form
            className="form-inline"
            onSubmit={(e) => getDeployedContracts(e)}
          >
            <input type="text" className="form-control" placeholder="Land ID " />

            <input
              type="text"
              className="form-control"
              placeholder="Aadhar Number"
            />

            <br />
            <p>
              <select name="branch" id="branch">
                <option value="A Khata">A Khata</option>
                <option value="B Khata">B Khata</option>
              </select>
            </p>

            <select name="grade" id="grade">
              <option value="Single Ownership">Single Ownership</option>
              <option value="Multi Ownership">Multi Ownership</option>
            </select>

            <input type="date" className="form-control" placeholder="Date" />

            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </form>
          <hr />

          <p>
            <h3>Contract Address : </h3> {contractAddresses.slice(-1)}
          </p>
          <p>
            <h3>Owner Address : </h3> {owner}
          </p>
          <p>
            <h4>Land ID :</h4>
            {name}
          </p>
          <p>
            <h4>Aadhar number :</h4>
            {sr_number}
          </p>
          <p>
            <h4>Land type :</h4>
            {branch}
          </p>
          <p>
            <h4>Date of registry :</h4>
            {date}
          </p>

        </div>
<p>Any queries regarding this decentralised application, hit me up on discord : Ahswin#6122</p>
 <p>Wanna donate ? this is my Etherium/BAT wallet address : 0x27Ccc2bc5a7DCaF14380605C0a3962E67D8bBAFF</p>
      </div>

    </div>
           
          
  );
}

export default App;