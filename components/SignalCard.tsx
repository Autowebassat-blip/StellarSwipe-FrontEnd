import { SignalBadge } from "./SignalBadge";
import { ProviderBadge, VerificationLevel } from "./ProviderBadge";

interface SignalCardProps {
  asset: string;
  signal: "BUY" | "SELL";
  description?: string;
  provider?: string;
  verificationLevel?: VerificationLevel;
}

export function SignalCard({
  asset,
  signal,
  description,
  provider,
  verificationLevel = "new",
}: SignalCardProps) {
  return (
    <div className="rounded-2xl border bg-card p-5 shadow-sm flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <span className="font-semibold text-lg">{asset}</span>
        <SignalBadge signal={signal} />
      </div>
      {provider && (
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <span>{provider}</span>
          <ProviderBadge level={verificationLevel} />
        </div>
      )}
      {description && (
        <p className="text-sm text-muted-foreground">{description}</p>
      )}
    </div>
  );
}
