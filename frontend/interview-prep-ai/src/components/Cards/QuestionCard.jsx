import React, { useEffect, useRef, useState } from 'react'
import { LuChevronDown, LuPin, LuPinOff, LuSparkles} from "react-icons/lu"

const QuestionCard = ({
    question,
    answer,
    onLearnMore,
    isPinned,
    onTogglePin,
}) => {

    const [isExpanded,setIsExpanned]=useState(false);
    const [height,setHeight]=useState(0);
    const contentRef=useRef(null);

    useEffect(()=>{
        if(isExpanded){
            const contentHeight=contentRef.current.scrollHeight;
            setHeight(contentHeight+10);
        }else{
            setHeight(0);
        }
    },[isExpanded]);

    const toggleExpand=()=>{
        setIsExpanned(!isExpanded);
    };
  return <>
    <div className=''>
        <div className=''>
            <div className=''>
                <span className=''>Q</span>

                <h3 className='' onClick={toggleExpand}>
                    {question}
                </h3>
            </div>

            <div className=''>
                <div className={`flex ${
                    isExpanded? "md:flex" :"md:hidden group-hover:flex"
                    }`} 
                >
                        <button 
                            className=''
                            onClick={onTogglePin}
                        >
                            {isPinned ?QuestionCard(<LuPinOff className=""/>)
                            :(<LuPin className=""/>)
                            }
                        </button>

                        <button
                            className=''
                            onClick={()=>{
                                setIsExpanned(true);
                                onLearnMore();
                            }}
                        >
                            <LuSparkles/>
                            <span className=''>Learn More</span>
                        </button>
                </div>

                    <button
                        className=''
                        onClick={toggleExpand}
                    >
                        <LuChevronDown
                            size={20}
                            className={`transform transition-transform duration-300 ${
                            isExpanded ?"rotate-180":""}`}
                        />
                    </button>
            </div>
        </div>
        
        <div className=''
        style={{maxHeight:`${height}px`}}
        >
            <div ref={contentRef}
            className=''
            >

            </div>
        </div>
    </div>
  </>
}

export default QuestionCard
