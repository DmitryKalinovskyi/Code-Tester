import TextArea from "antd/es/input/TextArea";
import { CSSProperties } from "react";

interface ConsoleProps {
    content: string,
    displayError?: boolean,
    colorError?: string,
    style?: CSSProperties
}

function Console(props: ConsoleProps) {
    const style: CSSProperties = {
        fontFamily: "monospace",
        resize: "none",
    };

    if (props.displayError) style.color = props.colorError;

    return <TextArea contentEditable={false}
        value={props.content}
        style={{...style, ...props.style}} />

}

export default Console;