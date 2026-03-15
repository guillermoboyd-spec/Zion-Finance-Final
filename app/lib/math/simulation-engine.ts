export interface FinancialEvent {
  age: number;
  amount: number; // Positivo para ingreso, negativo para gasto
  label: string;
}

export interface SimulationParams {
  currentAge: number;
  retirementAge: number;
  currentSavings: number;
  monthlyContribution: number;
  annualReturn: number;
  inflation: number;
  annualExpenses: number;
  events: FinancialEvent[]; // <-- Nueva lista de eventos
}

export interface SimulationStep {
  age: number;
  balance: number;
}

export const runAdvancedSimulation = (params: SimulationParams): SimulationStep[] => {
  const steps: SimulationStep[] = [];
  let currentBalance = params.currentSavings;
  const totalYears = 100 - params.currentAge;

  for (let i = 0; i <= totalYears; i++) {
    const currentAge = params.currentAge + i;
    const isRetired = currentAge >= params.retirementAge;
    const realRate = (1 + params.annualReturn) / (1 + params.inflation) - 1;

    // Buscar si hay un evento este año (ej. comprar casa)
    const eventImpact = params.events
      .filter(e => e.age === currentAge)
      .reduce((acc, curr) => acc + curr.amount, 0);

    const annualFlow = isRetired 
      ? -(params.annualExpenses * Math.pow(1 + params.inflation, i)) 
      : (params.monthlyContribution * 12);

    // Sumamos el flujo anual + el impacto del evento
    currentBalance = (currentBalance + annualFlow + eventImpact) * (1 + realRate);

    steps.push({
      age: currentAge,
      balance: Math.round(currentBalance)
    });
  }
  return steps;
};