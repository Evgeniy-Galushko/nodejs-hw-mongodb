const parseContactType = (type) => {
  const isString = typeof type === 'string';

  if (!isString) return;

  const isType = (type) => ['work', 'home', 'personal'].includes(type);

  if (isType(type)) return type;
};

const parseIsFavourite = (boolean) => {
  const isBoolian = typeof boolean === 'boolean';

  if (!isBoolian) return;

  const isFavourite = (bool) => [false, true].includes(bool);

  if (isFavourite(boolean)) return boolean;
};

export const parseFilterParams = (query) => {
  const { isFavourite, contactType } = query;

  const parsedContactType = parseContactType(contactType);
  const parsedIsFavourite = parseIsFavourite(isFavourite);

  return {
    isFavourite: parsedIsFavourite,
    contactType: parsedContactType,
  };
};
