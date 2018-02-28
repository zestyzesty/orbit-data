import { Query, QueryOrExpression } from '../query';
import { Source, SourceClass } from '../source';
export declare const QUERYABLE = "__queryable__";
/**
 * Has a source been decorated as `@queryable`?
 *
 * @export
 * @param {object} obj
 * @returns
 */
export declare function isQueryable(source: Source): boolean;
/**
 * A source decorated as `@queryable` must also implement the `Queryable`
 * interface.
 *
 * @export
 * @interface Queryable
 */
export interface Queryable {
    /**
     * The `query` method accepts a `Query` instance. It evaluates the query and
     * returns a promise that resolves to a static set of results.
     *
     * @param {QueryOrExpression} queryOrExpression
     * @param {object} [options]
     * @param {string} [id]
     * @returns {Promise<any>}
     *
     * @memberOf Queryable
     */
    query(queryOrExpression: QueryOrExpression, options?: object, id?: string): Promise<any>;
    _query(query: Query): Promise<any>;
}
/**
 * Marks a source as "queryable" and adds an implementation of the `Queryable`
 * interface.
 *
 * The `query` method is part of the "request flow" in Orbit. Requests trigger
 * events before and after processing of each request. Observers can delay the
 * resolution of a request by returning a promise in an event listener.
 *
 * The `Queryable` interface introduces the following events:
 *
 * - `beforeQuery` - emitted prior to the processing of `query`, this event
 * includes the requested `Query` as an argument.
 *
 * - `query` - emitted after a `query` has successfully returned, this event's
 * arguments include both the requested `Query` and the results.
 *
 * - `queryFail` - emitted when an error has occurred processing a query, this
 * event's arguments include both the requested `Query` and the error.
 *
 * A queryable source must implement a private method `_query`, which performs
 * the processing required for `query` and returns a promise that resolves to a
 * set of results.
 *
 * @export
 * @decorator
 * @param {SourceClass} Klass
 * @returns {void}
 */
export default function queryable(Klass: SourceClass): void;
