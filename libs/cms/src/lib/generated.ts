import { GraphQLClient } from 'graphql-request';
import * as Dom from 'graphql-request/dist/types.dom';
import gql from 'graphql-tag';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /**
   * A date-time string at UTC, such as 2007-12-03T10:15:30Z,
   *     compliant with the 'date-time' format outlined in section 5.6 of
   *     the RFC 3339 profile of the ISO 8601 standard for representation
   *     of dates and times using the Gregorian calendar.
   */
  DateTime: any;
  /** The 'Dimension' type represents dimensions as whole numeric values between `1` and `4000`. */
  Dimension: any;
  /** The 'HexColor' type represents color in `rgb:ffffff` string format. */
  HexColor: any;
  /** The `JSON` scalar type represents JSON values as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf). */
  JSON: any;
  /** The 'Quality' type represents quality as whole numeric values between `1` and `100`. */
  Quality: any;
};

/** Represents a binary file in a space. An asset can be any file type. */
export type Asset = {
  __typename?: 'Asset';
  contentType?: Maybe<Scalars['String']>;
  contentfulMetadata: ContentfulMetadata;
  description?: Maybe<Scalars['String']>;
  fileName?: Maybe<Scalars['String']>;
  height?: Maybe<Scalars['Int']>;
  linkedFrom?: Maybe<AssetLinkingCollections>;
  size?: Maybe<Scalars['Int']>;
  sys: Sys;
  title?: Maybe<Scalars['String']>;
  url?: Maybe<Scalars['String']>;
  width?: Maybe<Scalars['Int']>;
};


/** Represents a binary file in a space. An asset can be any file type. */
export type AssetLinkedFromArgs = {
  allowedLocales?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


/** Represents a binary file in a space. An asset can be any file type. */
export type AssetUrlArgs = {
  transform?: InputMaybe<ImageTransformOptions>;
};

export type AssetCollection = {
  __typename?: 'AssetCollection';
  items: Array<Maybe<Asset>>;
  limit: Scalars['Int'];
  skip: Scalars['Int'];
  total: Scalars['Int'];
};

export type AssetFilter = {
  AND?: InputMaybe<Array<InputMaybe<AssetFilter>>>;
  OR?: InputMaybe<Array<InputMaybe<AssetFilter>>>;
  contentType?: InputMaybe<Scalars['String']>;
  contentType_contains?: InputMaybe<Scalars['String']>;
  contentType_exists?: InputMaybe<Scalars['Boolean']>;
  contentType_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  contentType_not?: InputMaybe<Scalars['String']>;
  contentType_not_contains?: InputMaybe<Scalars['String']>;
  contentType_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  contentfulMetadata?: InputMaybe<ContentfulMetadataFilter>;
  description?: InputMaybe<Scalars['String']>;
  description_contains?: InputMaybe<Scalars['String']>;
  description_exists?: InputMaybe<Scalars['Boolean']>;
  description_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  description_not?: InputMaybe<Scalars['String']>;
  description_not_contains?: InputMaybe<Scalars['String']>;
  description_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  fileName?: InputMaybe<Scalars['String']>;
  fileName_contains?: InputMaybe<Scalars['String']>;
  fileName_exists?: InputMaybe<Scalars['Boolean']>;
  fileName_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  fileName_not?: InputMaybe<Scalars['String']>;
  fileName_not_contains?: InputMaybe<Scalars['String']>;
  fileName_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  height?: InputMaybe<Scalars['Int']>;
  height_exists?: InputMaybe<Scalars['Boolean']>;
  height_gt?: InputMaybe<Scalars['Int']>;
  height_gte?: InputMaybe<Scalars['Int']>;
  height_in?: InputMaybe<Array<InputMaybe<Scalars['Int']>>>;
  height_lt?: InputMaybe<Scalars['Int']>;
  height_lte?: InputMaybe<Scalars['Int']>;
  height_not?: InputMaybe<Scalars['Int']>;
  height_not_in?: InputMaybe<Array<InputMaybe<Scalars['Int']>>>;
  size?: InputMaybe<Scalars['Int']>;
  size_exists?: InputMaybe<Scalars['Boolean']>;
  size_gt?: InputMaybe<Scalars['Int']>;
  size_gte?: InputMaybe<Scalars['Int']>;
  size_in?: InputMaybe<Array<InputMaybe<Scalars['Int']>>>;
  size_lt?: InputMaybe<Scalars['Int']>;
  size_lte?: InputMaybe<Scalars['Int']>;
  size_not?: InputMaybe<Scalars['Int']>;
  size_not_in?: InputMaybe<Array<InputMaybe<Scalars['Int']>>>;
  sys?: InputMaybe<SysFilter>;
  title?: InputMaybe<Scalars['String']>;
  title_contains?: InputMaybe<Scalars['String']>;
  title_exists?: InputMaybe<Scalars['Boolean']>;
  title_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  title_not?: InputMaybe<Scalars['String']>;
  title_not_contains?: InputMaybe<Scalars['String']>;
  title_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  url?: InputMaybe<Scalars['String']>;
  url_contains?: InputMaybe<Scalars['String']>;
  url_exists?: InputMaybe<Scalars['Boolean']>;
  url_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  url_not?: InputMaybe<Scalars['String']>;
  url_not_contains?: InputMaybe<Scalars['String']>;
  url_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  width?: InputMaybe<Scalars['Int']>;
  width_exists?: InputMaybe<Scalars['Boolean']>;
  width_gt?: InputMaybe<Scalars['Int']>;
  width_gte?: InputMaybe<Scalars['Int']>;
  width_in?: InputMaybe<Array<InputMaybe<Scalars['Int']>>>;
  width_lt?: InputMaybe<Scalars['Int']>;
  width_lte?: InputMaybe<Scalars['Int']>;
  width_not?: InputMaybe<Scalars['Int']>;
  width_not_in?: InputMaybe<Array<InputMaybe<Scalars['Int']>>>;
};

export type AssetLinkingCollections = {
  __typename?: 'AssetLinkingCollections';
  blogPostCollection?: Maybe<BlogPostCollection>;
  couponCategoryCollection?: Maybe<CouponCategoryCollection>;
  couponEntityCollection?: Maybe<CouponEntityCollection>;
  couponEntryCollection?: Maybe<CouponEntryCollection>;
  couponHeadlineCollection?: Maybe<CouponHeadlineCollection>;
  entryCollection?: Maybe<EntryCollection>;
  personCollection?: Maybe<PersonCollection>;
  productCollection?: Maybe<ProductCollection>;
};


export type AssetLinkingCollectionsBlogPostCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  locale?: InputMaybe<Scalars['String']>;
  preview?: InputMaybe<Scalars['Boolean']>;
  skip?: InputMaybe<Scalars['Int']>;
};


export type AssetLinkingCollectionsCouponCategoryCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  locale?: InputMaybe<Scalars['String']>;
  preview?: InputMaybe<Scalars['Boolean']>;
  skip?: InputMaybe<Scalars['Int']>;
};


export type AssetLinkingCollectionsCouponEntityCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  locale?: InputMaybe<Scalars['String']>;
  preview?: InputMaybe<Scalars['Boolean']>;
  skip?: InputMaybe<Scalars['Int']>;
};


export type AssetLinkingCollectionsCouponEntryCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  locale?: InputMaybe<Scalars['String']>;
  preview?: InputMaybe<Scalars['Boolean']>;
  skip?: InputMaybe<Scalars['Int']>;
};


export type AssetLinkingCollectionsCouponHeadlineCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  locale?: InputMaybe<Scalars['String']>;
  preview?: InputMaybe<Scalars['Boolean']>;
  skip?: InputMaybe<Scalars['Int']>;
};


export type AssetLinkingCollectionsEntryCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  locale?: InputMaybe<Scalars['String']>;
  preview?: InputMaybe<Scalars['Boolean']>;
  skip?: InputMaybe<Scalars['Int']>;
};


export type AssetLinkingCollectionsPersonCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  locale?: InputMaybe<Scalars['String']>;
  preview?: InputMaybe<Scalars['Boolean']>;
  skip?: InputMaybe<Scalars['Int']>;
};


export type AssetLinkingCollectionsProductCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  locale?: InputMaybe<Scalars['String']>;
  preview?: InputMaybe<Scalars['Boolean']>;
  skip?: InputMaybe<Scalars['Int']>;
};

export enum AssetOrder {
  ContentTypeAsc = 'contentType_ASC',
  ContentTypeDesc = 'contentType_DESC',
  FileNameAsc = 'fileName_ASC',
  FileNameDesc = 'fileName_DESC',
  HeightAsc = 'height_ASC',
  HeightDesc = 'height_DESC',
  SizeAsc = 'size_ASC',
  SizeDesc = 'size_DESC',
  SysFirstPublishedAtAsc = 'sys_firstPublishedAt_ASC',
  SysFirstPublishedAtDesc = 'sys_firstPublishedAt_DESC',
  SysIdAsc = 'sys_id_ASC',
  SysIdDesc = 'sys_id_DESC',
  SysPublishedAtAsc = 'sys_publishedAt_ASC',
  SysPublishedAtDesc = 'sys_publishedAt_DESC',
  SysPublishedVersionAsc = 'sys_publishedVersion_ASC',
  SysPublishedVersionDesc = 'sys_publishedVersion_DESC',
  UrlAsc = 'url_ASC',
  UrlDesc = 'url_DESC',
  WidthAsc = 'width_ASC',
  WidthDesc = 'width_DESC'
}

/** [See type definition](https://app.contentful.com/spaces/8vnddh4olhe6/content_types/blogPost) */
export type BlogPost = Entry & {
  __typename?: 'BlogPost';
  author?: Maybe<Entry>;
  body?: Maybe<BlogPostBody>;
  contentfulMetadata: ContentfulMetadata;
  description?: Maybe<Scalars['String']>;
  heroImage?: Maybe<Asset>;
  linkedFrom?: Maybe<BlogPostLinkingCollections>;
  publishDate?: Maybe<Scalars['DateTime']>;
  slug?: Maybe<Scalars['String']>;
  sys: Sys;
  tags?: Maybe<Array<Maybe<Scalars['String']>>>;
  title?: Maybe<Scalars['String']>;
};


/** [See type definition](https://app.contentful.com/spaces/8vnddh4olhe6/content_types/blogPost) */
export type BlogPostAuthorArgs = {
  locale?: InputMaybe<Scalars['String']>;
  preview?: InputMaybe<Scalars['Boolean']>;
};


/** [See type definition](https://app.contentful.com/spaces/8vnddh4olhe6/content_types/blogPost) */
export type BlogPostBodyArgs = {
  locale?: InputMaybe<Scalars['String']>;
};


/** [See type definition](https://app.contentful.com/spaces/8vnddh4olhe6/content_types/blogPost) */
export type BlogPostDescriptionArgs = {
  locale?: InputMaybe<Scalars['String']>;
};


/** [See type definition](https://app.contentful.com/spaces/8vnddh4olhe6/content_types/blogPost) */
export type BlogPostHeroImageArgs = {
  locale?: InputMaybe<Scalars['String']>;
  preview?: InputMaybe<Scalars['Boolean']>;
};


/** [See type definition](https://app.contentful.com/spaces/8vnddh4olhe6/content_types/blogPost) */
export type BlogPostLinkedFromArgs = {
  allowedLocales?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


/** [See type definition](https://app.contentful.com/spaces/8vnddh4olhe6/content_types/blogPost) */
export type BlogPostPublishDateArgs = {
  locale?: InputMaybe<Scalars['String']>;
};


/** [See type definition](https://app.contentful.com/spaces/8vnddh4olhe6/content_types/blogPost) */
export type BlogPostSlugArgs = {
  locale?: InputMaybe<Scalars['String']>;
};


/** [See type definition](https://app.contentful.com/spaces/8vnddh4olhe6/content_types/blogPost) */
export type BlogPostTagsArgs = {
  locale?: InputMaybe<Scalars['String']>;
};


/** [See type definition](https://app.contentful.com/spaces/8vnddh4olhe6/content_types/blogPost) */
export type BlogPostTitleArgs = {
  locale?: InputMaybe<Scalars['String']>;
};

export type BlogPostBody = {
  __typename?: 'BlogPostBody';
  json: Scalars['JSON'];
  links: BlogPostBodyLinks;
};

export type BlogPostBodyAssets = {
  __typename?: 'BlogPostBodyAssets';
  block: Array<Maybe<Asset>>;
  hyperlink: Array<Maybe<Asset>>;
};

export type BlogPostBodyEntries = {
  __typename?: 'BlogPostBodyEntries';
  block: Array<Maybe<Entry>>;
  hyperlink: Array<Maybe<Entry>>;
  inline: Array<Maybe<Entry>>;
};

export type BlogPostBodyLinks = {
  __typename?: 'BlogPostBodyLinks';
  assets: BlogPostBodyAssets;
  entries: BlogPostBodyEntries;
};

export type BlogPostCollection = {
  __typename?: 'BlogPostCollection';
  items: Array<Maybe<BlogPost>>;
  limit: Scalars['Int'];
  skip: Scalars['Int'];
  total: Scalars['Int'];
};

export type BlogPostFilter = {
  AND?: InputMaybe<Array<InputMaybe<BlogPostFilter>>>;
  OR?: InputMaybe<Array<InputMaybe<BlogPostFilter>>>;
  author_exists?: InputMaybe<Scalars['Boolean']>;
  body_contains?: InputMaybe<Scalars['String']>;
  body_exists?: InputMaybe<Scalars['Boolean']>;
  body_not_contains?: InputMaybe<Scalars['String']>;
  contentfulMetadata?: InputMaybe<ContentfulMetadataFilter>;
  description?: InputMaybe<Scalars['String']>;
  description_contains?: InputMaybe<Scalars['String']>;
  description_exists?: InputMaybe<Scalars['Boolean']>;
  description_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  description_not?: InputMaybe<Scalars['String']>;
  description_not_contains?: InputMaybe<Scalars['String']>;
  description_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  heroImage_exists?: InputMaybe<Scalars['Boolean']>;
  publishDate?: InputMaybe<Scalars['DateTime']>;
  publishDate_exists?: InputMaybe<Scalars['Boolean']>;
  publishDate_gt?: InputMaybe<Scalars['DateTime']>;
  publishDate_gte?: InputMaybe<Scalars['DateTime']>;
  publishDate_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  publishDate_lt?: InputMaybe<Scalars['DateTime']>;
  publishDate_lte?: InputMaybe<Scalars['DateTime']>;
  publishDate_not?: InputMaybe<Scalars['DateTime']>;
  publishDate_not_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  slug?: InputMaybe<Scalars['String']>;
  slug_contains?: InputMaybe<Scalars['String']>;
  slug_exists?: InputMaybe<Scalars['Boolean']>;
  slug_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  slug_not?: InputMaybe<Scalars['String']>;
  slug_not_contains?: InputMaybe<Scalars['String']>;
  slug_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  sys?: InputMaybe<SysFilter>;
  tags_contains_all?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  tags_contains_none?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  tags_contains_some?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  tags_exists?: InputMaybe<Scalars['Boolean']>;
  title?: InputMaybe<Scalars['String']>;
  title_contains?: InputMaybe<Scalars['String']>;
  title_exists?: InputMaybe<Scalars['Boolean']>;
  title_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  title_not?: InputMaybe<Scalars['String']>;
  title_not_contains?: InputMaybe<Scalars['String']>;
  title_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

export type BlogPostLinkingCollections = {
  __typename?: 'BlogPostLinkingCollections';
  entryCollection?: Maybe<EntryCollection>;
};


export type BlogPostLinkingCollectionsEntryCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  locale?: InputMaybe<Scalars['String']>;
  preview?: InputMaybe<Scalars['Boolean']>;
  skip?: InputMaybe<Scalars['Int']>;
};

export enum BlogPostOrder {
  PublishDateAsc = 'publishDate_ASC',
  PublishDateDesc = 'publishDate_DESC',
  SlugAsc = 'slug_ASC',
  SlugDesc = 'slug_DESC',
  SysFirstPublishedAtAsc = 'sys_firstPublishedAt_ASC',
  SysFirstPublishedAtDesc = 'sys_firstPublishedAt_DESC',
  SysIdAsc = 'sys_id_ASC',
  SysIdDesc = 'sys_id_DESC',
  SysPublishedAtAsc = 'sys_publishedAt_ASC',
  SysPublishedAtDesc = 'sys_publishedAt_DESC',
  SysPublishedVersionAsc = 'sys_publishedVersion_ASC',
  SysPublishedVersionDesc = 'sys_publishedVersion_DESC',
  TitleAsc = 'title_ASC',
  TitleDesc = 'title_DESC'
}

export type ContentfulMetadata = {
  __typename?: 'ContentfulMetadata';
  tags: Array<Maybe<ContentfulTag>>;
};

export type ContentfulMetadataFilter = {
  tags?: InputMaybe<ContentfulMetadataTagsFilter>;
  tags_exists?: InputMaybe<Scalars['Boolean']>;
};

export type ContentfulMetadataTagsFilter = {
  id_contains_all?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  id_contains_none?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  id_contains_some?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

/**
 * Represents a tag entity for finding and organizing content easily.
 *     Find out more here: https://www.contentful.com/developers/docs/references/content-delivery-api/#/reference/content-tags
 */
export type ContentfulTag = {
  __typename?: 'ContentfulTag';
  id?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
};

/** Coupon website "Category" type [See type definition](https://app.contentful.com/spaces/8vnddh4olhe6/content_types/couponCategory) */
export type CouponCategory = Entry & {
  __typename?: 'CouponCategory';
  contentfulMetadata: ContentfulMetadata;
  description?: Maybe<Scalars['String']>;
  image?: Maybe<Asset>;
  linkedFrom?: Maybe<CouponCategoryLinkingCollections>;
  name?: Maybe<Scalars['String']>;
  sys: Sys;
};


/** Coupon website "Category" type [See type definition](https://app.contentful.com/spaces/8vnddh4olhe6/content_types/couponCategory) */
export type CouponCategoryDescriptionArgs = {
  locale?: InputMaybe<Scalars['String']>;
};


/** Coupon website "Category" type [See type definition](https://app.contentful.com/spaces/8vnddh4olhe6/content_types/couponCategory) */
export type CouponCategoryImageArgs = {
  locale?: InputMaybe<Scalars['String']>;
  preview?: InputMaybe<Scalars['Boolean']>;
};


/** Coupon website "Category" type [See type definition](https://app.contentful.com/spaces/8vnddh4olhe6/content_types/couponCategory) */
export type CouponCategoryLinkedFromArgs = {
  allowedLocales?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


/** Coupon website "Category" type [See type definition](https://app.contentful.com/spaces/8vnddh4olhe6/content_types/couponCategory) */
export type CouponCategoryNameArgs = {
  locale?: InputMaybe<Scalars['String']>;
};

export type CouponCategoryCollection = {
  __typename?: 'CouponCategoryCollection';
  items: Array<Maybe<CouponCategory>>;
  limit: Scalars['Int'];
  skip: Scalars['Int'];
  total: Scalars['Int'];
};

export type CouponCategoryFilter = {
  AND?: InputMaybe<Array<InputMaybe<CouponCategoryFilter>>>;
  OR?: InputMaybe<Array<InputMaybe<CouponCategoryFilter>>>;
  contentfulMetadata?: InputMaybe<ContentfulMetadataFilter>;
  description?: InputMaybe<Scalars['String']>;
  description_contains?: InputMaybe<Scalars['String']>;
  description_exists?: InputMaybe<Scalars['Boolean']>;
  description_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  description_not?: InputMaybe<Scalars['String']>;
  description_not_contains?: InputMaybe<Scalars['String']>;
  description_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  image_exists?: InputMaybe<Scalars['Boolean']>;
  name?: InputMaybe<Scalars['String']>;
  name_contains?: InputMaybe<Scalars['String']>;
  name_exists?: InputMaybe<Scalars['Boolean']>;
  name_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  name_not?: InputMaybe<Scalars['String']>;
  name_not_contains?: InputMaybe<Scalars['String']>;
  name_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  sys?: InputMaybe<SysFilter>;
};

export type CouponCategoryLinkingCollections = {
  __typename?: 'CouponCategoryLinkingCollections';
  couponEntityCollection?: Maybe<CouponEntityCollection>;
  entryCollection?: Maybe<EntryCollection>;
};


export type CouponCategoryLinkingCollectionsCouponEntityCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  locale?: InputMaybe<Scalars['String']>;
  preview?: InputMaybe<Scalars['Boolean']>;
  skip?: InputMaybe<Scalars['Int']>;
};


export type CouponCategoryLinkingCollectionsEntryCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  locale?: InputMaybe<Scalars['String']>;
  preview?: InputMaybe<Scalars['Boolean']>;
  skip?: InputMaybe<Scalars['Int']>;
};

export enum CouponCategoryOrder {
  NameAsc = 'name_ASC',
  NameDesc = 'name_DESC',
  SysFirstPublishedAtAsc = 'sys_firstPublishedAt_ASC',
  SysFirstPublishedAtDesc = 'sys_firstPublishedAt_DESC',
  SysIdAsc = 'sys_id_ASC',
  SysIdDesc = 'sys_id_DESC',
  SysPublishedAtAsc = 'sys_publishedAt_ASC',
  SysPublishedAtDesc = 'sys_publishedAt_DESC',
  SysPublishedVersionAsc = 'sys_publishedVersion_ASC',
  SysPublishedVersionDesc = 'sys_publishedVersion_DESC'
}

/** Coupon website brand entity. Such as: "Coinbase, Robinhood, BigBank, etc" [See type definition](https://app.contentful.com/spaces/8vnddh4olhe6/content_types/couponEntity) */
export type CouponEntity = Entry & {
  __typename?: 'CouponEntity';
  brandUrl?: Maybe<Scalars['String']>;
  category?: Maybe<CouponCategory>;
  contentfulMetadata: ContentfulMetadata;
  description?: Maybe<Scalars['String']>;
  headline?: Maybe<Scalars['String']>;
  linkedFrom?: Maybe<CouponEntityLinkingCollections>;
  logoImage?: Maybe<Asset>;
  name?: Maybe<Scalars['String']>;
  slug?: Maybe<Scalars['String']>;
  sys: Sys;
};


/** Coupon website brand entity. Such as: "Coinbase, Robinhood, BigBank, etc" [See type definition](https://app.contentful.com/spaces/8vnddh4olhe6/content_types/couponEntity) */
export type CouponEntityBrandUrlArgs = {
  locale?: InputMaybe<Scalars['String']>;
};


/** Coupon website brand entity. Such as: "Coinbase, Robinhood, BigBank, etc" [See type definition](https://app.contentful.com/spaces/8vnddh4olhe6/content_types/couponEntity) */
export type CouponEntityCategoryArgs = {
  locale?: InputMaybe<Scalars['String']>;
  preview?: InputMaybe<Scalars['Boolean']>;
};


/** Coupon website brand entity. Such as: "Coinbase, Robinhood, BigBank, etc" [See type definition](https://app.contentful.com/spaces/8vnddh4olhe6/content_types/couponEntity) */
export type CouponEntityDescriptionArgs = {
  locale?: InputMaybe<Scalars['String']>;
};


/** Coupon website brand entity. Such as: "Coinbase, Robinhood, BigBank, etc" [See type definition](https://app.contentful.com/spaces/8vnddh4olhe6/content_types/couponEntity) */
export type CouponEntityHeadlineArgs = {
  locale?: InputMaybe<Scalars['String']>;
};


/** Coupon website brand entity. Such as: "Coinbase, Robinhood, BigBank, etc" [See type definition](https://app.contentful.com/spaces/8vnddh4olhe6/content_types/couponEntity) */
export type CouponEntityLinkedFromArgs = {
  allowedLocales?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


/** Coupon website brand entity. Such as: "Coinbase, Robinhood, BigBank, etc" [See type definition](https://app.contentful.com/spaces/8vnddh4olhe6/content_types/couponEntity) */
export type CouponEntityLogoImageArgs = {
  locale?: InputMaybe<Scalars['String']>;
  preview?: InputMaybe<Scalars['Boolean']>;
};


/** Coupon website brand entity. Such as: "Coinbase, Robinhood, BigBank, etc" [See type definition](https://app.contentful.com/spaces/8vnddh4olhe6/content_types/couponEntity) */
export type CouponEntityNameArgs = {
  locale?: InputMaybe<Scalars['String']>;
};


/** Coupon website brand entity. Such as: "Coinbase, Robinhood, BigBank, etc" [See type definition](https://app.contentful.com/spaces/8vnddh4olhe6/content_types/couponEntity) */
export type CouponEntitySlugArgs = {
  locale?: InputMaybe<Scalars['String']>;
};

export type CouponEntityCollection = {
  __typename?: 'CouponEntityCollection';
  items: Array<Maybe<CouponEntity>>;
  limit: Scalars['Int'];
  skip: Scalars['Int'];
  total: Scalars['Int'];
};

export type CouponEntityFilter = {
  AND?: InputMaybe<Array<InputMaybe<CouponEntityFilter>>>;
  OR?: InputMaybe<Array<InputMaybe<CouponEntityFilter>>>;
  brandUrl?: InputMaybe<Scalars['String']>;
  brandUrl_contains?: InputMaybe<Scalars['String']>;
  brandUrl_exists?: InputMaybe<Scalars['Boolean']>;
  brandUrl_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  brandUrl_not?: InputMaybe<Scalars['String']>;
  brandUrl_not_contains?: InputMaybe<Scalars['String']>;
  brandUrl_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  category?: InputMaybe<CfCouponCategoryNestedFilter>;
  category_exists?: InputMaybe<Scalars['Boolean']>;
  contentfulMetadata?: InputMaybe<ContentfulMetadataFilter>;
  description?: InputMaybe<Scalars['String']>;
  description_contains?: InputMaybe<Scalars['String']>;
  description_exists?: InputMaybe<Scalars['Boolean']>;
  description_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  description_not?: InputMaybe<Scalars['String']>;
  description_not_contains?: InputMaybe<Scalars['String']>;
  description_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  headline?: InputMaybe<Scalars['String']>;
  headline_contains?: InputMaybe<Scalars['String']>;
  headline_exists?: InputMaybe<Scalars['Boolean']>;
  headline_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  headline_not?: InputMaybe<Scalars['String']>;
  headline_not_contains?: InputMaybe<Scalars['String']>;
  headline_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  logoImage_exists?: InputMaybe<Scalars['Boolean']>;
  name?: InputMaybe<Scalars['String']>;
  name_contains?: InputMaybe<Scalars['String']>;
  name_exists?: InputMaybe<Scalars['Boolean']>;
  name_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  name_not?: InputMaybe<Scalars['String']>;
  name_not_contains?: InputMaybe<Scalars['String']>;
  name_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  slug?: InputMaybe<Scalars['String']>;
  slug_contains?: InputMaybe<Scalars['String']>;
  slug_exists?: InputMaybe<Scalars['Boolean']>;
  slug_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  slug_not?: InputMaybe<Scalars['String']>;
  slug_not_contains?: InputMaybe<Scalars['String']>;
  slug_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  sys?: InputMaybe<SysFilter>;
};

export type CouponEntityLinkingCollections = {
  __typename?: 'CouponEntityLinkingCollections';
  couponEntryCollection?: Maybe<CouponEntryCollection>;
  entryCollection?: Maybe<EntryCollection>;
};


export type CouponEntityLinkingCollectionsCouponEntryCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  locale?: InputMaybe<Scalars['String']>;
  preview?: InputMaybe<Scalars['Boolean']>;
  skip?: InputMaybe<Scalars['Int']>;
};


export type CouponEntityLinkingCollectionsEntryCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  locale?: InputMaybe<Scalars['String']>;
  preview?: InputMaybe<Scalars['Boolean']>;
  skip?: InputMaybe<Scalars['Int']>;
};

export enum CouponEntityOrder {
  BrandUrlAsc = 'brandUrl_ASC',
  BrandUrlDesc = 'brandUrl_DESC',
  HeadlineAsc = 'headline_ASC',
  HeadlineDesc = 'headline_DESC',
  NameAsc = 'name_ASC',
  NameDesc = 'name_DESC',
  SlugAsc = 'slug_ASC',
  SlugDesc = 'slug_DESC',
  SysFirstPublishedAtAsc = 'sys_firstPublishedAt_ASC',
  SysFirstPublishedAtDesc = 'sys_firstPublishedAt_DESC',
  SysIdAsc = 'sys_id_ASC',
  SysIdDesc = 'sys_id_DESC',
  SysPublishedAtAsc = 'sys_publishedAt_ASC',
  SysPublishedAtDesc = 'sys_publishedAt_DESC',
  SysPublishedVersionAsc = 'sys_publishedVersion_ASC',
  SysPublishedVersionDesc = 'sys_publishedVersion_DESC'
}

/** Represents an Entry of a Coupon website's brand entity [See type definition](https://app.contentful.com/spaces/8vnddh4olhe6/content_types/couponEntry) */
export type CouponEntry = Entry & {
  __typename?: 'CouponEntry';
  active?: Maybe<Scalars['Boolean']>;
  bannerImagesCollection?: Maybe<AssetCollection>;
  brandEntity?: Maybe<CouponEntity>;
  contentfulMetadata: ContentfulMetadata;
  description?: Maybe<Scalars['String']>;
  expiresAt?: Maybe<Scalars['DateTime']>;
  linkedFrom?: Maybe<CouponEntryLinkingCollections>;
  referringUrl?: Maybe<Scalars['String']>;
  slug?: Maybe<Scalars['String']>;
  sys: Sys;
  title?: Maybe<Scalars['String']>;
};


/** Represents an Entry of a Coupon website's brand entity [See type definition](https://app.contentful.com/spaces/8vnddh4olhe6/content_types/couponEntry) */
export type CouponEntryActiveArgs = {
  locale?: InputMaybe<Scalars['String']>;
};


/** Represents an Entry of a Coupon website's brand entity [See type definition](https://app.contentful.com/spaces/8vnddh4olhe6/content_types/couponEntry) */
export type CouponEntryBannerImagesCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  locale?: InputMaybe<Scalars['String']>;
  preview?: InputMaybe<Scalars['Boolean']>;
  skip?: InputMaybe<Scalars['Int']>;
};


/** Represents an Entry of a Coupon website's brand entity [See type definition](https://app.contentful.com/spaces/8vnddh4olhe6/content_types/couponEntry) */
export type CouponEntryBrandEntityArgs = {
  locale?: InputMaybe<Scalars['String']>;
  preview?: InputMaybe<Scalars['Boolean']>;
};


/** Represents an Entry of a Coupon website's brand entity [See type definition](https://app.contentful.com/spaces/8vnddh4olhe6/content_types/couponEntry) */
export type CouponEntryDescriptionArgs = {
  locale?: InputMaybe<Scalars['String']>;
};


/** Represents an Entry of a Coupon website's brand entity [See type definition](https://app.contentful.com/spaces/8vnddh4olhe6/content_types/couponEntry) */
export type CouponEntryExpiresAtArgs = {
  locale?: InputMaybe<Scalars['String']>;
};


/** Represents an Entry of a Coupon website's brand entity [See type definition](https://app.contentful.com/spaces/8vnddh4olhe6/content_types/couponEntry) */
export type CouponEntryLinkedFromArgs = {
  allowedLocales?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


/** Represents an Entry of a Coupon website's brand entity [See type definition](https://app.contentful.com/spaces/8vnddh4olhe6/content_types/couponEntry) */
export type CouponEntryReferringUrlArgs = {
  locale?: InputMaybe<Scalars['String']>;
};


/** Represents an Entry of a Coupon website's brand entity [See type definition](https://app.contentful.com/spaces/8vnddh4olhe6/content_types/couponEntry) */
export type CouponEntrySlugArgs = {
  locale?: InputMaybe<Scalars['String']>;
};


/** Represents an Entry of a Coupon website's brand entity [See type definition](https://app.contentful.com/spaces/8vnddh4olhe6/content_types/couponEntry) */
export type CouponEntryTitleArgs = {
  locale?: InputMaybe<Scalars['String']>;
};

export type CouponEntryCollection = {
  __typename?: 'CouponEntryCollection';
  items: Array<Maybe<CouponEntry>>;
  limit: Scalars['Int'];
  skip: Scalars['Int'];
  total: Scalars['Int'];
};

export type CouponEntryFilter = {
  AND?: InputMaybe<Array<InputMaybe<CouponEntryFilter>>>;
  OR?: InputMaybe<Array<InputMaybe<CouponEntryFilter>>>;
  active?: InputMaybe<Scalars['Boolean']>;
  active_exists?: InputMaybe<Scalars['Boolean']>;
  active_not?: InputMaybe<Scalars['Boolean']>;
  bannerImagesCollection_exists?: InputMaybe<Scalars['Boolean']>;
  brandEntity?: InputMaybe<CfCouponEntityNestedFilter>;
  brandEntity_exists?: InputMaybe<Scalars['Boolean']>;
  contentfulMetadata?: InputMaybe<ContentfulMetadataFilter>;
  description?: InputMaybe<Scalars['String']>;
  description_contains?: InputMaybe<Scalars['String']>;
  description_exists?: InputMaybe<Scalars['Boolean']>;
  description_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  description_not?: InputMaybe<Scalars['String']>;
  description_not_contains?: InputMaybe<Scalars['String']>;
  description_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  expiresAt?: InputMaybe<Scalars['DateTime']>;
  expiresAt_exists?: InputMaybe<Scalars['Boolean']>;
  expiresAt_gt?: InputMaybe<Scalars['DateTime']>;
  expiresAt_gte?: InputMaybe<Scalars['DateTime']>;
  expiresAt_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  expiresAt_lt?: InputMaybe<Scalars['DateTime']>;
  expiresAt_lte?: InputMaybe<Scalars['DateTime']>;
  expiresAt_not?: InputMaybe<Scalars['DateTime']>;
  expiresAt_not_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  referringUrl?: InputMaybe<Scalars['String']>;
  referringUrl_contains?: InputMaybe<Scalars['String']>;
  referringUrl_exists?: InputMaybe<Scalars['Boolean']>;
  referringUrl_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  referringUrl_not?: InputMaybe<Scalars['String']>;
  referringUrl_not_contains?: InputMaybe<Scalars['String']>;
  referringUrl_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  slug?: InputMaybe<Scalars['String']>;
  slug_contains?: InputMaybe<Scalars['String']>;
  slug_exists?: InputMaybe<Scalars['Boolean']>;
  slug_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  slug_not?: InputMaybe<Scalars['String']>;
  slug_not_contains?: InputMaybe<Scalars['String']>;
  slug_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  sys?: InputMaybe<SysFilter>;
  title?: InputMaybe<Scalars['String']>;
  title_contains?: InputMaybe<Scalars['String']>;
  title_exists?: InputMaybe<Scalars['Boolean']>;
  title_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  title_not?: InputMaybe<Scalars['String']>;
  title_not_contains?: InputMaybe<Scalars['String']>;
  title_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

export type CouponEntryLinkingCollections = {
  __typename?: 'CouponEntryLinkingCollections';
  entryCollection?: Maybe<EntryCollection>;
};


export type CouponEntryLinkingCollectionsEntryCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  locale?: InputMaybe<Scalars['String']>;
  preview?: InputMaybe<Scalars['Boolean']>;
  skip?: InputMaybe<Scalars['Int']>;
};

export enum CouponEntryOrder {
  ActiveAsc = 'active_ASC',
  ActiveDesc = 'active_DESC',
  ExpiresAtAsc = 'expiresAt_ASC',
  ExpiresAtDesc = 'expiresAt_DESC',
  ReferringUrlAsc = 'referringUrl_ASC',
  ReferringUrlDesc = 'referringUrl_DESC',
  SlugAsc = 'slug_ASC',
  SlugDesc = 'slug_DESC',
  SysFirstPublishedAtAsc = 'sys_firstPublishedAt_ASC',
  SysFirstPublishedAtDesc = 'sys_firstPublishedAt_DESC',
  SysIdAsc = 'sys_id_ASC',
  SysIdDesc = 'sys_id_DESC',
  SysPublishedAtAsc = 'sys_publishedAt_ASC',
  SysPublishedAtDesc = 'sys_publishedAt_DESC',
  SysPublishedVersionAsc = 'sys_publishedVersion_ASC',
  SysPublishedVersionDesc = 'sys_publishedVersion_DESC',
  TitleAsc = 'title_ASC',
  TitleDesc = 'title_DESC'
}

/** Coupon website hero headline entity [See type definition](https://app.contentful.com/spaces/8vnddh4olhe6/content_types/couponHeadline) */
export type CouponHeadline = Entry & {
  __typename?: 'CouponHeadline';
  contentfulMetadata: ContentfulMetadata;
  description?: Maybe<Scalars['String']>;
  image?: Maybe<Asset>;
  linkedFrom?: Maybe<CouponHeadlineLinkingCollections>;
  sys: Sys;
  title?: Maybe<Scalars['String']>;
  url?: Maybe<Scalars['String']>;
};


/** Coupon website hero headline entity [See type definition](https://app.contentful.com/spaces/8vnddh4olhe6/content_types/couponHeadline) */
export type CouponHeadlineDescriptionArgs = {
  locale?: InputMaybe<Scalars['String']>;
};


/** Coupon website hero headline entity [See type definition](https://app.contentful.com/spaces/8vnddh4olhe6/content_types/couponHeadline) */
export type CouponHeadlineImageArgs = {
  locale?: InputMaybe<Scalars['String']>;
  preview?: InputMaybe<Scalars['Boolean']>;
};


/** Coupon website hero headline entity [See type definition](https://app.contentful.com/spaces/8vnddh4olhe6/content_types/couponHeadline) */
export type CouponHeadlineLinkedFromArgs = {
  allowedLocales?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


/** Coupon website hero headline entity [See type definition](https://app.contentful.com/spaces/8vnddh4olhe6/content_types/couponHeadline) */
export type CouponHeadlineTitleArgs = {
  locale?: InputMaybe<Scalars['String']>;
};


/** Coupon website hero headline entity [See type definition](https://app.contentful.com/spaces/8vnddh4olhe6/content_types/couponHeadline) */
export type CouponHeadlineUrlArgs = {
  locale?: InputMaybe<Scalars['String']>;
};

export type CouponHeadlineCollection = {
  __typename?: 'CouponHeadlineCollection';
  items: Array<Maybe<CouponHeadline>>;
  limit: Scalars['Int'];
  skip: Scalars['Int'];
  total: Scalars['Int'];
};

export type CouponHeadlineFilter = {
  AND?: InputMaybe<Array<InputMaybe<CouponHeadlineFilter>>>;
  OR?: InputMaybe<Array<InputMaybe<CouponHeadlineFilter>>>;
  contentfulMetadata?: InputMaybe<ContentfulMetadataFilter>;
  description?: InputMaybe<Scalars['String']>;
  description_contains?: InputMaybe<Scalars['String']>;
  description_exists?: InputMaybe<Scalars['Boolean']>;
  description_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  description_not?: InputMaybe<Scalars['String']>;
  description_not_contains?: InputMaybe<Scalars['String']>;
  description_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  image_exists?: InputMaybe<Scalars['Boolean']>;
  sys?: InputMaybe<SysFilter>;
  title?: InputMaybe<Scalars['String']>;
  title_contains?: InputMaybe<Scalars['String']>;
  title_exists?: InputMaybe<Scalars['Boolean']>;
  title_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  title_not?: InputMaybe<Scalars['String']>;
  title_not_contains?: InputMaybe<Scalars['String']>;
  title_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  url?: InputMaybe<Scalars['String']>;
  url_contains?: InputMaybe<Scalars['String']>;
  url_exists?: InputMaybe<Scalars['Boolean']>;
  url_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  url_not?: InputMaybe<Scalars['String']>;
  url_not_contains?: InputMaybe<Scalars['String']>;
  url_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

export type CouponHeadlineLinkingCollections = {
  __typename?: 'CouponHeadlineLinkingCollections';
  entryCollection?: Maybe<EntryCollection>;
};


export type CouponHeadlineLinkingCollectionsEntryCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  locale?: InputMaybe<Scalars['String']>;
  preview?: InputMaybe<Scalars['Boolean']>;
  skip?: InputMaybe<Scalars['Int']>;
};

export enum CouponHeadlineOrder {
  SysFirstPublishedAtAsc = 'sys_firstPublishedAt_ASC',
  SysFirstPublishedAtDesc = 'sys_firstPublishedAt_DESC',
  SysIdAsc = 'sys_id_ASC',
  SysIdDesc = 'sys_id_DESC',
  SysPublishedAtAsc = 'sys_publishedAt_ASC',
  SysPublishedAtDesc = 'sys_publishedAt_DESC',
  SysPublishedVersionAsc = 'sys_publishedVersion_ASC',
  SysPublishedVersionDesc = 'sys_publishedVersion_DESC',
  TitleAsc = 'title_ASC',
  TitleDesc = 'title_DESC',
  UrlAsc = 'url_ASC',
  UrlDesc = 'url_DESC'
}

export type Entry = {
  contentfulMetadata: ContentfulMetadata;
  sys: Sys;
};

export type EntryCollection = {
  __typename?: 'EntryCollection';
  items: Array<Maybe<Entry>>;
  limit: Scalars['Int'];
  skip: Scalars['Int'];
  total: Scalars['Int'];
};

export type EntryFilter = {
  AND?: InputMaybe<Array<InputMaybe<EntryFilter>>>;
  OR?: InputMaybe<Array<InputMaybe<EntryFilter>>>;
  contentfulMetadata?: InputMaybe<ContentfulMetadataFilter>;
  sys?: InputMaybe<SysFilter>;
};

export enum EntryOrder {
  SysFirstPublishedAtAsc = 'sys_firstPublishedAt_ASC',
  SysFirstPublishedAtDesc = 'sys_firstPublishedAt_DESC',
  SysIdAsc = 'sys_id_ASC',
  SysIdDesc = 'sys_id_DESC',
  SysPublishedAtAsc = 'sys_publishedAt_ASC',
  SysPublishedAtDesc = 'sys_publishedAt_DESC',
  SysPublishedVersionAsc = 'sys_publishedVersion_ASC',
  SysPublishedVersionDesc = 'sys_publishedVersion_DESC'
}

export enum ImageFormat {
  Avif = 'AVIF',
  /** JPG image format. */
  Jpg = 'JPG',
  /**
   * Progressive JPG format stores multiple passes of an image in progressively higher detail.
   *         When a progressive image is loading, the viewer will first see a lower quality pixelated version which
   *         will gradually improve in detail, until the image is fully downloaded. This is to display an image as
   *         early as possible to make the layout look as designed.
   */
  JpgProgressive = 'JPG_PROGRESSIVE',
  /** PNG image format */
  Png = 'PNG',
  /**
   * 8-bit PNG images support up to 256 colors and weigh less than the standard 24-bit PNG equivalent.
   *         The 8-bit PNG format is mostly used for simple images, such as icons or logos.
   */
  Png8 = 'PNG8',
  /** WebP image format. */
  Webp = 'WEBP'
}

export enum ImageResizeFocus {
  /** Focus the resizing on the bottom. */
  Bottom = 'BOTTOM',
  /** Focus the resizing on the bottom left. */
  BottomLeft = 'BOTTOM_LEFT',
  /** Focus the resizing on the bottom right. */
  BottomRight = 'BOTTOM_RIGHT',
  /** Focus the resizing on the center. */
  Center = 'CENTER',
  /** Focus the resizing on the largest face. */
  Face = 'FACE',
  /** Focus the resizing on the area containing all the faces. */
  Faces = 'FACES',
  /** Focus the resizing on the left. */
  Left = 'LEFT',
  /** Focus the resizing on the right. */
  Right = 'RIGHT',
  /** Focus the resizing on the top. */
  Top = 'TOP',
  /** Focus the resizing on the top left. */
  TopLeft = 'TOP_LEFT',
  /** Focus the resizing on the top right. */
  TopRight = 'TOP_RIGHT'
}

export enum ImageResizeStrategy {
  /** Crops a part of the original image to fit into the specified dimensions. */
  Crop = 'CROP',
  /** Resizes the image to the specified dimensions, cropping the image if needed. */
  Fill = 'FILL',
  /** Resizes the image to fit into the specified dimensions. */
  Fit = 'FIT',
  /**
   * Resizes the image to the specified dimensions, padding the image if needed.
   *         Uses desired background color as padding color.
   */
  Pad = 'PAD',
  /** Resizes the image to the specified dimensions, changing the original aspect ratio if needed. */
  Scale = 'SCALE',
  /** Creates a thumbnail from the image. */
  Thumb = 'THUMB'
}

export type ImageTransformOptions = {
  /**
   * Desired background color, used with corner radius or `PAD` resize strategy.
   *         Defaults to transparent (for `PNG`, `PNG8` and `WEBP`) or white (for `JPG` and `JPG_PROGRESSIVE`).
   */
  backgroundColor?: InputMaybe<Scalars['HexColor']>;
  /**
   * Desired corner radius in pixels.
   *         Results in an image with rounded corners (pass `-1` for a full circle/ellipse).
   *         Defaults to `0`. Uses desired background color as padding color,
   *         unless the format is `JPG` or `JPG_PROGRESSIVE` and resize strategy is `PAD`, then defaults to white.
   */
  cornerRadius?: InputMaybe<Scalars['Int']>;
  /** Desired image format. Defaults to the original image format. */
  format?: InputMaybe<ImageFormat>;
  /** Desired height in pixels. Defaults to the original image height. */
  height?: InputMaybe<Scalars['Dimension']>;
  /**
   * Desired quality of the image in percents.
   *         Used for `PNG8`, `JPG`, `JPG_PROGRESSIVE` and `WEBP` formats.
   */
  quality?: InputMaybe<Scalars['Quality']>;
  /** Desired resize focus area. Defaults to `CENTER`. */
  resizeFocus?: InputMaybe<ImageResizeFocus>;
  /** Desired resize strategy. Defaults to `FIT`. */
  resizeStrategy?: InputMaybe<ImageResizeStrategy>;
  /** Desired width in pixels. Defaults to the original image width. */
  width?: InputMaybe<Scalars['Dimension']>;
};

/** [See type definition](https://app.contentful.com/spaces/8vnddh4olhe6/content_types/person) */
export type Person = Entry & {
  __typename?: 'Person';
  company?: Maybe<Scalars['String']>;
  contentfulMetadata: ContentfulMetadata;
  email?: Maybe<Scalars['String']>;
  facebook?: Maybe<Scalars['String']>;
  github?: Maybe<Scalars['String']>;
  image?: Maybe<Asset>;
  linkedFrom?: Maybe<PersonLinkingCollections>;
  name?: Maybe<Scalars['String']>;
  phone?: Maybe<Scalars['String']>;
  shortBio?: Maybe<Scalars['String']>;
  sys: Sys;
  title?: Maybe<Scalars['String']>;
  twitter?: Maybe<Scalars['String']>;
};


/** [See type definition](https://app.contentful.com/spaces/8vnddh4olhe6/content_types/person) */
export type PersonCompanyArgs = {
  locale?: InputMaybe<Scalars['String']>;
};


/** [See type definition](https://app.contentful.com/spaces/8vnddh4olhe6/content_types/person) */
export type PersonEmailArgs = {
  locale?: InputMaybe<Scalars['String']>;
};


/** [See type definition](https://app.contentful.com/spaces/8vnddh4olhe6/content_types/person) */
export type PersonFacebookArgs = {
  locale?: InputMaybe<Scalars['String']>;
};


/** [See type definition](https://app.contentful.com/spaces/8vnddh4olhe6/content_types/person) */
export type PersonGithubArgs = {
  locale?: InputMaybe<Scalars['String']>;
};


/** [See type definition](https://app.contentful.com/spaces/8vnddh4olhe6/content_types/person) */
export type PersonImageArgs = {
  locale?: InputMaybe<Scalars['String']>;
  preview?: InputMaybe<Scalars['Boolean']>;
};


/** [See type definition](https://app.contentful.com/spaces/8vnddh4olhe6/content_types/person) */
export type PersonLinkedFromArgs = {
  allowedLocales?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


/** [See type definition](https://app.contentful.com/spaces/8vnddh4olhe6/content_types/person) */
export type PersonNameArgs = {
  locale?: InputMaybe<Scalars['String']>;
};


/** [See type definition](https://app.contentful.com/spaces/8vnddh4olhe6/content_types/person) */
export type PersonPhoneArgs = {
  locale?: InputMaybe<Scalars['String']>;
};


/** [See type definition](https://app.contentful.com/spaces/8vnddh4olhe6/content_types/person) */
export type PersonShortBioArgs = {
  locale?: InputMaybe<Scalars['String']>;
};


/** [See type definition](https://app.contentful.com/spaces/8vnddh4olhe6/content_types/person) */
export type PersonTitleArgs = {
  locale?: InputMaybe<Scalars['String']>;
};


/** [See type definition](https://app.contentful.com/spaces/8vnddh4olhe6/content_types/person) */
export type PersonTwitterArgs = {
  locale?: InputMaybe<Scalars['String']>;
};

export type PersonCollection = {
  __typename?: 'PersonCollection';
  items: Array<Maybe<Person>>;
  limit: Scalars['Int'];
  skip: Scalars['Int'];
  total: Scalars['Int'];
};

export type PersonFilter = {
  AND?: InputMaybe<Array<InputMaybe<PersonFilter>>>;
  OR?: InputMaybe<Array<InputMaybe<PersonFilter>>>;
  company?: InputMaybe<Scalars['String']>;
  company_contains?: InputMaybe<Scalars['String']>;
  company_exists?: InputMaybe<Scalars['Boolean']>;
  company_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  company_not?: InputMaybe<Scalars['String']>;
  company_not_contains?: InputMaybe<Scalars['String']>;
  company_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  contentfulMetadata?: InputMaybe<ContentfulMetadataFilter>;
  email?: InputMaybe<Scalars['String']>;
  email_contains?: InputMaybe<Scalars['String']>;
  email_exists?: InputMaybe<Scalars['Boolean']>;
  email_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  email_not?: InputMaybe<Scalars['String']>;
  email_not_contains?: InputMaybe<Scalars['String']>;
  email_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  facebook?: InputMaybe<Scalars['String']>;
  facebook_contains?: InputMaybe<Scalars['String']>;
  facebook_exists?: InputMaybe<Scalars['Boolean']>;
  facebook_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  facebook_not?: InputMaybe<Scalars['String']>;
  facebook_not_contains?: InputMaybe<Scalars['String']>;
  facebook_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  github?: InputMaybe<Scalars['String']>;
  github_contains?: InputMaybe<Scalars['String']>;
  github_exists?: InputMaybe<Scalars['Boolean']>;
  github_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  github_not?: InputMaybe<Scalars['String']>;
  github_not_contains?: InputMaybe<Scalars['String']>;
  github_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  image_exists?: InputMaybe<Scalars['Boolean']>;
  name?: InputMaybe<Scalars['String']>;
  name_contains?: InputMaybe<Scalars['String']>;
  name_exists?: InputMaybe<Scalars['Boolean']>;
  name_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  name_not?: InputMaybe<Scalars['String']>;
  name_not_contains?: InputMaybe<Scalars['String']>;
  name_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  phone?: InputMaybe<Scalars['String']>;
  phone_contains?: InputMaybe<Scalars['String']>;
  phone_exists?: InputMaybe<Scalars['Boolean']>;
  phone_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  phone_not?: InputMaybe<Scalars['String']>;
  phone_not_contains?: InputMaybe<Scalars['String']>;
  phone_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  shortBio?: InputMaybe<Scalars['String']>;
  shortBio_contains?: InputMaybe<Scalars['String']>;
  shortBio_exists?: InputMaybe<Scalars['Boolean']>;
  shortBio_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  shortBio_not?: InputMaybe<Scalars['String']>;
  shortBio_not_contains?: InputMaybe<Scalars['String']>;
  shortBio_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  sys?: InputMaybe<SysFilter>;
  title?: InputMaybe<Scalars['String']>;
  title_contains?: InputMaybe<Scalars['String']>;
  title_exists?: InputMaybe<Scalars['Boolean']>;
  title_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  title_not?: InputMaybe<Scalars['String']>;
  title_not_contains?: InputMaybe<Scalars['String']>;
  title_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  twitter?: InputMaybe<Scalars['String']>;
  twitter_contains?: InputMaybe<Scalars['String']>;
  twitter_exists?: InputMaybe<Scalars['Boolean']>;
  twitter_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  twitter_not?: InputMaybe<Scalars['String']>;
  twitter_not_contains?: InputMaybe<Scalars['String']>;
  twitter_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

export type PersonLinkingCollections = {
  __typename?: 'PersonLinkingCollections';
  entryCollection?: Maybe<EntryCollection>;
};


export type PersonLinkingCollectionsEntryCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  locale?: InputMaybe<Scalars['String']>;
  preview?: InputMaybe<Scalars['Boolean']>;
  skip?: InputMaybe<Scalars['Int']>;
};

export enum PersonOrder {
  CompanyAsc = 'company_ASC',
  CompanyDesc = 'company_DESC',
  EmailAsc = 'email_ASC',
  EmailDesc = 'email_DESC',
  FacebookAsc = 'facebook_ASC',
  FacebookDesc = 'facebook_DESC',
  GithubAsc = 'github_ASC',
  GithubDesc = 'github_DESC',
  NameAsc = 'name_ASC',
  NameDesc = 'name_DESC',
  PhoneAsc = 'phone_ASC',
  PhoneDesc = 'phone_DESC',
  SysFirstPublishedAtAsc = 'sys_firstPublishedAt_ASC',
  SysFirstPublishedAtDesc = 'sys_firstPublishedAt_DESC',
  SysIdAsc = 'sys_id_ASC',
  SysIdDesc = 'sys_id_DESC',
  SysPublishedAtAsc = 'sys_publishedAt_ASC',
  SysPublishedAtDesc = 'sys_publishedAt_DESC',
  SysPublishedVersionAsc = 'sys_publishedVersion_ASC',
  SysPublishedVersionDesc = 'sys_publishedVersion_DESC',
  TitleAsc = 'title_ASC',
  TitleDesc = 'title_DESC',
  TwitterAsc = 'twitter_ASC',
  TwitterDesc = 'twitter_DESC'
}

/** Product item [See type definition](https://app.contentful.com/spaces/8vnddh4olhe6/content_types/product) */
export type Product = Entry & {
  __typename?: 'Product';
  available?: Maybe<Scalars['Boolean']>;
  categories?: Maybe<Array<Maybe<Scalars['String']>>>;
  colors?: Maybe<Array<Maybe<Scalars['String']>>>;
  contentfulMetadata: ContentfulMetadata;
  description?: Maybe<Scalars['String']>;
  imagesCollection?: Maybe<AssetCollection>;
  linkedFrom?: Maybe<ProductLinkingCollections>;
  name?: Maybe<Scalars['String']>;
  price?: Maybe<Scalars['Float']>;
  releaseDate?: Maybe<Scalars['DateTime']>;
  sys: Sys;
};


/** Product item [See type definition](https://app.contentful.com/spaces/8vnddh4olhe6/content_types/product) */
export type ProductAvailableArgs = {
  locale?: InputMaybe<Scalars['String']>;
};


/** Product item [See type definition](https://app.contentful.com/spaces/8vnddh4olhe6/content_types/product) */
export type ProductCategoriesArgs = {
  locale?: InputMaybe<Scalars['String']>;
};


/** Product item [See type definition](https://app.contentful.com/spaces/8vnddh4olhe6/content_types/product) */
export type ProductColorsArgs = {
  locale?: InputMaybe<Scalars['String']>;
};


/** Product item [See type definition](https://app.contentful.com/spaces/8vnddh4olhe6/content_types/product) */
export type ProductDescriptionArgs = {
  locale?: InputMaybe<Scalars['String']>;
};


/** Product item [See type definition](https://app.contentful.com/spaces/8vnddh4olhe6/content_types/product) */
export type ProductImagesCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  locale?: InputMaybe<Scalars['String']>;
  preview?: InputMaybe<Scalars['Boolean']>;
  skip?: InputMaybe<Scalars['Int']>;
};


/** Product item [See type definition](https://app.contentful.com/spaces/8vnddh4olhe6/content_types/product) */
export type ProductLinkedFromArgs = {
  allowedLocales?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


/** Product item [See type definition](https://app.contentful.com/spaces/8vnddh4olhe6/content_types/product) */
export type ProductNameArgs = {
  locale?: InputMaybe<Scalars['String']>;
};


/** Product item [See type definition](https://app.contentful.com/spaces/8vnddh4olhe6/content_types/product) */
export type ProductPriceArgs = {
  locale?: InputMaybe<Scalars['String']>;
};


/** Product item [See type definition](https://app.contentful.com/spaces/8vnddh4olhe6/content_types/product) */
export type ProductReleaseDateArgs = {
  locale?: InputMaybe<Scalars['String']>;
};

export type ProductCollection = {
  __typename?: 'ProductCollection';
  items: Array<Maybe<Product>>;
  limit: Scalars['Int'];
  skip: Scalars['Int'];
  total: Scalars['Int'];
};

export type ProductFilter = {
  AND?: InputMaybe<Array<InputMaybe<ProductFilter>>>;
  OR?: InputMaybe<Array<InputMaybe<ProductFilter>>>;
  available?: InputMaybe<Scalars['Boolean']>;
  available_exists?: InputMaybe<Scalars['Boolean']>;
  available_not?: InputMaybe<Scalars['Boolean']>;
  categories_contains_all?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  categories_contains_none?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  categories_contains_some?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  categories_exists?: InputMaybe<Scalars['Boolean']>;
  colors_contains_all?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  colors_contains_none?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  colors_contains_some?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  colors_exists?: InputMaybe<Scalars['Boolean']>;
  contentfulMetadata?: InputMaybe<ContentfulMetadataFilter>;
  description?: InputMaybe<Scalars['String']>;
  description_contains?: InputMaybe<Scalars['String']>;
  description_exists?: InputMaybe<Scalars['Boolean']>;
  description_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  description_not?: InputMaybe<Scalars['String']>;
  description_not_contains?: InputMaybe<Scalars['String']>;
  description_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  imagesCollection_exists?: InputMaybe<Scalars['Boolean']>;
  name?: InputMaybe<Scalars['String']>;
  name_contains?: InputMaybe<Scalars['String']>;
  name_exists?: InputMaybe<Scalars['Boolean']>;
  name_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  name_not?: InputMaybe<Scalars['String']>;
  name_not_contains?: InputMaybe<Scalars['String']>;
  name_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  price?: InputMaybe<Scalars['Float']>;
  price_exists?: InputMaybe<Scalars['Boolean']>;
  price_gt?: InputMaybe<Scalars['Float']>;
  price_gte?: InputMaybe<Scalars['Float']>;
  price_in?: InputMaybe<Array<InputMaybe<Scalars['Float']>>>;
  price_lt?: InputMaybe<Scalars['Float']>;
  price_lte?: InputMaybe<Scalars['Float']>;
  price_not?: InputMaybe<Scalars['Float']>;
  price_not_in?: InputMaybe<Array<InputMaybe<Scalars['Float']>>>;
  releaseDate?: InputMaybe<Scalars['DateTime']>;
  releaseDate_exists?: InputMaybe<Scalars['Boolean']>;
  releaseDate_gt?: InputMaybe<Scalars['DateTime']>;
  releaseDate_gte?: InputMaybe<Scalars['DateTime']>;
  releaseDate_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  releaseDate_lt?: InputMaybe<Scalars['DateTime']>;
  releaseDate_lte?: InputMaybe<Scalars['DateTime']>;
  releaseDate_not?: InputMaybe<Scalars['DateTime']>;
  releaseDate_not_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  sys?: InputMaybe<SysFilter>;
};

export type ProductLinkingCollections = {
  __typename?: 'ProductLinkingCollections';
  entryCollection?: Maybe<EntryCollection>;
};


export type ProductLinkingCollectionsEntryCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  locale?: InputMaybe<Scalars['String']>;
  preview?: InputMaybe<Scalars['Boolean']>;
  skip?: InputMaybe<Scalars['Int']>;
};

export enum ProductOrder {
  AvailableAsc = 'available_ASC',
  AvailableDesc = 'available_DESC',
  NameAsc = 'name_ASC',
  NameDesc = 'name_DESC',
  PriceAsc = 'price_ASC',
  PriceDesc = 'price_DESC',
  ReleaseDateAsc = 'releaseDate_ASC',
  ReleaseDateDesc = 'releaseDate_DESC',
  SysFirstPublishedAtAsc = 'sys_firstPublishedAt_ASC',
  SysFirstPublishedAtDesc = 'sys_firstPublishedAt_DESC',
  SysIdAsc = 'sys_id_ASC',
  SysIdDesc = 'sys_id_DESC',
  SysPublishedAtAsc = 'sys_publishedAt_ASC',
  SysPublishedAtDesc = 'sys_publishedAt_DESC',
  SysPublishedVersionAsc = 'sys_publishedVersion_ASC',
  SysPublishedVersionDesc = 'sys_publishedVersion_DESC'
}

export type Query = {
  __typename?: 'Query';
  asset?: Maybe<Asset>;
  assetCollection?: Maybe<AssetCollection>;
  blogPost?: Maybe<BlogPost>;
  blogPostCollection?: Maybe<BlogPostCollection>;
  couponCategory?: Maybe<CouponCategory>;
  couponCategoryCollection?: Maybe<CouponCategoryCollection>;
  couponEntity?: Maybe<CouponEntity>;
  couponEntityCollection?: Maybe<CouponEntityCollection>;
  couponEntry?: Maybe<CouponEntry>;
  couponEntryCollection?: Maybe<CouponEntryCollection>;
  couponHeadline?: Maybe<CouponHeadline>;
  couponHeadlineCollection?: Maybe<CouponHeadlineCollection>;
  entryCollection?: Maybe<EntryCollection>;
  person?: Maybe<Person>;
  personCollection?: Maybe<PersonCollection>;
  product?: Maybe<Product>;
  productCollection?: Maybe<ProductCollection>;
};


export type QueryAssetArgs = {
  id: Scalars['String'];
  locale?: InputMaybe<Scalars['String']>;
  preview?: InputMaybe<Scalars['Boolean']>;
};


export type QueryAssetCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  locale?: InputMaybe<Scalars['String']>;
  order?: InputMaybe<Array<InputMaybe<AssetOrder>>>;
  preview?: InputMaybe<Scalars['Boolean']>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<AssetFilter>;
};


export type QueryBlogPostArgs = {
  id: Scalars['String'];
  locale?: InputMaybe<Scalars['String']>;
  preview?: InputMaybe<Scalars['Boolean']>;
};


export type QueryBlogPostCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  locale?: InputMaybe<Scalars['String']>;
  order?: InputMaybe<Array<InputMaybe<BlogPostOrder>>>;
  preview?: InputMaybe<Scalars['Boolean']>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<BlogPostFilter>;
};


export type QueryCouponCategoryArgs = {
  id: Scalars['String'];
  locale?: InputMaybe<Scalars['String']>;
  preview?: InputMaybe<Scalars['Boolean']>;
};


export type QueryCouponCategoryCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  locale?: InputMaybe<Scalars['String']>;
  order?: InputMaybe<Array<InputMaybe<CouponCategoryOrder>>>;
  preview?: InputMaybe<Scalars['Boolean']>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<CouponCategoryFilter>;
};


export type QueryCouponEntityArgs = {
  id: Scalars['String'];
  locale?: InputMaybe<Scalars['String']>;
  preview?: InputMaybe<Scalars['Boolean']>;
};


export type QueryCouponEntityCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  locale?: InputMaybe<Scalars['String']>;
  order?: InputMaybe<Array<InputMaybe<CouponEntityOrder>>>;
  preview?: InputMaybe<Scalars['Boolean']>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<CouponEntityFilter>;
};


export type QueryCouponEntryArgs = {
  id: Scalars['String'];
  locale?: InputMaybe<Scalars['String']>;
  preview?: InputMaybe<Scalars['Boolean']>;
};


export type QueryCouponEntryCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  locale?: InputMaybe<Scalars['String']>;
  order?: InputMaybe<Array<InputMaybe<CouponEntryOrder>>>;
  preview?: InputMaybe<Scalars['Boolean']>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<CouponEntryFilter>;
};


export type QueryCouponHeadlineArgs = {
  id: Scalars['String'];
  locale?: InputMaybe<Scalars['String']>;
  preview?: InputMaybe<Scalars['Boolean']>;
};


export type QueryCouponHeadlineCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  locale?: InputMaybe<Scalars['String']>;
  order?: InputMaybe<Array<InputMaybe<CouponHeadlineOrder>>>;
  preview?: InputMaybe<Scalars['Boolean']>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<CouponHeadlineFilter>;
};


export type QueryEntryCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  locale?: InputMaybe<Scalars['String']>;
  order?: InputMaybe<Array<InputMaybe<EntryOrder>>>;
  preview?: InputMaybe<Scalars['Boolean']>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<EntryFilter>;
};


export type QueryPersonArgs = {
  id: Scalars['String'];
  locale?: InputMaybe<Scalars['String']>;
  preview?: InputMaybe<Scalars['Boolean']>;
};


export type QueryPersonCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  locale?: InputMaybe<Scalars['String']>;
  order?: InputMaybe<Array<InputMaybe<PersonOrder>>>;
  preview?: InputMaybe<Scalars['Boolean']>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<PersonFilter>;
};


export type QueryProductArgs = {
  id: Scalars['String'];
  locale?: InputMaybe<Scalars['String']>;
  preview?: InputMaybe<Scalars['Boolean']>;
};


export type QueryProductCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  locale?: InputMaybe<Scalars['String']>;
  order?: InputMaybe<Array<InputMaybe<ProductOrder>>>;
  preview?: InputMaybe<Scalars['Boolean']>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<ProductFilter>;
};

export type Sys = {
  __typename?: 'Sys';
  environmentId: Scalars['String'];
  firstPublishedAt?: Maybe<Scalars['DateTime']>;
  id: Scalars['String'];
  publishedAt?: Maybe<Scalars['DateTime']>;
  publishedVersion?: Maybe<Scalars['Int']>;
  spaceId: Scalars['String'];
};

export type SysFilter = {
  firstPublishedAt?: InputMaybe<Scalars['DateTime']>;
  firstPublishedAt_exists?: InputMaybe<Scalars['Boolean']>;
  firstPublishedAt_gt?: InputMaybe<Scalars['DateTime']>;
  firstPublishedAt_gte?: InputMaybe<Scalars['DateTime']>;
  firstPublishedAt_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  firstPublishedAt_lt?: InputMaybe<Scalars['DateTime']>;
  firstPublishedAt_lte?: InputMaybe<Scalars['DateTime']>;
  firstPublishedAt_not?: InputMaybe<Scalars['DateTime']>;
  firstPublishedAt_not_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  id?: InputMaybe<Scalars['String']>;
  id_contains?: InputMaybe<Scalars['String']>;
  id_exists?: InputMaybe<Scalars['Boolean']>;
  id_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  id_not?: InputMaybe<Scalars['String']>;
  id_not_contains?: InputMaybe<Scalars['String']>;
  id_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  publishedAt?: InputMaybe<Scalars['DateTime']>;
  publishedAt_exists?: InputMaybe<Scalars['Boolean']>;
  publishedAt_gt?: InputMaybe<Scalars['DateTime']>;
  publishedAt_gte?: InputMaybe<Scalars['DateTime']>;
  publishedAt_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  publishedAt_lt?: InputMaybe<Scalars['DateTime']>;
  publishedAt_lte?: InputMaybe<Scalars['DateTime']>;
  publishedAt_not?: InputMaybe<Scalars['DateTime']>;
  publishedAt_not_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  publishedVersion?: InputMaybe<Scalars['Float']>;
  publishedVersion_exists?: InputMaybe<Scalars['Boolean']>;
  publishedVersion_gt?: InputMaybe<Scalars['Float']>;
  publishedVersion_gte?: InputMaybe<Scalars['Float']>;
  publishedVersion_in?: InputMaybe<Array<InputMaybe<Scalars['Float']>>>;
  publishedVersion_lt?: InputMaybe<Scalars['Float']>;
  publishedVersion_lte?: InputMaybe<Scalars['Float']>;
  publishedVersion_not?: InputMaybe<Scalars['Float']>;
  publishedVersion_not_in?: InputMaybe<Array<InputMaybe<Scalars['Float']>>>;
};

export type CfCouponCategoryNestedFilter = {
  AND?: InputMaybe<Array<InputMaybe<CfCouponCategoryNestedFilter>>>;
  OR?: InputMaybe<Array<InputMaybe<CfCouponCategoryNestedFilter>>>;
  contentfulMetadata?: InputMaybe<ContentfulMetadataFilter>;
  description?: InputMaybe<Scalars['String']>;
  description_contains?: InputMaybe<Scalars['String']>;
  description_exists?: InputMaybe<Scalars['Boolean']>;
  description_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  description_not?: InputMaybe<Scalars['String']>;
  description_not_contains?: InputMaybe<Scalars['String']>;
  description_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  image_exists?: InputMaybe<Scalars['Boolean']>;
  name?: InputMaybe<Scalars['String']>;
  name_contains?: InputMaybe<Scalars['String']>;
  name_exists?: InputMaybe<Scalars['Boolean']>;
  name_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  name_not?: InputMaybe<Scalars['String']>;
  name_not_contains?: InputMaybe<Scalars['String']>;
  name_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  sys?: InputMaybe<SysFilter>;
};

export type CfCouponEntityNestedFilter = {
  AND?: InputMaybe<Array<InputMaybe<CfCouponEntityNestedFilter>>>;
  OR?: InputMaybe<Array<InputMaybe<CfCouponEntityNestedFilter>>>;
  brandUrl?: InputMaybe<Scalars['String']>;
  brandUrl_contains?: InputMaybe<Scalars['String']>;
  brandUrl_exists?: InputMaybe<Scalars['Boolean']>;
  brandUrl_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  brandUrl_not?: InputMaybe<Scalars['String']>;
  brandUrl_not_contains?: InputMaybe<Scalars['String']>;
  brandUrl_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  category_exists?: InputMaybe<Scalars['Boolean']>;
  contentfulMetadata?: InputMaybe<ContentfulMetadataFilter>;
  description?: InputMaybe<Scalars['String']>;
  description_contains?: InputMaybe<Scalars['String']>;
  description_exists?: InputMaybe<Scalars['Boolean']>;
  description_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  description_not?: InputMaybe<Scalars['String']>;
  description_not_contains?: InputMaybe<Scalars['String']>;
  description_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  headline?: InputMaybe<Scalars['String']>;
  headline_contains?: InputMaybe<Scalars['String']>;
  headline_exists?: InputMaybe<Scalars['Boolean']>;
  headline_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  headline_not?: InputMaybe<Scalars['String']>;
  headline_not_contains?: InputMaybe<Scalars['String']>;
  headline_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  logoImage_exists?: InputMaybe<Scalars['Boolean']>;
  name?: InputMaybe<Scalars['String']>;
  name_contains?: InputMaybe<Scalars['String']>;
  name_exists?: InputMaybe<Scalars['Boolean']>;
  name_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  name_not?: InputMaybe<Scalars['String']>;
  name_not_contains?: InputMaybe<Scalars['String']>;
  name_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  slug?: InputMaybe<Scalars['String']>;
  slug_contains?: InputMaybe<Scalars['String']>;
  slug_exists?: InputMaybe<Scalars['Boolean']>;
  slug_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  slug_not?: InputMaybe<Scalars['String']>;
  slug_not_contains?: InputMaybe<Scalars['String']>;
  slug_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  sys?: InputMaybe<SysFilter>;
};

export type AssetFragment = { __typename?: 'Asset', title?: string | null | undefined, description?: string | null | undefined, contentType?: string | null | undefined, fileName?: string | null | undefined, url?: string | null | undefined, size?: number | null | undefined, width?: number | null | undefined, height?: number | null | undefined, sys: { __typename?: 'Sys', id: string, spaceId: string, environmentId: string, publishedAt?: any | null | undefined, firstPublishedAt?: any | null | undefined, publishedVersion?: number | null | undefined } };

export type SysFragment = { __typename?: 'Sys', id: string, spaceId: string, environmentId: string, publishedAt?: any | null | undefined, firstPublishedAt?: any | null | undefined, publishedVersion?: number | null | undefined };

export type BrandQueryVariables = Exact<{
  id: Scalars['String'];
}>;


export type BrandQuery = { __typename?: 'Query', couponEntity?: { __typename?: 'CouponEntity', name?: string | null | undefined, headline?: string | null | undefined, slug?: string | null | undefined, description?: string | null | undefined, brandUrl?: string | null | undefined, sys: { __typename?: 'Sys', id: string }, logoImage?: { __typename?: 'Asset', url?: string | null | undefined } | null | undefined, category?: { __typename?: 'CouponCategory', description?: string | null | undefined, name?: string | null | undefined, image?: { __typename?: 'Asset', url?: string | null | undefined } | null | undefined } | null | undefined, linkedFrom?: { __typename?: 'CouponEntityLinkingCollections', couponEntryCollection?: { __typename?: 'CouponEntryCollection', total: number } | null | undefined } | null | undefined } | null | undefined };

export type BrandSearchQueryVariables = Exact<{
  name_contains: Scalars['String'];
}>;


export type BrandSearchQuery = { __typename?: 'Query', couponEntityCollection?: { __typename?: 'CouponEntityCollection', items: Array<{ __typename?: 'CouponEntity', description?: string | null | undefined, name?: string | null | undefined, slug?: string | null | undefined, sys: { __typename?: 'Sys', id: string }, logoImage?: { __typename?: 'Asset', url?: string | null | undefined } | null | undefined } | null | undefined> } | null | undefined };

export type BrandsQueryVariables = Exact<{
  slug?: InputMaybe<Scalars['String']>;
}>;


export type BrandsQuery = { __typename?: 'Query', couponEntityCollection?: { __typename?: 'CouponEntityCollection', items: Array<{ __typename?: 'CouponEntity', name?: string | null | undefined, headline?: string | null | undefined, slug?: string | null | undefined, description?: string | null | undefined, brandUrl?: string | null | undefined, sys: { __typename?: 'Sys', id: string }, logoImage?: { __typename?: 'Asset', url?: string | null | undefined } | null | undefined, category?: { __typename?: 'CouponCategory', description?: string | null | undefined, name?: string | null | undefined, image?: { __typename?: 'Asset', url?: string | null | undefined } | null | undefined } | null | undefined, linkedFrom?: { __typename?: 'CouponEntityLinkingCollections', couponEntryCollection?: { __typename?: 'CouponEntryCollection', total: number } | null | undefined } | null | undefined } | null | undefined> } | null | undefined };

export type CategoriesQueryVariables = Exact<{
  preview: Scalars['Boolean'];
}>;


export type CategoriesQuery = { __typename?: 'Query', couponCategoryCollection?: { __typename?: 'CouponCategoryCollection', items: Array<{ __typename?: 'CouponCategory', name?: string | null | undefined, sys: { __typename?: 'Sys', id: string }, linkedFrom?: { __typename?: 'CouponCategoryLinkingCollections', couponEntityCollection?: { __typename?: 'CouponEntityCollection', items: Array<{ __typename?: 'CouponEntity', name?: string | null | undefined, slug?: string | null | undefined, sys: { __typename?: 'Sys', id: string } } | null | undefined> } | null | undefined } | null | undefined, image?: { __typename?: 'Asset', url?: string | null | undefined } | null | undefined } | null | undefined> } | null | undefined };

export type CouponByIdReferringUrlQueryVariables = Exact<{
  id: Scalars['String'];
}>;


export type CouponByIdReferringUrlQuery = { __typename?: 'Query', couponEntry?: { __typename?: 'CouponEntry', referringUrl?: string | null | undefined } | null | undefined };

export type CouponsQueryVariables = Exact<{
  active?: InputMaybe<Scalars['Boolean']>;
  brandId?: InputMaybe<Scalars['String']>;
  slug?: InputMaybe<Scalars['String']>;
}>;


export type CouponsQuery = { __typename?: 'Query', couponEntryCollection?: { __typename?: 'CouponEntryCollection', items: Array<{ __typename?: 'CouponEntry', title?: string | null | undefined, slug?: string | null | undefined, description?: string | null | undefined, expiresAt?: any | null | undefined, referringUrl?: string | null | undefined, bannerImagesCollection?: { __typename?: 'AssetCollection', items: Array<{ __typename?: 'Asset', url?: string | null | undefined } | null | undefined> } | null | undefined, brandEntity?: { __typename?: 'CouponEntity', slug?: string | null | undefined, sys: { __typename?: 'Sys', id: string }, logoImage?: { __typename?: 'Asset', url?: string | null | undefined } | null | undefined } | null | undefined, sys: { __typename?: 'Sys', id: string } } | null | undefined> } | null | undefined };

export type HeadlinesQueryVariables = Exact<{ [key: string]: never; }>;


export type HeadlinesQuery = { __typename?: 'Query', couponHeadlineCollection?: { __typename?: 'CouponHeadlineCollection', items: Array<{ __typename?: 'CouponHeadline', description?: string | null | undefined, url?: string | null | undefined, title?: string | null | undefined, sys: { __typename?: 'Sys', id: string }, image?: { __typename?: 'Asset', url?: string | null | undefined } | null | undefined } | null | undefined> } | null | undefined };

export const SysFragmentDoc = gql`
    fragment Sys on Sys {
  id
  spaceId
  environmentId
  publishedAt
  firstPublishedAt
  publishedVersion
}
    `;
export const AssetFragmentDoc = gql`
    fragment Asset on Asset {
  sys {
    ...Sys
  }
  title
  description
  contentType
  fileName
  url
  size
  width
  height
}
    ${SysFragmentDoc}`;
export const BrandDocument = gql`
    query Brand($id: String!) {
  couponEntity(id: $id) {
    sys {
      id
    }
    name
    headline
    slug
    logoImage {
      url
    }
    description
    category {
      description
      image {
        url
      }
      name
    }
    linkedFrom {
      couponEntryCollection {
        total
      }
    }
    brandUrl
  }
}
    `;
export const BrandSearchDocument = gql`
    query BrandSearch($name_contains: String!) {
  couponEntityCollection(where: {name_contains: $name_contains}, order: name_ASC) {
    items {
      sys {
        id
      }
      description
      name
      slug
      logoImage {
        url
      }
    }
  }
}
    `;
export const BrandsDocument = gql`
    query Brands($slug: String) {
  couponEntityCollection(where: {slug: $slug}, order: name_ASC) {
    items {
      sys {
        id
      }
      name
      headline
      slug
      logoImage {
        url
      }
      description
      category {
        description
        image {
          url
        }
        name
      }
      linkedFrom {
        couponEntryCollection {
          total
        }
      }
      brandUrl
    }
  }
}
    `;
export const CategoriesDocument = gql`
    query Categories($preview: Boolean!) {
  couponCategoryCollection(preview: $preview) {
    items {
      sys {
        id
      }
      linkedFrom {
        couponEntityCollection {
          items {
            sys {
              id
            }
            name
            slug
          }
        }
      }
      name
      image {
        url
      }
    }
  }
}
    `;
export const CouponByIdReferringUrlDocument = gql`
    query CouponByIdReferringUrl($id: String!) {
  couponEntry(id: $id) {
    referringUrl
  }
}
    `;
export const CouponsDocument = gql`
    query Coupons($active: Boolean, $brandId: String, $slug: String) {
  couponEntryCollection(
    where: {active: $active, slug: $slug, brandEntity: {sys: {id: $brandId}}}
  ) {
    items {
      title
      slug
      bannerImagesCollection {
        items {
          url
        }
      }
      brandEntity {
        sys {
          id
        }
        logoImage {
          url
        }
        slug
      }
      description
      expiresAt
      referringUrl
      sys {
        id
      }
    }
  }
}
    `;
export const HeadlinesDocument = gql`
    query Headlines {
  couponHeadlineCollection {
    items {
      sys {
        id
      }
      image {
        url
      }
      description
      url
      title
    }
  }
}
    `;

export type SdkFunctionWrapper = <T>(action: (requestHeaders?:Record<string, string>) => Promise<T>, operationName: string) => Promise<T>;


const defaultWrapper: SdkFunctionWrapper = (action, _operationName) => action();

export function getSdk(client: GraphQLClient, withWrapper: SdkFunctionWrapper = defaultWrapper) {
  return {
    Brand(variables: BrandQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<BrandQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<BrandQuery>(BrandDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'Brand');
    },
    BrandSearch(variables: BrandSearchQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<BrandSearchQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<BrandSearchQuery>(BrandSearchDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'BrandSearch');
    },
    Brands(variables?: BrandsQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<BrandsQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<BrandsQuery>(BrandsDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'Brands');
    },
    Categories(variables: CategoriesQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<CategoriesQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<CategoriesQuery>(CategoriesDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'Categories');
    },
    CouponByIdReferringUrl(variables: CouponByIdReferringUrlQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<CouponByIdReferringUrlQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<CouponByIdReferringUrlQuery>(CouponByIdReferringUrlDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'CouponByIdReferringUrl');
    },
    Coupons(variables?: CouponsQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<CouponsQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<CouponsQuery>(CouponsDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'Coupons');
    },
    Headlines(variables?: HeadlinesQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<HeadlinesQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<HeadlinesQuery>(HeadlinesDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'Headlines');
    }
  };
}
export type Sdk = ReturnType<typeof getSdk>;