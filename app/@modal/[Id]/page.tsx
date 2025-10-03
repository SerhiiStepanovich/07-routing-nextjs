"use client";
import { useRouter } from "next/navigation";
import Modal from "@/components/Modal/Modal";
import NotePreview from "@/components/NotePreview/NotePreview.client";

export default function NoteModal({ params }: { params: { id: string } }) {
  const router = useRouter();
  const closeModal = () => router.back();

  return (
    <Modal isOpen={true} onClose={closeModal}>
      <NotePreview id={params.id} />
    </Modal>
  );
}
