import { fetchNoteById } from "@/lib/api";
import DetailsPageClient from "./NoteDetails.client";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";

interface Props {
  params: { id: string };
}

const Details = async ({ params }: Props) => {
  const { id } = params;

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["note", id],
    queryFn: () => fetchNoteById(id),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <DetailsPageClient />
    </HydrationBoundary>
  );
};

export default Details;
