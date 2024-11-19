import React, { memo } from 'react';
import { Handle, useStore, Position, useReactFlow } from '@xyflow/react';


export const TextNode = memo(({ id }: any) => {
  const nodeData = useStore((s) => {
    const node: any = s.nodeLookup.get(id);

    if (!node) {
      return null;
    }

    return node.data;
  });

  return (
    <div className="text-wraper">
      <div className="content">
        {nodeData.content}
      </div>
    </div>
  );
});

export default TextNode
