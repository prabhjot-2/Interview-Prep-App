import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Input from '../../components/Input/Input';
import ProfilePhotoSelector from '../../components/Input/ProfilePhotoSelector';

const SignUp = ({setCurrentPage}) => {
  const[profilePic,setProfilePic]=useState(null);
  const [fullName,setFullName]=useState("");
  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");
  const [error,setError]=useState("");

  const navigate=useNavigate();
  // handle signup form submit
  const handleSignUp=async(e)=>{
    e.preventDefault();
  }
  return <div className='w-[90vw] md:w-[33vw] p-7 flex flex-col justify-center'>
    <h3 className='text-lg font-semibold text-black '> Create an Account</h3>
    <p className='text-xs text-slate-700 mt-[5px] mb-6 '>
      Join us Today by entering your details below
    </p>

    <form onSubmit={handleSignUp}>

      <ProfilePhotoSelector image={profilePic} setImage={setProfilePic}/>

      <div className='grid grid-cols-1 md:grid-cols-1 gap-2 '>
        <Input 
          value={fullName}
          onChange={({target})=>setFullName(target.value)}
          label="Full Name"
          placeholder="John"
          type="text"
          />
        <Input
          value={email}
          onChange={({target})=>setEmail(target.value)}
          label="Email"
          placeholder="john@example.com"
          type="text"
          />
        <Input
          value={password}
          onChange={({target})=>setPassword(target.value)}
          label="Password"
          placeholder="Min 8 Characters"
          type="password"
          />
      </div>

      {error && <p className='text-red-500 text-xs pb-2.5'>{error}</p>}

      <button type='submit' className='btn-primary'>
        SignUp
      </button>

      <p className='text-[13px] text-slate-800 mt-3 '>
        Already an Account?{""}
        <button
          className='font-medium text-primary underline cursor-pointer'
          onClick={()=>{
            setCurrentPage("login");
          }}
          >
            Login
          </button>
      </p>
    </form>
  </div>
}

export default SignUp
