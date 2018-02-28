import { Exception } from '@orbit/core';
/**
 * An client-side error occurred while communicating with a remote server.
 *
 * @export
 * @class ClientError
 * @extends {Exception}
 */
export class ClientError extends Exception {
    constructor(description) {
        super(`Client error: ${description}`);
        this.description = description;
    }
}
/**
 * A server-side error occurred while communicating with a remote server.
 *
 * @export
 * @class ServerError
 * @extends {Exception}
 */
export class ServerError extends Exception {
    constructor(description) {
        super(`Server error: ${description}`);
        this.description = description;
    }
}
/**
 * A networking error occurred while attempting to communicate with a remote
 * server.
 *
 * @export
 * @class NetworkError
 * @extends {Exception}
 */
export class NetworkError extends Exception {
    constructor(description) {
        super(`Network error: ${description}`);
        this.description = description;
    }
}
/**
 * A query expression could not be parsed.
 *
 * @export
 * @class QueryExpressionParseError
 * @extends {Exception}
 */
export class QueryExpressionParseError extends Exception {
    constructor(description, expression) {
        super(`Query expression parse error: ${description}`);
        this.description = description;
        this.expression = expression;
    }
}
/**
 * A query is invalid for a particular source.
 *
 * @export
 * @class QueryNotAllowed
 * @extends {Exception}
 */
export class QueryNotAllowed extends Exception {
    constructor(description, query) {
        super(`Query not allowed: ${description}`);
        this.description = description;
        this.query = query;
    }
}
/**
 * A transform is invalid for a particular source.
 *
 * @export
 * @class TransformNotAllowed
 * @extends {Exception}
 */
export class TransformNotAllowed extends Exception {
    constructor(description, transform) {
        super(`Transform not allowed: ${description}`);
        this.description = description;
        this.transform = transform;
    }
}
/**
 * An error occured related to the schema.
 *
 * @export
 * @class SchemaError
 */
export class SchemaError extends Exception {
    constructor(description) {
        super(`Schema error: ${description}`);
        this.description = description;
    }
}
/**
 * A model could not be found in the schema.
 *
 * @export
 * @class ModelNotFound
 */
export class ModelNotFound extends SchemaError {
    constructor(type) {
        super(`Model definition for ${type} not found`);
    }
}
/**
 * An error occurred related to a particular record.
 *
 * @export
 * @abstract
 * @class RecordException
 * @extends {Exception}
 */
export class RecordException extends Exception {
    constructor(description, type, id, relationship) {
        let message = `${description}: ${type}:${id}`;
        if (relationship) {
            message += '/' + relationship;
        }
        super(message);
        this.description = description;
        this.type = type;
        this.id = id;
        this.relationship = relationship;
    }
}
/**
 * A record could not be found.
 *
 * @export
 * @class RecordNotFoundException
 * @extends {RecordException}
 */
export class RecordNotFoundException extends RecordException {
    constructor(type, id) {
        super('Record not found', type, id);
    }
}
/**
 * A relationship could not be found.
 *
 * @export
 * @class RelationshipNotFoundException
 * @extends {RecordException}
 */
export class RelationshipNotFoundException extends RecordException {
    constructor(type, id, relationship) {
        super('Relationship not found', type, id, relationship);
    }
}
/**
 * The record already exists.
 *
 * @export
 * @class RecordAlreadyExistsException
 * @extends {RecordException}
 */
export class RecordAlreadyExistsException extends RecordException {
    constructor(type, id) {
        super('Record already exists', type, id);
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXhjZXB0aW9uLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsic3JjL2V4Y2VwdGlvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sYUFBYSxDQUFDO0FBRXhDOzs7Ozs7R0FNRztBQUNILE1BQU0sa0JBQW1CLFNBQVEsU0FBUztJQUd4QyxZQUFZLFdBQW1CO1FBQzdCLEtBQUssQ0FBQyxpQkFBaUIsV0FBVyxFQUFFLENBQUMsQ0FBQztRQUN0QyxJQUFJLENBQUMsV0FBVyxHQUFHLFdBQVcsQ0FBQztJQUNqQyxDQUFDO0NBQ0Y7QUFFRDs7Ozs7O0dBTUc7QUFDSCxNQUFNLGtCQUFtQixTQUFRLFNBQVM7SUFHeEMsWUFBWSxXQUFtQjtRQUM3QixLQUFLLENBQUMsaUJBQWlCLFdBQVcsRUFBRSxDQUFDLENBQUM7UUFDdEMsSUFBSSxDQUFDLFdBQVcsR0FBRyxXQUFXLENBQUM7SUFDakMsQ0FBQztDQUNGO0FBRUQ7Ozs7Ozs7R0FPRztBQUNILE1BQU0sbUJBQW9CLFNBQVEsU0FBUztJQUd6QyxZQUFZLFdBQW1CO1FBQzdCLEtBQUssQ0FBQyxrQkFBa0IsV0FBVyxFQUFFLENBQUMsQ0FBQztRQUN2QyxJQUFJLENBQUMsV0FBVyxHQUFHLFdBQVcsQ0FBQztJQUNqQyxDQUFDO0NBQ0Y7QUFFRDs7Ozs7O0dBTUc7QUFDSCxNQUFNLGdDQUFpQyxTQUFRLFNBQVM7SUFJdEQsWUFBWSxXQUFtQixFQUFFLFVBQWU7UUFDOUMsS0FBSyxDQUFDLGlDQUFpQyxXQUFXLEVBQUUsQ0FBQyxDQUFDO1FBQ3RELElBQUksQ0FBQyxXQUFXLEdBQUcsV0FBVyxDQUFDO1FBQy9CLElBQUksQ0FBQyxVQUFVLEdBQUcsVUFBVSxDQUFDO0lBQy9CLENBQUM7Q0FDRjtBQUVEOzs7Ozs7R0FNRztBQUNILE1BQU0sc0JBQXVCLFNBQVEsU0FBUztJQUk1QyxZQUFZLFdBQW1CLEVBQUUsS0FBVTtRQUN6QyxLQUFLLENBQUMsc0JBQXNCLFdBQVcsRUFBRSxDQUFDLENBQUM7UUFDM0MsSUFBSSxDQUFDLFdBQVcsR0FBRyxXQUFXLENBQUM7UUFDL0IsSUFBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7SUFDckIsQ0FBQztDQUNGO0FBRUQ7Ozs7OztHQU1HO0FBQ0gsTUFBTSwwQkFBMkIsU0FBUSxTQUFTO0lBSWhELFlBQVksV0FBbUIsRUFBRSxTQUFjO1FBQzdDLEtBQUssQ0FBQywwQkFBMEIsV0FBVyxFQUFFLENBQUMsQ0FBQztRQUMvQyxJQUFJLENBQUMsV0FBVyxHQUFHLFdBQVcsQ0FBQztRQUMvQixJQUFJLENBQUMsU0FBUyxHQUFHLFNBQVMsQ0FBQztJQUM3QixDQUFDO0NBQ0Y7QUFFRDs7Ozs7R0FLRztBQUNILE1BQU0sa0JBQW1CLFNBQVEsU0FBUztJQUd4QyxZQUFZLFdBQW1CO1FBQzdCLEtBQUssQ0FBQyxpQkFBaUIsV0FBVyxFQUFFLENBQUMsQ0FBQztRQUN0QyxJQUFJLENBQUMsV0FBVyxHQUFHLFdBQVcsQ0FBQztJQUNqQyxDQUFDO0NBQ0Y7QUFHRDs7Ozs7R0FLRztBQUNILE1BQU0sb0JBQXFCLFNBQVEsV0FBVztJQUM1QyxZQUFZLElBQVk7UUFDdEIsS0FBSyxDQUFDLHdCQUF3QixJQUFJLFlBQVksQ0FBQyxDQUFDO0lBQ2xELENBQUM7Q0FDRjtBQUVEOzs7Ozs7O0dBT0c7QUFDSCxNQUFNLHNCQUFnQyxTQUFRLFNBQVM7SUFNckQsWUFBWSxXQUFtQixFQUFFLElBQVksRUFBRSxFQUFVLEVBQUUsWUFBcUI7UUFDOUUsSUFBSSxPQUFPLEdBQVcsR0FBRyxXQUFXLEtBQUssSUFBSSxJQUFJLEVBQUUsRUFBRSxDQUFDO1FBRXRELEVBQUUsQ0FBQyxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUM7WUFDakIsT0FBTyxJQUFJLEdBQUcsR0FBRyxZQUFZLENBQUM7UUFDaEMsQ0FBQztRQUVELEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUVmLElBQUksQ0FBQyxXQUFXLEdBQUcsV0FBVyxDQUFDO1FBQy9CLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO1FBQ2pCLElBQUksQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDO1FBQ2IsSUFBSSxDQUFDLFlBQVksR0FBRyxZQUFZLENBQUM7SUFDbkMsQ0FBQztDQUNGO0FBRUQ7Ozs7OztHQU1HO0FBQ0gsTUFBTSw4QkFBK0IsU0FBUSxlQUFlO0lBQzFELFlBQVksSUFBWSxFQUFFLEVBQVU7UUFDbEMsS0FBSyxDQUFDLGtCQUFrQixFQUFFLElBQUksRUFBRSxFQUFFLENBQUMsQ0FBQztJQUN0QyxDQUFDO0NBQ0Y7QUFFRDs7Ozs7O0dBTUc7QUFDSCxNQUFNLG9DQUFxQyxTQUFRLGVBQWU7SUFDaEUsWUFBWSxJQUFZLEVBQUUsRUFBVSxFQUFFLFlBQW9CO1FBQ3hELEtBQUssQ0FBQyx3QkFBd0IsRUFBRSxJQUFJLEVBQUUsRUFBRSxFQUFFLFlBQVksQ0FBQyxDQUFDO0lBQzFELENBQUM7Q0FDRjtBQUVEOzs7Ozs7R0FNRztBQUNILE1BQU0sbUNBQW9DLFNBQVEsZUFBZTtJQUMvRCxZQUFZLElBQVksRUFBRSxFQUFVO1FBQ2xDLEtBQUssQ0FBQyx1QkFBdUIsRUFBRSxJQUFJLEVBQUUsRUFBRSxDQUFDLENBQUM7SUFDM0MsQ0FBQztDQUNGIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRXhjZXB0aW9uIH0gZnJvbSAnQG9yYml0L2NvcmUnO1xuXG4vKipcbiAqIEFuIGNsaWVudC1zaWRlIGVycm9yIG9jY3VycmVkIHdoaWxlIGNvbW11bmljYXRpbmcgd2l0aCBhIHJlbW90ZSBzZXJ2ZXIuXG4gKiBcbiAqIEBleHBvcnRcbiAqIEBjbGFzcyBDbGllbnRFcnJvclxuICogQGV4dGVuZHMge0V4Y2VwdGlvbn1cbiAqL1xuZXhwb3J0IGNsYXNzIENsaWVudEVycm9yIGV4dGVuZHMgRXhjZXB0aW9uIHtcbiAgcHVibGljIGRlc2NyaXB0aW9uOiBzdHJpbmc7XG5cbiAgY29uc3RydWN0b3IoZGVzY3JpcHRpb246IHN0cmluZykge1xuICAgIHN1cGVyKGBDbGllbnQgZXJyb3I6ICR7ZGVzY3JpcHRpb259YCk7XG4gICAgdGhpcy5kZXNjcmlwdGlvbiA9IGRlc2NyaXB0aW9uO1xuICB9XG59XG5cbi8qKlxuICogQSBzZXJ2ZXItc2lkZSBlcnJvciBvY2N1cnJlZCB3aGlsZSBjb21tdW5pY2F0aW5nIHdpdGggYSByZW1vdGUgc2VydmVyLlxuICogXG4gKiBAZXhwb3J0XG4gKiBAY2xhc3MgU2VydmVyRXJyb3JcbiAqIEBleHRlbmRzIHtFeGNlcHRpb259XG4gKi9cbmV4cG9ydCBjbGFzcyBTZXJ2ZXJFcnJvciBleHRlbmRzIEV4Y2VwdGlvbiB7XG4gIHB1YmxpYyBkZXNjcmlwdGlvbjogc3RyaW5nO1xuXG4gIGNvbnN0cnVjdG9yKGRlc2NyaXB0aW9uOiBzdHJpbmcpIHtcbiAgICBzdXBlcihgU2VydmVyIGVycm9yOiAke2Rlc2NyaXB0aW9ufWApO1xuICAgIHRoaXMuZGVzY3JpcHRpb24gPSBkZXNjcmlwdGlvbjtcbiAgfVxufVxuXG4vKipcbiAqIEEgbmV0d29ya2luZyBlcnJvciBvY2N1cnJlZCB3aGlsZSBhdHRlbXB0aW5nIHRvIGNvbW11bmljYXRlIHdpdGggYSByZW1vdGVcbiAqIHNlcnZlci5cbiAqXG4gKiBAZXhwb3J0XG4gKiBAY2xhc3MgTmV0d29ya0Vycm9yXG4gKiBAZXh0ZW5kcyB7RXhjZXB0aW9ufVxuICovXG5leHBvcnQgY2xhc3MgTmV0d29ya0Vycm9yIGV4dGVuZHMgRXhjZXB0aW9uIHtcbiAgcHVibGljIGRlc2NyaXB0aW9uOiBzdHJpbmc7XG5cbiAgY29uc3RydWN0b3IoZGVzY3JpcHRpb246IHN0cmluZykge1xuICAgIHN1cGVyKGBOZXR3b3JrIGVycm9yOiAke2Rlc2NyaXB0aW9ufWApO1xuICAgIHRoaXMuZGVzY3JpcHRpb24gPSBkZXNjcmlwdGlvbjtcbiAgfVxufVxuXG4vKipcbiAqIEEgcXVlcnkgZXhwcmVzc2lvbiBjb3VsZCBub3QgYmUgcGFyc2VkLlxuICogXG4gKiBAZXhwb3J0XG4gKiBAY2xhc3MgUXVlcnlFeHByZXNzaW9uUGFyc2VFcnJvclxuICogQGV4dGVuZHMge0V4Y2VwdGlvbn1cbiAqL1xuZXhwb3J0IGNsYXNzIFF1ZXJ5RXhwcmVzc2lvblBhcnNlRXJyb3IgZXh0ZW5kcyBFeGNlcHRpb24ge1xuICBwdWJsaWMgZGVzY3JpcHRpb246IHN0cmluZztcbiAgcHVibGljIGV4cHJlc3Npb246IGFueTtcblxuICBjb25zdHJ1Y3RvcihkZXNjcmlwdGlvbjogc3RyaW5nLCBleHByZXNzaW9uOiBhbnkpIHtcbiAgICBzdXBlcihgUXVlcnkgZXhwcmVzc2lvbiBwYXJzZSBlcnJvcjogJHtkZXNjcmlwdGlvbn1gKTtcbiAgICB0aGlzLmRlc2NyaXB0aW9uID0gZGVzY3JpcHRpb247XG4gICAgdGhpcy5leHByZXNzaW9uID0gZXhwcmVzc2lvbjtcbiAgfVxufVxuXG4vKipcbiAqIEEgcXVlcnkgaXMgaW52YWxpZCBmb3IgYSBwYXJ0aWN1bGFyIHNvdXJjZS5cbiAqIFxuICogQGV4cG9ydFxuICogQGNsYXNzIFF1ZXJ5Tm90QWxsb3dlZFxuICogQGV4dGVuZHMge0V4Y2VwdGlvbn1cbiAqL1xuZXhwb3J0IGNsYXNzIFF1ZXJ5Tm90QWxsb3dlZCBleHRlbmRzIEV4Y2VwdGlvbiB7XG4gIHB1YmxpYyBkZXNjcmlwdGlvbjogc3RyaW5nO1xuICBwdWJsaWMgcXVlcnk6IGFueTtcblxuICBjb25zdHJ1Y3RvcihkZXNjcmlwdGlvbjogc3RyaW5nLCBxdWVyeTogYW55KSB7XG4gICAgc3VwZXIoYFF1ZXJ5IG5vdCBhbGxvd2VkOiAke2Rlc2NyaXB0aW9ufWApO1xuICAgIHRoaXMuZGVzY3JpcHRpb24gPSBkZXNjcmlwdGlvbjtcbiAgICB0aGlzLnF1ZXJ5ID0gcXVlcnk7XG4gIH1cbn1cblxuLyoqXG4gKiBBIHRyYW5zZm9ybSBpcyBpbnZhbGlkIGZvciBhIHBhcnRpY3VsYXIgc291cmNlLlxuICogXG4gKiBAZXhwb3J0XG4gKiBAY2xhc3MgVHJhbnNmb3JtTm90QWxsb3dlZFxuICogQGV4dGVuZHMge0V4Y2VwdGlvbn1cbiAqL1xuZXhwb3J0IGNsYXNzIFRyYW5zZm9ybU5vdEFsbG93ZWQgZXh0ZW5kcyBFeGNlcHRpb24ge1xuICBwdWJsaWMgZGVzY3JpcHRpb246IHN0cmluZztcbiAgcHVibGljIHRyYW5zZm9ybTogYW55O1xuXG4gIGNvbnN0cnVjdG9yKGRlc2NyaXB0aW9uOiBzdHJpbmcsIHRyYW5zZm9ybTogYW55KSB7XG4gICAgc3VwZXIoYFRyYW5zZm9ybSBub3QgYWxsb3dlZDogJHtkZXNjcmlwdGlvbn1gKTtcbiAgICB0aGlzLmRlc2NyaXB0aW9uID0gZGVzY3JpcHRpb247XG4gICAgdGhpcy50cmFuc2Zvcm0gPSB0cmFuc2Zvcm07XG4gIH1cbn1cblxuLyoqXG4gKiBBbiBlcnJvciBvY2N1cmVkIHJlbGF0ZWQgdG8gdGhlIHNjaGVtYS5cbiAqIFxuICogQGV4cG9ydFxuICogQGNsYXNzIFNjaGVtYUVycm9yXG4gKi9cbmV4cG9ydCBjbGFzcyBTY2hlbWFFcnJvciBleHRlbmRzIEV4Y2VwdGlvbiB7XG4gIHB1YmxpYyBkZXNjcmlwdGlvbjogc3RyaW5nO1xuXG4gIGNvbnN0cnVjdG9yKGRlc2NyaXB0aW9uOiBzdHJpbmcpIHtcbiAgICBzdXBlcihgU2NoZW1hIGVycm9yOiAke2Rlc2NyaXB0aW9ufWApO1xuICAgIHRoaXMuZGVzY3JpcHRpb24gPSBkZXNjcmlwdGlvbjtcbiAgfVxufVxuXG5cbi8qKlxuICogQSBtb2RlbCBjb3VsZCBub3QgYmUgZm91bmQgaW4gdGhlIHNjaGVtYS5cbiAqIFxuICogQGV4cG9ydFxuICogQGNsYXNzIE1vZGVsTm90Rm91bmRcbiAqL1xuZXhwb3J0IGNsYXNzIE1vZGVsTm90Rm91bmQgZXh0ZW5kcyBTY2hlbWFFcnJvciB7XG4gIGNvbnN0cnVjdG9yKHR5cGU6IHN0cmluZykge1xuICAgIHN1cGVyKGBNb2RlbCBkZWZpbml0aW9uIGZvciAke3R5cGV9IG5vdCBmb3VuZGApO1xuICB9XG59XG5cbi8qKlxuICogQW4gZXJyb3Igb2NjdXJyZWQgcmVsYXRlZCB0byBhIHBhcnRpY3VsYXIgcmVjb3JkLlxuICogXG4gKiBAZXhwb3J0XG4gKiBAYWJzdHJhY3RcbiAqIEBjbGFzcyBSZWNvcmRFeGNlcHRpb25cbiAqIEBleHRlbmRzIHtFeGNlcHRpb259XG4gKi9cbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBSZWNvcmRFeGNlcHRpb24gZXh0ZW5kcyBFeGNlcHRpb24ge1xuICBwdWJsaWMgZGVzY3JpcHRpb246IHN0cmluZztcbiAgcHVibGljIHR5cGU6IHN0cmluZztcbiAgcHVibGljIGlkOiBzdHJpbmc7XG4gIHB1YmxpYyByZWxhdGlvbnNoaXA6IHN0cmluZztcblxuICBjb25zdHJ1Y3RvcihkZXNjcmlwdGlvbjogc3RyaW5nLCB0eXBlOiBzdHJpbmcsIGlkOiBzdHJpbmcsIHJlbGF0aW9uc2hpcD86IHN0cmluZykge1xuICAgIGxldCBtZXNzYWdlOiBzdHJpbmcgPSBgJHtkZXNjcmlwdGlvbn06ICR7dHlwZX06JHtpZH1gO1xuXG4gICAgaWYgKHJlbGF0aW9uc2hpcCkge1xuICAgICAgbWVzc2FnZSArPSAnLycgKyByZWxhdGlvbnNoaXA7XG4gICAgfVxuXG4gICAgc3VwZXIobWVzc2FnZSk7XG5cbiAgICB0aGlzLmRlc2NyaXB0aW9uID0gZGVzY3JpcHRpb247XG4gICAgdGhpcy50eXBlID0gdHlwZTtcbiAgICB0aGlzLmlkID0gaWQ7XG4gICAgdGhpcy5yZWxhdGlvbnNoaXAgPSByZWxhdGlvbnNoaXA7XG4gIH1cbn1cblxuLyoqXG4gKiBBIHJlY29yZCBjb3VsZCBub3QgYmUgZm91bmQuXG4gKiBcbiAqIEBleHBvcnRcbiAqIEBjbGFzcyBSZWNvcmROb3RGb3VuZEV4Y2VwdGlvblxuICogQGV4dGVuZHMge1JlY29yZEV4Y2VwdGlvbn1cbiAqL1xuZXhwb3J0IGNsYXNzIFJlY29yZE5vdEZvdW5kRXhjZXB0aW9uIGV4dGVuZHMgUmVjb3JkRXhjZXB0aW9uIHtcbiAgY29uc3RydWN0b3IodHlwZTogc3RyaW5nLCBpZDogc3RyaW5nKSB7XG4gICAgc3VwZXIoJ1JlY29yZCBub3QgZm91bmQnLCB0eXBlLCBpZCk7XG4gIH1cbn1cblxuLyoqXG4gKiBBIHJlbGF0aW9uc2hpcCBjb3VsZCBub3QgYmUgZm91bmQuXG4gKiBcbiAqIEBleHBvcnRcbiAqIEBjbGFzcyBSZWxhdGlvbnNoaXBOb3RGb3VuZEV4Y2VwdGlvblxuICogQGV4dGVuZHMge1JlY29yZEV4Y2VwdGlvbn1cbiAqL1xuZXhwb3J0IGNsYXNzIFJlbGF0aW9uc2hpcE5vdEZvdW5kRXhjZXB0aW9uIGV4dGVuZHMgUmVjb3JkRXhjZXB0aW9uIHtcbiAgY29uc3RydWN0b3IodHlwZTogc3RyaW5nLCBpZDogc3RyaW5nLCByZWxhdGlvbnNoaXA6IHN0cmluZykge1xuICAgIHN1cGVyKCdSZWxhdGlvbnNoaXAgbm90IGZvdW5kJywgdHlwZSwgaWQsIHJlbGF0aW9uc2hpcCk7XG4gIH1cbn1cblxuLyoqXG4gKiBUaGUgcmVjb3JkIGFscmVhZHkgZXhpc3RzLlxuICogXG4gKiBAZXhwb3J0XG4gKiBAY2xhc3MgUmVjb3JkQWxyZWFkeUV4aXN0c0V4Y2VwdGlvblxuICogQGV4dGVuZHMge1JlY29yZEV4Y2VwdGlvbn1cbiAqL1xuZXhwb3J0IGNsYXNzIFJlY29yZEFscmVhZHlFeGlzdHNFeGNlcHRpb24gZXh0ZW5kcyBSZWNvcmRFeGNlcHRpb24ge1xuICBjb25zdHJ1Y3Rvcih0eXBlOiBzdHJpbmcsIGlkOiBzdHJpbmcpIHtcbiAgICBzdXBlcignUmVjb3JkIGFscmVhZHkgZXhpc3RzJywgdHlwZSwgaWQpO1xuICB9XG59XG4iXX0=