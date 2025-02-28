import { Ref, useEffect, useImperativeHandle, useRef } from "react";
import { EditorView, keymap } from "@codemirror/view"
import { basicSetup } from "codemirror"
import { LanguageSupport } from '@codemirror/language';
import { Extension } from "@codemirror/state"
import {indentWithTab} from "@codemirror/commands"

export type SupportedLanguages = {
    [language: string]: () => LanguageSupport
}

export type SupportedThemes = {
    [theme: string]: Extension
}

export interface CodeEditorProps<TSupportedLanguages extends SupportedLanguages, TSupportedThemes extends SupportedThemes> {
    supportedLanguages: TSupportedLanguages;
    language: keyof TSupportedLanguages;
    supportedThemes: TSupportedThemes;
    theme: keyof TSupportedThemes;
    initialDoc?: string;
    ref?: Ref<CodeEditorHandle>;
    style?: React.CSSProperties;
    indentWithTab?: boolean;
    onChange?: (code: string) => void;
}

export type CodeEditorHandle = {
    getCode: () => string;
    setCode: (code: string) => void;
}

function CodeEditor<TSupportedLanguages extends SupportedLanguages, TSupportedThemes extends SupportedThemes>(props: CodeEditorProps<TSupportedLanguages, TSupportedThemes>) {
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
            props.supportedThemes[props.theme],
            props.supportedLanguages[props.language](),
            myTheme
        ]
        
        if (props.indentWithTab)
            keymap.of([indentWithTab]);

        const view = new EditorView({
            doc: codeRef.current,
            parent: editorRef.current ?? undefined,
            extensions: extensions,
            dispatch: (tr) => {
                if (tr.docChanged) {
                    const value = tr.newDoc.toString();
                    props.onChange && props.onChange(value); // Notify parent component of content change
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

    return <div style={props.style} ref={editorRef} />
}

export default CodeEditor;
