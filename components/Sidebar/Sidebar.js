import React from 'react'
import ChannelList from './ChannelList'
import ServerList from './ServerList'

function Sidebar({serverId}) {
  return (
    <div className='hidden w-[312px] bg-[#1e1f22] lg:flex'>
      <ServerList />
      <ChannelList serverId={serverId} />
    </div>
  )
}

export default Sidebar