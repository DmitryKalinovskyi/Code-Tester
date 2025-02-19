import { Ref, useEffect, useImperativeHandle, useRef } from "react";
import { EditorView } from "@codemirror/view"
import { basicSetup } from "codemirror"
import supportedLanguages from "./supportedLanguages";
import supportedThemes from "./supportedThemes";

export type CodeEditorThemes = typeof supportedThemes;
export type CodeEditorLanguages = typeof supportedLanguages;

export interface CodeEditorProps {
    language: keyof typeof supportedLanguages;
    theme: keyof typeof supportedThemes;
    initialDoc?: string;
    ref?: Ref<CodeEditorHandle>;
    style?: React.CSSProperties;
}

export type CodeEditorHandle = {
    getCode: () => string
}

function CodeEditor(props: CodeEditorProps) {
    const editorRef = useRef<HTMLDivElement>(null);
    const editorViewRef = useRef<EditorView>(null);
    const codeRef = useRef<string>(props.initialDoc ?? "");

    useImperativeHandle(props.ref, () => {
        return {
            getCode: () => editorViewRef.current?.state.doc.toString() ?? ""
        };
    })

    useEffect(() => {
        const myTheme = EditorView.theme({
            "&": {
                height: "100%",
                maxHeight: "100%",
            }
        })

        const view = new EditorView({
            doc: codeRef.current,
            parent: editorRef.current ?? undefined,
            extensions: [
                basicSetup,
                supportedThemes[props.theme],
                supportedLanguages[props.language](),
                myTheme
            ],
        });

        editorViewRef.current = view;

        return () => {
            codeRef.current = view.state.doc.toString();
            view.destroy();
        }

    }, [props.language, props.theme])

    return <div style={props.style} ref={editorRef} />
}

export default CodeEditor;
