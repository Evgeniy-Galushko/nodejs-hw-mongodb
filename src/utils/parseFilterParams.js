const parseContactType = (type) => {
  const isString = typeof type === 'string';

  if (!isString) return;

  const isType = (type) => ['work', 'home', 'personal'].includes(type);
  console.log();

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
  const { isFavourite, type } = query;

  const parsedContactType = parseContactType(type);
  const parsedIsFavourite = parseIsFavourite(isFavourite);

  console.log(parsedContactType);

  return {
    isFavourite: parsedIsFavourite,
    type: parsedContactType,
  };
};
