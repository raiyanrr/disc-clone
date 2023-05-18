import { useRouter } from "next/router";
import React, { useState } from "react";

function ServerListItem({label, id}) {

    const router = useRouter()
    const serverId = router.query.serverId

    const [hovering, setHovering] = useState(false)

    function ToolTip({ label }) {
        return (
          <div
            className={`
            ${!hovering && "hidden"}
            absolute z-90 flex justify-start items-center left-12 w-fit px-2 ml-2  bg-black rounded-md`}
          >
            <span className="whitespace-nowrap text-[15px]">{label}</span>
          </div>
        );
      }
    

  return (
    <div
    onMouseOver={() => setHovering(true)}
    onMouseOut={() => setHovering(false)}
      className={`
      ${serverId === id && "rounded-xl bg-blue-600"}
      relative w-12 h-12 cursor-pointer rounded-full flex 
    justify-center items-center 
    bg-[#313338] text-[#dbdee1] font-bold text-xl hover:rounded-xl mb-2`}
    >
      {label[0]}

      <ToolTip label={label} />
    </div>
  );
}

export default ServerListItem;
