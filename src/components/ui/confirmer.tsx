"use client";

import { useConfirm } from "@/hooks/use-confirm";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

export function Confirmer() {
  const { confirms, dismiss } = useConfirm();

  return (
    <>
      {confirms.map(function ({
        id,
        title,
        description,
        onConfirm,
        confirmText = "Confirm",
        cancelText = "Cancel",
        open,
      }) {
        return (
          <AlertDialog key={id} open={open}>
            <AlertDialogContent>
              <AlertDialogHeader>
                {title && <AlertDialogTitle>{title}</AlertDialogTitle>}
                {description && (
                  <AlertDialogDescription>{description}</AlertDialogDescription>
                )}
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel
                  onClick={(_e) => {
                    // Optional: if you want to manually dismiss after animation
                    void setTimeout(() => dismiss(id), 300);
                  }}
                >
                  {cancelText}
                </AlertDialogCancel>
                <AlertDialogAction
                  onClick={async (_e) => {
                    await onConfirm?.();
                    // Optional: if you want to manually dismiss after animation
                    void setTimeout(() => dismiss(id), 300);
                  }}
                >
                  {confirmText}
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        );
      })}
    </>
  );
}
