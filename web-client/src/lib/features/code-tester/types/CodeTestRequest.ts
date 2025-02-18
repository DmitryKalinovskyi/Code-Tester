export default interface CodeTestRequest {
    language: string;
    sourceCode: string;
    input?: string | null;
}
