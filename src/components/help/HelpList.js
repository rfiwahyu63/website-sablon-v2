import { helpData } from "@/components/help/HelpData";
import HelpCard from "./HelpCard";

export default function HelpList() {
  return (
    <>
      <div className="grid gap-6 md:grid-cols-2">
        {helpData.map((article) => (
          <HelpCard key={article.id} article={article} />
        ))}
      </div>
    </>
  );
}
