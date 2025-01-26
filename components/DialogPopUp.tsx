import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useState } from "react";

export function DialogPopUp({
  messageTitle,
  messageContent,
}: {
  messageTitle: string;
  messageContent: string;
}) {
  const [isOpen, setIsOpen] = useState(true);

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-[550px]">
        <DialogHeader>
          <DialogTitle className="my-4">{messageTitle}</DialogTitle>
          <DialogDescription>{messageContent}</DialogDescription>
        </DialogHeader>
        <DialogFooter className="mt-4">
          <Button type="submit" onClick={handleClose} className="text-md">
            Close dialog
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
