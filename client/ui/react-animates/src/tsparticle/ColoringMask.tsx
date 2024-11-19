import { useEffect, useMemo, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import {
  type Container,
  type ISourceOptions,
} from "@tsparticles/engine";
// import { loadAll } from "@tsparticles/all"; // if you are going to use `loadAll`, install the "@tsparticles/all" package too.
import { loadFull } from "tsparticles"; // if you are going to use `loadFull`, install the "tsparticles" package too.
// import { loadBasic } from "@tsparticles/basic"; // if you are going to use `loadBasic`, install the "@tsparticles/basic" package too.
// import { loadSlim } from "@tsparticles/slim"; // if you are going to use `loadSlim`, install the "@tsparticles/slim" package too.
import { colorMask } from "./configs";

export const ColoringMask = ({
  config,
  id,
  children
}: {
    config: any;
    id: string;
    children: JSX.Element;
}) => {
  const [init, setInit] = useState(false);

  // this should be run only once per application lifetime
  useEffect(() => {
    initParticlesEngine(async (engine) => {
      // you can initiate the tsParticles instance (engine) here, adding custom shapes or presets
      // this loads the tsparticles package bundle, it's the easiest method for getting everything ready
      // starting from v2 you can add only the features you need reducing the bundle size
      //await loadAll(engine);
      await loadFull(engine);
      // await loadSlim(engine);
      //await loadBasic(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  const particlesLoaded = async (container?: Container): Promise<void> => {
    // console.log(container);
  };

  const options: ISourceOptions = useMemo(
    () => ({
      ...colorMask,
      ...config
    } as ISourceOptions),
    [],
  );

  if (init) {
    return (
      <div style={{
        width: "100%",
        height: "100%",
        position: "relative",
        display: "flex",
      }}>
        <div style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          zIndex: 1,
        }}>
          <Particles
            id={`coloring-mask-${id}`}
            className="coloring-mask"
            style={{
              width: "100%",
              height: "100%",
            }}
            particlesLoaded={particlesLoaded}
            options={options}
          />
        </div>
        <div style={{
          width: "100%",
          height: "100%",
          zIndex: 2, display: "flex", justifyContent: "center", alignItems: "center"
        }}>
          {children && children}
        </div>
      </div>
    );
  }

  return <></>;
};