// A drawn chevron (Joe, 10 Nov 2026: "these chevrons aren't centred"). A typed ‹ › sits low and to one side
// inside a round button; this sits dead centre. Size + stroke follow the button.
export default function Chev({ dir = 'right', size = 12, stroke = 1.9 }) {
  const d = dir === 'left' ? 'M6.6 2.2 3.4 6l3.2 3.8' : 'M5.4 2.2 8.6 6l-3.2 3.8';
  return (
    <svg className="chev" width={size} height={size} viewBox="0 0 12 12" aria-hidden="true">
      <path d={d} fill="none" stroke="currentColor" strokeWidth={stroke * 12 / size} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
