"use client";
import { useAppStore } from "@/hooks";
import { Button } from "@core-ui/nextui-core/dist/base/button";
import { observer } from "@core-utils/react-mobx-state";

export const Counter: React.FC = observer(() => {
  const { counterStore } = useAppStore();
  return (
    <div>
      <h2>Counter testing ${counterStore.count}</h2>
      <Button radius="full" onPress={() => counterStore.count += 1}>
        Count is {counterStore.count}
      </Button>
    </div>
  );
});
