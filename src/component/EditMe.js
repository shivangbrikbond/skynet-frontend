import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchUser, updateUser } from '../slicer/profileSlice';
import { useNavigate } from 'react-router-dom';

function EditMe() {
  // State hooks
  const [githubURL, setGithubURL] = useState('');
  const [companyId, setCompanyId] = useState('');
  const [purpose, setPurpose] = useState('');
  const [city, setCity] = useState('');
  const [jobTitle, setJobTitle] = useState('');
  const [aboutJobTitle, setAboutJobTitle] = useState('');
  const [linkedInURL, setLinkedInURL] = useState('');
  const [experience, setExperience] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userdata = useSelector((state) => state.profile.profile);

  // Fetch user data on mount and initialize form fields
  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);

  useEffect(() => {
    if (userdata) {
      setGithubURL(userdata.githubURL || '');
      setCompanyId(userdata.companyId || '');
      setPurpose(userdata.purpose || '');
      setCity(userdata.city || '');
      setJobTitle(userdata.jobTitle || '');
      setAboutJobTitle(userdata.aboutJobTitle || '');
      setLinkedInURL(userdata.linkedInURL || '');
      setExperience(userdata.experience || '');
    }
  }, [userdata]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = {
      userId: localStorage.getItem('skyn_userId'),
      githubURL,
      companyId,
      purpose,
      city,
      jobTitle,
      aboutJobTitle,
      linkedInURL,
      experience,
    };
    dispatch(updateUser(formData));
  };

  return (
    <div className='flex justify-center items-center'>
      <div className='register'>
        <form onSubmit={handleSubmit}>
          <h1 className='register-heading'>Bio Edit</h1>
          <input
            type='text'
            name='githubURL'
            value={githubURL}
            onChange={(e) => setGithubURL(e.target.value)}
            placeholder='Enter your GitHub URL'
          />
          <input
            type='email'
            name='email'
            placeholder='Enter your email'
            value={userdata.email}
            readOnly
          />
          <input
            type='text'
            name='companyId'
            value={companyId}
            onChange={(e) => setCompanyId(e.target.value)}
            placeholder='Enter your company ID'
          />
          <select
            name='purpose'
            value={purpose}
            onChange={(e) => setPurpose(e.target.value)}
          >
            <option value='' disabled>
              Select your purpose
            </option>
            <option value='Student'>Student</option>
            <option value='Teacher'>Teacher</option>
            <option value='Engineer'>FREELANCER</option>
            <option value='Other'>Other</option>
          </select>
          <input
            type='text'
            name='city'
            placeholder='Enter your city'
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
          <input
            type='text'
            name='jobTitle'
            placeholder='Enter your job title'
            value={jobTitle}
            onChange={(e) => setJobTitle(e.target.value)}
          />
          <input
            type='text'
            name='aboutJobTitle'
            placeholder='Enter about your job title'
            value={aboutJobTitle}
            onChange={(e) => setAboutJobTitle(e.target.value)}
          />
          <input
            type='text'
            name='linkedInURL'
            placeholder='Enter your LinkedIn URL'
            value={linkedInURL}
            onChange={(e) => setLinkedInURL(e.target.value)}
          />
          <input
            type='number'
            name='experience'
            placeholder='Enter your experience'
            value={experience}
            onChange={(e) => setExperience(e.target.value)}
          />

          <button type='submit'>Save</button>
          <button
            className='my-3 bg-red-500'
            type='button'
            onClick={() => navigate('/profile')}
          >
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
}

export default EditMe;
