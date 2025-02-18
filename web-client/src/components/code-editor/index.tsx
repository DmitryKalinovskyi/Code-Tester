import { useEffect, useRef } from "react";
import { Transaction } from "@codemirror/state"
import { EditorView } from "@codemirror/view"
import { basicSetup } from "codemirror"
import supportedLanguages from "./supportedLanguages";
import supportedThemes from "./supportedThemes";

export type CodeEditorThemes = typeof supportedThemes;
export type CodeEditorLanguages = typeof supportedLanguages;

export interface CodeEditorProps {
    onChange?: (value: string) => void;
    language: keyof typeof supportedLanguages
    theme: keyof typeof supportedThemes
    initialDoc?: string;
}

function CodeEditor(props: CodeEditorProps) {
    const editorRef = useRef<HTMLDivElement | null>(null);

    const handleEditorChange = (tr: Transaction) => {
        const value = tr.newDoc.toString();
        props.onChange && props.onChange(value);
        editorView.update([tr]);
    }

    const myTheme = EditorView.theme({
        "&": {
            height: "100%",
            maxHeight: "100%",
        }
    })

    const editorView = new EditorView({
        doc: props.initialDoc,
        extensions: [
            basicSetup,
            supportedThemes[props.theme],
            supportedLanguages[props.language](),
            myTheme
        ],
        dispatch: (tr) => handleEditorChange(tr)
    });

    useEffect(() => {
        editorRef.current?.replaceChildren(editorView.dom);
    }, [props])

    return <div style={{ height: "100%" }} ref={editorRef} />
}

export default CodeEditor;
