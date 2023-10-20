import ProfileCard from "@/components/card/ProfileCard";
import LocalSearch from "@/components/shared/search/LocalSearch";
import LocalSelect from "@/components/shared/select/LocalSelect";
import { UserFilters } from "@/constants";
import { getAllUser } from "@/lib/actions/user.action";
import React from "react";

const CommunityPage = async () => {
  const listUser = await getAllUser();
  console.log("listUser : ", listUser);
  return (
    <>
      <h1 className="h1-bold text-dark100_light900">All Users</h1>
      <div className="mt-10 flex gap-5 max-sm:flex-col">
        <LocalSearch placeholder="Search amazing minds here..." />
        <LocalSelect
          classOther=""
          placeholder="Select a Filter"
          filters={UserFilters}
        />
      </div>
      <div className="flex gap-5 flex-wrap mt-10">
        {listUser &&
          listUser.length > 0 &&
          listUser.map((item) => (
            <ProfileCard userData={item} key={item.clerkId} />
          ))}
      </div>
    </>
  );
};

export default CommunityPage;
