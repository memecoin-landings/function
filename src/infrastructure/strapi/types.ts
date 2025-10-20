import type { Schema, UID, Utils } from "@strapi/types";

export type ID = `${number}` | number;
export type BooleanValue =
  | boolean
  | "true"
  | "false"
  | "t"
  | "f"
  | "1"
  | "0"
  | 1
  | 0;
export type NumberValue = string | number;
export type DateValue = Schema.Attribute.DateValue | number;
export type TimeValue = Schema.Attribute.TimeValue | number;
export type DateTimeValue = Schema.Attribute.DateTimeValue | number;
export type TimeStampValue = Schema.Attribute.TimestampValue;
export type GetValues<TSchemaUID extends UID.Schema> = {
  [TKey in Schema.AttributeNames<TSchemaUID>]?: Schema.AttributeValueByName<
    TSchemaUID,
    TKey
  >;
};

/**
 * Attribute.GetValue override with extended values
 *
 * Fallback to unknown if never is found
 */
export type GetValue<TAttribute extends Schema.Attribute.Attribute> = Utils.If<
  Utils.IsNotNever<TAttribute>,
  Utils.MatchFirst<
    [
      // Relation
      [
        Utils.Extends<TAttribute, Schema.Attribute.OfType<"relation">>,
        unknown, // Response<RelationTarget>
      ],
      // DynamicZone
      [
        Utils.Extends<TAttribute, Schema.Attribute.OfType<"dynamiczone">>,
        TAttribute extends Schema.Attribute.DynamicZone<infer TComponentsUIDs>
          ? Array<
              // Extract tuple values to a component uid union type
              Utils.Array.Values<TComponentsUIDs> extends infer TComponentUID
                ? TComponentUID extends UID.Component
                  ? GetValues<TComponentUID> & { __component: TComponentUID }
                  : never
                : never
            >
          : never,
      ],
      // Component
      [
        Utils.Extends<TAttribute, Schema.Attribute.OfType<"component">>,
        TAttribute extends Schema.Attribute.Component<
          infer TComponentUID,
          infer TRepeatable
        >
          ? TComponentUID extends UID.Component
            ? GetValues<TComponentUID> extends infer TValues
              ? Utils.If<TRepeatable, TValues[], TValues>
              : never
            : never
          : never,
      ],
    ],
    unknown
  >,
  unknown
>;

export type GetNames<TContentTypeUID extends UID.ContentType> =
  Schema.ContentTypes[TContentTypeUID]["info"];

export type GetOwnAttributes<TContentTypeUID extends UID.ContentType> = {
  [TKey in keyof GetValues<TContentTypeUID> as TKey extends
    | "createdAt"
    | "createdBy"
    | "publishedAt"
    | "updatedAt"
    | "updatedBy"
    ? never
    : TKey]: GetValues<TContentTypeUID>[TKey];
};

export interface CollectionTypeResponse<
  TContentTypeUID extends UID.ContentType,
> {
  data: (GetValues<TContentTypeUID> & { documentId: string })[];
  meta: {
    pagination: PaginationMetadata;
  };
}

export interface SingularTypeResponse<TContentTypeUID extends UID.ContentType> {
  data: GetValues<TContentTypeUID> & { documentId: string };
  meta: unknown;
}

export type PaginationMetadata = {
  page: number;
  pageSize: number;
  pageCount: number;
  total: number;
};
