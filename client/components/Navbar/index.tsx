import React from 'react'
import * as fcl from "@onflow/fcl";

function Navbar({user}) {
	const AuthedState = () => {
		return (
			<div>
				<button className={"authButton"} onClick={fcl.unauthenticate}>Log Out</button>
			</div>
		)
	}

	const UnauthenticatedState = () => {
		return (
			<div>
				<button className={"authButton"} onClick={fcl.logIn}>Log In</button>
			</div>
		)
	}

  return (
    <div className='nav'>
      <div>
        Address: {user?.addr ?? "None"}
      </div>
      <div >
        {user.loggedIn
          ? <AuthedState />
          : <UnauthenticatedState />
        }
      </div>
    </div>
  )
}

export default Navbar