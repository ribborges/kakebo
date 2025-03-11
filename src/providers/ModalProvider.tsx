import React, { ReactNode, useState } from "react";

import ModalContext, { ModalContextProps, ModalProps } from "@/contexts/modal";
import Modal from "@/components/ModalContainer";

export default function ModalProvider({ children }: { children: ReactNode }) {
    const [isOpen, setIsOpen] = useState(false);

    const [dialogProps, setDialogProps] = useState<ModalProps>({
        title: "Dialog",
        content: <></>
    });

    const dialogContextProps: ModalContextProps = {
        show: (props: ModalProps) => {
            setDialogProps(props);
            setIsOpen(true);
        },
        hide: () => {
            setIsOpen(false);
        }
    }

    return (
        <ModalContext.Provider value={dialogContextProps}>
            <Modal title={dialogProps.title} visible={isOpen} closeBtn={() => setIsOpen(false)}>
                {dialogProps.content}
            </Modal>
            {children}
        </ModalContext.Provider>
    );
}