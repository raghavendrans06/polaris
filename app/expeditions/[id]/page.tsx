"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import {
  Activity,
  ArrowLeft,
  Calendar,
  CheckCircle2,
  CircleAlert,
  Compass,
  Fuel,
  MapPin,
  Package,
  Radio,
  ShieldCheck,
  Users,
  Wind,
} from "lucide-react";

import { missions } from "../../data/missions";

type Mission = {
  id?: string;
  code?: string;
  name?: string;
  title?: string;
  status?: string;
  region?: string;
  location?: string;
  description?: string;
  objective?: string;
  progress?: number;
  personnel?: number;
  cargo?: number;
  cargoUnits?: number;
  fuel?: number;
  fuelReserve?: number;
  eta?: string;
  completionDate?: string;
  temperature?: string;
  windSpeed?: string;
  visibility?: string;
  surface?: string;
};

export default function ExpeditionDetailPage() {
  const params = useParams();

  const routeId = String(params?.id ?? "POL-024");

  const allMissions = missions as Mission[];

  const mission =
    allMissions.find(
      (item) =>
        String(item.id ?? "").toLowerCase() ===
          routeId.toLowerCase() ||
        String(item.code ?? "").toLowerCase() ===
          routeId.toLowerCase(),
    ) ?? {
      id: "POL-024",
      code: "POL-024",
      name: "Coastal Survey Alpha",
      title: "Coastal Survey Alpha",
      status: "ACTIVE",
      region: "Antarctic Peninsula",
      location: "West Antarctica",
      description:
        "Coastal geological and environmental survey",
      objective:
        "Coastal geological and environmental survey",
      progress: 78,
      personnel: 24,
      cargo: 18,
      cargoUnits: 18,
      fuel: 78,
      fuelReserve: 78,
      eta: "06 Oct 2026",
      completionDate: "06 Oct 2026",
      temperature: "-18°C",
      windSpeed: "32 km/h",
      visibility: "8.4 km",
      surface: "Stable",
    };

  const progress = Number(mission.progress ?? 78);

  const personnel = Number(
    mission.personnel ?? 24,
  );

  const cargo = Number(
    mission.cargoUnits ??
      mission.cargo ??
      18,
  );

  const fuel = Number(
    mission.fuelReserve ??
      mission.fuel ??
      78,
  );

  const missionName =
    mission.name ??
    mission.title ??
    "Coastal Survey Alpha";

  const missionCode =
    mission.code ??
    mission.id ??
    "POL-024";

  const status = String(
    mission.status ?? "ACTIVE",
  ).toUpperCase();

  const region =
    mission.region ??
    "Antarctic Peninsula";

  const description =
    mission.description ??
    mission.objective ??
    "Coastal geological and environmental survey";

  const eta =
    mission.eta ??
    mission.completionDate ??
    "06 Oct 2026";

  return (
    <main className="min-h-screen bg-[#06111c] text-white">
      <div className="mx-auto max-w-[1180px] px-5 py-8">

        {/* HEADER */}
        <section className="mb-5 rounded-2xl border border-white/10 bg-[#0c1824]">
          <div className="p-6 md:p-7">

            <div className="flex flex-col justify-between gap-6 md:flex-row">

              <div>

                <Link
                  href="/expeditions"
                  className="mb-5 inline-flex items-center gap-2 text-xs text-slate-500 transition hover:text-cyan-300"
                >
                  <ArrowLeft size={14} />
                  Back to Expeditions
                </Link>

                <div className="mb-3 flex flex-wrap items-center gap-2">

                  <span className="rounded-md border border-cyan-400/20 bg-cyan-400/10 px-2.5 py-1 text-[10px] font-bold tracking-[0.18em] text-cyan-300">
                    {missionCode}
                  </span>

                  <span className="rounded-md border border-emerald-400/20 bg-emerald-400/10 px-2.5 py-1 text-[10px] font-bold tracking-[0.12em] text-emerald-300">
                    {status}
                  </span>

                </div>

                <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
                  {missionName}
                </h1>

                <div className="mt-3 flex flex-wrap gap-4 text-xs text-slate-500">

                  <span className="flex items-center gap-1.5">
                    <MapPin size={13} />
                    {region}
                  </span>

                  <span className="flex items-center gap-1.5">
                    <Compass size={13} />
                    {mission.location ??
                      "West Antarctica"}
                  </span>

                </div>

                <p className="mt-5 max-w-2xl text-sm leading-6 text-slate-400">
                  {description}
                </p>

              </div>

              <div className="flex shrink-0 gap-2">

                <button
                  type="button"
                  className="flex h-9 items-center gap-2 rounded-lg border border-white/10 bg-white/[0.03] px-4 text-xs text-slate-400"
                >
                  <Radio size={14} />
                  Contact Mission
                </button>

                <Link
                  href="/emergency"
                  className="flex h-9 items-center gap-2 rounded-lg border border-red-400/20 bg-red-400/5 px-4 text-xs text-red-300 transition hover:bg-red-400/10"
                >
                  <CircleAlert size={14} />
                  Emergency
                </Link>

              </div>

            </div>

            {/* PROGRESS */}
            <div className="mt-7 border-t border-white/10 pt-5">

              <div className="flex items-end justify-between">

                <div>
                  <p className="text-[9px] uppercase tracking-[0.25em] text-slate-600">
                    Mission Progress
                  </p>

                  <p className="mt-1 text-xs text-slate-500">
                    Expedition completion
                  </p>
                </div>

                <div className="text-2xl font-bold text-cyan-300">
                  {progress}%
                </div>

              </div>

              <div className="mt-3 h-2 overflow-hidden rounded-full bg-white/10">
                <div
                  className="h-full rounded-full bg-cyan-400 transition-all"
                  style={{
                    width: `${progress}%`,
                  }}
                />
              </div>

              <div className="mt-2 flex justify-between text-[9px] text-slate-600">
                <span>Mission initiated</span>
                <span>Mission completion</span>
              </div>

            </div>

          </div>
        </section>

        {/* STATS */}
        <section className="grid grid-cols-2 gap-3 md:grid-cols-4">

          <StatCard
            icon={<Users size={16} />}
            label="Personnel"
            value={String(personnel)}
            footer="All accounted"
          />

          <StatCard
            icon={<Fuel size={16} />}
            label="Fuel reserve"
            value={`${fuel}%`}
            footer="Operational"
          />

          <StatCard
            icon={<Calendar size={16} />}
            label="Mission ETA"
            value={eta}
            footer="Projected"
          />

          <StatCard
            icon={<Package size={16} />}
            label="Cargo units"
            value={String(cargo)}
            footer="Tracked"
          />

        </section>

        {/* INFORMATION */}
        <section className="mt-4 grid gap-4 lg:grid-cols-[1.15fr_.85fr]">

          {/* MISSION INFORMATION */}
          <div className="rounded-2xl border border-white/10 bg-[#0c1824]">

            <div className="border-b border-white/10 p-5">

              <h2 className="text-sm font-bold">
                Mission Information
              </h2>

              <p className="mt-1 text-[11px] text-slate-600">
                Current expedition status
              </p>

            </div>

            <div className="grid grid-cols-2 gap-3 p-4">

              <InfoBox
                icon={<MapPin size={13} />}
                label="Region"
                value={region}
              />

              <InfoBox
                icon={<Users size={13} />}
                label="Personnel"
                value={`${personnel} deployed`}
              />

              <InfoBox
                icon={<Calendar size={13} />}
                label="ETA"
                value={eta}
              />

              <InfoBox
                icon={<Fuel size={13} />}
                label="Fuel reserve"
                value={`${fuel}%`}
              />

            </div>

            <div className="border-t border-white/10 p-5">

              <p className="text-[9px] uppercase tracking-[0.2em] text-slate-600">
                Mission Objective
              </p>

              <p className="mt-2 text-xs text-slate-400">
                {description}
              </p>

            </div>

          </div>

          {/* CONDITIONS */}
          <div className="rounded-2xl border border-white/10 bg-[#0c1824]">

            <div className="border-b border-white/10 p-5">

              <h2 className="text-sm font-bold">
                Environmental Conditions
              </h2>

              <p className="mt-1 text-[11px] text-slate-600">
                Live field conditions
              </p>

            </div>

            <div className="grid grid-cols-2 gap-3 p-4">

              <InfoBox
                icon={<Wind size={13} />}
                label="Temperature"
                value={
                  mission.temperature ??
                  "-18°C"
                }
              />

              <InfoBox
                icon={<Wind size={13} />}
                label="Wind speed"
                value={
                  mission.windSpeed ??
                  "32 km/h"
                }
              />

              <InfoBox
                icon={<Activity size={13} />}
                label="Visibility"
                value={
                  mission.visibility ??
                  "8.4 km"
                }
              />

              <InfoBox
                icon={<ShieldCheck size={13} />}
                label="Surface"
                value={
                  mission.surface ??
                  "Stable"
                }
              />

            </div>

            <div className="mx-4 mb-4 rounded-xl border border-yellow-400/10 bg-yellow-400/[0.04] p-4">

              <div className="flex items-center gap-2 text-xs font-medium text-yellow-300">
                <CircleAlert size={14} />
                Environmental advisory
              </div>

              <p className="mt-2 text-[10px] leading-5 text-slate-600">
                Current environmental conditions are
                being monitored by mission control.
              </p>

            </div>

          </div>

        </section>

        {/* ================================================= */}
        {/* MISSION ROUTE - NO IMAGE REQUIRED */}
        {/* ================================================= */}

        <section className="mt-4 overflow-hidden rounded-2xl border border-white/10 bg-[#0c1824]">

          <div className="flex items-center justify-between border-b border-white/10 p-5">

            <div>

              <h2 className="text-sm font-bold">
                Mission Route
              </h2>

              <p className="mt-1 text-[11px] text-slate-600">
                Expedition position and operational waypoints
              </p>

            </div>

            <div className="flex items-center gap-2 rounded-md border border-cyan-400/10 bg-cyan-400/5 px-3 py-1.5">

              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-cyan-400" />

              <span className="text-[8px] font-semibold tracking-[0.15em] text-cyan-300">
                LIVE
              </span>

            </div>

          </div>

          {/* ROUTE AREA */}
          <div className="relative h-[380px] overflow-hidden bg-[#071720]">

            {/* GRID BACKGROUND */}
            <div
              className="absolute inset-0 opacity-50"
              style={{
                backgroundImage:
                  "linear-gradient(rgba(34,211,238,.07) 1px, transparent 1px), linear-gradient(90deg, rgba(34,211,238,.07) 1px, transparent 1px)",
                backgroundSize: "40px 40px",
              }}
            />

            {/* RADAR CIRCLES */}
            <div className="absolute left-1/2 top-1/2 h-[280px] w-[280px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-cyan-400/[0.06]" />

            <div className="absolute left-1/2 top-1/2 h-[190px] w-[190px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-cyan-400/[0.06]" />

            <div className="absolute left-1/2 top-1/2 h-[100px] w-[100px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-cyan-400/[0.06]" />

            {/* ROUTE */}
            <svg
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
              className="absolute inset-0 h-full w-full"
            >

              <defs>

                <filter id="routeGlow">

                  <feGaussianBlur
                    stdDeviation="1.1"
                    result="blur"
                  />

                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>

                </filter>

                <linearGradient
                  id="completedRoute"
                  x1="0%"
                  y1="100%"
                  x2="100%"
                  y2="0%"
                >

                  <stop
                    offset="0%"
                    stopColor="#155e75"
                  />

                  <stop
                    offset="100%"
                    stopColor="#22d3ee"
                  />

                </linearGradient>

              </defs>

              {/* FUTURE ROUTE */}
              <polyline
                points="52,49 72,34 89,20"
                fill="none"
                stroke="#334b55"
                strokeWidth="1"
                strokeDasharray="3 3"
                strokeLinecap="round"
                strokeLinejoin="round"
                vectorEffect="non-scaling-stroke"
              />

              {/* COMPLETED ROUTE */}
              <polyline
                points="12,78 31,62 52,49"
                fill="none"
                stroke="url(#completedRoute)"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
                vectorEffect="non-scaling-stroke"
                filter="url(#routeGlow)"
              />

              {/* BASE */}
              <circle
                cx="12"
                cy="78"
                r="1.7"
                fill="#64748b"
              />

              {/* WP-01 */}
              <circle
                cx="31"
                cy="62"
                r="1.7"
                fill="#22d3ee"
              />

              {/* CURRENT OUTER RING */}
              <circle
                cx="52"
                cy="49"
                r="5"
                fill="rgba(34,211,238,.05)"
                stroke="#22d3ee"
                strokeWidth=".35"
                vectorEffect="non-scaling-stroke"
              />

              {/* CURRENT */}
              <circle
                cx="52"
                cy="49"
                r="2"
                fill="#22d3ee"
                filter="url(#routeGlow)"
              />

              {/* WP-02 */}
              <circle
                cx="72"
                cy="34"
                r="1.7"
                fill="#64748b"
              />

              {/* DESTINATION */}
              <circle
                cx="89"
                cy="20"
                r="1.7"
                fill="#64748b"
              />

            </svg>

            {/* ROUTE LABELS */}

            <RoutePoint
              left="12%"
              top="78%"
              label="BASE"
            />

            <RoutePoint
              left="31%"
              top="62%"
              label="WP-01"
            />

            <RoutePoint
              left="52%"
              top="49%"
              label="CURRENT"
              active
            />

            <RoutePoint
              left="72%"
              top="34%"
              label="WP-02"
            />

            <RoutePoint
              left="89%"
              top="20%"
              label="DESTINATION"
              right
            />

            {/* COORDINATE DISPLAY */}
            <div className="absolute left-4 top-4 rounded-lg border border-white/10 bg-[#07131e]/80 px-3 py-2 backdrop-blur">

              <p className="text-[7px] uppercase tracking-[0.2em] text-slate-600">
                Navigation
              </p>

              <p className="mt-1 text-[9px] text-slate-400">
                ANTARCTIC PENINSULA
              </p>

            </div>

            {/* NORTH INDICATOR */}
            <div className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-[#07131e]/80 text-[9px] text-cyan-300 backdrop-blur">
              N
            </div>

            {/* CURRENT STATUS */}
            <div className="absolute bottom-4 left-4 right-4 rounded-xl border border-white/10 bg-[#07131e]/95 p-4 backdrop-blur-md">

              <div className="flex items-center justify-between">

                <div>

                  <p className="text-[8px] uppercase tracking-[0.2em] text-slate-600">
                    Current Position
                  </p>

                  <p className="mt-1 text-xs font-medium text-slate-300">
                    Antarctic Peninsula
                  </p>

                </div>

                <div className="text-right">

                  <p className="text-[8px] uppercase tracking-[0.2em] text-slate-600">
                    Mission Progress
                  </p>

                  <p className="mt-1 text-lg font-bold text-cyan-300">
                    {progress}%
                  </p>

                </div>

              </div>

              <div className="mt-3 h-1 overflow-hidden rounded-full bg-white/10">

                <div
                  className="h-full rounded-full bg-cyan-400"
                  style={{
                    width: `${progress}%`,
                  }}
                />

              </div>

            </div>

          </div>

          {/* LEGEND */}
          <div className="flex flex-wrap gap-x-6 gap-y-3 border-t border-white/10 px-5 py-4">

            <LegendItem
              dot="bg-cyan-400"
              label="Completed route"
            />

            <LegendItem
              dot="bg-slate-500"
              label="Remaining route"
            />

            <LegendItem
              dot="bg-cyan-300"
              label="Current position"
            />

            <LegendItem
              dot="bg-slate-600"
              label="Waypoint"
            />

          </div>

        </section>

        {/* TIMELINE */}
        <section className="mt-4 overflow-hidden rounded-2xl border border-white/10 bg-[#0c1824]">

          <div className="border-b border-white/10 p-5">

            <h2 className="text-sm font-bold">
              Mission Timeline
            </h2>

            <p className="mt-1 text-[11px] text-slate-600">
              Expedition operational milestones
            </p>

          </div>

          <div className="grid md:grid-cols-4">

            <TimelineItem
              status="START"
              title="Expedition launched"
              description="Mission departed from the primary staging facility."
              active
            />

            <TimelineItem
              status="WP-01"
              title="Initial waypoint"
              description="Initial survey zone successfully reached."
              active
            />

            <TimelineItem
              status="CURRENT"
              title="Mission operation"
              description="Current expedition activity is being monitored."
              active
              current
            />

            <TimelineItem
              status="ETA"
              title="Mission completion"
              description={`Projected completion: ${eta}`}
            />

          </div>

        </section>

        {/* ACTIVITY */}
        <section className="mt-4 overflow-hidden rounded-2xl border border-white/10 bg-[#0c1824]">

          <div className="border-b border-white/10 p-5">

            <h2 className="text-sm font-bold">
              Recent Activity
            </h2>

            <p className="mt-1 text-[11px] text-slate-600">
              Latest expedition events
            </p>

          </div>

          <ActivityRow
            time="01:38 UTC"
            title="Environmental telemetry received"
            description="Weather and route conditions successfully synchronized."
          />

          <ActivityRow
            time="00:54 UTC"
            title="Waypoint confirmation"
            description="WP-01 operational checkpoint confirmed."
          />

          <ActivityRow
            time="23:42 UTC"
            title="Personnel status synchronized"
            description={`${personnel} deployed personnel accounted for.`}
          />

        </section>

      </div>
    </main>
  );
}

/* ========================================================== */
/* STAT CARD                                                   */
/* ========================================================== */

function StatCard({
  icon,
  label,
  value,
  footer,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  footer: string;
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-[#0c1824] p-4">

      <div className="flex items-center justify-between">

        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-cyan-400/10 text-cyan-300">
          {icon}
        </div>

        <CheckCircle2
          size={14}
          className="text-emerald-400"
        />

      </div>

      <p className="mt-4 text-[9px] uppercase tracking-[0.2em] text-slate-600">
        {label}
      </p>

      <p className="mt-2 text-xl font-bold text-slate-100">
        {value}
      </p>

      <p className="mt-1 text-[9px] text-emerald-400">
        {footer}
      </p>

    </div>
  );
}

/* ========================================================== */
/* INFO BOX                                                    */
/* ========================================================== */

function InfoBox({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-xl border border-white/10 bg-[#09141f] p-4">

      <div className="flex items-center gap-2 text-[9px] uppercase tracking-[0.12em] text-slate-600">
        {icon}
        {label}
      </div>

      <p className="mt-2 text-sm font-semibold text-slate-200">
        {value}
      </p>

    </div>
  );
}

/* ========================================================== */
/* ROUTE LABEL                                                 */
/* ========================================================== */

function RoutePoint({
  left,
  top,
  label,
  active = false,
  right = false,
}: {
  left: string;
  top: string;
  label: string;
  active?: boolean;
  right?: boolean;
}) {
  return (
    <div
      className={`pointer-events-none absolute whitespace-nowrap text-[8px] font-semibold tracking-[0.12em] ${
        active
          ? "text-cyan-300"
          : "text-slate-500"
      }`}
      style={{
        left,
        top,
        transform: right
          ? "translate(-100%, -50%)"
          : "translate(9px, -50%)",
      }}
    >
      {label}
    </div>
  );
}

/* ========================================================== */
/* LEGEND                                                      */
/* ========================================================== */

function LegendItem({
  dot,
  label,
}: {
  dot: string;
  label: string;
}) {
  return (
    <div className="flex items-center gap-2">

      <span
        className={`h-1.5 w-1.5 rounded-full ${dot}`}
      />

      <span className="text-[8px] uppercase tracking-[0.12em] text-slate-600">
        {label}
      </span>

    </div>
  );
}

/* ========================================================== */
/* TIMELINE                                                    */
/* ========================================================== */

function TimelineItem({
  status,
  title,
  description,
  active = false,
  current = false,
}: {
  status: string;
  title: string;
  description: string;
  active?: boolean;
  current?: boolean;
}) {
  return (
    <div className="border-b border-white/10 p-5 last:border-b-0 md:border-b-0 md:border-r md:last:border-r-0">

      <div className="flex items-center gap-2">

        <span
          className={`h-2 w-2 rounded-full ${
            current
              ? "bg-cyan-400 shadow-[0_0_10px_rgba(34,211,238,.7)]"
              : active
                ? "bg-emerald-400"
                : "bg-slate-600"
          }`}
        />

        <span className="text-[8px] uppercase tracking-[0.18em] text-slate-600">
          {status}
        </span>

      </div>

      <h3 className="mt-3 text-xs font-semibold text-slate-200">
        {title}
      </h3>

      <p className="mt-2 text-[10px] leading-5 text-slate-500">
        {description}
      </p>

    </div>
  );
}

/* ========================================================== */
/* ACTIVITY                                                    */
/* ========================================================== */

function ActivityRow({
  time,
  title,
  description,
}: {
  time: string;
  title: string;
  description: string;
}) {
  return (
    <div className="flex gap-4 border-b border-white/10 p-5 last:border-b-0">

      <span className="w-16 shrink-0 text-[8px] text-slate-600">
        {time}
      </span>

      <div className="relative pl-4">

        <span className="absolute left-0 top-1.5 h-1.5 w-1.5 rounded-full bg-cyan-400" />

        <p className="text-[10px] font-semibold text-slate-300">
          {title}
        </p>

        <p className="mt-1 text-[9px] text-slate-600">
          {description}
        </p>

      </div>

    </div>
  );
}