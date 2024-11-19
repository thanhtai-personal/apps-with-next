import { Profiler, ReactNode } from "react";

export interface IProfilerWrapProps {
  children: ReactNode;
  id: string;
  config?: {
    isProductionMode?: boolean;
  };
  onRender?: () => void;
}

export const ProfilerWrap = ({ children, config, id: initialId, onRender }: IProfilerWrapProps) => {
  const {
    isProductionMode = false,
  } = config || {};

  if (isProductionMode) {
    return <>{children}</>;
  }

  const handleRenderContent = (
    id: string,
    phase: "mount" | "update" | "nested-update",
    actualDuration: number,
    baseDuration: number,
    startTime: number,
    commitTime: number,
  ) => {
    console.info(
      `%cProfiler ID:%c ${id}
      \n%cPhase:%c ${phase}
      \n%cRender time (actual duration):%c ${actualDuration.toFixed(2)} ms
      \n%cBase duration:%c ${baseDuration.toFixed(2)} ms
      \n%cStart time:%c ${startTime}
      \n%cCommit time:%c ${commitTime}`,
      "color: #007acc; font-weight: bold;", "color: #fc6703;",
      "color: #007acc; font-weight: bold;", "color: #fc6703;",
      "color: #007acc; font-weight: bold;", "color: #fc6703;",
      "color: #007acc; font-weight: bold;", "color: #fc6703;",
      "color: #007acc; font-weight: bold;", "color: #fc6703;",
      "color: #007acc; font-weight: bold;", "color: #fc6703;",
    );

    onRender?.();
  };

  return (
    <Profiler id={`profiler-${initialId}`} onRender={handleRenderContent}>
      {children}
    </Profiler>
  );
};
