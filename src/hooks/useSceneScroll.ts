import { useScroll, useTransform } from "framer-motion";

export const useSceneScroll = (options?: Parameters<typeof useScroll>[0]) => {
  const values = useScroll(options);
  // Use one measured scroll clock for pinned geometry and fades. Native
  // ViewTimeline opacity can otherwise drift from sticky-scene progress.
  const scrollYProgress = useTransform(values.scrollYProgress, value => value);
  return { ...values, scrollYProgress };
};
