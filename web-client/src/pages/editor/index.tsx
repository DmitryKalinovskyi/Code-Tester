import { Button, Flex, Select, Splitter } from "antd";
import CodeEditor, { CodeEditorHandle, CodeEditorLanguages, CodeEditorThemes } from "../../components/code-editor";
import Console from "../../components/console";
import { useRef, useState } from "react";
import supportedLanguages from "../../components/code-editor/supportedLanguages";
import supportedThemes from "../../components/code-editor/supportedThemes";
import { CaretRightOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { CodeTesterState } from "../../lib/state/rootReducer";
import { codeTest } from "../../lib/features/code-tester/codeTesterSlice";

function EditorPage() {
    const dispatch = useDispatch();
    const [language, setLanguage] = useState<keyof CodeEditorLanguages>("Python");
    const [editorTheme, setEditorTheme] = useState<keyof CodeEditorThemes>("Tokyo Night");
    const editorRef = useRef<CodeEditorHandle>(null);
    const isTesting = useSelector((state: CodeTesterState) => state.codeTester.isTesting);
    const response = useSelector((state: CodeTesterState) => state.codeTester.codeTestResponse);
    const executionError = useSelector((state: CodeTesterState) => state.codeTester.executionError);

    const handleRun = () => {
        if(editorRef.current){
            dispatch(codeTest({
                language,
                sourceCode: editorRef.current.getCode(),
            }));
        }
    }   

    return <Flex vertical style={{ height: "100%" }}>
        <Flex style={{ width: "100%", boxShadow: "0px 9px 28px 0px rgba(0, 0, 0, 0.05)" }} justify="center" align="center">
            <Button onClick={handleRun} loading={isTesting} style={{ margin: "12px" }} icon={<CaretRightOutlined />}>
                Run
            </Button>
        </Flex>
        <Splitter style={{ flexGrow: 1, padding: "12px", gap: "12px" }}>
            <Splitter.Panel defaultSize="50%" min="20%" max="70%">
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
                    <div style={{ borderRadius: "6px", flexGrow: 1, overflow: "auto" }}>
                        <CodeEditor ref={editorRef} language={language} theme={editorTheme} />
                    </div>
                </Flex>
            </Splitter.Panel>
            <Splitter.Panel>
                {response &&
                    <Console content={response.output} />
                }
                {executionError &&
                    <Console content={executionError} />
                }
            </Splitter.Panel>
        </Splitter>
    </Flex>
}

export default EditorPage;