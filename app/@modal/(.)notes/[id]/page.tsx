import { fetchNoteById } from "@/lib/api";
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import NoteModalClient from "../NoteModal.client";

export default async function NoteModal(
  props: Promise<{ params: { id: string } }>
) {
  const { params } = await props;
  const { id } = params;

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["note", id],
    queryFn: () => fetchNoteById(id),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NoteModalClient id={id} />
    </HydrationBoundary>
  );
}
