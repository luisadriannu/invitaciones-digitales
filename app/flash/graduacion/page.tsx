import FlashInvitation, { generateFlashMetadata } from "../FlashInvitation";
export const generateMetadata = () => generateFlashMetadata("graduacion");
export default function Page() { return <FlashInvitation theme="graduacion" />; }
