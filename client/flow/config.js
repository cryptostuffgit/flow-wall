import { config } from '@onflow/fcl';

config({
  'accessNode.api': 'http://localhost:8888', // Mainnet: "https://rest-mainnet.onflow.org"
  'discovery.wallet': 'http://localhost:8701/fcl/authn', // Mainnet: "https://fcl-discovery.onflow.org/authn"
  '0xFlowWall': '0xf3fcd2c1a78f5eee',
});
