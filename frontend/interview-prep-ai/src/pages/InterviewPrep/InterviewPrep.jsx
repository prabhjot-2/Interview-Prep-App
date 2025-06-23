import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { useParams } from 'react-router-dom'
import DashboardLayout from '../../components/layouts/DashboardLayout';
import moment from 'moment';
import RoleInfoHeader from './components/RoleInfoHeader';
import axiosInstance from '../../utils/axiosInstance';
import { API_PATHS } from '../../utils/apiPaths';

const InterviewPrep = () => {
  const {sessionId}=useParams();

  const [sessionData,setSessionData]=useState(null);
  const[errorMsg,setErrorMsg]=useState("");

  const [openLearnMoreDrawer, setOpenLearnDrawer]=useState(false);
  const [explanation, setExplanation]=useState(null);

  const [isLoading,setIsLoading]=useState(false);
  const [isUpdateLoader,setIsUpdateLoader]=useState(false);

  // fetch session data byy session id
  const fetchSessionDetailsById=async()=>{
    try{
      const response =await axiosInstance.get(API_PATHS.SESSION.GET_ONE(sessionId));

      if(response.data && response.data.session){
        setSessionData(response.data.session);
      }
    }catch(error){
      console.error("Error:",error);
    }
  };
  
  // generate concept explanation
  const generateConceptExplanation=async(question)=>{}

  // pin question
  const toggleQuestionPinStatus=async(questionId)=>{}

  // addd more question to session
  const uploadMoreQuestions=async()=>{};

  useEffect(()=>{
    if(sessionId){
      fetchSessionDetailsById();
    }
  })

  return (
    <DashboardLayout>
      <RoleInfoHeader
        role={sessionData?.role || ""}
        topicsToFocus={sessionData?.topicsToFocus || ""}
        experience={sessionData?.experience || ""}
        questions={sessionData?.questions || ""}
        description={sessionData?.description || ""}
        lastUpdated={sessionData?.updatedAt? moment(sessionData.updatedAt).format("Do MMM YYYY"): ""}

      />
    </DashboardLayout>
  )
}

export default InterviewPrep
