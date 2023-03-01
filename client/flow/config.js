import { config } from '@onflow/fcl';

//config({
//  'accessNode.api': 'https://rest-devnet.onflow.org/', // Mainnet: "https://rest-mainnet.onflow.org/"
//  'discovery.wallet': 'https://fcl-discovery.onflow.org/testnet/authn', // Mainnet: "https://fcl-discovery.onflow.org/authn"
//  '0xFlowWall': '0xf492380dc41f13fde',
//});

config({
<<<<<<< HEAD
  "accessNode.api": "https://rest-testnet.onflow.org", // Mainnet: "https://rest-mainnet.onflow.org/"
  "discovery.wallet": "https://fcl-discovery.onflow.org/testnet/authn", // Mainnet: "https://fcl-discovery.onflow.org/authn"
  "0xFlowWall": "0xf492380dc41f13fde"
})
=======
  'accessNode.api': 'http://localhost:8888', // Mainnet: "https://rest-mainnet.onflow.org"
  'discovery.wallet': 'http://localhost:8701/fcl/authn', // Mainnet: "https://fcl-discovery.onflow.org/authn"
  '0xFlowWall': '0xf3fcd2c1a78f5eee',
});
>>>>>>> af0e012 (Merged)
