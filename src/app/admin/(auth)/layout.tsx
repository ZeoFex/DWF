export const dynamic = "force-dynamic";

export default function AdminAuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#0B1220] px-4 py-8">
      <div className="w-full max-w-md">
        <div className="mb-6 text-center">
          <p className="text-lg font-semibold text-white">DWF Admin</p>
          <p className="mt-1 text-sm text-white/60">
            Dr. Winnie&apos;s Foundation CMS
          </p>
        </div>
        <div className="rounded-lg border border-white/10 bg-white p-6 shadow-xl">
          {children}
        </div>
      </div>
    </div>
  );
}
