import FlowWall from 0xf3fcd2c1a78f5eee

pub fun main(account: Address): [FlowWall.Message] {
    let wallAccount = getAccount(account);
    let wall_ref = wallAccount.getCapability<&{FlowWall.WallPublic}>(/public/Wall)
    let wall = wall_ref.borrow()!
    return wall.messages
}