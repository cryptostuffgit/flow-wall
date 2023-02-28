import FlowWall from 0x01

transaction {
  let authAccount: AuthAccount;

  prepare(acct: AuthAccount) {
    self.authAccount = acct;
  }

  execute {
    log(FlowWall.createMap())
  }
}
