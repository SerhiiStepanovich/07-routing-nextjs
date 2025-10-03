import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { fetchNotes } from "@/lib/api";
import NotesClient from "./Notes.client";

const PER_PAGE = 12;

export default async function NotesPage() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["notes", { page: 1, perPage: PER_PAGE, search: "", tag: "All" }],
    queryFn: () => fetchNotes(1, PER_PAGE, "", "All"),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient tag="All" />
    </HydrationBoundary>
  );
}
