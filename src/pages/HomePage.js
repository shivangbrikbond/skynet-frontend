import React, { useEffect } from 'react';
import Profile from '../component/Profile';
import Explore from '../component/Explore';
import Newpost from '../component/Newpost';
import Post from '../component/Post';
import Suggestions from '../component/Suggestions';
import { useOutletContext } from 'react-router-dom';
import HomeBackground from '../asset/HomeBackground.png'
import { useSelector, useDispatch } from 'react-redux'
import { fetchPosts } from '../slicer/postSlicer'
import YourJobs from '../component/YourJobs';

export default function Homepage() {

  const { activeButton, setActiveButton } = useOutletContext();

  const dispatch = useDispatch();

  const status = useSelector((state) => state.auth.status);
  const error = useSelector((state) => state.auth.error);
  const posts = useSelector((state) => state.post.posts);

  console.log(posts)

  useEffect(() => {
    dispatch(fetchPosts())
    console.log(posts)
  }, [dispatch])

  return (
    <div className='py-3 grid lg:grid-cols-11 md:grid-cols-3 grid-cols-5 gap-10 items-start justify-evenly p-2 lg:px-10'
      style={{ marginTop: "1%" }}
    >
      {/* <img src={HomeBackground} alt="backgroundimage" width="100%" height="100%" className='absolute z-0 w-[100vw] h-[100vh] mx-auto'/> */}
      <div className='hidden md:block flex flex-col gap-2 z-50 w-[90%] lg:col-span-3 md:col-span-3 col-span-2'

      >
        <Profile />
        <Explore
          activeButton={activeButton}
          setActiveButton={setActiveButton}
        />
        <div className='z-50 md:hidden'>
          <Suggestions link="/recommendation" />
        </div>
      </div>

      <div className='flex flex-col gap-2 items-center z-50 md:col-span-2 col-span-10 lg:col-span-5' >
        <Newpost />
        {/* <div className='w-[50vw] h-[1px] bg-slate-500 my-5 z-50'></div> */}

        {
          Object.values(posts).map((data) => {
            console.log(data.id)
            return (
              <Post user_name={data.user['name']} posted_date={data.user['date']} caption={data.caption} like_count={data._count['like']} comment_count={data._count['comment']} post_id={data.id} mediaLink={data.mediaLink} like={data.like} />
            )
          })
        }
      </div>

      <div className='z-10 w-[104%] max-md:hidden col-span-3'
        style={{ maxWidth: "390px" }}
      >
        <Suggestions link="/grownetwork" />
        <div className='pt-5'>
          {/* <YourJobs link="/grownetwork" /> */}
        </div>
      </div>

    </div>
  )
}