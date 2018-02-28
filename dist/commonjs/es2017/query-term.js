'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.FindRecordsTerm = exports.FindRelatedRecordsTerm = exports.FindRelatedRecordTerm = exports.FindRecordTerm = exports.QueryTerm = undefined;

var _utils = require('@orbit/utils');

/**
 * Query terms are used by query builders to allow for the construction of
 * query expressions in composable patterns.
 *
 * @export
 * @class QueryTerm
 */
class QueryTerm {
    constructor(expression) {
        this.expression = expression;
    }
    toQueryExpression() {
        return this.expression;
    }
}
exports.QueryTerm = QueryTerm; /**
                                * A query term representing a single record.
                                *
                                * @export
                                * @class FindRecordTerm
                                * @extends {QueryTerm}
                                */

class FindRecordTerm extends QueryTerm {
    constructor(record) {
        let expression = {
            op: 'findRecord',
            record
        };
        super(expression);
    }
}
exports.FindRecordTerm = FindRecordTerm;
class FindRelatedRecordTerm extends QueryTerm {
    constructor(record, relationship) {
        let expression = {
            op: 'findRelatedRecord',
            record,
            relationship
        };
        super(expression);
    }
}
exports.FindRelatedRecordTerm = FindRelatedRecordTerm;
class FindRelatedRecordsTerm extends QueryTerm {
    constructor(record, relationship) {
        let expression = {
            op: 'findRelatedRecords',
            record,
            relationship
        };
        super(expression);
    }
}
exports.FindRelatedRecordsTerm = FindRelatedRecordsTerm;
class FindRecordsTerm extends QueryTerm {
    constructor(type) {
        let expression = {
            op: 'findRecords',
            type
        };
        super(expression);
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
    sort(...sortSpecifiers) {
        const specifiers = sortSpecifiers.map(parseSortSpecifier);
        this.expression.sort = (this.expression.sort || []).concat(specifiers);
        return this;
    }
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
    page(options) {
        this.expression.page = options;
        return this;
    }
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
    filter(...filterSpecifiers) {
        const expressions = filterSpecifiers.map(parseFilterSpecifier);
        this.expression.filter = (this.expression.filter || []).concat(filterSpecifiers);
        return this;
    }
}
exports.FindRecordsTerm = FindRecordsTerm;
function parseFilterSpecifier(filterSpecifier) {
    if ((0, _utils.isObject)(filterSpecifier)) {
        let s = filterSpecifier;
        s.kind = s.kind || 'attribute';
        s.op = s.op || 'equal';
        return s;
    }
}
function parseSortSpecifier(sortSpecifier) {
    if ((0, _utils.isObject)(sortSpecifier)) {
        let s = sortSpecifier;
        s.kind = s.kind || 'attribute';
        s.order = s.order || 'ascending';
        return s;
    } else if (typeof sortSpecifier === 'string') {
        return parseSortSpecifierString(sortSpecifier);
    }
    throw new Error('Sort expression must be either an object or a string.');
}
function parseSortSpecifierString(sortSpecifier) {
    let attribute;
    let order;
    if (sortSpecifier[0] === '-') {
        attribute = sortSpecifier.slice(1);
        order = 'descending';
    } else {
        attribute = sortSpecifier;
        order = 'ascending';
    }
    return {
        kind: 'attribute',
        attribute,
        order
    };
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicXVlcnktdGVybS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInNyYy9xdWVyeS10ZXJtLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFBQSxBQUFPLEFBQUUsQUFBUSxBQUFFLEFBQU0sQUFBYyxBQUFDOztBQUl4QyxBQU1HLEFBQ0gsQUFBTTs7Ozs7Ozs7QUFHSixnQkFBWSxBQUE0QjtBQUN0QyxBQUFJLGFBQUMsQUFBVSxhQUFHLEFBQVUsQUFBQyxBQUMvQjtBQUFDO0FBRUQsQUFBaUI7QUFDZixBQUFNLGVBQUMsQUFBSSxLQUFDLEFBQVUsQUFBQyxBQUN6QjtBQUFDLEFBQ0Y7OytCQUVELEFBTUcsQUFDSCxBQUFNOzs7Ozs7OztNQUFzQix1QkFBUSxBQUFTO0FBRzNDLGdCQUFZLEFBQXNCO0FBQ2hDLFlBQUksQUFBVTtBQUNaLEFBQUUsZ0JBQUUsQUFBWTtBQUNoQixBQUFNLEFBQ1AsQUFBQztBQUgyQjtBQUs3QixBQUFLLGNBQUMsQUFBVSxBQUFDLEFBQUMsQUFDcEI7QUFBQyxBQUNGLEFBRUQsQUFBTTs7O01BQTZCLDhCQUFRLEFBQVM7QUFHbEQsZ0JBQVksQUFBc0IsUUFBRSxBQUFvQjtBQUN0RCxZQUFJLEFBQVU7QUFDWixBQUFFLGdCQUFFLEFBQW1CO0FBQ3ZCLEFBQU07QUFDTixBQUFZLEFBQ2IsQUFBQztBQUprQztBQU1wQyxBQUFLLGNBQUMsQUFBVSxBQUFDLEFBQUMsQUFDcEI7QUFBQyxBQUNGLEFBRUQsQUFBTTs7O01BQThCLCtCQUFRLEFBQVM7QUFHbkQsZ0JBQVksQUFBc0IsUUFBRSxBQUFvQjtBQUN0RCxZQUFJLEFBQVU7QUFDWixBQUFFLGdCQUFFLEFBQW9CO0FBQ3hCLEFBQU07QUFDTixBQUFZLEFBQ2IsQUFBQztBQUptQztBQU1yQyxBQUFLLGNBQUMsQUFBVSxBQUFDLEFBQUMsQUFDcEI7QUFBQyxBQUNGLEFBRUQsQUFBTTs7O01BQXVCLHdCQUFRLEFBQVM7QUFHNUMsZ0JBQVksQUFBYTtBQUN2QixZQUFJ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QUMsQUFDSjtBQUxTO0FBS1IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBpc09iamVjdCB9IGZyb20gJ0BvcmJpdC91dGlscyc7XG5pbXBvcnQgeyBRdWVyeUV4cHJlc3Npb24sIEZpbmRSZWNvcmQsIEZpbmRSZWxhdGVkUmVjb3JkLCBGaW5kUmVsYXRlZFJlY29yZHMsIEZpbmRSZWNvcmRzLCBTb3J0U3BlY2lmaWVyLCBBdHRyaWJ1dGVTb3J0U3BlY2lmaWVyLCBQYWdlU3BlY2lmaWVyLCBGaWx0ZXJTcGVjaWZpZXIgfSBmcm9tICcuL3F1ZXJ5LWV4cHJlc3Npb24nO1xuaW1wb3J0IHsgUmVjb3JkSWRlbnRpdHkgfSBmcm9tICcuL3JlY29yZCc7XG5cbi8qKlxuICogUXVlcnkgdGVybXMgYXJlIHVzZWQgYnkgcXVlcnkgYnVpbGRlcnMgdG8gYWxsb3cgZm9yIHRoZSBjb25zdHJ1Y3Rpb24gb2ZcbiAqIHF1ZXJ5IGV4cHJlc3Npb25zIGluIGNvbXBvc2FibGUgcGF0dGVybnMuXG4gKlxuICogQGV4cG9ydFxuICogQGNsYXNzIFF1ZXJ5VGVybVxuICovXG5leHBvcnQgY2xhc3MgUXVlcnlUZXJtIHtcbiAgZXhwcmVzc2lvbjogUXVlcnlFeHByZXNzaW9uO1xuXG4gIGNvbnN0cnVjdG9yKGV4cHJlc3Npb24/OiBRdWVyeUV4cHJlc3Npb24pIHtcbiAgICB0aGlzLmV4cHJlc3Npb24gPSBleHByZXNzaW9uO1xuICB9XG5cbiAgdG9RdWVyeUV4cHJlc3Npb24oKTogUXVlcnlFeHByZXNzaW9uIHtcbiAgICByZXR1cm4gdGhpcy5leHByZXNzaW9uO1xuICB9XG59XG5cbi8qKlxuICogQSBxdWVyeSB0ZXJtIHJlcHJlc2VudGluZyBhIHNpbmdsZSByZWNvcmQuXG4gKlxuICogQGV4cG9ydFxuICogQGNsYXNzIEZpbmRSZWNvcmRUZXJtXG4gKiBAZXh0ZW5kcyB7UXVlcnlUZXJtfVxuICovXG5leHBvcnQgY2xhc3MgRmluZFJlY29yZFRlcm0gZXh0ZW5kcyBRdWVyeVRlcm0ge1xuICBleHByZXNzaW9uOiBGaW5kUmVjb3JkO1xuXG4gIGNvbnN0cnVjdG9yKHJlY29yZDogUmVjb3JkSWRlbnRpdHkpIHtcbiAgICBsZXQgZXhwcmVzc2lvbjogRmluZFJlY29yZCA9IHtcbiAgICAgIG9wOiAnZmluZFJlY29yZCcsXG4gICAgICByZWNvcmRcbiAgICB9O1xuXG4gICAgc3VwZXIoZXhwcmVzc2lvbik7XG4gIH1cbn1cblxuZXhwb3J0IGNsYXNzIEZpbmRSZWxhdGVkUmVjb3JkVGVybSBleHRlbmRzIFF1ZXJ5VGVybSB7XG4gIGV4cHJlc3Npb246IEZpbmRSZWxhdGVkUmVjb3JkO1xuXG4gIGNvbnN0cnVjdG9yKHJlY29yZDogUmVjb3JkSWRlbnRpdHksIHJlbGF0aW9uc2hpcDogc3RyaW5nKSB7XG4gICAgbGV0IGV4cHJlc3Npb246IEZpbmRSZWxhdGVkUmVjb3JkID0ge1xuICAgICAgb3A6ICdmaW5kUmVsYXRlZFJlY29yZCcsXG4gICAgICByZWNvcmQsXG4gICAgICByZWxhdGlvbnNoaXBcbiAgICB9O1xuXG4gICAgc3VwZXIoZXhwcmVzc2lvbik7XG4gIH1cbn1cblxuZXhwb3J0IGNsYXNzIEZpbmRSZWxhdGVkUmVjb3Jkc1Rlcm0gZXh0ZW5kcyBRdWVyeVRlcm0ge1xuICBleHByZXNzaW9uOiBGaW5kUmVsYXRlZFJlY29yZHM7XG5cbiAgY29uc3RydWN0b3IocmVjb3JkOiBSZWNvcmRJZGVudGl0eSwgcmVsYXRpb25zaGlwOiBzdHJpbmcpIHtcbiAgICBsZXQgZXhwcmVzc2lvbjogRmluZFJlbGF0ZWRSZWNvcmRzID0ge1xuICAgICAgb3A6ICdmaW5kUmVsYXRlZFJlY29yZHMnLFxuICAgICAgcmVjb3JkLFxuICAgICAgcmVsYXRpb25zaGlwXG4gICAgfTtcblxuICAgIHN1cGVyKGV4cHJlc3Npb24pO1xuICB9XG59XG5cbmV4cG9ydCBjbGFzcyBGaW5kUmVjb3Jkc1Rlcm0gZXh0ZW5kcyBRdWVyeVRlcm0ge1xuICBleHByZXNzaW9uOiBGaW5kUmVjb3JkcztcblxuICBjb25zdHJ1Y3Rvcih0eXBlPzogc3RyaW5nKSB7XG4gICAgbGV0IGV4cHJlc3Npb246IEZpbmRSZWNvcmRzID0ge1xuICAgICAgb3A6ICdmaW5kUmVjb3JkcycsXG4gICAgICB0eXBlXG4gICAgfTtcblxuICAgIHN1cGVyKGV4cHJlc3Npb24pO1xuICB9XG5cbiAgLyoqXG4gICAqIEFwcGxpZXMgc29ydGluZyB0byBhIGNvbGxlY3Rpb24gcXVlcnkuXG4gICAqXG4gICAqIFNvcnQgc3BlY2lmaWVycyBjYW4gYmUgZXhwcmVzc2VkIGluIG9iamVjdCBmb3JtLCBsaWtlOlxuICAgKlxuICAgKiBgYGB0c1xuICAgKiB7IGF0dHJpYnV0ZTogJ25hbWUnLCBvcmRlcjogJ2Rlc2NlbmRpbmcnIH1cbiAgICogeyBhdHRyaWJ1dGU6ICduYW1lJywgb3JkZXI6ICdhc2NlbmRpbmcnIH1cbiAgICogYGBgXG4gICAqXG4gICAqIE9yIGluIHN0cmluZyBmb3JtLCBsaWtlOlxuICAgKlxuICAgKiBgYGB0c1xuICAgKiAnLW5hbWUnIC8vIGRlc2NlbmRpbmcgb3JkZXJcbiAgICogJ25hbWUnICAvLyBhc2NlbmRpbmcgb3JkZXJcbiAgICogYGBgXG4gICAqXG4gICAqIEBwYXJhbSB7U29ydFNwZWNpZmllcltdIHwgc3RyaW5nW119IHNvcnRTcGVjaWZpZXJzXG4gICAqIEByZXR1cm5zIHtSZWNvcmRzVGVybX1cbiAgICpcbiAgICogQG1lbWJlck9mIFJlY29yZHNUZXJtXG4gICAqL1xuICBzb3J0KC4uLnNvcnRTcGVjaWZpZXJzKTogRmluZFJlY29yZHNUZXJtIHtcbiAgICBjb25zdCBzcGVjaWZpZXJzID0gc29ydFNwZWNpZmllcnMubWFwKHBhcnNlU29ydFNwZWNpZmllcik7XG4gICAgdGhpcy5leHByZXNzaW9uLnNvcnQgPSAodGhpcy5leHByZXNzaW9uLnNvcnQgfHwgW10pLmNvbmNhdChzcGVjaWZpZXJzKTtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIC8qKlxuICAgKiBBcHBsaWVzIHBhZ2luYXRpb24gdG8gYSBjb2xsZWN0aW9uIHF1ZXJ5LlxuICAgKlxuICAgKiBOb3RlOiBPcHRpb25zIGFyZSBjdXJyZW50bHkgYW4gb3BhcXVlIHBhc3MtdGhyb3VnaCB0byByZW1vdGUgc291cmNlcy5cbiAgICpcbiAgICogQHBhcmFtIHtvYmplY3R9IG9wdGlvbnNcbiAgICogQHJldHVybnMge1JlY29yZHNUZXJtfVxuICAgKlxuICAgKiBAbWVtYmVyT2YgUmVjb3Jkc1Rlcm1cbiAgICovXG4gIHBhZ2Uob3B0aW9uczogUGFnZVNwZWNpZmllcik6IEZpbmRSZWNvcmRzVGVybSB7XG4gICAgdGhpcy5leHByZXNzaW9uLnBhZ2UgPSBvcHRpb25zO1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgLyoqXG4gICAqIEFwcGx5IGFuIGFkdmFuY2VkIGZpbHRlciBleHByZXNzaW9uIGJhc2VkIG9uIGEgYFJlY29yZEN1cnNvcmAuXG4gICAqXG4gICAqIEZvciBleGFtcGxlOlxuICAgKlxuICAgKiBgYGB0c1xuICAgKiBvcWJcbiAgICogICAucmVjb3JkcygncGxhbmV0JylcbiAgICogICAuZmlsdGVyKHJlY29yZCA9PlxuICAgKiAgICAgb3FiLm9yKFxuICAgKiAgICAgICByZWNvcmQuYXR0cmlidXRlKCduYW1lJykuZXF1YWwoJ0p1cGl0ZXInKSxcbiAgICogICAgICAgcmVjb3JkLmF0dHJpYnV0ZSgnbmFtZScpLmVxdWFsKCdQbHV0bycpXG4gICAqICAgICApXG4gICAqICAgKVxuICAgKiBgYGBcbiAgICpcbiAgICogQHBhcmFtIHsoUmVjb3JkQ3Vyc29yKSA9PiB2b2lkfSBwcmVkaWNhdGVFeHByZXNzaW9uXG4gICAqIEByZXR1cm5zIHtSZWNvcmRzVGVybX1cbiAgICpcbiAgICogQG1lbWJlck9mIFJlY29yZHNUZXJtXG4gICAqL1xuICBmaWx0ZXIoLi4uZmlsdGVyU3BlY2lmaWVycyk6IEZpbmRSZWNvcmRzVGVybSB7XG4gICAgY29uc3QgZXhwcmVzc2lvbnMgPSBmaWx0ZXJTcGVjaWZpZXJzLm1hcChwYXJzZUZpbHRlclNwZWNpZmllcik7XG4gICAgdGhpcy5leHByZXNzaW9uLmZpbHRlciA9ICh0aGlzLmV4cHJlc3Npb24uZmlsdGVyIHx8IFtdKS5jb25jYXQoZmlsdGVyU3BlY2lmaWVycyk7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cbn1cblxuZnVuY3Rpb24gcGFyc2VGaWx0ZXJTcGVjaWZpZXIoZmlsdGVyU3BlY2lmaWVyOiBGaWx0ZXJTcGVjaWZpZXIpOiBGaWx0ZXJTcGVjaWZpZXIge1xuICBpZiAoaXNPYmplY3QoZmlsdGVyU3BlY2lmaWVyKSkge1xuICAgIGxldCBzID0gZmlsdGVyU3BlY2lmaWVyIGFzIEZpbHRlclNwZWNpZmllcjtcbiAgICBzLmtpbmQgPSBzLmtpbmQgfHwgJ2F0dHJpYnV0ZSc7XG4gICAgcy5vcCA9IHMub3AgfHwgJ2VxdWFsJztcbiAgICByZXR1cm4gcztcbiAgfVxufVxuXG5mdW5jdGlvbiBwYXJzZVNvcnRTcGVjaWZpZXIoc29ydFNwZWNpZmllcjogU29ydFNwZWNpZmllciB8IHN0cmluZyk6IFNvcnRTcGVjaWZpZXIge1xuICBpZiAoaXNPYmplY3Qoc29ydFNwZWNpZmllcikpIHtcbiAgICBsZXQgcyA9IHNvcnRTcGVjaWZpZXIgYXMgU29ydFNwZWNpZmllcjtcbiAgICBzLmtpbmQgPSBzLmtpbmQgfHwgJ2F0dHJpYnV0ZSc7XG4gICAgcy5vcmRlciA9IHMub3JkZXIgfHwgJ2FzY2VuZGluZyc7XG4gICAgcmV0dXJuIHM7XG4gIH0gZWxzZSBpZiAodHlwZW9mIHNvcnRTcGVjaWZpZXIgPT09ICdzdHJpbmcnKSB7XG4gICAgcmV0dXJuIHBhcnNlU29ydFNwZWNpZmllclN0cmluZyhzb3J0U3BlY2lmaWVyKTtcbiAgfVxuICB0aHJvdyBuZXcgRXJyb3IoJ1NvcnQgZXhwcmVzc2lvbiBtdXN0IGJlIGVpdGhlciBhbiBvYmplY3Qgb3IgYSBzdHJpbmcuJyk7XG59XG5cbmZ1bmN0aW9uIHBhcnNlU29ydFNwZWNpZmllclN0cmluZyhzb3J0U3BlY2lmaWVyOiBzdHJpbmcpOiBBdHRyaWJ1dGVTb3J0U3BlY2lmaWVyICB7XG4gIGxldCBhdHRyaWJ1dGU7XG4gIGxldCBvcmRlcjtcblxuICBpZiAoc29ydFNwZWNpZmllclswXSA9PT0gJy0nKSB7XG4gICAgYXR0cmlidXRlID0gc29ydFNwZWNpZmllci5zbGljZSgxKTtcbiAgICBvcmRlciA9ICdkZXNjZW5kaW5nJztcbiAgfSBlbHNlIHtcbiAgICBhdHRyaWJ1dGUgPSBzb3J0U3BlY2lmaWVyO1xuICAgIG9yZGVyID0gJ2FzY2VuZGluZyc7XG4gIH1cblxuICByZXR1cm4ge1xuICAgIGtpbmQ6ICdhdHRyaWJ1dGUnLFxuICAgIGF0dHJpYnV0ZSxcbiAgICBvcmRlclxuICB9O1xufVxuIl19