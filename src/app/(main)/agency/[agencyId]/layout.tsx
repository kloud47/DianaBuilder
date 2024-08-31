import { getNotificationAndUser, verifyAndAcceptInvitaion } from "@/lib/queries"
import { currentUser } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"
import UnauthorizedPage from "../unauthorized/page"
import Sidebar from "@/components/sidebar"

type Props = {
    children: React.ReactNode
    params: { agencyId: string }
}

const Layout = async ({ children, params }: Props) => {
    const agencyId = await verifyAndAcceptInvitaion()
    const user = await currentUser()
    
    if (!agencyId) return redirect('/agency')
    
    if (!user) return redirect('/')
    
    if (
        user.privateMetadata.role !== 'AGENCY_OWNER' &&
        user.privateMetadata.role !== 'AGENCY_ADMIN'
    ) return <UnauthorizedPage/>

    let allNoti : any = []
    const notifications = await getNotificationAndUser(agencyId)
    if (notifications) allNoti = notifications

    return <div className="h-screen overflow-hidden">
        <Sidebar 
            id={params.agencyId}
            type="agency"
        />
        <div className="md: pl-[300px]">{children}</div>
    </div>
}

export default Layout;