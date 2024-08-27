export const changeTheme = (theme: string) => {
  document.querySelector("html")?.setAttribute("class", theme);
};