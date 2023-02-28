import '../flow/config';

export async function useCreatedWalls(fcl: any) {
  return await fcl.query({
    cadence: `
      import FlowWall from 0xf3fcd2c1a78f5eee

      pub fun main(): {Address:Bool} {
          let createdWalls = FlowWall.createdWalls
          return createdWalls
      }`,
  });
}

export async function useWallHeader(fcl: any, account: string) {
  return await fcl.query({
    cadence: `
      import FlowWall from 0xf3fcd2c1a78f5eee

      pub fun main(account: Address): {String: AnyStruct} {
          let wallAccount = getAccount(account);
          let wall_ref = wallAccount.getCapability<&{FlowWall.WallPublic}>(/public/Wall)
          let wall = wall_ref.borrow()!
          return wall.getHeader()
      }`,
      args: (arg, t) => [arg(account, t.Address)],
  });
}

export async function useWallExists(fcl: any, user: any, wall?: string) {
  if (!user.loggedIn && !wall) {
    return false;
  }
  return await fcl.query({
    cadence: `
import FlowWall from 0xf3fcd2c1a78f5eee

pub fun main(account: Address): Bool {
    let wallAccount = getAccount(account);
    let wall_ref = wallAccount.getCapability<&{FlowWall.WallPublic}>(/public/Wall)
    let wall = wall_ref.borrow()
    if wall == nil {
        return false
    }
    return true
}`,
    args: (arg, t) => [arg(wall ?? user.addr, t.Address)],
  });
}

export async function getWall(fcl: any, wallAddress: any) {
  return await fcl.query({
    cadence: `
    import FlowWall from 0xf3fcd2c1a78f5eee

    pub fun main(account: Address): FlowWall.WallPublicRead {
        let wallAccount = getAccount(account);
        let wall_ref = wallAccount.getCapability<&{FlowWall.WallPublic}>(/public/Wall)
        let wall = wall_ref.borrow()!;
        if wall != nil {
            return FlowWall.WallPublicRead(wall.address, wall.messages, wall.avatar, wall.bio, wall.banned);
        } else {
            return FlowWall.WallPublicRead(account, [], "", "", []);
        }
    }
    `,
    args: (arg, t) => [arg(wallAddress, t.Address)],
  });
}

export async function createWall(fcl: any) {
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

export async function updateWall(
  fcl: any,
  user: any,
  avatar: String,
  bio: String,
) {
  const txId = await fcl.mutate({
    cadence: `
import FlowWall from 0xf3fcd2c1a78f5eee

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
  console.log(tx);
}

export async function postWall(fcl: any, message: string, address: String) {
  const txId = await fcl.mutate({
    cadence: `
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
}`,
    args: (arg, t) => [arg(address, t.Address), arg(message, t.String)],
    payer: fcl.authz,
    proposer: fcl.authz,
    authorizations: [fcl.authz],
    limit: 50,
  });

  const tx = await fcl.tx(txId).onceSealed();
  console.log(tx);
}

export async function deleteMessage(fcl: any, timestamp: string) {
  const txId = await fcl.mutate({
    cadence: `
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
}`,
    args: (arg, t) => [arg(timestamp, t.UFix64)],
    payer: fcl.authz,
    proposer: fcl.authz,
    authorizations: [fcl.authz],
    limit: 50,
  });

  const tx = await fcl.tx(txId).onceSealed();
  console.log(tx);
}

export async function banUser(fcl: any, address: string) {
  const txId = await fcl.mutate({
    cadence: `
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
`,
    args: (arg, t) => [arg(address, t.Address)],
    payer: fcl.authz,
    proposer: fcl.authz,
    authorizations: [fcl.authz],
    limit: 50,
  });

  const tx = await fcl.tx(txId).onceSealed();
  console.log(tx);
}
