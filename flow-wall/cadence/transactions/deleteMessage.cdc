import FlowWall from 0xf3fcd2c1a78f5eee

transaction(timestamp: UFix64) {
  
  let authAccount: AuthAccount
  
  prepare(authAccount: AuthAccount) {
    self.authAccount = authAccount
  }

  execute {
    let wall <- self.authAccount.load<@FlowWall.Wall>(from: /storage/Wall)!
    wall.deleteMessage(timestamp: timestamp)
    self.authAccount.save(<- wall, to: /storage/Wall)
  }
}
