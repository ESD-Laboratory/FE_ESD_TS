import { TAchievement } from "../../../services/achievement/achievement.query";
import { convertDateString } from "../../../utils/string";
import Paragraph from "../../elements/Paragraph/Paragraph";
import SectionHeading from "../SectionHeading";

interface AchievementItemProps {
  achievement: TAchievement;
}

const AchievementItem = ({ achievement }: AchievementItemProps) => {
  const { name, detail, organizer, date, image } = achievement;

  return (
    <div className="flex w-full  items-center gap-6 space-y-[32px] rounded-md border border-gray-300">
      <div
        className={`relative flex h-[379px] w-full max-w-96 justify-center bg-gray-100`}
        id="Logo_Win"
      >
        <img
          src={image}
          className="object  object-cover object-center"
          alt=""
        />
      </div>
      <div className="section flex justify-center  gap-16">
        <div className="flex w-full flex-col items-start gap-2">
          <SectionHeading>
            <div className="grid place-items-start">
              <SectionHeading.HeadingTop>
                {convertDateString(date)}
              </SectionHeading.HeadingTop>
              <SectionHeading.HeadingBottom className="text-[20px]">
                {name}
              </SectionHeading.HeadingBottom>
              <p className="text-[--gray-500]">{organizer}</p>
            </div>
          </SectionHeading>
          <Paragraph className="text-secondaryDark">{detail}</Paragraph>
        </div>
      </div>
    </div>
  );
};

export default AchievementItem;
