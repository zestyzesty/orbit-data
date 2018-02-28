/* eslint-disable valid-jsdoc */
import Orbit from './main';
import { isObject, isArray } from '@orbit/utils';
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
export function buildTransform(transformOrOperations, transformOptions, transformId, transformBuilder) {
    if (typeof transformOrOperations === 'function') {
        return buildTransform(transformOrOperations(transformBuilder), transformOptions, transformId);
    }
    else {
        let transform = transformOrOperations;
        let operations;
        let options;
        if (isObject(transform) && transform.operations) {
            if (transform.id && !transformOptions && !transformId) {
                return transform;
            }
            operations = transform.operations;
            options = transformOptions || transform.options;
        }
        else {
            if (isArray(transformOrOperations)) {
                operations = transformOrOperations;
            }
            else {
                operations = [transformOrOperations];
            }
            options = transformOptions;
        }
        let id = transformId || Orbit.uuid();
        return { operations, options, id };
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJhbnNmb3JtLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsic3JjL3RyYW5zZm9ybS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxnQ0FBZ0M7QUFDaEMsT0FBTyxLQUFLLE1BQU0sUUFBUSxDQUFDO0FBRTNCLE9BQU8sRUFBRSxRQUFRLEVBQUUsT0FBTyxFQUFXLE1BQU0sY0FBYyxDQUFDO0FBa0IxRDs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBa0JHO0FBQ0gsTUFBTSx5QkFBeUIscUJBQTRDLEVBQUUsZ0JBQXlCLEVBQUUsV0FBb0IsRUFBRSxnQkFBbUM7SUFDL0osRUFBRSxDQUFDLENBQUMsT0FBTyxxQkFBcUIsS0FBSyxVQUFVLENBQUMsQ0FBQyxDQUFDO1FBQ2hELE1BQU0sQ0FBQyxjQUFjLENBQUMscUJBQXFCLENBQUMsZ0JBQWdCLENBQUMsRUFBRSxnQkFBZ0IsRUFBRSxXQUFXLENBQUMsQ0FBQztJQUVoRyxDQUFDO0lBQUMsSUFBSSxDQUFDLENBQUM7UUFDTixJQUFJLFNBQVMsR0FBRyxxQkFBa0MsQ0FBQztRQUNuRCxJQUFJLFVBQXVCLENBQUM7UUFDNUIsSUFBSSxPQUFlLENBQUM7UUFFcEIsRUFBRSxDQUFDLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxJQUFJLFNBQVMsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDO1lBQ2hELEVBQUUsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxFQUFFLElBQUksQ0FBQyxnQkFBZ0IsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUM7Z0JBQ3RELE1BQU0sQ0FBQyxTQUFTLENBQUM7WUFDbkIsQ0FBQztZQUNELFVBQVUsR0FBRyxTQUFTLENBQUMsVUFBVSxDQUFDO1lBQ2xDLE9BQU8sR0FBRyxnQkFBZ0IsSUFBSSxTQUFTLENBQUMsT0FBTyxDQUFDO1FBQ2xELENBQUM7UUFBQyxJQUFJLENBQUMsQ0FBQztZQUNOLEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDbkMsVUFBVSxHQUFHLHFCQUFvQyxDQUFDO1lBQ3BELENBQUM7WUFBQyxJQUFJLENBQUMsQ0FBQztnQkFDTixVQUFVLEdBQUcsQ0FBQyxxQkFBa0MsQ0FBQyxDQUFDO1lBQ3BELENBQUM7WUFDRCxPQUFPLEdBQUcsZ0JBQWdCLENBQUM7UUFDN0IsQ0FBQztRQUVELElBQUksRUFBRSxHQUFXLFdBQVcsSUFBSSxLQUFLLENBQUMsSUFBSSxFQUFFLENBQUM7UUFFN0MsTUFBTSxDQUFDLEVBQUUsVUFBVSxFQUFFLE9BQU8sRUFBRSxFQUFFLEVBQUUsQ0FBQztJQUNyQyxDQUFDO0FBQ0gsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qIGVzbGludC1kaXNhYmxlIHZhbGlkLWpzZG9jICovXG5pbXBvcnQgT3JiaXQgZnJvbSAnLi9tYWluJztcbmltcG9ydCB7IE9wZXJhdGlvbiB9IGZyb20gJy4vb3BlcmF0aW9uJztcbmltcG9ydCB7IGlzT2JqZWN0LCBpc0FycmF5LCB0b0FycmF5IH0gZnJvbSAnQG9yYml0L3V0aWxzJztcbmltcG9ydCBUcmFuc2Zvcm1CdWlsZGVyIGZyb20gJy4vdHJhbnNmb3JtLWJ1aWxkZXInO1xuXG5leHBvcnQgdHlwZSBUcmFuc2Zvcm1CdWlsZGVyRnVuYyA9IChUcmFuc2Zvcm1CdWlsZGVyKSA9PiBPcGVyYXRpb25bXTtcbmV4cG9ydCB0eXBlIFRyYW5zZm9ybU9yT3BlcmF0aW9ucyA9IFRyYW5zZm9ybSB8IE9wZXJhdGlvbiB8IE9wZXJhdGlvbltdIHwgVHJhbnNmb3JtQnVpbGRlckZ1bmM7XG5cbi8qKlxuICogQSBUcmFuc2Zvcm0gcmVwcmVzZW50cyBhIHNldCBvZiBvcGVyYXRpb25zIHRoYXQgY2FuIG11dGF0ZSBhIHNvdXJjZS5cbiAqXG4gKiBAZXhwb3J0XG4gKiBAaW50ZXJmYWNlIFRyYW5zZm9ybVxuICovXG5leHBvcnQgaW50ZXJmYWNlIFRyYW5zZm9ybSB7XG4gIGlkOiBzdHJpbmc7XG4gIG9wZXJhdGlvbnM6IE9wZXJhdGlvbltdO1xuICBvcHRpb25zPzogYW55O1xufVxuXG4vKipcbiAqIEEgYnVpbGRlciBmdW5jdGlvbiBmb3IgY3JlYXRpbmcgYSBUcmFuc2Zvcm0gZnJvbSBpdHMgY29uc3RpdHVlbnQgcGFydHMuXG4gKlxuICogSWYgYSBgVHJhbnNmb3JtYCBpcyBwYXNzZWQgaW4gd2l0aCBhbiBgaWRgIGFuZCBgb3BlcmF0aW9uc2AsIGFuZCBub1xuICogcmVwbGFjZW1lbnQgYGlkYCBvciBgb3B0aW9uc2AgYXJlIGFsc28gcGFzc2VkIGluLCB0aGVuIHRoZSBgVHJhbnNmb3JtYFxuICogd2lsbCBiZSByZXR1cm5lZCB1bmNoYW5nZWQuXG4gKlxuICogRm9yIGFsbCBvdGhlciBjYXNlcywgYSBuZXcgYFRyYW5zZm9ybWAgb2JqZWN0IHdpbGwgYmUgY3JlYXRlZCBhbmQgcmV0dXJuZWQuXG4gKlxuICogVHJhbnNmb3JtcyB3aWxsIGJlIGFzc2lnbmVkIHRoZSBzcGVjaWZpZWQgYHRyYW5zZm9ybUlkYCBhcyBgaWRgLiBJZiBub25lXG4gKiBpcyBzcGVjaWZpZWQsIGEgVVVJRCB3aWxsIGJlIGdlbmVyYXRlZC5cbiAqXG4gKiBAZXhwb3J0XG4gKiBAcGFyYW0ge1RyYW5zZm9ybU9yT3BlcmF0aW9uc30gdHJhbnNmb3JtT3JPcGVyYXRpb25zXG4gKiBAcGFyYW0ge29iamVjdH0gW3RyYW5zZm9ybU9wdGlvbnNdXG4gKiBAcGFyYW0ge3N0cmluZ30gW3RyYW5zZm9ybUlkXSBVbmlxdWUgaWQgZm9yIHRoaXMgdHJhbnNmb3JtIChvdGhlcndpc2UgYSBVVUlEIHdpbGwgYmUgYXNzaWduZWQpXG4gKiBAcGFyYW0ge1RyYW5zZm9ybUJ1aWxkZXJ9IFt0cmFuc2Zvcm1CdWlsZGVyXVxuICogQHJldHVybnMge1RyYW5zZm9ybX1cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGJ1aWxkVHJhbnNmb3JtKHRyYW5zZm9ybU9yT3BlcmF0aW9uczogVHJhbnNmb3JtT3JPcGVyYXRpb25zLCB0cmFuc2Zvcm1PcHRpb25zPzogb2JqZWN0LCB0cmFuc2Zvcm1JZD86IHN0cmluZywgdHJhbnNmb3JtQnVpbGRlcj86IFRyYW5zZm9ybUJ1aWxkZXIpOiBUcmFuc2Zvcm0ge1xuICBpZiAodHlwZW9mIHRyYW5zZm9ybU9yT3BlcmF0aW9ucyA9PT0gJ2Z1bmN0aW9uJykge1xuICAgIHJldHVybiBidWlsZFRyYW5zZm9ybSh0cmFuc2Zvcm1Pck9wZXJhdGlvbnModHJhbnNmb3JtQnVpbGRlciksIHRyYW5zZm9ybU9wdGlvbnMsIHRyYW5zZm9ybUlkKTtcblxuICB9IGVsc2Uge1xuICAgIGxldCB0cmFuc2Zvcm0gPSB0cmFuc2Zvcm1Pck9wZXJhdGlvbnMgYXMgVHJhbnNmb3JtO1xuICAgIGxldCBvcGVyYXRpb25zOiBPcGVyYXRpb25bXTtcbiAgICBsZXQgb3B0aW9uczogb2JqZWN0O1xuXG4gICAgaWYgKGlzT2JqZWN0KHRyYW5zZm9ybSkgJiYgdHJhbnNmb3JtLm9wZXJhdGlvbnMpIHtcbiAgICAgIGlmICh0cmFuc2Zvcm0uaWQgJiYgIXRyYW5zZm9ybU9wdGlvbnMgJiYgIXRyYW5zZm9ybUlkKSB7XG4gICAgICAgIHJldHVybiB0cmFuc2Zvcm07XG4gICAgICB9XG4gICAgICBvcGVyYXRpb25zID0gdHJhbnNmb3JtLm9wZXJhdGlvbnM7XG4gICAgICBvcHRpb25zID0gdHJhbnNmb3JtT3B0aW9ucyB8fCB0cmFuc2Zvcm0ub3B0aW9ucztcbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKGlzQXJyYXkodHJhbnNmb3JtT3JPcGVyYXRpb25zKSkge1xuICAgICAgICBvcGVyYXRpb25zID0gdHJhbnNmb3JtT3JPcGVyYXRpb25zIGFzIE9wZXJhdGlvbltdO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgb3BlcmF0aW9ucyA9IFt0cmFuc2Zvcm1Pck9wZXJhdGlvbnMgYXMgT3BlcmF0aW9uXTtcbiAgICAgIH1cbiAgICAgIG9wdGlvbnMgPSB0cmFuc2Zvcm1PcHRpb25zO1xuICAgIH1cblxuICAgIGxldCBpZDogc3RyaW5nID0gdHJhbnNmb3JtSWQgfHwgT3JiaXQudXVpZCgpO1xuXG4gICAgcmV0dXJuIHsgb3BlcmF0aW9ucywgb3B0aW9ucywgaWQgfTtcbiAgfVxufVxuIl19