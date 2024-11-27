import { Link } from 'react-router-dom';
import { Button } from '../../elements/Button/Button';
import Heading from '../../elements/Heading/Heading';
import Paragraph from '../../elements/Paragraph/Paragraph';
import ButtonGroup from '../ButtonGroup/ButtonGroup';
import { formatDate } from '../../../utils/string';

enum ActionType {
  Next = 'next',
  Previous = 'previous',
}

interface EventItemProps {
  event: {
    date: string;
    name: string;
    detail: string;
    link: string;
    image: string;
  };
  onClick?: (action: ActionType) => void;
}

const EventItem = ({ event, onClick }: EventItemProps) => {
  const handleNextClick = () => {
    if (onClick) {
      onClick(ActionType.Next); // Call onClick with ActionType.Next
    }
  };
  const handlePrevious = () => {
    if (onClick) {
      onClick(ActionType.Next); // Call onClick with ActionType.Next
    }
  };
  return (
    <div className='mt-10 flex max-w-[1096px] items-start gap-[64px] max-lg:flex-col max-lg:gap-[32px] max-lg:items-center'>
      <div className='border border-[#000000]'>
        <img src={event.image} className='w-[336px] h-[304px]' alt='' />
      </div>

      <div className='flex flex-col justify-between min-h-[304px]'>
        <div
          id='WrapperTextContent'
          className='flex flex-col max-w-[696px] items-start gap-[16px] max-lg:gap-[32px] max-sm:items-center max-md:px-[16px]'
        >
          <div className='flex max-w-[711px] flex-col items-start gap-[8px] max-sm:items-center'>
            <h3 className='text-[#6941C6] text-center font-inter text-[16px] md:text-[14px] font-semibold leading-[24px] tracking-normal'>
              {formatDate(event.date)}
            </h3>
            <Heading
              className={
                'font-inter text-[24px] md:text-[22px] text-center font-semibold leading-[32px]'
              }
            >
              {event.name}
            </Heading>
          </div>

          <Paragraph
            className={
              'text-infoDark font-inter text-[18px] font-[500px] leading-[28px]'
            }
          >
            {event.detail}
          </Paragraph>
        </div>
        <div
          id='action'
          className='flex max-w-[696px] gap-[430px] max-md:flex-col max-md:gap-[20px] max-md:items-center'
        >
          <div className='flex items-start rounded-[8px]'>
            <button
              id='details'
              className='flex py-[12px] justify-center items-center gap-[px] rounded-[8px]'
            >
              <Link to={event.link}>
                <h3 className='text-[#6941C6] text-center font-inter text-[16px] md:text-[14px] font-semibold leading-[24px] tracking-normal'>
                  See Details
                </h3>
              </Link>
            </button>
          </div>
          {/* <div id='Button-quote' className='flex gap-[16px]'> */}
          {/*   <ButtonGroup> */}
          {/*     <Button variant='secondary' onClick={handleNextClick}> */}
          {/*       Previous */}
          {/*     </Button> */}
          {/*     <Button onClick={handlePrevious}>Next</Button> */}
          {/*   </ButtonGroup> */}
          {/* </div> */}
        </div>
      </div>
    </div>
  );
};

export default EventItem;
