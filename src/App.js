import React, { Component } from 'react'
import SimpleStorageContract from '../build/contracts/SimpleStorage.json'
import FineArtContract from '../build/contracts/FineArt.json'
import getWeb3 from './utils/getWeb3'

import './css/oswald.css'
import './css/open-sans.css'
import './css/pure-min.css'
import './App.css'

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      storageValue: 0,
      web3: null,
      metaDataValue: '',
      fineArtInstance: null,
      tokenId: '',
      ipns: '',
    }

    this.handleChangeTokenId = this.handleChangeTokenId.bind(this);
    this.handleChangeIPNS = this.handleChangeIPNS.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

  }

  componentWillMount() {
    // Get network provider and web3 instance.
    // See utils/getWeb3 for more info.

    getWeb3
    .then(results => {
      this.setState({
        web3: results.web3
      })

      // Instantiate contract once web3 provided.
      this.instantiateContract()
    })
    .catch(() => {
      console.log('Error finding web3.')
    })
  }

  instantiateContract() {
    /*
     * SMART CONTRACT EXAMPLE
     *
     * Normally these functions would be called in the context of a
     * state management library, but for convenience I've placed them here.
     */

    const contract = require('truffle-contract')
    const simpleStorage = contract(SimpleStorageContract)
    const fineArt = contract(FineArtContract)
    simpleStorage.setProvider(this.state.web3.currentProvider)
    fineArt.setProvider(this.state.web3.currentProvider)

    // Declaring this for later so we can chain functions on SimpleStorage.
    var simpleStorageInstance
    var fineArtInstance

    // Get accounts.
    this.state.web3.eth.getAccounts((error, accounts) => {

      console.log('accounts:', accounts);

/*
      simpleStorage.deployed().then((instance) => {
        simpleStorageInstance = instance

        // Stores a given value, 5 by default.
        return simpleStorageInstance.set(5, {from: accounts[0]})
      }).then((result) => {
        // Get the value from the contract to prove it worked.
        return simpleStorageInstance.get.call(accounts[0])
      }).then((result) => {
        // Update state with the result.
        return this.setState({ storageValue: result.c[0] })
      })
*/

/*      fineArt.deployed().then((instance) => {
        fineArtInstance = instance

        // Stores a given value, 5 by default.
        return fineArtInstance.createFineArt(accounts[0], 3, '/ipfs/QmWyaoTFxd1yg5vJm3P49NVcvEouSqSUpbniK925rKSQQU', {from: accounts[0]})
      }).then((result) => {
        console.log(result);
        // Get the value from the contract to prove it worked.
        return fineArtInstance.tokenMetadata(3)
      }).then((result) => {
        // Update state with the result.
        console.log(result);
        return this.setState({ metaDataValue: result, fineArtInstance: fineArtInstance })
      })
*/

      fineArtInstance = fineArt.at("0x9fbda871d559710256a2502a2517b794b482db40");
      this.setState({ fineArtInstance: fineArtInstance });

      var res = fineArtInstance.tokenMetadata(1).then((result) => {
        console.log('TM 1:', result);
        this.setState({ metaDataValue: result });
        return result;
      })
      console.log('potato:', res);
    })
  }

  handleSubmit(event) {
    console.log(event);
     event.preventDefault();
     console.log (this.state.fineArtInstance);
     console.log (this.state);

     this.state.web3.eth.getAccounts((error, accounts) => {

       this.state.fineArtInstance.createFineArt(
         accounts[0],
         this.state.tokenId,
         this.state.ipns,
         {from: accounts[0]}
       ).then((result) => {
         console.log(result);
         // Get the value from the contract to prove it worked.
         return this.state.fineArtInstance.tokenMetadata(this.state.tokenId)
       }).then((result) => {
         // Update state with the result.
         console.log(result);
       })

     })
   }

   handleChangeTokenId(event) {
     console.log(event);

     this.setState({tokenId: event.target.value});
   }

   handleChangeIPNS(event) {
     console.log(event);

     this.setState({ipns: event.target.value});
   }

  render() {
    var imageURL = 'http://127.0.0.1:8080/' + this.state.metaDataValue + '/image/default'
    return (
      <div className="App">
        <nav className="navbar pure-menu pure-menu-horizontal">
            <a href="#" className="pure-menu-heading pure-menu-link">Truffle Box</a>
        </nav>

        <main className="container">
          <div className="pure-g">
            <div className="pure-u-1-1">
              <h1>Good to Go!</h1>
              <p>Your Truffle Box is installed and ready.</p>
              <h2>Smart Contract Example</h2>
              <p>If your contracts compiled and migrated successfully, below will show a stored value of 5 (by default).</p>
              <p>Try changing the value stored on <strong>line 59</strong> of App.js.</p>
              <p>The stored value is: {this.state.storageValue}</p>
              <p>The metadata for token 3 is: {this.state.metaDataValue}</p>
              <img src={imageURL} height="256" width="256" />
            </div>
          </div>
        </main>
        <form onSubmit={this.handleSubmit}>
  <label>
    Token ID:   <input type="text" name="tokenId" value={this.state.tokenId} onChange={this.handleChangeTokenId} />
  </label>
  <label>
    IPNS:   <input type="text" name="ipns" value={this.state.ipns} onChange={this.handleChangeIPNS} />
  </label>
  <input type="submit" value="Submit" />
</form>
      </div>
    );
  }
}

export default App
