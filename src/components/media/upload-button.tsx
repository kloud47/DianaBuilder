'use client'
import { useModal } from '@/providers/modal-provider'
import React from 'react'
import { Button } from '../ui/button'
import CustomModal from '../global/custom-modal'
import { ArrowUp } from 'lucide-react'
import UploadMediaForm from '../forms/UploadMediaForm'

type Props = {
    subaccountId: string
}

const MediaUploadButton = ({ subaccountId }: Props) => {
    const { isOpen, setOpen, setClose } = useModal()

    return (
        <Button
            onClick={() => {
                setOpen(
                    <CustomModal
                        title='Upload Media'
                        subheading='Upload a file to your media bucket'
                    >
                        <UploadMediaForm subaccountId={subaccountId}></UploadMediaForm>
                    </CustomModal>
                )
            }}
        >
            Upload<ArrowUp size={16} />
        </Button>
    )
}
export default MediaUploadButton;