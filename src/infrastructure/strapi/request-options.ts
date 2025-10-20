import type { Schema, UID } from "@strapi/types";
import { GetValues } from "./types";

type StrapiComplexFilters<TFilter> = {
  $or?: TFilter[];
  $and?: TFilter[];
  $not?: TFilter;
};

export type StrapiRequestFilters<TContentTypeUID extends UID.ContentType> =
  StrapiObjectFilters<TContentTypeUID> &
    StrapiComplexFilters<
      StrapiObjectFilters<TContentTypeUID> &
        StrapiComplexFilters<StrapiObjectFilters<TContentTypeUID>>
    >;

type StrapiObjectFilters<TContentTypeUID extends UID.ContentType> = {
  [TKey in keyof GetValues<TContentTypeUID>]?: StrapiFilter<
    GetValues<TContentTypeUID>[TKey]
  >;
};
type CommonFilters<TValue> = {
  $eq?: TValue;
  $eqi?: TValue;
  $ne?: TValue;
  $nei?: TValue;
  $in?: TValue[];
  $notIn?: TValue[];
  $null?: TValue;
  $notNull?: TValue;
};
type StrapiFilter<TValue> = TValue extends number
  ? CommonFilters<TValue> & {
      $lt?: TValue;
      $lte?: TValue;
      $gt?: TValue;
      $gte?: TValue;
      $between: [TValue, TValue];
    }
  : TValue extends string
    ? CommonFilters<TValue> & {
        $contains?: TValue;
        $notContains?: TValue;
        $containsi?: TValue;
        $notContainsi?: TValue;
        $startsWith?: TValue;
        $startsWithi?: TValue;
        $endsWith?: TValue;
        $endsWithi?: TValue;
      }
    : CommonFilters<TValue>;

export type StrapiGetManyRequestOptions<
  TContentTypeUID extends UID.ContentType,
> = {
  pagination?:
    | {
        page?: number;
        pageSize?: number;
        withCount?: boolean;
      }
    | {
        start?: number;
        limit?: number;
        withCount?: boolean;
      };
  sort?: GetSortColumns<TContentTypeUID>[];
  filters?: StrapiRequestFilters<TContentTypeUID>;
} & StrapiPopulateOptions<TContentTypeUID>;

export type StrapiGetOneRequestOptions<
  TContentTypeUID extends UID.ContentType,
> = StrapiPopulateOptions<TContentTypeUID>;

export type StrapiPopulateOptions<TContentTypeUID extends UID.ContentType> = {
  populate?:
    | `${Schema.PopulatableAttributeNames<TContentTypeUID>}${`.${string}` | ""}`[]
    | Partial<Record<number, Schema.PopulatableAttributeNames<TContentTypeUID>>>
    | Partial<
        Record<
          Schema.PopulatableAttributeNames<TContentTypeUID>,
          { populate: unknown }
        >
      >;
};

export type GetSortColumns<TContentTypeUID extends UID.ContentType> =
  `${keyof GetValues<TContentTypeUID>}${":asc" | ":desc" | ""}`;
