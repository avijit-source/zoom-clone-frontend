import React, { useEffect, useRef } from 'react'

function LocalScreenSharingPreview({ stream }) {
    const localPreviewRef = useRef();

    useEffect(() => {
        const video = localPreviewRef.current;
        video.srcObject = stream;

        video.onloadedmetadata = () => {
            video.play()
        }
    }, [stream])
    return (
        <div className='local_screen_share_preview'>
            <video muted autoplay ref={localPreviewRef}>

            </video>

        </div>
    )
}

export default LocalScreenSharingPreview