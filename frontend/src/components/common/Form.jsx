import React from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";

const CommonForm = ({
  formControls,
  formData,
  setFormData,
  onSubmit,
  buttonText,
  isBtnDisabled,
  variant,
}) => {
  const inputType = (item) => {
    let element = null;
    const value = formData[item.name] || "";

    if (item.componentType === "input") {
      element = (
        <Input
          name={item.name}
          id={item.name}
          type={item.type}
          key={item.name}
          value={value}
          placeholder={item.placeholder}
          onChange={(e) =>
            setFormData({
              ...formData,
              [item.name]: e.target.value,
            })
          }
          className={`bg-white outline-none ${variant === "admin" ? "focus:border-purple-600" : "focus:border-teal-900"}`}
        />
      );
    } else if (item.componentType === "select") {
      element = (
        <Select
          onValueChange={(value) =>
            setFormData({
              ...formData,
              [item.name]: value,
            })
          }
          value={value}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder={item.label} />
          </SelectTrigger>

          <SelectContent className="bg-white">
            {item.options && item.options.length > 0
              ? item.options.map((optionItem) => (
                  <SelectItem
                    key={optionItem.id}
                    value={optionItem.id}
                    className="cursor-pointer hover:bg-blue-600 hover:text-white"
                  >
                    {optionItem.label}
                  </SelectItem>
                ))
              : null}
          </SelectContent>
        </Select>
      );
    } else if (item.componentType === "textarea") {
      element = (
        <Textarea
          name={item.name}
          placeholder={item.placeholder}
          id={item.id}
          value={value}
          onChange={(e) =>
            setFormData({
              ...formData,
              [item.name]: e.target.value,
            })
          }
          className={`outline-none ${variant === "admin" ? "focus:border-purple-600" : "focus:border-teal-900"} bg-white`}
        />
      );
    } else {
      element = (
        <Input
          name={item.name}
          placeholder={item.placeholder}
          type={item.type}
          id={item.name}
          value={value}
          onChange={(e) =>
            setFormData({
              ...formData,
              [item.name]: e.target.value,
            })
          }
        />
      );
    }

    return element;
  };

  return (
    <form onSubmit={onSubmit}>
      <div className="mt-8 flex flex-col gap-3 text-start">
        {formControls.map((controlItem) => (
          <div key={controlItem.name} className="grid w-full gap-1.5">
            <Label className="mb-1">{controlItem.label}</Label>
            {inputType(controlItem)}
          </div>
        ))}
      </div>

      <Button
        type="submit"
        className={`mt-4 w-full transition-colors duration-500 hover:transition-colors hover:duration-500`}
        disabled={isBtnDisabled}
        variant={variant}
      >
        {buttonText || "Submit"}
      </Button>
    </form>
  );
};

export default CommonForm;
