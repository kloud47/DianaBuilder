'use client'
import { Button } from '@/components/ui/button';
import React from 'react'
import { Agency, User, AgencySidebarOption, SubAccount } from '@prisma/client';
import { Plus } from 'lucide-react';
import { twMerge } from 'tailwind-merge';
import { useModal } from '@/providers/modal-provider';
import CustomModal from '@/components/global/custom-modal';
import SubAccountDetails from '@/components/forms/subaccount-details';

type Props = {
    user: User & {
        Agency:
            | (
                | Agency
                | (null & {
                    SubAccount: SubAccount[]
                    SideBarOptions: AgencySidebarOption[]
                })
            )
        | null
    },
    id: string,
    className: string
}

const CreateSubaccount = ({ user, id, className }: Props) => {
    const { setOpen } = useModal();
    const agencyDetails = user.Agency

    if (!agencyDetails) return


    return (
        <div>
            <Button className={twMerge(`w-full flex gap-2 border border-primary group`, className)} 
                variant={'outline'}
                onClick={() => {
                    setOpen(
                        <CustomModal
                        title='Create a Subaccount'
                        subheading='You can switch between'
                    >
                        <SubAccountDetails 
                            agencyDetails={agencyDetails}
                            userId={user.id}
                            userName={user.name}
                        />
                    </CustomModal>
                    )
                }}
                >
                    Create a Subaccount
                <Plus className='group-hover:scale-125 duration-150' size={18} />
            </Button>
        </div>
    )
}
export default CreateSubaccount;