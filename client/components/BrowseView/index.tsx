import { useEffect, useState } from "react";
import { useCreatedWalls } from "@/utils/transactions";
import Profile from "@/components/Profile";
import * as fcl from '@onflow/fcl';

const BrowseView = () => {
  const [walls, setWalls] = useState<any>({})

  useEffect(() => {
    (async () => {
      const createdWalls = await useCreatedWalls(fcl)
      console.log(createdWalls)
      setWalls(createdWalls)
    })()
  }, []);
  
  return (
    <div className="browse-walls">  
      <h1>
        Visit a Wall
      </h1>
      <div className="created-walls">
        {walls && Object.keys(walls).map(wall => {
          return <Profile address={wall}/>
        })}
      </div>
    </div>
  )
}
export default BrowseView;