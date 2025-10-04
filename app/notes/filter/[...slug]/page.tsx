import NotesClient from "./Notes.client";

interface Props {
  params: { slug?: string[] };
}

export default async function Page({ params }: Props) {
  const resolvedParams = await params;
  const tag = resolvedParams.slug?.[0] ?? "All";

  return <NotesClient tag={tag} />;
}
