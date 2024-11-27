import { TAchievement } from "../../../services/achievement/achievement.query";
import SectionHeading from "../SectionHeading";
import AchievementItem from "./AchievementItem";

interface AchievementListsProps {
  achievements: TAchievement[];
}
const AchievementLists = ({ achievements }: AchievementListsProps) => {
  return (
    <div className="flex flex-col items-center gap-[32px] md:gap-[64px]">
      <SectionHeading>
        <div>
          <SectionHeading.HeadingTop>
            Unlocking Value Through Cutting Edge Solution
          </SectionHeading.HeadingTop>
          <SectionHeading.HeadingBottom>
            Get to Know Our Events and Participate in it
          </SectionHeading.HeadingBottom>
        </div>
      </SectionHeading>
      <div className="container-layout mx-auto grid grid-cols-1">
        {achievements?.map((achievement) => (
          <AchievementItem key={achievement.id} achievement={achievement} />
        ))}
      </div>
    </div>
  );
};

export default AchievementLists;
