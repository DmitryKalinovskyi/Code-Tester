import { cpp } from "@codemirror/lang-cpp";
import { java } from "@codemirror/lang-java";
import { python } from "@codemirror/lang-python";

const supportedLanguages = {
    "Python": python,
    "C++": cpp,
    "Java": java
}

export default supportedLanguages;