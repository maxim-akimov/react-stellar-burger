import { FormEvent, useState } from "react";
import { IUseFormHook, IUseFormHookReturn } from "../types/main";

export const useForm = (inputValues: IUseFormHook = {}): IUseFormHookReturn => {
  const [values, setValues] = useState(inputValues);

  const handleChange = (event: FormEvent) => {
    const  {value, name} = event.target as HTMLInputElement;
    setValues({...values, [name]: value});
  };

  return [values, handleChange, setValues];
}