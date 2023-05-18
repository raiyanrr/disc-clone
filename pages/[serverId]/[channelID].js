import { useRouter } from 'next/router'
import React from 'react'
import Feed from '../../components/Feed'
import Sidebar from '../../components/Sidebar/Sidebar'

function ChannelId() {

    const router = useRouter()
    const serverId = router.query.serverId
  return (
    <main className='flex min-h-screen'>
      <Sidebar serverId={serverId} />
      <Feed serverId={serverId} />
    </main>
  )
}

export default ChannelId