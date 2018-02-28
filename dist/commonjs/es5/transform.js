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
        var transform = transformOrOperations;
        var operations = void 0;
        var options = void 0;
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
        var id = transformId || _main2.default.uuid();
        return { operations: operations, options: options, id: id };
    }
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJhbnNmb3JtLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsic3JjL3RyYW5zZm9ybS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQ0EsQUFBTyxBQUFLLEFBQU0sQUFBUSxBQUFDOzs7O0FBRTNCLEFBQU8sQUFBRSxBQUFRLEFBQUUsQUFBTyxBQUFXLEFBQU0sQUFBYyxBQUFDOzs7O0FBa0IxRCxBQWtCRyxBQUNILEFBQU07Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUF4Q04sQUFBZ0M7d0JBd0NELEFBQTRDLHVCQUFFLEFBQXlCLGtCQUFFLEFBQW9CLGFBQUUsQUFBbUMsa0JBQy9KLEFBQUUsQUFBQztRQUFDLE9BQU8sQUFBcUIsMEJBQUssQUFBVSxBQUFDLFlBQUMsQUFBQyxBQUNoRCxBQUFNO2VBQUMsQUFBYyxlQUFDLEFBQXFCLHNCQUFDLEFBQWdCLEFBQUMsbUJBQUUsQUFBZ0Isa0JBQUUsQUFBVyxBQUFDLEFBQUMsQUFFaEcsQUFBQyxBQUFDLEFBQUk7V0FBQyxBQUFDLEFBQ047WUFBSSxBQUFTLFlBQUcsQUFBa0MsQUFBQyxBQUNuRDtZQUFJLEFBQXVCLEFBQUMsa0JBQzVCO1lBQUksQUFBZSxBQUFDLGVBRXBCLEFBQUUsQUFBQztZQUFDLEFBQVEscUJBQUMsQUFBUyxBQUFDLGNBQUksQUFBUyxVQUFDLEFBQVUsQUFBQyxZQUFDLEFBQUMsQUFDaEQsQUFBRSxBQUFDO2dCQUFDLEFBQVMsVUFBQyxBQUFFLE1BQUksQ0FBQyxBQUFnQixvQkFBSSxDQUFDLEFBQVcsQUFBQyxhQUFDLEFBQUMsQUFDdEQsQUFBTTt1QkFBQyxBQUFTLEFBQUMsQUFDbkIsQUFBQztBQUNELEFBQVU7eUJBQUcsQUFBUyxVQUFDLEFBQVUsQUFBQyxBQUNsQyxBQUFPO3NCQUFHLEFBQWdCLG9CQUFJLEFBQVMsVUFBQyxBQUFPLEFBQUMsQUFDbEQsQUFBQyxBQUFDLEFBQUk7ZUFBQyxBQUFDLEFBQ04sQUFBRSxBQUFDO2dCQUFDLEFBQU8sb0JBQUMsQUFBcUIsQUFBQyxBQUFDLHdCQUFDLEFBQUMsQUFDbkMsQUFBVTs2QkFBRyxBQUFvQyxBQUFDLEFBQ3BELEFBQUMsQUFBQyxBQUFJO21CQUFDLEFBQUMsQUFDTixBQUFVOzZCQUFHLENBQUMsQUFBa0MsQUFBQyxBQUFDLEFBQ3BELEFBQUM7QUFDRCxBQUFPO3NCQUFHLEFBQWdCLEFBQUMsQUFDN0IsQUFBQztBQUVEO1lBQUksQUFBRSxLQUFXLEFBQVcsZUFBSSxBQUFLLGVBQUMsQUFBSSxBQUFFLEFBQUMsQUFFN0MsQUFBTTtlQUFDLEVBQUUsQUFBVSx3QkFBRSxBQUFPLGtCQUFFLEFBQUUsQUFBRSxBQUFDLEFBQ3JDLElBQUMsQUFDSDtBQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLyogZXNsaW50LWRpc2FibGUgdmFsaWQtanNkb2MgKi9cbmltcG9ydCBPcmJpdCBmcm9tICcuL21haW4nO1xuaW1wb3J0IHsgT3BlcmF0aW9uIH0gZnJvbSAnLi9vcGVyYXRpb24nO1xuaW1wb3J0IHsgaXNPYmplY3QsIGlzQXJyYXksIHRvQXJyYXkgfSBmcm9tICdAb3JiaXQvdXRpbHMnO1xuaW1wb3J0IFRyYW5zZm9ybUJ1aWxkZXIgZnJvbSAnLi90cmFuc2Zvcm0tYnVpbGRlcic7XG5cbmV4cG9ydCB0eXBlIFRyYW5zZm9ybUJ1aWxkZXJGdW5jID0gKFRyYW5zZm9ybUJ1aWxkZXIpID0+IE9wZXJhdGlvbltdO1xuZXhwb3J0IHR5cGUgVHJhbnNmb3JtT3JPcGVyYXRpb25zID0gVHJhbnNmb3JtIHwgT3BlcmF0aW9uIHwgT3BlcmF0aW9uW10gfCBUcmFuc2Zvcm1CdWlsZGVyRnVuYztcblxuLyoqXG4gKiBBIFRyYW5zZm9ybSByZXByZXNlbnRzIGEgc2V0IG9mIG9wZXJhdGlvbnMgdGhhdCBjYW4gbXV0YXRlIGEgc291cmNlLlxuICpcbiAqIEBleHBvcnRcbiAqIEBpbnRlcmZhY2UgVHJhbnNmb3JtXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgVHJhbnNmb3JtIHtcbiAgaWQ6IHN0cmluZztcbiAgb3BlcmF0aW9uczogT3BlcmF0aW9uW107XG4gIG9wdGlvbnM/OiBhbnk7XG59XG5cbi8qKlxuICogQSBidWlsZGVyIGZ1bmN0aW9uIGZvciBjcmVhdGluZyBhIFRyYW5zZm9ybSBmcm9tIGl0cyBjb25zdGl0dWVudCBwYXJ0cy5cbiAqXG4gKiBJZiBhIGBUcmFuc2Zvcm1gIGlzIHBhc3NlZCBpbiB3aXRoIGFuIGBpZGAgYW5kIGBvcGVyYXRpb25zYCwgYW5kIG5vXG4gKiByZXBsYWNlbWVudCBgaWRgIG9yIGBvcHRpb25zYCBhcmUgYWxzbyBwYXNzZWQgaW4sIHRoZW4gdGhlIGBUcmFuc2Zvcm1gXG4gKiB3aWxsIGJlIHJldHVybmVkIHVuY2hhbmdlZC5cbiAqXG4gKiBGb3IgYWxsIG90aGVyIGNhc2VzLCBhIG5ldyBgVHJhbnNmb3JtYCBvYmplY3Qgd2lsbCBiZSBjcmVhdGVkIGFuZCByZXR1cm5lZC5cbiAqXG4gKiBUcmFuc2Zvcm1zIHdpbGwgYmUgYXNzaWduZWQgdGhlIHNwZWNpZmllZCBgdHJhbnNmb3JtSWRgIGFzIGBpZGAuIElmIG5vbmVcbiAqIGlzIHNwZWNpZmllZCwgYSBVVUlEIHdpbGwgYmUgZ2VuZXJhdGVkLlxuICpcbiAqIEBleHBvcnRcbiAqIEBwYXJhbSB7VHJhbnNmb3JtT3JPcGVyYXRpb25zfSB0cmFuc2Zvcm1Pck9wZXJhdGlvbnNcbiAqIEBwYXJhbSB7b2JqZWN0fSBbdHJhbnNmb3JtT3B0aW9uc11cbiAqIEBwYXJhbSB7c3RyaW5nfSBbdHJhbnNmb3JtSWRdIFVuaXF1ZSBpZCBmb3IgdGhpcyB0cmFuc2Zvcm0gKG90aGVyd2lzZSBhIFVVSUQgd2lsbCBiZSBhc3NpZ25lZClcbiAqIEBwYXJhbSB7VHJhbnNmb3JtQnVpbGRlcn0gW3RyYW5zZm9ybUJ1aWxkZXJdXG4gKiBAcmV0dXJucyB7VHJhbnNmb3JtfVxuICovXG5leHBvcnQgZnVuY3Rpb24gYnVpbGRUcmFuc2Zvcm0odHJhbnNmb3JtT3JPcGVyYXRpb25zOiBUcmFuc2Zvcm1Pck9wZXJhdGlvbnMsIHRyYW5zZm9ybU9wdGlvbnM/OiBvYmplY3QsIHRyYW5zZm9ybUlkPzogc3RyaW5nLCB0cmFuc2Zvcm1CdWlsZGVyPzogVHJhbnNmb3JtQnVpbGRlcik6IFRyYW5zZm9ybSB7XG4gIGlmICh0eXBlb2YgdHJhbnNmb3JtT3JPcGVyYXRpb25zID09PSAnZnVuY3Rpb24nKSB7XG4gICAgcmV0dXJuIGJ1aWxkVHJhbnNmb3JtKHRyYW5zZm9ybU9yT3BlcmF0aW9ucyh0cmFuc2Zvcm1CdWlsZGVyKSwgdHJhbnNmb3JtT3B0aW9ucywgdHJhbnNmb3JtSWQpO1xuXG4gIH0gZWxzZSB7XG4gICAgbGV0IHRyYW5zZm9ybSA9IHRyYW5zZm9ybU9yT3BlcmF0aW9ucyBhcyBUcmFuc2Zvcm07XG4gICAgbGV0IG9wZXJhdGlvbnM6IE9wZXJhdGlvbltdO1xuICAgIGxldCBvcHRpb25zOiBvYmplY3Q7XG5cbiAgICBpZiAoaXNPYmplY3QodHJhbnNmb3JtKSAmJiB0cmFuc2Zvcm0ub3BlcmF0aW9ucykge1xuICAgICAgaWYgKHRyYW5zZm9ybS5pZCAmJiAhdHJhbnNmb3JtT3B0aW9ucyAmJiAhdHJhbnNmb3JtSWQpIHtcbiAgICAgICAgcmV0dXJuIHRyYW5zZm9ybTtcbiAgICAgIH1cbiAgICAgIG9wZXJhdGlvbnMgPSB0cmFuc2Zvcm0ub3BlcmF0aW9ucztcbiAgICAgIG9wdGlvbnMgPSB0cmFuc2Zvcm1PcHRpb25zIHx8IHRyYW5zZm9ybS5vcHRpb25zO1xuICAgIH0gZWxzZSB7XG4gICAgICBpZiAoaXNBcnJheSh0cmFuc2Zvcm1Pck9wZXJhdGlvbnMpKSB7XG4gICAgICAgIG9wZXJhdGlvbnMgPSB0cmFuc2Zvcm1Pck9wZXJhdGlvbnMgYXMgT3BlcmF0aW9uW107XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBvcGVyYXRpb25zID0gW3RyYW5zZm9ybU9yT3BlcmF0aW9ucyBhcyBPcGVyYXRpb25dO1xuICAgICAgfVxuICAgICAgb3B0aW9ucyA9IHRyYW5zZm9ybU9wdGlvbnM7XG4gICAgfVxuXG4gICAgbGV0IGlkOiBzdHJpbmcgPSB0cmFuc2Zvcm1JZCB8fCBPcmJpdC51dWlkKCk7XG5cbiAgICByZXR1cm4geyBvcGVyYXRpb25zLCBvcHRpb25zLCBpZCB9O1xuICB9XG59XG4iXX0=