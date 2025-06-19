import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Input from "../../components/Input/Input"

const CreateSessionForm = () => {
    const [formData,setFormData]=useState({
        role:"",
        experience:"",
        topicsToFocus:"",
        description:"",
    });
    const [isLoading,setLoading]=useState(false);
    const [error,setError]=useState(null);

    const navigate=useNavigate();

    const handleChnage=(key,value)=>{
        setFormData((prevData)=>({
            ...prevData,
            [key]:value,
        }));
    };
    const handleCreateSession=async(e)=>{
        e.preventDefault();
        const {role,experience, topicsToFocus}=formData;

        if(!role || !experience||!topicsToFocus){
            setError("please fill all the required fields");
            return;
        }
        setError("");

    }
  return (
    <div>
      
    </div>
  )
}

export default CreateSessionForm
