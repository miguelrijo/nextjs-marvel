
export interface SimpleResponse {
    error: boolean;
    errorCode: number;
}

export interface SimpleDataSetResponse<P> extends SimpleResponse {
    items: P[];
    count: number;
    pageNumber?: string;
}

export interface SimpleDataEntityResponse<P> extends SimpleResponse {
    entity: P;
    pageNumber?: string;
}

