import { GraphQLFormattedError } from "graphql";

type Error = {
    message: string;
    statusCode: string;
}

const customFetch = async (url: string, options: RequestInit) => {
    const accessToken = localStorage.getItem('access_token');

    const headers = options.headers as Record<string, string>;

    return await fetch(url, {
        ...options,
        headers: {
            ...headers,
            Authorization: headers?.Authorization || `Bearer ${accessToken}`,
            "Content-Type": "application/json",
            "Apollo-Require-Prefligt": "true",
        }
    })
}

const getGraphQLErrors = (body: Record<"errors", GraphQLFormattedError[] | undefined>): Error | null => {
    if (!body) {
        return {
            message: "Unknown Error",
            statusCode: "INTERNAL_SERVER_ERROR"
        }
    }

    if ("errors" in body) {
        const errors = body?.errors;

        if (errors && Array.isArray(errors)) {
            const messages = errors
                .map((error) => error?.message)
                .filter(Boolean)
                .join(", ");

            const code = errors?.[0]?.extensions?.code;

            return {
                message: messages || "Unknown Error",
                statusCode: code || 500,
            };
        }
    }

    return null;
}


export const fetchWrapper = async (url: string, options: RequestInit) => {
    const response = await customFetch(url, options);

    const responseClone = response.clone();
    const body = await responseClone.json();

    const error = getGraphQLErrors(body);

    if (error) {
        throw error;
    }

    return response;
}