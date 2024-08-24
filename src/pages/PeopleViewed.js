import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { fetchView } from '../slicer/profileViewSlice'
import { useNavigate } from 'react-router-dom';
import avatar from "../asset/avtar.png";

function PeopleViewed() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const views = useSelector((state) => state.profileview.views)

  console.log(views)

  useEffect(() => {
    dispatch(fetchView())
  }, [dispatch])


  return (
    <div>
      <div className='relative py-3 flex flex-row gap-4 px-10 justify-around'>
        <div className='relative flex flex-col gap-3 justify-start items-center'>

          <div className='relative w-[100%]  h-[786px] my-5'>
            <div className='flex flex-row justify-start items-start flex-wrap md:mx-10 mx-2 p-10  gap-10'>
              {
                Object.values(views).map((data) => {
                  return (
                    <div className='w-60 h-auto bg-[#EDEDED40] shadow-md rounded-lg flex flex-col justify-start' onClick={() => navigate(`/user/${data.user['userId']}`)}>
                      <div className='py-6'>
                        <div className="flex items-center justify-center h-20 w-20 overflow-hidden rounded-full mx-auto">
                          <img className='object-cover' src={data.user['profilePic']} alt="User Avatar" />
                        </div>
                        <div className='text-center py-1'>
                          <p className='font-semibold text-lg'>{data.user['name']}</p>
                          <p className='font-light text-[12px]'>{data.user['purpose']}</p>
                        </div>

                        <div className='px-5 py-6'>
                          <p className='break-words text-[13px]'>{data.user['aspirations']}</p>
                        </div>
                      </div>
                      <div className='flex items-center justify-center pb-6'>
                        <button className='px-6 py-2 border border-sky-500 rounded-full text-sm'>Follow</button>
                      </div>
                    </div>
                  )
                })
              }
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}

export default PeopleViewed