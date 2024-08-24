import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { CreatTimeLine } from '../slicer/profileSlice';
import { useNavigate } from 'react-router-dom';

function AddTimeline() {
    const dispatch = useDispatch();
    const navigate = useNavigate('');
    const userId = localStorage.getItem('skyn_userId')


    const status = useSelector((state) => state.profile.status)



    const [formData, setFormData] = useState({
        userId: userId,
        startDate: '',
        endDate: '',
        title: '',
        desc: '',
    });



    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleCancel = () => {
        navigate('/profile')
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        dispatch(CreatTimeLine(formData))


        navigate('/profile')

    }





    return (
        <div>
            <div className='ed-container'>
                <form class="ed-form" onSubmit={handleSubmit}>
                    <p class="ed-title">Add Timeline</p>
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
                        <input required="" placeholder="" type="text" class="ed-input" name="desc"
                            value={formData.desc}
                            onChange={handleChange}
                        />
                        <span>description</span>
                    </label>
                    <button type="submit" class="ed-submit bg-blue-600">Submit</button>
                    <button class="ed-cancel bg-red-600" onClick={handleCancel}>Cancel</button>
                    <p class="ed-signin"><a href="#"></a> </p>
                </form>
            </div>
        </div>
    )
}

export default AddTimeline