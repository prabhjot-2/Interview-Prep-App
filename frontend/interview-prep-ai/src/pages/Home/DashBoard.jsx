import React, { useEffect, useState } from 'react'
import { LuPlus } from 'react-icons/lu'
import {CARD_BG} from "../../utils/data";
import toast from 'react-hot-toast';
import DashboardLayout from "../../components/layouts/DashboardLayout"
import { data, useNavigate } from 'react-router-dom';
import axiosInstance from '../../utils/axiosInstance';
import { API_PATHS } from '../../utils/apiPaths';
import moment from "moment"
import SummaryCard from '../../components/Cards/SummaryCard';
const DashBoard = () => {
  const navigate=useNavigate();

  const [openCreateModal,setOpnCreateModal]=useState(false);
  const [sessions,setSessions]=useState([]);

  const [openDeleteAlert,setOpenDeleteAlert]=useState({
    open:false,
    data:null,
  })
  const fecthAllSessions=async()=>{
    try {
      const response =await axiosInstance.get(API_PATHS.SESSION.GET_ALL);
    setSessions(response.data);
    } catch (error) {
      console.error("Error fetching sssion data:",error)
    }
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
          {sessions?.map((data,index)=>(
            <SummaryCard
              key={data?._id}
              colors={CARD_BG[index%CARD_BG.length]}
              role={data?.role || ""}
              topicsToFocus={data?.topicsToFocus || ""}
              experience={data?.experience || ""}
              questions={data?.questions ||""}
              description={data?.description || ""}
              lastUpdated={
                data?.updatedAt ? moment(data.updatedAt).format("Do MMM YYYY"):""
              }
              onSelect={()=>navigate(`interview-prep/${data?._id}`)}
              onDelete={()=>setOpenDeleteAlert({open:true,data})}
            />
          ))}
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
