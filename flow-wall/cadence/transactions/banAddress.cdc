import FlowWall from 0xf3fcd2c1a78f5eee

transaction(address: Address) {
  
  let authAccount: AuthAccount
  
  prepare(authAccount: AuthAccount) {
    self.authAccount = authAccount
  }

  pre {
    self.authAccount.address != address: "You cannot ban yourself"
  }

  execute {
    let wall <- self.authAccount.load<@FlowWall.Wall>(from: /storage/Wall)!
    wall.banAddress(ban: address)
    self.authAccount.save(<- wall, to: /storage/Wall)
  }
}
