import { UID } from "@strapi/types";
import axios, { AxiosHeaders } from "axios";
import QueryString from "qs";
import "reflect-metadata";
import { injectable } from "tsyringe";
import getConfig from "../../config";
import {
  StrapiGetManyRequestOptions,
  StrapiGetOneRequestOptions,
} from "./request-options";
import {
  CollectionTypeResponse,
  GetNames,
  GetOwnAttributes,
  SingularTypeResponse,
} from "./types";

@injectable()
export default class StrapiClient {
  private headers = new AxiosHeaders({
    Authorization: `Bearer ${getConfig().strapi.apiToken}`,
  });

  private request<TResponse = void>(
    path: string,
    body: unknown,
    method = "post",
  ): Promise<TResponse> {
    return axios
      .request({
        url: `${getConfig().strapi.baseUrl}/api/${path}`,
        method,
        headers: this.headers,
        data: body,
      })
      .then((response) => response.data);
  }

  private get<TResponse>(
    path: string,
    params?: Record<string, unknown>,
  ): Promise<TResponse> {
    return axios
      .get(`${getConfig().strapi.baseUrl}/api/${path}`, {
        headers: this.headers,
        params,
        paramsSerializer: {
          serialize: (p) => QueryString.stringify(p),
        },
      })
      .then((response) => response.data);
  }

  create<TContentTypeUID extends UID.ContentType>(
    _: TContentTypeUID,
    collection: GetNames<TContentTypeUID>["pluralName"],
    data: GetOwnAttributes<TContentTypeUID>,
  ): Promise<SingularTypeResponse<TContentTypeUID>> {
    return this.request<SingularTypeResponse<TContentTypeUID>>(collection, {
      data,
    });
  }

  findAll<TContentTypeUID extends UID.ContentType>(
    _: TContentTypeUID,
    collection: GetNames<TContentTypeUID>["pluralName"],
    options?: StrapiGetManyRequestOptions<TContentTypeUID>,
  ): Promise<CollectionTypeResponse<TContentTypeUID>> {
    return this.get<CollectionTypeResponse<TContentTypeUID>>(
      collection,
      options,
    );
  }

  findOne<TContentTypeUID extends UID.ContentType>(
    _: TContentTypeUID,
    collection: GetNames<TContentTypeUID>["pluralName"],
    id: string,
    options?: StrapiGetOneRequestOptions<TContentTypeUID>,
  ): Promise<SingularTypeResponse<TContentTypeUID>> {
    return this.get<SingularTypeResponse<TContentTypeUID>>(
      `${collection}/${id}`,
      options,
    );
  }

  getTheOne<TContentTypeUID extends UID.ContentType>(
    _: TContentTypeUID,
    collection: GetNames<TContentTypeUID>["singularName"],
    options?: StrapiGetOneRequestOptions<TContentTypeUID>,
  ) {
    return this.get<SingularTypeResponse<TContentTypeUID>>(collection, options);
  }

  update<TContentTypeUID extends UID.ContentType>(
    _: TContentTypeUID,
    collection: GetNames<TContentTypeUID>["pluralName"],
    id: string,
    data: Partial<Omit<GetOwnAttributes<TContentTypeUID>, "id">>,
  ): Promise<SingularTypeResponse<TContentTypeUID>> {
    return this.request<SingularTypeResponse<TContentTypeUID>>(
      `${collection}/${id}`,
      {
        data,
      },
      "put",
    );
  }
}
