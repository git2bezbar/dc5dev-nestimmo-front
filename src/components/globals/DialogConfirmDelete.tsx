import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"

import { Button } from "@/components/ui/button"

type DialogConfirmDeleteProps = {
    handleDelete: () => void;
    isPending: boolean;
    isDisabled: boolean;
}

const DialogConfirmDelete = ({ handleDelete, isPending, isDisabled }: DialogConfirmDeleteProps) => {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="destructive" disabled={isDisabled}>
                    Delete
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Are you absolutely sure?</DialogTitle>
                    <DialogDescription>
                        This action cannot be undone. This will permanently delete data.
                    </DialogDescription>
                </DialogHeader>
                <Button variant="destructive" onClick={handleDelete} disabled={isPending}>
                    Confirm
                </Button>
            </DialogContent>
        </Dialog>

    );
}

export default DialogConfirmDelete;