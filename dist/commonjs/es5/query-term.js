"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.FindRecordsTerm = exports.FindRelatedRecordsTerm = exports.FindRelatedRecordTerm = exports.FindRecordTerm = exports.QueryTerm = undefined;

var _utils = require("@orbit/utils");

function _defaults(obj, defaults) {
    var keys = Object.getOwnPropertyNames(defaults);for (var i = 0; i < keys.length; i++) {
        var key = keys[i];var value = Object.getOwnPropertyDescriptor(defaults, key);if (value && value.configurable && obj[key] === undefined) {
            Object.defineProperty(obj, key, value);
        }
    }return obj;
}

function _possibleConstructorReturn(self, call) {
    if (!self) {
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }return call && (typeof call === "object" || typeof call === "function") ? call : self;
}

function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
        throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
    }subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass);
}

function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
    }
}

/**
 * Query terms are used by query builders to allow for the construction of
 * query expressions in composable patterns.
 *
 * @export
 * @class QueryTerm
 */
var QueryTerm = exports.QueryTerm = function () {
    function QueryTerm(expression) {
        _classCallCheck(this, QueryTerm);

        this.expression = expression;
    }

    QueryTerm.prototype.toQueryExpression = function toQueryExpression() {
        return this.expression;
    };

    return QueryTerm;
}();
/**
 * A query term representing a single record.
 *
 * @export
 * @class FindRecordTerm
 * @extends {QueryTerm}
 */
var FindRecordTerm = exports.FindRecordTerm = function (_QueryTerm) {
    _inherits(FindRecordTerm, _QueryTerm);

    function FindRecordTerm(record) {
        _classCallCheck(this, FindRecordTerm);

        var expression = {
            op: 'findRecord',
            record: record
        };
        return _possibleConstructorReturn(this, _QueryTerm.call(this, expression));
    }

    return FindRecordTerm;
}(QueryTerm);
var FindRelatedRecordTerm = exports.FindRelatedRecordTerm = function (_QueryTerm2) {
    _inherits(FindRelatedRecordTerm, _QueryTerm2);

    function FindRelatedRecordTerm(record, relationship) {
        _classCallCheck(this, FindRelatedRecordTerm);

        var expression = {
            op: 'findRelatedRecord',
            record: record,
            relationship: relationship
        };
        return _possibleConstructorReturn(this, _QueryTerm2.call(this, expression));
    }

    return FindRelatedRecordTerm;
}(QueryTerm);
var FindRelatedRecordsTerm = exports.FindRelatedRecordsTerm = function (_QueryTerm3) {
    _inherits(FindRelatedRecordsTerm, _QueryTerm3);

    function FindRelatedRecordsTerm(record, relationship) {
        _classCallCheck(this, FindRelatedRecordsTerm);

        var expression = {
            op: 'findRelatedRecords',
            record: record,
            relationship: relationship
        };
        return _possibleConstructorReturn(this, _QueryTerm3.call(this, expression));
    }

    return FindRelatedRecordsTerm;
}(QueryTerm);
var FindRecordsTerm = exports.FindRecordsTerm = function (_QueryTerm4) {
    _inherits(FindRecordsTerm, _QueryTerm4);

    function FindRecordsTerm(type) {
        _classCallCheck(this, FindRecordsTerm);

        var expression = {
            op: 'findRecords',
            type: type
        };
        return _possibleConstructorReturn(this, _QueryTerm4.call(this, expression));
    }
    /**
     * Applies sorting to a collection query.
     *
     * Sort specifiers can be expressed in object form, like:
     *
     * ```ts
     * { attribute: 'name', order: 'descending' }
     * { attribute: 'name', order: 'ascending' }
     * ```
     *
     * Or in string form, like:
     *
     * ```ts
     * '-name' // descending order
     * 'name'  // ascending order
     * ```
     *
     * @param {SortSpecifier[] | string[]} sortSpecifiers
     * @returns {RecordsTerm}
     *
     * @memberOf RecordsTerm
     */

    FindRecordsTerm.prototype.sort = function sort() {
        for (var _len = arguments.length, sortSpecifiers = Array(_len), _key = 0; _key < _len; _key++) {
            sortSpecifiers[_key] = arguments[_key];
        }

        var specifiers = sortSpecifiers.map(parseSortSpecifier);
        this.expression.sort = (this.expression.sort || []).concat(specifiers);
        return this;
    };
    /**
     * Applies pagination to a collection query.
     *
     * Note: Options are currently an opaque pass-through to remote sources.
     *
     * @param {object} options
     * @returns {RecordsTerm}
     *
     * @memberOf RecordsTerm
     */

    FindRecordsTerm.prototype.page = function page(options) {
        this.expression.page = options;
        return this;
    };
    /**
     * Apply an advanced filter expression based on a `RecordCursor`.
     *
     * For example:
     *
     * ```ts
     * oqb
     *   .records('planet')
     *   .filter(record =>
     *     oqb.or(
     *       record.attribute('name').equal('Jupiter'),
     *       record.attribute('name').equal('Pluto')
     *     )
     *   )
     * ```
     *
     * @param {(RecordCursor) => void} predicateExpression
     * @returns {RecordsTerm}
     *
     * @memberOf RecordsTerm
     */

    FindRecordsTerm.prototype.filter = function filter() {
        for (var _len2 = arguments.length, filterSpecifiers = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
            filterSpecifiers[_key2] = arguments[_key2];
        }

        var expressions = filterSpecifiers.map(parseFilterSpecifier);
        this.expression.filter = (this.expression.filter || []).concat(filterSpecifiers);
        return this;
    };

    return FindRecordsTerm;
}(QueryTerm);
function parseFilterSpecifier(filterSpecifier) {
    if ((0, _utils.isObject)(filterSpecifier)) {
        var s = filterSpecifier;
        s.kind = s.kind || 'attribute';
        s.op = s.op || 'equal';
        return s;
    }
}
function parseSortSpecifier(sortSpecifier) {
    if ((0, _utils.isObject)(sortSpecifier)) {
        var s = sortSpecifier;
        s.kind = s.kind || 'attribute';
        s.order = s.order || 'ascending';
        return s;
    } else if (typeof sortSpecifier === 'string') {
        return parseSortSpecifierString(sortSpecifier);
    }
    throw new Error('Sort expression must be either an object or a string.');
}
function parseSortSpecifierString(sortSpecifier) {
    var attribute = void 0;
    var order = void 0;
    if (sortSpecifier[0] === '-') {
        attribute = sortSpecifier.slice(1);
        order = 'descending';
    } else {
        attribute = sortSpecifier;
        order = 'ascending';
    }
    return {
        kind: 'attribute',
        attribute: attribute,
        order: order
    };
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicXVlcnktdGVybS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInNyYy9xdWVyeS10ZXJtLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFBQSxBQUFPLEFBQUUsQUFBUSxBQUFFLEFBQU0sQUFBYyxBQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBSXhDLEFBTUcsQUFDSCxBQUFNOzs7Ozs7O2dEQUdKO3VCQUFZLEFBQTRCOzhCQUN0QyxBQUFJOzthQUFDLEFBQVUsYUFBRyxBQUFVLEFBQUMsQUFDL0IsQUFBQzs7O3dCQUVELEFBQWlCLGlEQUNmLEFBQU07ZUFBQyxBQUFJLEtBQUMsQUFBVSxBQUFDLEFBQ3pCLEFBQUMsQUFDRjs7Ozs7QUFFRCxBQU1HLEFBQ0gsQUFBTTs7Ozs7OztJQUFzQjs4QkFHMUI7OzRCQUFZLEFBQXNCOzhCQUNoQzs7WUFBSSxBQUFVO2dCQUNSLEFBQVksQUFDaEIsQUFBTSxBQUNQLEFBQUM7b0JBSDJCO0FBQzNCLEFBQUU7Z0RBSUosQUFBSyxzQkFBQyxBQUFVLEFBQUMsQUFBQyxBQUNwQixBQUFDLEFBQ0Y7Ozs7RUFYbUMsQUFBUyxBQWE3QyxBQUFNO0lBQTZCO3FDQUdqQzs7bUNBQVksQUFBc0IsUUFBRSxBQUFvQjs4QkFDdEQ7O1lBQUksQUFBVTtnQkFDUixBQUFtQixBQUN2QixBQUFNO29CQUNOLEFBQVksQUFDYixBQUFDOzBCQUprQztBQUNsQyxBQUFFO2dEQUtKLEFBQUssdUJBQUMsQUFBVSxBQUFDLEFBQUMsQUFDcEIsQUFBQyxBQUNGOzs7O0VBWjBDLEFBQVMsQUFjcEQsQUFBTTtJQUE4QjtzQ0FHbEM7O29DQUFZLEFBQXNCLFFBQUUsQUFBb0I7OEJBQ3REOztZQUFJLEFBQVU7Z0JBQ1IsQUFBb0IsQUFDeEIsQUFBTTtvQkFDTixBQUFZLEFBQ2IsQUFBQzswQkFKbUM7QUFDbkMsQUFBRTtnREFLSixBQUFLLHVCQUFDLEFBQVUsQUFBQyxBQUFDLEFBQ3BCLEFBQUMsQUFDRjs7OztFQVoy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MUIsQUFBSztnQkFBRyxBQUFXLEFBQUMsQUFDdEIsQUFBQztBQUVELEFBQU07O2NBQ0UsQUFBVyxBQUNqQixBQUFTO21CQUNULEFBQUssQUFDTixBQUFDLEFBQ0o7ZUFMUyxBQUtSO0FBSkcsQUFBSSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGlzT2JqZWN0IH0gZnJvbSAnQG9yYml0L3V0aWxzJztcbmltcG9ydCB7IFF1ZXJ5RXhwcmVzc2lvbiwgRmluZFJlY29yZCwgRmluZFJlbGF0ZWRSZWNvcmQsIEZpbmRSZWxhdGVkUmVjb3JkcywgRmluZFJlY29yZHMsIFNvcnRTcGVjaWZpZXIsIEF0dHJpYnV0ZVNvcnRTcGVjaWZpZXIsIFBhZ2VTcGVjaWZpZXIsIEZpbHRlclNwZWNpZmllciB9IGZyb20gJy4vcXVlcnktZXhwcmVzc2lvbic7XG5pbXBvcnQgeyBSZWNvcmRJZGVudGl0eSB9IGZyb20gJy4vcmVjb3JkJztcblxuLyoqXG4gKiBRdWVyeSB0ZXJtcyBhcmUgdXNlZCBieSBxdWVyeSBidWlsZGVycyB0byBhbGxvdyBmb3IgdGhlIGNvbnN0cnVjdGlvbiBvZlxuICogcXVlcnkgZXhwcmVzc2lvbnMgaW4gY29tcG9zYWJsZSBwYXR0ZXJucy5cbiAqXG4gKiBAZXhwb3J0XG4gKiBAY2xhc3MgUXVlcnlUZXJtXG4gKi9cbmV4cG9ydCBjbGFzcyBRdWVyeVRlcm0ge1xuICBleHByZXNzaW9uOiBRdWVyeUV4cHJlc3Npb247XG5cbiAgY29uc3RydWN0b3IoZXhwcmVzc2lvbj86IFF1ZXJ5RXhwcmVzc2lvbikge1xuICAgIHRoaXMuZXhwcmVzc2lvbiA9IGV4cHJlc3Npb247XG4gIH1cblxuICB0b1F1ZXJ5RXhwcmVzc2lvbigpOiBRdWVyeUV4cHJlc3Npb24ge1xuICAgIHJldHVybiB0aGlzLmV4cHJlc3Npb247XG4gIH1cbn1cblxuLyoqXG4gKiBBIHF1ZXJ5IHRlcm0gcmVwcmVzZW50aW5nIGEgc2luZ2xlIHJlY29yZC5cbiAqXG4gKiBAZXhwb3J0XG4gKiBAY2xhc3MgRmluZFJlY29yZFRlcm1cbiAqIEBleHRlbmRzIHtRdWVyeVRlcm19XG4gKi9cbmV4cG9ydCBjbGFzcyBGaW5kUmVjb3JkVGVybSBleHRlbmRzIFF1ZXJ5VGVybSB7XG4gIGV4cHJlc3Npb246IEZpbmRSZWNvcmQ7XG5cbiAgY29uc3RydWN0b3IocmVjb3JkOiBSZWNvcmRJZGVudGl0eSkge1xuICAgIGxldCBleHByZXNzaW9uOiBGaW5kUmVjb3JkID0ge1xuICAgICAgb3A6ICdmaW5kUmVjb3JkJyxcbiAgICAgIHJlY29yZFxuICAgIH07XG5cbiAgICBzdXBlcihleHByZXNzaW9uKTtcbiAgfVxufVxuXG5leHBvcnQgY2xhc3MgRmluZFJlbGF0ZWRSZWNvcmRUZXJtIGV4dGVuZHMgUXVlcnlUZXJtIHtcbiAgZXhwcmVzc2lvbjogRmluZFJlbGF0ZWRSZWNvcmQ7XG5cbiAgY29uc3RydWN0b3IocmVjb3JkOiBSZWNvcmRJZGVudGl0eSwgcmVsYXRpb25zaGlwOiBzdHJpbmcpIHtcbiAgICBsZXQgZXhwcmVzc2lvbjogRmluZFJlbGF0ZWRSZWNvcmQgPSB7XG4gICAgICBvcDogJ2ZpbmRSZWxhdGVkUmVjb3JkJyxcbiAgICAgIHJlY29yZCxcbiAgICAgIHJlbGF0aW9uc2hpcFxuICAgIH07XG5cbiAgICBzdXBlcihleHByZXNzaW9uKTtcbiAgfVxufVxuXG5leHBvcnQgY2xhc3MgRmluZFJlbGF0ZWRSZWNvcmRzVGVybSBleHRlbmRzIFF1ZXJ5VGVybSB7XG4gIGV4cHJlc3Npb246IEZpbmRSZWxhdGVkUmVjb3JkcztcblxuICBjb25zdHJ1Y3RvcihyZWNvcmQ6IFJlY29yZElkZW50aXR5LCByZWxhdGlvbnNoaXA6IHN0cmluZykge1xuICAgIGxldCBleHByZXNzaW9uOiBGaW5kUmVsYXRlZFJlY29yZHMgPSB7XG4gICAgICBvcDogJ2ZpbmRSZWxhdGVkUmVjb3JkcycsXG4gICAgICByZWNvcmQsXG4gICAgICByZWxhdGlvbnNoaXBcbiAgICB9O1xuXG4gICAgc3VwZXIoZXhwcmVzc2lvbik7XG4gIH1cbn1cblxuZXhwb3J0IGNsYXNzIEZpbmRSZWNvcmRzVGVybSBleHRlbmRzIFF1ZXJ5VGVybSB7XG4gIGV4cHJlc3Npb246IEZpbmRSZWNvcmRzO1xuXG4gIGNvbnN0cnVjdG9yKHR5cGU/OiBzdHJpbmcpIHtcbiAgICBsZXQgZXhwcmVzc2lvbjogRmluZFJlY29yZHMgPSB7XG4gICAgICBvcDogJ2ZpbmRSZWNvcmRzJyxcbiAgICAgIHR5cGVcbiAgICB9O1xuXG4gICAgc3VwZXIoZXhwcmVzc2lvbik7XG4gIH1cblxuICAvKipcbiAgICogQXBwbGllcyBzb3J0aW5nIHRvIGEgY29sbGVjdGlvbiBxdWVyeS5cbiAgICpcbiAgICogU29ydCBzcGVjaWZpZXJzIGNhbiBiZSBleHByZXNzZWQgaW4gb2JqZWN0IGZvcm0sIGxpa2U6XG4gICAqXG4gICAqIGBgYHRzXG4gICAqIHsgYXR0cmlidXRlOiAnbmFtZScsIG9yZGVyOiAnZGVzY2VuZGluZycgfVxuICAgKiB7IGF0dHJpYnV0ZTogJ25hbWUnLCBvcmRlcjogJ2FzY2VuZGluZycgfVxuICAgKiBgYGBcbiAgICpcbiAgICogT3IgaW4gc3RyaW5nIGZvcm0sIGxpa2U6XG4gICAqXG4gICAqIGBgYHRzXG4gICAqICctbmFtZScgLy8gZGVzY2VuZGluZyBvcmRlclxuICAgKiAnbmFtZScgIC8vIGFzY2VuZGluZyBvcmRlclxuICAgKiBgYGBcbiAgICpcbiAgICogQHBhcmFtIHtTb3J0U3BlY2lmaWVyW10gfCBzdHJpbmdbXX0gc29ydFNwZWNpZmllcnNcbiAgICogQHJldHVybnMge1JlY29yZHNUZXJtfVxuICAgKlxuICAgKiBAbWVtYmVyT2YgUmVjb3Jkc1Rlcm1cbiAgICovXG4gIHNvcnQoLi4uc29ydFNwZWNpZmllcnMpOiBGaW5kUmVjb3Jkc1Rlcm0ge1xuICAgIGNvbnN0IHNwZWNpZmllcnMgPSBzb3J0U3BlY2lmaWVycy5tYXAocGFyc2VTb3J0U3BlY2lmaWVyKTtcbiAgICB0aGlzLmV4cHJlc3Npb24uc29ydCA9ICh0aGlzLmV4cHJlc3Npb24uc29ydCB8fCBbXSkuY29uY2F0KHNwZWNpZmllcnMpO1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgLyoqXG4gICAqIEFwcGxpZXMgcGFnaW5hdGlvbiB0byBhIGNvbGxlY3Rpb24gcXVlcnkuXG4gICAqXG4gICAqIE5vdGU6IE9wdGlvbnMgYXJlIGN1cnJlbnRseSBhbiBvcGFxdWUgcGFzcy10aHJvdWdoIHRvIHJlbW90ZSBzb3VyY2VzLlxuICAgKlxuICAgKiBAcGFyYW0ge29iamVjdH0gb3B0aW9uc1xuICAgKiBAcmV0dXJucyB7UmVjb3Jkc1Rlcm19XG4gICAqXG4gICAqIEBtZW1iZXJPZiBSZWNvcmRzVGVybVxuICAgKi9cbiAgcGFnZShvcHRpb25zOiBQYWdlU3BlY2lmaWVyKTogRmluZFJlY29yZHNUZXJtIHtcbiAgICB0aGlzLmV4cHJlc3Npb24ucGFnZSA9IG9wdGlvbnM7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICAvKipcbiAgICogQXBwbHkgYW4gYWR2YW5jZWQgZmlsdGVyIGV4cHJlc3Npb24gYmFzZWQgb24gYSBgUmVjb3JkQ3Vyc29yYC5cbiAgICpcbiAgICogRm9yIGV4YW1wbGU6XG4gICAqXG4gICAqIGBgYHRzXG4gICAqIG9xYlxuICAgKiAgIC5yZWNvcmRzKCdwbGFuZXQnKVxuICAgKiAgIC5maWx0ZXIocmVjb3JkID0+XG4gICAqICAgICBvcWIub3IoXG4gICAqICAgICAgIHJlY29yZC5hdHRyaWJ1dGUoJ25hbWUnKS5lcXVhbCgnSnVwaXRlcicpLFxuICAgKiAgICAgICByZWNvcmQuYXR0cmlidXRlKCduYW1lJykuZXF1YWwoJ1BsdXRvJylcbiAgICogICAgIClcbiAgICogICApXG4gICAqIGBgYFxuICAgKlxuICAgKiBAcGFyYW0geyhSZWNvcmRDdXJzb3IpID0+IHZvaWR9IHByZWRpY2F0ZUV4cHJlc3Npb25cbiAgICogQHJldHVybnMge1JlY29yZHNUZXJtfVxuICAgKlxuICAgKiBAbWVtYmVyT2YgUmVjb3Jkc1Rlcm1cbiAgICovXG4gIGZpbHRlciguLi5maWx0ZXJTcGVjaWZpZXJzKTogRmluZFJlY29yZHNUZXJtIHtcbiAgICBjb25zdCBleHByZXNzaW9ucyA9IGZpbHRlclNwZWNpZmllcnMubWFwKHBhcnNlRmlsdGVyU3BlY2lmaWVyKTtcbiAgICB0aGlzLmV4cHJlc3Npb24uZmlsdGVyID0gKHRoaXMuZXhwcmVzc2lvbi5maWx0ZXIgfHwgW10pLmNvbmNhdChmaWx0ZXJTcGVjaWZpZXJzKTtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxufVxuXG5mdW5jdGlvbiBwYXJzZUZpbHRlclNwZWNpZmllcihmaWx0ZXJTcGVjaWZpZXI6IEZpbHRlclNwZWNpZmllcik6IEZpbHRlclNwZWNpZmllciB7XG4gIGlmIChpc09iamVjdChmaWx0ZXJTcGVjaWZpZXIpKSB7XG4gICAgbGV0IHMgPSBmaWx0ZXJTcGVjaWZpZXIgYXMgRmlsdGVyU3BlY2lmaWVyO1xuICAgIHMua2luZCA9IHMua2luZCB8fCAnYXR0cmlidXRlJztcbiAgICBzLm9wID0gcy5vcCB8fCAnZXF1YWwnO1xuICAgIHJldHVybiBzO1xuICB9XG59XG5cbmZ1bmN0aW9uIHBhcnNlU29ydFNwZWNpZmllcihzb3J0U3BlY2lmaWVyOiBTb3J0U3BlY2lmaWVyIHwgc3RyaW5nKTogU29ydFNwZWNpZmllciB7XG4gIGlmIChpc09iamVjdChzb3J0U3BlY2lmaWVyKSkge1xuICAgIGxldCBzID0gc29ydFNwZWNpZmllciBhcyBTb3J0U3BlY2lmaWVyO1xuICAgIHMua2luZCA9IHMua2luZCB8fCAnYXR0cmlidXRlJztcbiAgICBzLm9yZGVyID0gcy5vcmRlciB8fCAnYXNjZW5kaW5nJztcbiAgICByZXR1cm4gcztcbiAgfSBlbHNlIGlmICh0eXBlb2Ygc29ydFNwZWNpZmllciA9PT0gJ3N0cmluZycpIHtcbiAgICByZXR1cm4gcGFyc2VTb3J0U3BlY2lmaWVyU3RyaW5nKHNvcnRTcGVjaWZpZXIpO1xuICB9XG4gIHRocm93IG5ldyBFcnJvcignU29ydCBleHByZXNzaW9uIG11c3QgYmUgZWl0aGVyIGFuIG9iamVjdCBvciBhIHN0cmluZy4nKTtcbn1cblxuZnVuY3Rpb24gcGFyc2VTb3J0U3BlY2lmaWVyU3RyaW5nKHNvcnRTcGVjaWZpZXI6IHN0cmluZyk6IEF0dHJpYnV0ZVNvcnRTcGVjaWZpZXIgIHtcbiAgbGV0IGF0dHJpYnV0ZTtcbiAgbGV0IG9yZGVyO1xuXG4gIGlmIChzb3J0U3BlY2lmaWVyWzBdID09PSAnLScpIHtcbiAgICBhdHRyaWJ1dGUgPSBzb3J0U3BlY2lmaWVyLnNsaWNlKDEpO1xuICAgIG9yZGVyID0gJ2Rlc2NlbmRpbmcnO1xuICB9IGVsc2Uge1xuICAgIGF0dHJpYnV0ZSA9IHNvcnRTcGVjaWZpZXI7XG4gICAgb3JkZXIgPSAnYXNjZW5kaW5nJztcbiAgfVxuXG4gIHJldHVybiB7XG4gICAga2luZDogJ2F0dHJpYnV0ZScsXG4gICAgYXR0cmlidXRlLFxuICAgIG9yZGVyXG4gIH07XG59XG4iXX0=