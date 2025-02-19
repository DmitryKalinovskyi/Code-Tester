import { Button, Flex, Layout, message, Select, Splitter, Statistic, theme } from "antd";
import CodeEditor, { CodeEditorHandle, CodeEditorLanguages, CodeEditorThemes } from "../../components/code-editor";
import Console from "../../components/console";
import { useEffect, useRef, useState } from "react";
import supportedLanguages from "../../components/code-editor/supportedLanguages";
import supportedThemes from "../../components/code-editor/supportedThemes";
import Icon, { CaretRightOutlined, ClockCircleOutlined, DatabaseOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { CodeTesterState } from "../../lib/state/rootReducer";
import { codeTest } from "../../lib/features/code-tester/codeTesterSlice";
import TextArea, { TextAreaRef } from "antd/es/input/TextArea";

const { Header, Content } = Layout;

function EditorPage() {
    const dispatch = useDispatch();
    const [language, setLanguage] = useState<keyof CodeEditorLanguages>("Python");
    const [editorTheme, setEditorTheme] = useState<keyof CodeEditorThemes>("Tokyo Night");
    const inputRef = useRef<TextAreaRef>(null);
    const editorRef = useRef<CodeEditorHandle>(null);
    const isTesting = useSelector((state: CodeTesterState) => state.codeTester.isTesting);
    const response = useSelector((state: CodeTesterState) => state.codeTester.codeTestResponse);
    const executionError = useSelector((state: CodeTesterState) => state.codeTester.executionError);
    const testError = useSelector((state: CodeTesterState) => state.codeTester.testError);
    const [messageApi, contextHolder] = message.useMessage();
    const { token: { colorBgContainer, colorError } } = theme.useToken();

    useEffect(() => {
        if (testError)
            messageApi.error(testError)
    }, [testError])

    const handleRun = () => {
        if (editorRef.current) {
            dispatch(codeTest({
                language,
                sourceCode: editorRef.current.getCode(),
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
                            <Statistic  prefix={<ClockCircleOutlined />} value={response?.executionTimeMilliseconds} suffix="ms" />
                            <Statistic precision={2} prefix={<DatabaseOutlined />} value={(response?.memoryUsedBytes ?? 0) / 1000000} suffix="mb" />
                        </Flex>
                        <Console displayError={!!executionError}
                            colorError={colorError}
                            style={{ flexGrow: 1 }}
                            content={executionError ?? response?.output ?? ""} />
                    </Flex>
                </Splitter.Panel>
            </Splitter>
        </Content>
    </Layout>
}

export default EditorPage;