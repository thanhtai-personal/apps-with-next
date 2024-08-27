export const getInitials = (firstName?: string, lastName?: string) => {
  const name = getFullName(firstName, lastName);
  return getInitialFromFullName(name);
};

export const getInitialFromFullName = (name?: string) => {
  return name
    ?.match(/(^\S\S?|\s\S)?/g)
    ?.map((v) => v.trim())
    .join("")
    .match(/(^\S|\S$)?/g)
    ?.join("")
    .toLocaleUpperCase();
};

export const getFullName = (firstName?: string, lastName?: string) => {
  return [firstName, lastName].filter(Boolean).join(" ");
};
