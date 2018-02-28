import { Operation } from './operation';
import TransformBuilder from './transform-builder';
export declare type TransformBuilderFunc = (TransformBuilder) => Operation[];
export declare type TransformOrOperations = Transform | Operation | Operation[] | TransformBuilderFunc;
/**
 * A Transform represents a set of operations that can mutate a source.
 *
 * @export
 * @interface Transform
 */
export interface Transform {
    id: string;
    operations: Operation[];
    options?: any;
}
/**
 * A builder function for creating a Transform from its constituent parts.
 *
 * If a `Transform` is passed in with an `id` and `operations`, and no
 * replacement `id` or `options` are also passed in, then the `Transform`
 * will be returned unchanged.
 *
 * For all other cases, a new `Transform` object will be created and returned.
 *
 * Transforms will be assigned the specified `transformId` as `id`. If none
 * is specified, a UUID will be generated.
 *
 * @export
 * @param {TransformOrOperations} transformOrOperations
 * @param {object} [transformOptions]
 * @param {string} [transformId] Unique id for this transform (otherwise a UUID will be assigned)
 * @param {TransformBuilder} [transformBuilder]
 * @returns {Transform}
 */
export declare function buildTransform(transformOrOperations: TransformOrOperations, transformOptions?: object, transformId?: string, transformBuilder?: TransformBuilder): Transform;
