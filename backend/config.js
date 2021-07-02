module.exports = { 
      mysqlHost: "65.1.3.232",
    //mysqlHost: "localhost",
     
    
    //Localhost 
//    user: "root",
//    password : "",
//    database : "mercafor",    
   // social db connection
    user: "esp",
    password: 'Espsoft123#',
    database: "vulnerary",    
   // database: "mercafor",    

    mysqlPort: 3306,

    JWT_SECRET_KEY: '6dqw7dydyw7ewyuw',
    SESSION_EXPIRES_IN: '1h', // Session will expire after 1 day of creation
    imageUrl:'https://ipfs.io/ipfs/',

    // OLD KEY BEFORE UPDATE 20210617
    // contractOwnerAddress : '0xcf601e63906c587245b614baa8ad35a073cdee01', //live
    // contractOwnerPrivateKey : '0xbbb184aef7ee8e86998089c376069a8bb915bef5e6533645ec728deb44944b86', 


    // stripe_key : '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', //live
    // contractAddress : '0xe77453441415a1e211e562fe5540110f8fcaad06', //live
    // blockchainApiUrl :'https://infinity8.io:8001/api/erc1155/mainnet/', //mainnet
    // ethTransferApiUrl : 'https://infinity8.io:8001/api/eth/mainnet/transfer',
    // contractOwnerAddress : '0xB45F05cBC7614f50f31409Bec10e06cdFa0Bc168', //live
    // contractOwnerPrivateKey : '0x085db8f0ba24dbfb49ae9967533db2efc028a8812309f380c34fee96794261b1', 
    // netCentsAuthorization : 'Basic SVROSXBvTVB6SGpRRmcyYnlHeHliczNCc2NNdVZQUkI6NW1mdjk4aWlaQnhwSFFQRHdHc2FmOE9MUDdqbVZFaGs1UmNLQS1NVmFyWGZjS3dBT3pSbXRiTFo=',
    // netCentshostedPaymentId: "3288",
    // blockchainNetwork:'mainnet'

 

 
    stripe_key:'sk_test_51IpRmeSD2c5qKNYTLUUaGtaPpALirAVmekLD0KHt5xNg3iWHEW0zBvdgtC4zv8YhQcH52Cw6wTfqf5akAwZo2Bn3002xvBslji', //test
    blockchainApiUrl :'https://infinity8.io:8001/api/erc1155/', //testnet
    ethTransferApiUrl : 'https://infinity8.io:8001/api/eth/testnet/transfer',
    contractAddress : '0xa2a4aaf57a0b720d7e7ede66aa906a4775d41449',// test
    contractOwnerAddress : '0xb1b3b9104c0ee3fc67626b50374509ad11ded0fd', //testnet
    contractOwnerPrivateKey : '0x20b92deda888f28125744885d57553975b69a7c1aea670467adf81f57a1bf1b4', 
    netCentsAuthorization : 'Basic VmdpRkZZNnZuallNdWVKdFlwbVJfVFF6LUJZVjA4U2E6YW5HUDlNc3NfeXNEbFlhM2xmYnlveUpzMFl6RzhBX2FsU1hWSlZIdkJ2Smg2MllUVHo4T05oVDg=',
    netCentshostedPaymentId: "3511",
    blockchainNetwork:'testnet'


}   
     