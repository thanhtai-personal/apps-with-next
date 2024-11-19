import React, { memo } from 'react';
import { Handle, useStore, Position, useReactFlow } from '@xyflow/react';


export const FrameNode = memo(({ id }: any) => {
  const nodeData = useStore((s) => {
    const node: any = s.nodeLookup.get(id);
    if (!node) {
      return null;
    }

    return node.data;
  });

  return (
    <div className="w-full h-full relative bg-[#00000088]">
      <div className="absolute font-bold top-1 left-1 text-lg text-white">
        {nodeData.label}
      </div>
    </div>
  );
});

export default FrameNode
