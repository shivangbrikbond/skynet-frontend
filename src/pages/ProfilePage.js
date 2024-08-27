import React, { useEffect, useState, useRef } from 'react';
import YourJobs from '../component/YourJobs'
import Suggestions from '../component/Suggestions';
import Post from '../component/Post';
import { RiPencilFill, RiArrowRightWideFill, RiArrowLeftWideFill } from "react-icons/ri";
import EducationCardsSection from '../component/EducationCardsSection'
import ExperienceCardsSection from '../component/ExperienceCardsSection';
import TimeLineCardsSection from '../component/TimeLineCardsSection'
import MainProfile from '../component/MainProfile';
import { useDispatch, useSelector } from 'react-redux'
import { fetchUser } from '../slicer/profileSlice'
import AboutMe from '../component/AboutMe';
import '../component/css/scrollbar.css'

export default function ProfilePage() {
    const dispatch = useDispatch();

    const profile = useSelector((state) => state.profile.profile);

    const scrollContainerRef = useRef(null);

    useEffect(() => {
        dispatch(fetchUser())
        console.log("this is user", profile);
    }, [dispatch])

    function scrollRight() {
        if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollBy({ left: 395, behavior: "smooth" });
        }
    }

    const scrollLeft = () => {
        if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollBy({ left: -150, behavior: "smooth" });
        }
    };

    return (
        <div className='relative  lg:px-9 px-4 flex flex-col py-3 justify-evenly gap-9'>

            <div className='relative py-9 grid grid-cols-3 px-3 gap-2 justify-evenly'>
                <div className='relative flex flex-col gap-3 col-span-3 md:col-span-2'>
                    <div className='relative flex flex-col gap-24 '>
                        <MainProfile name={profile.name} aspirations={profile.aspirations} bio={profile.bio} picture={profile.profilePic} edit={true} />
                        <AboutMe skills_display='hidden' aboutJobTitle={profile.aboutJobTitle} aboutYou={profile.aboutYou} city={profile.city} comapnyId={profile.comapnyId} email={profile.email} experience={profile.experience} githubURL={profile.githubURL} jobTitle={profile.jobTitle} linkedInURL={profile.linkedInURL} phoneCode={profile.phoneCode} phone={profile.phone} purpose={profile.purpose} edit={true} />
                        <EducationCardsSection Title='Education' skills_display='hidden' edit={true} PURPOSE={'STUDENT'} userid={null} userId={profile.userId} />
                        <EducationCardsSection Title='Experience' skills_display='hidden' edit={true} PURPOSE={'FREELANCER'} userId={profile.userId} />
                        {/* <ExperienceCardsSection Title='Experience' /> */}
                        {/* <div className='relative flex flex-col gap-9 justify-between items-center mt-1'> */}
                        <TimeLineCardsSection Title='Time Line' cards_bg='' edit_display='hidden' time_display='flex' add_display='hidden' skills_display='hidden' duration_display='hidden' font_weight='font-normal' line_color='bg-[#000000]' userId={profile.userId} edit={true} />
                        {/* </div> */}
                    </div>
                </div>
                <div className='relative flex flex-col gap-9 col-span-3 md:px-10 md:col-span-1'>
                    <Suggestions Title='Grow your network' link="/grownetwork" />
                    <YourJobs link="/view" />
                </div>
            </div>
            <div className='relative flex flex-col gap-1'>
                <div className='relative py-3 flex items-center  px-3'>
                    <h1 className='font-david-libre font-normal text-[40.7347px] leading-[41px] flex-grow text-center'>
                        My Posts
                    </h1>
                </div>
                <div className="scroll-container">
                    <div className='scroll-arrow right'>
                        <button onClick={scrollRight}><RiArrowRightWideFill size={50} /></button></div>
                    <div className='scroll-content gap-10' ref={scrollContainerRef} >
                        {

                            profile?.post
                                ? <>
                                    {
                                        Object.values(profile.post).map((data) => {
                                            console.log(data.id)
                                            return (
                                                <Post user_name={profile['name']} posted_date={data.date} caption={data.caption} like_count={data._count['like']} comment_count={data._count['comment']} post_id={data.id} mediaLink={data.mediaLink} profilePic={profile.profilePic} landmark={data.landmark} like={data.like} />
                                            )
                                        })
                                    }
                                </>
                                : <></>
                        }
                    </div>
                    <div className='scroll-arrow left'>
                        <button onClick={scrollLeft}>{<RiArrowLeftWideFill size={50} />}</button></div>

                </div>


                {/* <Post width='w-[45vw]' />
                    <Post width='w-[45vw]' /> */}
                {/* <Post width='w-[45vw]' />
                    <Post width='w-[45vw]' /> */}
                {/* </div> */}
            </div>
        </div >
    )
}
