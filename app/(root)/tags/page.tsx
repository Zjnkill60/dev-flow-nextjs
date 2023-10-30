import TagCard from "@/components/card/TagCard";
import LocalSearch from "@/components/shared/search/LocalSearch";
import LocalSelect from "@/components/shared/select/LocalSelect";
import { TagFilters } from "@/constants";
import { getTags } from "@/lib/actions/tags.action";
import React from "react";



interface Props {
  _id: string;
  name: string;
  description: string;
  questions: string[];
  followers: string[];
}
const TagPage = async ({searchParams} : {searchParams : {q : string}}) => {
  const dataQuery = {
    page: 0,
    pageSize: 0,
    queryString: searchParams.q,
  };

  const listTag = (await getTags(dataQuery)) as Props[];
  return (
    <>
      <h1 className="h1-bold text-dark100_light900">Tags</h1>
      <div className="mt-10 flex gap-5 max-sm:flex-col">
        <LocalSearch placeholder="Search by tag name..." />
        <LocalSelect
          classOther=""
          placeholder="Select a Filter"
          filters={TagFilters}
        />
      </div>
      <div className="flex gap-5 flex-wrap mt-10">
        {listTag &&
          listTag.length > 0 &&
          listTag.map((item) => <TagCard tagData={item} key={item._id} />)}
      </div>
    </>
  );
};

export default TagPage;
