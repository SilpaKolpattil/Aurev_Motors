export function calculateEmi({
  price,
  downPaymentPct,
  years,
  annualRate,
}) {
  const downPayment = price * (downPaymentPct / 100);
  const principal = price - downPayment;
  const months = years * 12;
  const monthlyRate = annualRate / 12 / 100;

  let emi;

  if (principal <= 0) {
    emi = 0;
  } else if (monthlyRate === 0) {
    emi = principal / months;
  } else {
    const factor = Math.pow(1 + monthlyRate, months);
    emi = (principal * monthlyRate * factor) / (factor - 1);
  }

  const totalPayable = emi * months;

  return {
    downPayment,
    principal,
    emi,
    totalInterest: totalPayable - principal,
    totalPayable,
  };
}

