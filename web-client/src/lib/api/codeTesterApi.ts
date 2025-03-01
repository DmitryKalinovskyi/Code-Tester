import { catchError, tap } from "rxjs";
import { ajax, AjaxConfig } from "rxjs/ajax";

export interface CodeTesterApiConfig extends AjaxConfig {
    isUrlFull?: boolean;
    debug?: boolean;
}

const baseUrl = "https://localhost:8080/api"

const createRequestObservable = <T>(config: CodeTesterApiConfig) => {
    const buildUrl = () => {
        if (config.isUrlFull) {
            return config.url;
        }

        return `${baseUrl}${config.url}`;
    };

    const ajaxConfig: AjaxConfig = {
        ...config,
        url: buildUrl(),
    };

    return ajax<T>(ajaxConfig).pipe(
        tap((ajaxResponse) => {
            if (config.debug) {
                alert(`Received response: ${JSON.stringify(ajaxResponse)}`);
            }
        }),
        catchError((error) => {
            if (config.debug) {
                alert(`Catched error: ${JSON.stringify(error)}`);
            }

            throw error;
        })
    );
};

const codeTesterApi = (() => {
    const withMethod = (method: string) => {
        return <ResponseType>(urlOrConfig: string | CodeTesterApiConfig) => {
            if (typeof urlOrConfig === "string") {
                return createRequestObservable<ResponseType>({
                    method,
                    url: urlOrConfig,
                });
            }

            return createRequestObservable<ResponseType>({
                method,
                ...urlOrConfig,
            });
        };
    };

    const create = <ResponseType>(urlOrConfig: string | CodeTesterApiConfig) => {
        return withMethod("GET")<ResponseType>(urlOrConfig);
    };

    create.get = withMethod("GET");
    create.post = withMethod("POST");
    create.patch = withMethod("PATCH");
    create.put = withMethod("PUT");
    create.delete = withMethod("DELETE");

    return create;
})();

export default codeTesterApi;
