import React from 'react';
import { Navigate, useNavigate } from 'react-router-dom';

const Suggestions = ({ profileImage, Name, Post, purpose, userId }) => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/user/${userId}`)
    }

    return (
        <button className='flex flex-row items-center gap-2 justify-start md:gap-4' style={{ marginLeft: "20" + "px" }} onClick={handleClick}>
            <div className='w-11 h-11 overflow-hidden flex justify-end rounded-full md:w-16 md:h-16'>
                <img src={profileImage} width={'100%'} height={'100%'} alt='profile' />
            </div>
            <div className='flex flex-col items-start' style={{ maxWidth: '200px' }}>
                <div className='flex flex-row gap-5 justify-between'>
                    <p >{Name} &nbsp; <span className='font-inter font-normal leading-normal md:text-[12px] lg:text-[12px] text-[10px] text-black'>{purpose}</span></p>
                </div>
                <p className=' text-[10px] flex flex-row gap-2 justify-between' style={{ width: 'fit-content', marginLeft: '0px' }}>{Post}</p>
            </div>
        </button>
    )
}

export default Suggestions
