import React, { useState } from 'react';
import Label from './Label';
import classNames from 'classnames';
import FormSuccess from './FormSuccess';
import FormError from './FormError';
import GradientButton from './GradientButton';
import { publicFetch } from '../../util/fetch';

const EditCenter = (prop) => {
    const eventCenter = prop.eventCenter;
    console.log(eventCenter)
    const [editSuccess, setEditSuccess] = useState();
    const [editError, setEditError] = useState();
    const [loading, setLoading] = useState(false);

    const [name, setName] = useState(eventCenter.name);
    const [state, setState] = useState(eventCenter.state);
    const [city, setCity] = useState(eventCenter.city);
    const [capacity, setCapacity] = useState(eventCenter.capacity);
    const [parkingSpaces, setParkingSpace] = useState(eventCenter.parkingSpaces || '');
    const [location, setLocation] = useState(eventCenter.location);
    const [services, setServices] = useState(eventCenter.services);
    const [description, setDescription] = useState(eventCenter.description);
    const [style, setStyle] = useState(eventCenter.style);
    const [amenities, setAmenities] = useState(eventCenter.amenities);

    const credentials = {
       id:prop.eventCenter._id, name, state, city, capacity, parkingSpaces, location, services, description, style, amenities
      }

    const submitCredentials = async (e) => {
        e.preventDefault();
        console.log('Submit data clicked')
        try {
          setLoading(true);
          const { data } = await publicFetch.patch('eventCenters', credentials);
          console.log(data);
          setEditSuccess(data.message);
          setLoading(false);
          setEditError('');
        } catch (error) {
          setLoading(false);
          const { data } = error.response;
          setEditError(data.message);
          setEditSuccess('');
        }
      };

      const inputClass = classNames({
        "appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:shadow-outline-blue focus:border-blue-300 focus:z-10 sm:text-sm sm:leading-5": true
    })

    return (
        <div>
            <div className="-my-4 relative p-6 flex-auto">
                <div className="text-gray-600 text-lg leading-relaxed">
                    <form onSubmit={submitCredentials} className="mt-3">
                        {editSuccess && (
                            <FormSuccess text={editSuccess} />
                        )}
                        {editError && (
                            <FormError text={editError} />
                        )}
                        <input
                            type="hidden"
                            name="remember"
                            value="true"
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
                                        placeholder="Capacity of parking space available?"
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
                                        placeholder="Street address?"
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
                                    <textarea
                                        aria-label="Description"
                                        name="description"
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
                    </form>
                </div>
            </div>
            <div className="flex items-center justify-end p-6 border-t border-solid border-gray-300 rounded-b">

                <GradientButton
                    type="submit"
                    text="Submit data"
                    loading={loading}
                    onClick={submitCredentials}
                />
            </div>

        </div>
    )
}

export default EditCenter