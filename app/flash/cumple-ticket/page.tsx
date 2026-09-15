import FlashInvitation, { generateFlashMetadata } from "../FlashInvitation";
export const generateMetadata = () => generateFlashMetadata("cumple-ticket");
export default function Page() { return <FlashInvitation theme="cumple-ticket" />; }
