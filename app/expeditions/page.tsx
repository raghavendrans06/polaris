"use client";

import Link from "next/link";
import {
  Activity,
  ArrowRight,
  CalendarDays,
  ChevronRight,
  Compass,
  Filter,
  MapPin,
  Search,
  Ship,
  Users,
} from "lucide-react";
import { useMemo, useState } from "react";

import { missions } from "../data/missions";

type Mission = (typeof missions)[number];

type FilterStatus = "ALL" | "ACTIVE" | "TRANSIT" | "PLANNING";

const statusStyles: Record<Mission["status"], string> = {
  ACTIVE: "bg-emerald-400/10 text-emerald-300 border-emerald-400/20",
  TRANSIT: "bg-cyan-400/10 text-cyan-300 border-cyan-400/20",
  PLANNING: "bg-amber-400/10 text-amber-300 border-amber-400/20",
};

const statusDots: Record<Mission["status"], string> = {
  ACTIVE: "bg-emerald-400",
  TRANSIT: "bg-cyan-400",
  PLANNING: "bg-amber-400",
};

export default function ExpeditionsPage() {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState<FilterStatus>("ALL");

  const filteredMissions = useMemo(() => {
    const query = search.trim().toLowerCase();

    return missions.filter((mission) => {
      const matchesStatus =
        status === "ALL" || mission.status === status;

      const matchesSearch =
        query.length === 0 ||
        mission.id.toLowerCase().includes(query) ||
        mission.name.toLowerCase().includes(query) ||
        mission.region.toLowerCase().includes(query) ||
        mission.location.toLowerCase().includes(query);

      return matchesStatus && matchesSearch;
    });
  }, [search, status]);

  const activeCount = missions.filter(
    (mission) => mission.status === "ACTIVE",
  ).length;

  const transitCount = missions.filter(
    (mission) => mission.status === "TRANSIT",
  ).length;

  const planningCount = missions.filter(
    (mission) => mission.status === "PLANNING",
  ).length;

  return (
    <main className="min-h-screen bg-[#06111c] text-white">
      {/* HEADER */}
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
              className="rounded-md px-3 py-2 text-[10px] text-slate-500 transition hover:bg-white/5 hover:text-white"
            >
              Command Center
            </Link>

            <Link
              href="/expeditions"
              className="rounded-md bg-white/10 px-3 py-2 text-[10px] font-semibold text-white"
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

          <div className="flex items-center gap-2">
            <span className="hidden items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/5 px-3 py-1.5 text-[8px] font-semibold tracking-[0.15em] text-emerald-400 sm:flex">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
              SYSTEM ONLINE
            </span>
          </div>
        </div>
      </header>

      {/* CONTENT */}
      <div className="mx-auto max-w-6xl px-6 py-8">
        {/* PAGE TITLE */}
        <section>
          <div className="flex items-center gap-2 text-[9px] font-semibold uppercase tracking-[0.25em] text-cyan-400">
            <Ship size={12} />
            Mission Registry
          </div>

          <div className="mt-3 flex flex-col justify-between gap-5 md:flex-row md:items-end">
            <div>
              <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">
                Expeditions
              </h1>

              <p className="mt-3 max-w-2xl text-xs leading-6 text-slate-500">
                Monitor Antarctic expeditions, personnel, mission progress,
                locations and operational status from a single registry.
              </p>
            </div>

            <div className="text-left md:text-right">
              <div className="text-[8px] uppercase tracking-[0.25em] text-slate-600">
                Registered Missions
              </div>

              <div className="mt-1 text-2xl font-semibold text-white">
                {missions.length.toString().padStart(2, "0")}
              </div>
            </div>
          </div>
        </section>

        {/* SUMMARY CARDS */}
        <section className="mt-7 grid grid-cols-2 gap-3 md:grid-cols-4">
          <SummaryCard
            icon={<Ship size={16} />}
            label="Total"
            value={missions.length}
            detail="Registered"
          />

          <SummaryCard
            icon={<Activity size={16} />}
            label="Active"
            value={activeCount}
            detail="In operation"
          />

          <SummaryCard
            icon={<Compass size={16} />}
            label="Transit"
            value={transitCount}
            detail="En route"
          />

          <SummaryCard
            icon={<CalendarDays size={16} />}
            label="Planning"
            value={planningCount}
            detail="Preparing"
          />
        </section>

        {/* SEARCH + FILTER */}
        <section className="mt-7 rounded-xl border border-white/10 bg-[#0b1620] p-4">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="relative w-full lg:max-w-md">
              <Search
                size={15}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-600"
              />

              <input
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search mission, ID, region or location..."
                className="h-10 w-full rounded-lg border border-white/10 bg-black/10 pl-9 pr-3 text-xs text-white outline-none placeholder:text-slate-700 focus:border-cyan-400/30"
              />
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <div className="mr-1 flex items-center gap-2 text-[9px] uppercase tracking-[0.18em] text-slate-600">
                <Filter size={12} />
                Status
              </div>

              <FilterButton
                active={status === "ALL"}
                onClick={() => setStatus("ALL")}
              >
                All
              </FilterButton>

              <FilterButton
                active={status === "ACTIVE"}
                onClick={() => setStatus("ACTIVE")}
              >
                Active
              </FilterButton>

              <FilterButton
                active={status === "TRANSIT"}
                onClick={() => setStatus("TRANSIT")}
              >
                Transit
              </FilterButton>

              <FilterButton
                active={status === "PLANNING"}
                onClick={() => setStatus("PLANNING")}
              >
                Planning
              </FilterButton>
            </div>
          </div>
        </section>

        {/* RESULTS */}
        <section className="mt-5">
          <div className="mb-3 flex items-center justify-between">
            <div>
              <div className="text-[8px] uppercase tracking-[0.25em] text-slate-600">
                Expedition Registry
              </div>

              <h2 className="mt-1 text-lg font-semibold text-white">
                {filteredMissions.length}{" "}
                {filteredMissions.length === 1
                  ? "mission"
                  : "missions"}{" "}
                found
              </h2>
            </div>

            {search && (
              <button
                type="button"
                onClick={() => setSearch("")}
                className="text-[9px] text-cyan-400 hover:text-cyan-300"
              >
                Clear search
              </button>
            )}
          </div>

          {filteredMissions.length === 0 ? (
            <div className="rounded-xl border border-white/10 bg-[#0b1620] px-6 py-16 text-center">
              <Search
                size={24}
                className="mx-auto text-slate-700"
              />

              <h3 className="mt-4 text-sm font-medium text-slate-300">
                No expeditions found
              </h3>

              <p className="mt-2 text-xs text-slate-600">
                Try another search term or change the status filter.
              </p>
            </div>
          ) : (
            <div className="overflow-hidden rounded-xl border border-white/10 bg-[#0b1620]">
              {/* TABLE HEADER */}
              <div className="hidden grid-cols-[2fr_1.35fr_1.1fr_0.8fr_0.8fr_28px] gap-4 border-b border-white/10 bg-white/[0.015] px-5 py-3 text-[8px] uppercase tracking-[0.18em] text-slate-600 lg:grid">
                <div>Expedition</div>
                <div>Region</div>
                <div>Progress</div>
                <div>Personnel</div>
                <div>Status</div>
                <div />
              </div>

              {filteredMissions.map((mission) => (
                <MissionRow
                  key={mission.id}
                  mission={mission}
                />
              ))}
            </div>
          )}
        </section>

        {/* OPERATIONAL NOTE */}
        <section className="mt-4 rounded-xl border border-cyan-400/10 bg-cyan-400/[0.025] p-4">
          <div className="flex gap-3">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-cyan-400/10 text-cyan-400">
              <Activity size={15} />
            </div>

            <div>
              <div className="text-[9px] font-semibold uppercase tracking-[0.18em] text-cyan-400">
                Operations Feed
              </div>

              <p className="mt-1 text-[10px] leading-5 text-slate-600">
                Mission information is synchronized with the Polaris
                expedition registry. Select an expedition to view detailed
                mission telemetry and operational information.
              </p>
            </div>
          </div>
        </section>

        {/* FOOTER */}
        <footer className="mt-8 flex flex-col justify-between gap-2 border-t border-white/10 pt-5 text-[8px] uppercase tracking-[0.2em] text-slate-700 sm:flex-row">
          <span>POLARIS Mission Control</span>
          <span>Expedition Registry • Live</span>
        </footer>
      </div>
    </main>
  );
}

/* -------------------------------------------------------------------------- */
/* COMPONENTS                                                                 */
/* -------------------------------------------------------------------------- */

function SummaryCard({
  icon,
  label,
  value,
  detail,
}: {
  icon: React.ReactNode;
  label: string;
  value: number;
  detail: string;
}) {
  return (
    <div className="rounded-xl border border-white/10 bg-[#0c1721] p-4">
      <div className="flex items-start justify-between">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-cyan-400/10 text-cyan-400">
          {icon}
        </div>

        <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
      </div>

      <div className="mt-5 text-2xl font-semibold text-white">
        {value.toString().padStart(2, "0")}
      </div>

      <div className="mt-1 text-[9px] uppercase tracking-[0.2em] text-slate-600">
        {label}
      </div>

      <div className="mt-2 text-[9px] text-slate-500">
        {detail}
      </div>
    </div>
  );
}

function FilterButton({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-md border px-3 py-2 text-[9px] font-medium transition ${
        active
          ? "border-cyan-400/20 bg-cyan-400/10 text-cyan-300"
          : "border-white/10 bg-white/[0.02] text-slate-500 hover:bg-white/[0.05] hover:text-slate-300"
      }`}
    >
      {children}
    </button>
  );
}

function MissionRow({
  mission,
}: {
  mission: Mission;
}) {
  return (
    <Link
      href={`/expeditions/${mission.id}`}
      className="group block border-b border-white/5 px-5 py-5 transition last:border-b-0 hover:bg-white/[0.025]"
    >
      {/* DESKTOP */}
      <div className="hidden grid-cols-[2fr_1.35fr_1.1fr_0.8fr_0.8fr_28px] items-center gap-4 lg:grid">
        <MissionIdentity mission={mission} />

        <LocationInfo mission={mission} />

        <ProgressInfo mission={mission} />

        <PersonnelInfo mission={mission} />

        <StatusBadge status={mission.status} />

        <ChevronRight
          size={15}
          className="text-slate-700 transition group-hover:translate-x-1 group-hover:text-cyan-400"
        />
      </div>

      {/* MOBILE / TABLET */}
      <div className="lg:hidden">
        <div className="flex items-start justify-between gap-4">
          <MissionIdentity mission={mission} />

          <StatusBadge status={mission.status} />
        </div>

        <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
          <LocationInfo mission={mission} />

          <ProgressInfo mission={mission} />

          <PersonnelInfo mission={mission} />

          <div className="rounded-lg border border-white/5 bg-black/10 p-3">
            <div className="text-[8px] uppercase tracking-[0.15em] text-slate-700">
              ETA
            </div>

            <div className="mt-1 text-xs text-slate-400">
              {mission.eta}
            </div>
          </div>
        </div>

        <div className="mt-4 flex items-center justify-end gap-1 text-[9px] text-cyan-400">
          View mission
          <ArrowRight size={12} />
        </div>
      </div>
    </Link>
  );
}

function MissionIdentity({
  mission,
}: {
  mission: Mission;
}) {
  return (
    <div className="min-w-0">
      <div className="flex items-center gap-2">
        <span className="text-[9px] font-semibold tracking-[0.18em] text-cyan-400">
          {mission.id}
        </span>
      </div>

      <div className="mt-1 truncate text-sm font-medium text-white">
        {mission.name}
      </div>

      <div className="mt-1 flex items-center gap-1.5 text-[9px] text-slate-600">
        <MapPin size={11} />
        {mission.location}
      </div>
    </div>
  );
}

function LocationInfo({
  mission,
}: {
  mission: Mission;
}) {
  return (
    <div className="min-w-0">
      <div className="text-[8px] uppercase tracking-[0.15em] text-slate-700">
        Region
      </div>

      <div className="mt-1 truncate text-xs text-slate-400">
        {mission.region}
      </div>
    </div>
  );
}

function ProgressInfo({
  mission,
}: {
  mission: Mission;
}) {
  return (
    <div>
      <div className="flex items-center justify-between text-[8px]">
        <span className="text-slate-700">
          Progress
        </span>

        <span className="text-slate-400">
          {mission.progress}%
        </span>
      </div>

      <div className="mt-2 h-1 overflow-hidden rounded-full bg-white/10">
        <div
          className="h-full rounded-full bg-cyan-400 transition-all"
          style={{
            width: `${mission.progress}%`,
          }}
        />
      </div>
    </div>
  );
}

function PersonnelInfo({
  mission,
}: {
  mission: Mission;
}) {
  return (
    <div>
      <div className="text-[8px] uppercase tracking-[0.15em] text-slate-700">
        Personnel
      </div>

      <div className="mt-1 flex items-center gap-1.5 text-xs text-slate-400">
        <Users size={12} />
        {mission.personnel}
      </div>
    </div>
  );
}

function StatusBadge({
  status,
}: {
  status: Mission["status"];
}) {
  return (
    <span
      className={`inline-flex w-fit items-center gap-1.5 rounded-full border px-2.5 py-1 text-[8px] font-semibold tracking-wide ${statusStyles[status]}`}
    >
      <span
        className={`h-1.5 w-1.5 rounded-full ${statusDots[status]}`}
      />
      {status}
    </span>
  );
}