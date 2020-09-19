import React, {useEffect, useState} from 'react';
import PageTitle from './common/PageTitle';
import DashboardMetric from './common/DashboardMetric';
import Card from './common/Card';
import {
  faBook,
  faCalendarDay,
  faUserPlus
} from '@fortawesome/free-solid-svg-icons';
// import { FetchContext } from '../context/FetchContext';
import DashboardChart from './common/DashboardChart';
import {dashboardData} from '../util/dashboard';
import { publicFetch } from '../util/fetch';
//import axios from 'axios';

const Dashboard = () => {
  const [usersNum, setUserData] = useState();
  //const [reservedVenues, setReservedVenues] = useState();

  useEffect(() => {

    const getDashboardData = async () => {
      // try {
      //   const [ usersData, reservedVenuesData ] = await axios.all([publicFetch.get('login'), publicFetch.get('reservedVenues')]);
      //   console.log(usersData);
      //   usersData && setUserData(usersData.data.users);
      //   reservedVenuesData && setReservedVenues(reservedVenuesData.data.reservedVenues);
      //   console.log(usersNum, reservedVenues)
      // } catch (error) {
      //   console.log(error.message)
      // }
      // axios.all([
      //   publicFetch.get('login'), publicFetch.get('reservedVenues'),
      // ])
      // .then(response => {
      //   setUserData(response[0].data.users);
      //   setReservedVenues(response[1].data.reservedVenues)
      // });
      try {
        const { data } = await publicFetch.get(
          'login'
        );
        // const { data1 } = await publicFetch.get('reservedVenues');
        // setReservedVenues(data1.reservedVenues);
        // console.log(data1.reservedVenues);
        setUserData(data.users);
      } catch (err) {
        console.log(err);
      }
    };

    getDashboardData();
  }, [ usersNum ]);

  return (
    <>
      <PageTitle title="Dashboard" />
      {dashboardData ? (
        <>
          <div className="mb-4 flex flex-col sm:flex-row">
            <div className="w-full sm:w-1/3 sm:mr-2 mb-4 sm:mb-0">
              <DashboardMetric
                title="Number of booked venues"
                value={
                  dashboardData.bookedVenues
                }
                icon={faBook}
              />
            </div>
            <div className="w-full sm:w-1/3 sm:ml-2 sm:mr-2 mb-4 sm:mb-0">
              <DashboardMetric
                title="Registered Users"
                value={usersNum}
                icon={faUserPlus}
              />
            </div>
            <div className="w-full sm:w-1/3 sm:ml-2 mb-4 sm:mb-0">
              <DashboardMetric
                title="Number of reserved venues"
                value={
                  dashboardData.reservedVenues
                }
                icon={faCalendarDay}
              />
            </div>
          </div>
          <div className="w-4/4 mt-4">
            <Card>
              {dashboardData && (
                <DashboardChart
                  salesData={dashboardData.graphData}
                />
              )}
            </Card>
          </div>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </>
  );
};

export default Dashboard;
