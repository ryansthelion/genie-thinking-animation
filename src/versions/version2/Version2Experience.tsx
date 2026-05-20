import { usePrototypeAnimation } from "../shared/usePrototypeAnimation";
import { Version2ChatRow } from "./Version2ChatRow";

export function Version2Experience() {
  const animation = usePrototypeAnimation();

  return <Version2ChatRow {...animation} />;
}
