---
title: Code Editor Component
description: Documentation for the Code Editor component used in the Code Tester application.
---

# Code Editor Component

## Overview
The **Code Editor** component is a custom implementation using CodeMirror to provide a feature-rich code editing experience. It supports multiple languages, themes, and customization options.

## Props

| Prop Name     | Type                        | Description |
|--------------|----------------------------|-------------|
| `language`   | `keyof typeof supportedLanguages` | The programming language for syntax highlighting. |
| `theme`      | `keyof typeof supportedThemes` | The theme for the code editor. |
| `initialDoc` | `string`                    | Initial code content. (Optional) |
| `ref`        | `Ref<CodeEditorHandle>`      | Reference to get and set editor content. |
| `indentWithTab` | `boolean`               | Enables tab indentation. (Optional) |
| `onCodeChange` | `(code: string) => void` | Callback when code changes. (Optional) |

## Methods

The component exposes the following methods via a **ref**:

| Method | Description |
|--------|-------------|
| `getCode()` | Returns the current code content as a string. |
| `setCode(code: string)` | Sets the code content in the editor. |

## Example Usage

```tsx
import { useRef } from "react";
import CodeEditor, { CodeEditorHandle } from "./CodeEditor";

export default function CodeEditorExample() {
    const editorRef = useRef<CodeEditorHandle>(null);

    const handleRunCode = () => {
        alert(editorRef.current?.getCode());
    };

    return (
        <div>
            <CodeEditor 
                ref={editorRef} 
                language="Python" 
                theme="dark" 
                initialDoc="print('Hello, world!')"
                indentWithTab={true}
            />
            <button onClick={handleRunCode}>Run Code</button>
        </div>
    );
}
```

## Dependencies

This component relies on the following libraries:
- `@codemirror/view`
- `codemirror`
- `@codemirror/commands`

## Features
- Supports multiple languages
- Customizable themes
- Live code updates via `onCodeChange`
- Tab indentation support
- Programmatic access to editor content

## Styling
The component applies a minimalistic height restriction using:
```css
& {
    height: "100%";
    maxHeight: "100%";
}
```
You can override styles via CSS or by extending the theme configuration.

## Cleanup and Unmounting
When the component unmounts, the editor state is stored, and the view is properly destroyed to prevent memory leaks.
