"use client";

import Link from "next/link";
import { useState } from "react";
import {
  Activity,
  ArrowRight,
  Bell,
  Box,
  ChevronRight,
  Compass,
  Map,
  Radio,
  Ship,
  ShieldAlert,
  Users,
} from "lucide-react";

type Mission = {
  id: string;
  name: string;
  region: string;
  progress: number;
  personnel: number;
  status: "ACTIVE" | "TRANSIT" | "PLANNING";
};

const missions: Mission[] = [
  {
    id: "POL-024",
    name: "Coastal Survey Alpha",
    region: "Antarctic Peninsula",
    progress: 78,
    personnel: 24,
    status: "ACTIVE",
  },
  {
    id: "POL-025",
    name: "Ice Core Research",
    region: "East Antarctica",
    progress: 42,
    personnel: 18,
    status: "TRANSIT",
  },
  {
    id: "POL-026",
    name: "Marine Ecosystem Survey",
    region: "Ross Sea",
    progress: 16,
    personnel: 31,
    status: "PLANNING",
  },
  {
    id: "POL-027",
    name: "Glacial Dynamics Study",
    region: "Queen Maud Land",
    progress: 63,
    personnel: 12,
    status: "ACTIVE",
  },
  {
    id: "POL-028",
    name: "Atmospheric Observation",
    region: "West Antarctica",
    progress: 35,
    personnel: 9,
    status: "TRANSIT",
  },
  {
    id: "POL-029",
    name: "Polar Logistics Operation",
    region: "Weddell Sea",
    progress: 8,
    personnel: 15,
    status: "PLANNING",
  },
];

const statusStyles: Record<Mission["status"], string> = {
  ACTIVE: "border-emerald-400/20 bg-emerald-400/10 text-emerald-400",
  TRANSIT: "border-cyan-400/20 bg-cyan-400/10 text-cyan-400",
  PLANNING: "border-amber-400/20 bg-amber-400/10 text-amber-400",
};

function MetricCard({
  icon,
  value,
  label,
  detail,
}: {
  icon: React.ReactNode;
  value: string;
  label: string;
  detail: string;
}) {
  return (
    <div className="rounded-xl border border-white/10 bg-[#0c1721] p-4">
      <div className="flex items-start justify-between">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/5 text-cyan-400">
          {icon}
        </div>

        <span className="mt-1 h-1.5 w-1.5 rounded-full bg-emerald-400" />
      </div>

      <div className="mt-5">
        <div className="text-2xl font-semibold tracking-tight text-white">
          {value}
        </div>

        <div className="mt-1 text-[9px] uppercase tracking-[0.22em] text-slate-500">
          {label}
        </div>

        <div className="mt-2 text-[9px] text-emerald-400">{detail}</div>
      </div>
    </div>
  );
}

function StatusBadge({ status }: { status: Mission["status"] }) {
  return (
    <span
      className={`rounded-full border px-2 py-1 text-[8px] font-semibold tracking-wide ${statusStyles[status]}`}
    >
      {status}
    </span>
  );
}

function MissionRow({ mission }: { mission: Mission }) {
  return (
    <Link
      href={`/expeditions/${mission.id}`}
      className="group grid grid-cols-[2.2fr_1.5fr_1fr_0.55fr_0.65fr] items-center border-t border-white/5 px-4 py-4 transition hover:bg-white/[0.025]"
    >
      <div>
        <div className="text-[9px] font-semibold tracking-[0.18em] text-cyan-400">
          {mission.id}
        </div>

        <div className="mt-1 text-sm font-medium text-white">
          {mission.name}
        </div>
      </div>

      <div className="text-xs text-slate-400">{mission.region}</div>

      <div className="pr-6">
        <div className="flex items-center justify-between text-[8px] text-slate-500">
          <span>Progress</span>
          <span className="text-slate-300">{mission.progress}%</span>
        </div>

        <div className="mt-1 h-1 overflow-hidden rounded-full bg-white/10">
          <div
            className="h-full rounded-full bg-cyan-400"
            style={{ width: `${mission.progress}%` }}
          />
        </div>
      </div>

      <div className="flex items-center gap-1.5 text-xs text-slate-300">
        <Users size={13} className="text-slate-500" />
        {mission.personnel}
      </div>

      <div className="flex items-center justify-between gap-2">
        <StatusBadge status={mission.status} />

        <ChevronRight
          size={15}
          className="text-slate-600 transition group-hover:translate-x-1 group-hover:text-cyan-400"
        />
      </div>
    </Link>
  );
}

export default function CommandCenterPage() {
  const [notifications, setNotifications] = useState(false);

  const activeMissions = missions.filter(
    (mission) => mission.status === "ACTIVE",
  );

  const totalPersonnel = missions.reduce(
    (total, mission) => total + mission.personnel,
    0,
  );

  return (
    <main className="min-h-screen bg-[#06111b] text-white">
      {/* Header */}
      <header className="border-b border-white/10 bg-[#07121d]/95">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-3">
          <Link href="/" className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-cyan-400/30 bg-cyan-400/10 text-cyan-400">
              <Compass size={19} />
            </div>

            <div>
              <div className="text-sm font-bold tracking-[0.28em] text-white">
                POLARIS
              </div>

              <div className="text-[7px] tracking-[0.28em] text-slate-600">
                POLAR OPERATIONS SYSTEM
              </div>
            </div>
          </Link>

          <nav className="hidden items-center gap-1 md:flex">
            <Link
              href="/"
              className="rounded-md bg-white/10 px-3 py-2 text-[10px] font-semibold text-white"
            >
              Command Center
            </Link>

            <Link
              href="/expeditions"
              className="rounded-md px-3 py-2 text-[10px] text-slate-500 transition hover:bg-white/5 hover:text-white"
            >
              Expeditions
            </Link>

            <Link
              href="/map"
              className="rounded-md px-3 py-2 text-[10px] text-slate-500 transition hover:bg-white/5 hover:text-white"
            >
              Mission Map
            </Link>

            <Link
              href="/emergency"
              className="rounded-md px-3 py-2 text-[10px] text-slate-500 transition hover:bg-white/5 hover:text-white"
            >
              Emergency
            </Link>
          </nav>

          <div className="flex items-center gap-3">
            <div className="hidden items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/5 px-3 py-1.5 sm:flex">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
              <span className="text-[8px] font-semibold tracking-[0.15em] text-emerald-400">
                SYSTEM ONLINE
              </span>
            </div>

            <button
              type="button"
              onClick={() => setNotifications(!notifications)}
              className="relative flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-white/[0.02] text-slate-400 transition hover:text-white"
              aria-label="Notifications"
            >
              <Bell size={15} />

              <span className="absolute right-2 top-1.5 h-1.5 w-1.5 rounded-full bg-amber-400" />
            </button>
          </div>
        </div>
      </header>

      {/* Main */}
      <div className="mx-auto max-w-6xl px-6 py-8">
        {/* Hero */}
        <section className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <div className="mb-2 flex items-center gap-2 text-[9px] font-semibold uppercase tracking-[0.25em] text-cyan-400">
              <Activity size={12} />
              Operations Control
            </div>

            <h1 className="text-3xl font-semibold tracking-tight text-white md:text-4xl">
              Command Center
            </h1>

            <p className="mt-3 max-w-2xl text-xs leading-6 text-slate-500">
              Centralized monitoring and coordination for Antarctic
              expeditions, personnel, cargo and emergency response.
            </p>
          </div>

          <div className="text-left md:text-right">
            <div className="text-[8px] uppercase tracking-[0.25em] text-slate-600">
              Operations Status
            </div>

            <div className="mt-2 font-mono text-xs text-slate-300">
              03 OCT 2026 · 02:48 IST
            </div>
          </div>
        </section>

        {/* Main modules */}
        <section className="mt-7 grid gap-3 md:grid-cols-3">
          <Link
            href="/expeditions"
            className="group rounded-xl border border-white/10 bg-[#0c1721] p-5 transition hover:border-cyan-400/20 hover:bg-[#0d1a25]"
          >
            <div className="flex items-start justify-between">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-cyan-400/10 text-cyan-400">
                <Ship size={17} />
              </div>

              <ArrowRight
                size={15}
                className="text-slate-600 transition group-hover:translate-x-1 group-hover:text-cyan-400"
              />
            </div>

            <div className="mt-5 text-[8px] uppercase tracking-[0.22em] text-slate-600">
              Mission Registry
            </div>

            <h2 className="mt-2 text-base font-semibold text-white">
              Expeditions
            </h2>

            <p className="mt-2 text-xs leading-5 text-slate-500">
              Monitor active and planned polar expeditions.
            </p>

            <div className="mt-6 border-t border-white/5 pt-4">
              <div className="text-xl font-semibold text-cyan-400">
                {missions.length.toString().padStart(2, "0")}
              </div>

              <div className="mt-1 text-[8px] uppercase text-slate-600">
                Registered
              </div>
            </div>
          </Link>

          <Link
            href="/map"
            className="group rounded-xl border border-white/10 bg-[#0c1721] p-5 transition hover:border-cyan-400/20 hover:bg-[#0d1a25]"
          >
            <div className="flex items-start justify-between">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-cyan-400/10 text-cyan-400">
                <Map size={17} />
              </div>

              <ArrowRight
                size={15}
                className="text-slate-600 transition group-hover:translate-x-1 group-hover:text-cyan-400"
              />
            </div>

            <div className="mt-5 text-[8px] uppercase tracking-[0.22em] text-slate-600">
              Geospatial Operations
            </div>

            <h2 className="mt-2 text-base font-semibold text-white">
              Mission Map
            </h2>

            <p className="mt-2 text-xs leading-5 text-slate-500">
              Track stations, missions and field positions.
            </p>

            <div className="mt-6 border-t border-white/5 pt-4">
              <div className="text-xl font-semibold text-cyan-400">LIVE</div>

              <div className="mt-1 text-[8px] uppercase text-slate-600">
                Position Data
              </div>
            </div>
          </Link>

          <Link
            href="/emergency"
            className="group rounded-xl border border-red-400/15 bg-[#0c1721] p-5 transition hover:border-red-400/30 hover:bg-[#101922]"
          >
            <div className="flex items-start justify-between">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-red-400/10 text-red-400">
                <ShieldAlert size={17} />
              </div>

              <ArrowRight
                size={15}
                className="text-slate-600 transition group-hover:translate-x-1 group-hover:text-red-400"
              />
            </div>

            <div className="mt-5 text-[8px] uppercase tracking-[0.22em] text-slate-600">
              Incident Response
            </div>

            <h2 className="mt-2 text-base font-semibold text-white">
              Emergency Center
            </h2>

            <p className="mt-2 text-xs leading-5 text-slate-500">
              Coordinate alerts and emergency response.
            </p>

            <div className="mt-6 border-t border-white/5 pt-4">
              <div className="text-xl font-semibold text-red-400">02</div>

              <div className="mt-1 text-[8px] uppercase text-slate-600">
                Active Alerts
              </div>
            </div>
          </Link>
        </section>

        {/* Metrics */}
        <section className="mt-4 grid grid-cols-2 gap-3 md:grid-cols-4">
          <MetricCard
            icon={<Ship size={16} />}
            value={missions.length.toString().padStart(2, "0")}
            label="Total Expeditions"
            detail={`${activeMissions.length} active`}
          />

          <MetricCard
            icon={<Users size={16} />}
            value={totalPersonnel.toString()}
            label="Personnel Deployed"
            detail="100% accounted"
          />

          <MetricCard
            icon={<Box size={16} />}
            value="54"
            label="Cargo Units"
            detail="All tracked"
          />

          <MetricCard
            icon={<Radio size={16} />}
            value="98%"
            label="Network Coverage"
            detail="Operational"
          />
        </section>

        {/* Active operations */}
        <section className="mt-8">
          <div className="flex items-end justify-between">
            <div>
              <div className="text-[8px] uppercase tracking-[0.25em] text-slate-600">
                Current Field Activity
              </div>

              <h2 className="mt-2 text-lg font-semibold text-white">
                Active Operations
              </h2>
            </div>

            <Link
              href="/expeditions"
              className="flex items-center gap-1 text-[10px] font-medium text-cyan-400 hover:text-cyan-300"
            >
              View all
              <ArrowRight size={13} />
            </Link>
          </div>

          <div className="mt-4 overflow-hidden rounded-xl border border-white/10 bg-[#0b1620]">
            <div className="hidden grid-cols-[2.2fr_1.5fr_1fr_0.55fr_0.65fr] px-4 py-3 text-[8px] uppercase tracking-[0.18em] text-slate-600 md:grid">
              <div>Expedition</div>
              <div>Region</div>
              <div>Progress</div>
              <div>Personnel</div>
              <div>Status</div>
            </div>

            {missions.slice(0, 3).map((mission) => (
              <MissionRow key={mission.id} mission={mission} />
            ))}
          </div>
        </section>

        {/* Bottom status */}
        <section className="mt-4 grid gap-3 md:grid-cols-3">
          <div className="rounded-xl border border-white/10 bg-[#0b1620] p-4">
            <div className="flex items-center gap-2 text-[9px] uppercase tracking-[0.18em] text-slate-500">
              <Radio size={13} className="text-emerald-400" />
              Communications
            </div>

            <div className="mt-3 text-sm font-medium text-white">
              Network operational
            </div>

            <div className="mt-1 text-[10px] text-slate-600">
              All primary channels connected
            </div>
          </div>

          <div className="rounded-xl border border-white/10 bg-[#0b1620] p-4">
            <div className="flex items-center gap-2 text-[9px] uppercase tracking-[0.18em] text-slate-500">
              <Activity size={13} className="text-cyan-400" />
              Field Telemetry
            </div>

            <div className="mt-3 text-sm font-medium text-white">
              Receiving live data
            </div>

            <div className="mt-1 text-[10px] text-slate-600">
              24 stations reporting
            </div>
          </div>

          <div className="rounded-xl border border-white/10 bg-[#0b1620] p-4">
            <div className="flex items-center gap-2 text-[9px] uppercase tracking-[0.18em] text-slate-500">
              <ShieldAlert size={13} className="text-amber-400" />
              System Advisory
            </div>

            <div className="mt-3 text-sm font-medium text-white">
              Routine monitoring
            </div>

            <div className="mt-1 text-[10px] text-slate-600">
              No critical system faults detected
            </div>
          </div>
        </section>
      </div>

      {/* Notification popup */}
      {notifications && (
        <div className="fixed right-6 top-20 z-50 w-72 rounded-xl border border-white/10 bg-[#0b1620] p-4 shadow-2xl">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold text-white">
              Notifications
            </h3>

            <button
              type="button"
              onClick={() => setNotifications(false)}
              className="text-xs text-slate-500 hover:text-white"
            >
              Close
            </button>
          </div>

          <div className="mt-4 border-t border-white/5 pt-3">
            <div className="text-xs text-slate-300">
              2 active emergency alerts
            </div>

            <div className="mt-2 text-[10px] leading-5 text-slate-600">
              Review the Emergency Center for current incident information.
            </div>

            <Link
              href="/emergency"
              className="mt-3 inline-flex items-center gap-1 text-[10px] text-cyan-400"
              onClick={() => setNotifications(false)}
            >
              Open Emergency Center
              <ArrowRight size={12} />
            </Link>
          </div>
        </div>
      )}
    </main>
  );
}