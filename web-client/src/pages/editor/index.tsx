import { Button, Flex, Layout, message, Select, Splitter, Statistic, theme } from "antd";
import CodeEditor, { CodeEditorHandle, CodeEditorLanguages, CodeEditorThemes } from "../../components/code-editor";
import Console from "../../components/console";
import { useRef, useState } from "react";
import supportedLanguages from "../../components/code-editor/supportedLanguages";
import supportedThemes from "../../components/code-editor/supportedThemes";
import { CaretRightOutlined, ClockCircleOutlined, CloseCircleOutlined, DatabaseOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { CodeTesterState } from "../../lib/state/rootReducer";
import { cancelCodeTest, codeTest, codeTestFailure, codeTestSuccess } from "../../lib/features/code-tester/codeTesterSlice";
import TextArea, { TextAreaRef } from "antd/es/input/TextArea";
import { useObservable, useSubscription } from "observable-hooks";
import storeAction$ from "../../lib/state/storeAction$";
import { ofType } from "redux-observable";
import { PayloadAction } from "@reduxjs/toolkit";
import { delay, of, switchMap, takeUntil } from "rxjs";

const { Header, Content } = Layout;

function EditorPage() {
    const dispatch = useDispatch();
    const [language, setLanguage] = useState<keyof CodeEditorLanguages>("Python");
    const [editorTheme, setEditorTheme] = useState<keyof CodeEditorThemes>("Tokyo Night");
    const inputRef = useRef<TextAreaRef>(null);
    const editorRef = useRef<CodeEditorHandle>(null);
    const { isTesting, codeTestResponse, executionError } = useSelector((state: CodeTesterState) => state.codeTester);
    const [messageApi, contextHolder] = message.useMessage();

    const { token: { colorBgContainer, colorError } } = theme.useToken();

    const [isCancelButtonActive, setIsCancelButtonActive] = useState(false);

    const handleCodeTestFailure = (action: PayloadAction<string>) => {
        messageApi.error(action.payload)
        setIsCancelButtonActive(false);
    }

    const handleCodeTestSuccess = () => {
        messageApi.success("Runned successfully.")
        setIsCancelButtonActive(false);
    }

    const handleLongTest = () => {
        setIsCancelButtonActive(true);
    }

    const handleTestCancel = () => {
        setIsCancelButtonActive(false);
        dispatch(cancelCodeTest());
    }

    const longCodeTest$ = useObservable(() => storeAction$.pipe(
        switchMap(action =>
            of(action).pipe(
                ofType(codeTest.type),
                delay(3000),
                takeUntil(storeAction$.pipe(ofType(codeTestSuccess.type)))
            )
        )
    ));

    const codeTestSussess$ = useObservable(() => storeAction$.pipe(ofType(codeTestSuccess.type)));
    const codeTestFailure$ = useObservable(() => storeAction$.pipe(ofType(codeTestFailure.type)));

    useSubscription(longCodeTest$, handleLongTest)
    useSubscription(codeTestSussess$, handleCodeTestSuccess)
    useSubscription(codeTestFailure$, handleCodeTestFailure)

    const handleRun = () => {
        if (editorRef.current) {
            const sourceCode = editorRef.current.getCode();
            dispatch(codeTest({
                language,
                sourceCode,
                input: inputRef?.current?.resizableTextArea?.textArea.value
            }));
        }
    }

    return <Layout style={{ height: "100%" }}>
        {contextHolder}
        <Header style={{ background: colorBgContainer }} >
            <Flex style={{ width: "100%" }} justify="center" align="center">
                <Button onClick={handleRun} loading={isTesting} style={{ margin: "12px" }} icon={<CaretRightOutlined />}>
                    Run
                </Button>
                <Button disabled={!isCancelButtonActive} onClick={handleTestCancel} style={{ margin: "12px" }} icon={<CloseCircleOutlined />}>
                    Cancel
                </Button>
            </Flex>
        </Header>
        <Content>
            <Splitter style={{ flexGrow: 1, padding: "12px", gap: "12px" }}>
                <Splitter.Panel defaultSize="50%">
                    <Splitter layout="vertical" style={{ gap: "12px" }}>
                        <Splitter.Panel min="10%" max="90%" collapsible>
                            <Flex vertical gap={12} style={{ height: "100%" }}>
                                <Flex gap={12}>
                                    <Select value={language} onChange={(v) => setLanguage(v)} style={{ width: "100px" }}>
                                        {Object.keys(supportedLanguages).map(k => <Select.Option key={k}>
                                            {k}
                                        </Select.Option>)}
                                    </Select>
                                    <Select value={editorTheme} onChange={(v) => setEditorTheme(v)} style={{ width: "150px" }}>
                                        {Object.keys(supportedThemes).map(k => <Select.Option key={k}>
                                            {k}
                                        </Select.Option>)}
                                    </Select>
                                </Flex>
                                <CodeEditor style={{ borderRadius: "10px", overflow: "hidden", flexGrow: 1 }}
                                    ref={editorRef} language={language} theme={editorTheme} />
                            </Flex>
                        </Splitter.Panel>
                        <Splitter.Panel collapsible>
                            <TextArea style={{ height: "100%", resize: "none" }}
                                placeholder="Enter input..."
                                ref={inputRef} />
                        </Splitter.Panel>
                    </Splitter>
                </Splitter.Panel>
                <Splitter.Panel collapsible>
                    <Flex gap={5} vertical style={{ height: "100%" }}>
                        <Flex gap={12}>
                            <Statistic prefix={<ClockCircleOutlined />} value={codeTestResponse?.executionTimeMilliseconds} suffix="ms" />
                            <Statistic precision={2} prefix={<DatabaseOutlined />} value={(codeTestResponse?.memoryUsedBytes ?? 0) / 1000000} suffix="mb" />
                        </Flex>
                        <Console displayError={!!executionError}
                            colorError={colorError}
                            style={{ flexGrow: 1 }}
                            content={executionError ?? codeTestResponse?.output} />
                    </Flex>
                </Splitter.Panel>
            </Splitter>
        </Content>
    </Layout>
}

export default EditorPage;