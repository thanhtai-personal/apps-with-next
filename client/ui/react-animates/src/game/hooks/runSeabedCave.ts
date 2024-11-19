import useInterval from "@core-utils/react-hooks/dist/hooks/useInterval";
import { createRef, useEffect, useState } from "react";

const keys = {
  UP: 38,
  LEFT: 37,
  RIGHT: 39,
  DOWN: 40,
}



export const runSeabedCave = (resources: any, isControlled = false) => {
  const buzzer1AudioRef = createRef<any>();
  const boxRef = createRef<any>();
  const img1Ref = createRef<any>();
  const characterboxRef = createRef<any>();
  const characterRef = createRef<any>();

  const [actions, setActions] = useState({});
  const [character, setCharacter] = useState({
    x: 100,
    y: 100,
    speedMultiplier: 2,
    elementRef: characterboxRef
  });

  const openNav = () => {
    if (boxRef.current) {
      boxRef.current.style.marginLeft = "calc(-20000px + 100vw)";
      buzzer1AudioRef?.current?.play();
    }
  }

  const closeNav = () => {
    if (boxRef.current) {
      boxRef.current.style.marginLeft = "0";
    }
  }

  const restartAnimation1 = () => {
    let circle1: any = document.querySelector(".snow1");
    if (!circle1) return;
    circle1.style.animationName = "none";

    requestAnimationFrame(() => {
      setTimeout(() => {
        circle1.style.animationName = ""
      }, 0);
    });
  }

  const ani1 = () => {
    if (img1Ref.current) {
      img1Ref.current.className = 'snow1';
    }
  }

  const play4 = () => {
    const audioz4 = new Audio(resources.audio.shoot);
    audioz4.play();
    audioz4.currentTime = 0;
  }

  const play3 = () => {
    const audioz3 = new Audio(resources.audio.ping);
    audioz3.play();
    audioz3.currentTime = 0;
  }

  const handleKeyDown = (e: KeyboardEvent) => {
    if (!isControlled) return;
    if (e.preventDefault) {
      e.preventDefault();
    }
    else {
      e.returnValue = false;
    }
    var kc = e.keyCode || e.which;
    setActions((prev) => {
      prev[kc] = e.type == 'keydown';
      return prev;
    })

    if (e.keyCode == 813) {
      play4()
      ani1()
      restartAnimation1()
    }

    if (e.keyCode == 87) {
      play3()
    }
    if (e.keyCode == 81) {
      play4()
      ani1()
      restartAnimation1()
    }
  }

  const handleKeyUp = (e: KeyboardEvent) => {
    if (!isControlled) return;
    if (e.preventDefault) {
      e.preventDefault();
    }
    else {
      e.returnValue = false;
    }
    var kc = e.keyCode || e.which;
    setActions((prev) => {
      prev[kc] = e.type == 'keydown';
      return prev;
    })

    if (e.keyCode == 813) {
      play4()
      ani1()
      restartAnimation1()
    }

    if (e.keyCode == 87) {
      play3()
    }
    if (e.keyCode == 81) {
      play4()
      ani1()
      restartAnimation1()
    }
  }

  const moveCharacter = (dx, dy) => {
    if (characterRef.current) {
      setCharacter((prev) => {
        prev.x += (dx || 0) * prev.speedMultiplier;
        prev.y += (dy || 0) * prev.speedMultiplier;
        characterRef.current.style.left = prev.x + 'px';
        characterRef.current.style.top = prev.y + 'px';
        return prev;
      })
      
    }
  }

  const detectCharacterMovement = () => {
    if (actions[keys.LEFT]) {
      moveCharacter(-1, 0);
    }
    if (actions[keys.RIGHT]) {
      moveCharacter(1, 0);
    }
    if (actions[keys.UP]) {
      moveCharacter(0, -1);
    }
    if (actions[keys.DOWN]) {
      moveCharacter(0, 1);
    }
  };

  useEffect(() => {
    document.addEventListener("keyup", handleKeyUp);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keyup", handleKeyUp);
      document.removeEventListener("keydown", handleKeyDown);
    }
  }, [])

  useEffect(() => {
    buzzer1AudioRef?.current?.play();
  }, [buzzer1AudioRef?.current])

  useInterval(() => {
    detectCharacterMovement();
  }, 1000 / 24);

  return {
    buzzer1AudioRef,
    boxRef,
    img1Ref,
    characterboxRef,
    characterRef,
  }
}