import { Checkbox, Modal } from "antd";
import useLocalStorage from "../../lib/hooks/cookies/useLocalStorage";
import { COOKIES_ACCEPTED_KEY } from "../../lib/config/storageKeys";
import { useDispatch, useSelector } from "react-redux";
import { CodeTesterState } from "../../lib/state/rootReducer";
import { setSettingsModalVisiblity } from "../../lib/features/settings/settingsSlice";

export default function SettingsModal() {
    const dispatch = useDispatch();
    const [isCookiesAccepted, setIsCookiesAccepted] = useLocalStorage<boolean>(COOKIES_ACCEPTED_KEY, false, true);
    const isSettingsModalShown = useSelector((state: CodeTesterState) => state.settings.isSettingsModalShown);

    const handleCancel = () => {
        dispatch(setSettingsModalVisiblity(false));
    }

    return <Modal
        title="Settings"
        open={isSettingsModalShown}
        closable={false}
        onOk={handleCancel}
        footer={(_, { OkBtn }) =>
            <>
                <OkBtn />
            </>
        }>
        <Checkbox checked={isCookiesAccepted}
            onChange={(e) => setIsCookiesAccepted(e.target.checked)}
        >
            Allow all cookies (old cookies will be deleted if uncheck)
        </Checkbox>
    </Modal>
}