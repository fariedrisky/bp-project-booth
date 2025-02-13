import GuestLayout from "@/components/layouts/02-GuestLayout";

export default function GuestRootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <GuestLayout>{children}</GuestLayout>
    </>
  );
}
