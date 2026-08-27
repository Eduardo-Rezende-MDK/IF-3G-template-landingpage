import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { track, withCampaignParams } from "@/lib/analytics";

const ctaVariants = cva(
  "inline-flex items-center justify-center gap-2 rounded-md font-semibold transition-colors min-h-12 px-6 text-base",
  {
    variants: {
      variant: {
        primary: "bg-primary text-primary-foreground shadow-cta hover:bg-primary-dark",
        outline: "border-2 border-ink text-ink bg-card hover:bg-secondary",
        onDark:
          "bg-primary text-primary-foreground hover:bg-primary-dark shadow-cta",
        outlineOnDark:
          "border-2 border-ink-foreground/60 text-ink-foreground hover:bg-ink-foreground/10",
        quiet: "text-foreground underline underline-offset-4 min-h-0 px-0 hover:text-primary-dark",
      },
      size: {
        md: "",
        lg: "min-h-14 px-8 text-lg",
        sm: "min-h-10 px-4 text-sm",
      },
    },
    defaultVariants: { variant: "primary", size: "md" },
  },
);

type CtaLinkProps = React.ComponentPropsWithoutRef<"a"> &
  VariantProps<typeof ctaVariants> & {
    href: string;
    /** Nome do CTA enviado em select_cta */
    ctaName: string;
    ctaLocation: string;
    destinationType: "store" | "category" | "signup" | "whatsapp" | "anchor" | "product";
    extraEvent?: { name: string; params?: Record<string, unknown> };
    eventParams?: Record<string, unknown>;
  };

export function CtaLink({
  href,
  ctaName,
  ctaLocation,
  destinationType,
  extraEvent,
  eventParams,
  variant,
  size,
  className,
  children,
  ...props
}: CtaLinkProps) {
  const isAnchor = destinationType === "anchor";
  const external = !isAnchor;

  return (
    <a
      href={href}
      className={cn(ctaVariants({ variant, size }), className)}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      onClick={(event) => {
        track("select_cta", {
          cta_name: ctaName,
          cta_location: ctaLocation,
          destination_type: destinationType,
          ...eventParams,
        });
        if (extraEvent) track(extraEvent.name, extraEvent.params);
        if (external) {
          event.preventDefault();
          window.open(withCampaignParams(href), "_blank", "noopener,noreferrer");
        }
      }}
      {...props}
    >
      {children}
    </a>
  );
}
