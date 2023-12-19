export const clsx = (...args: (string | boolean | undefined)[]) =>
  args.filter((a) => a).join(" ");
