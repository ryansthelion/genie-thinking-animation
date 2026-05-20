import { usePrototypeAnimation } from "../shared/usePrototypeAnimation";
import { Version1ChatRow } from "./Version1ChatRow";

export function Version1Experience() {
  const animation = usePrototypeAnimation();

  return <Version1ChatRow {...animation} />;
}
