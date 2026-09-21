import FloralInvitation from "../FloralInvitation";
import { generateFlashMetadata } from "../FlashInvitation";
import { flashEvents } from "../data";

export const generateMetadata = () => generateFlashMetadata("vino-y-flores");

export default function Page() {
  return <FloralInvitation event={flashEvents["vino-y-flores"]} />;
}
