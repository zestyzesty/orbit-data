import { isObject, isNone, merge } from '@orbit/utils';
export function cloneRecordIdentity(identity) {
    var type = identity.type,
        id = identity.id;

    return { type: type, id: id };
}
export function equalRecordIdentities(record1, record2) {
    return isNone(record1) && isNone(record2) || isObject(record1) && isObject(record2) && record1.type === record2.type && record1.id === record2.id;
}
export function mergeRecords(current, updates) {
    if (current) {
        var record = cloneRecordIdentity(current);
        ['attributes', 'keys', 'relationships'].forEach(function (grouping) {
            if (current[grouping] && updates[grouping]) {
                record[grouping] = merge({}, current[grouping], updates[grouping]);
            } else if (current[grouping]) {
                record[grouping] = merge({}, current[grouping]);
            } else if (updates[grouping]) {
                record[grouping] = merge({}, updates[grouping]);
            }
        });
        return record;
    } else {
        return updates;
    }
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVjb3JkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsic3JjL3JlY29yZC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxBQUFPLFNBQVEsQUFBUSxVQUFFLEFBQU0sUUFBRSxBQUFLLEFBQUUsYUFBTSxBQUFjLEFBQUM7QUEyQjdELEFBQU0sb0NBQThCLEFBQXdCO0FBQzFELEFBQU0sUUFBRSxBQUFJO1FBQUUsQUFBRSxBQUFFLEtBQUcsQUFBUSxBQUFDOztBQUM5QixBQUFNLFdBQUMsRUFBRSxBQUFJLFlBQUUsQUFBRSxBQUFFLEFBQUMsQUFDdEI7QUFBQztBQUVELEFBQU0sc0NBQWdDLEFBQXVCLFNBQUUsQUFBdUI7QUFDcEYsQUFBTSxXQUFFLEFBQU0sT0FBQyxBQUFPLEFBQUMsWUFBSSxBQUFNLE9BQUMsQUFBTyxBQUFDLEFBQUMsQUFDcEMsUUFEQSxJQUNDLEFBQVEsU0FBQyxBQUFPLEFBQUMsWUFBSSxBQUFRLFNBQUMsQUFBTyxBQUFDLFlBQ3RDLEFBQU8sUUFBQyxBQUFJLFNBQUssQUFBTyxRQUFDLEFBQUksUUFDN0IsQUFBTyxRQUFDLEFBQUUsT0FBSyxBQUFPLFFBQUMsQUFBRSxBQUFDLEFBQUMsQUFDckM7QUFBQztBQUVELEFBQU0sNkJBQXVCLEFBQXNCLFNBQUUsQUFBZTtBQUNsRSxBQUFFLEFBQUMsUUFBQyxBQUFPLEFBQUMsU0FBQyxBQUFDO0FBQ1osWUFBSSxBQUFNLFNBQUcsQUFBbUIsb0JBQUMsQUFBTyxBQUFDLEFBQUM7QUFFMUMsU0FBQyxBQUFZLGNBQUUsQUFBTSxRQUFFLEFBQWUsQUFBQyxpQkFBQyxBQUFPLFFBQUMsQUFBUSxBQUFDLEFBQUU7QUFDekQsQUFBRSxBQUFDLGdCQUFDLEFBQU8sUUFBQyxBQUFRLEFBQUMsYUFBSSxBQUFPLFFBQUMsQUFBUSxBQUFDLEFBQUMsV0FBQyxBQUFDO0FBQzNDLEFBQU0sdUJBQUMsQUFBUSxBQUFDLFlBQUcsQUFBSyxNQUFDLEFBQUUsSUFBRSxBQUFPLFFBQUMsQUFBUSxBQUFDLFdBQUUsQUFBTyxRQUFDLEFBQVEsQUFBQyxBQUFDLEFBQUMsQUFDckU7QUFBQyxBQUFDLEFBQUksdUJBQUssQUFBTyxRQUFDLEFBQVEsQUFBQyxBQUFDLFdBQUMsQUFBQztBQUM3QixBQUFNLHVCQUFDLEFBQVEsQUFBQyxZQUFHLEFBQUssTUFBQyxBQUFFLElBQUUsQUFBTyxRQUFDLEFBQVEsQUFBQyxBQUFDLEFBQUMsQUFDbEQ7QUFBQyxBQUFDLEFBQUksYUFGQyxBQUFFLEFBQUMsTUFFSCxBQUFFLEFBQUMsSUFBQyxBQUFPLFFBQUMsQUFBUSxBQUFDLEFBQUMsV0FBQyxBQUFDO0FBQzdCLEFBQU0sdUJBQUMsQUFBUSxBQUFDLFlBQUcsQUFBSyxNQUFDLEFBQUUsSUFBRSxBQUFPLFFBQUMsQUFBUSxBQUFDLEFBQUMsQUFBQyxBQUNsRDtBQUFDLEFBQ0g7QUFBQyxBQUFDLEFBQUM7QUFFSCxBQUFNLGVBQUMsQUFBTSxBQUFDLEFBQ2hCO0FBQUMsQUFBQyxBQUFJLFdBQUMsQUFBQztBQUNOLEFBQU0sZUFBQyxBQUFPLEFBQUMsQUFDakI7QUFBQyxBQUNIO0FBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBEaWN0LCBpc09iamVjdCwgaXNOb25lLCBtZXJnZSB9IGZyb20gJ0BvcmJpdC91dGlscyc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgUmVjb3JkSWRlbnRpdHkge1xuICB0eXBlOiBzdHJpbmc7XG4gIGlkOiBzdHJpbmc7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgUmVjb3JkSGFzT25lUmVsYXRpb25zaGlwIHtcbiAgZGF0YTogUmVjb3JkSWRlbnRpdHkgfCBudWxsO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIFJlY29yZEhhc01hbnlSZWxhdGlvbnNoaXAge1xuICBkYXRhOiBSZWNvcmRJZGVudGl0eVtdO1xufVxuXG5leHBvcnQgdHlwZSBSZWNvcmRSZWxhdGlvbnNoaXAgPSBSZWNvcmRIYXNPbmVSZWxhdGlvbnNoaXAgfCBSZWNvcmRIYXNNYW55UmVsYXRpb25zaGlwO1xuXG5leHBvcnQgaW50ZXJmYWNlIFJlY29yZCBleHRlbmRzIFJlY29yZElkZW50aXR5IHtcbiAga2V5cz86IERpY3Q8c3RyaW5nPjtcbiAgYXR0cmlidXRlcz86IERpY3Q8YW55PjtcbiAgcmVsYXRpb25zaGlwcz86IERpY3Q8UmVjb3JkUmVsYXRpb25zaGlwPjtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBSZWNvcmRJbml0aWFsaXplciB7XG4gIGluaXRpYWxpemVSZWNvcmQocmVjb3JkOiBSZWNvcmQpOiB2b2lkO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gY2xvbmVSZWNvcmRJZGVudGl0eShpZGVudGl0eTogUmVjb3JkSWRlbnRpdHkpOiBSZWNvcmRJZGVudGl0eSB7XG4gIGNvbnN0IHsgdHlwZSwgaWQgfSA9IGlkZW50aXR5O1xuICByZXR1cm4geyB0eXBlLCBpZCB9O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZXF1YWxSZWNvcmRJZGVudGl0aWVzKHJlY29yZDE6IFJlY29yZElkZW50aXR5LCByZWNvcmQyOiBSZWNvcmRJZGVudGl0eSk6IGJvb2xlYW4ge1xuICByZXR1cm4gKGlzTm9uZShyZWNvcmQxKSAmJiBpc05vbmUocmVjb3JkMikpIHx8XG4gICAgICAgICAoaXNPYmplY3QocmVjb3JkMSkgJiYgaXNPYmplY3QocmVjb3JkMikgJiZcbiAgICAgICAgICByZWNvcmQxLnR5cGUgPT09IHJlY29yZDIudHlwZSAmJlxuICAgICAgICAgIHJlY29yZDEuaWQgPT09IHJlY29yZDIuaWQpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gbWVyZ2VSZWNvcmRzKGN1cnJlbnQ6IFJlY29yZCB8IG51bGwsIHVwZGF0ZXM6IFJlY29yZCk6IFJlY29yZCB7XG4gIGlmIChjdXJyZW50KSB7XG4gICAgbGV0IHJlY29yZCA9IGNsb25lUmVjb3JkSWRlbnRpdHkoY3VycmVudCk7XG5cbiAgICBbJ2F0dHJpYnV0ZXMnLCAna2V5cycsICdyZWxhdGlvbnNoaXBzJ10uZm9yRWFjaChncm91cGluZyA9PiB7XG4gICAgICBpZiAoY3VycmVudFtncm91cGluZ10gJiYgdXBkYXRlc1tncm91cGluZ10pIHtcbiAgICAgICAgcmVjb3JkW2dyb3VwaW5nXSA9IG1lcmdlKHt9LCBjdXJyZW50W2dyb3VwaW5nXSwgdXBkYXRlc1tncm91cGluZ10pO1xuICAgICAgfSBlbHNlIGlmIChjdXJyZW50W2dyb3VwaW5nXSkge1xuICAgICAgICByZWNvcmRbZ3JvdXBpbmddID0gbWVyZ2Uoe30sIGN1cnJlbnRbZ3JvdXBpbmddKTtcbiAgICAgIH0gZWxzZSBpZiAodXBkYXRlc1tncm91cGluZ10pIHtcbiAgICAgICAgcmVjb3JkW2dyb3VwaW5nXSA9IG1lcmdlKHt9LCB1cGRhdGVzW2dyb3VwaW5nXSk7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICByZXR1cm4gcmVjb3JkO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiB1cGRhdGVzO1xuICB9XG59XG4iXX0=