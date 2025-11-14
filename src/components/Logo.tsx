
export function Logo() {
  return (
    <div className="flex items-center gap-2 text-primary">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 256 256"
        className="h-8 w-8"
        fill="none"
        stroke="currentColor"
        strokeWidth="5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <defs>
          <style>{`
            .st { fill: none; stroke: currentColor; stroke-width: 10; stroke-linecap: round; stroke-linejoin: round; }
            .thin { stroke-width: 6; }
            .filled { fill: currentColor; stroke: none; }
            .cup-fill { fill: currentColor; opacity: 0.1; stroke: none; }
          `}</style>
        </defs>

        {/* Headphone band (outer) */}
        <path className="st" d="M45 100 A90 100 0 0 1 204 100" />
        <path className="cup-fill" d="M45 100 A90 100 0 0 1 204 100" />

        {/* Headphone band (inner) for a double-line band */}
        <path className="st thin" d="M56 100 A78 76 0 0 1 190 100" />

        {/* Left earcup (outer shape) */}
        <g transform="translate(42,120)">
          <rect x="-14" y="-20" width="40" height="68" rx="20" ry="20" className="st" />
          <rect x="-8" y="-14" width="34" height="56" rx="14" ry="14" className="cup-fill" />
        </g>

        {/* Right earcup (outer shape) */}
        <g transform="translate(168,120)">
          <rect x="14" y="-20" width="40" height="68" rx="20" ry="20" className="st" />
          <rect x="20" y="-14" width="34" height="56" rx="14" ry="14" className="cup-fill" />
        </g>

        {/* Cat head */}
        <circle cx="128" cy="128" r="54" className="st" />

        {/* Ears */}
        <path className="st" d="M92 88 L85 50 L110 70" />
        <path className="st" d="M164 88 L158 46 L140 70" />

        {/* Inner ear details (small lines) */}
        <path className="st thin" d="M106 78 L112 66" />
        <path className="st thin" d="M150 78 L144 66" />

        {/* Eyes (closed) */}
        <path className="st thin" d="M85 125 q12 -12 28 0" />
        <path className="st thin" d="M143 125 q12 -12 28 0" />

        {/* Nose (filled) */}
        <path d="M126 148 L128 156 L135 148 L128 148 Z" className="filled" transform="translate(0,-4) scale(0.9) translate(10,0)"/>

        {/* Mouth */}
        <path className="st thin" d="M128 150 v10" />

        {/* Whiskers */}
        <path className="st thin" d="M100 140 h-28" />
        <path className="st thin" d="M100 150 h-22" />
        <path className="st thin" d="M100 160 h-25" />
        <path className="st thin" d="M157 160 h25" />
        <path className="st thin" d="M157 150 h22" />
        <path className="st thin" d="M157 140 h28" />
      </svg>
      <span className="text-xl font-bold tracking-tight text-foreground">MewTone</span>
    </div>
  );
}
