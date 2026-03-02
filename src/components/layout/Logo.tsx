export default function Logo() {
  return (
    <div className="flex items-center gap-2">
      <svg
        width="160"
        height="55"
        viewBox="0 0 160 55"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="h-10 w-auto"
      >
        {/* Elegant Swoosh/Wave that sits above the text */}
        <path
          d="M65 24C95 18 135 32 170 22"
          stroke="currentColor"
          strokeWidth="1.2"
          strokeLinecap="round"
          className="text-primary/60"
        />
        <path
          d="M75 27C105 22 135 36 160 28"
          stroke="currentColor"
          strokeWidth="0.8"
          strokeLinecap="round"
          strokeOpacity="0.4"
          className="text-foreground"
        />
        
        {/* sparkles/Glints (Diamond stars) */}
        {/* Large center glint */}
        <path
          d="M110 16C111 10 111 10 113 2C115 10 115 10 116 16C122 17 122 17 128 19C122 21 122 21 116 22C115 28 115 28 113 34C111 28 111 28 110 22C104 21 104 21 98 19C104 17 104 17 110 16Z"
          fill="currentColor"
          className="text-primary"
        />
        {/* Small glint left */}
        <path
          d="M98 12C98.5 9 98.5 9 99.5 6C100.5 9 100.5 9 101 12C104 12.5 104 12.5 107 13.5C104 14.5 104 14.5 101 15C100.5 18 100.5 18 99.5 21C98.5 18 98.5 18 98 15C95 14.5 95 14.5 92 13.5C95 12.5 95 12.5 98 12Z"
          fill="currentColor"
          className="text-primary/70"
        />
        {/* Small glint right */}
        <path
          d="M125 10C125.5 8 125.5 8 126 6C126.5 8 126.5 8 127 10C129 10.5 129 10.5 131 11C129 11.5 129 11.5 127 12C126.5 14 126.5 14 126 16C125.5 14 125.5 14 125 12C123 11.5 123 11.5 121 11C123 10.5 123 10.5 125 10Z"
          fill="currentColor"
          className="text-primary/70"
        />

        {/* Stylized Text */}
        <text
          x="0"
          y="48"
          fontFamily="Alegreya, serif"
          fontSize="40"
          fontWeight="bold"
          fill="currentColor"
          className="text-foreground"
          style={{ letterSpacing: '-1.5px', fontStyle: 'italic' }}
        >
          Glowniva
        </text>
      </svg>
    </div>
  );
}
