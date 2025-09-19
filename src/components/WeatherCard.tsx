import React from "react";
import {
  Sun,
  Cloud,
  CloudRain,
  Zap,
  Snowflake,
  Wind,
  Droplet,
  Thermometer,
} from "lucide-react";

export type WeatherCardProps = {
  // friendly fields you can pass directly
  day?: string;               // "Today", "Mon"
  dateIso?: string;           // optional ISO date
  tempAvg?: number | null;
  tempMin?: number | null;
  tempMax?: number | null;
  precipProb?: number | null; // percentage 0-100
  precipAccum?: number | null; // mm
  cloudCover?: number | null; // percentage 0-100
  humidity?: number | null;   // percentage
  windSpeed?: number | null;  // km/h or m/s depending on your units
  weatherCode?: number | null; // optional provider code (tomorrow.io)
  description?: string | null;
  unit?: "metric" | "imperial";
  compact?: boolean;
  onClick?: () => void;
  className?: string;
};

function chooseIcon({
  weatherCode,
  precipProb,
  precipAccum,
  cloudCover,
  tempAvg,
}: {
  weatherCode?: number | null;
  precipProb?: number | null;
  precipAccum?: number | null;
  cloudCover?: number | null;
  tempAvg?: number | null;
}) {
  // Heuristic icon selection (sensible defaults)
  const pp = precipProb ?? 0;
  const pa = precipAccum ?? 0;
  const cc = cloudCover ?? 0;
  const t = tempAvg ?? 999;

  if (pa > 10 || pp >= 60) return CloudRain;
  if (weatherCode === 1000) return Sun; // clear
  if (cc >= 70) return Cloud;
  if (pp >= 30 && pp < 60) return CloudRain;
  if (t <= 0 && pa > 0) return Snowflake;
  // thunder heuristic
  if (pp > 50 && (cc > 60) && (pa > 5)) return Zap;

  return Sun;
}

/** Small inline precip bar (simple visual) */
const PrecipBar: React.FC<{ value?: number | null }> = ({ value = 0 }) => {
  const v = Math.max(0, Math.min(100, value ?? 0));
  return (
    <div className="w-full h-2 bg-muted rounded overflow-hidden" aria-hidden>
      <div
        className="h-2 bg-blue-400"
        style={{ width: `${v}%`, transition: "width .35s ease" }}
      />
    </div>
  );
};

const WeatherCard: React.FC<WeatherCardProps> = ({
  day,
  dateIso,
  tempAvg,
  tempMin,
  tempMax,
  precipProb,
  precipAccum,
  cloudCover,
  humidity,
  windSpeed,
  weatherCode,
  description,
  unit = "metric",
  compact = false,
  onClick,
  className = "",
}) => {
  const Icon = chooseIcon({ weatherCode, precipProb, precipAccum, cloudCover, tempAvg });

  // readable temp formatting
  const fmtTemp = (v?: number | null) =>
    v == null ? "—" : `${Math.round(v)}°${unit === "metric" ? "C" : "F"}`;

  const ariaDesc =
    description ??
    (precipProb != null && precipProb > 50
      ? "Likely precipitation"
      : cloudCover != null && cloudCover > 50
      ? "Cloudy"
      : "Sunny");

  return (
    <article
      role={onClick ? "button" : "article"}
      aria-label={`Weather for ${day ?? dateIso ?? "day"}. ${ariaDesc}.`}
      onClick={onClick}
      className={`flex flex-col items-center text-center bg-card border border-transparent rounded-lg p-3 shadow-sm w-40 md:w-44 ${
        compact ? "p-2 w-32 md:w-36" : ""
      } ${className}`}
    >
      <div className="flex items-center gap-2 mb-1">
        <span className="text-xs text-muted-foreground">{day ?? (dateIso ? new Date(dateIso).toLocaleDateString(undefined, { weekday: "short" }) : "")}</span>
      </div>

      <Icon className="w-8 h-8 text-sky-500 mb-1" aria-hidden />

      <div className="text-lg font-semibold">{fmtTemp(tempAvg)}</div>

      <div className="flex gap-2 items-center text-xs text-muted-foreground mt-1">
        {tempMin != null && tempMax != null ? (
          <div className="flex flex-col">
            <span>Min {fmtTemp(tempMin)}</span>
            <span>Max {fmtTemp(tempMax)}</span>
          </div>
        ) : null}
      </div>

      <div className="w-full mt-2">
        <div className="flex justify-between items-center text-xs text-muted-foreground mb-1">
          <span className="flex items-center gap-1">
            <Droplet className="w-3 h-3 text-sky-500" /> {precipProb != null ? `${Math.round(precipProb)}%` : "—"}
          </span>
          <span className="text-xs">{precipAccum != null ? `${precipAccum} mm` : ""}</span>
        </div>

        <PrecipBar value={precipProb ?? 0} />
      </div>

      <div className="w-full mt-2 flex justify-between items-center text-xs text-muted-foreground">
        <span className="flex items-center gap-1">
          <Thermometer className="w-3 h-3" /> {humidity != null ? `${Math.round(humidity)}%` : "—"}
        </span>
        <span className="flex items-center gap-1">
          <Wind className="w-3 h-3" /> {windSpeed != null ? `${Math.round(windSpeed)} ${unit === "metric" ? "km/h" : "mph"}` : "—"}
        </span>
      </div>

      {description ? (
        <div className="text-[11px] text-muted-foreground mt-2">{description}</div>
      ) : null}
    </article>
  );
};

export default WeatherCard;
