import Link from "next/link";
import clsx from "clsx";

type Props = {
  href: string;
  children: React.ReactNode;
  className?: string;
  external?: boolean;
};

export function ConsoleLink({ href, children, className, external }: Props) {
  const props = external ? { target: "_blank", rel: "noreferrer" } : undefined;

  return (
    <Link
      href={href}
      className={clsx(
        "console-link font-console text-lg leading-none",
        "hover:animate-glitch",
        className
      )}
      {...props}
    >
      <span className="inline-block h-2 w-2 rounded-sm bg-[var(--accent2)] shadow-[0_0_0_1px_rgba(0,0,0,.6)]" />
      <span>{children}</span>
      <span className="ml-auto text-white/40">→</span>
    </Link>
  );
}
