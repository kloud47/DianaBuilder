import BlurPage from '@/components/global/blur-page'
import MediaComponent from '@/components/media/MediaComponent'
import { getMedia } from '@/lib/queries'
import React from 'react'

type Props = {
    params: { subaccountId: string }
}

const Media = async ({ params }: Props) => {
    const data = await getMedia(params.subaccountId)

    return (
        <>
        <MediaComponent 
            data={data}
            subaccountId={params.subaccountId}
        />  
        </>
    )
}
export default Media;