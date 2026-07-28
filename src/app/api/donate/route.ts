import { z } from "zod";
import { DonationType, PaymentStatus } from "@/generated/prisma";
import { prisma } from "@/lib/db";
import { PAYMENT_DISCLAIMER, processMockPayment } from "@/lib/payments";
import { handleApiError, jsonError, jsonOk } from "@/lib/admin-api";

const donationTypeMap: Record<string, DonationType> = {
  "one-time": DonationType.ONE_TIME,
  one_time: DonationType.ONE_TIME,
  ONE_TIME: DonationType.ONE_TIME,
  monthly: DonationType.MONTHLY,
  MONTHLY: DonationType.MONTHLY,
  corporate: DonationType.CORPORATE,
  CORPORATE: DonationType.CORPORATE,
  "sponsor-girl": DonationType.SPONSOR_GIRL,
  sponsor_girl: DonationType.SPONSOR_GIRL,
  SPONSOR_GIRL: DonationType.SPONSOR_GIRL,
  "sponsor-outreach": DonationType.SPONSOR_OUTREACH,
  sponsor_outreach: DonationType.SPONSOR_OUTREACH,
  SPONSOR_OUTREACH: DonationType.SPONSOR_OUTREACH,
};

const donateSchema = z.object({
  amount: z.number().positive(),
  currency: z.string().min(3).max(3).default("GHS"),
  donationType: z.string().min(1),
  paymentMethod: z.string().min(1),
  isAnonymous: z.boolean().optional().default(false),
  donorName: z.string().max(120).optional(),
  donorEmail: z.string().email().optional(),
  donorPhone: z.string().max(40).optional(),
  message: z.string().max(2000).optional(),
  projectId: z.string().optional(),
});

function generateReference() {
  return `DWF-${Date.now()}-${Math.random().toString(36).slice(2, 8).toUpperCase()}`;
}

export async function POST(request: Request) {
  try {
    const body = donateSchema.parse(await request.json());
    const donationType = donationTypeMap[body.donationType];

    if (!donationType) {
      return jsonError("Invalid donation type", 422);
    }

    if (body.projectId) {
      const project = await prisma.project.findUnique({
        where: { id: body.projectId },
        select: { id: true },
      });
      if (!project) {
        return jsonError("Project not found", 404);
      }
    }

    const reference = generateReference();

    const donation = await prisma.donation.create({
      data: {
        reference,
        amount: body.amount,
        currency: body.currency.toUpperCase(),
        donationType,
        paymentMethod: body.paymentMethod,
        status: PaymentStatus.PENDING,
        isAnonymous: body.isAnonymous ?? false,
        donorName: body.isAnonymous ? null : body.donorName?.trim() || null,
        donorEmail: body.donorEmail?.toLowerCase() || null,
        donorPhone: body.donorPhone?.trim() || null,
        message: body.message?.trim() || null,
        projectId: body.projectId || null,
      },
    });

    const payment = await processMockPayment({
      amount: body.amount,
      currency: body.currency,
      paymentMethod: body.paymentMethod,
      donorEmail: body.donorEmail,
      donorName: body.donorName,
      donationType: body.donationType,
      reference,
    });

    const status: PaymentStatus =
      payment.status === "mock_success"
        ? PaymentStatus.MOCK_SUCCESS
        : payment.status === "failed"
          ? PaymentStatus.FAILED
          : PaymentStatus.PENDING;

    const updated = await prisma.donation.update({
      where: { id: donation.id },
      data: {
        status,
        mockProviderRef: payment.providerRef,
        metadata: {
          paymentMessage: payment.message,
          processedAt: payment.processedAt,
        },
      },
    });

    return jsonOk(
      {
        donation: updated,
        payment: {
          success: payment.success,
          status: payment.status,
          reference: payment.reference,
          message: payment.message,
        },
        disclaimer: PAYMENT_DISCLAIMER,
      },
      201
    );
  } catch (error) {
    return handleApiError(error);
  }
}
