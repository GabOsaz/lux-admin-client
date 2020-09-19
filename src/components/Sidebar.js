import React from 'react';
import classNames from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faChartLine,
    faCalendarDay,
    faBook,
    faCalendarAlt,
    faCog,
    faHome
  } from '@fortawesome/free-solid-svg-icons';
import { Link, useLocation } from 'react-router-dom';

const navItems = [
  {
    label: 'Dashboard',
    path: 'dashboard',
    icon: faChartLine,
  },
  {
    label: 'Add Center',
    path: 'addCenter',
    icon: faCalendarDay,
  },
  {
    label: 'Settings',
    path: 'settings',
    icon: faCog,
  },
  {
    label: 'Bookings',
    path: 'bookings',
    icon: faBook,
  },
  {
    label: 'Calendar',
    path: 'calender',
    icon: faCalendarAlt,
  },
  {
    label: 'Event Centers',
    path: 'eventCenters',
    icon: faHome,
  }
];

const NavItem = ({ navItem }) => {
  const location = useLocation();
  const isCurrentRoute =
    location.pathname === `/${navItem.path}`;
  const classes = classNames({
    'px-2 sm:px-6 justify-center sm:justify-start py-3 rounded-full flex': true,
    'text-white hover:text-white-500 transform hover:translate-x-1 transition ease-in-out duration-100': !isCurrentRoute,
    'bg-gradient text-white-500 shadow-sm': isCurrentRoute
  });
  return (
    <Link to={navItem.path} className={classes}>
      <div className="flex items-center">
        <div className="mr-0 sm:mr-4">
          <FontAwesomeIcon icon={navItem.icon}/>
        </div>
        <span className="hidden sm:block">
          {navItem.label}
        </span>
      </div>
    </Link>
  );
};

const NavItemContainer = ({ children }) => (
  <div>{children}</div>
);

const Sidebar = () => {
  return (
    <section className=" h-screen">
      <div className="w-16 sm:w-24 m-auto">
        <img src='https://res.cloudinary.com/dsipecjov/image/upload/v1597838388/j922o1oiqelot0klg57v.svg' alt='Lux Events Management' ></img>
        {/* <h2 className="text-white-500"> Lux Events </h2> */}
      </div>
        <div><span className='flex justify-center -ml-6' >Management</span></div>
      <div className="mt-20">
        {navItems.map((navItem, i) => (
          <>
            <NavItemContainer key={i}>
                <NavItem navItem={navItem} />
            </NavItemContainer>
          </>
        ))}
      </div>
    </section>
  );
};

export default Sidebar;