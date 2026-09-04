interface ImageSlotProps {
  id: string;
  alt?: string;
  radius?: number;
  style?: React.CSSProperties;
  className?: string;
}

// Design-exported photos live in /public/images/<id>.webp. IDs with no
// asset (synthetic mock collaborations) fall back to a soft placeholder tile.
export default function ImageSlot({ id, alt = '', radius, style, className }: ImageSlotProps) {
  const s: React.CSSProperties = { borderRadius: radius, ...style };
  if (!id) {
    return <div className={`imgslot-empty ${className ?? ''}`} style={s} aria-hidden="true" />;
  }
  const src = id.startsWith('blob:') || id.startsWith('http') || id.startsWith('data:') ? id : `/images/${id}.webp`;
  return (
    <img
      className={`imgslot ${className ?? ''}`}
      style={s}
      src={src}
      alt={alt}
      draggable={false}
      loading="lazy"
    />
  );
}
