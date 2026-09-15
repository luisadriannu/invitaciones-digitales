import FlashInvitation, { generateFlashMetadata } from "../FlashInvitation";
export const generateMetadata = () => generateFlashMetadata("bautizo");
export default function Page() { return <FlashInvitation theme="bautizo" />; }
