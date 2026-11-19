import {
  Blocks,
  Code2,
  Compass,
  Handshake,
  KeyRound,
  Layers,
  Map,
  MessagesSquare,
  PenTool,
  Rocket,
  ShieldCheck,
  Smartphone,
  Target,
  Wrench,
} from "lucide-react";

const boxed = "grid size-11 place-items-center rounded-xl border border-border bg-bg text-accent";

/** Icons for the six process steps, in order. */
const steps = [Compass, Map, PenTool, Code2, ShieldCheck, Rocket];
export function StepIcon({ index }: { index: number }) {
  const Icon = steps[index] ?? Blocks;
  return (
    <span className={boxed}>
      <Icon className="size-5" aria-hidden strokeWidth={1.7} />
    </span>
  );
}

/** Icons for "why work with us", in the order of data/process.ts reasons. */
const reasons = [Handshake, Layers, Blocks, Smartphone, MessagesSquare, Target, Wrench, KeyRound];
export function ReasonIcon({ index }: { index: number }) {
  const Icon = reasons[index] ?? Blocks;
  return (
    <span className={boxed}>
      <Icon className="size-5" aria-hidden strokeWidth={1.7} />
    </span>
  );
}
