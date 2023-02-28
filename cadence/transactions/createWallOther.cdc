import FlowWall from 0x01

transaction(address: Address) {
  let authAccount: AuthAccount;
  let map: &AnyResource{FlowWall.UnclaimedWallsInterface};


  prepare(acct: AuthAccount) {
    self.authAccount = acct;
    let mapAccount = getAccount(0x01);
    let map_ref = mapAccount.getCapability<&{FlowWall.UnclaimedWallsInterface}>(/public/UnclaimedWalls)
    let map = map_ref.borrow()!
    self.map = map;
  }

  execute {
    log(self.map.add(address: address))
  }
}
