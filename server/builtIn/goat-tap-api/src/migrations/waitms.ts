

export const waitMs = (msDuration: number) => {
  return new Promise((resolve, _reject) => {
    setTimeout(() => {
      resolve(null);
    }, msDuration);
  });
};