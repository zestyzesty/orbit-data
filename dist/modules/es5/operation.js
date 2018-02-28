import { cloneRecordIdentity, equalRecordIdentities } from './record';
import { eq, deepGet, deepSet } from '@orbit/utils';
function markOperationToDelete(operation) {
    var o = operation;
    o._deleted = true;
}
function isOperationMarkedToDelete(operation) {
    var o = operation;
    return o._deleted === true;
}
function mergeOperations(superceded, superceding, consecutiveOps) {
    if (equalRecordIdentities(superceded.record, superceding.record)) {
        if (superceding.op === 'removeRecord') {
            markOperationToDelete(superceded);
            if (superceded.op === 'addRecord') {
                markOperationToDelete(superceding);
            }
        } else if (!isOperationMarkedToDelete(superceding) && (consecutiveOps || superceding.op === 'replaceAttribute')) {
            if (isReplaceFieldOp(superceded.op) && isReplaceFieldOp(superceding.op)) {
                if (superceded.op === 'replaceAttribute' && superceding.op === 'replaceAttribute' && superceded.attribute === superceding.attribute) {
                    markOperationToDelete(superceded);
                } else if (superceded.op === 'replaceRelatedRecord' && superceding.op === 'replaceRelatedRecord' && superceded.relationship === superceding.relationship) {
                    markOperationToDelete(superceded);
                } else if (superceded.op === 'replaceRelatedRecords' && superceding.op === 'replaceRelatedRecords' && superceded.relationship === superceding.relationship) {
                    markOperationToDelete(superceded);
                } else {
                    if (superceded.op === 'replaceAttribute') {
                        updateRecordReplaceAttribute(superceded.record, superceded.attribute, superceded.value);
                        delete superceded.attribute;
                        delete superceded.value;
                    } else if (superceded.op === 'replaceRelatedRecord') {
                        updateRecordReplaceHasOne(superceded.record, superceded.relationship, superceded.relatedRecord);
                        delete superceded.relationship;
                        delete superceded.relatedRecord;
                    } else if (superceded.op === 'replaceRelatedRecords') {
                        updateRecordReplaceHasMany(superceded.record, superceded.relationship, superceded.relatedRecords);
                        delete superceded.relationship;
                        delete superceded.relatedRecords;
                    }
                    if (superceding.op === 'replaceAttribute') {
                        updateRecordReplaceAttribute(superceded.record, superceding.attribute, superceding.value);
                    } else if (superceding.op === 'replaceRelatedRecord') {
                        updateRecordReplaceHasOne(superceded.record, superceding.relationship, superceding.relatedRecord);
                    } else if (superceding.op === 'replaceRelatedRecords') {
                        updateRecordReplaceHasMany(superceded.record, superceding.relationship, superceding.relatedRecords);
                    }
                    superceded.op = 'replaceRecord';
                    markOperationToDelete(superceding);
                }
            } else if ((superceded.op === 'addRecord' || superceded.op === 'replaceRecord') && isReplaceFieldOp(superceding.op)) {
                if (superceding.op === 'replaceAttribute') {
                    updateRecordReplaceAttribute(superceded.record, superceding.attribute, superceding.value);
                } else if (superceding.op === 'replaceRelatedRecord') {
                    updateRecordReplaceHasOne(superceded.record, superceding.relationship, superceding.relatedRecord);
                } else if (superceding.op === 'replaceRelatedRecords') {
                    updateRecordReplaceHasMany(superceded.record, superceding.relationship, superceding.relatedRecords);
                }
                markOperationToDelete(superceding);
            } else if (superceding.op === 'addToRelatedRecords') {
                if (superceded.op === 'addRecord') {
                    updateRecordAddToHasMany(superceded.record, superceding.relationship, superceding.relatedRecord);
                    markOperationToDelete(superceding);
                } else if (superceded.op === 'replaceRecord') {
                    if (superceded.record.relationships && superceded.record.relationships[superceding.relationship] && superceded.record.relationships[superceding.relationship].data) {
                        updateRecordAddToHasMany(superceded.record, superceding.relationship, superceding.relatedRecord);
                        markOperationToDelete(superceding);
                    }
                }
            } else if (superceding.op === 'removeFromRelatedRecords') {
                if (superceded.op === 'addToRelatedRecords' && superceded.relationship === superceding.relationship && equalRecordIdentities(superceded.relatedRecord, superceding.relatedRecord)) {
                    markOperationToDelete(superceded);
                    markOperationToDelete(superceding);
                } else if (superceded.op === 'addRecord' || superceded.op === 'replaceRecord') {
                    if (superceded.record.relationships && superceded.record.relationships[superceding.relationship] && superceded.record.relationships[superceding.relationship].data) {
                        updateRecordRemoveFromHasMany(superceded.record, superceding.relationship, superceding.relatedRecord);
                        markOperationToDelete(superceding);
                    }
                }
            }
        }
    }
}
function isReplaceFieldOp(op) {
    return op === 'replaceAttribute' || op === 'replaceRelatedRecord' || op === 'replaceRelatedRecords';
}
function updateRecordReplaceAttribute(record, attribute, value) {
    record.attributes = record.attributes || {};
    record.attributes[attribute] = value;
}
function updateRecordReplaceHasOne(record, relationship, relatedRecord) {
    deepSet(record, ['relationships', relationship, 'data'], cloneRecordIdentity(relatedRecord));
}
function updateRecordReplaceHasMany(record, relationship, relatedRecords) {
    deepSet(record, ['relationships', relationship, 'data'], relatedRecords.map(cloneRecordIdentity));
}
function updateRecordAddToHasMany(record, relationship, relatedRecord) {
    var data = deepGet(record, ['relationships', relationship, 'data']) || [];
    data.push(cloneRecordIdentity(relatedRecord));
    deepSet(record, ['relationships', relationship, 'data'], data);
}
function updateRecordRemoveFromHasMany(record, relationship, relatedRecord) {
    var data = deepGet(record, ['relationships', relationship, 'data']);
    if (data) {
        for (var i = 0, l = data.length; i < l; i++) {
            var r = data[i];
            if (equalRecordIdentities(r, relatedRecord)) {
                data.splice(i, 1);
                break;
            }
        }
    }
}
/**
 * Coalesces operations into a minimal set of equivalent operations.
 *
 * This method respects the order of the operations array and does not allow
 * reordering of operations that affect relationships.
 *
 * @export
 * @param {RecordOperation[]} operations
 * @returns {RecordOperation[]}
 */
export function coalesceRecordOperations(operations) {
    for (var i = 0, l = operations.length; i < l; i++) {
        var currentOp = operations[i];
        var consecutiveOps = true;
        for (var j = i + 1; j < l; j++) {
            var nextOp = operations[j];
            mergeOperations(currentOp, nextOp, consecutiveOps);
            if (isOperationMarkedToDelete(currentOp)) {
                break;
            } else if (!isOperationMarkedToDelete(nextOp)) {
                consecutiveOps = false;
            }
        }
    }
    return operations.filter(function (o) {
        return !isOperationMarkedToDelete(o);
    });
}
/**
 * Determine the differences between a record and its updated version in terms
 * of a set of operations.
 *
 * @export
 * @param {Record} record
 * @param {Record} updatedRecord
 * @returns {RecordOperation[]}
 */
export function recordDiffs(record, updatedRecord) {
    var diffs = [];
    if (record && updatedRecord) {
        var recordIdentity = cloneRecordIdentity(record);
        if (updatedRecord.attributes) {
            Object.keys(updatedRecord.attributes).forEach(function (attribute) {
                var value = updatedRecord.attributes[attribute];
                if (record.attributes === undefined || !eq(record.attributes[attribute], value)) {
                    var op = {
                        op: 'replaceAttribute',
                        record: recordIdentity,
                        attribute: attribute,
                        value: value
                    };
                    diffs.push(op);
                }
            });
        }
        if (updatedRecord.keys) {
            Object.keys(updatedRecord.keys).forEach(function (key) {
                var value = updatedRecord.keys[key];
                if (record.keys === undefined || !eq(record.keys[key], value)) {
                    var op = {
                        op: 'replaceKey',
                        record: recordIdentity,
                        key: key,
                        value: value
                    };
                    diffs.push(op);
                }
            });
        }
        // TODO - handle relationships
    }
    return diffs;
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3BlcmF0aW9uLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsic3JjL29wZXJhdGlvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxBQUFPLFNBQTBCLEFBQW1CLHFCQUFFLEFBQXFCLEFBQUUsNkJBQU0sQUFBVSxBQUFDO0FBQzlGLEFBQU8sU0FBRSxBQUFFLElBQUUsQUFBTyxTQUFFLEFBQU8sQUFBRSxlQUFNLEFBQWMsQUFBQztBQW1KcEQsK0JBQStCLEFBQW9CO0FBQ2pELFFBQU0sQUFBQyxJQUFRLEFBQVMsQUFBQztBQUN6QixBQUFDLE1BQUMsQUFBUSxXQUFHLEFBQUksQUFBQyxBQUNwQjtBQUFDO0FBRUQsbUNBQW1DLEFBQW9CO0FBQ3JELFFBQU0sQUFBQyxJQUFRLEFBQVMsQUFBQztBQUN6QixBQUFNLFdBQUMsQUFBQyxFQUFDLEFBQVEsYUFBSyxBQUFJLEFBQUMsQUFDN0I7QUFBQztBQUVELHlCQUF5QixBQUEyQixZQUFFLEFBQTRCLGFBQUUsQUFBdUI7QUFDekcsQUFBRSxBQUFDLFFBQUMsQUFBcUIsc0JBQUMsQUFBVSxXQUFDLEFBQU0sUUFBRSxBQUFXLFlBQUMsQUFBTSxBQUFDLEFBQUMsU0FBQyxBQUFDO0FBQ2pFLEFBQUUsQUFBQyxZQUFDLEFBQVcsWUFBQyxBQUFFLE9BQUssQUFBYyxBQUFDLGdCQUFDLEFBQUM7QUFDdEMsQUFBcUIsa0NBQUMsQUFBVSxBQUFDLEFBQUM7QUFDbEMsQUFBRSxBQUFDLGdCQUFDLEFBQVUsV0FBQyxBQUFFLE9BQUssQUFBVyxBQUFDLGFBQUMsQUFBQztBQUNsQyxBQUFxQixzQ0FBQyxBQUFXLEFBQUMsQUFBQyxBQUNyQztBQUFDLEFBQ0g7QUFBQyxBQUFDLEFBQUksZUFBQyxBQUFFLEFBQUMsSUFBQyxDQUFDLEFBQXlCLDBCQUFDLEFBQVcsQUFBQyxBQUFJLGlCQUFDLEFBQWMsa0JBQUksQUFBVyxZQUFDLEFBQUUsT0FBSyxBQUFrQixBQUFDLEFBQUMscUJBQUMsQUFBQztBQUNoSCxBQUFF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QUksQUFBRTtBQUNKLEFBQUUsNEJBQUUsQUFBWTtBQUNoQixBQUFNLGdDQUFFLEFBQWM7QUFDdEIsQUFBRztBQUNILEFBQUssQUFDTjtBQUw2QjtBQU85QixBQUFLLDBCQUFDLEFBQUksS0FBQyxBQUFFLEFBQUMsQUFBQyxBQUNqQjtBQUFDLEFBQ0g7QUFBQyxBQUFDLEFBQUMsQUFDTDtBQUFDO0FBRUQsQUFBOEIsQUFDaEM7QUFBQztBQUVELEFBQU0sV0FBQyxBQUFLLEFBQUMsQUFDZjtBQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgUmVjb3JkLCBSZWNvcmRJZGVudGl0eSwgY2xvbmVSZWNvcmRJZGVudGl0eSwgZXF1YWxSZWNvcmRJZGVudGl0aWVzIH0gZnJvbSAnLi9yZWNvcmQnO1xuaW1wb3J0IHsgZXEsIGRlZXBHZXQsIGRlZXBTZXQgfSBmcm9tICdAb3JiaXQvdXRpbHMnO1xuXG4vKipcbiAqIEJhc2UgT3BlcmF0aW9uIGludGVyZmFjZSwgd2hpY2ggcmVxdWlyZXMganVzdCBhbiBgb3BgIHN0cmluZy5cbiAqXG4gKiBAZXhwb3J0XG4gKiBAaW50ZXJmYWNlIE9wZXJhdGlvblxuICovXG5leHBvcnQgaW50ZXJmYWNlIE9wZXJhdGlvbiB7XG4gIG9wOiBzdHJpbmc7XG59XG5cbi8qKlxuICogQWRkIHJlY29yZCBvcGVyYXRpb24uXG4gKlxuICogQGV4cG9ydFxuICogQGludGVyZmFjZSBBZGRSZWNvcmRPcGVyYXRpb25cbiAqIEBleHRlbmRzIHtPcGVyYXRpb259XG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgQWRkUmVjb3JkT3BlcmF0aW9uIGV4dGVuZHMgT3BlcmF0aW9uIHtcbiAgb3A6ICdhZGRSZWNvcmQnO1xuICByZWNvcmQ6IFJlY29yZDtcbn1cblxuLyoqXG4gKiBSZXBsYWNlIHJlY29yZCBvcGVyYXRpb24uXG4gKlxuICogQGV4cG9ydFxuICogQGludGVyZmFjZSBSZXBsYWNlUmVjb3JkT3BlcmF0aW9uXG4gKiBAZXh0ZW5kcyB7T3BlcmF0aW9ufVxuICovXG5leHBvcnQgaW50ZXJmYWNlIFJlcGxhY2VSZWNvcmRPcGVyYXRpb24gZXh0ZW5kcyBPcGVyYXRpb24ge1xuICBvcDogJ3JlcGxhY2VSZWNvcmQnO1xuICByZWNvcmQ6IFJlY29yZDtcbn1cblxuLyoqXG4gKiBSZW1vdmUgcmVjb3JkIG9wZXJhdGlvbi5cbiAqXG4gKiBAZXhwb3J0XG4gKiBAaW50ZXJmYWNlIFJlbW92ZVJlY29yZE9wZXJhdGlvblxuICogQGV4dGVuZHMge09wZXJhdGlvbn1cbiAqL1xuZXhwb3J0IGludGVyZmFjZSBSZW1vdmVSZWNvcmRPcGVyYXRpb24gZXh0ZW5kcyBPcGVyYXRpb24ge1xuICBvcDogJ3JlbW92ZVJlY29yZCc7XG4gIHJlY29yZDogUmVjb3JkSWRlbnRpdHk7XG59XG5cbi8qKlxuICogUmVwbGFjZSBrZXkgb3BlcmF0aW9uLlxuICpcbiAqIEBleHBvcnRcbiAqIEBpbnRlcmZhY2UgUmVwbGFjZUtleU9wZXJhdGlvblxuICogQGV4dGVuZHMge09wZXJhdGlvbn1cbiAqL1xuZXhwb3J0IGludGVyZmFjZSBSZXBsYWNlS2V5T3BlcmF0aW9uIGV4dGVuZHMgT3BlcmF0aW9uIHtcbiAgb3A6ICdyZXBsYWNlS2V5JztcbiAgcmVjb3JkOiBSZWNvcmRJZGVudGl0eTtcbiAga2V5OiBzdHJpbmc7XG4gIHZhbHVlOiBzdHJpbmc7XG59XG5cbi8qKlxuICogUmVwbGFjZSBhdHRyaWJ1dGUgb3BlcmF0aW9uLlxuICpcbiAqIEBleHBvcnRcbiAqIEBpbnRlcmZhY2UgUmVwbGFjZUF0dHJpYnV0ZU9wZXJhdGlvblxuICogQGV4dGVuZHMge09wZXJhdGlvbn1cbiAqL1xuZXhwb3J0IGludGVyZmFjZSBSZXBsYWNlQXR0cmlidXRlT3BlcmF0aW9uIGV4dGVuZHMgT3BlcmF0aW9uIHtcbiAgb3A6ICdyZXBsYWNlQXR0cmlidXRlJztcbiAgcmVjb3JkOiBSZWNvcmRJZGVudGl0eTtcbiAgYXR0cmlidXRlOiBzdHJpbmc7XG4gIHZhbHVlOiBhbnk7XG59XG5cbi8qKlxuICogQWRkIHRvIGhhcy1tYW55IHJlbGF0aW9uc2hpcCBvcGVyYXRpb24uXG4gKlxuICogQGV4cG9ydFxuICogQGludGVyZmFjZSBBZGRUb1JlbGF0ZWRSZWNvcmRzT3BlcmF0aW9uXG4gKiBAZXh0ZW5kcyB7T3BlcmF0aW9ufVxuICovXG5leHBvcnQgaW50ZXJmYWNlIEFkZFRvUmVsYXRlZFJlY29yZHNPcGVyYXRpb24gZXh0ZW5kcyBPcGVyYXRpb24ge1xuICBvcDogJ2FkZFRvUmVsYXRlZFJlY29yZHMnO1xuICByZWNvcmQ6IFJlY29yZElkZW50aXR5O1xuICByZWxhdGlvbnNoaXA6IHN0cmluZztcbiAgcmVsYXRlZFJlY29yZDogUmVjb3JkSWRlbnRpdHk7XG59XG5cbi8qKlxuICogUmVtb3ZlIGZyb20gaGFzLW1hbnkgcmVsYXRpb25zaGlwIG9wZXJhdGlvbi5cbiAqXG4gKiBAZXhwb3J0XG4gKiBAaW50ZXJmYWNlIFJlbW92ZUZyb21SZWxhdGVkUmVjb3Jkc09wZXJhdGlvblxuICogQGV4dGVuZHMge09wZXJhdGlvbn1cbiAqL1xuZXhwb3J0IGludGVyZmFjZSBSZW1vdmVGcm9tUmVsYXRlZFJlY29yZHNPcGVyYXRpb24gZXh0ZW5kcyBPcGVyYXRpb24ge1xuICBvcDogJ3JlbW92ZUZyb21SZWxhdGVkUmVjb3Jkcyc7XG4gIHJlY29yZDogUmVjb3JkSWRlbnRpdHk7XG4gIHJlbGF0aW9uc2hpcDogc3RyaW5nO1xuICByZWxhdGVkUmVjb3JkOiBSZWNvcmRJZGVudGl0eTtcbn1cblxuLyoqXG4gKiBSZXBsYWNlIGhhcy1tYW55IHJlbGF0aW9uc2hpcCBvcGVyYXRpb24uXG4gKlxuICogQGV4cG9ydFxuICogQGludGVyZmFjZSBSZXBsYWNlUmVsYXRlZFJlY29yZHNPcGVyYXRpb25cbiAqIEBleHRlbmRzIHtPcGVyYXRpb259XG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgUmVwbGFjZVJlbGF0ZWRSZWNvcmRzT3BlcmF0aW9uIGV4dGVuZHMgT3BlcmF0aW9uIHtcbiAgb3A6ICdyZXBsYWNlUmVsYXRlZFJlY29yZHMnO1xuICByZWNvcmQ6IFJlY29yZElkZW50aXR5O1xuICByZWxhdGlvbnNoaXA6IHN0cmluZztcbiAgcmVsYXRlZFJlY29yZHM6IFJlY29yZElkZW50aXR5W107XG59XG5cbi8qKlxuICogUmVwbGFjZSBoYXMtb25lIHJlbGF0aW9uc2hpcCBvcGVyYXRpb24uXG4gKlxuICogQGV4cG9ydFxuICogQGludGVyZmFjZSBSZXBsYWNlUmVsYXRlZFJlY29yZE9wZXJhdGlvblxuICogQGV4dGVuZHMge09wZXJhdGlvbn1cbiAqL1xuZXhwb3J0IGludGVyZmFjZSBSZXBsYWNlUmVsYXRlZFJlY29yZE9wZXJhdGlvbiBleHRlbmRzIE9wZXJhdGlvbiB7XG4gIG9wOiAncmVwbGFjZVJlbGF0ZWRSZWNvcmQnO1xuICByZWNvcmQ6IFJlY29yZElkZW50aXR5O1xuICByZWxhdGlvbnNoaXA6IHN0cmluZztcbiAgcmVsYXRlZFJlY29yZDogUmVjb3JkSWRlbnRpdHkgfCBudWxsO1xufVxuXG4vKipcbiAqIFVuaW9uIG9mIGFsbCByZWNvcmQtcmVsYXRlZCBvcGVyYXRpb25zLlxuICpcbiAqIEBleHBvcnRcbiAqL1xuZXhwb3J0IHR5cGUgUmVjb3JkT3BlcmF0aW9uID0gQWRkUmVjb3JkT3BlcmF0aW9uIHxcbiAgUmVwbGFjZVJlY29yZE9wZXJhdGlvbiB8XG4gIFJlbW92ZVJlY29yZE9wZXJhdGlvbiB8XG4gIFJlcGxhY2VLZXlPcGVyYXRpb24gfFxuICBSZXBsYWNlQXR0cmlidXRlT3BlcmF0aW9uIHxcbiAgQWRkVG9SZWxhdGVkUmVjb3Jkc09wZXJhdGlvbiB8XG4gIFJlbW92ZUZyb21SZWxhdGVkUmVjb3Jkc09wZXJhdGlvbiB8XG4gIFJlcGxhY2VSZWxhdGVkUmVjb3Jkc09wZXJhdGlvbiB8XG4gIFJlcGxhY2VSZWxhdGVkUmVjb3JkT3BlcmF0aW9uO1xuXG5mdW5jdGlvbiBtYXJrT3BlcmF0aW9uVG9EZWxldGUob3BlcmF0aW9uOiBPcGVyYXRpb24pOiB2b2lkIHtcbiAgY29uc3QgbzogYW55ID0gb3BlcmF0aW9uO1xuICBvLl9kZWxldGVkID0gdHJ1ZTtcbn1cblxuZnVuY3Rpb24gaXNPcGVyYXRpb25NYXJrZWRUb0RlbGV0ZShvcGVyYXRpb246IE9wZXJhdGlvbik6IGJvb2xlYW4ge1xuICBjb25zdCBvOiBhbnkgPSBvcGVyYXRpb247XG4gIHJldHVybiBvLl9kZWxldGVkID09PSB0cnVlO1xufVxuXG5mdW5jdGlvbiBtZXJnZU9wZXJhdGlvbnMoc3VwZXJjZWRlZDogUmVjb3JkT3BlcmF0aW9uLCBzdXBlcmNlZGluZzogUmVjb3JkT3BlcmF0aW9uLCBjb25zZWN1dGl2ZU9wczogYm9vbGVhbik6IHZvaWQge1xuICBpZiAoZXF1YWxSZWNvcmRJZGVudGl0aWVzKHN1cGVyY2VkZWQucmVjb3JkLCBzdXBlcmNlZGluZy5yZWNvcmQpKSB7XG4gICAgaWYgKHN1cGVyY2VkaW5nLm9wID09PSAncmVtb3ZlUmVjb3JkJykge1xuICAgICAgbWFya09wZXJhdGlvblRvRGVsZXRlKHN1cGVyY2VkZWQpO1xuICAgICAgaWYgKHN1cGVyY2VkZWQub3AgPT09ICdhZGRSZWNvcmQnKSB7XG4gICAgICAgIG1hcmtPcGVyYXRpb25Ub0RlbGV0ZShzdXBlcmNlZGluZyk7XG4gICAgICB9XG4gICAgfSBlbHNlIGlmICghaXNPcGVyYXRpb25NYXJrZWRUb0RlbGV0ZShzdXBlcmNlZGluZykgJiYgKGNvbnNlY3V0aXZlT3BzIHx8IHN1cGVyY2VkaW5nLm9wID09PSAncmVwbGFjZUF0dHJpYnV0ZScpKSB7XG4gICAgICBpZiAoaXNSZXBsYWNlRmllbGRPcChzdXBlcmNlZGVkLm9wKSAmJiBpc1JlcGxhY2VGaWVsZE9wKHN1cGVyY2VkaW5nLm9wKSkge1xuICAgICAgICBpZiAoc3VwZXJjZWRlZC5vcCA9PT0gJ3JlcGxhY2VBdHRyaWJ1dGUnICYmXG4gICAgICAgICAgICBzdXBlcmNlZGluZy5vcCA9PT0gJ3JlcGxhY2VBdHRyaWJ1dGUnICYmXG4gICAgICAgICAgICBzdXBlcmNlZGVkLmF0dHJpYnV0ZSA9PT0gc3VwZXJjZWRpbmcuYXR0cmlidXRlKSB7XG4gICAgICAgICAgbWFya09wZXJhdGlvblRvRGVsZXRlKHN1cGVyY2VkZWQpO1xuICAgICAgICB9IGVsc2UgaWYgKHN1cGVyY2VkZWQub3AgPT09ICdyZXBsYWNlUmVsYXRlZFJlY29yZCcgJiZcbiAgICAgICAgICAgIHN1cGVyY2VkaW5nLm9wID09PSAncmVwbGFjZVJlbGF0ZWRSZWNvcmQnICYmXG4gICAgICAgICAgICBzdXBlcmNlZGVkLnJlbGF0aW9uc2hpcCA9PT0gc3VwZXJjZWRpbmcucmVsYXRpb25zaGlwKSB7XG4gICAgICAgICAgbWFya09wZXJhdGlvblRvRGVsZXRlKHN1cGVyY2VkZWQpO1xuICAgICAgICB9IGVsc2UgaWYgKHN1cGVyY2VkZWQub3AgPT09ICdyZXBsYWNlUmVsYXRlZFJlY29yZHMnICYmXG4gICAgICAgICAgICBzdXBlcmNlZGluZy5vcCA9PT0gJ3JlcGxhY2VSZWxhdGVkUmVjb3JkcycgJiZcbiAgICAgICAgICAgIHN1cGVyY2VkZWQucmVsYXRpb25zaGlwID09PSBzdXBlcmNlZGluZy5yZWxhdGlvbnNoaXApIHtcbiAgICAgICAgICBtYXJrT3BlcmF0aW9uVG9EZWxldGUoc3VwZXJjZWRlZCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaWYgKHN1cGVyY2VkZWQub3AgPT09ICdyZXBsYWNlQXR0cmlidXRlJykge1xuICAgICAgICAgICAgdXBkYXRlUmVjb3JkUmVwbGFjZUF0dHJpYnV0ZShzdXBlcmNlZGVkLnJlY29yZCwgc3VwZXJjZWRlZC5hdHRyaWJ1dGUsIHN1cGVyY2VkZWQudmFsdWUpO1xuICAgICAgICAgICAgZGVsZXRlIHN1cGVyY2VkZWQuYXR0cmlidXRlO1xuICAgICAgICAgICAgZGVsZXRlIHN1cGVyY2VkZWQudmFsdWU7XG4gICAgICAgICAgfSBlbHNlIGlmIChzdXBlcmNlZGVkLm9wID09PSAncmVwbGFjZVJlbGF0ZWRSZWNvcmQnKSB7XG4gICAgICAgICAgICB1cGRhdGVSZWNvcmRSZXBsYWNlSGFzT25lKHN1cGVyY2VkZWQucmVjb3JkLCBzdXBlcmNlZGVkLnJlbGF0aW9uc2hpcCwgc3VwZXJjZWRlZC5yZWxhdGVkUmVjb3JkKTtcbiAgICAgICAgICAgIGRlbGV0ZSBzdXBlcmNlZGVkLnJlbGF0aW9uc2hpcDtcbiAgICAgICAgICAgIGRlbGV0ZSBzdXBlcmNlZGVkLnJlbGF0ZWRSZWNvcmQ7XG4gICAgICAgICAgfSBlbHNlIGlmIChzdXBlcmNlZGVkLm9wID09PSAncmVwbGFjZVJlbGF0ZWRSZWNvcmRzJykge1xuICAgICAgICAgICAgdXBkYXRlUmVjb3JkUmVwbGFjZUhhc01hbnkoc3VwZXJjZWRlZC5yZWNvcmQsIHN1cGVyY2VkZWQucmVsYXRpb25zaGlwLCBzdXBlcmNlZGVkLnJlbGF0ZWRSZWNvcmRzKTtcbiAgICAgICAgICAgIGRlbGV0ZSBzdXBlcmNlZGVkLnJlbGF0aW9uc2hpcDtcbiAgICAgICAgICAgIGRlbGV0ZSBzdXBlcmNlZGVkLnJlbGF0ZWRSZWNvcmRzO1xuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAoc3VwZXJjZWRpbmcub3AgPT09ICdyZXBsYWNlQXR0cmlidXRlJykge1xuICAgICAgICAgICAgdXBkYXRlUmVjb3JkUmVwbGFjZUF0dHJpYnV0ZShzdXBlcmNlZGVkLnJlY29yZCwgc3VwZXJjZWRpbmcuYXR0cmlidXRlLCBzdXBlcmNlZGluZy52YWx1ZSk7XG4gICAgICAgICAgfSBlbHNlIGlmIChzdXBlcmNlZGluZy5vcCA9PT0gJ3JlcGxhY2VSZWxhdGVkUmVjb3JkJykge1xuICAgICAgICAgICAgdXBkYXRlUmVjb3JkUmVwbGFjZUhhc09uZShzdXBlcmNlZGVkLnJlY29yZCwgc3VwZXJjZWRpbmcucmVsYXRpb25zaGlwLCBzdXBlcmNlZGluZy5yZWxhdGVkUmVjb3JkKTtcbiAgICAgICAgICB9IGVsc2UgaWYgKHN1cGVyY2VkaW5nLm9wID09PSAncmVwbGFjZVJlbGF0ZWRSZWNvcmRzJykge1xuICAgICAgICAgICAgdXBkYXRlUmVjb3JkUmVwbGFjZUhhc01hbnkoc3VwZXJjZWRlZC5yZWNvcmQsIHN1cGVyY2VkaW5nLnJlbGF0aW9uc2hpcCwgc3VwZXJjZWRpbmcucmVsYXRlZFJlY29yZHMpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBzdXBlcmNlZGVkLm9wID0gJ3JlcGxhY2VSZWNvcmQnO1xuICAgICAgICAgIG1hcmtPcGVyYXRpb25Ub0RlbGV0ZShzdXBlcmNlZGluZyk7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSBpZiAoKHN1cGVyY2VkZWQub3AgPT09ICdhZGRSZWNvcmQnIHx8IHN1cGVyY2VkZWQub3AgPT09ICdyZXBsYWNlUmVjb3JkJykgJiZcbiAgICAgICAgICAgICAgICAgaXNSZXBsYWNlRmllbGRPcChzdXBlcmNlZGluZy5vcCkpIHtcbiAgICAgICAgaWYgKHN1cGVyY2VkaW5nLm9wID09PSAncmVwbGFjZUF0dHJpYnV0ZScpIHtcbiAgICAgICAgICB1cGRhdGVSZWNvcmRSZXBsYWNlQXR0cmlidXRlKHN1cGVyY2VkZWQucmVjb3JkLCBzdXBlcmNlZGluZy5hdHRyaWJ1dGUsIHN1cGVyY2VkaW5nLnZhbHVlKTtcbiAgICAgICAgfSBlbHNlIGlmIChzdXBlcmNlZGluZy5vcCA9PT0gJ3JlcGxhY2VSZWxhdGVkUmVjb3JkJykge1xuICAgICAgICAgIHVwZGF0ZVJlY29yZFJlcGxhY2VIYXNPbmUoc3VwZXJjZWRlZC5yZWNvcmQsIHN1cGVyY2VkaW5nLnJlbGF0aW9uc2hpcCwgc3VwZXJjZWRpbmcucmVsYXRlZFJlY29yZCk7XG4gICAgICAgIH0gZWxzZSBpZiAoc3VwZXJjZWRpbmcub3AgPT09ICdyZXBsYWNlUmVsYXRlZFJlY29yZHMnKSB7XG4gICAgICAgICAgdXBkYXRlUmVjb3JkUmVwbGFjZUhhc01hbnkoc3VwZXJjZWRlZC5yZWNvcmQsIHN1cGVyY2VkaW5nLnJlbGF0aW9uc2hpcCwgc3VwZXJjZWRpbmcucmVsYXRlZFJlY29yZHMpO1xuICAgICAgICB9XG4gICAgICAgIG1hcmtPcGVyYXRpb25Ub0RlbGV0ZShzdXBlcmNlZGluZyk7XG4gICAgICB9IGVsc2UgaWYgKHN1cGVyY2VkaW5nLm9wID09PSAnYWRkVG9SZWxhdGVkUmVjb3JkcycpIHtcbiAgICAgICAgaWYgKHN1cGVyY2VkZWQub3AgPT09ICdhZGRSZWNvcmQnKSB7XG4gICAgICAgICAgdXBkYXRlUmVjb3JkQWRkVG9IYXNNYW55KHN1cGVyY2VkZWQucmVjb3JkLCBzdXBlcmNlZGluZy5yZWxhdGlvbnNoaXAsIHN1cGVyY2VkaW5nLnJlbGF0ZWRSZWNvcmQpO1xuICAgICAgICAgIG1hcmtPcGVyYXRpb25Ub0RlbGV0ZShzdXBlcmNlZGluZyk7XG4gICAgICAgIH0gZWxzZSBpZiAoc3VwZXJjZWRlZC5vcCA9PT0gJ3JlcGxhY2VSZWNvcmQnKSB7XG4gICAgICAgICAgaWYgKHN1cGVyY2VkZWQucmVjb3JkLnJlbGF0aW9uc2hpcHMgJiZcbiAgICAgICAgICAgICAgc3VwZXJjZWRlZC5yZWNvcmQucmVsYXRpb25zaGlwc1tzdXBlcmNlZGluZy5yZWxhdGlvbnNoaXBdICYmXG4gICAgICAgICAgICAgIHN1cGVyY2VkZWQucmVjb3JkLnJlbGF0aW9uc2hpcHNbc3VwZXJjZWRpbmcucmVsYXRpb25zaGlwXS5kYXRhKSB7XG4gICAgICAgICAgICB1cGRhdGVSZWNvcmRBZGRUb0hhc01hbnkoc3VwZXJjZWRlZC5yZWNvcmQsIHN1cGVyY2VkaW5nLnJlbGF0aW9uc2hpcCwgc3VwZXJjZWRpbmcucmVsYXRlZFJlY29yZCk7XG4gICAgICAgICAgICBtYXJrT3BlcmF0aW9uVG9EZWxldGUoc3VwZXJjZWRpbmcpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSBlbHNlIGlmIChzdXBlcmNlZGluZy5vcCA9PT0gJ3JlbW92ZUZyb21SZWxhdGVkUmVjb3JkcycpIHtcbiAgICAgICAgaWYgKHN1cGVyY2VkZWQub3AgPT09ICdhZGRUb1JlbGF0ZWRSZWNvcmRzJyAmJlxuICAgICAgICAgICAgc3VwZXJjZWRlZC5yZWxhdGlvbnNoaXAgPT09IHN1cGVyY2VkaW5nLnJlbGF0aW9uc2hpcCAmJlxuICAgICAgICAgICAgZXF1YWxSZWNvcmRJZGVudGl0aWVzKHN1cGVyY2VkZWQucmVsYXRlZFJlY29yZCwgc3VwZXJjZWRpbmcucmVsYXRlZFJlY29yZCkpIHtcbiAgICAgICAgICBtYXJrT3BlcmF0aW9uVG9EZWxldGUoc3VwZXJjZWRlZCk7XG4gICAgICAgICAgbWFya09wZXJhdGlvblRvRGVsZXRlKHN1cGVyY2VkaW5nKTtcbiAgICAgICAgfSBlbHNlIGlmIChzdXBlcmNlZGVkLm9wID09PSAnYWRkUmVjb3JkJyB8fCBzdXBlcmNlZGVkLm9wID09PSAncmVwbGFjZVJlY29yZCcpIHtcbiAgICAgICAgICBpZiAoc3VwZXJjZWRlZC5yZWNvcmQucmVsYXRpb25zaGlwcyAmJlxuICAgICAgICAgICAgICBzdXBlcmNlZGVkLnJlY29yZC5yZWxhdGlvbnNoaXBzW3N1cGVyY2VkaW5nLnJlbGF0aW9uc2hpcF0gJiZcbiAgICAgICAgICAgICAgc3VwZXJjZWRlZC5yZWNvcmQucmVsYXRpb25zaGlwc1tzdXBlcmNlZGluZy5yZWxhdGlvbnNoaXBdLmRhdGEpIHtcbiAgICAgICAgICAgIHVwZGF0ZVJlY29yZFJlbW92ZUZyb21IYXNNYW55KHN1cGVyY2VkZWQucmVjb3JkLCBzdXBlcmNlZGluZy5yZWxhdGlvbnNoaXAsIHN1cGVyY2VkaW5nLnJlbGF0ZWRSZWNvcmQpO1xuICAgICAgICAgICAgbWFya09wZXJhdGlvblRvRGVsZXRlKHN1cGVyY2VkaW5nKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cblxuZnVuY3Rpb24gaXNSZXBsYWNlRmllbGRPcChvcDogc3RyaW5nKTogYm9vbGVhbiB7XG4gIHJldHVybiAob3AgPT09ICdyZXBsYWNlQXR0cmlidXRlJyB8fFxuICAgICAgICAgIG9wID09PSAncmVwbGFjZVJlbGF0ZWRSZWNvcmQnIHx8XG4gICAgICAgICAgb3AgPT09ICdyZXBsYWNlUmVsYXRlZFJlY29yZHMnKTtcbn1cblxuZnVuY3Rpb24gdXBkYXRlUmVjb3JkUmVwbGFjZUF0dHJpYnV0ZShyZWNvcmQ6IFJlY29yZCwgYXR0cmlidXRlOiBzdHJpbmcsIHZhbHVlOiBhbnkpIHtcbiAgcmVjb3JkLmF0dHJpYnV0ZXMgPSByZWNvcmQuYXR0cmlidXRlcyB8fCB7fTtcbiAgcmVjb3JkLmF0dHJpYnV0ZXNbYXR0cmlidXRlXSA9IHZhbHVlO1xufVxuXG5mdW5jdGlvbiB1cGRhdGVSZWNvcmRSZXBsYWNlSGFzT25lKHJlY29yZDogUmVjb3JkLCByZWxhdGlvbnNoaXA6IHN0cmluZywgcmVsYXRlZFJlY29yZDogUmVjb3JkSWRlbnRpdHkpIHtcbiAgZGVlcFNldChyZWNvcmQsIFsncmVsYXRpb25zaGlwcycsIHJlbGF0aW9uc2hpcCwgJ2RhdGEnXSwgY2xvbmVSZWNvcmRJZGVudGl0eShyZWxhdGVkUmVjb3JkKSk7XG59XG5cbmZ1bmN0aW9uIHVwZGF0ZVJlY29yZFJlcGxhY2VIYXNNYW55KHJlY29yZDogUmVjb3JkLCByZWxhdGlvbnNoaXA6IHN0cmluZywgcmVsYXRlZFJlY29yZHM6IFJlY29yZElkZW50aXR5W10pIHtcbiAgZGVlcFNldChyZWNvcmQsIFsncmVsYXRpb25zaGlwcycsIHJlbGF0aW9uc2hpcCwgJ2RhdGEnXSwgcmVsYXRlZFJlY29yZHMubWFwKGNsb25lUmVjb3JkSWRlbnRpdHkpKTtcbn1cblxuZnVuY3Rpb24gdXBkYXRlUmVjb3JkQWRkVG9IYXNNYW55KHJlY29yZDogUmVjb3JkLCByZWxhdGlvbnNoaXA6IHN0cmluZywgcmVsYXRlZFJlY29yZDogUmVjb3JkSWRlbnRpdHkpIHtcbiAgY29uc3QgZGF0YSA9IGRlZXBHZXQocmVjb3JkLCBbJ3JlbGF0aW9uc2hpcHMnLCByZWxhdGlvbnNoaXAsICdkYXRhJ10pIHx8IFtdO1xuICBkYXRhLnB1c2goY2xvbmVSZWNvcmRJZGVudGl0eShyZWxhdGVkUmVjb3JkKSk7XG4gIGRlZXBTZXQocmVjb3JkLCBbJ3JlbGF0aW9uc2hpcHMnLCByZWxhdGlvbnNoaXAsICdkYXRhJ10sIGRhdGEpO1xufVxuXG5mdW5jdGlvbiB1cGRhdGVSZWNvcmRSZW1vdmVGcm9tSGFzTWFueShyZWNvcmQ6IFJlY29yZCwgcmVsYXRpb25zaGlwOiBzdHJpbmcsIHJlbGF0ZWRSZWNvcmQ6IFJlY29yZElkZW50aXR5KSB7XG4gIGNvbnN0IGRhdGEgPSBkZWVwR2V0KHJlY29yZCwgWydyZWxhdGlvbnNoaXBzJywgcmVsYXRpb25zaGlwLCAnZGF0YSddKSBhcyBSZWNvcmRJZGVudGl0eVtdO1xuICBpZiAoZGF0YSkge1xuICAgIGZvciAobGV0IGkgPSAwLCBsID0gZGF0YS5sZW5ndGg7IGkgPCBsOyBpKyspIHtcbiAgICAgIGxldCByID0gZGF0YVtpXTtcbiAgICAgIGlmIChlcXVhbFJlY29yZElkZW50aXRpZXMociwgcmVsYXRlZFJlY29yZCkpIHtcbiAgICAgICAgZGF0YS5zcGxpY2UoaSwgMSk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgIH1cbiAgfVxufVxuXG4vKipcbiAqIENvYWxlc2NlcyBvcGVyYXRpb25zIGludG8gYSBtaW5pbWFsIHNldCBvZiBlcXVpdmFsZW50IG9wZXJhdGlvbnMuXG4gKlxuICogVGhpcyBtZXRob2QgcmVzcGVjdHMgdGhlIG9yZGVyIG9mIHRoZSBvcGVyYXRpb25zIGFycmF5IGFuZCBkb2VzIG5vdCBhbGxvd1xuICogcmVvcmRlcmluZyBvZiBvcGVyYXRpb25zIHRoYXQgYWZmZWN0IHJlbGF0aW9uc2hpcHMuXG4gKlxuICogQGV4cG9ydFxuICogQHBhcmFtIHtSZWNvcmRPcGVyYXRpb25bXX0gb3BlcmF0aW9uc1xuICogQHJldHVybnMge1JlY29yZE9wZXJhdGlvbltdfVxuICovXG5leHBvcnQgZnVuY3Rpb24gY29hbGVzY2VSZWNvcmRPcGVyYXRpb25zKG9wZXJhdGlvbnM6IFJlY29yZE9wZXJhdGlvbltdKTogUmVjb3JkT3BlcmF0aW9uW10ge1xuICBmb3IgKGxldCBpID0gMCwgbCA9IG9wZXJhdGlvbnMubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XG4gICAgbGV0IGN1cnJlbnRPcCA9IG9wZXJhdGlvbnNbaV07XG4gICAgbGV0IGNvbnNlY3V0aXZlT3BzID0gdHJ1ZTtcblxuICAgIGZvciAobGV0IGogPSBpICsgMTsgaiA8IGw7IGorKykge1xuICAgICAgbGV0IG5leHRPcCA9IG9wZXJhdGlvbnNbal07XG5cbiAgICAgIG1lcmdlT3BlcmF0aW9ucyhjdXJyZW50T3AsIG5leHRPcCwgY29uc2VjdXRpdmVPcHMpO1xuXG4gICAgICBpZiAoaXNPcGVyYXRpb25NYXJrZWRUb0RlbGV0ZShjdXJyZW50T3ApKSB7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfSBlbHNlIGlmICghaXNPcGVyYXRpb25NYXJrZWRUb0RlbGV0ZShuZXh0T3ApKSB7XG4gICAgICAgIGNvbnNlY3V0aXZlT3BzID0gZmFsc2U7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIG9wZXJhdGlvbnMuZmlsdGVyKG8gPT4gIWlzT3BlcmF0aW9uTWFya2VkVG9EZWxldGUobykpO1xufVxuXG4vKipcbiAqIERldGVybWluZSB0aGUgZGlmZmVyZW5jZXMgYmV0d2VlbiBhIHJlY29yZCBhbmQgaXRzIHVwZGF0ZWQgdmVyc2lvbiBpbiB0ZXJtc1xuICogb2YgYSBzZXQgb2Ygb3BlcmF0aW9ucy5cbiAqXG4gKiBAZXhwb3J0XG4gKiBAcGFyYW0ge1JlY29yZH0gcmVjb3JkXG4gKiBAcGFyYW0ge1JlY29yZH0gdXBkYXRlZFJlY29yZFxuICogQHJldHVybnMge1JlY29yZE9wZXJhdGlvbltdfVxuICovXG5leHBvcnQgZnVuY3Rpb24gcmVjb3JkRGlmZnMocmVjb3JkOiBSZWNvcmQsIHVwZGF0ZWRSZWNvcmQ6IFJlY29yZCk6IFJlY29yZE9wZXJhdGlvbltdIHtcbiAgY29uc3QgZGlmZnM6IFJlY29yZE9wZXJhdGlvbltdID0gW107XG5cbiAgaWYgKHJlY29yZCAmJiB1cGRhdGVkUmVjb3JkKSB7XG4gICAgY29uc3QgcmVjb3JkSWRlbnRpdHkgPSBjbG9uZVJlY29yZElkZW50aXR5KHJlY29yZCk7XG5cbiAgICBpZiAodXBkYXRlZFJlY29yZC5hdHRyaWJ1dGVzKSB7XG4gICAgICBPYmplY3Qua2V5cyh1cGRhdGVkUmVjb3JkLmF0dHJpYnV0ZXMpLmZvckVhY2goYXR0cmlidXRlID0+IHtcbiAgICAgICAgbGV0IHZhbHVlID0gdXBkYXRlZFJlY29yZC5hdHRyaWJ1dGVzW2F0dHJpYnV0ZV07XG5cbiAgICAgICAgaWYgKHJlY29yZC5hdHRyaWJ1dGVzID09PSB1bmRlZmluZWQgfHwgIWVxKHJlY29yZC5hdHRyaWJ1dGVzW2F0dHJpYnV0ZV0sIHZhbHVlKSkge1xuICAgICAgICAgIGxldCBvcDogUmVwbGFjZUF0dHJpYnV0ZU9wZXJhdGlvbiA9IHtcbiAgICAgICAgICAgIG9wOiAncmVwbGFjZUF0dHJpYnV0ZScsXG4gICAgICAgICAgICByZWNvcmQ6IHJlY29yZElkZW50aXR5LFxuICAgICAgICAgICAgYXR0cmlidXRlLFxuICAgICAgICAgICAgdmFsdWVcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBkaWZmcy5wdXNoKG9wKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuXG4gICAgaWYgKHVwZGF0ZWRSZWNvcmQua2V5cykge1xuICAgICAgT2JqZWN0LmtleXModXBkYXRlZFJlY29yZC5rZXlzKS5mb3JFYWNoKGtleSA9PiB7XG4gICAgICAgIGxldCB2YWx1ZSA9IHVwZGF0ZWRSZWNvcmQua2V5c1trZXldO1xuICAgICAgICBpZiAocmVjb3JkLmtleXMgPT09IHVuZGVmaW5lZCB8fCAhZXEocmVjb3JkLmtleXNba2V5XSwgdmFsdWUpKSB7XG4gICAgICAgICAgbGV0IG9wOiBSZXBsYWNlS2V5T3BlcmF0aW9uID0ge1xuICAgICAgICAgICAgb3A6ICdyZXBsYWNlS2V5JyxcbiAgICAgICAgICAgIHJlY29yZDogcmVjb3JkSWRlbnRpdHksXG4gICAgICAgICAgICBrZXksXG4gICAgICAgICAgICB2YWx1ZVxuICAgICAgICAgIH1cblxuICAgICAgICAgIGRpZmZzLnB1c2gob3ApO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICAvLyBUT0RPIC0gaGFuZGxlIHJlbGF0aW9uc2hpcHNcbiAgfVxuXG4gIHJldHVybiBkaWZmcztcbn1cbiJdfQ==