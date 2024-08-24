import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import avatar from '../asset/avtar.png';
import SuggestionSection from '../component/SuggestionSection'
import { useSelector, useDispatch } from 'react-redux';
import { fetchView } from '../slicer/profileViewSlice';

const YourJobs = ({ Title = 'People Viewd Your Profile', link }) => {
  const dispatch = useDispatch();

  const viewdata = useSelector((state) => state.profileview.views)


  useEffect(() => {
    dispatch(fetchView())
  }, [])

  return (
    <div className='z-50'>
      <div className='h-[100%] pb-5 bg-[#FFEBA6] w-[100%] rounded-md shadow-md z-50'>
        <Link to={link}>
          <h2 className='pb-9 py-12 mx-20 font-bold'>{Title}</h2></Link>

        <div className='flex flex-col gap-y-9 justify-center  px-2'>

          {
            Object.values(viewdata).slice(0, 5).map((view) => {
              console.log("view start")
              console.log(view)
              console.log("view end")

              return (
                <SuggestionSection profileImage={view.user['profilePic']} Name={view.user['name']} Post={view.user['aspirations']} purpose={view.user['purpose']} />
              )
            })
          }
        </div>

      </div>
    </div>

  )
}

export default YourJobs
