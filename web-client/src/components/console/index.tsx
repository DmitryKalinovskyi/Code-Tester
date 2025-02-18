interface ConsoleProps{
    content: string
}

function Console(props: ConsoleProps){
    return <>
        {props.content}
    </>
}

export default Console;