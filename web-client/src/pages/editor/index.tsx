import { Button, Flex, FloatButton, Layout, message, Select, Splitter, theme, Typography } from "antd";
import CodeEditor, { CodeEditorHandle } from "../../components/code-editor";
import Console from "../../components/console";
import { useRef, useState } from "react";
import supportedLanguages from "./supportedLanguages";
import supportedThemes from "./supportedThemes";
import { CaretRightOutlined, ClockCircleOutlined, CloseCircleOutlined, DatabaseOutlined, QuestionOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { CodeTesterState } from "../../lib/state/rootReducer";
import { cancelCodeTest, codeTest, codeTestFailure, codeTestSuccess } from "../../lib/features/code-tester/codeTesterSlice";
import TextArea, { TextAreaRef } from "antd/es/input/TextArea";
import { useObservable, useObservableCallback, useSubscription } from "observable-hooks";
import { ofType } from "redux-observable";
import { PayloadAction } from "@reduxjs/toolkit";
import { debounceTime, delay, of, switchMap, takeUntil } from "rxjs";
import prettyMilliseconds from "pretty-ms";
import bytes from "bytes";
import useLocalStorage from "../../lib/hooks/useLocalStorage";
import storeAction$ from "../../lib/state/storeAction$";

const { Header, Content } = Layout;

function EditorPage() {
    const dispatch = useDispatch();
    const inputRef = useRef<TextAreaRef>(null);
    const editorRef = useRef<CodeEditorHandle>(null);
    const { isTesting, codeTestResponse, executionError } = useSelector((state: CodeTesterState) => state.codeTester);
    const [messageApi, contextHolder] = message.useMessage();
    const [editorTheme, setEditorTheme] = useLocalStorage<keyof typeof supportedThemes>("codeTester.config.theme", "Tokyo Night");
    const [language, setLanguage] = useLocalStorage<keyof typeof supportedLanguages>("codeTester.config.language", "Python");
    const [savedCode, setSavedCode] = useLocalStorage<string>("codeTester.projects.project1");

    const { token: { colorBgContainer, colorError } } = theme.useToken();

    const [isCancelButtonActive, setIsCancelButtonActive] = useState(false);

    const handleTestCancel = () => {
        setIsCancelButtonActive(false);
        dispatch(cancelCodeTest());
    }

    const [onCodeChange, unactive$] = useObservableCallback<string>(codeChange$ => codeChange$.pipe(
        debounceTime(3000)
    ));

    const longCodeTest$ = useObservable(() => storeAction$.pipe(
        switchMap(action =>
            of(action).pipe(
                ofType(codeTest.type),
                delay(3000),
                takeUntil(storeAction$.pipe(ofType(codeTestSuccess.type)))
            )
        )
    ));
    const codeTestSuccess$ = useObservable(() => storeAction$.pipe(ofType(codeTestSuccess.type)));
    const codeTestFailure$ = useObservable(() => storeAction$.pipe(ofType(codeTestFailure.type)));

    useSubscription(longCodeTest$, () => {
        setIsCancelButtonActive(true);
    });

    useSubscription(codeTestSuccess$, () => {
        messageApi.success("Runned successfully.")
        setIsCancelButtonActive(false);
    })

    useSubscription(codeTestFailure$, (action: PayloadAction<string>) => {
        messageApi.error(action.payload)
        setIsCancelButtonActive(false);
    })

    useSubscription(unactive$, (code: string) => {
        setSavedCode(code);
        console.log("Saved")
    });

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
            <Flex style={{ height: "100%" }} justify="center" align="center">
                <Button onClick={handleRun} loading={isTesting} icon={<CaretRightOutlined />} style={{ marginRight: 12 }} type="primary">
                    Run
                </Button>
                <Button disabled={!isCancelButtonActive} onClick={handleTestCancel} icon={<CloseCircleOutlined />}>
                    Cancel
                </Button>
            </Flex>
        </Header>
        <Content>
            <FloatButton icon={<QuestionOutlined />} shape="circle" type="primary" />

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
                                <CodeEditor
                                    style={{ borderRadius: "10px", overflow: "hidden", flexGrow: 1 }}
                                    supportedLanguages={{
                                        ...supportedLanguages
                                    }}
                                    supportedThemes={{
                                        ...supportedThemes
                                    }}
                                    ref={editorRef}
                                    language={language}
                                    theme={editorTheme}
                                    onChange={onCodeChange}
                                    initialDoc={savedCode}
                                />
                            </Flex>
                        </Splitter.Panel>
                        <Splitter.Panel collapsible>
                            <TextArea style={{ height: "100%", resize: "none" }}
                                placeholder={`Enter "Hello world"...`}
                                ref={inputRef} />
                        </Splitter.Panel>
                    </Splitter>
                </Splitter.Panel>
                <Splitter.Panel collapsible>
                    <Flex gap={5} vertical style={{ height: "100%" }}>
                        <Flex gap={12}>
                            {codeTestResponse?.executionTimeMilliseconds &&
                                <Flex align="center" gap={4}>
                                    <ClockCircleOutlined />
                                    <Typography>
                                        {prettyMilliseconds(codeTestResponse?.executionTimeMilliseconds)}
                                    </Typography>
                                </Flex>
                            }
                            {codeTestResponse?.memoryUsedBytes &&
                                <Flex align="center" gap={4}>
                                    <DatabaseOutlined />
                                    <Typography>
                                        {bytes(codeTestResponse?.memoryUsedBytes)}
                                    </Typography>
                                </Flex>
                            }
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