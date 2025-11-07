import { DataBrowser } from "../../components/DataBrowser";

export default function DataPage({ params }: any) {
  const initial = params.path && params.path.length > 0 ? params.path : ["example_rite"];
  return (
    <main className="container">
      <DataBrowser initialPath={initial} />
    </main>
  );
}
