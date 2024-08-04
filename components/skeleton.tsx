import clsx from "clsx";
import ThemedView from "./themed-view";

export default function SkeletonItem({ className }: { className?: string }) {
  return (
    <ThemedView
      className={clsx("bg-primary-light animate-pulse rounded-md", className)}
    />
  );
}
