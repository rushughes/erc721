cool-2:ethereum-nft rus$ truffle develop
Truffle Develop started at http://localhost:9545/

Accounts:
(0) 0x627306090abab3a6e1400e9345bc60c78a8bef57
(1) 0xf17f52151ebef6c7334fad080c5704d77216b732
(2) 0xc5fdf4076b8f3a5357c5e395ab970b5b54098fef
(3) 0x821aea9a577a9b44299b9c15c88cf3087f3b5544
(4) 0x0d1d4e623d10f9fba5db95830f7d3839406c6af2
(5) 0x2932b7a2355d6fecc4b5c0b6bd44cc31df247a2e
(6) 0x2191ef87e392377ec08e7c08eb105ef5448eced5
(7) 0x0f4f2ac550a1b4e2280d04c21cea7ebd822934b5
(8) 0x6330a553fc93768f612722bb8c2ec78ac90b3bbc
(9) 0x5aeda56215b167893e80b4fe645ba6d5bab767de

Private Keys:
(0) c87509a1c067bbde78beb793e6fa76530b6382a4c0241e5e4a9ec0a0f44dc0d3
(1) ae6ae8e5ccbfb04590405997ee2d52d2b330726137b875053c36d94e974d162f
(2) 0dbbe8e4ae425a6d2687f1a7e3ba17bc98c673636790f1b8ad91193c05875ef1
(3) c88b703fb08cbea894b6aeff5a544fb92e78a18e19814cd85da83b71f772aa6c
(4) 388c684f0ba1ef5017716adb5d21a053ea8e90277d0868337519f97bede61418
(5) 659cbb0e2411a44db63778987b1e22153c086a95eb6b18bdf89de078917abc63
(6) 82d052c865f5763aad42add438569276c00d3d88a2d062d36b2bae914d58b8c8
(7) aa3680d5d48a8283413f7a108367c7299ca73f553735860a87b08f39395618b7
(8) 0f62d96d6675f32685bbdb8ac13cda7c23436f63efbb9d07700d8669ff12b7c4
(9) 8d5366123cb560bb606379f90a0bfd4769eecc0557f1b362dcae9012b548b1e5

Mnemonic: candy maple cake sugar pudding cream honey rich smooth crumble sweet treat

truffle(develop)> compile
Compiling ./contracts/Migrations.sol...
Compiling ./contracts/SimpleStorage.sol...
Writing artifacts to ./build/contracts

truffle(develop)> migrate
Using network 'develop'.

Running migration: 1_initial_migration.js
  Deploying Migrations...
  ... 0x0ccdaca05899a90c7977211c18d675c2408ab8098fe2172e27488d72800fbaf7
  Migrations: 0x8cdaf0cd259887258bc13a92c0a6da92698644c0
Saving successful migration to network...
  ... 0xd7bc86d31bee32fa3988f1c1eabce403a1b5d570340a3a9cdba53a472ee8c956
Saving artifacts...
Running migration: 2_deploy_contracts.js
  Deploying SimpleStorage...
  ... 0x528d1a533a4878eabcee0513ae323bae833a4214248ca05156b2ea6652f2f022
  SimpleStorage: 0x345ca3e014aaf5dca488057592ee47305d9b3e10
Saving successful migration to network...
  ... 0xf36163615f41ef7ed8f4a8f192149a0bf633fe1a2398ce001bf44c43dc7bdda0
Saving artifacts...

// Serves the front-end on http://localhost:3000
 npm run start


FineArt.new().then(function(instance) { console.log(instance.address); }).catch(function(err) { console.log(err) });

truffle(develop)> FineArt.new().then(function(instance) { console.log(instance.address); });
0xfb88de099e13c3ed21f80a7a1e49f8caecf10df6
undefined

var instance = FineArt.at("0xaa588d3737b611bafd7bd713445b314bd453a5c8");

truffle(develop)> FineArt.new().then(function(instance) { console.log(instance.address); }).catch(function(err) { console.log(err) });
0xaa588d3737b611bafd7bd713445b314bd453a5c8
undefined
truffle(develop)> var instance = FineArt.at("0xaa588d3737b611bafd7bd713445b314bd453a5c8");
undefined
truffle(develop)> instance.createFineArt("0x627306090abab3a6e1400e9345bc60c78a8bef57", 1, 'http://www.slashdot.org');
{ tx: '0x679ee8d53f9ad68a4cc631df197e4004bed497dfa31d91b53b0eb42a7384362a',
  receipt:
   { transactionHash: '0x679ee8d53f9ad68a4cc631df197e4004bed497dfa31d91b53b0eb42a7384362a',
     transactionIndex: 0,
     blockHash: '0x9ad471bbee83354790d97f7cba78ee0fca128c8702bf2d82edef2124874a36b4',
     blockNumber: 11,
     gasUsed: 135132,
     cumulativeGasUsed: 135132,
     contractAddress: null,
     logs: [ [Object] ],
     status: 1 },
  logs:
   [ { logIndex: 0,
       transactionIndex: 0,
       transactionHash: '0x679ee8d53f9ad68a4cc631df197e4004bed497dfa31d91b53b0eb42a7384362a',
       blockHash: '0x9ad471bbee83354790d97f7cba78ee0fca128c8702bf2d82edef2124874a36b4',
       blockNumber: 11,
       address: '0xaa588d3737b611bafd7bd713445b314bd453a5c8',
       type: 'mined',
       event: 'Transfer',
       args: [Object] } ] }

       truffle(develop)> instance.tokenMetadata(1);
'http://www.slashdot.org'

docker run -d --name ipfs_host -v ipfs_staging:/export -v ipfs_data:/data/ipfs -p 4001:4001 -p 127.0.0.1:8080:8080 -p 127.0.0.1:5001:5001 ipfs/go-ipfs:release

cool-2:assets rus$ ls -al
total 24
drwxr-xr-x   4 rus  staff   136 15 Feb 20:43 .
drwxr-xr-x  24 rus  staff   816 15 Feb 20:36 ..
-rw-r--r--@  1 rus  staff  8196 15 Feb 20:53 .DS_Store
drwxr-xr-x   8 rus  staff   272 15 Feb 20:53 1
cool-2:assets rus$ ipfs add -r 1
added QmfTd2R8LJPZwvzf4cM69xjHw9eC2H2BdaA3kHMg6Aq1Vq 1/art/default
added QmbFMke1KXqnYyBBWxB74N4c5SBnJMVAiMNRcGu6x1AwQH 1/description/default
added QmQkrVrMAy5hgCpWbR32umrQxmVE1QebCjjgrr3Jv4KYmF 1/image/default
added QmdTAj4PEnC9qgtd4nmVM4q51nEWRHJ3KpS9UxrPjDDQ9u 1/metadata/default
added QmcrquH4b8WYhvMjD9cGswNuRD12WxoFNLNypMW3VzoLFZ 1/name/default
added QmQhCQ6KQtmhkFNf21KpXHvSm893EngxWK5YKzeL3rDkng 1/art
added QmceUyjGQQupkK2Q7nYxwoMpuC2EbTpNLZfBD3WPJYamB1 1/description
added QmVBKMSs2amo4gGvxsTVgJuLcZ35joZTxzpZyZLNN1aQ5M 1/image
added QmZ2P3zyTpjVAYWoxnfg1K3kwGgu1jEwS5HLAn9AsNGyzJ 1/metadata
added QmXMswFYFKQZkj93cTvvzozaTXSnxNRqPcGEKd5fWbtyvH 1/name
added QmWyaoTFxd1yg5vJm3P49NVcvEouSqSUpbniK925rKSQQU 1
cool-2:assets rus$ ipfs name publish /ipfs/QmWyaoTFxd1yg5vJm3P49NVcvEouSqSUpbniK925rKSQQU
Published to QmWcR3k5MkgFQsiFmCiHQJFBR8xzyVJWMy91g8gWTsXjgr: /ipfs/QmWyaoTFxd1yg5vJm3P49NVcvEouSqSUpbniK925rKSQQU
cool-2:assets rus$

cool-2:assets rus$ ipfs key gen --type=rsa --size=2048 rus-ipfs-key
QmZE4iDwVbv4LFws68ZzrXuowgACLpGrGpgPGDvGvsxDXy

cool-2:assets rus$ ipfs name publish --key=rus-ipfs-key /ipfs/QmWyaoTFxd1yg5vJm3P49NVcvEouSqSUpbniK925rKSQQU
Published to QmZE4iDwVbv4LFws68ZzrXuowgACLpGrGpgPGDvGvsxDXy: /ipfs/QmWyaoTFxd1yg5vJm3P49NVcvEouSqSUpbniK925rKSQQU

cool-2:assets rus$ ipfs add -r 2
added QmfTd2R8LJPZwvzf4cM69xjHw9eC2H2BdaA3kHMg6Aq1Vq 2/art/default
added QmUqmdKfZGraczb9JDb57kinvgSgZAPUZKahYiSxrpJjcG 2/description/default
added QmQkrVrMAy5hgCpWbR32umrQxmVE1QebCjjgrr3Jv4KYmF 2/image/default
added QmdTAj4PEnC9qgtd4nmVM4q51nEWRHJ3KpS9UxrPjDDQ9u 2/metadata/default
added QmcrquH4b8WYhvMjD9cGswNuRD12WxoFNLNypMW3VzoLFZ 2/name/default
added QmQhCQ6KQtmhkFNf21KpXHvSm893EngxWK5YKzeL3rDkng 2/art
added Qme3BLRVYEJxF9H8x2R1uRLE8GmACq7MMP59m4hjRYJiWL 2/description
added QmVBKMSs2amo4gGvxsTVgJuLcZ35joZTxzpZyZLNN1aQ5M 2/image
added QmZ2P3zyTpjVAYWoxnfg1K3kwGgu1jEwS5HLAn9AsNGyzJ 2/metadata
added QmXMswFYFKQZkj93cTvvzozaTXSnxNRqPcGEKd5fWbtyvH 2/name
added QmcD15114nUG9abaFAXJ4ERo2rNMJ5B8NXJqkc3Qt6pyru 2
cool-2:assets rus$ ipfs name publish --key=rus-ipfs-key QmcD15114nUG9abaFAXJ4ERo2rNMJ5B8NXJqkc3Qt6pyru
Published to QmZE4iDwVbv4LFws68ZzrXuowgACLpGrGpgPGDvGvsxDXy: /ipfs/QmcD15114nUG9abaFAXJ4ERo2rNMJ5B8NXJqkc3Qt6pyru
