import { AudioWaveform, Bot, Brain, Car, Cpu, Database, Network, RadioTower, ShieldCheck } from "lucide-react";

/** Maps icon names stored in /data to tree-shaken lucide components. */
const icons = { AudioWaveform, Bot, Brain, Car, Cpu, Database, Network, RadioTower, ShieldCheck };

export default function Icon({ name, ...props }) {
  const Component = icons[name];
  return Component ? <Component aria-hidden="true" {...props} /> : null;
}
