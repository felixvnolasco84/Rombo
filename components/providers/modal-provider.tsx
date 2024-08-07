"use client";

import { useEffect, useState } from "react";

// import { SettingsModal } from "@/components/modals/settings-modal";
// import { CoverImageModal } from "@/components/modals/cover-image-modal";
// import { CardModal } from "@/components/modals/card-modal";
// import { TaskModal } from "@/components/modals/task-modal";
// import { ShareDocumentModal } from "../modals/share-document-modal";
// import { TaskCoverImageModal } from "../modals/tasks-cover-image-modal";
// import { DocumentModal } from "../modals/document-modal";
// import { ViewMoreModal } from "../modals/view-more-modal";

export const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <>
      {/* <SettingsModal />
      <CoverImageModal />
      <TaskCoverImageModal />
      <CardModal />
      <TaskModal />
      <DocumentModal />
      <ShareDocumentModal />
      <ViewMoreModal /> */}
      {/* <ProModal /> */}
    </>
  );
};
