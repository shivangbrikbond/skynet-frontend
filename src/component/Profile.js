import React, { useEffect } from 'react';
import avatar from "../asset/avtar.png";
import backimg from "../asset/backimg.jpg";
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'
import { fetchUser } from '../slicer/profileSlice'

export default function Profile() {
  const dispatch = useDispatch();

  const profile = useSelector((state) => state.profile.profile);



  useEffect(() => {
    dispatch(fetchUser())
  }, [dispatch])

  return (
    <Link to='/profile'>
      <div className='h-[337px] relative w-[100%] bg-[#7EB2FF] rounded-md shadow-md pb-5'>

        <div className='relative flex flex-row justify-center'>
          {/* <img src={backimg} alt="backgroundimage" width="100%" height="50px" className='h-[100px] mx-auto absolute' /> */}
          <div className='w-[120px] h-[120px] ' style={{ marginTop: '40px', position: 'relative', overflow: 'hidden', borderRadius: '50%' }}>
            <img src={profile.profilePic ? profile.profilePic : ''} alt="profileimage"
              style={{ display: 'inline', margin: 'auto', height: 'auto', width: '100%' }} />
          </div>



        </div>

        <div className='font-normal text-xl leading-none flex items-center justify-center text-center text-black relative'>
          <h2 className='absolute 
          top-[20px] z-10'>
            {profile.name}</h2>
        </div>

        <div className='w-337 h-45 font-normal text-base leading-none flex items-center justify-center text-center text-black relative'>
          <h2 className='absolute top-[60px] z-10 px-5'>{profile.aspirations}</h2>
        </div>

      </div></Link>
  )
}
