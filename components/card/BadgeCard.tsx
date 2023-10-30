import Image from "next/image";
import React from "react";

interface Props {
  urlImage: string;
  value: number | string;
  name: string;
  totalQuestion: number | null;
  totalAnswer: number | null;
}
const BadgeCard = ({
  urlImage,
  value,
  name,
  totalQuestion,
  totalAnswer,
}: Props) => {
  if (!urlImage) {
    return (
      <div className="background-light900_dark300 flex flex-warp sm:items-center py-6 px-3 border rounded-md justify-center gap-5 max-sm:flex-col light-border ">
        <div>
          <h4 className="h4-bold text-dark300_light900 paragraph-semibold">
            {totalQuestion}
          </h4>
          <p className=" text-dark300_light900 body-medium">{name}</p>
        </div>
        <div>
          <h4 className="h4-bold text-dark300_light900 paragraph-semibold">
            {totalAnswer}
          </h4>
          <p className=" text-dark300_light900 body-medium">{value}</p>
        </div>
      </div>
    );
  }
  return (
    <div className="background-light900_dark300 flex flex-warp gap-3 items-center py-6 px-3 border rounded-md  light-border justify-evenly ">
      <Image src={urlImage} alt="badge" width={50} height={50} />
      <div>
        <h4 className="h4-bold text-dark300_light900 paragraph-semibold">
          {value}
        </h4>
        <p className=" text-dark300_light900 body-medium">{name}</p>
      </div>
    </div>
  );
};

export default BadgeCard;
