import React, { useEffect } from 'react';
import avatar from '../asset/avtar.png';
import { useSelector, useDispatch } from 'react-redux';
import { featchSuggestion } from '../slicer/SuggestionSlicer';
import { useNavigate } from 'react-router-dom';


export default function Homepage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const suggestion = useSelector((state) => state.suggestion.suggestions)

  // const 


  useEffect(() => {
    dispatch(featchSuggestion());
  }, [dispatch])

  return (
    <div className='relative py-9 flex flex-row gap-4 px-10 justify-around'>
      <div className='relative w-[100%]  h-[786px] my-5'>
        <div className='flex flex-row justify-start items-center flex-wrap md:mx-10 mx-2 p-10  gap-10'>
          {
            Object.values(suggestion).map((data) => {
              return (
                <div className='w-60 h-auto bg-[#EDEDED40] shadow-md rounded-lg flex flex-col justify-between' onClick={() => navigate(`/user/${data.userId}`)}>
                  <div className='py-6'>
                    <div className="flex items-center justify-center h-20 w-20 overflow-hidden rounded-full mx-auto">
                      <img className='object-cover' src={data.profilePic} alt="User Avatar" />
                    </div>
                    <div className='text-center py-1'>
                      <p className='font-semibold text-lg'>{data.name}</p>
                      <p className='font-light text-[11px]'>{data.purpose}</p>
                    </div>

                    <div className='px-5 py-6'>
                      <p className='break-words text-[12px]'>{data.aspirations}</p>
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
  )
}
