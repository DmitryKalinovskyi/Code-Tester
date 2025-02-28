import { HTMLAttributes, Ref, useEffect, useImperativeHandle, useRef } from "react";
import { EditorView, keymap } from "@codemirror/view"
import { basicSetup } from "codemirror"
import {indentWithTab} from "@codemirror/commands"
import supportedLanguages from "./supportedLanguages";
import supportedThemes from "./supportedThemes";

export interface CodeEditorProps extends HTMLAttributes<HTMLDivElement>{
    language: keyof typeof supportedLanguages;
    theme: keyof typeof supportedThemes;
    initialDoc?: string;
    ref?: Ref<CodeEditorHandle>;
    indentWithTab?: boolean;
    onCodeChange?: (code: string) => void;
}

export type CodeEditorHandle = {
    getCode: () => string;
    setCode: (code: string) => void;
}

function CodeEditor(props: CodeEditorProps) {
    const editorRef = useRef<HTMLDivElement>(null);
    const editorViewRef = useRef<EditorView>(null);
    const codeRef = useRef<string>(props.initialDoc ?? "");

    useImperativeHandle(props.ref, () => {
        return {
            getCode: () => editorViewRef.current?.state.doc.toString() ?? "",
            setCode: (code: string) => {
                if (editorViewRef.current) {
                    editorViewRef.current.dispatch({
                        changes: { from: 0, to: editorViewRef.current.state.doc.length, insert: code }
                    });
                }
            }
        };
    })

    useEffect(() => {
        const myTheme = EditorView.theme({
            "&": {
                height: "100%",
                maxHeight: "100%",
            }
        })

        const extensions = [
            basicSetup,
            supportedThemes[props.theme],
            supportedLanguages[props.language](),
            myTheme
        ]
        
        if (props.indentWithTab)
            extensions.push(keymap.of([indentWithTab]));

        const view = new EditorView({
            doc: codeRef.current,
            parent: editorRef.current ?? undefined,
            extensions: extensions,
            dispatch: (tr) => {
                if (tr.docChanged) {
                    const value = tr.newDoc.toString();
                    props.onCodeChange && props.onCodeChange(value); // Notify parent component of content change
                }
                view.update([tr])
            },
        });

        editorViewRef.current = view;

        return () => {
            codeRef.current = view.state.doc.toString();
            view.destroy();
        }

    }, [props.language, props.theme, props.indentWithTab])

    return <div {...props} ref={editorRef} />
}

export default CodeEditor;
