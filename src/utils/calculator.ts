/**
 * Pricing and booking logic utilities for Malik Rent A Car Gilgit Baltistan
 */

export interface PriceCalculationParams {
  dailyRatePkr: number;
  days: number;
  withDriver: boolean;
  driverDailyRate?: number;
  includeFuel?: boolean;
  estimatedKmPerDay?: number;
  fuelRatePerKm?: number;
  currency?: 'PKR' | 'USD';
  usdExchangeRate?: number;
}

export interface PriceEstimateResult {
  baseCarTotalPkr: number;
  driverTotalPkr: number;
  fuelTotalPkr: number;
  totalPkr: number;
  totalUsd: number;
  discountPkr: number;
  finalPkr: number;
  finalUsd: number;
  days: number;
}

const DEFAULT_DRIVER_DAILY_RATE = 2500; // PKR 2,500/day driver daily allowance
const DEFAULT_USD_EXCHANGE_RATE = 280; // 1 USD = 280 PKR approx

/**
 * Calculates rental total with volume discounts (5% for 4+ days, 10% for 7+ days)
 */
export function calculateRentalCost(params: PriceCalculationParams): PriceEstimateResult {
  const days = Math.max(1, Math.round(params.days || 1));
  const dailyRate = Math.max(0, params.dailyRatePkr || 0);
  const driverRate = params.driverDailyRate ?? DEFAULT_DRIVER_DAILY_RATE;
  const exchangeRate = params.usdExchangeRate || DEFAULT_USD_EXCHANGE_RATE;

  const baseCarTotalPkr = dailyRate * days;
  const driverTotalPkr = params.withDriver ? driverRate * days : 0;
  
  let fuelTotalPkr = 0;
  if (params.includeFuel) {
    const kmPerDay = params.estimatedKmPerDay || 150;
    const ratePerKm = params.fuelRatePerKm || 45; // average 4x4 fuel cost per km
    fuelTotalPkr = kmPerDay * ratePerKm * days;
  }

  const subtotalPkr = baseCarTotalPkr + driverTotalPkr + fuelTotalPkr;

  // Multi-day discount
  let discountPercentage = 0;
  if (days >= 7) {
    discountPercentage = 0.10; // 10% discount for week-long trips
  } else if (days >= 4) {
    discountPercentage = 0.05; // 5% discount
  }

  const discountPkr = Math.round(baseCarTotalPkr * discountPercentage);
  const finalPkr = subtotalPkr - discountPkr;
  const finalUsd = Math.round(finalPkr / exchangeRate);
  const totalUsd = Math.round(subtotalPkr / exchangeRate);

  return {
    baseCarTotalPkr,
    driverTotalPkr,
    fuelTotalPkr,
    totalPkr: subtotalPkr,
    totalUsd,
    discountPkr,
    finalPkr,
    finalUsd,
    days,
  };
}

/**
 * Formats PKR currency with proper commas and suffix
 */
export function formatCurrency(amount: number, currency: 'PKR' | 'USD' = 'PKR'): string {
  if (currency === 'USD') {
    return `$${amount.toLocaleString('en-US')}`;
  }
  return `PKR ${amount.toLocaleString('en-PK')}`;
}

/**
 * Builds prefilled WhatsApp message URL
 */
export function buildWhatsAppBookingUrl(details: {
  phone?: string;
  carName: string;
  startDate?: string;
  endDate?: string;
  days?: number;
  pickupLocation?: string;
  dropoffLocation?: string;
  withDriver?: boolean;
  customerName?: string;
}): string {
  let raw = (details.phone || '923179236600').replace(/[^0-9]/g, '');
  if (raw.startsWith('03')) {
    raw = '92' + raw.slice(1);
  } else if (!raw.startsWith('92') && raw.length === 10) {
    raw = '92' + raw;
  }
  const targetPhone = raw || '923179236600';
  
  const lines = [
    `*Booking Inquiry - Malik Rent A Car Gilgit Baltistan*`,
    `🚗 Vehicle: ${details.carName}`,
    details.startDate ? `📅 Dates: ${details.startDate}${details.endDate ? ` to ${details.endDate}` : ''} (${details.days || 1} days)` : '',
    details.pickupLocation ? `📍 Pick-up: ${details.pickupLocation}` : '',
    details.dropoffLocation ? `🏁 Drop-off: ${details.dropoffLocation}` : '',
    `👨‍✈️ Driver Option: ${details.withDriver ? 'With Local Mountain Driver' : 'Self-Drive'}`,
    details.customerName ? `👤 Name: ${details.customerName}` : '',
    `\nHello Malik Rent A Car team, please confirm availability and provide final quote. Thank you!`
  ].filter(Boolean);

  const message = lines.join('\n');
  return `https://wa.me/${targetPhone}?text=${encodeURIComponent(message)}`;
}
