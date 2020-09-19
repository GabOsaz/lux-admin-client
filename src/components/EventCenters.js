import React, { useState, useEffect } from 'react';
import PageTitle from './common/PageTitle';
import { publicFetch } from '../util/fetch';
import EditCenter from './common/EditCenter';
import FormSuccess from './common/FormSuccess';
import FormError from './common/FormError';

const EventCenters = () => {
    const [ eventCenters, setEventCenters ] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [ showDelModal, setShowDelModal] = useState(false)
    const [currentCenter, setCurrentCenter] = useState();

    const [editSuccess, setEditSuccess] = useState();
    const [editError, setEditError] = useState();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const getEventCenters = async () => {
            try {
                const { data } = await publicFetch.get('eventCenters');
                console.log(data);
                setEventCenters(data)
            } catch(error) {
                console.log(error)
            }
        }
        getEventCenters()
    }, [setCurrentCenter]);

    const modalSetup = (eventCenter) => {
      setShowModal(true);
      setCurrentCenter(eventCenter)
    };

    const delModalSetup = (eventCenter) => {
      setShowDelModal(true);
      setCurrentCenter(eventCenter)
    }

    const onDelete = async () => {
      try {
      setLoading(true);
      const  { data } = await publicFetch.delete(`eventCenters/${currentCenter._id}`);
      console.log(data);
      setEventCenters(
        eventCenters.filter(center => center._id !== data.deletedCenter._id)
      );
      setEditSuccess(data.message);
      setEditError('');
      setLoading(false);
      } catch (error) {
      setLoading(false);
      const { data } = error.response;
      setEditError(data.message);
      setEditSuccess('');
      }
    };

    const OnDeleteModal = () => {
        return (
          <>
            {showDelModal ? (
              <>
                <div
                  className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-30 outline-none focus:outline-none"
                >
                  <div className="relative w-auto my-6 mx-auto max-w-3xl">
                    {/*content*/}
                    <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                      {/*header*/}
                      <div className="flex items-start justify-between p-5 rounded-t">
                        <h3 className="text-3xl font-semibold mr-3">
                          Deleting {currentCenter.name}
                        </h3>
                        <button
                          className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                          onClick={() => setShowDelModal(false)}
                        >
                          <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                            ×
                          </span>
                        </button>
                      </div>
                      {/*body*/}
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
                      <div className="-my-4 relative p-6 flex-auto">
                        <div className="text-gray-600 text-lg leading-relaxed">
                          <h3> Are you sure you want to delete this Event center? </h3>
                        </div>
                      </div>
                      {/*footer*/}
                      <div className="flex items-center justify-end p-6 rounded-b">
                      <button
                        className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1"
                        type="button"
                        style={{ transition: "all .15s ease" }}
                        onClick={() => setShowDelModal(false)}
                      >
                        No
                      </button>
                      <button
                        className="bg-green-500 text-white active:bg-green-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
                        type="button"
                        style={{ transition: "all .15s ease" }}
                        onClick={onDelete}
                      >
                        {loading ? 'Deleting...' : 'Yes'}
                      </button>
                    </div>
                    </div>
                  </div>
                </div>
                <div className="opacity-25 fixed inset-0 z-20 bg-black"></div>
              </>
            ) : null}
          </>
        );
    }

    const Modal = () => {
      console.log(currentCenter);
        return (
          <>
            {showModal ? (
              <>
                <div
                  className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-30 outline-none focus:outline-none"
                  // onClick={() => setShowModal(false)}
                >
                  <div className="relative w-full my-6 mx-auto max-w-3xl">
                    {/*content*/}
                    <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                      {/*header*/}
                      <div className="flex items-start justify-between p-5 border-b border-solid border-gray-300 rounded-t">
                        <h3 className="text-3xl font-semibold">
                          Editing {currentCenter.name}
                        </h3>
                        <button
                          className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                          onClick={() => setShowModal(false)}
                        >
                          <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                            ×
                          </span>
                        </button>
                      </div>
                      {/*body*/}
                      <div className="-my-4 relative p-6 flex-auto">
                        <div className="text-gray-600 text-lg leading-relaxed">
                          <EditCenter eventCenter={currentCenter} />
                        </div>
                      </div>
                      {/*footer*/}
                      
                    </div>
                  </div>
                </div>
                <div className="opacity-25 fixed inset-0 z-20 bg-black"></div>
              </>
            ) : null}
          </>
        );
      }
     
    return (
        <>
            <PageTitle title='Your Event Centers' />
            
            {eventCenters ? (eventCenters.map((eventCenter, i) => (
                <section key={i} className='my-2 mb-3 flex flex-column justify-center sm:flex-row border-b-2 border-gray-500'>
                    <div className='flex flex-col md:w-2/3 sm:w-1/3 sm:ml-2 sm:mr-2 mb-4 sm:mb-0'>
                        <div className='h-auto w-full'>
                            <img src={eventCenter.uploadedImg} className='max-w-full h-auto rounded-lg' alt='Event center' />
                        </div>
                        <div className='flex my-4 justify-center'><h3> {eventCenter.name}, {eventCenter.state} </h3></div>
                        <div className='flex justify-between px-4 mb-2'>
                            <button 
                                className='text-white hover:text-white-500 bg-blue-600 active:bg-blue-800 hover:cursor-pointer px-3 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1'
                                onClick={() => modalSetup(eventCenter)}
                                style={{ transition: "all .15s ease" }}
                            > 
                                Edit 
                            </button>
                            <button 
                                onClick={() => delModalSetup(eventCenter)}
                                style={{ transition: "all .15s ease" }}
                                className='text-white hover:text-white-500 bg-red-600 active:bg-red-800 hover:cursor-pointer px-3 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none'
                            >
                                Delete 
                            </button>
                        </div>
                    </div>

                </section>
            ))): (
                <p> Loading... </p>
            )}
          <Modal />
          <OnDeleteModal />
        </>
    )
}

export default EventCenters