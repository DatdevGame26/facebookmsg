"use client";
import { FacebookProvider, CustomChat } from 'react-facebook';

const FacebookMsg = () => {
    return (
        <FacebookProvider appId="519314081086324" chatSupport>
            <CustomChat pageId="100011441624130" minimized={true} />
        </FacebookProvider>
    )
}
export default FacebookMsg