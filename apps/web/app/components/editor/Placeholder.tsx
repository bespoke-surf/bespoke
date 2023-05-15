import type { ReactNode } from "react";

export default function Placeholder({
  children,
}: {
  children: ReactNode;
  className?: string;
}): JSX.Element {
  return <div className="Placeholder__root">{children}</div>;
}
