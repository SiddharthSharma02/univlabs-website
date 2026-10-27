import type { ReactNode } from "react";

/**
 * Simplified working-principle diagrams for /technology. Drawn for navy
 * panels in brand colours only. ICG green marks fluorescence signal and
 * nothing else; near-infrared light, which is invisible, is drawn dashed.
 * Every diagram has a <title> and <desc> for screen readers.
 */

const C = {
  navy: "#001a49",
  navy700: "#0b2558",
  navy600: "#22396a",
  blue300: "#6fa3ff",
  icg: "#4be779",
  clinical: "#f4f6f9",
  fog: "#b7c3da",
};

const flow = "animate-[dash_0.6s_linear_infinite]";

function Frame({
  id,
  title,
  desc,
  viewBox,
  children,
}: {
  id: string;
  title: string;
  desc: string;
  viewBox: string;
  children: ReactNode;
}) {
  const head = (key: string, colour: string) => (
    <marker
      id={`${id}-${key}`}
      viewBox="0 0 10 10"
      refX="8"
      refY="5"
      markerWidth="6"
      markerHeight="6"
      orient="auto-start-reverse"
    >
      <path d="M0 0 10 5 0 10z" fill={colour} />
    </marker>
  );
  return (
    <svg
      viewBox={viewBox}
      role="img"
      aria-labelledby={`${id}-t ${id}-d`}
      className="h-auto w-full"
    >
      <title id={`${id}-t`}>{title}</title>
      <desc id={`${id}-d`}>{desc}</desc>
      <defs>
        {head("w", C.clinical)}
        {head("b", C.blue300)}
        {head("g", C.icg)}
        {head("f", C.fog)}
      </defs>
      {children}
    </svg>
  );
}

function L({
  x,
  y,
  children,
  anchor = "middle",
  colour = C.fog,
  size = 11,
}: {
  x: number;
  y: number;
  children: ReactNode;
  anchor?: "start" | "middle" | "end";
  colour?: string;
  size?: number;
}) {
  return (
    <text
      x={x}
      y={y}
      textAnchor={anchor}
      fill={colour}
      fontSize={size}
      letterSpacing="0.6"
      style={{ fontFamily: "var(--font-mono)" }}
    >
      {children}
    </text>
  );
}

function Box({
  x,
  y,
  w,
  h,
  lines,
  accent = false,
}: {
  x: number;
  y: number;
  w: number;
  h: number;
  lines: string[];
  accent?: boolean;
}) {
  const mid = y + h / 2 - ((lines.length - 1) * 13) / 2 + 4;
  return (
    <g>
      <rect
        x={x}
        y={y}
        width={w}
        height={h}
        rx={10}
        fill={C.navy700}
        stroke={accent ? C.blue300 : C.navy600}
        strokeWidth={1.5}
      />
      {lines.map((t, i) => (
        <L key={t} x={x + w / 2} y={mid + i * 13} colour={C.clinical}>
          {t}
        </L>
      ))}
    </g>
  );
}

/** 01 · Two light paths through a rigid scope, and its viewing cone. */
export function OpticsDiagram() {
  const id = "dg-optics";
  return (
    <Frame
      id={id}
      viewBox="0 0 440 250"
      title="Light paths in a rigid endoscope"
      desc="Light enters the scope from the light guide and travels to the tissue. Reflected light returns through the scope to the camera. At the tip, a cone shows the field of view, and a dotted line inside it shows the direction of view, tilted from the scope's axis."
    >
      {/* viewing cone */}
      <polygon points="310,120 410,106 410,231" fill={C.blue300} opacity={0.14} />
      <path d="M310 120 410 106M310 120 410 231" stroke={C.blue300} strokeOpacity={0.6} />
      <path d="M310 120 410 156" stroke={C.clinical} strokeWidth={1.5} strokeDasharray="2 4" />
      <path d="M310 120 410 120" stroke={C.fog} strokeOpacity={0.35} strokeDasharray="1 5" />
      {/* tissue */}
      <path d="M414 12C428 80 404 150 422 248" stroke={C.fog} strokeOpacity={0.6} strokeWidth={4} fill="none" strokeLinecap="round" />
      {/* camera, light post, scope tube */}
      <Box x={14} y={95} w={66} h={50} lines={["CAMERA"]} />
      <rect x={150} y={70} width={16} height={38} rx={3} fill={C.navy700} stroke={C.fog} strokeOpacity={0.5} />
      <rect x={80} y={108} width={232} height={24} rx={5} fill={C.navy700} stroke={C.fog} strokeOpacity={0.5} />
      <L x={158} y={60}>LIGHT IN</L>
      {/* illumination */}
      <path d="M158 76V114H300" stroke={C.clinical} strokeWidth={2} fill="none" markerEnd={`url(#${id}-w)`} />
      {/* image relay */}
      <path d="M300 126H88" stroke={C.blue300} strokeWidth={2} strokeDasharray="5 4" markerEnd={`url(#${id}-b)`} />
      <L x={238} y={100}>ILLUMINATION</L>
      <L x={196} y={152}>IMAGE RELAY</L>
    </Frame>
  );
}

/** 02 · Optics, four sensors, processing, 4K output. */
export function FourChipDiagram() {
  const id = "dg-chips";
  const sensors = [26, 82, 138, 194];
  return (
    <Frame
      id={id}
      viewBox="0 0 440 250"
      title="Signal chain of a four-chip camera"
      desc="Light passes through a lens into optics that divide it between four image sensors. The four sensor signals go to a processor, which outputs one 4K image to the display."
    >
      <path d="M4 125H30" stroke={C.clinical} strokeWidth={2} />
      <ellipse cx={40} cy={125} rx={8} ry={38} fill={C.blue300} fillOpacity={0.18} stroke={C.blue300} />
      <path d="M48 125H106" stroke={C.clinical} strokeWidth={2} markerEnd={`url(#${id}-w)`} />
      <rect x={110} y={95} width={60} height={60} rx={6} fill={C.navy600} stroke={C.fog} strokeOpacity={0.6} />
      <L x={140} y={129} colour={C.clinical}>OPTICS</L>
      {sensors.map((y, i) => (
        <g key={y}>
          <path d={`M170 125L218 ${y + 15}`} stroke={C.clinical} strokeOpacity={0.7} markerEnd={`url(#${id}-w)`} />
          <rect x={222} y={y} width={36} height={30} rx={4} fill={C.navy700} stroke={C.blue300} strokeWidth={1.5} />
          <L x={240} y={y + 19} colour={C.clinical}>{String(i + 1)}</L>
          <path d={`M258 ${y + 15}L286 125`} stroke={C.blue300} strokeOpacity={0.7} />
        </g>
      ))}
      <Box x={286} y={98} w={82} h={54} lines={["PROCESSOR"]} />
      <path d="M368 125H394" stroke={C.clinical} strokeWidth={2} markerEnd={`url(#${id}-w)`} />
      <rect x={398} y={104} width={38} height={42} rx={4} fill={C.navy700} stroke={C.clinical} strokeWidth={1.5} />
      <L x={417} y={129} colour={C.clinical}>4K</L>
      <L x={240} y={14}>4 SENSORS</L>
      <L x={417} y={168}>DISPLAY</L>
    </Frame>
  );
}

/** 03 · The same field in white light, NIR and overlay. */
export function ModesDiagram() {
  const id = "dg-modes";
  const panels = [
    { x: 8, name: "WHITE LIGHT", anatomy: true, signal: false },
    { x: 156, name: "NIR VIEW", anatomy: false, signal: true },
    { x: 304, name: "OVERLAY", anatomy: true, signal: true },
  ];
  return (
    <Frame
      id={id}
      viewBox="0 0 440 190"
      title="White light, NIR view and overlay"
      desc="Three panels of the same field. White light shows anatomy. The NIR view shows only the detected fluorescence signal, in green, on a dark background. The overlay places the green signal over the anatomy."
    >
      <defs>
        <filter id={`${id}-glow`} x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="3" />
        </filter>
      </defs>
      {panels.map((p) => (
        <g key={p.name}>
          <rect
            x={p.x}
            y={12}
            width={128}
            height={128}
            rx={12}
            fill={p.anatomy ? C.navy600 : C.navy}
            stroke={p.anatomy ? C.fog : C.navy600}
            strokeOpacity={p.anatomy ? 0.4 : 1}
          />
          {p.anatomy && (
            <g fill="none" stroke={C.clinical} strokeLinecap="round">
              <path d={`M${p.x + 12} ${100}C${p.x + 40} 70 ${p.x + 80} 120 ${p.x + 116} 84`} strokeOpacity={0.5} strokeWidth={2} />
              <path d={`M${p.x + 14} ${52}C${p.x + 50} 34 ${p.x + 74} 70 ${p.x + 114} 44`} strokeOpacity={0.35} strokeWidth={2} />
              <path d={`M${p.x + 30} ${128}C${p.x + 52} 112 ${p.x + 88} 132 ${p.x + 110} 118`} strokeOpacity={0.3} strokeWidth={2} />
              <path d={`M${p.x + 24} ${30}C${p.x + 44} 60 ${p.x + 40} 96 ${p.x + 64} 126`} stroke={C.blue300} strokeOpacity={0.7} strokeWidth={3} />
            </g>
          )}
          {p.signal && (
            <g fill="none" stroke={C.icg} strokeLinecap="round">
              <path
                d={`M${p.x + 64} 26C${p.x + 82} 52 ${p.x + 70} 80 ${p.x + 96} 112`}
                strokeWidth={10}
                strokeOpacity={0.5}
                filter={`url(#${id}-glow)`}
              />
              <path d={`M${p.x + 64} 26C${p.x + 82} 52 ${p.x + 70} 80 ${p.x + 96} 112`} strokeWidth={4} />
              <path d={`M${p.x + 76} 66C${p.x + 90} 64 ${p.x + 100} 58 ${p.x + 110} 46`} strokeWidth={2.5} strokeOpacity={0.85} />
            </g>
          )}
          <L x={p.x + 64} y={162}>{p.name}</L>
        </g>
      ))}
    </Frame>
  );
}

/** 04 · White and IR sources combined by a dichroic into one light guide. */
export function LightSourceDiagram() {
  const id = "dg-source";
  return (
    <Frame
      id={id}
      viewBox="0 0 440 250"
      title="Two light sources combined into one light path"
      desc="A white LED shines through a collection lens. An infrared LED below shines upward through its own lens. A dichroic combiner joins the two beams into one path, which a focus lens directs into the light guide."
    >
      {/* white LED and beam */}
      <rect x={14} y={64} width={30} height={32} rx={5} fill={C.clinical} fillOpacity={0.9} />
      <L x={12} y={52} anchor="start">WHITE LED</L>
      <path d="M44 80H196" stroke={C.clinical} strokeWidth={3} />
      <ellipse cx={80} cy={80} rx={6} ry={22} fill={C.blue300} fillOpacity={0.15} stroke={C.fog} />
      <L x={80} y={122}>LENS</L>
      {/* IR LED and beam */}
      <rect x={185} y={204} width={30} height={30} rx={5} fill={C.navy600} stroke={C.blue300} strokeDasharray="3 3" />
      <L x={176} y={224} anchor="end">IR LED</L>
      <path d="M200 204V84" stroke={C.blue300} strokeWidth={3} strokeDasharray="6 5" />
      <ellipse cx={200} cy={170} rx={22} ry={6} fill={C.blue300} fillOpacity={0.15} stroke={C.fog} />
      <L x={230} y={174} anchor="start">LENS</L>
      {/* dichroic */}
      <path d="M182 98 218 62" stroke={C.fog} strokeWidth={4} strokeLinecap="round" />
      <L x={200} y={40}>DICHROIC COMBINER</L>
      {/* combined beam */}
      <path d="M204 77H296" stroke={C.clinical} strokeWidth={3} />
      <path d="M204 84H296" stroke={C.blue300} strokeWidth={3} strokeDasharray="6 5" />
      <ellipse cx={302} cy={80} rx={7} ry={24} fill={C.blue300} fillOpacity={0.15} stroke={C.fog} />
      <L x={302} y={124}>FOCUS LENS</L>
      <path d="M309 77 348 80M309 84 348 81" stroke={C.clinical} strokeOpacity={0.8} strokeWidth={2} />
      <rect x={350} y={72} width={86} height={16} rx={8} fill={C.navy600} stroke={C.fog} strokeOpacity={0.7} />
      <L x={393} y={108}>LIGHT GUIDE</L>
    </Frame>
  );
}

/** 04 · Reference peaks on a wavelength scale. Not a measured spectrum. */
export function WavelengthScale() {
  const id = "dg-scale";
  const x = (nm: number) => 20 + ((nm - 700) / 250) * 400;
  return (
    <Frame
      id={id}
      viewBox="0 0 440 96"
      title="ICG reference peaks on a wavelength scale"
      desc="A wavelength scale from 700 to 950 nanometres. A blue marker at 805 nm shows the ICG absorption peak. A green marker at 830 nm shows the ICG emission peak."
    >
      <path d={`M${x(700)} 62H${x(950)}`} stroke={C.fog} strokeOpacity={0.6} />
      {[700, 750, 800, 850, 900, 950].map((nm) => (
        <g key={nm}>
          <path d={`M${x(nm)} 58V66`} stroke={C.fog} strokeOpacity={0.6} />
          <L x={x(nm)} y={84} size={10}>{String(nm)}</L>
        </g>
      ))}
      <path d={`M${x(805)} 22V62`} stroke={C.blue300} strokeWidth={3} strokeDasharray="5 4" />
      <path d={`M${x(830)} 22V62`} stroke={C.icg} strokeWidth={3} />
      <L x={x(805) - 6} y={16} anchor="end" colour={C.clinical}>805 nm ABSORPTION*</L>
      <L x={x(830) + 6} y={16} anchor="start" colour={C.clinical}>830 nm EMISSION*</L>
    </Frame>
  );
}

/** 05 · Energy levels: excitation, relaxation, emission. */
export function FluorescenceDiagram() {
  const id = "dg-fluor";
  return (
    <Frame
      id={id}
      viewBox="0 0 440 240"
      title="Energy levels in fluorescence"
      desc="Two bands of energy levels, ground at the bottom and excited at the top. A blue arrow rises from ground to the top of the excited band: excitation. A short wavy line drops within the excited band: relaxation without light. A green arrow falls from the excited band to ground: emission of a lower-energy photon."
    >
      {[26, 50, 74].map((y, i) => (
        <path key={y} d={`M90 ${y}H400`} stroke={i === 2 ? C.clinical : C.fog} strokeOpacity={i === 2 ? 0.9 : 0.4} strokeWidth={i === 2 ? 2 : 1} />
      ))}
      {[170, 186, 200].map((y, i) => (
        <path key={y} d={`M90 ${y}H400`} stroke={i === 2 ? C.clinical : C.fog} strokeOpacity={i === 2 ? 0.9 : 0.4} strokeWidth={i === 2 ? 2 : 1} />
      ))}
      <L x={80} y={54} anchor="end">EXCITED</L>
      <L x={80} y={190} anchor="end">GROUND</L>
      <path d="M150 200V30" stroke={C.blue300} strokeWidth={3} markerEnd={`url(#${id}-b)`} />
      <path
        d="M240 26q6 5 0 10t0 10 0 10 0 10"
        stroke={C.fog}
        strokeWidth={2.5}
        fill="none"
        markerEnd={`url(#${id}-f)`}
      />
      <path d="M330 74V196" stroke={C.icg} strokeWidth={3} markerEnd={`url(#${id}-g)`} />
      <L x={150} y={228}>EXCITATION</L>
      <L x={240} y={228}>RELAXATION</L>
      <L x={330} y={228}>EMISSION</L>
    </Frame>
  );
}

/** 06, 07 · Supply, controller, delivery and site, with pressure feedback. */
export function LoopDiagram({
  id,
  title,
  desc,
  steps,
}: {
  id: string;
  title: string;
  desc: string;
  steps: [string[], string[], string[], string[]];
}) {
  const xs = [6, 122, 238, 354];
  return (
    <Frame id={id} viewBox="0 0 460 180" title={title} desc={desc}>
      {steps.map((lines, i) => (
        <g key={i}>
          <Box x={xs[i]} y={30} w={100} h={60} lines={lines} accent={i === 3} />
          {i < 3 && (
            <path
              d={`M${xs[i] + 100} 60H${xs[i + 1] - 4}`}
              stroke={C.clinical}
              strokeWidth={2}
              markerEnd={`url(#${id}-w)`}
            />
          )}
        </g>
      ))}
      <path
        d="M404 90V132H172V96"
        stroke={C.blue300}
        strokeWidth={2}
        strokeDasharray="4 2"
        fill="none"
        className={flow}
        markerEnd={`url(#${id}-b)`}
      />
      <L x={288} y={154}>PRESSURE FEEDBACK*</L>
    </Frame>
  );
}

/** 08 · Monopolar and bipolar current paths. */
export function ElectrosurgeryDiagram() {
  const id = "dg-rf";
  const current = {
    stroke: C.blue300,
    strokeWidth: 2.5,
    strokeDasharray: "4 2",
    fill: "none",
    className: flow,
  };
  return (
    <Frame
      id={id}
      viewBox="0 0 460 250"
      title="Monopolar and bipolar circuits"
      desc="Left, monopolar: current flows from the generator to an active electrode, through the patient, to a separate return electrode and back to the generator. Right, bipolar: current flows from the generator to electrode A, through the tissue held between the jaws, to electrode B and back."
    >
      {/* monopolar */}
      <Box x={24} y={18} w={96} h={40} lines={["GENERATOR"]} />
      <path d="M120 38H160V72" {...current} />
      <rect x={153} y={72} width={14} height={32} rx={3} fill={C.navy600} stroke={C.fog} strokeOpacity={0.7} />
      <path d="M153 104h14l-7 12z" fill={C.clinical} />
      <rect x={30} y={124} width={186} height={46} rx={22} fill={C.navy600} stroke={C.fog} strokeOpacity={0.4} />
      <L x={104} y={144} colour={C.clinical}>PATIENT</L>
      <path d="M160 118C150 150 110 168 74 182" {...current} />
      <rect x={34} y={182} width={80} height={10} rx={4} fill={C.blue300} fillOpacity={0.55} />
      <path d="M34 187H12V44H24" {...current} />
      <L x={74} y={210}>RETURN ELECTRODE</L>
      <L x={110} y={240} colour={C.clinical}>MONOPOLAR</L>

      {/* bipolar */}
      <Box x={262} y={18} w={96} h={40} lines={["GENERATOR"]} />
      <path d="M358 46H378V100" {...current} />
      <path d="M358 30H440V100" {...current} />
      <rect x={372} y={100} width={12} height={54} rx={4} fill={C.navy600} stroke={C.fog} strokeOpacity={0.7} />
      <rect x={434} y={100} width={12} height={54} rx={4} fill={C.navy600} stroke={C.fog} strokeOpacity={0.7} />
      <rect x={386} y={112} width={46} height={30} rx={8} fill={C.navy700} stroke={C.fog} strokeOpacity={0.4} />
      <path d="M388 127H428" {...current} markerEnd={`url(#${id}-b)`} />
      <L x={378} y={172}>A</L>
      <L x={440} y={172}>B</L>
      <L x={409} y={192}>TISSUE</L>
      <L x={350} y={240} colour={C.clinical}>BIPOLAR</L>
    </Frame>
  );
}

/** 09 · Generator, piezoelectric transducer, waveguide, blade. */
export function UltrasonicDiagram() {
  const id = "dg-us";
  const wave = Array.from({ length: 10 }, (_, i) => `q8 ${i % 2 ? 6 : -6} 16 0`).join(" ");
  return (
    <Frame
      id={id}
      viewBox="0 0 460 170"
      title="Ultrasonic energy path"
      desc="A generator sends electrical energy to a piezoelectric transducer in the handpiece. The transducer vibrates, a waveguide carries the vibration along the shaft, and the blade at the tip moves back and forth."
    >
      <Box x={6} y={56} w={96} h={50} lines={["GENERATOR"]} />
      <path d="M102 81H150" stroke={C.clinical} strokeWidth={2} />
      <rect x={150} y={56} width={82} height={50} rx={12} fill={C.navy700} stroke={C.fog} strokeOpacity={0.6} />
      {[162, 174, 186, 198, 210].map((x) => (
        <rect key={x} x={x} y={64} width={7} height={34} rx={2} fill={C.blue300} fillOpacity={0.75} />
      ))}
      <rect x={232} y={76} width={168} height={10} rx={3} fill={C.fog} fillOpacity={0.55} />
      <path d={`M236 66 ${wave}`} stroke={C.blue300} strokeWidth={1.5} fill="none" />
      <path d="M400 74 442 80V82L400 88z" fill={C.clinical} />
      <path
        d="M402 54H442"
        stroke={C.blue300}
        strokeWidth={2}
        markerStart={`url(#${id}-b)`}
        markerEnd={`url(#${id}-b)`}
      />
      <L x={191} y={128}>TRANSDUCER</L>
      <L x={316} y={108}>WAVEGUIDE</L>
      <L x={422} y={108}>BLADE</L>
      <L x={422} y={42} size={10}>MOTION</L>
    </Frame>
  );
}
