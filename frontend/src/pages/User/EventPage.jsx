import React, { useEffect, useState } from 'react';


import { useSelector } from 'react-redux';
import styles from '../../style/style';
import Navbar from '../../components/User/Navbar';
import Footer from '../../components/User/Footer';
import EventCard from '../../components/User/Event/EventCard';
import Loader from '../../components/AnimationsPages/Loader';

const EventPage = () => {
  const [loading, setLoading] = useState(true);
  const { allEvents } = useSelector((state) => state.event);

  useEffect(() => {
    if (!allEvents) {
      setLoading(true);
    } else {
      setLoading(false);
    }
  }, [allEvents]);

  const sortedEvents = Array.isArray(allEvents)
    ? [...allEvents].sort(() => Math.random() - 0.5)
    : [];



  return (
    <div>
      <Navbar />
      <div className="w-11/12 mx-auto p-5 sm:mt-0 mt-10 ">
        {loading ? (
          <Loader />
        ) : (
          <div className=' mt-2'>
            <div className="flex items-center justify-center">
              <h1 className={`${styles.heading}`}>
                Popular Events
              </h1>
            </div>
            <div className="w-full mt-10 flex flex-wrap items-center justify-center">
              {sortedEvents.length > 0 ? (
                sortedEvents.map((event) => (
                  <EventCard key={event._id} data={event} />
                ))
              ) : (
                <div className="text-center mt-20 h-44 items-center flex justify-center">
                  <p className="text-xl text-black">No event available right now.</p>

                </div>

              )}
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};



export default EventPage;
