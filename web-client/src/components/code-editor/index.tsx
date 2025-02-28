import { HTMLAttributes, Ref, useEffect, useImperativeHandle, useRef } from "react";
import { EditorView, keymap } from "@codemirror/view"
import { basicSetup } from "codemirror"
import { indentWithTab as indentWithTabCommand } from "@codemirror/commands"
import supportedLanguages from "./supportedLanguages";
import supportedThemes from "./supportedThemes";

export interface CodeEditorProps extends HTMLAttributes<HTMLDivElement> {
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

function CodeEditor({ language, theme, initialDoc, ref, indentWithTab, onCodeChange, ...divProps }: CodeEditorProps) {
    const editorRef = useRef<HTMLDivElement>(null);
    const editorViewRef = useRef<EditorView>(null);
    const codeRef = useRef<string>(initialDoc ?? "");

    useImperativeHandle(ref, () => {
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
            supportedThemes[theme],
            supportedLanguages[language](),
            myTheme
        ]

        if (indentWithTab)
            extensions.push(keymap.of([indentWithTabCommand]));

        const view = new EditorView({
            doc: codeRef.current,
            parent: editorRef.current ?? undefined,
            extensions: extensions,
            dispatch: (tr) => {
                if (tr.docChanged) {
                    const value = tr.newDoc.toString();
                    onCodeChange && onCodeChange(value); // Notify parent component of content change
                }
                view.update([tr])
            },
        });

        editorViewRef.current = view;

        return () => {
            codeRef.current = view.state.doc.toString();
            view.destroy();
        }

    }, [language, theme, indentWithTab])

    return <div {...divProps} ref={editorRef} />
}

export default CodeEditor;
