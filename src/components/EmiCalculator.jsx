import { useMemo, useState } from "react";
import { calculateEmi } from "../utils/emi";
import { formatINR } from "../utils/format";

export default function EmiCalculator({ price }) {
  const [downPaymentPct, setDown] = useState(20);
  const [years, setYears] = useState(5);
  const [annualRate, setRate] = useState(9);

  const result = useMemo(
    () =>
      calculateEmi({
        price,
        downPaymentPct,
        years,
        annualRate,
      }),
    [price, downPaymentPct, years, annualRate]
  );

  return (
    <section className="panel emi-calculator" aria-labelledby="emi-title">
      <h3 id="emi-title">EMI Calculator</h3>
      <p className="emi-subtitle">
        Estimate your monthly car loan payment.
      </p>

      <div className="emi-controls">
        <label>
          <span>
            Down payment <strong>{downPaymentPct}%</strong>
          </span>
          <input
            type="range"
            min="0"
            max="80"
            step="5"
            value={downPaymentPct}
            onChange={(e) => setDown(Number(e.target.value))}
          />
        </label>

        <label>
          <span>
            Loan tenure <strong>{years} years</strong>
          </span>
          <input
            type="range"
            min="1"
            max="7"
            value={years}
            onChange={(e) => setYears(Number(e.target.value))}
          />
        </label>

        <label>
          <span>
            Interest rate <strong>{annualRate}% p.a.</strong>
          </span>
          <input
            type="range"
            min="6"
            max="16"
            step="0.5"
            value={annualRate}
            onChange={(e) => setRate(Number(e.target.value))}
          />
        </label>
      </div>

      <div className="emi-results" aria-live="polite">
        <div className="emi-highlight">
          <span>Estimated monthly EMI</span>
          <strong>{formatINR(result.emi)}</strong>
        </div>

        <div className="emi-result-row">
          <span>Car price</span>
          <strong>{formatINR(price)}</strong>
        </div>

        <div className="emi-result-row">
          <span>Down payment</span>
          <strong>{formatINR(result.downPayment)}</strong>
        </div>

        <div className="emi-result-row">
          <span>Loan amount</span>
          <strong>{formatINR(result.principal)}</strong>
        </div>

        <div className="emi-result-row">
          <span>Total interest</span>
          <strong>{formatINR(result.totalInterest)}</strong>
        </div>

        <div className="emi-result-row">
          <span>Total loan repayment</span>
          <strong>{formatINR(result.totalPayable)}</strong>
        </div>
      </div>

      <p className="emi-disclaimer">
        Illustrative estimate only. Actual loan terms, fees and EMI may vary
        by lender.
      </p>
    </section>
  );
}

