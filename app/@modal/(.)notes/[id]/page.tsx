"use client";

import { use } from "react";
import { useRouter } from "next/navigation";
import Modal from "@/components/Modal/Modal";
import NotePreview from "@/components/NotePreview/NotePreview.client";

export default function NoteModal({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const router = useRouter();
  const closeModal = () => router.back();

  return (
    <Modal isOpen={true} onClose={closeModal}>
      <NotePreview id={id} />
    </Modal>
  );
}
