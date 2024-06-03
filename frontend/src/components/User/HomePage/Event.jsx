import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import EventCard from '../Event/EventCard';
import styles from '../../../style/style';

const Event = () => {
  const { allEvents } = useSelector((state) => state.event);
  const [highestDiscountEvent, setHighestDiscountEvent] = useState(null);

  useEffect(() => {
    if (allEvents) {
      const newHighestDiscountEvent = allEvents.reduce((prevEvent, currentEvent) => {
        const prevDifference = prevEvent ? prevEvent.originalPrice - prevEvent.discountPrice : 0;
        const currentDifference = currentEvent ? currentEvent.originalPrice - currentEvent.discountPrice : 0;

        return prevDifference > currentDifference ? prevEvent : currentEvent;
      }, null);

      setHighestDiscountEvent(newHighestDiscountEvent);
    }
  }, [allEvents]);

  return (
    <div>
      {allEvents && allEvents.length > 0 ? (
        <div className="w-11/12 mx-auto sm:p-5 sm:mt-0 mt-10">
          <div className='py-6 flex items-center justify-center sm:justify-start'>
            <h1 className={`${styles.heading}`}>Popular Events</h1>
          </div>
        
          <div className="w-full flex flex-wrap items-center justify-center mt-5">
            {highestDiscountEvent && <EventCard data={highestDiscountEvent} />}
          </div>
        </div>
      ) : (
        null
      )}
    </div>
  );
};

export default Event;
