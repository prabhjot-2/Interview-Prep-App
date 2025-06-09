import React, { useState } from "react";
import { APP_FEATURES } from "../utils/data";
import { useNavigate } from "react-router-dom";
import { LuSparkles } from "react-icons/lu";
import HERO_IMG from "../assets/hero-img.png";
import Login from "./Auth/Login";
import SignUp from "./Auth/SignUp";
import Modal from "../components/Modal";

const LandingPage = () => {
  const navigate = useNavigate();
  const [openAuthModal, setOpenAuthModal] = useState(false);
  const [currentPage, setCurrentPage] = useState("login");

  const handleCTA = () => {};

  return (
    <div>
      <div className="w-full min-h-full bg-[#fffcef]">
        <div className=" w-[500px] h-[500px] bg-amber-200/20 blur-[65px] absolute top-0 left-0" />

        <div className="container mx-auto px-4 pt-6 pb-[200px] relative z-10 ">
          {/* header */}
          <header className="flex justify-between items-center mb-16 ">
            <div className="text-xl text-black font-bold ">
              Interview Prep AI
            </div>
            <button
              className="bg-linear-to-r from-[#ff9324] to-[#e99a4b] text-sm font-semibold text-white px-7 py-2.5 rounded-full hover:bg-black hover:text-white border border-white transition-colors cursor-pointer "
              onClick={() => setOpenAuthModal(true)}
            >
              Login/SignUp
            </button>
          </header>

          {/* hero Content */}
          <div className="flex flex-col md:flex-row items-center">
            <div className="w-full md:w-1/2 pr-4 mb:8 md:mb-0">
              <div className="flex items-center justify-left mb-2">
                <div className=" flex items-center gap-2 text-[13px] text-amber-600 font-semibold bg-amber-100 px-3 py-1 rounded-full border border-amber-300">
                  <LuSparkles />
                  AI Powered
                </div>
              </div>

              <h1 className="text-5xl text0black font-medium mb-6 leading-tight">
                Ace Interview with <br />
                <span className="text-transparent bg-clip-text bg-[radial-gradient(circle,_#ff9324_0%,_#FCD760_100%)] bg-[length:200%_200%] animate-text-shine font-semibold ">
                  AI-Powered
                </span>
                {""}
                learning
              </h1>
            </div>

            <div className="w-full md:w-1/2 ">
              <p className="text-[17px] text-gray-900 mr-0 md:mr-20 mb-6 ">
                Get role-specific questions, expand answers when you need them,
                dive deeper into concepts , and organize everything your way.
                From preparatio to mastery - your ultimate interview toolkit is
                here
              </p>

              <button
                className="bg-black text-sm font-semibold text-white px-7 py-2.5 rounded-full hover:bg-yellow-100 hover:text-black border border-yellow-50 hover:border-yellow-300 transition-colors cursor-pointer "
                onClick={handleCTA}
              >
                Get Started
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full min-h-full relative z-10">
        <div>
          <section className="flex items-center justify-center -mt-36">
            <img
              src={HERO_IMG}
              alt="hero image"
              className="w-[80vw rounded-lg"
            />
          </section>
        </div>

        <div className="w-full min-h-full bg-[#fffcef] mt-10">
          <div className="container mx-auto px-4 pt-10 pb-20">
            <section className="mt-5">
              <h2 className="text-3xl font-semibold text-center mb-12 text-gray-900">
                Features That Make You Shine
              </h2>

              <div className="flex flex-col items-center gap-12">
                {/* First row: 3 cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-6xl">
                  {APP_FEATURES.slice(0, 3).map((feature) => (
                    <div
                      key={feature.id}
                      className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl border border-yellow-100 transition duration-300"
                    >
                      <h3 className="text-lg font-semibold mb-2 text-gray-800">
                        {feature.title}
                      </h3>
                      <p className="text-gray-600 text-sm leading-relaxed">
                        {feature.description}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Second row: 2 cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl">
                  {APP_FEATURES.slice(3).map((feature) => (
                    <div
                      key={feature.id}
                      className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl border border-yellow-100 transition duration-300"
                    >
                      <h3 className="text-lg font-semibold mb-2 text-gray-800">
                        {feature.title}
                      </h3>
                      <p className="text-gray-600 text-sm leading-relaxed">
                        {feature.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          </div>
        </div>

        <div className="text-sm bg-gray-50 text-secondary text-center p-5 mt-5">
          Made with ❤️ ... Happy coding
        </div>
      </div>

      <Modal
        isOpen={openAuthModal}
        onClose={()=>{
            setOpenAuthModal(false);
            setCurrentPage("login");
        }}
        hideHeader
      >
      <div>
        {currentPage==="login" && (<Login setCurrentPage={setCurrentPage}/>
        )}
        {currentPage==="signup" && (<SignUp setCurrentPage={setCurrentPage}/>
        )}
      </div>

      </Modal>
    </div>
  );
};

export default LandingPage;
