import { useLayoutEffect } from "react";

export const useScriptTag = (src: string) => {

  useLayoutEffect(() => {
    if (!src) return;
    const loadScript = (src: string) => {
      return new Promise((resolve, reject) => {
        const script = document.createElement("script");
        script.src = src;
        script.async = true;

        script.onload = () => {
          resolve(true);
        };
        script.onerror = () => {
          reject(new Error(`Failed to load script: ${src}`));
        };

        document.body.appendChild(script);
      });
    };

    loadScript(src)
      .then(() => {
        console.log("Script loaded successfully.");
      })
      .catch((error) => {
        console.error(error);
      });

    return () => {
      const scripts = document.querySelectorAll(`script[src="${src}"]`);
      scripts.forEach((script) => script.remove());
    };
  }, [src]);
}