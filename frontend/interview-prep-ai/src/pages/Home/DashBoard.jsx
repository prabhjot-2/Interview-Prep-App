import React, { useEffect, useState } from 'react'
import { LuPlus } from 'react-icons/lu'
import {CARD_BG} from "../../utils/data";
import toast from 'react-hot-toast';
import DashboardLayout from "../../components/layouts/DashboardLayout"
import { data, useNavigate } from 'react-router-dom';
const DashBoard = () => {
  const navigate=useNavigate();

  const [openCreateModal,setOpnCreateModal]=useState(false);
  const [sessions,setSessions]=useState([]);

  const [openDeleteAlert,setOpenDeleteAlert]=useState({
    open:false,
    data:null,
  })
  const fecthAllSessions=async()=>{

  };
  
  const deleteSession=async(sessionData)=>{

  };

  useEffect(()=>{
    fecthAllSessions();
  },[]);
  return (
    <DashboardLayout>
      <div className='container mx-auto pt-4 pb-4'>
        <div className='gri grid-cols-1 md:grid-cols-3 gap-4 md:gap-7 pt-1 pb-6 px-4 md:px-0'>

        </div>
        <button 
          className='h-12 md:h-12 flex items-center justify-center gap-3 bg-linear-to-r from-[#FF9324] to-[e99a4b] text-sm font-semibold text-white px-7 py-2.5 rounded-full hover:bg-black hover:text-white transition-colors cursor-pointer hover:shadow-2xl hover:shadow-orange-300 fixed bottom-10 md:bottom-20 right-10 md:right-20'
          onClick={()=>setOpnCreateModal(true)}  
        >
          <LuPlus className='text-2xl text-white'/>
          Add new
        </button>
      </div>
    </DashboardLayout>
  )
}

export default DashBoard
