"use client";
import { useState } from "react";
import { Button } from "@core-ui/nextui-core/dist/base/button";

export const Counter: React.FC = () => {
  const [count, setCount] = useState(0);

  return (
    <Button radius="full" onPress={() => setCount(count + 1)}>
      Count is {count}
    </Button>
  );
};
