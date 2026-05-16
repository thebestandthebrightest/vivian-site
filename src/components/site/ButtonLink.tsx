import type { AnchorHTMLAttributes, ReactNode } from "react";

type ButtonLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  children: ReactNode;
};

export function ButtonLink({
  children,
  className = "",
  ...props
}: ButtonLinkProps) {
  return (
    <a
      className={`focus-ring inline-flex items-center border-b border-line pb-2 text-sm font-medium text-foreground transition-colors duration-300 hover:border-foreground ${className}`}
      {...props}
    >
      {children}
    </a>
  );
}
