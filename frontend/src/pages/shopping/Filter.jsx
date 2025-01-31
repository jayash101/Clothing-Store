import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { filterOptions } from "@/config";
import React from "react";

const ProductFilter = ({ filters, handleFilter }) => {

  return (
    <div className="rounded-lg bg-slate-200 shadow-sm">
      <div className="border-b p-4">
        <h2 className="text-lg font-bold">Filters</h2>
      </div>

      <div className="space-y-6 p-4">
        {Object.keys(filterOptions).map((item, key) => (
          <div key={key}>
            <h3 className="font-medium capitalize">{item}</h3>
            <Separator className="mb-4 mt-2 border border-gray-500" />
            <div className="mt-2 grid gap-2">
              {filterOptions[item].map((option) => (
                <Label
                  key={option.id}
                  className="flex items-center gap-2 font-normal"
                >
                  <Checkbox
                    checked={
                      filters &&
                      Object.keys(filters).length > 0 &&
                      filters[item] &&
                      filters[item].indexOf(option.id) > -1
                    }
                    id={option.id}
                    onCheckedChange={() => handleFilter(item, option.id)}
                    className={`border border-black`}
                  />{" "}
                  {option.label}
                </Label>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductFilter;
