interface ImageSlotProps {
  id: string;
  alt?: string;
  radius?: number;
  style?: React.CSSProperties;
  className?: string;
}

const PICSUM_PREFIX = 'picsum:';

// Design-exported photos live in /public/images/<id>.webp. Any slot without
// a real asset (id is empty, or explicitly "picsum:<seed>") falls back to a
// deterministic picsum.photos placeholder so nothing ever renders blank.
export default function ImageSlot({ id, alt = '', radius, style, className }: ImageSlotProps) {
  const s: React.CSSProperties = { borderRadius: radius, ...style };

  let src: string;
  if (id.startsWith('blob:') || id.startsWith('http') || id.startsWith('data:')) {
    src = id;
  } else if (id.startsWith(PICSUM_PREFIX)) {
    src = `https://picsum.photos/seed/${encodeURIComponent(id.slice(PICSUM_PREFIX.length))}/600/600`;
  } else if (!id) {
    src = 'https://picsum.photos/seed/cc-placeholder/600/600';
  } else {
    src = `${import.meta.env.BASE_URL}images/${id}.webp`;
  }

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
