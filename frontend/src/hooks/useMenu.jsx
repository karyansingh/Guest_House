import { BsFillPeopleFill, BsBoxArrowInLeft, BsBank2, BsFillPersonLinesFill, BsDatabaseFillExclamation } from 'react-icons/bs'
import { BiSolidPlaneAlt } from "react-icons/bi"
import { FaLocationCrosshairs, FaLocationDot } from "react-icons/fa6"
import { MdOutlinePublishedWithChanges } from "react-icons/md"
import { LuUpload } from "react-icons/lu"
import { MdOutlineFlight } from "react-icons/md"
import { MdAccountBalance } from "react-icons/md"
import { TbRecharging } from "react-icons/tb"
import { LuTicketsPlane } from "react-icons/lu"
import { RiLockPasswordLine } from "react-icons/ri"
import { MdOutlinePolicy } from "react-icons/md"
import { MdOutlineContactPhone } from "react-icons/md"
import { HiReceiptRefund } from "react-icons/hi"
//import userAPI from '../API/userAPI'
import { AiFillCalculator } from "react-icons/ai"
import { GoReport } from "react-icons/go"
import { IoArrowUndoSharp } from "react-icons/io5"



export function useManu() {

    const navBar = [
        {
            id: 1,
            name: "Home",
            slug: "/dashboard",
            role: ['Admin', 'Sheller', 'Agent'],
            icon: <BsBank2 className='icon' style={{ color: '#FF9F43' }} />,
            dropdown: []
        },
    ]

    return navBar
}
