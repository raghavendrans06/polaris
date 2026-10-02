"use client";

import { useMemo, useState } from "react";
import {
  AlertTriangle,
  Bell,
  CheckCircle2,
  Clock3,
  MapPin,
  Radio,
  ShieldAlert,
  Siren,
  UserRound,
  X,
} from "lucide-react";

type AlertStatus = "ACTIVE" | "ACKNOWLEDGED" | "RESOLVED";
type Severity = "CRITICAL" | "HIGH" | "MEDIUM";

type AlertItem = {
  id: string;
  title: string;
  mission: string;
  location: string;
  time: string;
  severity: Severity;
  status: AlertStatus;
  description: string;
  personnel: number;
};

const initialAlerts: AlertItem[] = [
  {
    id: "ALT-042",
    title: "Severe Weather Warning",
    mission: "POL-024",
    location: "Antarctic Peninsula",
    time: "02:31 IST",
    severity: "HIGH",
    status: "ACTIVE",
    description:
      "Rapid deterioration in weather conditions detected along the current operational zone.",
    personnel: 24,
  },
  {
    id: "ALT-041",
    title: "Communication Degradation",
    mission: "POL-025",
    location: "East Antarctica",
    time: "01:58 IST",
    severity: "MEDIUM",
    status: "ACKNOWLEDGED",
    description:
      "Satellite communication quality has dropped below the operational threshold.",
    personnel: 18,
  },
  {
    id: "ALT-039",
    title: "Route Deviation",
    mission: "POL-027",
    location: "Queen Maud Land",
    time: "00:47 IST",
    severity: "CRITICAL",
    status: "RESOLVED",
    description:
      "Expedition position temporarily deviated from the planned route.",
    personnel: 16,
  },
];

const severityStyles: Record<
  Severity,
  { text: string; border: string; bg: string }
> = {
  CRITICAL: {
    text: "text-red-400",
    border: "border-red-500/30",
    bg: "bg-red-500/10",
  },
  HIGH: {
    text: "text-orange-400",
    border: "border-orange-500/30",
    bg: "bg-orange-500/10",
  },
  MEDIUM: {
    text: "text-yellow-400",
    border: "border-yellow-500/30",
    bg: "bg-yellow-500/10",
  },
};

export default function EmergencyPage() {
  const [alerts, setAlerts] = useState<AlertItem[]>(initialAlerts);
  const [selectedAlert, setSelectedAlert] = useState<AlertItem | null>(null);
  const [filter, setFilter] = useState<"ALL" | AlertStatus>("ALL");
  const [showCreate, setShowCreate] = useState(false);

  const activeCount = alerts.filter(
    (alert) => alert.status === "ACTIVE"
  ).length;

  const acknowledgedCount = alerts.filter(
    (alert) => alert.status === "ACKNOWLEDGED"
  ).length;

  const resolvedCount = alerts.filter(
    (alert) => alert.status === "RESOLVED"
  ).length;

  const filteredAlerts = useMemo(() => {
    if (filter === "ALL") return alerts;

    return alerts.filter((alert) => alert.status === filter);
  }, [alerts, filter]);

  function acknowledgeAlert(id: string) {
    setAlerts((current) =>
      current.map((alert) =>
        alert.id === id
          ? {
              ...alert,
              status: "ACKNOWLEDGED",
            }
          : alert
      )
    );

    setSelectedAlert(null);
  }

  function resolveAlert(id: string) {
    setAlerts((current) =>
      current.map((alert) =>
        alert.id === id
          ? {
              ...alert,
              status: "RESOLVED",
            }
          : alert
      )
    );

    setSelectedAlert(null);
  }

  function createTestAlert() {
    const newAlert: AlertItem = {
      id: `ALT-${Math.floor(Math.random() * 900 + 100)}`,
      title: "Manual Operations Alert",
      mission: "POL-024",
      location: "Antarctic Peninsula",
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
      severity: "HIGH",
      status: "ACTIVE",
      description:
        "A manual alert has been created by mission control for operational testing.",
      personnel: 24,
    };

    setAlerts((current) => [newAlert, ...current]);
    setShowCreate(false);
  }

  return (
    <main className="min-h-screen bg-[#06111b] text-slate-100">
      <div className="mx-auto max-w-6xl px-6 py-10">
        {/* HEADER */}
        <section className="mb-8 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div>
            <div className="mb-3 flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.25em] text-cyan-400">
              <Siren className="h-4 w-4" />
              Incident Response
            </div>

            <h1 className="text-3xl font-semibold tracking-tight">
              Emergency Center
            </h1>

            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
              Coordinate operational alerts, emergency response and personnel
              safety across Antarctic missions.
            </p>
          </div>

          <button
            onClick={() => setShowCreate(true)}
            className="inline-flex items-center justify-center gap-2 rounded-lg border border-cyan-500/30 bg-cyan-500/10 px-4 py-2.5 text-xs font-semibold text-cyan-300 transition hover:bg-cyan-500/20"
          >
            <Bell className="h-4 w-4" />
            Create Test Alert
          </button>
        </section>

        {/* SYSTEM STATUS */}
        <section className="mb-6 rounded-xl border border-slate-800 bg-[#0b1722] p-4">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div className="flex items-center gap-3">
              <span className="relative flex h-3 w-3">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-50" />
                <span className="relative inline-flex h-3 w-3 rounded-full bg-emerald-400" />
              </span>

              <div>
                <p className="text-xs font-semibold text-slate-200">
                  Emergency response system online
                </p>

                <p className="mt-1 text-[11px] text-slate-500">
                  Monitoring all registered expedition operations
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 text-[10px] uppercase tracking-wider text-emerald-400">
              <Radio className="h-3.5 w-3.5" />
              Live monitoring
            </div>
          </div>
        </section>

        {/* STAT CARDS */}
        <section className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard
            icon={<ShieldAlert className="h-4 w-4" />}
            value={activeCount}
            label="Active Alerts"
            accent="text-red-400"
          />

          <StatCard
            icon={<Clock3 className="h-4 w-4" />}
            value={acknowledgedCount}
            label="Acknowledged"
            accent="text-yellow-400"
          />

          <StatCard
            icon={<CheckCircle2 className="h-4 w-4" />}
            value={resolvedCount}
            label="Resolved"
            accent="text-emerald-400"
          />

          <StatCard
            icon={<UserRound className="h-4 w-4" />}
            value={alerts.reduce((sum, alert) => sum + alert.personnel, 0)}
            label="Personnel Monitored"
            accent="text-cyan-400"
          />
        </section>

        {/* FILTERS */}
        <section className="mb-5 flex flex-wrap items-center gap-2">
          {(["ALL", "ACTIVE", "ACKNOWLEDGED", "RESOLVED"] as const).map(
            (item) => (
              <button
                key={item}
                onClick={() => setFilter(item)}
                className={`rounded-md border px-3 py-2 text-[10px] font-semibold uppercase tracking-wider transition ${
                  filter === item
                    ? "border-cyan-500/40 bg-cyan-500/10 text-cyan-300"
                    : "border-slate-800 bg-[#0b1722] text-slate-500 hover:text-slate-300"
                }`}
              >
                {item}
              </button>
            )
          )}
        </section>

        {/* ALERT LIST */}
        <section className="overflow-hidden rounded-xl border border-slate-800 bg-[#0b1722]">
          <div className="border-b border-slate-800 px-5 py-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-slate-200">
                  Incident Registry
                </p>

                <p className="mt-1 text-[11px] text-slate-600">
                  {filteredAlerts.length} incidents displayed
                </p>
              </div>

              <div className="hidden items-center gap-2 text-[10px] uppercase tracking-wider text-slate-600 sm:flex">
                <Radio className="h-3.5 w-3.5" />
                Synced
              </div>
            </div>
          </div>

          <div className="divide-y divide-slate-800">
            {filteredAlerts.map((alert) => {
              const style = severityStyles[alert.severity];

              return (
                <button
                  key={alert.id}
                  onClick={() => setSelectedAlert(alert)}
                  className="group w-full px-5 py-5 text-left transition hover:bg-slate-900/50"
                >
                  <div className="grid gap-4 lg:grid-cols-[1fr_180px_150px_100px] lg:items-center">
                    {/* ALERT */}
                    <div className="flex gap-4">
                      <div
                        className={`mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border ${style.border} ${style.bg}`}
                      >
                        <AlertTriangle
                          className={`h-4 w-4 ${style.text}`}
                        />
                      </div>

                      <div className="min-w-0">
                        <div className="flex flex-wrap items-center gap-2">
                          <p className="text-sm font-semibold text-slate-200">
                            {alert.title}
                          </p>

                          <span
                            className={`rounded-full border px-2 py-0.5 text-[9px] font-bold ${style.border} ${style.bg} ${style.text}`}
                          >
                            {alert.severity}
                          </span>
                        </div>

                        <p className="mt-1 text-[11px] text-slate-500">
                          {alert.description}
                        </p>

                        <div className="mt-2 flex flex-wrap items-center gap-4 text-[10px] text-slate-600">
                          <span>{alert.id}</span>

                          <span className="flex items-center gap-1">
                            <MapPin className="h-3 w-3" />
                            {alert.location}
                          </span>

                          <span>{alert.time}</span>
                        </div>
                      </div>
                    </div>

                    {/* MISSION */}
                    <div>
                      <p className="text-[9px] uppercase tracking-wider text-slate-600">
                        Mission
                      </p>

                      <p className="mt-1 text-xs font-semibold text-cyan-400">
                        {alert.mission}
                      </p>
                    </div>

                    {/* STATUS */}
                    <div>
                      <p className="text-[9px] uppercase tracking-wider text-slate-600">
                        Status
                      </p>

                      <StatusBadge status={alert.status} />
                    </div>

                    {/* PERSONNEL */}
                    <div>
                      <p className="text-[9px] uppercase tracking-wider text-slate-600">
                        Personnel
                      </p>

                      <p className="mt-1 text-xs font-semibold text-slate-300">
                        {alert.personnel}
                      </p>
                    </div>
                  </div>
                </button>
              );
            })}

            {filteredAlerts.length === 0 && (
              <div className="px-6 py-16 text-center">
                <CheckCircle2 className="mx-auto h-8 w-8 text-emerald-400" />

                <p className="mt-4 text-sm font-semibold text-slate-300">
                  No incidents found
                </p>

                <p className="mt-1 text-xs text-slate-600">
                  There are no alerts matching the selected filter.
                </p>
              </div>
            )}
          </div>
        </section>

        {/* RESPONSE WORKFLOW */}
        <section className="mt-8 grid gap-4 md:grid-cols-3">
          <WorkflowCard
            number="01"
            title="Detect"
            description="Telemetry and field reports generate operational alerts."
            icon={<Radio className="h-4 w-4" />}
          />

          <WorkflowCard
            number="02"
            title="Coordinate"
            description="Mission control acknowledges and coordinates the response."
            icon={<ShieldAlert className="h-4 w-4" />}
          />

          <WorkflowCard
            number="03"
            title="Resolve"
            description="Incident status is updated after the field situation stabilizes."
            icon={<CheckCircle2 className="h-4 w-4" />}
          />
        </section>
      </div>

      {/* ALERT DETAIL MODAL */}
      {selectedAlert && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4 backdrop-blur-sm">
          <div className="w-full max-w-lg rounded-xl border border-slate-700 bg-[#0b1722] shadow-2xl">
            <div className="flex items-start justify-between border-b border-slate-800 p-5">
              <div>
                <div className="flex items-center gap-2">
                  <AlertTriangle
                    className={`h-5 w-5 ${
                      severityStyles[selectedAlert.severity].text
                    }`}
                  />

                  <h2 className="text-base font-semibold text-slate-100">
                    {selectedAlert.title}
                  </h2>
                </div>

                <p className="mt-1 text-[10px] uppercase tracking-wider text-slate-600">
                  {selectedAlert.id}
                </p>
              </div>

              <button
                onClick={() => setSelectedAlert(null)}
                className="rounded-md p-1.5 text-slate-500 transition hover:bg-slate-800 hover:text-slate-200"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="space-y-5 p-5">
              <div
                className={`rounded-lg border p-4 ${
                  severityStyles[selectedAlert.severity].border
                } ${severityStyles[selectedAlert.severity].bg}`}
              >
                <p className="text-xs leading-5 text-slate-300">
                  {selectedAlert.description}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <InfoBox
                  label="Mission"
                  value={selectedAlert.mission}
                />

                <InfoBox
                  label="Severity"
                  value={selectedAlert.severity}
                />

                <InfoBox
                  label="Location"
                  value={selectedAlert.location}
                />

                <InfoBox
                  label="Personnel"
                  value={String(selectedAlert.personnel)}
                />
              </div>

              <div>
                <p className="mb-2 text-[9px] font-semibold uppercase tracking-wider text-slate-600">
                  Current status
                </p>

                <StatusBadge status={selectedAlert.status} />
              </div>

              <div className="flex flex-col gap-2 sm:flex-row">
                {selectedAlert.status === "ACTIVE" && (
                  <button
                    onClick={() => acknowledgeAlert(selectedAlert.id)}
                    className="flex-1 rounded-lg border border-yellow-500/30 bg-yellow-500/10 px-4 py-3 text-xs font-semibold text-yellow-300 transition hover:bg-yellow-500/20"
                  >
                    Acknowledge Alert
                  </button>
                )}

                {selectedAlert.status !== "RESOLVED" && (
                  <button
                    onClick={() => resolveAlert(selectedAlert.id)}
                    className="flex-1 rounded-lg border border-emerald-500/30 bg-emerald-500/10 px-4 py-3 text-xs font-semibold text-emerald-300 transition hover:bg-emerald-500/20"
                  >
                    Mark Resolved
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* CREATE TEST ALERT MODAL */}
      {showCreate && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-xl border border-slate-700 bg-[#0b1722] shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-800 p-5">
              <div>
                <h2 className="text-base font-semibold text-slate-100">
                  Create Test Alert
                </h2>

                <p className="mt-1 text-[11px] text-slate-600">
                  Simulate an operational incident.
                </p>
              </div>

              <button
                onClick={() => setShowCreate(false)}
                className="rounded-md p-1.5 text-slate-500 hover:bg-slate-800 hover:text-slate-200"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="p-5">
              <div className="rounded-lg border border-orange-500/20 bg-orange-500/5 p-4">
                <div className="flex gap-3">
                  <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-orange-400" />

                  <div>
                    <p className="text-xs font-semibold text-orange-300">
                      Simulation mode
                    </p>

                    <p className="mt-1 text-[11px] leading-5 text-slate-500">
                      This creates a local test alert only. No external
                      emergency service will be contacted.
                    </p>
                  </div>
                </div>
              </div>

              <button
                onClick={createTestAlert}
                className="mt-5 w-full rounded-lg bg-cyan-500 px-4 py-3 text-xs font-bold text-slate-950 transition hover:bg-cyan-400"
              >
                Create Alert
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

function StatCard({
  icon,
  value,
  label,
  accent,
}: {
  icon: React.ReactNode;
  value: number;
  label: string;
  accent: string;
}) {
  return (
    <div className="rounded-xl border border-slate-800 bg-[#0b1722] p-5">
      <div
        className={`mb-4 flex h-8 w-8 items-center justify-center rounded-lg bg-slate-800/80 ${accent}`}
      >
        {icon}
      </div>

      <p className={`text-2xl font-semibold ${accent}`}>{value}</p>

      <p className="mt-1 text-[9px] uppercase tracking-[0.2em] text-slate-600">
        {label}
      </p>
    </div>
  );
}

function StatusBadge({ status }: { status: AlertStatus }) {
  const styles: Record<AlertStatus, string> = {
    ACTIVE:
      "border-red-500/30 bg-red-500/10 text-red-400",
    ACKNOWLEDGED:
      "border-yellow-500/30 bg-yellow-500/10 text-yellow-400",
    RESOLVED:
      "border-emerald-500/30 bg-emerald-500/10 text-emerald-400",
  };

  return (
    <span
      className={`mt-1 inline-flex rounded-full border px-2 py-1 text-[9px] font-bold ${styles[status]}`}
    >
      {status}
    </span>
  );
}

function WorkflowCard({
  number,
  title,
  description,
  icon,
}: {
  number: string;
  title: string;
  description: string;
  icon: React.ReactNode;
}) {
  return (
    <div className="rounded-xl border border-slate-800 bg-[#0b1722] p-5">
      <div className="flex items-center justify-between">
        <span className="text-[10px] font-bold tracking-[0.2em] text-slate-700">
          {number}
        </span>

        <span className="text-cyan-400">{icon}</span>
      </div>

      <h3 className="mt-5 text-sm font-semibold text-slate-200">
        {title}
      </h3>

      <p className="mt-2 text-[11px] leading-5 text-slate-600">
        {description}
      </p>
    </div>
  );
}

function InfoBox({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-lg border border-slate-800 bg-[#08131d] p-3">
      <p className="text-[9px] uppercase tracking-wider text-slate-600">
        {label}
      </p>

      <p className="mt-1 text-xs font-semibold text-slate-300">
        {value}
      </p>
    </div>
  );
}