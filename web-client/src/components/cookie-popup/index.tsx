import { Button, Modal, Typography } from "antd";
import useLocalStorage from "../../lib/hooks/cookies/useLocalStorage";
import { COOKIES_ACCEPTED_KEY } from "../../lib/config/storageKeys";

export default function CookiePopup(){
    const [seenCookiePopup, setSeenCookiePopup] = useLocalStorage("seenCookiesPopup", false, true);
    const [, setCookiesAccepted] = useLocalStorage(COOKIES_ACCEPTED_KEY, false, true);

    const handleAccept = () => {
        setSeenCookiePopup(true);
        setCookiesAccepted(true);
    }
    
    const handleClose = () => {
        setSeenCookiePopup(true);
        setCookiesAccepted(false);
    }

    return <Modal title="Cookies"
    open={!seenCookiePopup} 
    centered
    onClose={handleClose}
    closable={false}
    footer={() => (
        <>
          <Button type="primary" onClick={handleAccept}>Accept All</Button>
          <Button onClick={handleClose}>Neccessary Only</Button>
        </>
      )}
    >
        <Typography>We use cookies to echance user expirience and save your changes locally.</Typography>
    </Modal>
}