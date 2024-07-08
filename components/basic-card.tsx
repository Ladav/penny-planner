import clsx from "clsx";
import ThemedView from "./themed-view";
import ThemedText from "./themed-text";

export default function BasicCard({
  title,
  value,
  cardStyles,
  className,
  containerClassName,
}: {
  title: string;
  value: number;
  cardStyles?: any;
  className?: string;
  containerClassName?: string;
}) {
  return (
    <ThemedView
      className={clsx("flex-1 rounded-lg !bg-primary", containerClassName)}
    >
      <ThemedView
        style={cardStyles}
        className={clsx(
          "p-4 rounded-lg shadow-lg shadow-secondary-light",
          className
        )}
      >
        <ThemedText className="font-medium">{title}</ThemedText>
        <ThemedText className="text-2xl font-semibold mt-1">{`$${value}`}</ThemedText>
      </ThemedView>
    </ThemedView>
  );
}
