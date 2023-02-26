import '../flow/config';

export async function createWall(fcl) {
  const txId = await fcl.mutate({
    cadence: `
import FlowWall from 0xf3fcd2c1a78f5eee

transaction {

  let authAccount: AuthAccount;

  prepare(acct: AuthAccount) {
    self.authAccount = acct;
  }

  execute {
    log(FlowWall.createWall(authAccount: self.authAccount))
  }
}`,
    payer: fcl.authz,
    proposer: fcl.authz,
    authorizations: [fcl.authz],
    limit: 50,
  });

  const tx = await fcl.tx(txId).onceSealed();
  console.log(tx);
}

export async function postWall() {
  //
}

export async function deleteMessage() {
  //
}

export async function banUser() {
  //
}
