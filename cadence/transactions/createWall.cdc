import FlowWall from 0xf3fcd2c1a78f5eee

transaction {

  let authAccount: AuthAccount;

  prepare(acct: AuthAccount) {
    self.authAccount = acct;
  }

  execute {
    log(FlowWall.createWall(authAccount: self.authAccount))
  }
}