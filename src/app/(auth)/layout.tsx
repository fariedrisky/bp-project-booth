import AuthLayout from "@/components/layouts/01-AuthLayout";

export default function AuthRootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <AuthLayout>{children}</AuthLayout>
    </>
  );
}
