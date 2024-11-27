import HeadingBanner from '../../components/ui/HeadingBanner/HeadingBanner';
import EventView from '../../components/ui/EventsSection/EventList';
import { useGetAllEvents } from '../../services/event/event.query';

const Events = () => {


  const {data: eventData, isFetching, isError} = useGetAllEvents({
    page: 1,
    size: 10
  });

  return (
    <div className='container-layout'>
      <div>
        <HeadingBanner
          className='flex flex-col items-center'
          paragraph={
            'Discover our exciting calendar of events where innovation meets excellence.'
          }
        >
          ESD Laboratory List of Events
        </HeadingBanner>
        <div
          className='max-sm:h-80 w-full'
          style={{
            backgroundImage: 'url(./Event.webp)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        ></div>
      </div>
      <div className='max-sm:hidden w-full '>
        <img src='./Event.webp' alt='' className='w-full h-[400px] object-cover' />
      </div>
      {/* Handle different states */}
      {isFetching ? (
        <div className="flex justify-center items-center min-h-[200px]">
          <p className="text-lg">Loading events...</p>
        </div>
      ) : isError ? (
        <div className="flex justify-center items-center min-h-[200px]">
          <p className="text-lg text-red-500">Error loading events. Please try again later.</p>
        </div>
      ) : !eventData.data || eventData.data.length === 0 ? (
        <div className="flex justify-center items-center min-h-[200px]">
          <p className="text-lg">No events available at the moment.</p>
        </div>
      ) : (
        <EventView events={eventData.data} />
      )}
    </div>

  )
}

export default Events;
