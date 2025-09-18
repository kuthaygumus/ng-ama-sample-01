export interface MileTransaction {
  id: string;
  date: string;
  type: MileTransactionType;
  description: string;
  miles: number;
  status: MileTransactionStatus;
  expirationDate?: string;
}

export interface MileSummary {
  totalMiles: number;
  availableMiles: number;
  expiringSoonMiles: number;
  expiringSoonDate: string | null;
  currentYearMiles: number;
  previousYearMiles: number;
  milesUntilNextStatus: number;
  nextStatus: string;
  statusProgress: number;
}

export interface MileMonthlyBreakdown {
  month: string;
  year: number;
  earnedMiles: number;
  spentMiles: number;
  netMiles: number;
}

export interface MileCategoryBreakdown {
  category: string;
  miles: number;
  percentage: number;
}

export type MileTransactionType = 'Flight' | 'Partner' | 'Bonus' | 'Redemption' | 'Adjustment' | 'Transfer' | 'earned' | 'spent';
export type MileTransactionStatus = 'Posted' | 'Pending' | 'Expired' | 'pending';

export interface MileTrackerState {
  transactions: MileTransaction[];
  summary: MileSummary;
  monthlyBreakdown: MileMonthlyBreakdown[];
  categoryBreakdown: MileCategoryBreakdown[];
  loading: boolean;
  error: string | null;
}

export interface MileTrackerContainerData {
  transactions: MileTransaction[];
  summary: MileSummary;
  monthlyBreakdown: MileMonthlyBreakdown[];
  categoryBreakdown: MileCategoryBreakdown[];
  loading: boolean;
  error: string | null;
}

export interface MileTransactionFilterParams {
  startDate?: Date;
  endDate?: Date;
  types?: MileTransactionType[];
  status?: MileTransactionStatus[];
  sortBy?: 'date' | 'miles';
  sortDirection?: 'asc' | 'desc';
}
