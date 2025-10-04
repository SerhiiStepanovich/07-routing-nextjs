"use client";

import { useRouter } from "next/navigation";
import Modal from "@/components/Modal/Modal";
import NotePreview from "../../../components/NotePreview/NotePreview.client";

export default function NoteModalClient({ id }: { id: string }) {
  const router = useRouter();

  return (
    <Modal isOpen={true} onClose={() => router.back()}>
      <NotePreview id={id} />
    </Modal>
  );
}
