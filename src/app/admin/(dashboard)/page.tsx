import Link from "next/link";
import { formatDistanceToNow } from "date-fns";
import { FileText, Heart, Image, Mail } from "lucide-react";
import { PageHeader, StatCard, StatusBadge, paymentStatusVariant } from "@/components/admin";
import { prisma } from "@/lib/db";

export default async function AdminDashboardPage() {
  const [
    postCount,
    donationCount,
    messageCount,
    mediaCount,
    recentDonations,
    recentMessages,
  ] = await Promise.all([
    prisma.blogPost.count(),
    prisma.donation.count(),
    prisma.contactMessage.count(),
    prisma.mediaAsset.count(),
    prisma.donation.findMany({
      orderBy: { createdAt: "desc" },
      take: 5,
      select: {
        id: true,
        reference: true,
        amount: true,
        currency: true,
        donorName: true,
        status: true,
        createdAt: true,
      },
    }),
    prisma.contactMessage.findMany({
      orderBy: { createdAt: "desc" },
      take: 5,
      select: {
        id: true,
        fullName: true,
        subject: true,
        status: true,
        createdAt: true,
      },
    }),
  ]);

  return (
    <div>
      <PageHeader
        title="Dashboard"
        description="Overview of content, donations, and inquiries"
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Blog posts" value={postCount} icon={FileText} />
        <StatCard label="Donations" value={donationCount} icon={Heart} />
        <StatCard label="Messages" value={messageCount} icon={Mail} />
        <StatCard label="Media assets" value={mediaCount} icon={Image} />
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <section className="rounded-lg border border-[#46A0DC]/15 bg-white">
          <div className="flex items-center justify-between border-b border-[#46A0DC]/15 px-4 py-3">
            <h2 className="text-sm font-semibold text-[#1E1E1E]">Recent donations</h2>
            <Link href="/admin/donations" className="text-xs text-[#46A0DC] hover:underline">
              View all
            </Link>
          </div>
          <ul className="divide-y divide-[#46A0DC]/10">
            {recentDonations.length === 0 ? (
              <li className="px-4 py-6 text-sm text-[#1E1E1E]/50">No donations yet.</li>
            ) : (
              recentDonations.map((d) => (
                <li key={d.id} className="flex items-center justify-between gap-3 px-4 py-3">
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium text-[#1E1E1E]">
                      {d.donorName ?? "Anonymous"}
                    </p>
                    <p className="text-xs text-[#1E1E1E]/50">
                      {d.currency} {d.amount.toLocaleString()} · {d.reference}
                    </p>
                  </div>
                  <div className="shrink-0 text-right">
                    <StatusBadge label={d.status} variant={paymentStatusVariant(d.status)} />
                    <p className="mt-1 text-xs text-[#1E1E1E]/40">
                      {formatDistanceToNow(d.createdAt, { addSuffix: true })}
                    </p>
                  </div>
                </li>
              ))
            )}
          </ul>
        </section>

        <section className="rounded-lg border border-[#46A0DC]/15 bg-white">
          <div className="flex items-center justify-between border-b border-[#46A0DC]/15 px-4 py-3">
            <h2 className="text-sm font-semibold text-[#1E1E1E]">Recent messages</h2>
            <Link href="/admin/messages" className="text-xs text-[#46A0DC] hover:underline">
              View all
            </Link>
          </div>
          <ul className="divide-y divide-[#46A0DC]/10">
            {recentMessages.length === 0 ? (
              <li className="px-4 py-6 text-sm text-[#1E1E1E]/50">No messages yet.</li>
            ) : (
              recentMessages.map((m) => (
                <li key={m.id} className="flex items-center justify-between gap-3 px-4 py-3">
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium text-[#1E1E1E]">
                      {m.fullName}
                    </p>
                    <p className="truncate text-xs text-[#1E1E1E]/50">{m.subject}</p>
                  </div>
                  <div className="shrink-0 text-right">
                    <StatusBadge label={m.status} variant={m.status === "NEW" ? "new" : "reviewed"} />
                    <p className="mt-1 text-xs text-[#1E1E1E]/40">
                      {formatDistanceToNow(m.createdAt, { addSuffix: true })}
                    </p>
                  </div>
                </li>
              ))
            )}
          </ul>
        </section>
      </div>
    </div>
  );
}
