import React from 'react';
import avatar from "../asset/avtar.png";
import { FaEdit } from "react-icons/fa";
import { useNavigate } from 'react-router-dom'

export default function MainProfile(props) {
    const navigate = useNavigate('');


    return (
        <div className='relative bg-[#C0FCF8] shadow-md pb-5 flex flex-col w-[100%] bordered rounded-2xl p-1 h-[full]' style={{ minHeight: '200px' }}>
            <div className='relative flex items-center justify-around'>
                <div className=''>
                    <img src={props.picture} alt="profileimage"
                        className='lg:h-[90px] lg:w-[88px] md:h-[70px] md:w-[68px] h-[50px] w-[48px]'
                        style={{ borderRadius: '100%' }}
                    />

                </div>
                <div className='relative font-normal md:text-xl  items-center md:p-4 p-2 justify-between leading-none flex flex-col text-black gap-3 py-3'>
                    <h2 className='z-10 font-bold lg:text-[35.93px] md:text-[25.93px] text-[16px]'>{props.name}</h2>
                    <div className=' w-337 h-45 font-normal text-base leading-none flex items-center justify-center text-center text-black relative'>
                        <h2 className='relative z-10 w-[80%] lg:text-[20.93px] md:text-[15.93px] text-[10px] lg:2-[500px] md:w-[400px] w-[200px]' style={{ marginTop: '10%', maxWidth: '500px' }}>{props.aspirations}</h2>
                    </div>
                    {/* <div className='flex md:flex-row md:items-start gap-1 flex-col items-center'>
                        <button className='relative  h-[30px]  flex flex-col justify-center items-center md:p-3 p-2  bg-[#EEEEEE] rounded-full font-inter font-medium text-[15px] text-black'>Student</button>
                        <button className='relative  h-[30px] flex flex-col justify-center items-center md:p-3 p-2 bg-[#EEEEEE] rounded-full font-inter font-medium text-[15px] text-black'>Developer</button>
                    </div> */}
                </div>

                <div className='mt-10'>
                    {props.edit === true ?
                        <FaEdit size={30} onClick={() => navigate('/bioedit')} className='lg:h-[30.93px] md:h-[19.93px] h-[16px]' />
                        : <></>
                    }

                </div>
            </div>
            <div className='font-normal text-xl leading-none flex text-black relative px-5 items-center gap-5 py-3'>
                <div className='flex flex-row items-start gap-3'>
                    <br />
                    <br />
                </div >
                <div className='flex flex-col items-start gap-3'>
                    <h5 className='z-10 font-normal lg:text-[29.93px] md:text-[18.93px] text-[15px]'>Summary</h5>
                    <div className='font-noto-serif font-normal lg:text-[15.93px] md:text-[10.93px] text-[11px] text-black' style={{ width: '80%', lineHeight: '20px' }}>{props.bio}</div>
                </div>
            </div>
        </div>
    )
}
