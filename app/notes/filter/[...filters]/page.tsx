import NotesClient from "./Notes.client";

interface Props {
  params: { filters?: string[] };
}

export default async function Page({ params }: Props) {
  const resolvedParams = await params;
  const tag = resolvedParams.filters?.[0] ?? "All";

  return <NotesClient tag={tag} />;
}
