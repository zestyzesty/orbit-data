function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

import { isObject } from '@orbit/utils';
/**
 * Query terms are used by query builders to allow for the construction of
 * query expressions in composable patterns.
 *
 * @export
 * @class QueryTerm
 */
export var QueryTerm = function () {
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
export var FindRecordTerm = function (_QueryTerm) {
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
export var FindRelatedRecordTerm = function (_QueryTerm2) {
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
export var FindRelatedRecordsTerm = function (_QueryTerm3) {
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
export var FindRecordsTerm = function (_QueryTerm4) {
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
    if (isObject(filterSpecifier)) {
        var s = filterSpecifier;
        s.kind = s.kind || 'attribute';
        s.op = s.op || 'equal';
        return s;
    }
}
function parseSortSpecifier(sortSpecifier) {
    if (isObject(sortSpecifier)) {
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicXVlcnktdGVybS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInNyYy9xdWVyeS10ZXJtLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUEsQUFBTyxTQUFFLEFBQVEsQUFBRSxnQkFBTSxBQUFjLEFBQUM7QUFJeEMsQUFNRzs7Ozs7OztBQUNILEFBQU07QUFHSix1QkFBWSxBQUE0Qjs7O0FBQ3RDLEFBQUksYUFBQyxBQUFVLGFBQUcsQUFBVSxBQUFDLEFBQy9CO0FBQUM7O3dCQUVELEFBQWlCO0FBQ2YsQUFBTSxlQUFDLEFBQUksS0FBQyxBQUFVLEFBQUMsQUFDekI7QUFBQyxBQUNGOzs7O0FBRUQsQUFNRzs7Ozs7OztBQUNILEFBQU0sV0FBc0I7OztBQUcxQiw0QkFBWSxBQUFzQjs7O0FBQ2hDLFlBQUksQUFBVTtBQUNaLEFBQUUsZ0JBQUUsQUFBWTtBQUNoQixBQUFNLEFBQ1AsQUFBQztBQUgyQjtnREFLN0IsQUFBSyxzQkFBQyxBQUFVLEFBQUMsQUFBQyxBQUNwQjtBQUFDLEFBQ0Y7OztFQVhtQyxBQUFTO0FBYTdDLEFBQU0sV0FBNkI7OztBQUdqQyxtQ0FBWSxBQUFzQixRQUFFLEFBQW9COzs7QUFDdEQsWUFBSSxBQUFVO0FBQ1osQUFBRSxnQkFBRSxBQUFtQjtBQUN2QixBQUFNO0FBQ04sQUFBWSxBQUNiLEFBQUM7QUFKa0M7Z0RBTXBDLEFBQUssdUJBQUMsQUFBVSxBQUFDLEFBQUMsQUFDcEI7QUFBQyxBQUNGOzs7RUFaMEMsQUFBUztBQWNwRCxBQUFNLFdBQThCOzs7QUFHbEMsb0NBQVksQUFBc0IsUUFBRSxBQUFvQjs7O0FBQ3RELFlBQUksQUFBVTtBQUNaLEFBQUUsZ0JBQUUsQUFBb0I7QUFDeEIsQUFBTTtBQUNOLEFBQVksQUFDYixBQUFDO0FBSm1DO2dEQU1yQyxBQUFLLHVCQUFDLEFBQVUsQUFBQyxBQUFDLEFBQ3BCO0FBQUMsQUFDRjs7O0VBWjJDLEFBQVM7QUFjckQsQUFBTSxXQUF1Qjs7O0FBRzNCLDZCQUFZ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QUFDSixBQUFJLGNBQUUsQUFBVztBQUNqQixBQUFTO0FBQ1QsQUFBSyxBQUNOLEFBQUMsQUFDSjtBQUxTO0FBS1IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBpc09iamVjdCB9IGZyb20gJ0BvcmJpdC91dGlscyc7XG5pbXBvcnQgeyBRdWVyeUV4cHJlc3Npb24sIEZpbmRSZWNvcmQsIEZpbmRSZWxhdGVkUmVjb3JkLCBGaW5kUmVsYXRlZFJlY29yZHMsIEZpbmRSZWNvcmRzLCBTb3J0U3BlY2lmaWVyLCBBdHRyaWJ1dGVTb3J0U3BlY2lmaWVyLCBQYWdlU3BlY2lmaWVyLCBGaWx0ZXJTcGVjaWZpZXIgfSBmcm9tICcuL3F1ZXJ5LWV4cHJlc3Npb24nO1xuaW1wb3J0IHsgUmVjb3JkSWRlbnRpdHkgfSBmcm9tICcuL3JlY29yZCc7XG5cbi8qKlxuICogUXVlcnkgdGVybXMgYXJlIHVzZWQgYnkgcXVlcnkgYnVpbGRlcnMgdG8gYWxsb3cgZm9yIHRoZSBjb25zdHJ1Y3Rpb24gb2ZcbiAqIHF1ZXJ5IGV4cHJlc3Npb25zIGluIGNvbXBvc2FibGUgcGF0dGVybnMuXG4gKlxuICogQGV4cG9ydFxuICogQGNsYXNzIFF1ZXJ5VGVybVxuICovXG5leHBvcnQgY2xhc3MgUXVlcnlUZXJtIHtcbiAgZXhwcmVzc2lvbjogUXVlcnlFeHByZXNzaW9uO1xuXG4gIGNvbnN0cnVjdG9yKGV4cHJlc3Npb24/OiBRdWVyeUV4cHJlc3Npb24pIHtcbiAgICB0aGlzLmV4cHJlc3Npb24gPSBleHByZXNzaW9uO1xuICB9XG5cbiAgdG9RdWVyeUV4cHJlc3Npb24oKTogUXVlcnlFeHByZXNzaW9uIHtcbiAgICByZXR1cm4gdGhpcy5leHByZXNzaW9uO1xuICB9XG59XG5cbi8qKlxuICogQSBxdWVyeSB0ZXJtIHJlcHJlc2VudGluZyBhIHNpbmdsZSByZWNvcmQuXG4gKlxuICogQGV4cG9ydFxuICogQGNsYXNzIEZpbmRSZWNvcmRUZXJtXG4gKiBAZXh0ZW5kcyB7UXVlcnlUZXJtfVxuICovXG5leHBvcnQgY2xhc3MgRmluZFJlY29yZFRlcm0gZXh0ZW5kcyBRdWVyeVRlcm0ge1xuICBleHByZXNzaW9uOiBGaW5kUmVjb3JkO1xuXG4gIGNvbnN0cnVjdG9yKHJlY29yZDogUmVjb3JkSWRlbnRpdHkpIHtcbiAgICBsZXQgZXhwcmVzc2lvbjogRmluZFJlY29yZCA9IHtcbiAgICAgIG9wOiAnZmluZFJlY29yZCcsXG4gICAgICByZWNvcmRcbiAgICB9O1xuXG4gICAgc3VwZXIoZXhwcmVzc2lvbik7XG4gIH1cbn1cblxuZXhwb3J0IGNsYXNzIEZpbmRSZWxhdGVkUmVjb3JkVGVybSBleHRlbmRzIFF1ZXJ5VGVybSB7XG4gIGV4cHJlc3Npb246IEZpbmRSZWxhdGVkUmVjb3JkO1xuXG4gIGNvbnN0cnVjdG9yKHJlY29yZDogUmVjb3JkSWRlbnRpdHksIHJlbGF0aW9uc2hpcDogc3RyaW5nKSB7XG4gICAgbGV0IGV4cHJlc3Npb246IEZpbmRSZWxhdGVkUmVjb3JkID0ge1xuICAgICAgb3A6ICdmaW5kUmVsYXRlZFJlY29yZCcsXG4gICAgICByZWNvcmQsXG4gICAgICByZWxhdGlvbnNoaXBcbiAgICB9O1xuXG4gICAgc3VwZXIoZXhwcmVzc2lvbik7XG4gIH1cbn1cblxuZXhwb3J0IGNsYXNzIEZpbmRSZWxhdGVkUmVjb3Jkc1Rlcm0gZXh0ZW5kcyBRdWVyeVRlcm0ge1xuICBleHByZXNzaW9uOiBGaW5kUmVsYXRlZFJlY29yZHM7XG5cbiAgY29uc3RydWN0b3IocmVjb3JkOiBSZWNvcmRJZGVudGl0eSwgcmVsYXRpb25zaGlwOiBzdHJpbmcpIHtcbiAgICBsZXQgZXhwcmVzc2lvbjogRmluZFJlbGF0ZWRSZWNvcmRzID0ge1xuICAgICAgb3A6ICdmaW5kUmVsYXRlZFJlY29yZHMnLFxuICAgICAgcmVjb3JkLFxuICAgICAgcmVsYXRpb25zaGlwXG4gICAgfTtcblxuICAgIHN1cGVyKGV4cHJlc3Npb24pO1xuICB9XG59XG5cbmV4cG9ydCBjbGFzcyBGaW5kUmVjb3Jkc1Rlcm0gZXh0ZW5kcyBRdWVyeVRlcm0ge1xuICBleHByZXNzaW9uOiBGaW5kUmVjb3JkcztcblxuICBjb25zdHJ1Y3Rvcih0eXBlPzogc3RyaW5nKSB7XG4gICAgbGV0IGV4cHJlc3Npb246IEZpbmRSZWNvcmRzID0ge1xuICAgICAgb3A6ICdmaW5kUmVjb3JkcycsXG4gICAgICB0eXBlXG4gICAgfTtcblxuICAgIHN1cGVyKGV4cHJlc3Npb24pO1xuICB9XG5cbiAgLyoqXG4gICAqIEFwcGxpZXMgc29ydGluZyB0byBhIGNvbGxlY3Rpb24gcXVlcnkuXG4gICAqXG4gICAqIFNvcnQgc3BlY2lmaWVycyBjYW4gYmUgZXhwcmVzc2VkIGluIG9iamVjdCBmb3JtLCBsaWtlOlxuICAgKlxuICAgKiBgYGB0c1xuICAgKiB7IGF0dHJpYnV0ZTogJ25hbWUnLCBvcmRlcjogJ2Rlc2NlbmRpbmcnIH1cbiAgICogeyBhdHRyaWJ1dGU6ICduYW1lJywgb3JkZXI6ICdhc2NlbmRpbmcnIH1cbiAgICogYGBgXG4gICAqXG4gICAqIE9yIGluIHN0cmluZyBmb3JtLCBsaWtlOlxuICAgKlxuICAgKiBgYGB0c1xuICAgKiAnLW5hbWUnIC8vIGRlc2NlbmRpbmcgb3JkZXJcbiAgICogJ25hbWUnICAvLyBhc2NlbmRpbmcgb3JkZXJcbiAgICogYGBgXG4gICAqXG4gICAqIEBwYXJhbSB7U29ydFNwZWNpZmllcltdIHwgc3RyaW5nW119IHNvcnRTcGVjaWZpZXJzXG4gICAqIEByZXR1cm5zIHtSZWNvcmRzVGVybX1cbiAgICpcbiAgICogQG1lbWJlck9mIFJlY29yZHNUZXJtXG4gICAqL1xuICBzb3J0KC4uLnNvcnRTcGVjaWZpZXJzKTogRmluZFJlY29yZHNUZXJtIHtcbiAgICBjb25zdCBzcGVjaWZpZXJzID0gc29ydFNwZWNpZmllcnMubWFwKHBhcnNlU29ydFNwZWNpZmllcik7XG4gICAgdGhpcy5leHByZXNzaW9uLnNvcnQgPSAodGhpcy5leHByZXNzaW9uLnNvcnQgfHwgW10pLmNvbmNhdChzcGVjaWZpZXJzKTtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIC8qKlxuICAgKiBBcHBsaWVzIHBhZ2luYXRpb24gdG8gYSBjb2xsZWN0aW9uIHF1ZXJ5LlxuICAgKlxuICAgKiBOb3RlOiBPcHRpb25zIGFyZSBjdXJyZW50bHkgYW4gb3BhcXVlIHBhc3MtdGhyb3VnaCB0byByZW1vdGUgc291cmNlcy5cbiAgICpcbiAgICogQHBhcmFtIHtvYmplY3R9IG9wdGlvbnNcbiAgICogQHJldHVybnMge1JlY29yZHNUZXJtfVxuICAgKlxuICAgKiBAbWVtYmVyT2YgUmVjb3Jkc1Rlcm1cbiAgICovXG4gIHBhZ2Uob3B0aW9uczogUGFnZVNwZWNpZmllcik6IEZpbmRSZWNvcmRzVGVybSB7XG4gICAgdGhpcy5leHByZXNzaW9uLnBhZ2UgPSBvcHRpb25zO1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgLyoqXG4gICAqIEFwcGx5IGFuIGFkdmFuY2VkIGZpbHRlciBleHByZXNzaW9uIGJhc2VkIG9uIGEgYFJlY29yZEN1cnNvcmAuXG4gICAqXG4gICAqIEZvciBleGFtcGxlOlxuICAgKlxuICAgKiBgYGB0c1xuICAgKiBvcWJcbiAgICogICAucmVjb3JkcygncGxhbmV0JylcbiAgICogICAuZmlsdGVyKHJlY29yZCA9PlxuICAgKiAgICAgb3FiLm9yKFxuICAgKiAgICAgICByZWNvcmQuYXR0cmlidXRlKCduYW1lJykuZXF1YWwoJ0p1cGl0ZXInKSxcbiAgICogICAgICAgcmVjb3JkLmF0dHJpYnV0ZSgnbmFtZScpLmVxdWFsKCdQbHV0bycpXG4gICAqICAgICApXG4gICAqICAgKVxuICAgKiBgYGBcbiAgICpcbiAgICogQHBhcmFtIHsoUmVjb3JkQ3Vyc29yKSA9PiB2b2lkfSBwcmVkaWNhdGVFeHByZXNzaW9uXG4gICAqIEByZXR1cm5zIHtSZWNvcmRzVGVybX1cbiAgICpcbiAgICogQG1lbWJlck9mIFJlY29yZHNUZXJtXG4gICAqL1xuICBmaWx0ZXIoLi4uZmlsdGVyU3BlY2lmaWVycyk6IEZpbmRSZWNvcmRzVGVybSB7XG4gICAgY29uc3QgZXhwcmVzc2lvbnMgPSBmaWx0ZXJTcGVjaWZpZXJzLm1hcChwYXJzZUZpbHRlclNwZWNpZmllcik7XG4gICAgdGhpcy5leHByZXNzaW9uLmZpbHRlciA9ICh0aGlzLmV4cHJlc3Npb24uZmlsdGVyIHx8IFtdKS5jb25jYXQoZmlsdGVyU3BlY2lmaWVycyk7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cbn1cblxuZnVuY3Rpb24gcGFyc2VGaWx0ZXJTcGVjaWZpZXIoZmlsdGVyU3BlY2lmaWVyOiBGaWx0ZXJTcGVjaWZpZXIpOiBGaWx0ZXJTcGVjaWZpZXIge1xuICBpZiAoaXNPYmplY3QoZmlsdGVyU3BlY2lmaWVyKSkge1xuICAgIGxldCBzID0gZmlsdGVyU3BlY2lmaWVyIGFzIEZpbHRlclNwZWNpZmllcjtcbiAgICBzLmtpbmQgPSBzLmtpbmQgfHwgJ2F0dHJpYnV0ZSc7XG4gICAgcy5vcCA9IHMub3AgfHwgJ2VxdWFsJztcbiAgICByZXR1cm4gcztcbiAgfVxufVxuXG5mdW5jdGlvbiBwYXJzZVNvcnRTcGVjaWZpZXIoc29ydFNwZWNpZmllcjogU29ydFNwZWNpZmllciB8IHN0cmluZyk6IFNvcnRTcGVjaWZpZXIge1xuICBpZiAoaXNPYmplY3Qoc29ydFNwZWNpZmllcikpIHtcbiAgICBsZXQgcyA9IHNvcnRTcGVjaWZpZXIgYXMgU29ydFNwZWNpZmllcjtcbiAgICBzLmtpbmQgPSBzLmtpbmQgfHwgJ2F0dHJpYnV0ZSc7XG4gICAgcy5vcmRlciA9IHMub3JkZXIgfHwgJ2FzY2VuZGluZyc7XG4gICAgcmV0dXJuIHM7XG4gIH0gZWxzZSBpZiAodHlwZW9mIHNvcnRTcGVjaWZpZXIgPT09ICdzdHJpbmcnKSB7XG4gICAgcmV0dXJuIHBhcnNlU29ydFNwZWNpZmllclN0cmluZyhzb3J0U3BlY2lmaWVyKTtcbiAgfVxuICB0aHJvdyBuZXcgRXJyb3IoJ1NvcnQgZXhwcmVzc2lvbiBtdXN0IGJlIGVpdGhlciBhbiBvYmplY3Qgb3IgYSBzdHJpbmcuJyk7XG59XG5cbmZ1bmN0aW9uIHBhcnNlU29ydFNwZWNpZmllclN0cmluZyhzb3J0U3BlY2lmaWVyOiBzdHJpbmcpOiBBdHRyaWJ1dGVTb3J0U3BlY2lmaWVyICB7XG4gIGxldCBhdHRyaWJ1dGU7XG4gIGxldCBvcmRlcjtcblxuICBpZiAoc29ydFNwZWNpZmllclswXSA9PT0gJy0nKSB7XG4gICAgYXR0cmlidXRlID0gc29ydFNwZWNpZmllci5zbGljZSgxKTtcbiAgICBvcmRlciA9ICdkZXNjZW5kaW5nJztcbiAgfSBlbHNlIHtcbiAgICBhdHRyaWJ1dGUgPSBzb3J0U3BlY2lmaWVyO1xuICAgIG9yZGVyID0gJ2FzY2VuZGluZyc7XG4gIH1cblxuICByZXR1cm4ge1xuICAgIGtpbmQ6ICdhdHRyaWJ1dGUnLFxuICAgIGF0dHJpYnV0ZSxcbiAgICBvcmRlclxuICB9O1xufVxuIl19