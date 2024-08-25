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
  const status = useSelector((state) => state.profile.update_status)

  // Fetch user data on mount and initialize form fields
  useEffect(() => {
    dispatch(fetchUser());

  }, [dispatch]);

  useEffect(() => {
    if (status === 'succeeded') {
      navigate('/profile')
    }
  })

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
      city,
      jobTitle,
      linkedInURL,
      purpose,
      experience,
      aboutJobTitle
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
          <select
            name='purpose'
            value={purpose}
            onChange={(e) => setPurpose(e.target.value)}
          >
            <option value="" disabled>
              Choose Occupation
            </option>
            <option value="STUDENT">Student</option>
            <option value="ENTREPRENEUR">Entrepreneur</option>
            <option value="BUSINESS">Business</option>
            <option value="SERVICE_PROVIDER">Service Provider</option>
            <option value="FREELANCER">Freelancer</option>
            <option value="EMPLOYEE">Employee</option>
            <option value="RECRUITER">Recruiter</option>
            <option value="INVESTOR">Investor</option>
            <option value="NETWORK">Network</option>
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
          <div className='flex flex-row items-center gap-10'>
            <button type='submit'>Save</button>
            <button
              className='my-3 bg-red-500'
              type='button'
              onClick={() => navigate('/profile')}
            >
              Cancel
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}

export default EditMe;
