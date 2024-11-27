import classNames from "classnames";
import Heading from "../../elements/Heading/Heading";
import Paragraph from "../../elements/Paragraph/Paragraph";

interface HeadingBannerProps {
  children: React.ReactNode;
  paragraph: string;
  className?: string;
}

const HeadingBanner = ({
  children,
  paragraph,
  className,
}: HeadingBannerProps) => {
  return (
    <div
      className={classNames("space-y-3 text-center lg:space-y-6", className)}
    >
      <Heading className="text-2xl lg:text-3xl">{children}</Heading>
      <Paragraph className="max-w-3xl text-center text-[16px] md:text-[20px]">
        {paragraph}
      </Paragraph>
    </div>
  );
};

export default HeadingBanner;
