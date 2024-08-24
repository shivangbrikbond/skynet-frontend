import React from 'react';
import avatar from "../asset/avtar.png";
import { useNavigate } from 'react-router-dom';


const Newpost = () => {
    const navigate = useNavigate('');

    const picture = localStorage.getItem('profile_pic')

    return (
        <div className='relative bg-[#F8D99D] lg:w-[100%] md:w-[80%] w-[100%]  h-[101px] rounded-md shadow-md'
            style={{ marginTop: '3px' }}
        >
            <div className='absolute flex flex-row gap-5 px-4 w-[100%] justify-left top-[31px]'>
                <div className='w-[48px] h-[48px] ' style={{ position: 'relative', overflow: 'hidden', borderRadius: '50%' }}>
                    <img src={picture}
                        style={{ display: 'inline', margin: 'auto', height: 'auto', width: '100%' }}
                    /></div>
                <input type="text" placeholder='  Start a post' className='relative w-[70%] h-[48px] rounded-md' onClick={() => navigate('/addpost')} />
            </div>
        </div>
    )
}

export default Newpost
