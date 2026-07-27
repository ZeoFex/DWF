import Link from "next/link";
import { cn } from "@/lib/utils";
import type { ButtonHTMLAttributes, ReactNode } from "react";

const variantStyles = {
  primary:
    "bg-[#46A0DC] text-white hover:bg-[#2E86C1] active:bg-[#2471A3]",
  secondary:
    "bg-[#782882] text-white hover:bg-[#5F1F68] active:bg-[#4A1852]",
  outline:
    "border-2 border-[#46A0DC] text-[#46A0DC] bg-transparent hover:bg-[#46A0DC]/5",
  coral:
    "bg-[#E85A28] text-white hover:bg-[#D14A1F] active:bg-[#B83F1A]",
  ghost:
    "bg-transparent text-[#46A0DC] hover:bg-[#46A0DC]/10",
} as const;

const sizeStyles = {
  sm: "px-3 py-1.5 text-sm",
  md: "px-5 py-2.5 text-sm",
  lg: "px-6 py-3 text-base",
} as const;

type ButtonVariant = keyof typeof variantStyles;
type ButtonSize = keyof typeof sizeStyles;

interface SharedButtonProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  className?: string;
  children: ReactNode;
}

export type ButtonProps = SharedButtonProps &
  (
    | ({ href: string; onClick?: () => void } & {
        target?: string;
        rel?: string;
        "aria-label"?: string;
      })
    | (ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined })
  );

const baseStyles =
  "inline-flex items-center justify-center gap-2 rounded-xl font-medium transition-colors motion-safe:duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#46A0DC] focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50";

export function Button(props: ButtonProps) {
  const {
    variant = "primary",
    size = "md",
    fullWidth = false,
    className,
    children,
  } = props;

  const classes = cn(
    baseStyles,
    variantStyles[variant],
    sizeStyles[size],
    fullWidth && "w-full",
    className
  );

  if ("href" in props && props.href) {
    const { href, target, rel, "aria-label": ariaLabel, onClick } = props;
    return (
      <Link
        href={href}
        className={classes}
        target={target}
        rel={rel}
        aria-label={ariaLabel}
        onClick={onClick}
      >
        {children}
      </Link>
    );
  }

  const {
    type = "button",
    disabled,
    onClick,
    onFocus,
    onBlur,
    id,
    name,
    value,
    form,
    autoFocus,
    tabIndex,
    "aria-label": ariaLabel,
    "aria-labelledby": ariaLabelledby,
    "aria-describedby": ariaDescribedby,
  } = props as SharedButtonProps &
    ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined };

  return (
    <button
      type={type}
      disabled={disabled}
      className={classes}
      onClick={onClick}
      onFocus={onFocus}
      onBlur={onBlur}
      id={id}
      name={name}
      value={value}
      form={form}
      autoFocus={autoFocus}
      tabIndex={tabIndex}
      aria-label={ariaLabel}
      aria-labelledby={ariaLabelledby}
      aria-describedby={ariaDescribedby}
    >
      {children}
    </button>
  );
}
