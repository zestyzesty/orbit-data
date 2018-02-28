import { Source, SourceClass } from '../source';
import { Query, QueryOrExpression } from '../query';
import { Transform } from '../transform';
export declare const PULLABLE = "__pullable__";
/**
 * Has a source been decorated as `@pullable`?
 *
 * @export
 * @param {Source} source
 * @returns
 */
export declare function isPullable(source: Source): boolean;
/**
 * A source decorated as `@pullable` must also implement the `Pullable`
 * interface.
 *
 * @export
 * @interface Pullable
 */
export interface Pullable {
    /**
     * The `pull` method accepts a query or expression and returns a promise that
     * resolves to an array of `Transform` instances that represent the changeset
     * that resulted from applying the query. In other words, a `pull` request
     * retrieves the results of a query in `Transform` form.
     *
     * @param {QueryOrExpression} queryOrExpression
     * @param {object} [options]
     * @param {string} [id]
     * @returns {Promise<Transform[]>}
     *
     * @memberOf Pullable
     */
    pull(queryOrExpression: QueryOrExpression, options?: object, id?: string): Promise<Transform[]>;
    _pull(query: Query): Promise<Transform[]>;
}
/**
 * Marks a source as "pullable" and adds an implementation of the `Pullable`
 * interface.
 *
 * The `pull` method is part of the "request flow" in Orbit. Requests trigger
 * events before and after processing of each request. Observers can delay the
 * resolution of a request by returning a promise in an event listener.
 *
 * A pullable source emits the following events:
 *
 * - `beforePull` - emitted prior to the processing of `pull`, this event
 * includes the requested `Query` as an argument.
 *
 * - `pull` - emitted after a `pull` has successfully been requested, this
 * event's arguments include both the requested `Query` and an array of the
 * resulting `Transform` instances.
 *
 * - `pullFail` - emitted when an error has occurred processing a `pull`, this
 * event's arguments include both the requested `Query` and the error.
 *
 * A pullable source must implement a private method `_pull`, which performs
 * the processing required for `pull` and returns a promise that resolves to an
 * array of `Transform` instances.
 *
 * @export
 * @decorator
 * @param {SourceClass} Klass
 * @returns {void}
 */
export default function pullable(Klass: SourceClass): void;
