import { cn } from "@/lib/utils"

interface SectionHeadingProps {
  eyebrow: string
  title: string
  description?: string
  align?: "split" | "center"
  className?: string
}

export default function SectionHeading({
  eyebrow,
  title,
  description,
  align = "split",
  className,
}: SectionHeadingProps) {
  if (align === "center") {
    return (
      <div className={cn("mx-auto max-w-2xl text-center", className)}>
        <p className="eyebrow mb-3">{eyebrow}</p>
        <h2 className="display text-3xl text-white sm:text-4xl lg:text-5xl">{title}</h2>
        {description && (
          <p className="mt-5 text-sm leading-relaxed text-white/45">{description}</p>
        )}
      </div>
    )
  }

  return (
    <div className={cn("flex flex-col gap-6 md:flex-row md:items-end md:justify-between", className)}>
      <div className="max-w-2xl">
        <p className="eyebrow mb-3">{eyebrow}</p>
        <h2 className="display text-3xl text-white sm:text-4xl lg:text-5xl">{title}</h2>
      </div>
      {description && (
        <p className="text-sm leading-relaxed text-white/45 md:max-w-xs md:shrink-0 md:text-right">
          {description}
        </p>
      )}
    </div>
  )
}
