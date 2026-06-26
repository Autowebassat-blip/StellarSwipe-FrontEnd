/**
 * @jest-environment jsdom
 */

import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import SecuritySettingsPage from "../page";
import { securityProgram } from "@/lib/securityProgram";

jest.mock("@/components/TwoFactorSetupWizard", () => ({
  TwoFactorSetupWizard: () => <div>Two-factor setup wizard</div>,
  DisableTwoFactor: () => <button type="button">Disable 2FA</button>,
}));

describe("SecuritySettingsPage", () => {
  it("renders the bug bounty program from maintainable content", () => {
    render(<SecuritySettingsPage />);

    expect(screen.getByText(securityProgram.title)).toBeTruthy();
    expect(screen.getByText(securityProgram.summary)).toBeTruthy();
    expect(
      screen.getByRole("link", { name: securityProgram.submission.label })
    ).toHaveAttribute("href", securityProgram.submission.href);

    expect(
      screen.getByRole("region", { name: securityProgram.title }).textContent
    ).toMatchInlineSnapshot(
      `"Bug Bounty ProgramHelp keep StellarSwipe users safe by reporting reproducible security issues through responsible disclosure.ScopeAuthentication, session, and account protection issuesWallet connection, signing, and transaction flow vulnerabilitiesAPI routes that handle user, portfolio, or trade dataFrontend handling of sensitive security or trading stateReward tiersCriticalCase-by-case priority bounty reviewHighEligible for bounty considerationMedium / LowAcknowledgement and triageSubmission processEmail security@stellarswipe.app with the affected route or component, reproduction steps, expected impact, and any suggested fix.Report a vulnerability"`
    );
  });
});
