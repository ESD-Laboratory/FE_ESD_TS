import AchievementLists from "../../components/ui/AchievementSection/AchievementLists";
import HeadingBanner from "../../components/ui/HeadingBanner/HeadingBanner";
import SocialProof from "../../components/ui/SocialProofSection/SocialProof";
import { useGetAllAchievements } from "../../services/achievement/achievement.query";

const Achievements = () => {
  const { data: achievementData } = useGetAllAchievements();

  return (
    <>
      <div className="container-layout">
        <div className="space-y-4">
          <HeadingBanner
            className="flex flex-col items-center"
            paragraph={
              "Powerful, self-serve product and growth analytics to help you convert, engage, and retain more users. Trusted by over 4,000 startups."
            }
          >
            Achievements of ESD Laboratory
          </HeadingBanner>
          <div
            className="w-full max-sm:h-80"
            style={{
              backgroundImage: "url(./Content.webp)",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          ></div>
        </div>
        <div className="w-full max-sm:hidden ">
          <img src="./Content.webp" alt="" className="h-auto w-full" />
        </div>
        {/* client works */}
        <SocialProof />
        {/* list of achievements */}
      </div>
      {achievementData && (
        <AchievementLists achievements={achievementData?.data} />
      )}
    </>
  );
};

export default Achievements;
