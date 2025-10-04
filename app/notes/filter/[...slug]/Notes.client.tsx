"use client";

import React, { useEffect, useState } from "react";
import SearchBox from "@/components/SearchBox/SearchBox";
import Pagination from "@/components/Pagination/Pagination";
import NoteList from "@/components/NoteList/NoteList";
import Modal from "@/components/Modal/Modal";
import NoteForm from "@/components/NoteForm/NoteForm";
import styles from "./Notes.module.css";
import { useDebounce } from "@/hooks/useDebounce";
import { useQuery } from "@tanstack/react-query";
import { fetchNotes } from "@/lib/api";
import type { FetchNotesResponse } from "@/lib/api";

const PER_PAGE = 12;

interface NotesClientProps {
  tag: string;
}

const NotesClient: React.FC<NotesClientProps> = ({ tag }) => {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");

  const [isModalOpen, setModalOpen] = useState(false);

  const debouncedSearch = useDebounce(search, 500);

  const { data, isLoading, isError, error, isFetching } =
    useQuery<FetchNotesResponse>({
      queryKey: [
        "notes",
        { page, perPage: PER_PAGE, search: debouncedSearch, tag },
      ],
      queryFn: () =>
        fetchNotes(
          page,
          PER_PAGE,
          debouncedSearch,
          tag === "All" ? undefined : tag
        ),
      placeholderData: (prev) => prev,
    });

  const notes = data?.notes ?? [];
  const totalPages = data?.totalPages ?? 1;

  useEffect(() => {
    setPage(1);
  }, [tag, debouncedSearch]);

  const handleSearchChange = (value: string) => {
    setSearch(value);
  };

  return (
    <div className={styles.app}>
      <header className={styles.toolbar}>
        <SearchBox value={search} onChange={handleSearchChange} />
        {totalPages > 1 && (
          <Pagination
            pageCount={totalPages}
            currentPage={page}
            onPageChange={(newPage) => setPage(newPage)}
          />
        )}
        <button className={styles.button} onClick={() => setModalOpen(true)}>
          Create a note
        </button>
      </header>

      {isLoading && <p>Loading notes...</p>}
      {isError && <p>Error: {(error as Error).message}</p>}
      {isFetching && !isLoading && <p>Refreshing...</p>}

      {notes.length > 0 ? <NoteList notes={notes} /> : <p>No notes found</p>}

      <Modal isOpen={isModalOpen} onClose={() => setModalOpen(false)}>
        <NoteForm onCancel={() => setModalOpen(false)} />
      </Modal>
    </div>
  );
};

export default NotesClient;
