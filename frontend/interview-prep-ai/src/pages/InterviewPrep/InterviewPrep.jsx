import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { data, useParams } from 'react-router-dom'
import DashboardLayout from '../../components/layouts/DashboardLayout';
import moment from 'moment';
import RoleInfoHeader from './components/RoleInfoHeader';
import axiosInstance from '../../utils/axiosInstance';
import { API_PATHS } from '../../utils/apiPaths';
import QuestionCard from '../../components/Cards/QuestionCard';
import { LuCircleAlert, LuListCollapse } from 'react-icons/lu';
import toast from 'react-hot-toast';
import AIResponsePreview from './components/AIResponsePreview';
import Drawer from '../../components/Drawer';
import axios from 'axios';
import SkeletonLoader from '../../components/Loader/SkeletonLoader';

const InterviewPrep = () => {
  const {sessionId}=useParams();

  const [sessionData,setSessionData]=useState(null);
  const[errorMsg,setErrorMsg]=useState("");

  const [openLeanMoreDrawer, setOpenLearnDrawer]=useState(false);
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
  const generateConceptExplanation=async(question)=>{
    try {
      setErrorMsg("");
      setExplanation(null)

      setIsLoading(true);
      setOpenLearnDrawer(true);

      const response=await axiosInstance.post(API_PATHS.AI.GENERATE_EXPLANATION,{question})

      if(response.data){
        setExplanation(response.data)
      }
    } catch (error) {
      setExplanation(null)
      setErrorMsg("Failed to generate Explanation, try again later");
      console.error("Error:",error);
    }finally{
      setIsLoading(false)
    }
  }

  // pin question
  const toggleQuestionPinStatus=async(questionId)=>{
    try {
      const response=await axiosInstance.post(
        API_PATHS.QUESTION.PIN(questionId)
      );

      console.log(response);

      if(response.data && response.data.question){
        // toast.success('Question pinne Successfully)
        fetchSessionDetailsById();
      }
    } catch (error) {
      console.error("Error:",error);
    }
  }

  // addd more question to session
  const uploadMoreQuestions=async()=>{
    try{
      setIsUpdateLoader(true)

      // call ai api to generate questions
      const aiResponse=await axiosInstance.post(
        API_PATHS.AI.GENERATE_QUESTIONS,
        {
          role:sessionData?.role,
          experience:sessionData?.experience,
          topicsToFocus:sessionData?.topicsToFocus,
          numberOfQuestions:10,
        }
      );
      // should be array like [{questions, answer ...}]
      const generatedQuestions=aiResponse.data;

      const response=await axiosInstance.post(
        API_PATHS.QUESTION.ADD_TO_SESSION,
        {
          sessionId,
          questions:generatedQuestions,
        }
      );

      if(response.data){
        toast.success("Adde more Q&A");
        fetchSessionDetailsById();
      }
    }catch(error){
      if(error.response && error.response.data.message){
        setError(error.response.data.message)
      }else{
        setError("something went wrong. Please try again");
      }
    }finally{
      setIsUpdateLoader(false)
    }
  };

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
      <div className='container mx-auto pt-4 pb-4 px-4 md:px-0'>
        <h2 className='text-lg font-semibold color-black'>
          Interview Q&A
        </h2>

        <div className='grid grid-cols-12 gap-=4 mt-5 mb-10'>
          <div className={`col-span-12 ${openLeanMoreDrawer ? "md:col-span-7" :"md:col-span-8"}`}>
            <AnimatePresence>
              {sessionData?.questions?.map((data,index)=>{
                return(
                  <motion.div 
                    key={data._id || index}
                    initial={{opacity:0, y:-20}}
                    animate={{opacity:1, y:0}}
                    exit={{opacity:0, scale:0.95}}
                    transition={{
                      duration:0.4,
                      type:"spring",
                      stiffness:100,
                      delay:index*0.1,
                      damping:15,
                    }}
                    layout//this is the dey prop thgat animates position chnages
                    layoutId={`question-${data._id||index}`}// helps framer tracks specific items
                    >
                      <>
                        <QuestionCard
                          question={data?.question}
                          answer={data?.answer}
                          onLearnMore={()=> generateConceptExplanation(data.question)}
                          isPinned={data?.isPinned}
                          onTogglePin={()=>toggleQuestionPinStatus(data._id)}
                        />
                      

                      {!isLoading && 
                        sessionData?.questions?.length== index+1 &&(
                          <div className='flex items-center justify-center mt-5'>
                            <button 
                              className='flex items-center gap-3 text-sm text-white font-medium bg-balck px-5 py-2 mr-2 rounded text-nowrap cursor-pointer'
                              disabled={isLoading || isUpdateLoader}
                              onClick={uploadMoreQuestions}>
                                {isUpdateLoader ? (
                                  <SpinnerLoader/>
                                ):(
                                  <LuListCollapse className='text-lg'/>
                                )}{""}
                                  Load More
                              </button>
                          </div>
                        )
                        }
                        </>
                    </motion.div>
                );
              })}
            </AnimatePresence>
          </div>

          <div>
            <Drawer
              isOpen={openLeanMoreDrawer}
              onClose={()=> setOpenLearnDrawer(false)}
              title={!isLoading && explanation?.title}
            >
              {errorMsg && (
                <p className='flex gap-2 text-sm text-amber-600 font-medium'>
                  <LuCircleAlert className='mt-1'/>{errorMsg}
                </p>
              )}
              {isLoading && <SkeletonLoader/>}
              {!isLoading && explanation &&(
                <AIResponsePreview content={explanation?.explanation}/>
              )}
            </Drawer>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}

export default InterviewPrep
