import type { AnchorHTMLAttributes, ReactNode } from "react";

type TextLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  children: ReactNode;
};

export function TextLink({ children, className = "", ...props }: TextLinkProps) {
  return (
    <a
      className={`focus-ring group relative inline-flex w-fit items-center pb-1 text-[0.76rem] font-medium text-foreground ${className}`}
      {...props}
    >
      <span>{children}</span>
      <span className="absolute bottom-0 left-0 h-px w-full origin-left scale-x-0 bg-foreground transition-transform duration-300 ease-out group-hover:scale-x-100" />
    </a>
  );
}
