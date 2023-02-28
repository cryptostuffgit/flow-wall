import FlowWall from 0x01

transaction(address: Address, content: String) {

  let authAccount: AuthAccount;
  let wall: &AnyResource{FlowWall.WallPublic}?;
  let map: &AnyResource{FlowWall.UnclaimedWallsInterface};

  prepare(acct: AuthAccount) {
    self.authAccount = acct;
    let wallAccount = getAccount(address);
    let wall_ref = wallAccount.getCapability<&{FlowWall.WallPublic}>(/public/Wall)
    let wall = wall_ref.borrow()
    self.wall = wall;

    let mapAccount = getAccount(0x01);
    let map_ref = mapAccount.getCapability<&{FlowWall.UnclaimedWallsInterface}>(/public/UnclaimedWalls)
    let map = map_ref.borrow()!
    self.map = map;
  }

  execute {
    if self.wall == nil {
        let wall <- self.map.remove(address: address)
        if wall == nil {
            destroy wall
        } else {
            log(wall?.sendMessage(sender: self.authAccount, content: content))
            self.map.update(address: address, wall: <- wall!)
        }
    } else {
        log(self.wall!.sendMessage(sender: self.authAccount, content: content))
    }
  }
}
