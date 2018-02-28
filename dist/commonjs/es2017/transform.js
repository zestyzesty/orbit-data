'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.buildTransform = buildTransform;

var _main = require('./main');

var _main2 = _interopRequireDefault(_main);

var _utils = require('@orbit/utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
/* eslint-disable valid-jsdoc */
function buildTransform(transformOrOperations, transformOptions, transformId, transformBuilder) {
    if (typeof transformOrOperations === 'function') {
        return buildTransform(transformOrOperations(transformBuilder), transformOptions, transformId);
    } else {
        let transform = transformOrOperations;
        let operations;
        let options;
        if ((0, _utils.isObject)(transform) && transform.operations) {
            if (transform.id && !transformOptions && !transformId) {
                return transform;
            }
            operations = transform.operations;
            options = transformOptions || transform.options;
        } else {
            if ((0, _utils.isArray)(transformOrOperations)) {
                operations = transformOrOperations;
            } else {
                operations = [transformOrOperations];
            }
            options = transformOptions;
        }
        let id = transformId || _main2.default.uuid();
        return { operations, options, id };
    }
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJhbnNmb3JtLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsic3JjL3RyYW5zZm9ybS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQ0EsQUFBTyxBQUFLLEFBQU0sQUFBUSxBQUFDOzs7O0FBRTNCLEFBQU8sQUFBRSxBQUFRLEFBQUUsQUFBTyxBQUFXLEFBQU0sQUFBYyxBQUFDOzs7O0FBa0IxRCxBQWtCRyxBQUNILEFBQU07Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUF4Q04sQUFBZ0M7d0JBd0NELEFBQTRDLHVCQUFFLEFBQXlCLGtCQUFFLEFBQW9CLGFBQUUsQUFBbUM7QUFDL0osQUFBRSxBQUFDLFFBQUMsT0FBTyxBQUFxQiwwQkFBSyxBQUFVLEFBQUMsWUFBQyxBQUFDO0FBQ2hELEFBQU0sZUFBQyxBQUFjLGVBQUMsQUFBcUIsc0JBQUMsQUFBZ0IsQUFBQyxtQkFBRSxBQUFnQixrQkFBRSxBQUFXLEFBQUMsQUFBQyxBQUVoRztBQUFDLEFBQUMsQUFBSSxXQUFDLEFBQUM7QUFDTixZQUFJLEFBQVMsWUFBRyxBQUFrQyxBQUFDO0FBQ25ELFlBQUksQUFBdUIsQUFBQztBQUM1QixZQUFJLEFBQWUsQUFBQztBQUVwQixBQUFFLEFBQUMsWUFBQyxBQUFRLHFCQUFDLEFBQVMsQUFBQyxjQUFJLEFBQVMsVUFBQyxBQUFVLEFBQUMsWUFBQyxBQUFDO0FBQ2hELEFBQUUsQUFBQyxnQkFBQyxBQUFTLFVBQUMsQUFBRSxNQUFJLENBQUMsQUFBZ0Isb0JBQUksQ0FBQyxBQUFXLEFBQUMsYUFBQyxBQUFDO0FBQ3RELEFBQU0sdUJBQUMsQUFBUyxBQUFDLEFBQ25CO0FBQUM7QUFDRCxBQUFVLHlCQUFHLEFBQVMsVUFBQyxBQUFVLEFBQUM7QUFDbEMsQUFBTyxzQkFBRyxBQUFnQixvQkFBSSxBQUFTLFVBQUMsQUFBTyxBQUFDLEFBQ2xEO0FBQUMsQUFBQyxBQUFJLGVBQUMsQUFBQztBQUNOLEFBQUUsQUFBQyxnQkFBQyxBQUFPLG9CQUFDLEFBQXFCLEFBQUMsQUFBQyx3QkFBQyxBQUFDO0FBQ25DLEFBQVUsNkJBQUcsQUFBb0MsQUFBQyxBQUNwRDtBQUFDLEFBQUMsQUFBSSxtQkFBQyxBQUFDO0FBQ04sQUFBVSw2QkFBRyxDQUFDLEFBQWtDLEFBQUMsQUFBQyxBQUNwRDtBQUFDO0FBQ0QsQUFBTyxzQkFBRyxBQUFnQixBQUFDLEFBQzdCO0FBQUM7QUFFRCxZQUFJLEFBQUUsS0FBVyxBQUFXLGVBQUksQUFBSyxlQUFDLEFBQUksQUFBRSxBQUFDO0FBRTdDLEFBQU0sZUFBQyxFQUFFLEFBQVUsWUFBRSxBQUFPLFNBQUUsQUFBRSxBQUFFLEFBQUMsQUFDckM7QUFBQyxBQUNIO0FBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKiBlc2xpbnQtZGlzYWJsZSB2YWxpZC1qc2RvYyAqL1xuaW1wb3J0IE9yYml0IGZyb20gJy4vbWFpbic7XG5pbXBvcnQgeyBPcGVyYXRpb24gfSBmcm9tICcuL29wZXJhdGlvbic7XG5pbXBvcnQgeyBpc09iamVjdCwgaXNBcnJheSwgdG9BcnJheSB9IGZyb20gJ0BvcmJpdC91dGlscyc7XG5pbXBvcnQgVHJhbnNmb3JtQnVpbGRlciBmcm9tICcuL3RyYW5zZm9ybS1idWlsZGVyJztcblxuZXhwb3J0IHR5cGUgVHJhbnNmb3JtQnVpbGRlckZ1bmMgPSAoVHJhbnNmb3JtQnVpbGRlcikgPT4gT3BlcmF0aW9uW107XG5leHBvcnQgdHlwZSBUcmFuc2Zvcm1Pck9wZXJhdGlvbnMgPSBUcmFuc2Zvcm0gfCBPcGVyYXRpb24gfCBPcGVyYXRpb25bXSB8IFRyYW5zZm9ybUJ1aWxkZXJGdW5jO1xuXG4vKipcbiAqIEEgVHJhbnNmb3JtIHJlcHJlc2VudHMgYSBzZXQgb2Ygb3BlcmF0aW9ucyB0aGF0IGNhbiBtdXRhdGUgYSBzb3VyY2UuXG4gKlxuICogQGV4cG9ydFxuICogQGludGVyZmFjZSBUcmFuc2Zvcm1cbiAqL1xuZXhwb3J0IGludGVyZmFjZSBUcmFuc2Zvcm0ge1xuICBpZDogc3RyaW5nO1xuICBvcGVyYXRpb25zOiBPcGVyYXRpb25bXTtcbiAgb3B0aW9ucz86IGFueTtcbn1cblxuLyoqXG4gKiBBIGJ1aWxkZXIgZnVuY3Rpb24gZm9yIGNyZWF0aW5nIGEgVHJhbnNmb3JtIGZyb20gaXRzIGNvbnN0aXR1ZW50IHBhcnRzLlxuICpcbiAqIElmIGEgYFRyYW5zZm9ybWAgaXMgcGFzc2VkIGluIHdpdGggYW4gYGlkYCBhbmQgYG9wZXJhdGlvbnNgLCBhbmQgbm9cbiAqIHJlcGxhY2VtZW50IGBpZGAgb3IgYG9wdGlvbnNgIGFyZSBhbHNvIHBhc3NlZCBpbiwgdGhlbiB0aGUgYFRyYW5zZm9ybWBcbiAqIHdpbGwgYmUgcmV0dXJuZWQgdW5jaGFuZ2VkLlxuICpcbiAqIEZvciBhbGwgb3RoZXIgY2FzZXMsIGEgbmV3IGBUcmFuc2Zvcm1gIG9iamVjdCB3aWxsIGJlIGNyZWF0ZWQgYW5kIHJldHVybmVkLlxuICpcbiAqIFRyYW5zZm9ybXMgd2lsbCBiZSBhc3NpZ25lZCB0aGUgc3BlY2lmaWVkIGB0cmFuc2Zvcm1JZGAgYXMgYGlkYC4gSWYgbm9uZVxuICogaXMgc3BlY2lmaWVkLCBhIFVVSUQgd2lsbCBiZSBnZW5lcmF0ZWQuXG4gKlxuICogQGV4cG9ydFxuICogQHBhcmFtIHtUcmFuc2Zvcm1Pck9wZXJhdGlvbnN9IHRyYW5zZm9ybU9yT3BlcmF0aW9uc1xuICogQHBhcmFtIHtvYmplY3R9IFt0cmFuc2Zvcm1PcHRpb25zXVxuICogQHBhcmFtIHtzdHJpbmd9IFt0cmFuc2Zvcm1JZF0gVW5pcXVlIGlkIGZvciB0aGlzIHRyYW5zZm9ybSAob3RoZXJ3aXNlIGEgVVVJRCB3aWxsIGJlIGFzc2lnbmVkKVxuICogQHBhcmFtIHtUcmFuc2Zvcm1CdWlsZGVyfSBbdHJhbnNmb3JtQnVpbGRlcl1cbiAqIEByZXR1cm5zIHtUcmFuc2Zvcm19XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBidWlsZFRyYW5zZm9ybSh0cmFuc2Zvcm1Pck9wZXJhdGlvbnM6IFRyYW5zZm9ybU9yT3BlcmF0aW9ucywgdHJhbnNmb3JtT3B0aW9ucz86IG9iamVjdCwgdHJhbnNmb3JtSWQ/OiBzdHJpbmcsIHRyYW5zZm9ybUJ1aWxkZXI/OiBUcmFuc2Zvcm1CdWlsZGVyKTogVHJhbnNmb3JtIHtcbiAgaWYgKHR5cGVvZiB0cmFuc2Zvcm1Pck9wZXJhdGlvbnMgPT09ICdmdW5jdGlvbicpIHtcbiAgICByZXR1cm4gYnVpbGRUcmFuc2Zvcm0odHJhbnNmb3JtT3JPcGVyYXRpb25zKHRyYW5zZm9ybUJ1aWxkZXIpLCB0cmFuc2Zvcm1PcHRpb25zLCB0cmFuc2Zvcm1JZCk7XG5cbiAgfSBlbHNlIHtcbiAgICBsZXQgdHJhbnNmb3JtID0gdHJhbnNmb3JtT3JPcGVyYXRpb25zIGFzIFRyYW5zZm9ybTtcbiAgICBsZXQgb3BlcmF0aW9uczogT3BlcmF0aW9uW107XG4gICAgbGV0IG9wdGlvbnM6IG9iamVjdDtcblxuICAgIGlmIChpc09iamVjdCh0cmFuc2Zvcm0pICYmIHRyYW5zZm9ybS5vcGVyYXRpb25zKSB7XG4gICAgICBpZiAodHJhbnNmb3JtLmlkICYmICF0cmFuc2Zvcm1PcHRpb25zICYmICF0cmFuc2Zvcm1JZCkge1xuICAgICAgICByZXR1cm4gdHJhbnNmb3JtO1xuICAgICAgfVxuICAgICAgb3BlcmF0aW9ucyA9IHRyYW5zZm9ybS5vcGVyYXRpb25zO1xuICAgICAgb3B0aW9ucyA9IHRyYW5zZm9ybU9wdGlvbnMgfHwgdHJhbnNmb3JtLm9wdGlvbnM7XG4gICAgfSBlbHNlIHtcbiAgICAgIGlmIChpc0FycmF5KHRyYW5zZm9ybU9yT3BlcmF0aW9ucykpIHtcbiAgICAgICAgb3BlcmF0aW9ucyA9IHRyYW5zZm9ybU9yT3BlcmF0aW9ucyBhcyBPcGVyYXRpb25bXTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIG9wZXJhdGlvbnMgPSBbdHJhbnNmb3JtT3JPcGVyYXRpb25zIGFzIE9wZXJhdGlvbl07XG4gICAgICB9XG4gICAgICBvcHRpb25zID0gdHJhbnNmb3JtT3B0aW9ucztcbiAgICB9XG5cbiAgICBsZXQgaWQ6IHN0cmluZyA9IHRyYW5zZm9ybUlkIHx8IE9yYml0LnV1aWQoKTtcblxuICAgIHJldHVybiB7IG9wZXJhdGlvbnMsIG9wdGlvbnMsIGlkIH07XG4gIH1cbn1cbiJdfQ==