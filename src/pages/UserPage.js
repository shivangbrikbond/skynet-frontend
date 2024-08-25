import React, { useEffect } from 'react'
import YourJobs from '../component/YourJobs'
import Suggestions from '../component/Suggestions';
import Post from '../component/Post';
import { RiPencilFill } from "react-icons/ri";
import EducationCardsSection from '../component/EducationCardsSection'
import ExperienceCardsSection from '../component/ExperienceCardsSection';
import TimeLineCardsSection from '../component/TimeLineCardsSection'
import MainProfile from '../component/MainProfile';
import { useDispatch, useSelector } from 'react-redux'
import { fetchUser, ViewUser } from '../slicer/profileSlice'
import AboutMe from '../component/AboutMe';
import { useParams } from 'react-router-dom';

function UserPage() {
    const dispatch = useDispatch();

    const { id } = useParams();


    const user = useSelector((state) => state.profile.user)

    console.log(user)

    var follow = false;

    useEffect(() => {

        dispatch(ViewUser(id))
        follow = user.followers.length === 0 ? true : false
    }, [dispatch])

    return (
        <div className='relative  lg:px-9 px-4 flex flex-col py-3 justify-evenly gap-9'>
            <div className='relative py-9 grid grid-cols-3 px-3 gap-2 justify-evenly'>
                <div className='relative flex flex-col gap-3 col-span-3 md:col-span-2'>
                    <div className='relative flex flex-col gap-24 '>
                        <MainProfile name={user.name} aspirations={user.aspirations} bio={user.bio} picture={user.profilePic} edit={false} userId={user.userId} follow={follow} />
                        <AboutMe skills_display='hidden' aboutJobTitle={user.aboutJobTitle} aboutYou={user.aboutYou} city={user.city} comapnyId={user.comapnyId} email={user.email} experience={user.experience} githubURL={user.githubURL} jobTitle={user.jobTitle} linkedInURL={user.linkedInURL} phoneCode={user.phoneCode} phone={user.phone} purpose={user.purpose} edit={false} />
                        <EducationCardsSection Title='Education' skills_display='hidden' edit={false} userid={id} PURPOSE={'STUDENT'} />
                        <EducationCardsSection Title='Experience' skills_display='hidden' edit={false} userid={id} PURPOSE={'FREELANCER'} />
                        <TimeLineCardsSection Title='Time Line' cards_bg='' edit_display='hidden' time_display='flex' add_display='hidden' skills_display='hidden' duration_display='hidden' font_weight='font-normal' line_color='bg-[#000000]' edit={false} userId={id} />
                    </div>
                </div>
            </div>
            <div className='relative flex flex-col gap-1'>
                <div className='relative py-3 flex items-center  px-3'>
                    <h1 className='font-david-libre font-normal text-[40.7347px] leading-[41px] flex-grow text-center'>
                        My Posts
                    </h1>
                    {/* <RiPencilFill size={49} /> */}
                </div>
                <div className='relative py-3 gap-4 grid md:grid-cols-2 grid-cols-1 justify-evenly'>
                    {/* <Post width='w-[45vw]' />
                    <Post width='w-[45vw]' /> */}
                </div>
                <div className='relative py-3 flex flex-rows justify-end'>
                    <h3 href='#' className='px-7 relative h-18 font-inter font-normal text-[23.296px] leading-[23px] flex items-center text-[#7E7C7C]'>View all posts</h3>
                </div>
                <div className='relative flex flex-col gap-9 justify-between items-center mt-1'>

                </div>
            </div>
        </div>
    )
}

export default UserPage