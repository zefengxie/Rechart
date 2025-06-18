// ✅ data.ts (converted from JS to TypeScript)
export interface ComposedDatum {
  date: string;
  impressions: number;
  clicks: number;
  value: number;
  make: string;
}

export interface PieDatum {
  date: string;
  name: "New" | "Used";
  value: number;
}

export interface BarDatum {
  date: string;
  stage: string;
  groupA: number;
  groupB: number;
}

// ✅ 使用从 data.js 提取的数据（直接复制内容）:
export const composedData = [
  {
    "date": "2025-05-26",
    "make": "Nissan",
    "impressions": 19960,
    "clicks": 32,
    "value": 123,
    "size": 57,
    "state": "Used",
    "name": "Model 8"
  },
  {
    "date": "2025-05-16",
    "make": "Volkswagen",
    "impressions": 30516,
    "clicks": 59,
    "value": 137,
    "size": 62,
    "state": "Used",
    "name": "Model 6"
  },
  {
    "date": "2025-05-08",
    "make": "Ford",
    "impressions": 19331,
    "clicks": 20,
    "value": 54,
    "size": 61,
    "state": "Used",
    "name": "Model 7"
  },
  {
    "date": "2025-05-19",
    "make": "BMW",
    "impressions": 45429,
    "clicks": 29,
    "value": 103,
    "size": 39,
    "state": "Used",
    "name": "Model 9"
  },
  {
    "date": "2025-05-21",
    "make": "Hyundai",
    "impressions": 44228,
    "clicks": 92,
    "value": 131,
    "size": 78,
    "state": "Used",
    "name": "Model 3"
  },
  {
    "date": "2025-05-05",
    "make": "Volkswagen",
    "impressions": 34894,
    "clicks": 56,
    "value": 172,
    "size": 51,
    "state": "Used",
    "name": "Model 6"
  },
  {
    "date": "2025-05-25",
    "make": "Honda",
    "impressions": 33624,
    "clicks": 60,
    "value": 126,
    "size": 54,
    "state": "Used",
    "name": "Model 9"
  },
  {
    "date": "2025-05-11",
    "make": "Kia",
    "impressions": 33634,
    "clicks": 13,
    "value": 82,
    "size": 74,
    "state": "New",
    "name": "Model 3"
  },
  {
    "date": "2025-05-09",
    "make": "Ford",
    "impressions": 34043,
    "clicks": 29,
    "value": 195,
    "size": 31,
    "state": "New",
    "name": "Model 10"
  },
  {
    "date": "2025-05-07",
    "make": "Toyota",
    "impressions": 35995,
    "clicks": 61,
    "value": 168,
    "size": 79,
    "state": "New",
    "name": "Model 1"
  },
  {
    "date": "2025-05-07",
    "make": "Ford",
    "impressions": 18136,
    "clicks": 78,
    "value": 183,
    "size": 66,
    "state": "New",
    "name": "Model 2"
  },
  {
    "date": "2025-05-30",
    "make": "Hyundai",
    "impressions": 14066,
    "clicks": 40,
    "value": 175,
    "size": 76,
    "state": "New",
    "name": "Model 8"
  },
  {
    "date": "2025-05-08",
    "make": "Toyota",
    "impressions": 24277,
    "clicks": 42,
    "value": 117,
    "size": 29,
    "state": "Used",
    "name": "Model 9"
  },
  {
    "date": "2025-05-09",
    "make": "Ford",
    "impressions": 23340,
    "clicks": 58,
    "value": 86,
    "size": 25,
    "state": "Used",
    "name": "Model 2"
  },
  {
    "date": "2025-05-13",
    "make": "Hyundai",
    "impressions": 17915,
    "clicks": 44,
    "value": 70,
    "size": 30,
    "state": "Used",
    "name": "Model 2"
  },
  {
    "date": "2025-05-14",
    "make": "Volkswagen",
    "impressions": 35193,
    "clicks": 60,
    "value": 120,
    "size": 40,
    "state": "Used",
    "name": "Model 6"
  },
  {
    "date": "2025-05-10",
    "make": "Hyundai",
    "impressions": 25820,
    "clicks": 93,
    "value": 104,
    "size": 32,
    "state": "Used",
    "name": "Model 9"
  },
  {
    "date": "2025-05-08",
    "make": "Hyundai",
    "impressions": 44750,
    "clicks": 10,
    "value": 176,
    "size": 65,
    "state": "Used",
    "name": "Model 7"
  },
  {
    "date": "2025-05-24",
    "make": "Volkswagen",
    "impressions": 28565,
    "clicks": 27,
    "value": 90,
    "size": 45,
    "state": "New",
    "name": "Model 10"
  },
  {
    "date": "2025-05-14",
    "make": "Nissan",
    "impressions": 23413,
    "clicks": 82,
    "value": 119,
    "size": 44,
    "state": "New",
    "name": "Model 4"
  },
  {
    "date": "2025-05-21",
    "make": "Hyundai",
    "impressions": 14502,
    "clicks": 22,
    "value": 96,
    "size": 44,
    "state": "New",
    "name": "Model 5"
  },
  {
    "date": "2025-05-03",
    "make": "Ford",
    "impressions": 41147,
    "clicks": 62,
    "value": 171,
    "size": 30,
    "state": "Used",
    "name": "Model 4"
  },
  {
    "date": "2025-05-27",
    "make": "Subaru",
    "impressions": 33253,
    "clicks": 22,
    "value": 90,
    "size": 74,
    "state": "Used",
    "name": "Model 6"
  },
  {
    "date": "2025-05-27",
    "make": "BMW",
    "impressions": 38215,
    "clicks": 33,
    "value": 86,
    "size": 27,
    "state": "New",
    "name": "Model 9"
  },
  {
    "date": "2025-05-11",
    "make": "Kia",
    "impressions": 20124,
    "clicks": 92,
    "value": 78,
    "size": 71,
    "state": "Used",
    "name": "Model 9"
  },
  {
    "date": "2025-05-08",
    "make": "Volkswagen",
    "impressions": 40252,
    "clicks": 95,
    "value": 141,
    "size": 25,
    "state": "New",
    "name": "Model 4"
  },
  {
    "date": "2025-05-12",
    "make": "Hyundai",
    "impressions": 44828,
    "clicks": 74,
    "value": 189,
    "size": 21,
    "state": "New",
    "name": "Model 2"
  },
  {
    "date": "2025-05-14",
    "make": "Hyundai",
    "impressions": 49206,
    "clicks": 35,
    "value": 143,
    "size": 62,
    "state": "New",
    "name": "Model 8"
  },
  {
    "date": "2025-05-22",
    "make": "Ford",
    "impressions": 49183,
    "clicks": 64,
    "value": 118,
    "size": 36,
    "state": "New",
    "name": "Model 2"
  },
  {
    "date": "2025-05-30",
    "make": "Honda",
    "impressions": 39916,
    "clicks": 14,
    "value": 109,
    "size": 24,
    "state": "New",
    "name": "Model 6"
  },
  {
    "date": "2025-05-07",
    "make": "Kia",
    "impressions": 41579,
    "clicks": 31,
    "value": 179,
    "size": 43,
    "state": "Used",
    "name": "Model 9"
  },
  {
    "date": "2025-05-11",
    "make": "Kia",
    "impressions": 29351,
    "clicks": 23,
    "value": 54,
    "size": 30,
    "state": "Used",
    "name": "Model 10"
  },
  {
    "date": "2025-05-23",
    "make": "Honda",
    "impressions": 17798,
    "clicks": 40,
    "value": 55,
    "size": 63,
    "state": "New",
    "name": "Model 6"
  },
  {
    "date": "2025-05-01",
    "make": "Honda",
    "impressions": 22641,
    "clicks": 93,
    "value": 147,
    "size": 67,
    "state": "Used",
    "name": "Model 7"
  },
  {
    "date": "2025-05-20",
    "make": "Mazda",
    "impressions": 34839,
    "clicks": 75,
    "value": 190,
    "size": 78,
    "state": "Used",
    "name": "Model 9"
  },
  {
    "date": "2025-05-29",
    "make": "Honda",
    "impressions": 26996,
    "clicks": 12,
    "value": 65,
    "size": 73,
    "state": "Used",
    "name": "Model 10"
  },
  {
    "date": "2025-05-17",
    "make": "Ford",
    "impressions": 18051,
    "clicks": 24,
    "value": 175,
    "size": 26,
    "state": "Used",
    "name": "Model 9"
  },
  {
    "date": "2025-05-05",
    "make": "Hyundai",
    "impressions": 41807,
    "clicks": 83,
    "value": 163,
    "size": 45,
    "state": "Used",
    "name": "Model 3"
  },
  {
    "date": "2025-05-30",
    "make": "BMW",
    "impressions": 38557,
    "clicks": 35,
    "value": 143,
    "size": 79,
    "state": "Used",
    "name": "Model 10"
  },
  {
    "date": "2025-05-18",
    "make": "Nissan",
    "impressions": 39557,
    "clicks": 46,
    "value": 139,
    "size": 37,
    "state": "Used",
    "name": "Model 4"
  },
  {
    "date": "2025-05-07",
    "make": "Mazda",
    "impressions": 39474,
    "clicks": 65,
    "value": 98,
    "size": 67,
    "state": "Used",
    "name": "Model 8"
  },
  {
    "date": "2025-05-13",
    "make": "Mazda",
    "impressions": 38109,
    "clicks": 72,
    "value": 121,
    "size": 54,
    "state": "Used",
    "name": "Model 2"
  },
  {
    "date": "2025-05-17",
    "make": "Volkswagen",
    "impressions": 22827,
    "clicks": 67,
    "value": 181,
    "size": 47,
    "state": "Used",
    "name": "Model 9"
  },
  {
    "date": "2025-05-07",
    "make": "BMW",
    "impressions": 41744,
    "clicks": 20,
    "value": 187,
    "size": 52,
    "state": "Used",
    "name": "Model 3"
  },
  {
    "date": "2025-05-02",
    "make": "Subaru",
    "impressions": 41818,
    "clicks": 88,
    "value": 100,
    "size": 35,
    "state": "New",
    "name": "Model 5"
  },
  {
    "date": "2025-05-08",
    "make": "BMW",
    "impressions": 48611,
    "clicks": 10,
    "value": 55,
    "size": 49,
    "state": "New",
    "name": "Model 5"
  },
  {
    "date": "2025-05-30",
    "make": "Volkswagen",
    "impressions": 43674,
    "clicks": 31,
    "value": 159,
    "size": 67,
    "state": "Used",
    "name": "Model 1"
  },
  {
    "date": "2025-05-06",
    "make": "Honda",
    "impressions": 36706,
    "clicks": 10,
    "value": 69,
    "size": 46,
    "state": "New",
    "name": "Model 5"
  },
  {
    "date": "2025-05-07",
    "make": "Volkswagen",
    "impressions": 16926,
    "clicks": 50,
    "value": 68,
    "size": 33,
    "state": "New",
    "name": "Model 6"
  },
  {
    "date": "2025-05-20",
    "make": "Honda",
    "impressions": 10631,
    "clicks": 29,
    "value": 144,
    "size": 74,
    "state": "Used",
    "name": "Model 3"
  }
];



export const barData = [
  { date: "2025-04-11", stage: "Discovery", groupA: 20, groupB: 25 },
  { date: "2025-04-12", stage: "Intender", groupA: 21, groupB: 26 },
  { date: "2025-04-13", stage: "Ready to buy", groupA: 22, groupB: 27 },
  { date: "2025-04-14", stage: "Close to Purchase", groupA: 23, groupB: 28 },
  { date: "2025-04-15", stage: "Discovery", groupA: 24, groupB: 29 },
  { date: "2025-04-16", stage: "Intender", groupA: 25, groupB: 30 },
  { date: "2025-04-17", stage: "Ready to buy", groupA: 26, groupB: 31 },
  { date: "2025-04-18", stage: "Close to Purchase", groupA: 27, groupB: 32 },
  { date: "2025-04-19", stage: "Discovery", groupA: 28, groupB: 33 },
  { date: "2025-04-20", stage: "Intender", groupA: 29, groupB: 34 },
  { date: "2025-04-21", stage: "Ready to buy", groupA: 30, groupB: 35 },
  { date: "2025-04-22", stage: "Close to Purchase", groupA: 31, groupB: 36 },
  { date: "2025-04-23", stage: "Discovery", groupA: 32, groupB: 37 },
  { date: "2025-04-24", stage: "Intender", groupA: 33, groupB: 38 },
  { date: "2025-04-25", stage: "Ready to buy", groupA: 34, groupB: 39 },
  { date: "2025-04-26", stage: "Close to Purchase", groupA: 35, groupB: 40 },
  { date: "2025-04-27", stage: "Discovery", groupA: 36, groupB: 41 },
  { date: "2025-04-28", stage: "Intender", groupA: 37, groupB: 42 },
  { date: "2025-04-29", stage: "Ready to buy", groupA: 38, groupB: 43 },
  { date: "2025-04-30", stage: "Close to Purchase", groupA: 39, groupB: 44 },
  { date: "2025-05-01", stage: "Discovery", groupA: 40, groupB: 45 },
  { date: "2025-05-02", stage: "Intender", groupA: 41, groupB: 46 },
  { date: "2025-05-03", stage: "Ready to buy", groupA: 42, groupB: 47 },
  { date: "2025-05-04", stage: "Close to Purchase", groupA: 43, groupB: 48 },
  { date: "2025-05-05", stage: "Discovery", groupA: 44, groupB: 49 },
  { date: "2025-05-06", stage: "Intender", groupA: 45, groupB: 30 },
  { date: "2025-05-07", stage: "Ready to buy", groupA: 46, groupB: 31 },
  { date: "2025-05-08", stage: "Close to Purchase", groupA: 47, groupB: 32 },
  { date: "2025-05-09", stage: "Discovery", groupA: 48, groupB: 33 },
  { date: "2025-05-10", stage: "Intender", groupA: 49, groupB: 34 },
  { date: "2025-05-11", stage: "Ready to buy", groupA: 50, groupB: 35 },
  { date: "2025-05-12", stage: "Close to Purchase", groupA: 51, groupB: 36 },
  { date: "2025-05-13", stage: "Discovery", groupA: 52, groupB: 37 },
  { date: "2025-05-14", stage: "Intender", groupA: 53, groupB: 38 },
  { date: "2025-05-15", stage: "Ready to buy", groupA: 54, groupB: 39 },
  { date: "2025-05-16", stage: "Close to Purchase", groupA: 55, groupB: 40 },
  { date: "2025-05-17", stage: "Discovery", groupA: 26, groupB: 41 },
  { date: "2025-05-18", stage: "Intender", groupA: 27, groupB: 42 },
  { date: "2025-05-19", stage: "Ready to buy", groupA: 28, groupB: 43 },
  { date: "2025-05-20", stage: "Close to Purchase", groupA: 29, groupB: 44 },
  { date: "2025-05-21", stage: "Discovery", groupA: 30, groupB: 45 },
  { date: "2025-05-22", stage: "Intender", groupA: 31, groupB: 46 },
  { date: "2025-05-23", stage: "Ready to buy", groupA: 32, groupB: 47 },
  { date: "2025-05-24", stage: "Close to Purchase", groupA: 33, groupB: 48 },
  { date: "2025-05-25", stage: "Discovery", groupA: 34, groupB: 49 },
  { date: "2025-05-26", stage: "Intender", groupA: 35, groupB: 30 },
  { date: "2025-05-27", stage: "Ready to buy", groupA: 36, groupB: 31 },
  { date: "2025-05-28", stage: "Close to Purchase", groupA: 37, groupB: 32 },
  { date: "2025-05-29", stage: "Discovery", groupA: 38, groupB: 33 },
  { date: "2025-05-30", stage: "Intender", groupA: 39, groupB: 34 }
];