import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { createPost } from '../slicer/postSlicer';
import { useNavigate } from 'react-router-dom'
import AWS from 'aws-sdk';
import { uploadFile } from 'react-s3';
import { IoIosAddCircleOutline } from "react-icons/io";

function AddPost() {
  const [file, setFile] = useState(null);
  const [mediaLink, setMediaLink] = useState(null);
  const [caption, setCaption] = useState('');
  const [description, setDescription] = useState('');
  const [tags, setTags] = useState([]);
  const [landmark, setLandmark] = useState('');

  const dispatch = useDispatch();

  const status = useSelector((state) => state.post.status);
  const error = useSelector((state) => state.post.error);
  const navigate = useNavigate();

  //AWS LOGIC

  const handleFileInput = (e) => {
    const file = e.target.files[0];
    // Changing file state
    setFile(file);
  }

  async function uploadFileo() {
    // S3 Bucket Name
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


    // Uploading file to s3



    try {
      var upload = await s3.putObject(params).promise();
      console.log(upload);
      const formData = {
        mediaLink: [`https://skynect.s3.amazonaws.com/${params.Key}`],
        caption,
        description,
        tags,
        landmark,
        userId: localStorage.getItem('skyn_userId'),
      };

      dispatch(createPost(formData))
      alert("File uploaded successfully.");

    } catch (error) {
      console.error(error);
      // setUploading(false)
      alert("Error uploading file: " + error.message); // Inform user about the error
    }

    // await upload.then((err, data) => {
    //   console.log("err" + err);
    //   // Fille successfully uploaded
    //   console.log("data" + data)
    //   alert("File uploaded successfully.");
    // })
    //   .catch((err) => console.log(err));
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    uploadFileo()


  };


  return (

    <div className='ed-container'>
      <form class="ed-form" onSubmit={handleSubmit}>
        <p class="ed-title">Add Post</p>
        <p class="ed-message"></p>

        <label>
          <input required="" placeholder="" type="file" class="ed-input" name="title"
            // value={file}
            onChange={handleFileInput}
          />
          <span>Media</span>
        </label>

        <label>
          <input required="" placeholder="" type="text" class="ed-input" name="description"
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
          />
          <span>caption</span>
        </label>
        <label>
          <input required="" placeholder="" type="text" class="ed-input" name="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <span>description</span>
        </label>
        <label>
          <input required="" placeholder="" type="text" class="ed-input" name="purpose"
            value={tags.join(',')}
            onChange={(e) => setTags(e.target.value.split(','))}
          />
          <span>tags</span>
        </label>
        <label>
          <input required="" placeholder="" type="text" class="ed-input" name="purpose"
            value={landmark}
            onChange={(e) => setLandmark(e.target.value)}
          />
          <span>landmark</span>
        </label>
        <button type="submit" class="ed-submit bg-blue-600">Submit</button>
        <button class="ed-cancel bg-red-600" >Cancel</button>
        <p class="ed-signin"><a href="#"></a> </p>
      </form>
      {/* {upload} */}

    </div>
  )
}

export default AddPost