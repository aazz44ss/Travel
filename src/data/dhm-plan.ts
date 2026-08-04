/**
 * Where every MiraCosta room's window faces, floor by floor.
 *
 * Traced from dhoteloo's hand-drawn floor plans of levels 2 to 5, which number
 * every cell on the plan, cross-checked against the same article's per-type room
 * number lists and against its photographs of the facade from across
 * Mediterranean Harbor, where each window is annotated with its room type.
 *
 * What is faithful here: which corridor a room is on, its position along that
 * corridor, which side of the corridor it opens from, and therefore which way it
 * looks.
 *
 * A corridor is divided into the structural bays the plans draw along it, and both
 * of its rows of rooms are written out against those same bays. That is what makes
 * the figure agree with the drawing rather than merely resemble it: a floor's row is
 * a bay-by-bay line, so 4306 lands opposite 4305 with the two lift lobbies above it
 * written out as gaps, 3313 sits directly under 5313, and a fifth-floor Terrace Room
 * over two bays comes out twice as wide as the standard room below it. Rows that
 * are shorter than the one opposite — because a stair core or a lift lobby takes
 * part of them — stay the width of a room instead of being stretched to fill the
 * wing.
 *
 * Where those corridors run is measured rather than drawn. The plans' lengths and
 * angles are not used, because they are schematic: on one sheet the south spine's
 * rooms are drawn half again as wide as the north spine's, and no wall of the
 * building is anything like that. What the plans are trusted for is the count — how
 * many bays a corridor has and which of them it turns at — and each corridor is then
 * stood on the wall of the surveyed outline in `./dhm-site` that runs where the plans
 * put it. The two agree to within a tenth on three walls of the four, which is the
 * check on both.
 *
 * What is still not faithful: two rooms of the same frontage and different floor
 * area, a 37 m² Superior and a 60 m² Harbor Room, are drawn the same size, and the
 * inland row's own back wall is nowhere measured. So read a cell as "this
 * position, this orientation", and read its depth as a standard room's. The
 * north-west wing's rooms also come out an eighth wider than the rest, and nothing
 * available here settles whether they are wider or the plans miscount the wing by a
 * room.
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

import {
  FRONTAGE_WALL,
  NW_TIP_WALL,
  TAIL_WALL,
  interiorSide,
  type Point,
} from './dhm-site';

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
  /** Which way the rooms on each side of the corridor look. */
  facing: { left: Facing; right: Facing };
  /**
   * A corridor's two rows of rooms, floor by floor, one word per slot in walking
   * order: a room number, `-` for a slot that holds no guest room, or a number
   * written twice where one room takes two slots.
   *
   * Both rows of a run have the same number of slots, because they are the same
   * structural bays seen from either side of the corridor, so the two lines can be
   * read against each other exactly as the plans draw them: 4306 opposite 4305,
   * and the three slots of lift lobby above it that push it there. A side left out
   * has no guest room on that floor at all.
   */
  floors: Record<number, { left?: string; right?: string }>;
  /**
   * Slots at the head of the run that lie before its share of the frontage.
   *
   * Two runs have them, for different reasons. The north-west wing's first four are
   * round the dog-leg the plans draw near its far end, on the measured wall named in
   * `LEAD_WALLS`. The south-west wing's first three are its inland row turning the
   * corner out of the south spine before its harbour row does, which is what a row
   * on the outside of a 94-degree turn does; they are carried on the wing's own
   * bearing, because that is the only wall they have.
   */
  lead?: number;
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
    /**
     * Slots 0 to 3 are round the dog-leg at the wing's far end, on a wall of their
     * own. Blank slots 9 to 11 are the wing's stair and lift core, 14 the corner
     * where the wing meets the north spine.
     */
    key: 'nw',
    lead: 4,
    facing: { left: 'inland', right: 'piazza' },
    floors: {
      5: {
        left:  '5154 5152 5150 5148 5146 5144 5142 5140 5138    -    -    - 5130 5128    -',
        right: '5153 5153 5149 5149 5145 5145 5141 5141 5137 5135 5133 5131 5129 5127 5125',
      },
      4: {
        left:  '4154 4152 4150 4148 4146 4144 4142 4140 4138    -    -    - 4130 4128    -',
        right: '4153 4151 4149 4147 4145 4143 4141 4139 4137 4135 4133 4131 4129 4127 4125',
      },
      3: {
        left:  '3154 3152 3150 3148 3146 3144 3142 3140 3138    -    -    - 3130 3128    -',
        right: '3153 3151 3149 3147 3145 3143 3141 3139 3137 3135 3133 3131 3129 3127 3125',
      },
    },
  },
  {
    /** Slot 0 is where the corridor bends out of the north-west wing. */
    key: 'spine-n',
    facing: { left: 'inland', right: 'piazza' },
    floors: {
      5: {
        left:  '   - 5122 5120 5118 5116 5114 5112 5110 5108 5106 5104',
        right: '5123 5121 5119 5117 5115 5113 5111 5109 5107    -    -',
      },
      4: {
        left:  '   - 4122 4120 4118 4116 4114 4112 4110 4108 4106 4104',
        right: '4123 4121 4119 4117 4115 4113 4111 4109 4107 4105 4105',
      },
      3: {
        left:  '   - 3122 3120 3118 3116 3114 3112 3110 3108 3106 3104',
        right: '3123 3121 3119 3117 3115 3113 3111 3109 3107 3105 3105',
      },
    },
  },
  {
    /** The accessible rooms sit in the corner where the two spines meet. */
    key: 'corner',
    facing: { left: 'inland', right: 'piazza' },
    floors: { 4: { right: '4103' }, 3: { right: '3103' } },
  },
  {
    key: 'east',
    facing: { left: 'inland', right: 'canal' },
    floors: {
      5: { left: '5202 5204 5206 5208 5210    -', right: '5201 5203 5205 5207 5209 5211' },
      4: { left: '4202 4204 4206 4208 4210    -', right: '4201 4203 4205 4207 4209 4211' },
      3: { left: '3202 3204 3206 3208 3210    -', right: '3201 3203 3205 3207 3209 3211' },
    },
  },
  {
    /** The inland row's first three slots are the two lift lobbies. */
    key: 'spine-s',
    facing: { left: 'inland', right: 'harbour' },
    floors: {
      5: {
        left:  '   -    -    - 5306 5308 5310 5312 5314 5316 5318 5320 5322 5324 5326 5328',
        right: '   - 5301 5303 5303 5303 5303 5303 5313 5315 5317 5319 5321 5323 5325 5327',
      },
      4: {
        left:  '   -    -    - 4306 4308 4310 4312 4314 4316 4318 4320 4322 4324 4326 4328',
        right: '4101 4301 4303 4305 4307 4309 4311 4313 4315 4317 4319 4321 4323 4325 4327',
      },
      3: {
        left:  '   -    -    - 3306 3308 3310 3312 3314 3316 3318 3320 3322 3324 3326 3328',
        right: '3101 3301 3303 3305 3307 3309 3311 3313 3315 3317 3319 3321 3323 3325 3327',
      },
      2: {
        right: '   -    -    -    -    -    -    -    -    -    -    -    -    - 2325 2327',
      },
    },
  },
  {
    /**
     * Slots 0 to 2 wrap the corner out of the south spine, 8 and 15 are the two
     * bends in the wing, and 20 and 21 are the stair at the tip. The harbour row
     * loses a room to each of those; the inland row gains three at the corner.
     */
    key: 'sw',
    lead: 3,
    facing: { left: 'inland', right: 'harbour' },
    floors: {
      5: {
        left:  '5330 5332 5334 5336 5338 5340 5342 5344    - 5348 5348 5352 5352 5356 5356    - 5362 5362 5366 5366    -    -    -    -',
        right: '   -    -    - 5335 5337 5339 5341 5343 5345 5349 5349 5353 5353 5357 5357 5361 5361 5365 5365 5369 5369 5371 5371    -',
      },
      4: {
        left:  '4330 4332 4334 4336 4338 4340 4342 4344    - 4348 4350 4352 4354 4356 4358    - 4362 4364 4366 4368    -    - 4374 4376',
        right: '   -    -    - 4335 4337 4339 4341 4343 4345 4347 4349 4351 4353 4355 4357 4359 4361 4363 4365 4367 4369 4371 4373 4375',
      },
      3: {
        left:  '3330 3332 3334 3336 3338 3340 3342 3344    - 3348 3350 3352 3354 3356 3358    - 3362 3364 3366 3368    -    - 3374 3376',
        right: '   -    -    - 3335 3337 3339 3341 3343 3345 3347 3349 3351 3353 3355 3357 3359 3361 3363 3365 3367 3369 3371 3373 3375',
      },
      2: {
        left:  '2330 2332 2334 2336 2338 2340 2342 2344    - 2348 2350 2352 2354 2356 2358    - 2362 2364 2366 2368    -    - 2374 2376',
        right: '   -    -    - 2335 2337 2339 2341 2343 2345 2347 2349 2351 2353 2355 2357 2359 2361 2363 2365 2367 2369 2371 2373 2375',
      },
    },
  },
  {
    /** Slot 0 is the wing's lift lobby; the last three are where the tail leaves. */
    key: 'se',
    facing: { left: 'inland', right: 'entrance' },
    floors: {
      5: {
        left:  '5402 5404 5406 5408 5410 5412 5414 5416 5418 5420 5422 5424',
        right: '   - 5405 5407 5409 5411 5413 5415 5417 5419    -    -    -',
      },
      4: {
        left:  '4402 4404 4406 4408 4410 4412 4414 4416 4418 4420 4422 4424',
        right: '   - 4405 4407 4409 4411 4413 4415 4417 4419    -    -    -',
      },
      3: {
        left:  '3402 3404 3406 3408 3410 3412 3414 3416 3418 3420 3422 3424',
        right: '   - 3405 3407 3409 3411 3413 3415 3417 3419    -    -    -',
      },
      2: {
        left:  '2402 2404 2406 2408 2410 2412 2414 2416 2418 2420 2422 2424',
        right: '   - 2405 2407 2409 2411 2413 2415 2417 2419    -    -    -',
      },
    },
  },
  {
    key: 'se-tail',
    facing: { left: 'entrance', right: 'inland' },
    floors: {
      5: { left: '5423 5425 5427 5429 5431 5433 5435 5437 5439 5441' },
      4: { left: '4423 4425 4427 4429 4431 4433 4435 4437 4439 4441' },
      3: { left: '3423 3425 3427 3429 3431 3433 3435 3437 3439 3441' },
      2: { left: '2423 2425 2427 2429 2431 2433 2435 2437 2439 2441' },
    },
  },
];

export const PLAN_FLOORS = [5, 4, 3, 2] as const;

/** One slot of one side of one floor: a room number, or nothing. */
function readSlots(line: string | undefined): (string | null)[] {
  if (line === undefined) return [];
  return line.trim().split(/\s+/).map((word) => (word === '-' ? null : word));
}

/**
 * How many slots a run has.
 *
 * Every line of it must agree, because the slots are the building's own bays and a
 * floor cannot have more or fewer of them than the floor above. Disagreement means
 * a miscount in the transcription, so it is thrown rather than averaged away.
 */
export function slotsOf(run: PlanRun): number {
  let slots = 0;
  for (const [floor, rows] of Object.entries(run.floors)) {
    for (const side of ['left', 'right'] as const) {
      const count = readSlots(rows[side]).length;
      if (count === 0) continue;
      if (slots === 0) slots = count;
      else if (count !== slots) {
        throw new Error(`dhm-plan: ${run.key} ${side} on ${floor} has ${count} slots, not ${slots}`);
      }
    }
  }
  return slots;
}

/** Where each room on a floor starts, and how many slots it covers. */
export function spansOf(
  run: PlanRun,
  side: 'left' | 'right',
  floor: number,
): { number: string; start: number; span: number }[] {
  const out: { number: string; start: number; span: number }[] = [];
  readSlots(run.floors[floor]?.[side]).forEach((number, at) => {
    if (number === null) return;
    const last = out[out.length - 1];
    /** A number written twice over is one room across both slots, not two rooms. */
    if (last && last.number === number && last.start + last.span === at) last.span += 1;
    else out.push({ number, start: at, span: 1 });
  });
  return out;
}

/** How deep a room is drawn: 37 m² over the frontage the measurement gives it. */
export const ROOM_DEPTH = 8.8;
/** The corridor the two rows of rooms open onto. */
export const CORRIDOR = 2.0;

/**
 * Which walls of the measured frontage each wing stands on.
 *
 * The frontage is one straight wall for each face of it, and the plans draw one
 * corridor against each of those faces, so the two are matched face by face rather
 * than by sharing the total length out. That is what keeps the figure the shape of
 * the drawing: every corner of the building falls between two of the plans' wings,
 * where the plans put it, instead of in the middle of a room that then has to bend
 * round it. It is also what fixes the north-west wing, which the old share-out ran
 * three rooms past its own corner and out along the north spine.
 *
 * That the match works at all is the check on the plans. Wall by wall it gives
 * 3.99, 4.12, 4.39 and 4.87 m of frontage a room, against the 4.37 m a 37 m² room
 * has if it is 8.5 m deep. Three of the four are within a tenth of that; the
 * north-west wing's are an eighth wider, and nothing available here says whether
 * its rooms really are wider or the plans miscount it by a room. Nothing was fitted
 * to make any of this come out.
 */
const FRONTAGE_GROUPS: { keys: string[]; from: number; to: number }[] = [
  { keys: ['nw'], from: 0, to: 1 },
  { keys: ['spine-n', 'corner'], from: 1, to: 2 },
  { keys: ['spine-s'], from: 2, to: 3 },
  { keys: ['sw'], from: 3, to: 6 },
];

/**
 * The wall a run's lead-in slots stand on, where it is not the run's own.
 *
 * Only the north-west wing has one: the plans put four rooms a side round the
 * dog-leg at its far end, on the face the outline continues past the frontage's
 * first corner.
 */
const LEAD_WALLS: Record<string, readonly Point[]> = { nw: NW_TIP_WALL };

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
  /**
   * How the frontage carries on past each end of this wall, where the next wing
   * stands on the same corner of the building.
   *
   * Without it the two wings both take the whole corner: each mitres its end room
   * square to its own wall, and on the inside of the turn the two rooms cover the
   * same 25 m². Told which way the wall goes on, both divide the corner along the
   * one bisector and meet on it.
   */
  joint: { before?: Point; after?: Point };
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
function offsetPoint(
  line: readonly Point[],
  i: number,
  side: 'left' | 'right',
  by: number,
): [number, number] {
  const sign = side === 'left' ? -1 : 1;
  const normal = (a: Point, b: Point): [number, number] => {
    const len = Math.hypot(b[0] - a[0], b[1] - a[1]) || 1;
    return [(-(b[1] - a[1]) / len) * sign, ((b[0] - a[0]) / len) * sign];
  };
  const p = line[i]!;
  const before = i > 0 ? normal(line[i - 1]!, p) : null;
  const after = i + 1 < line.length ? normal(p, line[i + 1]!) : null;
  if (!before || !after) {
    const n = (before ?? after)!;
    return [p[0] + n[0] * by, p[1] + n[1] * by];
  }
  const len = Math.hypot(before[0] + after[0], before[1] + after[1]) || 1;
  const bisector: [number, number] = [(before[0] + after[0]) / len, (before[1] + after[1]) / len];
  /** The mitre reaches 1/cos(half the turn) further than the offset itself. */
  const cos = Math.max(0.35, bisector[0] * before[0] + bisector[1] * before[1]);
  return [p[0] + (bisector[0] * by) / cos, p[1] + (bisector[1] * by) / cos];
}

function offsetLine(line: readonly Point[], side: 'left' | 'right', by: number): [number, number][] {
  return line.map((_, i) => offsetPoint(line, i, side, by));
}

/**
 * How much arc a back wall `by` behind the line loses at the bend at vertex `i`.
 *
 * Nothing, where the line bends away from the rooms: then the back wall is the
 * longer of the two and the rooms at the bend gain rather than lose.
 */
function lostAtBend(line: readonly Point[], i: number, side: 'left' | 'right', by: number): number {
  const unit = (a: Point, b: Point): Point => {
    const len = Math.hypot(b[0] - a[0], b[1] - a[1]) || 1;
    return [(b[0] - a[0]) / len, (b[1] - a[1]) / len];
  };
  const u = unit(line[i - 1]!, line[i]!);
  const v = unit(line[i]!, line[i + 1]!);
  const cross = u[0] * v[1] - u[1] * v[0];
  if (cross * (side === 'left' ? -1 : 1) <= 0) return 0;
  const dot = Math.max(-1, Math.min(1, u[0] * v[0] + u[1] * v[1]));
  return by * Math.tan(Math.acos(dot) / 2);
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
  const slots = (key: string): number => slotsOf(run(key));
  /** The slots the frontage itself carries, which are all of them bar the lead-in. */
  const share = (key: string): number => slots(key) - (run(key).lead ?? 0);
  /**
   * A measured wall can be asked which side the building is on. One that had to be
   * carried over open ground cannot, so it is told: the side its plans put the
   * inland row, which is the side the wall it continues has its own on.
   */
  const wall = (key: string, line: [number, number][], inward: 'left' | 'right' | null): RunWall => ({
    line,
    inward: inward ?? interiorSide(line),
    face: run(key).facing.left === 'inland' ? 'right' : 'left',
    measured: inward === null,
    joint: {},
  });
  const unit = (a: Point, b: Point): Point => {
    const len = Math.hypot(b[0] - a[0], b[1] - a[1]) || 1;
    return [(b[0] - a[0]) / len, (b[1] - a[1]) / len];
  };
  /**
   * A wall carried back past its start, by the length of its lead-in slots.
   *
   * On its own bearing, unless the lead-in has a measured wall of its own — the
   * north-west wing's does, and carrying its four tip rooms straight on instead
   * would draw the wing's dog-leg out flat.
   */
  const leadIn = (key: string, line: [number, number][], by: number): [number, number][] => {
    if (by <= 0) return line;
    const on = LEAD_WALLS[key];
    const [a, b] = on ? [on[0]!, on[on.length - 1]!] : [line[0]!, line[1]!];
    const len = Math.hypot(b[0] - a[0], b[1] - a[1]) || 1;
    const head = line[0]!;
    return [[head[0] - ((b[0] - a[0]) / len) * by, head[1] - ((b[1] - a[1]) / len) * by], ...line];
  };

  const arc = FRONTAGE_WALL.map((_, i) => lineLength(FRONTAGE_WALL.slice(0, i + 1)));
  const walls: Record<string, RunWall> = {};
  /** What a room's frontage came out at on each wing, which the east wing borrows. */
  const pitches: Record<string, number> = {};
  for (const group of FRONTAGE_GROUPS) {
    const room = arc[group.to]! - arc[group.from]!;
    const pitch = room / group.keys.reduce((sum, key) => sum + share(key), 0);
    let at = arc[group.from]!;
    for (const key of group.keys) {
      const line = sliceLine(FRONTAGE_WALL, at, at + share(key) * pitch);
      walls[key] = wall(key, leadIn(key, line, (run(key).lead ?? 0) * pitch), null);
      pitches[key] = pitch;
      at += share(key) * pitch;
    }
  }
  /**
   * Each wing told how the wall goes on past it, in the order the frontage is walked.
   *
   * A wing whose head is carried back past the corner — the south-west's, whose
   * inland row turns it early — does not stand on that corner, so it is left out and
   * so is the wing before it.
   */
  const order = FRONTAGE_GROUPS.flatMap((group) => group.keys);
  for (let i = 1; i < order.length; i += 1) {
    if (run(order[i]!).lead) continue;
    const [a, b] = [walls[order[i - 1]!]!, walls[order[i]!]!];
    a.joint.after = unit(b.line[0]!, b.line[1]!);
    b.joint.before = unit(a.line[a.line.length - 2]!, a.line[a.line.length - 1]!);
  }

  /** The east wing is carried on at the pitch the north spine's own wall sets. */
  const north = pitches['spine-n']!;

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

/** Every room the plan places, flattened, so counts cannot drift from the data. */
export function planRooms(): { number: string; facing: Facing; floor: number; run: string }[] {
  return PLAN_RUNS.flatMap((run) =>
    (['left', 'right'] as const).flatMap((side) =>
      Object.keys(run.floors).flatMap((floor) =>
        spansOf(run, side, Number(floor)).map(({ number }) => ({
          number,
          facing: run.facing[side],
          floor: Number(floor),
          run: run.key,
        })),
      ),
    ),
  );
}

/**
 * Where each slot along a wall begins, in metres.
 *
 * Dividing the wall evenly would leave a bend of it in the middle of a room, and a
 * room that turns a bend loses depth × tan(half the turn) off its back on each side
 * — 3.4 m of a 4.1 m room where the north-west wing and the north spine turn 43
 * degrees apart, which turns it inside out. So each bend is moved onto the nearest
 * slot boundary, never further than half a room, and the two rooms that then meet at
 * it are widened by what their backs lose to it, out of the rooms between that bend
 * and the next.
 *
 * Both rows of a corridor are given the same bends at the same slot boundaries,
 * which is why the pins come in by wall vertex and not by distance: the row set back
 * from the wall is shorter than the wall at every bend that turns towards it, so on
 * its own arc length the bend would round to a different slot and the two rows would
 * walk out of step.
 */
function slotBounds(
  path: readonly Point[],
  slots: number,
  pins: Map<number, number>,
  side: 'left' | 'right',
  depth: number,
): number[] {
  const total = lineLength(path);
  const arc = path.map((_, i) => lineLength(path.slice(0, i + 1)));

  const marks = new Map<number, number>([[0, 0], [slots, total]]);
  const allow = new Map<number, number>();
  for (const [slot, vertex] of pins) {
    marks.set(slot, arc[vertex]!);
    const lost = lostAtBend(path, vertex, side, depth);
    for (const at of [slot - 1, slot]) allow.set(at, (allow.get(at) ?? 0) + lost);
  }

  const at = [...marks.keys()].sort((a, b) => a - b);
  const out: number[] = [];
  for (let i = 0; i + 1 < at.length; i += 1) {
    const [from, to] = [at[i]!, at[i + 1]!];
    const run = marks.get(to)! - marks.get(from)!;
    /**
     * Widening a bend's rooms narrows the rest, so it is capped at half a room:
     * past that the neighbours give up more than the bend rooms gain.
     */
    const cap = (run / (to - from)) * 0.5;
    const extra = [];
    for (let k = from; k < to; k += 1) extra.push(Math.min(allow.get(k) ?? 0, cap));
    const base = (run - extra.reduce((sum, v) => sum + v, 0)) / (to - from);
    let where = marks.get(from)!;
    for (let k = from; k < to; k += 1) {
      out.push(where);
      where += base + extra[k - from]!;
    }
  }
  out.push(total);
  return out;
}

/**
 * Which slot boundary each bend in a wall is pinned to, as slot index by vertex.
 *
 * Read off the wall itself so that the row set back from it can be given the same
 * answer rather than its own.
 */
function pinsOf(wall: readonly Point[], slots: number): Map<number, number> {
  const step = lineLength(wall) / slots;
  const pins = new Map<number, number>();
  const taken = new Set<number>();
  for (let i = 1; i < wall.length - 1; i += 1) {
    const k = Math.round(lineLength(wall.slice(0, i + 1)) / step);
    if (k > 0 && k < slots && !taken.has(k)) {
      taken.add(k);
      pins.set(k, i);
    }
  }
  return pins;
}

/**
 * A polygon cut back to one side of a line, by the usual corner-by-corner walk.
 *
 * A cell that falls entirely on the wrong side would come back empty, which would be a
 * cell with no shape rather than no cell; that cannot happen here — the fences are at
 * the ends of a run and every cell has a slot of its own on it — so it is left alone
 * instead, where the overlap check will find it.
 */
function clip(shape: readonly Point[], by: { at: Point; keep: Point }): Point[] {
  const side = (p: Point): number =>
    (p[0] - by.at[0]) * by.keep[0] + (p[1] - by.at[1]) * by.keep[1];
  const out: Point[] = [];
  for (let i = 0; i < shape.length; i += 1) {
    const a = shape[i]!;
    const b = shape[(i + 1) % shape.length]!;
    const [da, db] = [side(a), side(b)];
    if (da >= 0) out.push(a);
    if (da >= 0 !== db >= 0) {
      const t = da / (da - db);
      out.push([a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t]);
    }
  }
  return out.length >= 3 ? out : [...shape];
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
 * Lays one row of a run's rooms out along its wall: the wall is divided into as many
 * slots as the run has, and each room becomes a cell spanning its own slots, standing
 * `behind` the wall and reaching `depth` further into the building.
 *
 * A room that spans one of the wall's bends turns with it, as the plans draw the
 * rooms at the frontage's bends turning. Its back follows the mitred offset of the
 * wall rather than a straight line between the two ends, which is what keeps it a
 * room: on the 43-degree corner between the north-west wing and the north spine the
 * straight line crosses itself and the room comes out as a bow tie over its
 * neighbour.
 */
export function layout(
  wall: readonly Point[],
  slots: number,
  spans: { start: number; span: number }[],
  side: 'left' | 'right',
  /** How far behind the wall this row's own front stands: nothing, for the facade. */
  behind: number,
  depth: number,
  /** Which way the frontage runs on past each end, where another wing stands there. */
  joint: { before?: Point; after?: Point } = {},
): { points: string; cx: number; cy: number; angle: number; width: number }[] {
  if (slots === 0) return [];

  const last = wall.length - 1;
  const bearing = (a: Point, b: Point): Point => {
    const len = Math.hypot(b[0] - a[0], b[1] - a[1]) || 1;
    return [(b[0] - a[0]) / len, (b[1] - a[1]) / len];
  };
  /**
   * Which ends of the wall the neighbouring wing actually has to be reckoned with on.
   *
   * Only the ones where the wall turns towards the rooms, because those are the ones
   * where the two wings would otherwise take the same corner twice. Where it turns
   * away they leave a gap at the corner instead, and reckoning with it there would do
   * harm: mitring the corner lengthens the row set back from the wall, and its slots,
   * divided over a longer line, would walk out of step with the row opposite.
   */
  const turnsIn = (u: Point, v: Point): boolean =>
    (u[0] * v[1] - u[1] * v[0]) * (side === 'left' ? -1 : 1) > 0;
  const before =
    joint.before && turnsIn(joint.before, bearing(wall[0]!, wall[1]!)) ? joint.before : null;
  const after =
    joint.after && turnsIn(bearing(wall[last - 1]!, wall[last]!), joint.after) ? joint.after : null;

  /**
   * The bisector of a corner the wall shares with the next wing, as a line the wing's
   * own rooms are kept behind.
   *
   * On the inside of such a corner the two wings' rooms cover the same wedge of it
   * twice, and the wedge grows with depth: at 43 degrees it is 4 m across where the
   * rooms' fronts are and 8 m at their backs, so leaving the corner slot empty on both
   * sides — which the plans do — is not enough to clear it. Both wings stop at the
   * bisector instead.
   *
   * The fence is only a fence. The slots are divided along the wall itself, before any
   * of this, because they have to divide the same way for both rows of the corridor:
   * moving a row's line in to the bisector would stretch it, and its rooms would walk
   * out of step with the rooms opposite by most of a room.
   */
  const sign = side === 'left' ? -1 : 1;
  const fences: { at: Point; keep: Point }[] = [];
  const fence = (at: Point, into: Point, out: Point, along: Point): void => {
    const normal = (u: Point): Point => [-u[1] * sign, u[0] * sign];
    const [a, b] = [normal(into), normal(out)];
    const len = Math.hypot(a[0] + b[0], a[1] + b[1]) || 1;
    const bisector: Point = [(a[0] + b[0]) / len, (a[1] + b[1]) / len];
    const keep: Point = [-bisector[1], bisector[0]];
    const facing = keep[0] * along[0] + keep[1] * along[1] >= 0 ? 1 : -1;
    fences.push({ at, keep: [keep[0] * facing, keep[1] * facing] });
  };
  if (before) fence(wall[0]!, before, bearing(wall[0]!, wall[1]!), bearing(wall[0]!, wall[1]!));
  if (after) {
    const u = bearing(wall[last - 1]!, wall[last]!);
    fence(wall[last]!, u, after, [-u[0], -u[1]]);
  }

  /** The row's own front: the wall itself, or the wall moved in, its ends square to it. */
  const path = behind === 0 ? wall : offsetLine(wall, side, behind);
  const pins = pinsOf(wall, slots);
  const bounds = slotBounds(path, slots, pins, side, depth);
  /**
   * How deep the rooms reach at each bend.
   *
   * A bend that turns towards the rooms eats depth × tan(half the turn) off the back
   * of the room on either side of it, and where that is most of the room — the
   * north-west wing meets the north spine at 43 degrees, and the plans put the row
   * behind the corridor nineteen metres in from a wall that is turning — the room
   * would come out inside out. So at a bend like that the rooms reach only as far as
   * leaves them a back: they shallow towards the corner instead of folding through it.
   */
  const reach = new Map<number, number>();
  for (const [slot, vertex] of pins) {
    const lost = lostAtBend(path, vertex, side, depth);
    if (lost === 0) continue;
    const room = Math.min(bounds[slot]! - bounds[slot - 1]!, bounds[slot + 1]! - bounds[slot]!);
    reach.set(vertex, Math.min(depth, (depth * room * 0.55) / lost));
  }
  const back = path.map((_, i) => offsetPoint(path, i, side, reach.get(i) ?? depth));
  const arc = path.map((_, i) => lineLength(path.slice(0, i + 1)));
  const round = (n: number) => Math.round(n * 100) / 100;
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
     * Two rooms meeting at a bend of the wall share it along its bisector, not along a
     * line square to either side of the bend: square to both, on the inside of the
     * turn, they would take the same 30 m² of the corner twice.
     */
    const corner = (d: number): Point | null => {
      const i = arc.findIndex((v) => Math.abs(v - d) < 0.05);
      return i > 0 && i < path.length - 1 ? back[i]! : null;
    };
    const a = front[0]!;
    const b = front[front.length - 1]!;
    /**
     * A room's own end edges are square to the piece of wall it is on, read off its
     * ends rather than from the wall's arc length, so that a room beginning exactly at
     * a corner squares up to the wall it is on and not to the one before it.
     */
    const shape: Point[] = [
      ...front,
      corner(to) ?? inner(b, bearing(front[front.length - 2]!, b)),
      ...rear.reverse(),
      corner(from) ?? inner(a, bearing(a, front[1]!)),
    ];
    const kept = fences.reduce(clip, shape);
    const middle = centroid(kept);
    return {
      width: round(to - from),
      points: kept.map(([x, y]) => `${round(x)},${round(y)}`).join(' '),
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
