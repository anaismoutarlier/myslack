import { useState } from "react";

export default function useHook() {
  const [hookValue, setHookValue] = useState("hello");
  return {
    value: hookValue,
    setter: setHookValue,
  };
}
