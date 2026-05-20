import { usePrototypeAnimation } from "../shared/usePrototypeAnimation";
import { Version3ChatRow } from "./Version3ChatRow";

export function Version3Experience() {
  const animation = usePrototypeAnimation();

  return <Version3ChatRow {...animation} />;
}
