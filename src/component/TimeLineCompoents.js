import React from 'react';
import { RiPencilFill, RiDeleteBin4Fill } from "react-icons/ri";
import moment from 'moment';
import { useSelector, useDispatch } from 'react-redux'
import axios from 'axios';


export default function TimeLineCards({ cards_bg, line_color, duration_display, skills_display, edit_display, time_display, font_weight, startDate, endDate, skills, description, Time, title, id, edit }) {
    const start_date = moment(startDate).format('YYYY-MM-DD');
    const end_date = moment(endDate).format('YYYY-MM-DD');

    Time = start_date + " - " + end_date;
    const dispatch = useDispatch();


    const handledelete = async (id) => {
        const response = await axios.delete(`http://localhost:6898/api/v1/users/history/delete/${id}`, { withCredentials: true })
        console.log(response.data)
        window.location.reload();
    }



    return (
        // <div className='relative w-[90%]   flex flex-col gap-2' >
        //     <div className='flex flex-row  items-center gap-3 justfy-between'>
        //         <div class={`w-4 h-4 rounded-full bg-[#C6C5C5]`}></div>
        //         <div className={`flex flex-row w-[100%] bg-[#C6C5C5]  rounded-2xl`}>
        //             <div className='relative flex flex-col p-5 gap-3 w-[90%]'>
        //                 <h5 className={`flex-grow font-inter ${font_weight} lg:text-[26.208px] md:text-[24px] text-[21px] leading-[26px] flex items-center text-black backdrop-blur-3xl`}>
        //                     {title}
        //                 </h5>
        //                 <h3 className={`lg:text-[5px] md:text-[5px] text-[5px]  text-[#7E7C7C] ${duration_display}`}>{start_date} - {end_date}</h3>
        //                 <h3 className='font-noto-serif font-medium lg:text-[22px] md:text-[17.92px] text-[12px]   flex items-center text-black backdrop-blur-sm'>{description}</h3>
        //                 <h3 className={`font-noto-serif font-medium lg:text-[20px] md:text-[16.92px] text-[10px] ${skills_display} items-center text-black backdrop-blur-sm`}>{skills}</h3>
        //             </div>
        //             <div className='flex flex-col items-end w-[80%] p-5'>
        //                 <div className='flex'>
        //                     {edit === true ?
        //                         <><RiDeleteBin4Fill size={30} onClick={() => handledelete(id)} className={` ${edit_display}`} />
        //                             <RiPencilFill size={30} className={`${edit_display}`} /></>
        //                         : <></>
        //                     }
        //                 </div>
        //                 <h5 className={` flex-grow font-inter ${font_weight} md:text-[23px] text-[20px] leading-[26px] ${time_display} text-black backdrop-blur-3xl`}>
        //                     {Time}
        //                 </h5>
        //             </div>
        //         </div>
        //     </div>
        // </div >
        <li class="mb-15 lg:ml-10 md:ml-5 ml-5  w-[100%]">
            <div>
                <div class="absolute lg:h-7 lg:w-7 md:w-6 md:h-6 w-3 h-3  bg-gray-200 rounded-full -left-1.5 border border-white dark:border-gray-900 dark:bg-gray-700"></div>
                <div class="flex flex-row justify-between">
                    <time class="mb-1 lg:text-[15px] md:text-[12px] text-[9px] font-normal leading-none text-gray-400 dark:text-gray-500">{start_date} &nbsp; {end_date}</time>
                    <div className='flex flex-row gap-5' style={{ marginLeft: '10%' }}>{edit === true ?
                        <><RiDeleteBin4Fill size={30} onClick={() => handledelete(id)} className={` ${edit_display}`} />
                            <RiPencilFill size={30} className={`${edit_display}`} /></>
                        : <></>
                    }</div>
                </div>

                <h3 class="text-lg font-semibold lg:text-[25px] md:text-[20px] text-[15px] text-gray-900 dark:text-white">{title}</h3>
                <p class="mb-4 text-base font-normal text-gray-500 dark:text-gray-400">{description}</p>
                <br />
                <br />
                <br />



            </div>

            {/* <a href="#" class="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">Learn more <svg class="w-3 h-3 ml-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg></a> */}
        </li>
    );
}