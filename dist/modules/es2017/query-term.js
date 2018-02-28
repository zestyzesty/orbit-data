import { isObject } from '@orbit/utils';
/**
 * Query terms are used by query builders to allow for the construction of
 * query expressions in composable patterns.
 *
 * @export
 * @class QueryTerm
 */
export class QueryTerm {
    constructor(expression) {
        this.expression = expression;
    }
    toQueryExpression() {
        return this.expression;
    }
}
/**
 * A query term representing a single record.
 *
 * @export
 * @class FindRecordTerm
 * @extends {QueryTerm}
 */
export class FindRecordTerm extends QueryTerm {
    constructor(record) {
        let expression = {
            op: 'findRecord',
            record
        };
        super(expression);
    }
}
export class FindRelatedRecordTerm extends QueryTerm {
    constructor(record, relationship) {
        let expression = {
            op: 'findRelatedRecord',
            record,
            relationship
        };
        super(expression);
    }
}
export class FindRelatedRecordsTerm extends QueryTerm {
    constructor(record, relationship) {
        let expression = {
            op: 'findRelatedRecords',
            record,
            relationship
        };
        super(expression);
    }
}
export class FindRecordsTerm extends QueryTerm {
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
function parseFilterSpecifier(filterSpecifier) {
    if (isObject(filterSpecifier)) {
        let s = filterSpecifier;
        s.kind = s.kind || 'attribute';
        s.op = s.op || 'equal';
        return s;
    }
}
function parseSortSpecifier(sortSpecifier) {
    if (isObject(sortSpecifier)) {
        let s = sortSpecifier;
        s.kind = s.kind || 'attribute';
        s.order = s.order || 'ascending';
        return s;
    }
    else if (typeof sortSpecifier === 'string') {
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
    }
    else {
        attribute = sortSpecifier;
        order = 'ascending';
    }
    return {
        kind: 'attribute',
        attribute,
        order
    };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicXVlcnktdGVybS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInNyYy9xdWVyeS10ZXJtLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxjQUFjLENBQUM7QUFJeEM7Ozs7OztHQU1HO0FBQ0gsTUFBTTtJQUdKLFlBQVksVUFBNEI7UUFDdEMsSUFBSSxDQUFDLFVBQVUsR0FBRyxVQUFVLENBQUM7SUFDL0IsQ0FBQztJQUVELGlCQUFpQjtRQUNmLE1BQU0sQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDO0lBQ3pCLENBQUM7Q0FDRjtBQUVEOzs7Ozs7R0FNRztBQUNILE1BQU0scUJBQXNCLFNBQVEsU0FBUztJQUczQyxZQUFZLE1BQXNCO1FBQ2hDLElBQUksVUFBVSxHQUFlO1lBQzNCLEVBQUUsRUFBRSxZQUFZO1lBQ2hCLE1BQU07U0FDUCxDQUFDO1FBRUYsS0FBSyxDQUFDLFVBQVUsQ0FBQyxDQUFDO0lBQ3BCLENBQUM7Q0FDRjtBQUVELE1BQU0sNEJBQTZCLFNBQVEsU0FBUztJQUdsRCxZQUFZLE1BQXNCLEVBQUUsWUFBb0I7UUFDdEQsSUFBSSxVQUFVLEdBQXNCO1lBQ2xDLEVBQUUsRUFBRSxtQkFBbUI7WUFDdkIsTUFBTTtZQUNOLFlBQVk7U0FDYixDQUFDO1FBRUYsS0FBSyxDQUFDLFVBQVUsQ0FBQyxDQUFDO0lBQ3BCLENBQUM7Q0FDRjtBQUVELE1BQU0sNkJBQThCLFNBQVEsU0FBUztJQUduRCxZQUFZLE1BQXNCLEVBQUUsWUFBb0I7UUFDdEQsSUFBSSxVQUFVLEdBQXVCO1lBQ25DLEVBQUUsRUFBRSxvQkFBb0I7WUFDeEIsTUFBTTtZQUNOLFlBQVk7U0FDYixDQUFDO1FBRUYsS0FBSyxDQUFDLFVBQVUsQ0FBQyxDQUFDO0lBQ3BCLENBQUM7Q0FDRjtBQUVELE1BQU0sc0JBQXVCLFNBQVEsU0FBUztJQUc1QyxZQUFZLElBQWE7UUFDdkIsSUFBSSxVQUFVLEdBQWdCO1lBQzVCLEVBQUUsRUFB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WyJpbXBvcnQgeyBpc09iamVjdCB9IGZyb20gJ0BvcmJpdC91dGlscyc7XG5pbXBvcnQgeyBRdWVyeUV4cHJlc3Npb24sIEZpbmRSZWNvcmQsIEZpbmRSZWxhdGVkUmVjb3JkLCBGaW5kUmVsYXRlZFJlY29yZHMsIEZpbmRSZWNvcmRzLCBTb3J0U3BlY2lmaWVyLCBBdHRyaWJ1dGVTb3J0U3BlY2lmaWVyLCBQYWdlU3BlY2lmaWVyLCBGaWx0ZXJTcGVjaWZpZXIgfSBmcm9tICcuL3F1ZXJ5LWV4cHJlc3Npb24nO1xuaW1wb3J0IHsgUmVjb3JkSWRlbnRpdHkgfSBmcm9tICcuL3JlY29yZCc7XG5cbi8qKlxuICogUXVlcnkgdGVybXMgYXJlIHVzZWQgYnkgcXVlcnkgYnVpbGRlcnMgdG8gYWxsb3cgZm9yIHRoZSBjb25zdHJ1Y3Rpb24gb2ZcbiAqIHF1ZXJ5IGV4cHJlc3Npb25zIGluIGNvbXBvc2FibGUgcGF0dGVybnMuXG4gKlxuICogQGV4cG9ydFxuICogQGNsYXNzIFF1ZXJ5VGVybVxuICovXG5leHBvcnQgY2xhc3MgUXVlcnlUZXJtIHtcbiAgZXhwcmVzc2lvbjogUXVlcnlFeHByZXNzaW9uO1xuXG4gIGNvbnN0cnVjdG9yKGV4cHJlc3Npb24/OiBRdWVyeUV4cHJlc3Npb24pIHtcbiAgICB0aGlzLmV4cHJlc3Npb24gPSBleHByZXNzaW9uO1xuICB9XG5cbiAgdG9RdWVyeUV4cHJlc3Npb24oKTogUXVlcnlFeHByZXNzaW9uIHtcbiAgICByZXR1cm4gdGhpcy5leHByZXNzaW9uO1xuICB9XG59XG5cbi8qKlxuICogQSBxdWVyeSB0ZXJtIHJlcHJlc2VudGluZyBhIHNpbmdsZSByZWNvcmQuXG4gKlxuICogQGV4cG9ydFxuICogQGNsYXNzIEZpbmRSZWNvcmRUZXJtXG4gKiBAZXh0ZW5kcyB7UXVlcnlUZXJtfVxuICovXG5leHBvcnQgY2xhc3MgRmluZFJlY29yZFRlcm0gZXh0ZW5kcyBRdWVyeVRlcm0ge1xuICBleHByZXNzaW9uOiBGaW5kUmVjb3JkO1xuXG4gIGNvbnN0cnVjdG9yKHJlY29yZDogUmVjb3JkSWRlbnRpdHkpIHtcbiAgICBsZXQgZXhwcmVzc2lvbjogRmluZFJlY29yZCA9IHtcbiAgICAgIG9wOiAnZmluZFJlY29yZCcsXG4gICAgICByZWNvcmRcbiAgICB9O1xuXG4gICAgc3VwZXIoZXhwcmVzc2lvbik7XG4gIH1cbn1cblxuZXhwb3J0IGNsYXNzIEZpbmRSZWxhdGVkUmVjb3JkVGVybSBleHRlbmRzIFF1ZXJ5VGVybSB7XG4gIGV4cHJlc3Npb246IEZpbmRSZWxhdGVkUmVjb3JkO1xuXG4gIGNvbnN0cnVjdG9yKHJlY29yZDogUmVjb3JkSWRlbnRpdHksIHJlbGF0aW9uc2hpcDogc3RyaW5nKSB7XG4gICAgbGV0IGV4cHJlc3Npb246IEZpbmRSZWxhdGVkUmVjb3JkID0ge1xuICAgICAgb3A6ICdmaW5kUmVsYXRlZFJlY29yZCcsXG4gICAgICByZWNvcmQsXG4gICAgICByZWxhdGlvbnNoaXBcbiAgICB9O1xuXG4gICAgc3VwZXIoZXhwcmVzc2lvbik7XG4gIH1cbn1cblxuZXhwb3J0IGNsYXNzIEZpbmRSZWxhdGVkUmVjb3Jkc1Rlcm0gZXh0ZW5kcyBRdWVyeVRlcm0ge1xuICBleHByZXNzaW9uOiBGaW5kUmVsYXRlZFJlY29yZHM7XG5cbiAgY29uc3RydWN0b3IocmVjb3JkOiBSZWNvcmRJZGVudGl0eSwgcmVsYXRpb25zaGlwOiBzdHJpbmcpIHtcbiAgICBsZXQgZXhwcmVzc2lvbjogRmluZFJlbGF0ZWRSZWNvcmRzID0ge1xuICAgICAgb3A6ICdmaW5kUmVsYXRlZFJlY29yZHMnLFxuICAgICAgcmVjb3JkLFxuICAgICAgcmVsYXRpb25zaGlwXG4gICAgfTtcblxuICAgIHN1cGVyKGV4cHJlc3Npb24pO1xuICB9XG59XG5cbmV4cG9ydCBjbGFzcyBGaW5kUmVjb3Jkc1Rlcm0gZXh0ZW5kcyBRdWVyeVRlcm0ge1xuICBleHByZXNzaW9uOiBGaW5kUmVjb3JkcztcblxuICBjb25zdHJ1Y3Rvcih0eXBlPzogc3RyaW5nKSB7XG4gICAgbGV0IGV4cHJlc3Npb246IEZpbmRSZWNvcmRzID0ge1xuICAgICAgb3A6ICdmaW5kUmVjb3JkcycsXG4gICAgICB0eXBlXG4gICAgfTtcblxuICAgIHN1cGVyKGV4cHJlc3Npb24pO1xuICB9XG5cbiAgLyoqXG4gICAqIEFwcGxpZXMgc29ydGluZyB0byBhIGNvbGxlY3Rpb24gcXVlcnkuXG4gICAqXG4gICAqIFNvcnQgc3BlY2lmaWVycyBjYW4gYmUgZXhwcmVzc2VkIGluIG9iamVjdCBmb3JtLCBsaWtlOlxuICAgKlxuICAgKiBgYGB0c1xuICAgKiB7IGF0dHJpYnV0ZTogJ25hbWUnLCBvcmRlcjogJ2Rlc2NlbmRpbmcnIH1cbiAgICogeyBhdHRyaWJ1dGU6ICduYW1lJywgb3JkZXI6ICdhc2NlbmRpbmcnIH1cbiAgICogYGBgXG4gICAqXG4gICAqIE9yIGluIHN0cmluZyBmb3JtLCBsaWtlOlxuICAgKlxuICAgKiBgYGB0c1xuICAgKiAnLW5hbWUnIC8vIGRlc2NlbmRpbmcgb3JkZXJcbiAgICogJ25hbWUnICAvLyBhc2NlbmRpbmcgb3JkZXJcbiAgICogYGBgXG4gICAqXG4gICAqIEBwYXJhbSB7U29ydFNwZWNpZmllcltdIHwgc3RyaW5nW119IHNvcnRTcGVjaWZpZXJzXG4gICAqIEByZXR1cm5zIHtSZWNvcmRzVGVybX1cbiAgICpcbiAgICogQG1lbWJlck9mIFJlY29yZHNUZXJtXG4gICAqL1xuICBzb3J0KC4uLnNvcnRTcGVjaWZpZXJzKTogRmluZFJlY29yZHNUZXJtIHtcbiAgICBjb25zdCBzcGVjaWZpZXJzID0gc29ydFNwZWNpZmllcnMubWFwKHBhcnNlU29ydFNwZWNpZmllcik7XG4gICAgdGhpcy5leHByZXNzaW9uLnNvcnQgPSAodGhpcy5leHByZXNzaW9uLnNvcnQgfHwgW10pLmNvbmNhdChzcGVjaWZpZXJzKTtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIC8qKlxuICAgKiBBcHBsaWVzIHBhZ2luYXRpb24gdG8gYSBjb2xsZWN0aW9uIHF1ZXJ5LlxuICAgKlxuICAgKiBOb3RlOiBPcHRpb25zIGFyZSBjdXJyZW50bHkgYW4gb3BhcXVlIHBhc3MtdGhyb3VnaCB0byByZW1vdGUgc291cmNlcy5cbiAgICpcbiAgICogQHBhcmFtIHtvYmplY3R9IG9wdGlvbnNcbiAgICogQHJldHVybnMge1JlY29yZHNUZXJtfVxuICAgKlxuICAgKiBAbWVtYmVyT2YgUmVjb3Jkc1Rlcm1cbiAgICovXG4gIHBhZ2Uob3B0aW9uczogUGFnZVNwZWNpZmllcik6IEZpbmRSZWNvcmRzVGVybSB7XG4gICAgdGhpcy5leHByZXNzaW9uLnBhZ2UgPSBvcHRpb25zO1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgLyoqXG4gICAqIEFwcGx5IGFuIGFkdmFuY2VkIGZpbHRlciBleHByZXNzaW9uIGJhc2VkIG9uIGEgYFJlY29yZEN1cnNvcmAuXG4gICAqXG4gICAqIEZvciBleGFtcGxlOlxuICAgKlxuICAgKiBgYGB0c1xuICAgKiBvcWJcbiAgICogICAucmVjb3JkcygncGxhbmV0JylcbiAgICogICAuZmlsdGVyKHJlY29yZCA9PlxuICAgKiAgICAgb3FiLm9yKFxuICAgKiAgICAgICByZWNvcmQuYXR0cmlidXRlKCduYW1lJykuZXF1YWwoJ0p1cGl0ZXInKSxcbiAgICogICAgICAgcmVjb3JkLmF0dHJpYnV0ZSgnbmFtZScpLmVxdWFsKCdQbHV0bycpXG4gICAqICAgICApXG4gICAqICAgKVxuICAgKiBgYGBcbiAgICpcbiAgICogQHBhcmFtIHsoUmVjb3JkQ3Vyc29yKSA9PiB2b2lkfSBwcmVkaWNhdGVFeHByZXNzaW9uXG4gICAqIEByZXR1cm5zIHtSZWNvcmRzVGVybX1cbiAgICpcbiAgICogQG1lbWJlck9mIFJlY29yZHNUZXJtXG4gICAqL1xuICBmaWx0ZXIoLi4uZmlsdGVyU3BlY2lmaWVycyk6IEZpbmRSZWNvcmRzVGVybSB7XG4gICAgY29uc3QgZXhwcmVzc2lvbnMgPSBmaWx0ZXJTcGVjaWZpZXJzLm1hcChwYXJzZUZpbHRlclNwZWNpZmllcik7XG4gICAgdGhpcy5leHByZXNzaW9uLmZpbHRlciA9ICh0aGlzLmV4cHJlc3Npb24uZmlsdGVyIHx8IFtdKS5jb25jYXQoZmlsdGVyU3BlY2lmaWVycyk7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cbn1cblxuZnVuY3Rpb24gcGFyc2VGaWx0ZXJTcGVjaWZpZXIoZmlsdGVyU3BlY2lmaWVyOiBGaWx0ZXJTcGVjaWZpZXIpOiBGaWx0ZXJTcGVjaWZpZXIge1xuICBpZiAoaXNPYmplY3QoZmlsdGVyU3BlY2lmaWVyKSkge1xuICAgIGxldCBzID0gZmlsdGVyU3BlY2lmaWVyIGFzIEZpbHRlclNwZWNpZmllcjtcbiAgICBzLmtpbmQgPSBzLmtpbmQgfHwgJ2F0dHJpYnV0ZSc7XG4gICAgcy5vcCA9IHMub3AgfHwgJ2VxdWFsJztcbiAgICByZXR1cm4gcztcbiAgfVxufVxuXG5mdW5jdGlvbiBwYXJzZVNvcnRTcGVjaWZpZXIoc29ydFNwZWNpZmllcjogU29ydFNwZWNpZmllciB8IHN0cmluZyk6IFNvcnRTcGVjaWZpZXIge1xuICBpZiAoaXNPYmplY3Qoc29ydFNwZWNpZmllcikpIHtcbiAgICBsZXQgcyA9IHNvcnRTcGVjaWZpZXIgYXMgU29ydFNwZWNpZmllcjtcbiAgICBzLmtpbmQgPSBzLmtpbmQgfHwgJ2F0dHJpYnV0ZSc7XG4gICAgcy5vcmRlciA9IHMub3JkZXIgfHwgJ2FzY2VuZGluZyc7XG4gICAgcmV0dXJuIHM7XG4gIH0gZWxzZSBpZiAodHlwZW9mIHNvcnRTcGVjaWZpZXIgPT09ICdzdHJpbmcnKSB7XG4gICAgcmV0dXJuIHBhcnNlU29ydFNwZWNpZmllclN0cmluZyhzb3J0U3BlY2lmaWVyKTtcbiAgfVxuICB0aHJvdyBuZXcgRXJyb3IoJ1NvcnQgZXhwcmVzc2lvbiBtdXN0IGJlIGVpdGhlciBhbiBvYmplY3Qgb3IgYSBzdHJpbmcuJyk7XG59XG5cbmZ1bmN0aW9uIHBhcnNlU29ydFNwZWNpZmllclN0cmluZyhzb3J0U3BlY2lmaWVyOiBzdHJpbmcpOiBBdHRyaWJ1dGVTb3J0U3BlY2lmaWVyICB7XG4gIGxldCBhdHRyaWJ1dGU7XG4gIGxldCBvcmRlcjtcblxuICBpZiAoc29ydFNwZWNpZmllclswXSA9PT0gJy0nKSB7XG4gICAgYXR0cmlidXRlID0gc29ydFNwZWNpZmllci5zbGljZSgxKTtcbiAgICBvcmRlciA9ICdkZXNjZW5kaW5nJztcbiAgfSBlbHNlIHtcbiAgICBhdHRyaWJ1dGUgPSBzb3J0U3BlY2lmaWVyO1xuICAgIG9yZGVyID0gJ2FzY2VuZGluZyc7XG4gIH1cblxuICByZXR1cm4ge1xuICAgIGtpbmQ6ICdhdHRyaWJ1dGUnLFxuICAgIGF0dHJpYnV0ZSxcbiAgICBvcmRlclxuICB9O1xufVxuIl19