import FlowWall from 0xf3fcd2c1a78f5eee

transaction(address: Address, content: String) {

  let authAccount: AuthAccount;
  let wall: &AnyResource{FlowWall.WallPublic};

  prepare(acct: AuthAccount) {
    self.authAccount = acct;
    let wallAccount = getAccount(address);
    let wall_ref = wallAccount.getCapability<&{FlowWall.WallPublic}>(/public/Wall)
    let wall = wall_ref.borrow()!
    self.wall = wall;
  }

  execute {
    log(self.wall.sendMessage(sender: self.authAccount, content: content))
  }
}