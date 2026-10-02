export type MissionStatus = "ACTIVE" | "TRANSIT" | "PLANNING";

export type Mission = {
  id: string;
  name: string;
  region: string;
  status: MissionStatus;
  progress: number;
  personnel: number;
  cargo: number;
  description: string;
  location: string;
  eta: string;
  fuel: number;
  temperature: string;
  windSpeed: string;
  visibility: string;
  surface: string;
};

export const missions: Mission[] = [
  {
    id: "POL-024",
    name: "Coastal Survey Alpha",
    region: "Antarctic Peninsula",
    status: "ACTIVE",
    progress: 78,
    personnel: 24,
    cargo: 18,
    description: "Coastal geological and environmental survey",
    location: "West Antarctica",
    eta: "06 Oct 2026",
    fuel: 78,
    temperature: "-18°C",
    windSpeed: "32 km/h",
    visibility: "8.4 km",
    surface: "Stable",
  },
  {
    id: "POL-025",
    name: "Ice Core Research",
    region: "East Antarctica",
    status: "TRANSIT",
    progress: 43,
    personnel: 18,
    cargo: 12,
    description: "Deep ice core sampling and climate research",
    location: "East Antarctica",
    eta: "14 Oct 2026",
    fuel: 64,
    temperature: "-31°C",
    windSpeed: "27 km/h",
    visibility: "6.2 km",
    surface: "Stable",
  },
  {
    id: "POL-026",
    name: "Marine Ecosystem Survey",
    region: "Ross Sea",
    status: "PLANNING",
    progress: 16,
    personnel: 31,
    cargo: 14,
    description: "Marine biodiversity and ecosystem monitoring",
    location: "Ross Sea",
    eta: "22 Oct 2026",
    fuel: 91,
    temperature: "-12°C",
    windSpeed: "19 km/h",
    visibility: "11.5 km",
    surface: "Calm",
  },
  {
    id: "POL-027",
    name: "Glacial Dynamics Study",
    region: "Queen Maud Land",
    status: "ACTIVE",
    progress: 62,
    personnel: 16,
    cargo: 9,
    description: "Glacier movement and environmental monitoring",
    location: "Queen Maud Land",
    eta: "10 Oct 2026",
    fuel: 72,
    temperature: "-25°C",
    windSpeed: "24 km/h",
    visibility: "9.1 km",
    surface: "Stable",
  },
  {
    id: "POL-028",
    name: "Polar Communications Relay",
    region: "Weddell Sea",
    status: "TRANSIT",
    progress: 35,
    personnel: 12,
    cargo: 7,
    description: "Deployment of remote communications equipment",
    location: "Weddell Sea",
    eta: "18 Oct 2026",
    fuel: 68,
    temperature: "-21°C",
    windSpeed: "29 km/h",
    visibility: "7.8 km",
    surface: "Variable",
  },
  {
    id: "POL-029",
    name: "Ice Shelf Observation",
    region: "Amundsen Sea",
    status: "PLANNING",
    progress: 9,
    personnel: 20,
    cargo: 11,
    description: "Remote observation of ice shelf conditions",
    location: "Amundsen Sea",
    eta: "29 Oct 2026",
    fuel: 96,
    temperature: "-29°C",
    windSpeed: "21 km/h",
    visibility: "10.2 km",
    surface: "Stable",
  },
];

export function getMission(id: string) {
  return missions.find((mission) => mission.id === id);
}