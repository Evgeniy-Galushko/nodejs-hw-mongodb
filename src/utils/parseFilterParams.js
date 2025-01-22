const parseContactType = (type) => {
  const isString = typeof type === 'string';

  if (!isString) return;

  const isType = (type) => ['work', 'home', 'personal'].includes(type);

  if (isType(type)) return type;
};

const parseIsFavourite = (boolean) => {
  if (!boolean) return;

  const bool = JSON.parse(boolean);
  const isBoolian = typeof bool === 'boolean';

  if (!isBoolian) return;

  const isFavourite = (bool) => [false, true].includes(bool);

  if (isFavourite(bool)) return bool;
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
