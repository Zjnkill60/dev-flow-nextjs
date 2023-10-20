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
    </>
  );
};

export default CommunityPage;
