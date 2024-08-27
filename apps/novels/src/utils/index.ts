
export * from "./constants";

export const goToSection = (id: string) => {
  const element = document.getElementById(id);
  if (element) {
    element.scrollIntoView({
      behavior: "smooth"
    });
  }
}

