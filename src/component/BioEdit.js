import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { fetchUser, updateInfo, updateUser } from '../slicer/profileSlice';
import { useEffect } from 'react';
import axios from 'axios';
import AWS from 'aws-sdk';
import { useNavigate } from 'react-router-dom';

function BioEdit() {

  const [summary, setSummary] = useState('')
  const [aspirations, setAspirations] = useState('')
  const [profilePic, setProfilePic] = useState('')
  const [file, setFile] = useState('')

  const userdata = useSelector((state) => state.profile.profile);
  const status = useSelector((state) => state.auth.status);
  const navigate = useNavigate()

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);

  useEffect(() => {
    if (userdata) {
      setSummary(userdata.bio || '');
      setAspirations(userdata.aspirations || '');
      setProfilePic(userdata.profilePic || '')
    }
    console.log(userdata)
  }, [userdata]);

  const handleSubmit = async (e) => {
    e.preventDefault()

    const S3_BUCKET = "skynect";

    // S3 Region
    const REGION = "eu-north-1";

    // S3 Credentials
    AWS.config.update({
      accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY,
      secretAccessKey: process.env.REACT_APP_AWS_SECRET_KEY,
    });
    const s3 = new AWS.S3({
      params: { Bucket: S3_BUCKET },
      region: REGION,
    });

    // Files Parameters

    const params = {
      Bucket: S3_BUCKET,
      Key: Math.floor(Math.random() * 1000000000) + file.name,
      Body: file,
    };

    try {
      var upload = await s3.putObject(params).promise();
      const data = {
        userId: localStorage.getItem('skyn_userId'),
        bio: summary,
        aspirations: aspirations,
        profilePic: `https://skynect.s3.amazonaws.com/${params.Key}`
      }
      console.log(data);
      alert("File uploaded successfully.");
      dispatch(updateInfo(data))
      if (status === 'succeeded') {
        localStorage.setItem('profile_pic', `https://skynect.s3.amazonaws.com/${params.Key}`)
        navigate('/profile')
      }

    } catch (error) {
      console.error(error);
      // setUploading(false)
      alert("Error uploading file: " + error.message); // Inform user about the error
    }
  }

  const handlePictureChange = (e) => {
    // e.preventDefault()
    const image = e.target.files[0];
    if (image) {
      // Create a URL for the selected image file
      const imageUrl = URL.createObjectURL(image);
      // Update the state with the new image URL
      setProfilePic(imageUrl);
    }
    setFile(image)
  }

  const handleCancel = () => {
    navigate('/profile')
  }

  return (
    <div className='flex justify-center items-center w-[100%]' style={{ margin: '0% auto auto auto' }}>
      <div className="register w-[100%]" style={{
        maxWidth: '650px'
      }}>
        <form className='w-[100%]'>
          <h5 className='register-heading lg:text-[25px] md:text-[20px] text-[18px] lg:w-[219px] md:w-[200px] w-[190px]' style={{ minWidth: '219px' }}> Edit Profile :</h5>
          <br />
          <img src={profilePic} style={{ borderColor: 'grey', borderWidth: '2px' }}></img>
          <input className='h-[58px]' placeholder='Choose Photo' type="file" onChange={handlePictureChange} />
          <br />
          <label for='aspiration' className='text-[30px]'>Tagline :
            <textarea
              type="text"
              name="aspiration"
              value={aspirations}
              className='lg:w-[500px] md:w-[400px] w-[320px]'
              onChange={(e) => setAspirations(e.target.value)}
              // placeholder="Enter Your Tagline"
              style={{
                maxWidth: '500px'
              }}
            />
          </label>
          <label for='summary' className='text-[30px]'>Summary :
            <textarea
              type="text"
              name="summary"
              // placeholder="Enter Your Summary"
              className='lg:w-[500px] md:w-[400px] w-[320px]'
              style={{ height: '100px', maxWidth: '500px' }}
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
            /></label>
          {/* <input
            type="password"
            name="conformpassword"
            placeholder="Enter "
            required
          /> */}
          <br />
          <div className='flex flex-row justify-evenly gap-10'>
            <button type="submit" onClick={handleSubmit}>Submit</button>
            <button type="cancel" onClick={handleCancel}>Cancel</button>
          </div>
        </form>

      </div>
    </div>
  )
}

export default BioEdit