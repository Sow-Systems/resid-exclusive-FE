import { clsx } from "@/utils/classes";

export const Pill = ({
  status,
  title,
}: {
  status: "Em andamento" | "Finalizado";
  title: string;
}) => {
  return (
    <div
      className={clsx(
        "text-xs px-1 py-0.5 rounded-full text-center font-semibold",
        status === "Em andamento"
          ? "bg-green-200 text-green-950"
          : "bg-orange-400 text-orange-950"
      )}
    >
      {title}
    </div>
  );
};
