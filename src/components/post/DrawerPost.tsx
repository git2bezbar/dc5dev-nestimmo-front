'use client';

import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer"

import { Button } from "@/components/ui/button";
import FormPost from "./FormPost";
import { useState } from "react";
import AddingButton from "../globals/AddingButton";

const DrawerPost = () => {
    const [open, setOpen] = useState(false);

    return (
        <Drawer open={open} onOpenChange={setOpen}>
            <DrawerTrigger asChild>
              <AddingButton>Create new post</AddingButton>
            </DrawerTrigger>
            <DrawerContent>
                <DrawerHeader>
                    <DrawerTitle className="text-center">Ajouter un post</DrawerTitle>
                    <DrawerDescription className="text-center">Renseignez l&apos;enssemble des champs.</DrawerDescription>
                    <FormPost setOpen={setOpen} />
                </DrawerHeader>
                <DrawerFooter>
                    <DrawerClose>
                        <Button variant="outline">Cancel</Button>
                    </DrawerClose>
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    );
}

export default DrawerPost;