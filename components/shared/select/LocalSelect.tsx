import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Filter {
  name: string;
  value: string;
}

const LocalSelect = ({
  placeholder,
  filters,
}: {
  placeholder: string;
  filters: Filter[];
}) => {
  return (
    <div className="md:hidden">
      <Select>
        <SelectTrigger
          className="background-light800_dark300 text-dark500_light500 light-border
         min-h-[56px] w-full border-none outline-none sm:min-w-[170px]"
        >
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent className="background-light800_dark300  text-dark200_light800">
          {filters.map((item) => (
            <SelectItem key={item.name} value={item.value}>
              {item.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default LocalSelect;
