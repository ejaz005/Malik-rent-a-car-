import test from 'node:test';
import assert from 'node:assert/strict';
import { calculateRentalCost, formatCurrency, buildWhatsAppBookingUrl } from './calculator';

test('calculateRentalCost calculates 1 day without driver correctly', () => {
  const result = calculateRentalCost({
    dailyRatePkr: 16000,
    days: 1,
    withDriver: false,
  });

  assert.equal(result.baseCarTotalPkr, 16000);
  assert.equal(result.driverTotalPkr, 0);
  assert.equal(result.discountPkr, 0);
  assert.equal(result.finalPkr, 16000);
  assert.equal(result.days, 1);
});

test('calculateRentalCost adds driver allowance and applies 5% discount for 5 days', () => {
  const result = calculateRentalCost({
    dailyRatePkr: 10000,
    days: 5,
    withDriver: true,
    driverDailyRate: 2500,
  });

  assert.equal(result.baseCarTotalPkr, 50000);
  assert.equal(result.driverTotalPkr, 12500);
  // 5% discount on base car: 50,000 * 0.05 = 2,500
  assert.equal(result.discountPkr, 2500);
  assert.equal(result.finalPkr, 50000 + 12500 - 2500); // 60,000
});

test('calculateRentalCost applies 10% discount for 7+ days', () => {
  const result = calculateRentalCost({
    dailyRatePkr: 10000,
    days: 10,
    withDriver: false,
  });

  assert.equal(result.baseCarTotalPkr, 100000);
  // 10% discount on base car: 10,000
  assert.equal(result.discountPkr, 10000);
  assert.equal(result.finalPkr, 90000);
});

test('formatCurrency formats PKR and USD with commas and signs', () => {
  assert.equal(formatCurrency(16000, 'PKR'), 'PKR 16,000');
  assert.equal(formatCurrency(150, 'USD'), '$150');
});

test('buildWhatsAppBookingUrl contains phone and vehicle details', () => {
  const url = buildWhatsAppBookingUrl({
    phone: '0317 9236600',
    carName: 'Toyota Prado TX/TZ 2018',
    startDate: '2026-06-01',
    endDate: '2026-06-07',
    days: 7,
    withDriver: true,
    customerName: 'Ali Ahmed',
  });

  assert.ok(url.startsWith('https://wa.me/923179236600'));
  assert.ok(url.includes(encodeURIComponent('Toyota Prado TX/TZ 2018')));
  assert.ok(url.includes(encodeURIComponent('With Local Mountain Driver')));
});
