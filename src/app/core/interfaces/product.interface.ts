import { OptionCode } from "../enums/option-code.enum";

export interface ProductOptionSearch {
  code: OptionCode;
  name: string;
}

export interface ProductParameterData {
  code: string;
  value: string;
}