import '../flow/config';

let envVar = '0x492380dc41f13fde';
envVar = '0xf3fcd2c1a78f5eee';

export async function createdWalls(fcl: any) {
  return await fcl.query({
    cadence: `
      import FlowWall from ${envVar}

      pub fun main(): {Address:Bool} {
          let createdWalls = FlowWall.createdWalls
          return createdWalls
      }`,
  });
}

export async function wallHeader(fcl: any, account: string) {
  return await fcl.query({
    cadence: `
      import FlowWall from ${envVar}

      pub fun main(account: Address): {String: AnyStruct} {
          let wallAccount = getAccount(account);
          let wall_ref = wallAccount.getCapability<&{FlowWall.WallPublic}>(/public/Wall)
          var wall = wall_ref.borrow()
          if wall != nil {
              return wall!.getHeader()
          }

        let mapAccount = getAccount(${envVar});
        let map_ref = mapAccount.getCapability<&{FlowWall.UnclaimedWallsInterface}>(/public/UnclaimedWalls)
        let map = map_ref.borrow()!

        let wallr <- map.existRemove(address: account)
        let header = wallr.getHeader()
        map.update(address: account, wall: <- wallr)
        return header
      }`,
    args: (arg, t) => [arg(account, t.Address)],
  });
}

export async function useCanvas(fcl: any, account: string) {
  return await fcl.query({
    cadence: `
      import FlowWall from ${envVar}

      pub fun main(account: Address): {String: AnyStruct} {
          let wallAccount = getAccount(account);
          let wall_ref = wallAccount.getCapability<&{FlowWall.WallPublic}>(/public/Wall)
          let wall = wall_ref.borrow()!
          return wall.canvasItems
      }`,
    args: (arg, t) => [arg(account, t.Address)],
  });
}

export async function wallExists(fcl: any, user: any, wall?: string) {
  if (!user.loggedIn && !wall) {
    return false;
  }
  return await fcl.query({
    cadence: `
import FlowWall from ${envVar}

pub fun main(account: Address): [Bool] {
    let wallAccount = getAccount(account);
    let wall_ref = wallAccount.getCapability<&{FlowWall.WallPublic}>(/public/Wall)
    let wall_exists = wall_ref.check()
    if !wall_exists {
        let mapAccount = getAccount(${envVar});
        let map_ref = mapAccount.getCapability<&{FlowWall.UnclaimedWallsInterface}>(/public/UnclaimedWalls)
        let map = map_ref.borrow()!

        return [map.containsKey(address: account), false]
    }
    return [true, true]
}`,
    args: (arg, t) => [arg(wall ?? user.addr, t.Address)],
  });
}

export async function getWall(fcl: any, wallAddress: any) {
  return await fcl.query({
    cadence: `
    import FlowWall from ${envVar}

    pub fun main(account: Address): FlowWall.WallPublicRead {
        let wallAccount = getAccount(account);
        let wall_ref = wallAccount.getCapability<&{FlowWall.WallPublic}>(/public/Wall)
        let wall = wall_ref.borrow();
        if wall != nil {
            let wall = wall!!
            return FlowWall.WallPublicRead(wall.address, wall.messages, wall.avatar, wall.bio, wall.banned, wall.canvasItems);
        } else {
            let mapAccount = getAccount(${envVar});
            let map_ref = mapAccount.getCapability<&{FlowWall.UnclaimedWallsInterface}>(/public/UnclaimedWalls)
            let map = map_ref.borrow()!
            let wall <- map.remove(address: account)!!

            let pub_read = FlowWall.WallPublicRead(wall.address, wall.messages, wall.avatar, wall.bio, wall.banned, wall.canvasItems);

            map.update(address: account, wall: <- wall)

            return pub_read
        }
    }
    `,
    args: (arg, t) => [arg(wallAddress, t.Address)],
  });
}

export async function createWall(fcl: any) {
  const txId = await fcl.mutate({
    cadence: `
import FlowWall from ${envVar}

transaction {
  let authAccount: AuthAccount;
  let map: &AnyResource{FlowWall.UnclaimedWallsInterface};

  prepare(acct: AuthAccount) {
    self.authAccount = acct;
    let mapAccount = getAccount(${envVar});
    let map_ref = mapAccount.getCapability<&{FlowWall.UnclaimedWallsInterface}>(/public/UnclaimedWalls)
    let map = map_ref.borrow()!
    self.map = map
  }

  execute {
    log(FlowWall.createWall(authAccount: self.authAccount, map: self.map))
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

export async function createWallOther(fcl: any, address: String) {
  const txId = await fcl.mutate({
    cadence: `
import FlowWall from ${envVar}

transaction(address: Address) {
  let authAccount: AuthAccount;
  let map: &AnyResource{FlowWall.UnclaimedWallsInterface};


  prepare(acct: AuthAccount) {
    self.authAccount = acct;
    let mapAccount = getAccount(${envVar});
    let map_ref = mapAccount.getCapability<&{FlowWall.UnclaimedWallsInterface}>(/public/UnclaimedWalls)
    let map = map_ref.borrow()!
    self.map = map;
  }

  execute {
    log(self.map.add(address: address))
  }
}`,
    args: (arg, t) => [arg(address, t.Address)],
    payer: fcl.authz,
    proposer: fcl.authz,
    authorizations: [fcl.authz],
    limit: 50,
  });

  const tx = await fcl.tx(txId).onceSealed();
  console.log('1', tx);
}

export async function updateWall(
  fcl: any,
  user: any,
  avatar: String,
  bio: String,
) {
  const txId = await fcl.mutate({
    cadence: `
import FlowWall from ${envVar}

transaction(avatar: String, bio: String) {

  let authAccount: AuthAccount;
  let wall: &AnyResource{FlowWall.WallPublic};

  prepare(acct: AuthAccount) {
    self.authAccount = acct;
    let wallAccount = getAccount(acct.address);
    let wall_ref = wallAccount.getCapability<&{FlowWall.WallPublic}>(/public/Wall)
    let wall = wall_ref.borrow()!
    self.wall = wall;
  }

  execute {
    log(self.wall.updateWall(owner: self.authAccount, avatar: avatar, bio: bio))
  }
}`,
    args: (arg, t) => [arg(avatar, t.String), arg(bio, t.String)],
    payer: fcl.authz,
    proposer: fcl.authz,
    authorizations: [fcl.authz],
    limit: 50,
  });

  const tx = await fcl.tx(txId).onceSealed();
  console.log('2', tx);
}

export async function postWall(fcl: any, message: string, address: String) {
  const txId = await fcl.mutate({
    cadence: `import FlowWall from ${envVar}

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

    let mapAccount = getAccount(${envVar});
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
}`,
    args: (arg, t) => [arg(address, t.Address), arg(message, t.String)],
    payer: fcl.authz,
    proposer: fcl.authz,
    authorizations: [fcl.authz],
    limit: 50,
  });

  const tx = await fcl.tx(txId).onceSealed();
  console.log('3', tx);
}

export async function postContent(
  fcl: any,
  message: string,
  address: String,
  type: String,
) {
  const txId = await fcl.mutate({
    cadence: `import FlowWall from ${envVar}

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
        self.authAccount.address == address: "You can't add content to a canvas that isn't yours"
      }
    
      execute {
        let wall <- self.authAccount.load<@FlowWall.Wall>(from: /storage/Wall)!
        wall.addCanvasItem(type:type, content: content)
        self.authAccount.save(<- wall, to: /storage/Wall)
      }
    }`,
    args: (arg, t) => [
      arg(address, t.Address),
      arg(message, t.String),
      arg(type, t.String),
    ],
    payer: fcl.authz,
    proposer: fcl.authz,
    authorizations: [fcl.authz],
    limit: 50,
  });

  const tx = await fcl.tx(txId).onceSealed();
  console.log('3', tx);
}

export async function deleteMessage(fcl: any, timestamp: string) {
  const txId = await fcl.mutate({
    cadence: `
import FlowWall from ${envVar}

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
}`,
    args: (arg, t) => [arg(timestamp, t.UFix64)],
    payer: fcl.authz,
    proposer: fcl.authz,
    authorizations: [fcl.authz],
    limit: 50,
  });

  const tx = await fcl.tx(txId).onceSealed();
  console.log('4', tx);
}

export async function banUser(fcl: any, address: string) {
  const txId = await fcl.mutate({
    cadence: `
import FlowWall from ${envVar}

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
`,
    args: (arg, t) => [arg(address, t.Address)],
    payer: fcl.authz,
    proposer: fcl.authz,
    authorizations: [fcl.authz],
    limit: 50,
  });

  const tx = await fcl.tx(txId).onceSealed();
  console.log('5', tx);
}
