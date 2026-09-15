import FlashInvitation, { generateFlashMetadata } from "../FlashInvitation";
export const generateMetadata = () => generateFlashMetadata("cumple");
export default function Page() {
  return <FlashInvitation theme="cumple" />;
}
