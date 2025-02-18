import { Button, Flex, Select, Splitter } from "antd";
import CodeEditor, { CodeEditorLanguages, CodeEditorThemes } from "../../components/code-editor";
import Console from "../../components/console";
import { useState } from "react";
import supportedLanguages from "../../components/code-editor/supportedLanguages";
import supportedThemes from "../../components/code-editor/supportedThemes";
import { CaretRightOutlined } from "@ant-design/icons";

function EditorPage() {
    const [language, setLanguage] = useState<keyof CodeEditorLanguages>("Python");
    const [editorTheme, setEditorTheme] = useState<keyof CodeEditorThemes>("Tokyo Night");

    return <Flex vertical style={{ height: "100%" }}>
        <Flex style={{ width: "100%", boxShadow: "0px 9px 28px 0px rgba(0, 0, 0, 0.05)" }} justify="center" align="center">
            <Button style={{ margin: "12px" }} icon={<CaretRightOutlined />}>
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
                        <CodeEditor language={language} theme={editorTheme} />
                    </div>
                </Flex>
            </Splitter.Panel>
            <Splitter.Panel>
                <Console content="Demo" />
            </Splitter.Panel>
        </Splitter>
    </Flex>
}

export default EditorPage;