import type { ReactNode } from 'react'

type StepSectionProps = {
  id: string
  number: string
  eyebrow: string
  title: string
  description: string
  children: ReactNode
  className?: string
}

export function StepSection({
  id,
  number,
  eyebrow,
  title,
  description,
  children,
  className = '',
}: StepSectionProps) {
  return (
    <section className={`step-section ${className}`} id={id}>
      <div className="step-heading">
        <div className="step-number" aria-hidden="true">
          {number}
        </div>
        <div>
          <p className="step-eyebrow">{eyebrow}</p>
          <h2>{title}</h2>
          <p className="step-description">{description}</p>
        </div>
      </div>
      {children}
    </section>
  )
}
