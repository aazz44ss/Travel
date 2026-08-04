/**
 * Where every MiraCosta room's window faces, floor by floor.
 *
 * Traced from dhoteloo's hand-drawn floor plans of levels 2 to 5, which number
 * every cell on the plan, cross-checked against the same article's per-type room
 * number lists and against its photographs of the facade from across
 * Mediterranean Harbor, where each window is annotated with its room type.
 *
 * What is faithful here: which corridor a room is on, its order along that
 * corridor, which side of the corridor it opens from, and therefore which way it
 * looks. Positions also stack, because each corridor is divided into as many
 * slots as the fullest floor has rooms and every floor uses the same slots, so
 * room 3313 sits directly under 5313 and a fifth-floor Terrace Room covering two
 * positions is drawn twice as wide as the standard room below it.
 *
 * Where those corridors run is measured rather than drawn. The plans' own angles
 * are not used: they are schematic, and comparing them against the surveyed
 * outline in `./dhm-site` shows the drawing standing the north-west wing some 30
 * degrees steeper than the building does. What is used instead is the plans' room
 * counts, shared out along the measured frontage — which is the check on both,
 * because the count and the metres agree to within a tenth.
 *
 * What is still not faithful: two rooms of the same frontage and different floor
 * area, a 37 m² Superior and a 60 m² Harbor Room, are drawn the same size, and the
 * inland row's own back wall is nowhere measured. So read a cell as "this
 * position, this orientation", and read its depth as a standard room's.
 *
 * Two things the plans show that the article's text does not:
 *
 * - The Partial View rooms it never lists individually are marked on the plan,
 *   at the far north-west end of the Toscana-facing wing and at the inside
 *   corner where the harbour arm turns. Their numbers are recorded here, tagged
 *   as coming from the plan rather than from the enumerated lists.
 * - The inland side of every corridor. Those rooms are on the Venezia and
 *   Toscana sides of the building, sold without a view grade, and they are what
 *   makes the harbour-facing side legible: half of each corridor never sees the
 *   water at all.
 */

import { FRONTAGE_WALL, TAIL_WALL, interiorSide, type Point } from './dhm-site';

/** Which way a room's window looks, once the building is walked. */
export type Facing =
  /** Onto Mediterranean Harbor, the water the shows are staged on. */
  | 'harbour'
  /** Onto Piazza Topolino and the harbour-town streets in front of the hotel. */
  | 'piazza'
  /** Onto the Palazzo Canals side. */
  | 'canal'
  /** Toward the Tokyo DisneySea entrance and the AquaSphere. */
  | 'entrance'
  /** Inland: a courtyard, a roof, or the back of the building. */
  | 'inland';

export interface PlanRun {
  key: string;
  /** Rooms on the left of the walking direction, in order. */
  left: { facing: Facing; floors: Record<number, string[]> };
  /** Rooms on the right of the walking direction, in order. */
  right: { facing: Facing; floors: Record<number, string[]> };
}

/**
 * The building is a wishbone wrapped around the harbour: a wing coming down
 * from the north-west, a short spine running east to the chapel, a longer spine
 * running south, and a wing curving away to the south-west. Two further wings —
 * east of the chapel and south-east of the south spine — face away from the
 * water entirely.
 */
export const PLAN_RUNS: PlanRun[] = [
  {
    key: 'nw',
    left: {
      facing: 'inland',
      floors: {
        5: ['5154', '5152', '5150', '5148', '5146', '5144', '5142', '5140', '5138', '5130', '5128'],
        4: ['4154', '4152', '4150', '4148', '4146', '4144', '4142', '4140', '4138', '4130', '4128'],
        3: ['3154', '3152', '3150', '3148', '3146', '3144', '3142', '3140', '3138', '3130', '3128'],
      },
    },
    right: {
      facing: 'piazza',
      floors: {
        5: ['5153', '5149', '5145', '5141', '5137', '5135', '5133', '5131', '5129', '5127', '5125', '5123'],
        4: ['4153', '4151', '4149', '4147', '4145', '4143', '4141', '4139', '4137', '4135', '4133', '4131', '4129', '4127', '4125', '4123'],
        3: ['3153', '3151', '3149', '3147', '3145', '3143', '3141', '3139', '3137', '3135', '3133', '3131', '3129', '3127', '3125', '3123'],
      },
    },
  },
  {
    key: 'spine-n',
    left: {
      facing: 'inland',
      floors: {
        5: ['5122', '5120', '5118', '5116', '5114', '5112', '5110', '5108', '5106', '5104'],
        4: ['4122', '4120', '4118', '4116', '4114', '4112', '4110', '4108', '4106', '4104'],
        3: ['3122', '3120', '3118', '3116', '3114', '3112', '3110', '3108', '3106', '3104'],
      },
    },
    right: {
      facing: 'piazza',
      floors: {
        5: ['5121', '5119', '5117', '5115', '5113', '5111', '5109', '5107'],
        4: ['4121', '4119', '4117', '4115', '4113', '4111', '4109', '4107', '4105'],
        3: ['3121', '3119', '3117', '3115', '3113', '3111', '3109', '3107', '3105'],
      },
    },
  },
  {
    key: 'east',
    left: {
      facing: 'inland',
      floors: {
        5: ['5202', '5204', '5206', '5208', '5210'],
        4: ['4202', '4204', '4206', '4208', '4210'],
        3: ['3202', '3204', '3206', '3208', '3210'],
      },
    },
    right: {
      facing: 'canal',
      floors: {
        5: ['5201', '5203', '5205', '5207', '5209', '5211'],
        4: ['4201', '4203', '4205', '4207', '4209', '4211'],
        3: ['3201', '3203', '3205', '3207', '3209', '3211'],
      },
    },
  },
  {
    /** The accessible rooms sit in the corner where the two spines meet. */
    key: 'corner',
    left: { facing: 'inland', floors: {} },
    right: { facing: 'piazza', floors: { 4: ['4103'], 3: ['3103'] } },
  },
  {
    key: 'spine-s',
    left: {
      facing: 'inland',
      floors: {
        5: ['5306', '5308', '5310', '5312', '5314', '5316', '5318', '5320', '5322', '5324', '5326', '5328'],
        4: ['4306', '4308', '4310', '4312', '4314', '4316', '4318', '4320', '4322', '4324', '4326', '4328'],
        3: ['3306', '3308', '3310', '3312', '3314', '3316', '3318', '3320', '3322', '3324', '3326', '3328'],
      },
    },
    right: {
      facing: 'harbour',
      floors: {
        5: ['5301', '5303', '5313', '5315', '5317', '5319', '5321', '5323', '5325', '5327'],
        4: ['4101', '4301', '4303', '4305', '4307', '4309', '4311', '4313', '4315', '4317', '4319', '4321', '4323', '4325', '4327'],
        3: ['3101', '3301', '3303', '3305', '3307', '3309', '3311', '3313', '3315', '3317', '3319', '3321', '3323', '3325', '3327'],
        2: ['2325', '2327'],
      },
    },
  },
  {
    key: 'sw',
    left: {
      facing: 'inland',
      floors: {
        5: ['5336', '5338', '5340', '5342', '5344', '5348', '5352', '5356', '5362', '5366'],
        4: ['4334', '4336', '4338', '4340', '4342', '4344', '4346', '4348', '4350', '4352', '4354', '4356', '4358', '4360', '4362', '4364', '4366', '4368', '4374', '4376'],
        3: ['3334', '3336', '3338', '3340', '3342', '3344', '3346', '3348', '3350', '3352', '3354', '3356', '3358', '3360', '3362', '3364', '3366', '3368', '3374', '3376'],
        2: ['2334', '2336', '2338', '2340', '2342', '2344', '2348', '2350', '2352', '2354', '2356', '2358', '2362', '2364', '2366', '2368', '2374', '2376'],
      },
    },
    right: {
      facing: 'harbour',
      floors: {
        5: ['5335', '5337', '5339', '5341', '5343', '5345', '5349', '5353', '5357', '5361', '5365', '5369', '5371'],
        4: ['4335', '4337', '4339', '4341', '4343', '4345', '4347', '4349', '4351', '4353', '4355', '4357', '4359', '4361', '4363', '4365', '4367', '4369', '4371', '4373', '4375'],
        3: ['3335', '3337', '3339', '3341', '3343', '3345', '3347', '3349', '3351', '3353', '3355', '3357', '3359', '3361', '3363', '3365', '3367', '3369', '3371', '3373', '3375'],
        2: ['2335', '2337', '2339', '2341', '2343', '2345', '2347', '2349', '2351', '2353', '2355', '2357', '2359', '2361', '2363', '2365', '2367', '2369', '2371', '2373', '2375'],
      },
    },
  },
  {
    key: 'se',
    left: {
      facing: 'inland',
      floors: {
        5: ['5402', '5404', '5406', '5408', '5410', '5412', '5414', '5416', '5418', '5420', '5422', '5424'],
        4: ['4402', '4404', '4406', '4408', '4410', '4412', '4414', '4416', '4418', '4420', '4422', '4424'],
        3: ['3402', '3404', '3406', '3408', '3410', '3412', '3414', '3416', '3418', '3420', '3422', '3424'],
        2: ['2402', '2404', '2406', '2408', '2410', '2412', '2414', '2416', '2418', '2420', '2422', '2424'],
      },
    },
    right: {
      facing: 'entrance',
      floors: {
        5: ['5405', '5407', '5409', '5411', '5413', '5415', '5417', '5419'],
        4: ['4405', '4407', '4409', '4411', '4413', '4415', '4417', '4419'],
        3: ['3405', '3407', '3409', '3411', '3413', '3415', '3417', '3419'],
        2: ['2405', '2407', '2409', '2411', '2413', '2415', '2417', '2419'],
      },
    },
  },
  {
    key: 'se-tail',
    left: {
      facing: 'entrance',
      floors: {
        5: ['5423', '5425', '5427', '5429', '5431', '5433', '5435', '5437', '5439', '5441'],
        4: ['4423', '4425', '4427', '4429', '4431', '4433', '4435', '4437', '4439', '4441'],
        3: ['3423', '3425', '3427', '3429', '3431', '3433', '3435', '3437', '3439', '3441'],
        2: ['2423', '2425', '2427', '2429', '2431', '2433', '2435', '2437', '2439', '2441'],
      },
    },
    right: { facing: 'inland', floors: {} },
  },
];

/** How deep a room is drawn: 37 m² over the frontage the measurement gives it. */
export const ROOM_DEPTH = 8.8;
/** The corridor the two rows of rooms open onto. */
export const CORRIDOR = 2.0;

/**
 * Which walls of the measured frontage each wing stands on.
 *
 * `FRONTAGE_WALL` is six straight walls and the plans put 63 room positions along
 * them, in this order, so the two can be matched. A wing is given whole walls, not
 * a share of the total, for two reasons: the frontage's own corners then fall
 * between wings, where the plans put them, rather than in the middle of a room
 * that would have to bend round one; and each wing's rooms come out the width its
 * own wall gives them instead of an average over the building.
 *
 * That the match works at all is the check on the plans. Wall by wall it gives
 * 3.92, 3.94 and 4.33 m of frontage a room, against the 4.37 m a 37 m² room has if
 * it is 8.5 m deep — so either the rooms are within a tenth of that, or they are
 * exactly it and a little deeper. Nothing here was fitted to make that come out.
 */
const FRONTAGE_GROUPS: { keys: string[]; from: number; to: number }[] = [
  { keys: ['nw', 'spine-n', 'corner'], from: 0, to: 2 },
  { keys: ['spine-s'], from: 2, to: 3 },
  { keys: ['sw'], from: 3, to: 6 },
];

/** How much frontage the chapel takes between the north spine and the east wing. */
const CHAPEL_SLOTS = 5;

export interface RunWall {
  /** The outer wall the run's rooms open from, in metres, in walking order. */
  line: [number, number][];
  /** The side of it the building stands on, which both rows of rooms are on. */
  inward: 'left' | 'right';
  /** Which side of the corridor is the row against that wall. */
  face: 'left' | 'right';
  /** False where the outline gave no wall and one had to be carried on. */
  measured: boolean;
}

const lineLength = (line: readonly Point[]): number =>
  line.slice(1).reduce((sum, p, i) => sum + Math.hypot(p[0] - line[i]![0], p[1] - line[i]![1]), 0);

/** The point and heading at a distance along a polyline, extrapolating past its end. */
function pointAt(
  line: readonly Point[],
  d: number,
): { at: [number, number]; u: [number, number] } {
  let travelled = 0;
  for (let i = 1; i < line.length; i += 1) {
    const a = line[i - 1]!;
    const b = line[i]!;
    const len = Math.hypot(b[0] - a[0], b[1] - a[1]);
    if (d <= travelled + len || i === line.length - 1) {
      const u: [number, number] = [(b[0] - a[0]) / len, (b[1] - a[1]) / len];
      const k = d - travelled;
      return { at: [a[0] + u[0] * k, a[1] + u[1] * k], u };
    }
    travelled += len;
  }
  throw new Error('dhm-plan: pointAt needs at least two points');
}

/** The piece of a polyline between two distances along it, its corners kept. */
function sliceLine(
  line: readonly Point[],
  from: number,
  to: number,
): [number, number][] {
  const out: [number, number][] = [pointAt(line, from).at];
  let travelled = 0;
  for (let i = 1; i < line.length; i += 1) {
    if (travelled > from + 0.05 && travelled < to - 0.05) out.push([...line[i - 1]!]);
    travelled += Math.hypot(line[i]![0] - line[i - 1]![0], line[i]![1] - line[i - 1]![1]);
  }
  out.push(pointAt(line, to).at);
  return out;
}

/**
 * A polyline moved sideways, its corners mitred so the shift holds through them.
 *
 * Moving each corner along its own segment's normal would pull the line in at
 * every bend, which on a wall that turns 43 degrees leaves the row behind it
 * standing a metre and a half out of place.
 */
export function offsetLine(
  line: readonly Point[],
  side: 'left' | 'right',
  by: number,
): [number, number][] {
  const sign = side === 'left' ? -1 : 1;
  const normal = (a: Point, b: Point): [number, number] => {
    const len = Math.hypot(b[0] - a[0], b[1] - a[1]) || 1;
    return [(-(b[1] - a[1]) / len) * sign, ((b[0] - a[0]) / len) * sign];
  };
  return line.map((p, i) => {
    const before = i > 0 ? normal(line[i - 1]!, p) : null;
    const after = i + 1 < line.length ? normal(p, line[i + 1]!) : null;
    if (!before || !after) {
      const n = (before ?? after)!;
      return [p[0] + n[0] * by, p[1] + n[1] * by] as [number, number];
    }
    const len = Math.hypot(before[0] + after[0], before[1] + after[1]) || 1;
    const bisector: [number, number] = [(before[0] + after[0]) / len, (before[1] + after[1]) / len];
    /** The mitre reaches 1/cos(half the turn) further than the offset itself. */
    const cos = Math.max(0.35, bisector[0] * before[0] + bisector[1] * before[1]);
    return [p[0] + (bisector[0] * by) / cos, p[1] + (bisector[1] * by) / cos] as [number, number];
  });
}

/**
 * The wall every run's rooms stand on, built from the measurement and the counts.
 *
 * The three wings the frontage does not carry are the ones facing the canals and
 * the park entrance, and they are placed by carrying on the measured wall the
 * plans join them to:
 *
 * - The east wing is the north spine's wall continued past the chapel, which is
 *   how the plans draw it — one corridor, the chapel's octagon set into the middle
 *   of it, rooms on both sides of both halves.
 * - The tail has a wall of its own in the outline, `TAIL_WALL`.
 * - The south-east wing runs from the back of the south spine to where that tail
 *   starts, which is the corner the plans draw it between. Nothing sets its length
 *   but those two ends, and it comes out at 4.49 m a room — inside the range the
 *   frontage gives, which is the only check available on it.
 */
function buildWalls(): Record<string, RunWall> {
  const run = (key: string): PlanRun => PLAN_RUNS.find((r) => r.key === key)!;
  const slots = (key: string): number =>
    Math.max(...(['left', 'right'] as const).map((side) => slotsOf(run(key), side).length));
  /**
   * A measured wall can be asked which side the building is on. One that had to be
   * carried over open ground cannot, so it is told: the side its plans put the
   * inland row, which is the side the wall it continues has its own on.
   */
  const wall = (key: string, line: [number, number][], inward: 'left' | 'right' | null): RunWall => ({
    line,
    inward: inward ?? interiorSide(line),
    face: run(key).left.facing === 'inland' ? 'right' : 'left',
    measured: inward === null,
  });

  const arc = FRONTAGE_WALL.map((_, i) => lineLength(FRONTAGE_WALL.slice(0, i + 1)));
  const walls: Record<string, RunWall> = {};
  let pitch = 0;
  for (const group of FRONTAGE_GROUPS) {
    const room = arc[group.to]! - arc[group.from]!;
    pitch = room / group.keys.reduce((sum, key) => sum + slots(key), 0);
    let at = arc[group.from]!;
    for (const key of group.keys) {
      walls[key] = wall(key, sliceLine(FRONTAGE_WALL, at, at + slots(key) * pitch), null);
      at += slots(key) * pitch;
    }
  }
  /** `pitch` now holds the south-west wing's; the east wing wants the north's. */
  const north = (arc[2]! - arc[0]!) / FRONTAGE_GROUPS[0]!.keys.reduce((s, k) => s + slots(k), 0);

  const corner = walls['corner']!;
  const { at: end, u } = pointAt(corner.line, lineLength(corner.line));
  const chapel = CHAPEL_SLOTS * north;
  const from: [number, number] = [end[0] + u[0] * chapel, end[1] + u[1] * chapel];
  const reach = slots('east') * north;
  walls['east'] = wall(
    'east',
    [from, [from[0] + u[0] * reach, from[1] + u[1] * reach]],
    corner.inward,
  );

  walls['se-tail'] = wall('se-tail', [[...TAIL_WALL[0]!], [...TAIL_WALL[1]!]], null);

  const spine = walls['spine-s']!;
  const tip = pointAt(spine.line, lineLength(spine.line));
  const back = ROOM_DEPTH * 2 + CORRIDOR;
  const sign = spine.inward === 'left' ? -1 : 1;
  const behind: [number, number] = [
    tip.at[0] - tip.u[1] * back * sign,
    tip.at[1] + tip.u[0] * back * sign,
  ];
  walls['se'] = wall('se', [behind, [...TAIL_WALL[0]!]], spine.inward);

  return walls;
}

export const RUN_WALLS: Record<string, RunWall> = buildWalls();

/** Rooms the plan marks as Partial View although the type lists never number them. */
export const PARTIAL_VIEW_FROM_PLAN: string[] = [
  '3147', '3149', '3151', '3153',
  '4147', '4149', '4151', '4153',
  '2327', '3327', '4327', '5327',
];

export const PLAN_FLOORS = [5, 4, 3, 2] as const;

/** Every room the plan places, flattened, so counts cannot drift from the data. */
export function planRooms(): { number: string; facing: Facing; floor: number; run: string }[] {
  return PLAN_RUNS.flatMap((run) =>
    (['left', 'right'] as const).flatMap((side) =>
      Object.entries(run[side].floors).flatMap(([floor, numbers]) =>
        numbers.map((number) => ({
          number,
          facing: run[side].facing,
          floor: Number(floor),
          run: run.key,
        })),
      ),
    ),
  );
}

/**
 * The slots a run's side has, in walking order.
 *
 * Every floor stacks on the same structure, so the fullest floor defines the
 * positions and the others are a subset of it. Taking the union this way is what
 * makes a room sit in the same place on every floor — and what lets a room that
 * occupies two positions, like a fifth-floor Terrace Room, be drawn twice as
 * wide as the standard room below it.
 */
export function slotsOf(run: PlanRun, side: 'left' | 'right'): string[] {
  const floors = Object.values(run[side].floors);
  if (floors.length === 0) return [];
  const base = floors.reduce((longest, list) => (list.length > longest.length ? list : longest));
  const codes = base.map((number) => number.slice(1));
  for (const list of floors) {
    for (const number of list) {
      if (!codes.includes(number.slice(1))) {
        throw new Error(`dhm-plan: ${run.key} ${side} has ${number} outside the fullest floor`);
      }
    }
  }
  return codes;
}

/** Where each room on a floor starts, and how many slots it covers. */
export function spansOf(
  run: PlanRun,
  side: 'left' | 'right',
  floor: number,
): { number: string; start: number; span: number }[] {
  const slots = slotsOf(run, side);
  const numbers = run[side].floors[floor] ?? [];
  const starts = numbers.map((number) => slots.indexOf(number.slice(1)));
  return numbers.map((number, i) => ({
    number,
    start: starts[i]!,
    span: i === numbers.length - 1 ? 1 : starts[i + 1]! - starts[i]!,
  }));
}

/**
 * Where each slot along a wall begins, in metres.
 *
 * Dividing the wall evenly would leave a corner of it in the middle of a room, and
 * a room that turns a corner loses depth × tan(half the turn) off its back on each
 * side — 3.5 m of a 3.9 m room at the north-west wing's 43 degrees, which turns it
 * inside out. So every corner is moved onto the nearest slot boundary, never
 * further than half a room, and the rooms on either side share the difference: at
 * that 43 degree bend the move is 0.1 m over twelve rooms.
 */
function slotBounds(path: readonly Point[], slots: number): number[] {
  const total = lineLength(path);
  const step = total / slots;
  const arc = path.map((_, i) => lineLength(path.slice(0, i + 1)));
  const pinned = new Map<number, number>([
    [0, 0],
    [slots, total],
  ]);
  for (let i = 1; i < path.length - 1; i += 1) {
    const k = Math.round(arc[i]! / step);
    if (k > 0 && k < slots && !pinned.has(k)) pinned.set(k, arc[i]!);
  }
  const marks = [...pinned.keys()].sort((a, b) => a - b);
  const out: number[] = [];
  for (let i = 0; i + 1 < marks.length; i += 1) {
    const [from, to] = [marks[i]!, marks[i + 1]!];
    const [a, b] = [pinned.get(from)!, pinned.get(to)!];
    for (let k = from; k < to; k += 1) out.push(a + ((b - a) * (k - from)) / (to - from));
  }
  out.push(total);
  return out;
}

/**
 * A polygon's centre of area, which is where its number goes.
 *
 * Averaging the corners instead puts the number outside the room wherever the room
 * turns a corner of the frontage: the two ends of a wedge pull the average out past
 * its narrow side and onto the neighbour.
 */
function centroid(shape: readonly Point[]): Point {
  let twiceArea = 0;
  let x = 0;
  let y = 0;
  for (let i = 0; i < shape.length; i += 1) {
    const a = shape[i]!;
    const b = shape[(i + 1) % shape.length]!;
    const cross = a[0] * b[1] - b[0] * a[1];
    twiceArea += cross;
    x += (a[0] + b[0]) * cross;
    y += (a[1] + b[1]) * cross;
  }
  if (Math.abs(twiceArea) < 1e-9) return [shape[0]![0], shape[0]![1]];
  return [x / (3 * twiceArea), y / (3 * twiceArea)];
}

/**
 * Lays a run's rooms out along a wall: the polyline is divided into as many equal
 * slots as the fullest floor has rooms, and each room becomes a cell spanning its
 * own slots and reaching `depth` into the building.
 *
 * A room that spans one of the wall's corners turns with it, as the plans draw the
 * rooms at the frontage's corners turning. Its back follows the mitred offset of
 * the wall rather than a straight line between the two ends, which is what keeps it
 * a room: on the 43-degree bend in the north-west wing the straight line crosses
 * itself and the room comes out as a bow tie over its neighbour.
 */
export function layout(
  path: readonly Point[],
  slots: number,
  spans: { start: number; span: number }[],
  side: 'left' | 'right',
  depth: number,
): { points: string; cx: number; cy: number; angle: number; width: number }[] {
  if (slots === 0) return [];

  const bounds = slotBounds(path, slots);
  const back = offsetLine(path, side, depth);
  const arc = path.map((_, i) => lineLength(path.slice(0, i + 1)));
  const sign = side === 'left' ? -1 : 1;
  const round = (n: number) => Math.round(n * 10) / 10;
  /** The wall's own point `depth` into the building, perpendicular to it there. */
  const inner = (p: Point, u: Point): Point => [
    p[0] - u[1] * sign * depth,
    p[1] + u[0] * sign * depth,
  ];

  return spans.map(({ start, span }) => {
    const from = bounds[start]!;
    const to = bounds[Math.min(start + span, slots)]!;
    const front: Point[] = [pointAt(path, from).at];
    const rear: Point[] = [];
    for (let i = 1; i < path.length - 1; i += 1) {
      if (arc[i]! > from + 0.01 && arc[i]! < to - 0.01) {
        front.push(path[i]!);
        rear.push(back[i]!);
      }
    }
    front.push(pointAt(path, to).at);
    /**
     * The room's own edges, read off its ends rather than from the wall's arc
     * length, so that a room beginning exactly at a corner squares up to the wall it
     * is on and not to the one before it.
     */
    const heading = (p: Point, q: Point): Point => {
      const len = Math.hypot(q[0] - p[0], q[1] - p[1]) || 1;
      return [(q[0] - p[0]) / len, (q[1] - p[1]) / len];
    };
    /**
     * Two rooms meeting at a corner of the wall share it along its bisector, not
     * along a line square to either wall: square to both, on the inside of the turn,
     * they would take the same 30 m² of the corner twice.
     */
    const corner = (d: number): Point | null => {
      const i = arc.findIndex((v) => Math.abs(v - d) < 0.05);
      return i > 0 && i < path.length - 1 ? back[i]! : null;
    };
    const a = front[0]!;
    const b = front[front.length - 1]!;
    const shape: Point[] = [
      ...front,
      corner(to) ?? inner(b, heading(front[front.length - 2]!, b)),
      ...rear.reverse(),
      corner(from) ?? inner(a, heading(a, front[1]!)),
    ];
    const middle = centroid(shape);
    return {
      width: round(to - from),
      points: shape.map(([x, y]) => `${round(x)},${round(y)}`).join(' '),
      cx: round(middle[0]),
      cy: round(middle[1]),
      /** Kept upright: a run walked leftwards would otherwise read upside down. */
      angle: (() => {
        const raw = Math.round((Math.atan2(b[1] - a[1], b[0] - a[0]) * 180) / Math.PI);
        return raw > 90 ? raw - 180 : raw < -90 ? raw + 180 : raw;
      })(),
    };
  });
}
