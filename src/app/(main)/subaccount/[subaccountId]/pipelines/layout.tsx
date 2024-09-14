import BlurPage from "@/components/global/blur-page";

export default function LayoutPipeline({
  children,
}: {
  children: React.ReactNode;
}) {
  return <BlurPage>{children}</BlurPage>;
}
