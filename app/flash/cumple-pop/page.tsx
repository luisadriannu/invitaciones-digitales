import FlashInvitation, { generateFlashMetadata } from "../FlashInvitation";
export const generateMetadata = () => generateFlashMetadata("cumple-pop");
export default function Page() { return <FlashInvitation theme="cumple-pop" />; }
