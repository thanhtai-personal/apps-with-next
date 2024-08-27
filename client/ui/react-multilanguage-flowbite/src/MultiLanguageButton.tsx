import { LanguageKey, MultiLanguageActionType, MultilanguageContext } from '@core-ui/multilanguage';

export interface IMultiLanguageButton {
  language: (key: string) => string;
  flags?: { [key: string]: string };
}

export const MultiLanguageButton = ({ flags }: IMultiLanguageButton) => {
  const languageDispatcher = MultilanguageContext.useDataDispatchContext();
  const languageData = MultilanguageContext.useDataContext();

  const handleChangeLanguage = (langKey: LanguageKey) => () => {
    languageDispatcher &&
      languageDispatcher({
        type: MultiLanguageActionType.updateLanguage,
        payload: {
          language: langKey,
        },
      });
  };

  const getNextLanguage = (langKey: LanguageKey) => {
    if (langKey === LanguageKey.vi) {
      return LanguageKey.en;
    }
    return LanguageKey.vi
  }

  return (
    <div className='flex flex-row flex-nowrap justify-center items-center'>
      {flags && Object.keys(LanguageKey).filter((key) => key === languageData?.language).map((key: string) => (
        <div
          id={`language-button-${key}`}
          key={`language-button-${key}`}
          className={` cursor-pointer rounded-lg min-w-fit min-h-fit overflow-hidden hover:border-none active:border-none enabled:border-none ${key === languageData?.language ? "" : "hidden"}`}
          onClick={handleChangeLanguage(getNextLanguage(key as LanguageKey))}
        >
          <img alt={key} className='rounded-lg w-8 h-8 lg:w-12 lg:h-12' src={key === LanguageKey.vi ? flags["vi"] : flags["en"]} />
        </div>
      ))}
    </div>
  );
};
