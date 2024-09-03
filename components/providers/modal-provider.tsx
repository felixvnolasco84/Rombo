"use client";

import { useEffect, useState } from "react";
import { EditRequestModal } from "../modals/edit-request-modal";
import { DeleteRequestModal } from "../modals/delete-request-modal";
import { EditRequestCommentModal } from "../modals/edit-request-comment-modal";
import { DeleteRequestCommentModal } from "../modals/delete-request-comment-modal";
import { EditBrandModal } from "../modals/edit-brand-modal";
import { DeleteBrandModal } from "../modals/delete-brand-modal";
import { RequestModal } from "../modals/request-modal";

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
      <EditBrandModal />
      <EditRequestModal />
      <DeleteRequestModal />
      <DeleteBrandModal />
      <EditRequestCommentModal />
      <DeleteRequestCommentModal />
      <RequestModal />
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
