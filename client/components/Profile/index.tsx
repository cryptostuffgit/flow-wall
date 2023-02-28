import { useEffect, useState } from "react";
import { useWallHeader } from "@/utils/transactions";
import * as fcl from '@onflow/fcl';

const Profile = ({address}) => {
  const [header, setHeader] = useState<any>({})

  useEffect(() => {
    (async () => {
      const headerData = await useWallHeader(fcl, address)
      console.log(headerData)
      setHeader(headerData)
    })()
  }, []);
  
  return (
    <div className="wall">
      {address}'s Wall
      {header && <>
        <div>
          {header.avatar}
        </div>
        <div>
          {header.bio}
        </div>
      </>}
    </div>
  )
}
export default Profile;