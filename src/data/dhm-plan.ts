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
 * What is not faithful: corridor directions are the angles the source draws them
 * at, read by eye, and every corridor's length is set from its room count at one
 * pitch for the whole building. That keeps rooms comparable between wings — the
 * real thing has near-constant frontage per room — but it is not measured. Two
 * rooms of the same frontage and different floor area, a 37 m² Superior and a
 * 60 m² Harbor Room, are drawn the same width. So read a cell as "this position,
 * this orientation", never as "this many metres".
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
  /** Corridor centre line as a polyline, in plan units, in walking order. */
  path: [number, number][];
  /** Rooms on the left of the walking direction, in order. */
  left: { facing: Facing; floors: Record<number, string[]> };
  /** Rooms on the right of the walking direction, in order. */
  right: { facing: Facing; floors: Record<number, string[]> };
}

export const PLAN_WIDTH = 1000;
export const PLAN_HEIGHT = 1000;

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
    path: [
      [287, 80],
      [359, 179],
      [447, 300],
    ],
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
    path: [
      [447, 300],
      [600, 300],
    ],
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
    path: [
      [712, 300],
      [814, 300],
    ],
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
    path: [
      [608, 314],
      [620, 326],
    ],
    left: { facing: 'inland', floors: {} },
    right: { facing: 'piazza', floors: { 4: ['4103'], 3: ['3103'] } },
  },
  {
    key: 'spine-s',
    path: [
      [640, 344],
      [640, 599],
    ],
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
    path: [
      [616, 635],
      [496, 652],
      [389, 702],
      [313, 792],
    ],
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
    path: [
      [700, 625],
      [799, 718],
    ],
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
    path: [
      [811, 738],
      [811, 908],
    ],
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

/** Rooms the plan marks as Partial View although the type lists never number them. */
export const PARTIAL_VIEW_FROM_PLAN: string[] = [
  '3147', '3149', '3151', '3153',
  '4147', '4149', '4151', '4153',
  '2327', '3327', '4327', '5327',
];

/** The chapel's octagonal void, drawn only to orient the reader. */
export const CHAPEL = { cx: 656, cy: 300, r: 40 };

/** Landmarks that make the orientation readable, in plan units. */
export const LANDMARKS = [
  { key: 'harbour', points: '140,352 586,352 586,580 468,592 372,652 264,672 124,516' },
  { key: 'piazza', points: '456,340 600,340 600,372 456,372' },
] as const;

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
 * Lays a run's rooms out along its corridor: the polyline is divided into as
 * many equal slots as the fullest floor has rooms, and each room becomes a quad
 * spanning its own slots, offset perpendicular to the corridor. Bends in the
 * corridor bend the rooms with them.
 */
export function layout(
  path: [number, number][],
  slots: number,
  spans: { start: number; span: number }[],
  side: 'left' | 'right',
  depth: number,
): { points: string; cx: number; cy: number; angle: number; width: number }[] {
  if (slots === 0) return [];

  const segments = path.slice(0, -1).map((from, i) => {
    const to = path[i + 1]!;
    const dx = to[0] - from[0];
    const dy = to[1] - from[1];
    return { from, to, length: Math.hypot(dx, dy) };
  });
  const total = segments.reduce((sum, segment) => sum + segment.length, 0);
  const step = total / slots;

  /** Walks the polyline to the point and direction at distance `d` from the start. */
  const at = (d: number): { x: number; y: number; ux: number; uy: number } => {
    let travelled = 0;
    for (const segment of segments) {
      if (d <= travelled + segment.length || segment === segments[segments.length - 1]) {
        const t = (d - travelled) / segment.length;
        return {
          x: segment.from[0] + (segment.to[0] - segment.from[0]) * t,
          y: segment.from[1] + (segment.to[1] - segment.from[1]) * t,
          ux: (segment.to[0] - segment.from[0]) / segment.length,
          uy: (segment.to[1] - segment.from[1]) / segment.length,
        };
      }
      travelled += segment.length;
    }
    throw new Error('unreachable');
  };

  const sign = side === 'left' ? -1 : 1;
  const round = (n: number) => Math.round(n * 10) / 10;

  return spans.map(({ start, span }) => {
    const a = at(start * step);
    const b = at((start + span) * step);
    /** Perpendicular to the corridor, pointing to this side of it. */
    const na = { x: -a.uy * sign, y: a.ux * sign };
    const nb = { x: -b.uy * sign, y: b.ux * sign };
    const inner = 8;
    const p1 = [a.x + na.x * inner, a.y + na.y * inner];
    const p2 = [b.x + nb.x * inner, b.y + nb.y * inner];
    const p3 = [b.x + nb.x * (inner + depth), b.y + nb.y * (inner + depth)];
    const p4 = [a.x + na.x * (inner + depth), a.y + na.y * (inner + depth)];
    return {
      width: round(step * span),
      points: [p1, p2, p3, p4].map(([x, y]) => `${round(x!)},${round(y!)}`).join(' '),
      cx: round((p1[0]! + p2[0]! + p3[0]! + p4[0]!) / 4),
      cy: round((p1[1]! + p2[1]! + p3[1]! + p4[1]!) / 4),
      /** Kept upright: a run walked leftwards would otherwise read upside down. */
      angle: (() => {
        const raw = Math.round((Math.atan2(b.y - a.y, b.x - a.x) * 180) / Math.PI);
        return raw > 90 ? raw - 180 : raw < -90 ? raw + 180 : raw;
      })(),
    };
  });
}
