import FlowWall from 0xf3fcd2c1a78f5eee

transaction(address: Address, content: String, type: String) {
  
  let authAccount: AuthAccount
  let content: String
  let type: String
  
  prepare(authAccount: AuthAccount) {
    self.authAccount = authAccount
    self.content = content
    self.type = type
  }

  pre {
    self.authAccount.address != address: "You can't add content to a canvas that isn't yours"
  }

  execute {
    let wall <- self.authAccount.load<@FlowWall.Wall>(from: /storage/Wall)!
    wall.addCanvasItem(type:type, content: content)
    self.authAccount.save(<- wall, to: /storage/Wall)
  }
}