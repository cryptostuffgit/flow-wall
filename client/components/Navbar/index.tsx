import React from 'react'
import * as fcl from "@onflow/fcl";
import { useState } from 'react';

function Navbar({user, setUserWall}) {
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

  const onSubmit = (event) => {
    
    setUserWall(event.target.value);
  }

  return (
    <div className='nav'>
      <div>
        Your Address: {user?.addr ?? "None"}
      </div>
      <div>
        <div className="search">
            <input type="text" className="searchTerm" placeholder="Enter Address" />
            <button type="submit" className="searchButton" onSubmit={onSubmit}>
              Find
            </button>
        </div>
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