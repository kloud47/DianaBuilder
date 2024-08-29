import { AgencySidebarOption, SubAccount, SubAccountSidebarOption } from "@prisma/client";

type Props = {
    defaultOpen?: boolean
    subAccounts: SubAccount[]
    sidebarOpt: AgencySidebarOption[] | SubAccountSidebarOption[]
    sidebarLogo: string
    details: any
    user: any
    id: string
}

const MenuOptions = async ({ defaultOpen, subAccounts, sidebarOpt, details, user, id }: Props) => {
    return (
        <div>Menu</div>
    );
}
export default MenuOptions;