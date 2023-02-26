pub contract FlowWall {

    pub event MessageSent(wall: Address, sender: Address)
    pub event WallCreated(creator: Address)
    pub event WallUpdated(wall: Address)

    pub struct Message {
        pub let sender: Address
        pub let content: String
        pub let timestamp: UFix64

        init(_sender: Address, _content: String, _timestamp: UFix64) {
            self.sender = _sender
            self.content = _content
            self.timestamp = _timestamp
        }
    }

    pub resource interface WallPublic {
        pub let messages: [Message]
        pub fun sendMessage(sender: AuthAccount, content: String)
        pub fun updateWall(owner: AuthAccount, avatar: String, bio: String)
    }

    pub resource Wall: WallPublic {
        pub let address: Address
        pub var avatar: String
        pub var bio: String
        pub let messages: [Message]
        pub let banned: [Address]

        init(address: Address, avatar: String, bio: String) {
            self.address = address
            self.avatar = avatar
            self.bio = bio
            self.messages = []
            self.banned = []

            emit WallCreated(creator: address)
        }

        pub fun sendMessage(sender: AuthAccount, content: String) {
            pre {
                !self.banned.contains(sender.address): "Sorry, you are banned"
            }
            let message = Message(
                _sender: sender.address,
                _content: content,
                _timestamp: getCurrentBlock().timestamp
            )
            self.messages.append(message)
            emit MessageSent(wall: self.address, sender: message.sender)
        }

        pub fun updateWall(owner: AuthAccount, avatar: String, bio: String) {
            pre {
                self.address == owner.address: "You are not the owner"
                avatar.length < 255: "Avatar length too big!"
                bio.length < 255: "Bio length too big!"
            }

            if avatar != "" {
                self.avatar = avatar
            }

            if bio != "" {
                self.bio = bio
            }

            emit WallUpdated(wall: self.address)
        }

        pub fun banAddress(ban: Address) {
            self.banned.append(ban)
        }

        pub fun deleteMessage(timestamp: UFix64) {
            var index = 0
            for message in self.messages {
                if message.timestamp == timestamp {
                    self.messages.remove(at: index)
                    break
                }
                index = index + 1
            }
        }
    }

    pub fun createWall(authAccount: AuthAccount) {
        let wall <- create Wall(address: authAccount.address, avatar: "", bio: "")
        authAccount.save(<- wall, to: /storage/Wall)
        authAccount.link<&{WallPublic}>(/public/Wall, target: /storage/Wall);
    }
}
