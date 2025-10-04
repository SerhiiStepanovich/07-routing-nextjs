import type { NoteTag } from "@/types/note";
import NotesClient from "./Notes.client";
import { fetchNotes } from "@/lib/api";
import {
  QueryClient,
  dehydrate,
  HydrationBoundary,
} from "@tanstack/react-query";

interface Props {
  params: { slug?: string[] };
  searchParams?: { [key: string]: string | string[] | undefined };
}

export default async function Page({ params, searchParams }: Props) {
  const tag = params.slug?.[0] ?? "All";
  const query =
    typeof searchParams?.query === "string" ? searchParams.query : "";
  const page =
    typeof searchParams?.page === "string"
      ? parseInt(searchParams.page, 10)
      : 1;

  const queryClient = new QueryClient();

  const validTags: NoteTag[] = [
    "Todo",
    "Work",
    "Personal",
    "Meeting",
    "Shopping",
  ];

  const tagParam: NoteTag | undefined = validTags.includes(tag as NoteTag)
    ? (tag as NoteTag)
    : undefined;

  await queryClient.prefetchQuery({
    queryKey: ["notes", tag, query, page],
    queryFn: () => fetchNotes(page, 12, query, tagParam),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient tag={tag} />
    </HydrationBoundary>
  );
}
