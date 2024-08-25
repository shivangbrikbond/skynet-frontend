import React from 'react';
import avatar from "../asset/avtar.png";
import { Link, useLocation } from 'react-router-dom';

const Explore = ({ activeButton, setActiveButton }) => {
    const handleButtonClick = (buttonName) => {
        if (activeButton === buttonName) setActiveButton('')
        else setActiveButton(buttonName);
    };
    const location = useLocation()
    return (
        <div className='h-[420px] max-md:hidden pb-3 relative w-[100%] bg-[#95DB9C] shadow-md rounded-lg mt-5' style={{ borderColor: "black", maxWidth: '330' + 'px' }}>

            <h2 className='mx-10  font-bold text-base leading-normal flex items-center justify-center text-black' style={{ paddingTop: "30" + "px", paddingBottom: "10px" }}>Explore</h2>
            <div className='flex flex-col justify-start mx-10'>
                <Link to='/search' className={`${activeButton === 'NETWORK' && location.pathname == '/search' ? 'bg-white' : 'bg-[#95DB9C]'} rounded-xl hover:scale-110 hover:bg-[#F5F5F5]`}><button className='flex flex-row h-[48px] overflow-hidden rounded-xl items-center pl-3' onClick={() => handleButtonClick('NETWORK')}>
                    <h3 className="relative  group">Network</h3>
                </button></Link>
                <Link to='/search' className={`${activeButton === 'STUDENT' && location.pathname == '/search' ? 'bg-white' : 'bg-[#95DB9C]'} rounded-xl hover:scale-110 hover:bg-[#F5F5F5]`}><button className='flex flex-row overflow-hidden  h-[48px] rounded-xl items-center pl-3' onClick={() => handleButtonClick('STUDENT')}>

                    <h3>Student</h3>
                </button></Link>
                <Link to='/search' className={`${activeButton === 'BUSINESS' && location.pathname == '/search' ? 'bg-white' : 'bg-[#95DB9C]'} rounded-xl hover:scale-110 hover:bg-[#F5F5F5]`}><button className='flex flex-row h-[48px] overflow-hidden  rounded-xl items-center pl-3' onClick={() => handleButtonClick('BUSINESS')}>

                    <h3>Tech Startups</h3>
                </button></Link>
                <Link to='/search' className={`${activeButton === 'FREELANCER' && location.pathname == '/search' ? 'bg-white' : 'bg-[#95DB9C]'} rounded-xl hover:scale-110 hover:bg-[#F5F5F5]`}><button className='flex flex-row overflow-hidden  h-[48px] rounded-xl items-center pl-3' onClick={() => handleButtonClick('FREELANCER')}>

                    <h3>FreeLancers</h3>
                </button></Link>
                <Link to='/search' className={`${activeButton === 'SERVICE_PROVIDER' && location.pathname == '/search' ? 'bg-white' : 'bg-[#95DB9C]'} rounded-xl hover:scale-110 hover:bg-[#F5F5F5]`}><button className='flex flex-row overflow-hidden  h-[48px] rounded-xl items-center pl-3' onClick={() => handleButtonClick('SERVICE_PROVIDER')}>
                    <h3>Service Providers</h3>
                </button></Link>
                <Link to='/search' className={`${activeButton === 'RECRUITER' && location.pathname == '/search' ? 'bg-white' : 'bg-[#95DB9C]'} rounded-xl hover:scale-110 hover:bg-[#F5F5F5]`}><button className='flex flex-row overflow-hidden  h-[48px] rounded-xl items-center pl-3' onClick={() => handleButtonClick('RECRUITER')}>
                    <h3>Recruiter</h3>
                </button></Link>
                <Link to='/search' className={`${activeButton === 'INVESTOR' && location.pathname == '/search' ? 'bg-white' : 'bg-[#95DB9C]'} rounded-xl hover:scale-110 hover:bg-[#F5F5F5]`}><button className='flex flex-row overflow-hidden  h-[48px] rounded-xl items-center pl-3' onClick={() => handleButtonClick('INVESTOR')}>
                    <h3>Investor</h3>
                </button></Link>
            </div>
        </div>
    )
}

export default Explore