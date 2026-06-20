import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

/**
 * Navara-style animated button.
 * Use variant="primary" (filled) or "ghost" (outlined).
 * Pass `to` for a router link, `href` for external, or leave both for a button.
 */
export default function MotionButton({
  children,
  to,
  href,
  onClick,
  variant = 'primary',
  className = '',
  size = 'md',
  ...props
}) {
  const sizeClasses = size === 'sm'
    ? 'px-5 py-2.5 text-sm'
    : size === 'lg'
    ? 'px-9 py-4 text-base'
    : 'px-7 py-3.5 text-sm'

  const base = `relative inline-flex items-center justify-center gap-2 font-semibold rounded-xl overflow-hidden cursor-pointer select-none whitespace-nowrap ${sizeClasses} ${className}`

  const filled = 'bg-incesa-accent text-white shadow-lg shadow-incesa-accent/30'
  const ghost = 'border border-white/30 text-white bg-white/8 backdrop-blur-sm'
  const outline = 'border border-incesa-accent text-incesa-accent dark:text-incesa-accent bg-transparent'

  const variantClass = variant === 'ghost' ? ghost : variant === 'outline' ? outline : filled

  const inner = (
    <>
      {/* Shimmer sweep on hover */}
      <motion.span
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        initial={{ x: '-110%', skewX: '-20deg' }}
        whileHover={{ x: '160%' }}
        transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
        style={{
          background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.22) 50%, transparent 100%)',
          width: '60%',
        }}
      />
      <span className="relative z-10 flex items-center gap-2">{children}</span>
    </>
  )

  const motionProps = {
    whileHover: { scale: 1.04, y: -2 },
    whileTap: { scale: 0.96 },
    transition: { duration: 0.18, ease: [0.16, 1, 0.3, 1] },
  }

  if (to) {
    return (
      <motion.span {...motionProps} className="inline-flex">
        <Link to={to} className={`${base} ${variantClass}`} {...props}>{inner}</Link>
      </motion.span>
    )
  }

  if (href) {
    return (
      <motion.a href={href} className={`${base} ${variantClass}`} {...motionProps} {...props}>
        {inner}
      </motion.a>
    )
  }

  return (
    <motion.button
      type="button"
      className={`${base} ${variantClass}`}
      onClick={onClick}
      {...motionProps}
      {...props}
    >
      {inner}
    </motion.button>
  )
}
