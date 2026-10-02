"use client";

import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  Compass,
  MapPin,
  Navigation,
  Radio,
  Ship,
  Users,
  Wind,
} from "lucide-react";
import { useState } from "react";

const missions = [
  {
    id: "POL-024",
    name: "Coastal Survey Alpha",
    region: "Antarctic Peninsula",
    personnel: 24,
    progress: 78,
    status: "ACTIVE",
    x: 29,
    y: 38,
  },
  {
    id: "POL-025",
    name: "Ice Core Research",
    region: "East Antarctica",
    personnel: 18,
    progress: 42,
    status: "TRANSIT",
    x: 67,
    y: 28,
  },
  {
    id: "POL-026",
    name: "Marine Ecosystem Survey",
    region: "Ross Sea",
    personnel: 31,
    progress: 16,
    status: "PLANNING",
    x: 48,
    y: 67,
  },
];

const stations = [
  {
    name: "Maitri Station",
    region: "Queen Maud Land",
    x: 56,
    y: 43,
  },
  {
    name: "Bharati Station",
    region: "Larsemann Hills",
    x: 73,
    y: 54,
  },
];

export default function MapPage() {
  const [selected, setSelected] = useState(missions[0]);

  return (
    <main className="min-h-screen bg-[#06111c] text-white">
      {/* HEADER */}
      <header className="border-b border-white/10 bg-[#071522]">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <Link
            href="/"
            className="flex items-center gap-3"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-cyan-400/20 bg-cyan-400/10">
              <Compass
                size={20}
                className="text-cyan-300"
              />
            </div>

            <div>
              <p className="text-sm font-bold tracking-[0.25em]">
                POLARIS
              </p>

              <p className="text-[9px] uppercase tracking-[0.18em] text-zinc-600">
                Mission Map
              </p>
            </div>
          </Link>

          <Link
            href="/"
            className="flex items-center gap-2 rounded-lg border border-white/10 px-3 py-2 text-xs text-zinc-400 transition hover:text-white"
          >
            <ArrowLeft size={14} />
            Command Center
          </Link>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-6 py-8">
        {/* TITLE */}
        <section className="mb-7">
          <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.25em] text-cyan-300">
            <Navigation size={14} />
            Geospatial Operations
          </div>

          <h1 className="mt-3 text-3xl font-semibold">
            Mission Map
          </h1>

          <p className="mt-2 max-w-2xl text-sm leading-6 text-zinc-500">
            Operational view of Antarctic stations, expeditions
            and current field positions.
          </p>
        </section>

        {/* MAP + PANEL */}
        <section className="grid gap-5 lg:grid-cols-[1fr_330px]">
          {/* MAP */}
          <div className="relative min-h-[620px] overflow-hidden rounded-2xl border border-white/10 bg-[#081722]">
            {/* GRID */}
            <div
              className="absolute inset-0 opacity-30"
              style={{
                backgroundImage:
                  "linear-gradient(rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.06) 1px, transparent 1px)",
                backgroundSize: "50px 50px",
              }}
            />

            {/* POLAR CIRCLE */}
            <div className="absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-cyan-400/10" />

            <div className="absolute left-1/2 top-1/2 h-[360px] w-[360px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-cyan-400/10" />

            <div className="absolute left-1/2 top-1/2 h-[220px] w-[220px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-cyan-400/10" />

            {/* MAP LABEL */}
            <div className="absolute left-5 top-5">
              <p className="text-[9px] uppercase tracking-[0.2em] text-zinc-600">
                Antarctic Operations
              </p>

              <p className="mt-1 font-mono text-xs text-zinc-400">
                72° S — 90° E
              </p>
            </div>

            {/* NORTH */}
            <div className="absolute right-5 top-5 flex flex-col items-center text-zinc-600">
              <span className="text-[9px]">
                N
              </span>

              <div className="mt-1 h-8 w-px bg-zinc-700" />
            </div>

            {/* ROUTE */}
            <svg
              className="absolute inset-0 h-full w-full"
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
            >
              <path
                d="M 29 38 Q 44 48 56 43 Q 63 38 67 28"
                fill="none"
                stroke="rgba(34,211,238,0.45)"
                strokeWidth="0.35"
                strokeDasharray="1.5 1"
              />
            </svg>

            {/* STATIONS */}
            {stations.map((station) => (
              <div
                key={station.name}
                className="absolute"
                style={{
                  left: `${station.x}%`,
                  top: `${station.y}%`,
                }}
              >
                <div className="-translate-x-1/2 -translate-y-1/2">
                  <div className="relative flex h-7 w-7 items-center justify-center rounded-full border border-emerald-400/30 bg-emerald-400/10">
                    <Radio
                      size={12}
                      className="text-emerald-300"
                    />

                    <span className="absolute inset-0 animate-ping rounded-full border border-emerald-400/20" />
                  </div>

                  <p className="mt-2 whitespace-nowrap text-[8px] text-emerald-300">
                    {station.name}
                  </p>
                </div>
              </div>
            ))}

            {/* MISSIONS */}
            {missions.map((mission) => {
              const active =
                selected.id === mission.id;

              return (
                <button
                  key={mission.id}
                  type="button"
                  onClick={() => setSelected(mission)}
                  className="absolute"
                  style={{
                    left: `${mission.x}%`,
                    top: `${mission.y}%`,
                  }}
                >
                  <div className="-translate-x-1/2 -translate-y-1/2">
                    <div
                      className={`relative flex h-9 w-9 items-center justify-center rounded-full border transition ${
                        active
                          ? "scale-110 border-cyan-300 bg-cyan-400/20"
                          : "border-cyan-400/30 bg-cyan-400/10"
                      }`}
                    >
                      <Ship
                        size={14}
                        className="text-cyan-300"
                      />

                      {mission.status === "ACTIVE" && (
                        <span className="absolute inset-[-6px] animate-ping rounded-full border border-cyan-400/20" />
                      )}
                    </div>

                    <p className="mt-2 whitespace-nowrap font-mono text-[8px] text-cyan-300">
                      {mission.id}
                    </p>
                  </div>
                </button>
              );
            })}

            {/* LEGEND */}
            <div className="absolute bottom-5 left-5 rounded-xl border border-white/10 bg-[#06111c]/90 p-4 backdrop-blur">
              <p className="text-[9px] uppercase tracking-[0.2em] text-zinc-600">
                Map Legend
              </p>

              <div className="mt-3 space-y-2">
                <Legend
                  color="bg-cyan-400"
                  label="Expedition"
                />

                <Legend
                  color="bg-emerald-400"
                  label="Research Station"
                />

                <Legend
                  color="bg-red-400"
                  label="Emergency"
                />
              </div>
            </div>

            {/* STATUS */}
            <div className="absolute bottom-5 right-5 rounded-xl border border-white/10 bg-[#06111c]/90 px-4 py-3 backdrop-blur">
              <div className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />

                <span className="text-[9px] uppercase tracking-wider text-emerald-300">
                  Live Position Feed
                </span>
              </div>
            </div>
          </div>

          {/* SIDE PANEL */}
          <aside className="rounded-2xl border border-white/10 bg-white/[0.025]">
            <div className="border-b border-white/10 p-5">
              <p className="text-[9px] uppercase tracking-[0.2em] text-zinc-600">
                Selected Mission
              </p>

              <div className="mt-3 flex items-start justify-between">
                <div>
                  <p className="font-mono text-[10px] text-cyan-300">
                    {selected.id}
                  </p>

                  <h2 className="mt-1 text-lg font-semibold">
                    {selected.name}
                  </h2>

                  <p className="mt-1 text-xs text-zinc-600">
                    {selected.region}
                  </p>
                </div>

                <span className="rounded-full border border-emerald-400/20 bg-emerald-400/5 px-2 py-1 text-[8px] text-emerald-300">
                  {selected.status}
                </span>
              </div>
            </div>

            <div className="p-5">
              {/* PROGRESS */}
              <div>
                <div className="flex justify-between">
                  <span className="text-[9px] uppercase tracking-wider text-zinc-600">
                    Mission Progress
                  </span>

                  <span className="font-mono text-xs text-zinc-300">
                    {selected.progress}%
                  </span>
                </div>

                <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-white/10">
                  <div
                    className="h-full rounded-full bg-cyan-400"
                    style={{
                      width: `${selected.progress}%`,
                    }}
                  />
                </div>
              </div>

              {/* DETAILS */}
              <div className="mt-6 space-y-3">
                <InfoRow
                  icon={Users}
                  label="Personnel"
                  value={`${selected.personnel} deployed`}
                />

                <InfoRow
                  icon={MapPin}
                  label="Region"
                  value={selected.region}
                />

                <InfoRow
                  icon={Wind}
                  label="Wind"
                  value="28 knots"
                />

                <InfoRow
                  icon={Radio}
                  label="Telemetry"
                  value="Connected"
                />
              </div>

              {/* BUTTON */}
              <Link
                href={`/expeditions/${selected.id}`}
                className="mt-7 flex items-center justify-center gap-2 rounded-xl bg-cyan-400 px-4 py-3 text-xs font-semibold text-[#041019] transition hover:bg-cyan-300"
              >
                Open Mission Dashboard
                <ArrowRight size={14} />
              </Link>

              <Link
                href="/expeditions"
                className="mt-2 flex items-center justify-center rounded-xl border border-white/10 px-4 py-3 text-xs text-zinc-500 transition hover:text-white"
              >
                View All Expeditions
              </Link>
            </div>
          </aside>
        </section>

        {/* BOTTOM STATUS */}
        <section className="mt-5 grid gap-3 sm:grid-cols-3">
          <StatusCard
            label="Research Stations"
            value="02"
            status="ONLINE"
          />

          <StatusCard
            label="Tracked Expeditions"
            value="03"
            status="LIVE"
          />

          <StatusCard
            label="Personnel"
            value="73"
            status="ACCOUNTED"
          />
        </section>
      </div>
    </main>
  );
}

/* =========================================================
   INFO ROW
========================================================= */

function InfoRow({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ElementType;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center justify-between rounded-xl border border-white/5 bg-black/10 p-3">
      <div className="flex items-center gap-2">
        <Icon
          size={14}
          className="text-zinc-600"
        />

        <span className="text-[10px] text-zinc-600">
          {label}
        </span>
      </div>

      <span className="text-[10px] text-zinc-300">
        {value}
      </span>
    </div>
  );
}

/* =========================================================
   LEGEND
========================================================= */

function Legend({
  color,
  label,
}: {
  color: string;
  label: string;
}) {
  return (
    <div className="flex items-center gap-2">
      <span
        className={`h-2 w-2 rounded-full ${color}`}
      />

      <span className="text-[9px] text-zinc-500">
        {label}
      </span>
    </div>
  );
}

/* =========================================================
   STATUS CARD
========================================================= */

function StatusCard({
  label,
  value,
  status,
}: {
  label: string;
  value: string;
  status: string;
}) {
  return (
    <div className="flex items-center justify-between rounded-xl border border-white/10 bg-white/[0.025] p-4">
      <div>
        <p className="text-[9px] uppercase tracking-wider text-zinc-600">
          {label}
        </p>

        <p className="mt-1 text-xl font-semibold">
          {value}
        </p>
      </div>

      <span className="rounded-full border border-emerald-400/20 bg-emerald-400/5 px-2 py-1 text-[8px] text-emerald-300">
        {status}
      </span>
    </div>
  );
}