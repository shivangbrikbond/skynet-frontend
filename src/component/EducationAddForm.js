import React, { useState, useEffect } from 'react'
import './css/EducationAddForm.css'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { CreatHistory } from '../slicer/profileSlice'

function EducationAddForm(PURPOSE) {

  const dispatch = useDispatch();
  const navigate = useNavigate('');
  const userId = localStorage.getItem('skyn_userId')

  const status = useSelector((state) => state.profile.status);
  const error = useSelector((state) => state.profile.error);

  const [formData, setFormData] = useState({
    userId: userId,
    startDate: '',
    endDate: '',
    title: '',
    description: '',
    purpose: PURPOSE.PURPOSE,
  });

  /*useEffect(() => {
    if (status === 'succeeded') {
      navigate('/profile')
    }
  }, [status, navigate])
  */
  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(value);
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(CreatHistory(formData))
    if (status === 'succeeded') {
      navigate('/profile')
    }
    console.log(formData);
  };

  const handleCancel = () => {
    setFormData({
      startDate: '',
      endDate: '',
      title: '',
      description: '',
      purpose: '',
    });

    navigate('/profile')
  };

  return (
    <div>
      <div className='ed-container'>
        <form class="ed-form" onSubmit={handleSubmit}>
          <p class="ed-title">Add Education</p>
          <p class="ed-message"></p>
          <div class="flex">
            <label className=''>
              <input required="" placeholder="" type="date" class="ed-input " name="startDate"
                value={formData.startDate}
                onChange={handleChange}
              />
              <span>startDate</span>
            </label>

            <label>
              <input required="" placeholder="" type="date" class="ed-input" name="endDate"
                value={formData.endDate}
                onChange={handleChange}
              />
              <span>endDate</span>
            </label>
          </div>

          <label>
            <input required="" placeholder="" type="text" class="ed-input" name="title"
              value={formData.title}
              onChange={handleChange}
            />
            <span>title</span>
          </label>

          <label>
            <input required="" placeholder="" type="text" class="ed-input" name="description"
              value={formData.description}
              onChange={handleChange}
            />
            <span>description</span>
          </label>
          {/* <label>
            <input required="" placeholder="" type="text" class="ed-input" name="purpose"
              value={formData.purpose}
              onChange={handleChange} />
            <span>purpose</span>
          </label> */}
          <button type="submit" class="ed-submit bg-blue-600">Submit</button>
          <button class="ed-cancel bg-red-600" onClick={handleCancel}>Cancel</button>
          <p class="ed-signin"><a href="#"></a> </p>
        </form>
        {status === 'loading' && <p>Loading...</p>}
        {status === 'failed' && <p style={{ color: 'red' }}>{error ? error.message : 'Unable to create histroy'}</p>}
      </div>
    </div>
  )
}

export default EducationAddForm