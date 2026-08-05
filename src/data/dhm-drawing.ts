/**
 * The hand-drawn floor plan's own geometry, and the one fit that places it.
 *
 * This is the figure's shape. Every wall a room stands on below is traced off the
 * source article's fourth-floor sheet — a 1280 px square photograph of a drawing —
 * and the drawing is then scaled, turned and moved onto the surveyed frame in
 * `./dhm-site` as one rigid piece. Nothing is stretched to fit: a similarity has
 * three degrees of freedom and no fourth, so the drawing keeps its own proportions
 * and the photograph underneath is what has to be met, rather than the other way
 * round.
 *
 * That is a change of authority. The walls used to be the survey's, with the drawing
 * consulted only for how many rooms stood on each; every wing's rooms were then the
 * survey's wall divided by the drawing's count. It went wrong wherever the count was
 * short. The harbour arm was the worst of it: the drawing gives that arm twenty-seven
 * bays and only twenty-one of them are numbered rooms — two are suites three bays
 * wide, two are the dead wedges the arm's bends leave — so dividing the arm by
 * twenty-one made every room on it a quarter too wide and carried the tip's rooms,
 * 4369 to 4375, most of twenty metres past the point of the building.
 *
 * Taking the drawing whole cannot make that mistake, and there are two checks on it.
 * Ten corners of the building are named by both the drawing and the survey; over
 * those ten the fit is out by 2.4 m on average and 5.4 m at worst, on a building
 * 210 m across. What comes out of it is a room's frontage of 3.9 to 5.0 m on every
 * one of the eight walls, which is what a 37 m² room 9.8 m deep has, and nothing was
 * fitted to make that happen — it is eight independent readings of a hand drawing
 * agreeing with a survey none of them was measured against.
 *
 * The second check is cell by cell. The drawing's own cells can be had without
 * reference to any of this — its ink is closed, so every cell is a white region shut
 * in by it — and paired with the nearest cell this figure draws, the fourth floor's
 * 165 of them come out 0.9 m apart at the median and 2.2 m at the ninth decile. The
 * few that are further out are the drawing's corridors, stairs and the chapel, which
 * have no cell of the figure to pair with at all.
 *
 * Where the two still differ is width. The drawing draws its wings 21.8 m across;
 * the survey measures the harbour arm at 24.4. The drawing wins here, as everywhere
 * else, so the rooms sit a metre inside the roofs in the photograph rather than out
 * over the eaves.
 */

import { FRONTAGE_WALL, TAIL_WALL, type Point } from './dhm-site';

/** A point on the drawing sheet, in its own pixels: x right, y down. */
export type Pixel = readonly [number, number];

/**
 * The corners the fit is made on: the ones the drawing and the surveyed outline both
 * name, in the order they are walked.
 *
 * Eight are the frontage's own corners and two the tail's, so the survey side of the
 * table is not written out here — it is read straight off `./dhm-site`, and moving a
 * vertex there refits the drawing rather than leaving the two to disagree quietly.
 */
export const DRAWING_LANDMARKS: { at: Pixel; to: Point; is: string }[] = [
  { at: [273, 255], to: FRONTAGE_WALL[0]!, is: 'the dog-leg near the north-west wing’s far end' },
  { at: [484, 455], to: FRONTAGE_WALL[1]!, is: 'that wing meeting the north spine' },
  { at: [769, 456], to: FRONTAGE_WALL[2]!, is: 'the two spines meeting' },
  { at: [769, 800], to: FRONTAGE_WALL[3]!, is: 'the south spine meeting the harbour arm' },
  { at: [606, 796], to: FRONTAGE_WALL[4]!, is: 'the arm’s first bend' },
  { at: [439, 859], to: FRONTAGE_WALL[5]!, is: 'its second' },
  { at: [334, 972], to: FRONTAGE_WALL[6]!, is: 'its third, where the tip begins' },
  { at: [320, 1042], to: FRONTAGE_WALL[7]!, is: 'the point of the tip' },
  { at: [1017, 1033], to: TAIL_WALL[0]!, is: 'the south-eastern tail’s head' },
  { at: [1022, 1262], to: TAIL_WALL[1]!, is: 'its far end' },
];

/**
 * The similarity taking sheet pixels to metres about the hotel centre, by least
 * squares over those corners.
 *
 * Umeyama's solution, which is the closed form: bring both sets of corners to their
 * centres, and the turn and the scale that best line them up fall out of one sum over
 * the pairs. Three degrees of freedom and no fourth, so the drawing can be scaled,
 * turned and moved but not stretched.
 */
function fitLandmarks(): { metresPerPixel: number; turn: number; shift: Point } {
  const n = DRAWING_LANDMARKS.length;
  const centre = (of: (p: (typeof DRAWING_LANDMARKS)[number]) => Point): Point => {
    let x = 0;
    let y = 0;
    for (const p of DRAWING_LANDMARKS) {
      x += of(p)[0];
      y += of(p)[1];
    }
    return [x / n, y / n];
  };
  const ca = centre((p) => p.at);
  const cb = centre((p) => p.to);
  let along = 0;
  let across = 0;
  let spread = 0;
  for (const p of DRAWING_LANDMARKS) {
    const [x, y] = [p.at[0] - ca[0], p.at[1] - ca[1]];
    const [u, v] = [p.to[0] - cb[0], p.to[1] - cb[1]];
    along += x * u + y * v;
    across += x * v - y * u;
    spread += x * x + y * y;
  }
  const turn = Math.atan2(across, along);
  const scale = Math.hypot(along, across) / spread;
  const [c, s] = [Math.cos(turn) * scale, Math.sin(turn) * scale];
  return {
    metresPerPixel: scale,
    /** Degrees the sheet is turned to bring it to north-up. */
    turn: (turn * 180) / Math.PI,
    shift: [cb[0] - (c * ca[0] - s * ca[1]), cb[1] - (s * ca[0] + c * ca[1])],
  };
}

export const DRAWING_FIT = fitLandmarks();

const RADIANS = (DRAWING_FIT.turn * Math.PI) / 180;
const COS = Math.cos(RADIANS) * DRAWING_FIT.metresPerPixel;
const SIN = Math.sin(RADIANS) * DRAWING_FIT.metresPerPixel;

/** One point of the drawing, in metres about the hotel centre. */
export function place([x, y]: Pixel): Point {
  return [
    COS * x - SIN * y + DRAWING_FIT.shift[0],
    SIN * x + COS * y + DRAWING_FIT.shift[1],
  ];
}

const round = (p: Point): Point => [Math.round(p[0] * 10) / 10, Math.round(p[1] * 10) / 10];

export interface DrawnWall {
  /** The wall in sheet pixels, in the order the run's rooms are numbered. */
  line: Pixel[];
  /** The side of it the building stands on, read off the drawing. */
  inward: 'left' | 'right';
  /** Which row of the run's two stands on this wall, the other being behind it. */
  face: 'left' | 'right';
  /**
   * The wall the run's lead-in slots stand on, where they are round a corner from
   * this one. Only its bearing is used: the lead is carried back along it by the
   * run's own room width, so a wing whose plan turns before its wall does keeps the
   * turn.
   */
  lead?: Pixel[];
}

/**
 * The wall every run's numbered row stands on, traced off the drawing.
 *
 * Traced from the drawing's own outline rather than by eye: the sheet's ink is
 * closed, so filling the paper from the outside leaves the building as the one hole
 * and its boundary is the outline. Bumps shallower than about ten pixels — two
 * metres — are left out, because they are balconies and doorways rather than
 * corners, and a wall that keeps them is a zigzag no room can stand across.
 *
 * Which row stands on the wall is the drawing's too, and it is not always the one
 * the view names would suggest. The south-eastern wing's twelve bays are drawn on
 * its north-eastern face, with 4402 at the head of them; its other row has ten bays
 * and two lift lobbies at the head, which is what puts 4405 opposite 4406.
 */
export const DRAWN_WALLS: Record<string, DrawnWall> = {
  nw: {
    line: [[273, 255], [484, 455]],
    inward: 'left',
    face: 'right',
    lead: [[223, 131], [241, 181], [273, 255]],
  },
  'spine-n': { line: [[484, 455], [743, 457]], inward: 'left', face: 'right' },
  corner: { line: [[729, 473], [749, 491]], inward: 'left', face: 'right' },
  'spine-s': { line: [[769, 478], [769, 812]], inward: 'left', face: 'right' },
  east: { line: [[895, 463], [1030, 464]], inward: 'left', face: 'right' },
  /**
   * The three rooms that turn the corner out of the south spine before the harbour
   * arm's own wall begins, on the short south face the drawing gives them.
   *
   * They are a wall of their own and not the head of the arm because the building
   * steps here: this face is seven metres shallower than the arm's, so rooms carried
   * back along the arm's wall come out that far outside the drawing's.
   */
  'sw-head': { line: [[831, 875], [751, 875]], inward: 'right', face: 'left' },
  sw: {
    line: [[746, 800], [606, 796], [439, 859], [334, 972], [320, 1042], [355, 1119]],
    inward: 'left',
    face: 'right',
  },
  se: { line: [[928, 800], [1123, 987]], inward: 'right', face: 'left' },
  'se-tail': { line: [[1017, 1033], [1022, 1262]], inward: 'left', face: 'left' },
};

/** The same walls in metres, which is what the figure is drawn from. */
export const DRAWN_WALLS_M: Record<string, { line: Point[]; lead?: Point[] }> =
  Object.fromEntries(
    Object.entries(DRAWN_WALLS).map(([key, wall]) => [
      key,
      {
        line: wall.line.map((p) => round(place(p))),
        ...(wall.lead ? { lead: wall.lead.map((p) => round(place(p))) } : {}),
      },
    ]),
  );

/**
 * How deep a row of rooms is, and how wide the corridor between two rows.
 *
 * Measured off the drawing rather than worked out from a room's floor area: a line
 * cast across each wing from its outer wall crosses the row's back at 47 to 61 px
 * and the corridor's far side 10 to 13 px later, on nine wings, so a row is 53 px
 * deep and a corridor 12 px wide. At the fit's scale that is 9.8 m and 2.2 m, and a
 * wing 21.8 m across.
 *
 * At 9.8 m deep and the 4.3 m of frontage the walls give it, a bay is 42 m² for a
 * 37 m² room — the nine tenths of gross to net a hotel corridor runs at once its
 * party walls, risers and balconies are counted.
 */
export const DRAWN_ROW_DEPTH = Math.round(53 * DRAWING_FIT.metresPerPixel * 100) / 100;
export const DRAWN_CORRIDOR = Math.round(12 * DRAWING_FIT.metresPerPixel * 100) / 100;

/**
 * How far each landmark ends up from the corner it was fitted to, which is the check
 * on the fit and is thrown if it goes badly wrong.
 *
 * Ten corners over a building 210 m across, and the drawing is a schematic: 2.4 m on
 * average and 5.4 m at worst is as close as a hand drawing gets without being
 * stretched, and stretching it is the one thing that would defeat the point.
 */
export const DRAWING_FIT_ERROR: number[] = DRAWING_LANDMARKS.map((p) => {
  const at = place(p.at);
  return Math.round(Math.hypot(at[0] - p.to[0], at[1] - p.to[1]) * 10) / 10;
});

if (Math.max(...DRAWING_FIT_ERROR) > 8) {
  throw new Error(`dhm-drawing: the fit is ${Math.max(...DRAWING_FIT_ERROR)} m out somewhere`);
}
