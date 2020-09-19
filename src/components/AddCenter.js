import React, { useState } from 'react';
// import { Redirect } from 'react-router-dom';
// import { Form, Formik } from 'formik';
// import * as Yup from 'yup';
import Card from './common/Card';
import Label from './common/Label';
// import input from './common/input';
import FormSuccess from './common/FormSuccess';
import FormError from './common/FormError';
import GradientBar from './common/GradientBar';
import GradientButton from './common/GradientButton';
import { publicFetch } from '../util/fetch';
import classNames from 'classnames';
// import { AuthContext } from '../context/AuthContext';


const AddCenter = () => {
  // const authContext = useContext(AuthContext)
  const [creationSuccess, setCreationSuccess] = useState();
  const [creationError, setCreationError] = useState();
  const [loading, setLoading] = useState(false);
  const [uploadedImg, setUploadedImg] = useState(null);
  const [imgUpload, setImgUpload] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState();
  const [uploadError, setUploadError] = useState();

  const [name, setName] = useState('');
  const [state, setState] = useState('');
  const [city, setCity] = useState('');
  const [capacity, setCapacity] = useState('');
  const [parkingSpaces, setParkingSpace] = useState('');
  const [location, setLocation] = useState('');
  const [services, setServices] = useState('');
  const [description, setDescription] = useState('');
  const [style, setStyle] = useState('');
  const [amenities, setAmenities] = useState([]);

  const credentials = {
    name, state, city, capacity, parkingSpaces, location, services, description, style, amenities, uploadedImg
  }

  const UploadImg = () => {
      const [selectedFile, setSelectedFile] = useState(null);
      const [previewSource, setPreviewSource] = useState();
      const [uploading, setLoading] = useState(false);
  
      const onChangeHandler = (e) => {
          setSelectedFile(e.target.files[0]);
          console.log(e.target.files[0]);
          previewFile(e.target.files[0]);
      };

      const previewFile = (file) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        console.log(reader.error)
        reader.onloadend = () => {
          setPreviewSource(reader.result)
          console.log(reader.result)
        }
      }

      const onSubmitHandler = (e) => {
        e.preventDefault();
        if(!selectedFile) return;
        const reader = new FileReader();
        reader.readAsDataURL(selectedFile);
        reader.onloadend = () => {
          uploadImg(reader.result)
        }
        reader.onerror = () => {
          console.error('Check onSubmit function for possible error!');
          setUploadError('Submit unsuccessful');
        }
      }
  
      const uploadImg = async (base64EncodedImage) => {
        try {
          setLoading(true);
          const { data } = await publicFetch.post('fileUpload', {data: base64EncodedImage});
          console.log(data);
          setUploadSuccess(data.msg);
          console.log(uploadSuccess)
          setUploadedImg(data.uploadedResponse.secure_url);
          console.log(data.uploadedResponse.secure_url);
          setUploadError('');
        } catch(error) {
          setLoading(false);
          console.error('Something went wrong');
          const data  = error;
          setUploadError(data.msg);
          setUploadSuccess('');
        }
      }
  
      return (
        <div className= 'flex justify-between'>
          <section className='w-full h-screen'>  
              {uploadSuccess && (
                  <FormSuccess text={uploadSuccess} />
              )}
              {uploadError && (
                  <FormError text={uploadError} />
              )}
              <input
                  type="hidden"
                  name="remember"
                  value="true"
              />
              <form onSubmit={onSubmitHandler}>
                  <input type="file" name="file"  onChange={onChangeHandler}/>
                  {previewSource && (
                    <div>
                      <img src={previewSource} alt='selected' style={{height: '300px'}}></img>
                  </div>
                  )}
                  <div className="flex mt-6">
                      <span className='mr-5'><GradientButton
                          type="submit"
                          text="Upload"
                          loading={uploading}
                      />
                      </span>
                      <span><GradientButton
                        type="text"
                        text="Go back"
                        onClick={() => setImgUpload(!imgUpload)}
                      />
                      </span>
                  </div>
              </form>
          </section>
        </div>
      )
  }

  const UploadTxt = () => (
    <div className='text-center'>
      <span className='cursor-pointer text-blue-600' onClick={() => setImgUpload(!imgUpload)}>
        Upload Images
      </span>
    </div>
  );

  const submitCredentials = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const { data } = await publicFetch.post('eventCenters', credentials);
      // authContext.setAuthState(data);
      console.log(data);
      setCreationSuccess(data.message);
      setLoading(false);
      setCreationError('');
    } catch (error) {
      setLoading(false);
      const { data } = error.response;
      setCreationError(data.message);
      setCreationSuccess('');
    }
  };

  const inputClass = classNames({
    "appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:shadow-outline-blue focus:border-blue-300 focus:z-10 sm:text-sm sm:leading-5": true
})

  return (
    <>
     {imgUpload && <UploadImg />}
     {imgUpload === false &&
      <section className="w-full h-screen m-auto p-4 sm:pt-10">
        <GradientBar />
        <Card>
          <div className="flex items-center justify-center py-3 px-4 sm:px-6 lg:px-8">
            <div className="max-w w-full">
              <div>
                <h2 className="mb-2 text-center text-3xl leading-9 font-extrabold text-gray-900">
                  Add Event Center
                </h2>
              </div>
              <div>
                  <form onSubmit={submitCredentials} className="mt-8">
                    {creationSuccess && (
                      <FormSuccess text={creationSuccess} />
                    )}
                    {creationError && (
                      <FormError text={creationError} />
                    )}
                    <input
                      type="hidden"
                      name="remember"
                      value="true"
                      className={inputClass}
                    />
                    <div className='w-50' >
                      <div className="flex">
                        <div className="mb-2 mr-2 w-full">
                          <div className="mb-1">
                            <Label text="Name of Event Center" />
                          </div>
                          <input
                            aria-label='Name'
                            name="name"
                            type="text"
                            placeholder="What is it called?"
                            onChange={(e) => setName(e.target.value)}
                            value={name}
                            className={inputClass}
                          />
                        </div>
                        <div className="mb-2 ml-2 w-full">
                          <div className="mb-1">
                            <Label text="State" />
                          </div>
                          <input
                            aria-label="State"
                            name="state"
                            type="text"
                            placeholder="state"
                            onChange={(e) => setState(e.target.value)}
                            value={state}
                            className={inputClass}
                          />
                        </div>
                      </div>
                      <div className="flex">
                        <div className="mb-2 mr-2 w-full">
                          <div className="mb-1">
                            <Label text="City" />
                          </div>
                          <input
                            aria-label="City"
                            name="city"
                            type="text"
                            placeholder="which city?"
                            onChange={(e) => setCity(e.target.value)}
                            value={city}
                            className={inputClass}
                          />
                        </div>
                        <div className="mb-2 ml-2 w-full">
                          <div className="mb-1">
                            <Label text="Capacity" />
                          </div>
                          <input
                            aria-label="Capacity"
                            name="capacity"
                            type="text"
                            placeholder="capacity?"
                            onChange={(e) => setCapacity(e.target.value)}
                            value={capacity}
                            className={inputClass}
                          />
                        </div>
                      </div>
                      <div className="flex">
                        <div className="mb-2 mr-2 w-full">
                          <div className="mb-1">
                            <Label text="Parking Spaces" />
                          </div>
                          <input
                            aria-label="Parking Spaces"
                            name="parkingSpaces"
                            type="text"
                            placeholder="capacity of parking space available?"
                            onChange={(e) => setParkingSpace(e.target.value)}
                            value={parkingSpaces}
                            className={inputClass}
                          />
                        </div>
                        <div className="mb-2 ml-2 w-full">
                          <div className="mb-1">
                            <Label text="Location" />
                          </div>
                          <input
                            aria-label="Location"
                            name="location"
                            type="text"
                            placeholder="street address?"
                            onChange={(e) => setLocation(e.target.value)}
                            value={location}
                            className={inputClass}
                          />
                        </div>
                      </div>
                      <div className="flex">
                        <div className="mb-2 mr-2 w-full">
                          <div className="mb-1">
                            <Label text="Services" />
                          </div>
                          <input
                            aria-label="Services"
                            name="services"
                            type="text"
                            placeholder="What services are rendered?"
                            onChange={(e) => setServices(e.target.value)}
                            value={services}
                            className={inputClass}
                          />
                        </div>
                        <div className="mb-2 ml-2 w-full">
                          <div className="mb-1">
                            <Label text="Description" />
                          </div>
                          <input
                            aria-label="Description"
                            name="description"
                            type="textarea"
                            placeholder="Some highlights..."
                            onChange={(e) => setDescription(e.target.value)}
                            value={description}
                            className={inputClass}
                          />
                        </div>
                      </div>
                      <div className="flex">
                        <div className="mb-2 mr-2 w-full">
                          <div className="mb-1">
                            <Label text="Style" />
                          </div>
                          <input
                            aria-label="Style"
                            name="style"
                            type="text"
                            placeholder="style"
                            onChange={(e) => setStyle(e.target.value)}
                            value={style}
                            className={inputClass}
                          />
                        </div>
                        <div className="mb-2 ml-2 w-full">
                          <div className="mb-1">
                            <Label text="Amenities" />
                          </div>
                          <input
                            aria-label="Amenities"
                            name="amenities"
                            type="text"
                            placeholder="what are the available amenities?"
                            onChange={(e) => setAmenities(e.target.value)}
                            value={amenities}
                            className={inputClass}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="mt-6">
                      <div><em> Note: If there are images to upload, kindly do that first by clicking 'Upload Images' below before hitting the 'Submit data' button </em></div>
                      <UploadTxt />
                      <GradientButton
                        type="submit"
                        text="Submit data"
                        loading={loading}
                      />
                    </div>
                  </form>
              </div>
            </div>
          </div>
        </Card>
      </section>}
    </>
  );
};

export default AddCenter;
