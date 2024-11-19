import "./seabed.css"
import { runSeabedCave } from "./hooks/runSeabedCave";

export interface ISeabedCaveProps {
  resources: any;
  config?: any;
}

export const SeabedCave = ({
  resources,
  config
}: ISeabedCaveProps) => {

  const {
    buzzer1AudioRef,
    boxRef,
    img1Ref,
    characterRef,
    characterboxRef
  } = runSeabedCave(resources, config?.isControlled);

  return (
    <div className="seabed-container" style={{ backgroundImage: `url(${resources.images.wall})` }}>
      <div className="water"></div>
      <div id="box" className="box" ref={boxRef}>
        <img src={resources.images.cave} alt="" />
        <div className="sprite whale1" style={{ backgroundImage: `url(${resources.images.whale})` }}></div>
        <div className="sprite whale2" style={{ backgroundImage: `url(${resources.images.whale})` }}></div>
        <div className="sprite whale3" style={{ backgroundImage: `url(${resources.images.whale})` }}></div>
        <div className="sprite whale4" style={{ backgroundImage: `url(${resources.images.whale})` }}></div>
        <div className="sprite urchin1" style={{ backgroundImage: `url(${resources.images.urchin})` }}></div>
        <div className="sprite urchin2" style={{ backgroundImage: `url(${resources.images.urchin})` }}></div>
        <div className="sprite urchin3" style={{ backgroundImage: `url(${resources.images.urchin})` }}></div>
        <div className="sprite urchin4" style={{ backgroundImage: `url(${resources.images.urchin})` }}></div>
        <div className="sprite urchin5" style={{ backgroundImage: `url(${resources.images.urchin})` }}></div>
        <div className="sprite urchin6" style={{ backgroundImage: `url(${resources.images.urchin})` }}></div>
        <div className="sprite urchin7" style={{ backgroundImage: `url(${resources.images.urchin})` }}></div>
        <div className="sprite urchin8" style={{ backgroundImage: `url(${resources.images.urchin})` }}></div>
        <div className="sprite urchin9" style={{ backgroundImage: `url(${resources.images.urchin})` }}></div>
        <div className="sprite urchin10" style={{ backgroundImage: `url(${resources.images.urchin})` }}></div>
        <div className="sprite urchin11" style={{ backgroundImage: `url(${resources.images.urchin})` }}></div>
        <div className="sprite urchin12" style={{ backgroundImage: `url(${resources.images.urchin})` }}></div>
        <div className="sprite urchin13" style={{ backgroundImage: `url(${resources.images.urchin})` }}></div>
        <div className="sprite urchin14" style={{ backgroundImage: `url(${resources.images.urchin})` }}></div>
        <div className="sprite urchin15" style={{ backgroundImage: `url(${resources.images.urchin})` }}></div>
        <div className="sprite urchin16" style={{ backgroundImage: `url(${resources.images.urchin})` }}></div>
        <div className="sprite urchin17" style={{ backgroundImage: `url(${resources.images.urchin})` }}></div>
        <div className="sprite urchin18" style={{ backgroundImage: `url(${resources.images.urchin})` }}></div>
        <div className="sprite urchin19" style={{ backgroundImage: `url(${resources.images.urchin})` }}></div>
        <div className="sprite clam1" style={{ backgroundImage: `url(${resources.images.clam})` }}></div>
        <div className="sprite clam2" style={{ backgroundImage: `url(${resources.images.clam})` }}></div>
        <div className="sprite clam3" style={{ backgroundImage: `url(${resources.images.clam})` }}></div>
        <div className="sprite clam4" style={{ backgroundImage: `url(${resources.images.clam})` }}></div>
        <div className="sprite clam5" style={{ backgroundImage: `url(${resources.images.clam})` }}></div>
        <div className="sprite clam6" style={{ backgroundImage: `url(${resources.images.clam})` }}></div>
        <div className="sprite clam7" style={{ backgroundImage: `url(${resources.images.clam})` }}></div>
        <div className="sprite clam8" style={{ backgroundImage: `url(${resources.images.clam})` }}></div>
        <div className="sprite clam9" style={{ backgroundImage: `url(${resources.images.clam})` }}></div>
        <div className="sprite clam10" style={{ backgroundImage: `url(${resources.images.clam})` }}></div>
        <div className="sprite clam11" style={{ backgroundImage: `url(${resources.images.clam})` }}></div>
      </div>

      <div id="characterbox" ref={characterboxRef}>
        <div id="character" ref={characterRef} style={{ backgroundImage: `url(${resources.images.sub})` }}></div>
        <div id="img1" ref={img1Ref}></div>
      </div>
      <audio id="buzzer1" muted ref={buzzer1AudioRef} src={resources.audio.water} preload="auto" loop></audio>
    </div>
  );
};


export default SeabedCave