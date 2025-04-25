import { Language } from "../constants/languages";

export type Translation = {
  id: string;
  keyword: string;
  translations: {
    [key in Language]?: string;
  };
};
