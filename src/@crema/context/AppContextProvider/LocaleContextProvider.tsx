import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import defaultConfig from "@crema/constants/defaultConfig";
import { LanguageProps } from "@crema/types/models/Apps";
import {
  useThemeActionsContext,
  useThemeContext,
} from "./ThemeContextProvider";
import { LayoutDirection } from "@crema/constants/AppEnums";

export interface LocaleContextData {
  locale: LanguageProps;
  rtlLocale: string[];
}

export interface LocaleActionsData {
  updateLocale: (locale: LanguageProps) => void;
}

export const LocaleContext = createContext<LocaleContextData>({
  locale: defaultConfig.locale,
  rtlLocale: defaultConfig.rtlLocale,
});
export const LocaleActionsContext = createContext<LocaleActionsData>({
  updateLocale: () => {},
});

export const useLocaleContext = () => useContext(LocaleContext);

export const useLocaleActionsContext = () => useContext(LocaleActionsContext);

interface LocaleContextProviderProps {
  children: ReactNode;
}

const LocaleContextProvider: React.FC<LocaleContextProviderProps> = ({
  children,
}) => {
  const [locale, updateLocale] = useState<LanguageProps>(defaultConfig.locale);

  return (
    <LocaleContext.Provider
      value={{
        locale,
        rtlLocale: defaultConfig.rtlLocale,
      }}
    >
      <LocaleActionsContext.Provider
        value={{
          updateLocale,
        }}
      >
        {children}
      </LocaleActionsContext.Provider>
    </LocaleContext.Provider>
  );
};

export default LocaleContextProvider;
