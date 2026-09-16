/**
 * Mock payment gateway for Dr. Wynette's Foundation.
 * No live payment provider is configured — this layer simulates checkout only.
 */

import type { DonationRequest, PaymentIntent } from "@/types";

export const PAYMENT_DISCLAIMER =
  "Demo mode: no real payment is processed. Connect Paystack, Flutterwave, or Stripe later via this service layer.";

export type MockPaymentInput = {
  amount: number;
  currency: string;
  paymentMethod: string;
  donorEmail?: string;
  donorName?: string;
  donationType: string;
  reference?: string;
};

export type MockPaymentResult = {
  success: boolean;
  status: "pending" | "mock_success" | "failed";
  reference: string;
  providerRef: string;
  message: string;
  processedAt: string;
};

export async function processMockPayment(
  input: MockPaymentInput
): Promise<MockPaymentResult> {
  await new Promise((resolve) => setTimeout(resolve, 600));

  if (!input.amount || input.amount <= 0) {
    return {
      success: false,
      status: "failed",
      reference: input.reference ?? `DWF-FAIL-${Date.now()}`,
      providerRef: "mock_invalid_amount",
      message: "Invalid donation amount.",
      processedAt: new Date().toISOString(),
    };
  }

  const reference = input.reference ?? `DWF-MOCK-${Date.now()}`;

  return {
    success: true,
    status: "mock_success",
    reference,
    providerRef: `mock_${input.paymentMethod}_${Date.now()}`,
    message:
      "Mock payment recorded successfully. No real charge was made — payment processing is not live.",
    processedAt: new Date().toISOString(),
  };
}

export function isMockPaymentMode() {
  return process.env.MOCK_PAYMENT_ENABLED !== "false";
}

type PendingIntent = DonationRequest & {
  donationType?: string;
  paymentMethod?: string;
  isAnonymous?: boolean;
};

const pendingIntents = new Map<string, PendingIntent>();

export async function createDonationIntent(
  input: PendingIntent
): Promise<PaymentIntent> {
  const id = `intent_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
  pendingIntents.set(id, input);

  return {
    id,
    amount: input.amount,
    currency: input.currency,
    status: "pending",
    createdAt: new Date().toISOString(),
    message: "Donation intent created. Confirm to complete mock payment.",
  };
}

export async function confirmMockPayment(
  intentId: string
): Promise<PaymentIntent> {
  const input = pendingIntents.get(intentId);
  if (!input) {
    throw new Error("Donation intent not found or expired.");
  }

  const response = await fetch("/api/donate", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      amount: input.amount,
      currency: input.currency,
      donationType: input.donationType ?? "one-time",
      paymentMethod: input.paymentMethod ?? "mobile-money",
      isAnonymous: input.isAnonymous ?? false,
      donorName: input.donorName,
      donorEmail: input.donorEmail,
      message: input.message,
    }),
  });

  const data = await response.json();
  pendingIntents.delete(intentId);

  if (!response.ok) {
    throw new Error(data.error ?? "Payment failed");
  }

  return {
    id: data.donation?.id ?? intentId,
    amount: input.amount,
    currency: input.currency,
    status:
      data.payment?.status === "mock_success" ? "mock_success" : "pending",
    createdAt: new Date().toISOString(),
    message: data.payment?.message ?? "Mock payment completed.",
  };
}
