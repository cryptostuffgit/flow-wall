import React from 'react'
import * as fcl from "@onflow/fcl";

function Navbar({user}) {
    const AuthedState = () => {
        return (
            <div>
            <div>Address: {user?.addr ?? "No Address"}</div>
            <button onClick={fcl.unauthenticate}>Log Out</button>
            </div>
        )
        }

        const UnauthenticatedState = () => {
					return (
						<div>
							<button onClick={fcl.logIn}>Log In</button>
						</div>
					)
        }

    return (
        <div className='nav'>
            <div className='logo'>
            </div>
            <div className='wallet-info'>
                {user.loggedIn
                    ? <AuthedState />
                    : <UnauthenticatedState />
                }
            </div>
        </div>
    )
}

export default Navbar