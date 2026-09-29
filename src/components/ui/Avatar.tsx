interface AvatarProps {
  name: string;
  /** A real photograph, once the client has given one and agreed to it. */
  src?: string;
  className?: string;
}

/**
 * Monogram avatar.
 *
 * The testimonials on this page are placeholders, so they get initials rather
 * than a face. Putting a stock or found photograph next to an invented quote
 * attributes words to a real person who never said them — pass `src` only for a
 * client who supplied their own photo.
 */
export default function Avatar({ name, src, className = '' }: AvatarProps) {
  const initials = name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? '')
    .join('');

  if (src) {
    return (
      <img
        src={src}
        alt={name}
        className={`h-11 w-11 shrink-0 rounded-full object-cover ${className}`}
        loading="lazy"
        decoding="async"
      />
    );
  }

  return (
    <span
      aria-hidden="true"
      className={`grid h-11 w-11 shrink-0 place-items-center rounded-full bg-zinc-900 text-[0.8125rem] font-medium tracking-wide text-white ${className}`}
    >
      {initials}
    </span>
  );
}
