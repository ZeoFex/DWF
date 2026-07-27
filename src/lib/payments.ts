import type { DonationRequest, PaymentIntent, PaymentStatus } from "@/types";

/**
 * Mock payment service layer for Dr. Winnie's Foundation.
 *
 * IMPORTANT: This module NEVER confirms real payments.
 * All responses return pending or mock statuses for development and UI testing only.
 * Replace with a real payment provider (Paystack, Stripe, etc.) before accepting live donations.
 */

const MOCK_PAYMENT_PREFIX = "mock_pi_";

function generateMockId(): string {
  return `${MOCK_PAYMENT_PREFIX}${Date.now()}_${Math.random().toString(36).slice(2, 9)}`;
}

function createMockPaymentIntent(
  request: DonationRequest,
  status: PaymentStatus
): PaymentIntent {
  return {
    id: generateMockId(),
    amount: request.amount,
    currency: request.currency,
    status,
    createdAt: new Date().toISOString(),
    message:
      status === "pending"
        ? "This is a mock payment intent. No real charge has been made. Integrate a live payment provider before accepting donations."
        : status === "mock_success"
          ? "Mock payment marked successful for UI testing only. No funds were transferred."
          : "Mock payment failed for UI testing only. No funds were transferred.",
  };
}

/**
 * Creates a mock payment intent in pending status.
 * Does NOT initiate any real payment processing.
 */
export async function createDonationIntent(
  request: DonationRequest
): Promise<PaymentIntent> {
  if (request.amount <= 0) {
    throw new Error("Donation amount must be greater than zero.");
  }

  // Simulate network latency for realistic UI behavior
  await new Promise((resolve) => setTimeout(resolve, 300));

  return createMockPaymentIntent(request, "pending");
}

/**
 * Simulates confirming a payment — always returns mock status, never real confirmation.
 */
export async function confirmMockPayment(
  paymentIntentId: string
): Promise<PaymentIntent> {
  if (!paymentIntentId.startsWith(MOCK_PAYMENT_PREFIX)) {
    throw new Error(
      "Invalid payment intent ID. This service only handles mock payments."
    );
  }

  await new Promise((resolve) => setTimeout(resolve, 500));

  return {
    id: paymentIntentId,
    amount: 0,
    currency: "GHS",
    status: "mock_success",
    createdAt: new Date().toISOString(),
    message:
      "Mock confirmation only. No real payment was processed. Replace this service before going live.",
  };
}

/**
 * Returns whether the payment system is in mock/demo mode.
 * Always true until a real provider is integrated.
 */
export function isMockPaymentMode(): boolean {
  return true;
}

/** Human-readable disclaimer for donation UI. */
export const PAYMENT_DISCLAIMER =
  "Donations on this site are currently in demonstration mode. No real payments are processed. Contact info@drwinniesfoundation.org to donate directly until online payments are live.";
