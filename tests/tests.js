define('tests', ['exports', '@orbit/utils', '@orbit/core'], function (exports, _orbit_utils, Orbit) { 'use strict';

var Orbit__default = 'default' in Orbit ? Orbit['default'] : Orbit;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Maintains a map between records' ids and keys.
 *
 * @export
 * @class KeyMap
 */

var KeyMap = function () {
    function KeyMap() {
        _classCallCheck(this, KeyMap);

        this.reset();
    }
    /**
     * Resets the contents of the key map.
     *
     * @memberof KeyMap
     */


    KeyMap.prototype.reset = function reset() {
        this._idsToKeys = {};
        this._keysToIds = {};
    };
    /**
     * Return a key value given a model type, key name, and id.
     *
     * @param {string} type
     * @param {string} keyName
     * @param {string} idValue
     * @returns {string}
     *
     * @memberOf KeyMap
     */


    KeyMap.prototype.idToKey = function idToKey(type, keyName, idValue) {
        return _orbit_utils.deepGet(this._idsToKeys, [type, keyName, idValue]);
    };
    /**
     * Return an id value given a model type, key name, and key value.
     *
     * @param {string} type
     * @param {string} keyName
     * @param {string} keyValue
     * @returns {string}
     *
     * @memberOf KeyMap
     */


    KeyMap.prototype.keyToId = function keyToId(type, keyName, keyValue) {
        return _orbit_utils.deepGet(this._keysToIds, [type, keyName, keyValue]);
    };
    /**
     * Store the id and key values of a record in this key map.
     *
     * @param {Record} record
     * @returns {void}
     *
     * @memberOf KeyMap
     */


    KeyMap.prototype.pushRecord = function pushRecord(record) {
        var _this = this;

        var type = record.type,
            id = record.id,
            keys = record.keys;

        if (!keys || !id) {
            return;
        }
        Object.keys(keys).forEach(function (keyName) {
            var keyValue = keys[keyName];
            if (keyValue) {
                _orbit_utils.deepSet(_this._idsToKeys, [type, keyName, id], keyValue);
                _orbit_utils.deepSet(_this._keysToIds, [type, keyName, keyValue], id);
            }
        });
    };
    /**
     * Given a record, find the cached id if it exists.
     *
     * @param {string} type
     * @param {Dict<string>} keys
     * @returns {string}
     *
     * @memberOf KeyMap
     */


    KeyMap.prototype.idFromKeys = function idFromKeys(type, keys) {
        var _this2 = this;

        var keyNames = Object.keys(keys);
        return _orbit_utils.firstResult(keyNames, function (keyName) {
            var keyValue = keys[keyName];
            if (keyValue) {
                return _this2.keyToId(type, keyName, keyValue);
            }
        });
    };

    return KeyMap;
}();

Orbit__default.Promise = RSVP.Promise;

RSVP.Promise.prototype.spread = function (onFulfillment, onRejection, label) {
    return this.then(function (array) {
        return onFulfillment.apply(void 0, array);
    }, onRejection, label);
};
RSVP.Promise.prototype.tap = function (callback) {
    return this.then(function (result) {
        return Promise.resolve(callback(result)).then(function () {
            return result;
        });
    });
};

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _classCallCheck$1(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); }

/**
 * A simple implementation of a Bucket that saves values to an in-memory
 * object. Not practical, since Buckets are intended to persist values from
 * memory, but useful for testing.
 */

var FakeBucket = function (_Bucket) {
    _inherits(FakeBucket, _Bucket);

    function FakeBucket() {
        var settings = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

        _classCallCheck$1(this, FakeBucket);

        var _this = _possibleConstructorReturn(this, _Bucket.call(this, settings));

        _this.data = {};
        return _this;
    }

    FakeBucket.prototype.getItem = function getItem(key) {
        return Orbit__default.Promise.resolve(this.data[key]);
    };

    FakeBucket.prototype.setItem = function setItem(key, value) {
        this.data[key] = value;
        return Orbit__default.Promise.resolve();
    };

    FakeBucket.prototype.removeItem = function removeItem(key) {
        delete this.data[key];
        return Orbit__default.Promise.resolve();
    };

    return FakeBucket;
}(Orbit.Bucket);

var _QUnit = QUnit;
var module$1 = _QUnit.module;
var test = _QUnit.test;

module$1('KeyMap', function (hooks) {
    test('#pushRecord adds mappings; #keyToId and #idToKey access them', function (assert$$1) {
        var keyMap = new KeyMap();
        keyMap.pushRecord({ type: 'planet', id: '1', keys: { remoteId: 'a' } });
        keyMap.pushRecord({ type: 'planet', id: '2', keys: { remoteId: 'b' } });
        keyMap.pushRecord({ type: 'moon', id: '1', keys: { remoteId: 'c' } });
        keyMap.pushRecord({ type: 'moon', id: '2', keys: { remoteId: 'a' } });
        keyMap.pushRecord({ type: 'planet', id: '3', keys: { anotherKey: 'd' } });
        assert$$1.equal(keyMap.keyToId('moon', 'remoteId', 'c'), '1');
        assert$$1.equal(keyMap.keyToId('planet', 'remoteId', 'a'), '1');
        assert$$1.equal(keyMap.keyToId('planet', 'anotherKey', 'd'), '3');
        assert$$1.equal(keyMap.keyToId('planet', 'remoteId', 'bogus'), undefined);
        assert$$1.equal(keyMap.idToKey('planet', 'remoteId', '2'), 'b');
        assert$$1.equal(keyMap.idToKey('moon', 'remoteId', '2'), 'a');
        assert$$1.equal(keyMap.idToKey('planet', 'anotherKey', '3'), 'd');
        assert$$1.equal(keyMap.idToKey('planet', 'remoteId', 'bogus'), undefined);
    });
    test('#reset clears mappings', function (assert$$1) {
        var keyMap = new KeyMap();
        keyMap.pushRecord({ type: 'planet', id: '1', keys: { remoteId: 'a' } });
        assert$$1.equal(keyMap.keyToId('planet', 'remoteId', 'a'), '1');
        assert$$1.equal(keyMap.idToKey('planet', 'remoteId', '1'), 'a');
        keyMap.reset();
        assert$$1.equal(keyMap.keyToId('planet', 'remoteId', 'a'), undefined);
        assert$$1.equal(keyMap.idToKey('planet', 'remoteId', '1'), undefined);
    });
    test('#pushRecord does not set incomplete records', function (assert$$1) {
        var keyMap = new KeyMap();
        keyMap.pushRecord({ type: 'planet', id: null, keys: { remoteId: 'a' } });
        assert$$1.strictEqual(keyMap.keyToId('planet', 'remoteId', 'a'), undefined);
        keyMap.pushRecord({ type: 'planet', id: '1', keys: { remoteId: null } });
        assert$$1.strictEqual(keyMap.idToKey('planet', 'remoteId', '1'), undefined);
    });
    test('#idFromKeys retrieves an id given a set of keys', function (assert$$1) {
        var keyMap = new KeyMap();
        keyMap.pushRecord({ type: 'planet', id: '1', keys: { remoteId: 'a' } });
        var foundId = keyMap.idFromKeys('planet', { remoteId: 'a' });
        assert$$1.equal(foundId, '1', 'Found previously pushed id');
        var missingId = keyMap.idFromKeys('planet', { remoteId: 'b' });
        assert$$1.equal(missingId, undefined, 'returns undefined when id cannot be found');
    });
});

function _defaults$1(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _classCallCheck$2(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn$1(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits$1(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults$1(subClass, superClass); }

/**
 * An client-side error occurred while communicating with a remote server.
 *
 * @export
 * @class ClientError
 * @extends {Exception}
 */
var ClientError = function (_Exception) {
    _inherits$1(ClientError, _Exception);

    function ClientError(description) {
        _classCallCheck$2(this, ClientError);

        var _this = _possibleConstructorReturn$1(this, _Exception.call(this, 'Client error: ' + description));

        _this.description = description;
        return _this;
    }

    return ClientError;
}(Orbit.Exception);
/**
 * A server-side error occurred while communicating with a remote server.
 *
 * @export
 * @class ServerError
 * @extends {Exception}
 */
var ServerError = function (_Exception2) {
    _inherits$1(ServerError, _Exception2);

    function ServerError(description) {
        _classCallCheck$2(this, ServerError);

        var _this2 = _possibleConstructorReturn$1(this, _Exception2.call(this, 'Server error: ' + description));

        _this2.description = description;
        return _this2;
    }

    return ServerError;
}(Orbit.Exception);
/**
 * A networking error occurred while attempting to communicate with a remote
 * server.
 *
 * @export
 * @class NetworkError
 * @extends {Exception}
 */
var NetworkError = function (_Exception3) {
    _inherits$1(NetworkError, _Exception3);

    function NetworkError(description) {
        _classCallCheck$2(this, NetworkError);

        var _this3 = _possibleConstructorReturn$1(this, _Exception3.call(this, 'Network error: ' + description));

        _this3.description = description;
        return _this3;
    }

    return NetworkError;
}(Orbit.Exception);
/**
 * A query expression could not be parsed.
 *
 * @export
 * @class QueryExpressionParseError
 * @extends {Exception}
 */
var QueryExpressionParseError = function (_Exception4) {
    _inherits$1(QueryExpressionParseError, _Exception4);

    function QueryExpressionParseError(description, expression) {
        _classCallCheck$2(this, QueryExpressionParseError);

        var _this4 = _possibleConstructorReturn$1(this, _Exception4.call(this, 'Query expression parse error: ' + description));

        _this4.description = description;
        _this4.expression = expression;
        return _this4;
    }

    return QueryExpressionParseError;
}(Orbit.Exception);
/**
 * A query is invalid for a particular source.
 *
 * @export
 * @class QueryNotAllowed
 * @extends {Exception}
 */
var QueryNotAllowed = function (_Exception5) {
    _inherits$1(QueryNotAllowed, _Exception5);

    function QueryNotAllowed(description, query) {
        _classCallCheck$2(this, QueryNotAllowed);

        var _this5 = _possibleConstructorReturn$1(this, _Exception5.call(this, 'Query not allowed: ' + description));

        _this5.description = description;
        _this5.query = query;
        return _this5;
    }

    return QueryNotAllowed;
}(Orbit.Exception);
/**
 * A transform is invalid for a particular source.
 *
 * @export
 * @class TransformNotAllowed
 * @extends {Exception}
 */
var TransformNotAllowed = function (_Exception6) {
    _inherits$1(TransformNotAllowed, _Exception6);

    function TransformNotAllowed(description, transform) {
        _classCallCheck$2(this, TransformNotAllowed);

        var _this6 = _possibleConstructorReturn$1(this, _Exception6.call(this, 'Transform not allowed: ' + description));

        _this6.description = description;
        _this6.transform = transform;
        return _this6;
    }

    return TransformNotAllowed;
}(Orbit.Exception);
/**
 * An error occured related to the schema.
 *
 * @export
 * @class SchemaError
 */
var SchemaError = function (_Exception7) {
    _inherits$1(SchemaError, _Exception7);

    function SchemaError(description) {
        _classCallCheck$2(this, SchemaError);

        var _this7 = _possibleConstructorReturn$1(this, _Exception7.call(this, 'Schema error: ' + description));

        _this7.description = description;
        return _this7;
    }

    return SchemaError;
}(Orbit.Exception);
/**
 * A model could not be found in the schema.
 *
 * @export
 * @class ModelNotFound
 */
var ModelNotFound = function (_SchemaError) {
    _inherits$1(ModelNotFound, _SchemaError);

    function ModelNotFound(type) {
        _classCallCheck$2(this, ModelNotFound);

        return _possibleConstructorReturn$1(this, _SchemaError.call(this, 'Model definition for ' + type + ' not found'));
    }

    return ModelNotFound;
}(SchemaError);
/**
 * An error occurred related to a particular record.
 *
 * @export
 * @abstract
 * @class RecordException
 * @extends {Exception}
 */
var RecordException = function (_Exception8) {
    _inherits$1(RecordException, _Exception8);

    function RecordException(description, type, id, relationship) {
        _classCallCheck$2(this, RecordException);

        var message = description + ': ' + type + ':' + id;
        if (relationship) {
            message += '/' + relationship;
        }

        var _this9 = _possibleConstructorReturn$1(this, _Exception8.call(this, message));

        _this9.description = description;
        _this9.type = type;
        _this9.id = id;
        _this9.relationship = relationship;
        return _this9;
    }

    return RecordException;
}(Orbit.Exception);
/**
 * A record could not be found.
 *
 * @export
 * @class RecordNotFoundException
 * @extends {RecordException}
 */
var RecordNotFoundException = function (_RecordException) {
    _inherits$1(RecordNotFoundException, _RecordException);

    function RecordNotFoundException(type, id) {
        _classCallCheck$2(this, RecordNotFoundException);

        return _possibleConstructorReturn$1(this, _RecordException.call(this, 'Record not found', type, id));
    }

    return RecordNotFoundException;
}(RecordException);
/**
 * A relationship could not be found.
 *
 * @export
 * @class RelationshipNotFoundException
 * @extends {RecordException}
 */
var RelationshipNotFoundException = function (_RecordException2) {
    _inherits$1(RelationshipNotFoundException, _RecordException2);

    function RelationshipNotFoundException(type, id, relationship) {
        _classCallCheck$2(this, RelationshipNotFoundException);

        return _possibleConstructorReturn$1(this, _RecordException2.call(this, 'Relationship not found', type, id, relationship));
    }

    return RelationshipNotFoundException;
}(RecordException);
/**
 * The record already exists.
 *
 * @export
 * @class RecordAlreadyExistsException
 * @extends {RecordException}
 */
var RecordAlreadyExistsException = function (_RecordException3) {
    _inherits$1(RecordAlreadyExistsException, _RecordException3);

    function RecordAlreadyExistsException(type, id) {
        _classCallCheck$2(this, RecordAlreadyExistsException);

        return _possibleConstructorReturn$1(this, _RecordException3.call(this, 'Record already exists', type, id));
    }

    return RecordAlreadyExistsException;
}(RecordException);

function cloneRecordIdentity(identity) {
    var type = identity.type,
        id = identity.id;

    return { type: type, id: id };
}
function equalRecordIdentities(record1, record2) {
    return _orbit_utils.isNone(record1) && _orbit_utils.isNone(record2) || _orbit_utils.isObject(record1) && _orbit_utils.isObject(record2) && record1.type === record2.type && record1.id === record2.id;
}

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
    _orbit_utils.deepSet(record, ['relationships', relationship, 'data'], cloneRecordIdentity(relatedRecord));
}
function updateRecordReplaceHasMany(record, relationship, relatedRecords) {
    _orbit_utils.deepSet(record, ['relationships', relationship, 'data'], relatedRecords.map(cloneRecordIdentity));
}
function updateRecordAddToHasMany(record, relationship, relatedRecord) {
    var data = _orbit_utils.deepGet(record, ['relationships', relationship, 'data']) || [];
    data.push(cloneRecordIdentity(relatedRecord));
    _orbit_utils.deepSet(record, ['relationships', relationship, 'data'], data);
}
function updateRecordRemoveFromHasMany(record, relationship, relatedRecord) {
    var data = _orbit_utils.deepGet(record, ['relationships', relationship, 'data']);
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
function coalesceRecordOperations(operations) {
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

function _defaults$2(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _possibleConstructorReturn$2(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits$2(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults$2(subClass, superClass); }

function _classCallCheck$4(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Query terms are used by query builders to allow for the construction of
 * query expressions in composable patterns.
 *
 * @export
 * @class QueryTerm
 */
var QueryTerm = function () {
    function QueryTerm(expression) {
        _classCallCheck$4(this, QueryTerm);

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
var FindRecordTerm = function (_QueryTerm) {
    _inherits$2(FindRecordTerm, _QueryTerm);

    function FindRecordTerm(record) {
        _classCallCheck$4(this, FindRecordTerm);

        var expression = {
            op: 'findRecord',
            record: record
        };
        return _possibleConstructorReturn$2(this, _QueryTerm.call(this, expression));
    }

    return FindRecordTerm;
}(QueryTerm);
var FindRelatedRecordTerm = function (_QueryTerm2) {
    _inherits$2(FindRelatedRecordTerm, _QueryTerm2);

    function FindRelatedRecordTerm(record, relationship) {
        _classCallCheck$4(this, FindRelatedRecordTerm);

        var expression = {
            op: 'findRelatedRecord',
            record: record,
            relationship: relationship
        };
        return _possibleConstructorReturn$2(this, _QueryTerm2.call(this, expression));
    }

    return FindRelatedRecordTerm;
}(QueryTerm);
var FindRelatedRecordsTerm = function (_QueryTerm3) {
    _inherits$2(FindRelatedRecordsTerm, _QueryTerm3);

    function FindRelatedRecordsTerm(record, relationship) {
        _classCallCheck$4(this, FindRelatedRecordsTerm);

        var expression = {
            op: 'findRelatedRecords',
            record: record,
            relationship: relationship
        };
        return _possibleConstructorReturn$2(this, _QueryTerm3.call(this, expression));
    }

    return FindRelatedRecordsTerm;
}(QueryTerm);
var FindRecordsTerm = function (_QueryTerm4) {
    _inherits$2(FindRecordsTerm, _QueryTerm4);

    function FindRecordsTerm(type) {
        _classCallCheck$4(this, FindRecordsTerm);

        var expression = {
            op: 'findRecords',
            type: type
        };
        return _possibleConstructorReturn$2(this, _QueryTerm4.call(this, expression));
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
    if (_orbit_utils.isObject(filterSpecifier)) {
        var s = filterSpecifier;
        s.kind = s.kind || 'attribute';
        s.op = s.op || 'equal';
        return s;
    }
}
function parseSortSpecifier(sortSpecifier) {
    if (_orbit_utils.isObject(sortSpecifier)) {
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

function _classCallCheck$3(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var QueryBuilder = function () {
    function QueryBuilder() {
        _classCallCheck$3(this, QueryBuilder);
    }

    /**
     * Find a record by its identity.
     *
     * @param {RecordIdentity} recordIdentity
     * @returns {FindRecordTerm}
     */
    QueryBuilder.prototype.findRecord = function findRecord(record) {
        return new FindRecordTerm(record);
    };
    /**
     * Find all records of a specific type.
     *
     * If `type` is unspecified, find all records unfiltered by type.
     *
     * @param {string} [type]
     * @returns {FindRecordsTerm}
     */


    QueryBuilder.prototype.findRecords = function findRecords(type) {
        return new FindRecordsTerm(type);
    };
    /**
     * Find a record in a to-one relationship.
     *
     * @param {RecordIdentity} record
     * @param {string} relationship
     * @returns {FindRelatedRecordTerm}
     */


    QueryBuilder.prototype.findRelatedRecord = function findRelatedRecord(record, relationship) {
        return new FindRelatedRecordTerm(record, relationship);
    };
    /**
     * Find records in a to-many relationship.
     *
     * @param {RecordIdentity} record
     * @param {string} relationship
     * @returns {FindRelatedRecordsTerm}
     */


    QueryBuilder.prototype.findRelatedRecords = function findRelatedRecords(record, relationship) {
        return new FindRelatedRecordsTerm(record, relationship);
    };

    return QueryBuilder;
}();

/**
 * A builder function for creating a Query from its constituent parts.
 *
 * If a `Query` is passed in with an `id` and `expression`, and no replacement
 * `id` or `options` are also passed in, then the `Query` will be returned
 * unchanged.
 *
 * For all other cases, a new `Query` object will be created and returned.
 *
 * Queries will be assigned the specified `queryId` as `id`. If none is
 * specified, a UUID will be generated.
 *
 * @export
 * @param {QueryOrExpression} queryOrExpression
 * @param {object} [queryOptions]
 * @param {string} [queryId]
 * @param {QueryBuilder} [queryBuilder]
 * @returns {Query}
 */
function buildQuery(queryOrExpression, queryOptions, queryId, queryBuilder) {
    if (typeof queryOrExpression === 'function') {
        return buildQuery(queryOrExpression(queryBuilder), queryOptions, queryId);
    } else {
        var query = queryOrExpression;
        var expression = void 0;
        var options = void 0;
        if (_orbit_utils.isObject(query) && query.expression) {
            if (query.id && !queryOptions && !queryId) {
                return query;
            }
            expression = query.expression;
            options = queryOptions || query.options;
        } else {
            if (queryOrExpression instanceof QueryTerm) {
                expression = queryOrExpression.toQueryExpression();
            } else {
                expression = queryOrExpression;
            }
            options = queryOptions;
        }
        var id = queryId || Orbit__default.uuid();
        return { expression: expression, options: options, id: id };
    }
}

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck$5(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var __decorate = undefined && undefined.__decorate || function (decorators, target, key, desc) {
    var c = arguments.length,
        r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
        d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) {
        if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    }return c > 3 && r && Object.defineProperty(target, key, r), r;
};
/* eslint-disable valid-jsdoc */
/**
 * A `Schema` defines the models allowed in a source, including their keys,
 * attributes, and relationships. A single schema may be shared across multiple
 * sources.
 *
 * @export
 * @class Schema
 * @implements {Evented}
 */
var Schema = function () {
    /**
     * Create a new Schema.
     *
     * @constructor
     * @param {SchemaSettings} [settings={}] Optional. Configuration settings.
     * @param {Integer}        [settings.version]       Optional. Schema version. Defaults to 1.
     * @param {Object}   [settings.models]        Optional. Schemas for individual models supported by this schema.
     * @param {Function} [settings.generateId]    Optional. Function used to generate IDs.
     * @param {Function} [settings.pluralize]     Optional. Function used to pluralize names.
     * @param {Function} [settings.singularize]   Optional. Function used to singularize names.
     */
    function Schema() {
        var settings = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

        _classCallCheck$5(this, Schema);

        if (settings.version === undefined) {
            settings.version = 1;
        }
        if (settings.models === undefined) {
            settings.models = {};
        }
        this._applySettings(settings);
    }
    /**
     * Version
     * @return {Integer} Version of schema.
     */


    /**
     * Upgrades Schema to a new version with new settings.
     *
     * Emits the `upgrade` event to cue sources to upgrade their data.
     *
     * @param {SchemaSettings} [settings={}]          Settings.
     * @param {Integer}        [settings.version]     Optional. Schema version. Defaults to the current version + 1.
     * @param {Object}         [settings.models]      Schemas for individual models supported by this schema.
     * @param {Function}       [settings.pluralize]   Optional. Function used to pluralize names.
     * @param {Function}       [settings.singularize] Optional. Function used to singularize names.
     */
    Schema.prototype.upgrade = function upgrade() {
        var settings = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

        if (settings.version === undefined) {
            settings.version = this._version + 1;
        }
        this._applySettings(settings);
        this.emit('upgrade', this._version);
    };
    /**
     * Registers a complete set of settings
     *
     * @private
     * @param {Object} settings Settings passed into `constructor` or `upgrade`.
     */


    Schema.prototype._applySettings = function _applySettings(settings) {
        // Version
        this._version = settings.version;
        // Allow overrides
        if (settings.generateId) {
            this.generateId = settings.generateId;
        }
        if (settings.pluralize) {
            this.pluralize = settings.pluralize;
        }
        if (settings.singularize) {
            this.singularize = settings.singularize;
        }
        // Register model schemas
        if (settings.models) {
            this._models = settings.models;
        }
    };
    /**
     * Generate an id for a given model type.
     *
     * @param {String} type Optional. Type of the model for which the ID is being generated.
     * @return {String} Generated model ID
     */


    Schema.prototype.generateId = function generateId(type) {
        return Orbit__default.uuid();
    };
    /**
     * A naive pluralization method.
     *
     * Override with a more robust general purpose inflector or provide an
     * inflector tailored to the vocabularly of your application.
     *
     * @param  {String} word
     * @return {String} plural form of `word`
     */


    Schema.prototype.pluralize = function pluralize(word) {
        return word + 's';
    };
    /**
     * A naive singularization method.
     *
     * Override with a more robust general purpose inflector or provide an
     * inflector tailored to the vocabularly of your application.
     *
     * @param  {String} word
     * @return {String} singular form of `word`
     */


    Schema.prototype.singularize = function singularize(word) {
        if (word.lastIndexOf('s') === word.length - 1) {
            return word.substr(0, word.length - 1);
        } else {
            return word;
        }
    };

    Schema.prototype.initializeRecord = function initializeRecord(record) {
        if (record.id === undefined) {
            record.id = this.generateId(record.type);
        }
    };

    Schema.prototype.getModel = function getModel(type) {
        var model = this.models[type];
        if (model) {
            return model;
        } else {
            throw new ModelNotFound(type);
        }
    };

    Schema.prototype.hasAttribute = function hasAttribute(type, attribute) {
        var model = this.getModel(type);
        if (model.attributes && model.attributes[attribute]) {
            return true;
        } else {
            return false;
        }
    };

    Schema.prototype.hasRelationship = function hasRelationship(type, relationship) {
        var model = this.getModel(type);
        if (model.relationships && model.relationships[relationship]) {
            return true;
        } else {
            return false;
        }
    };

    _createClass(Schema, [{
        key: "version",
        get: function () {
            return this._version;
        }
    }, {
        key: "models",
        get: function () {
            return this._models;
        }
    }]);

    return Schema;
}();
Schema = __decorate([Orbit.evented], Schema);
var Schema$1 = Schema;

var _createClass$2 = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck$7(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var TransformBuilder = function () {
    function TransformBuilder() {
        var settings = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

        _classCallCheck$7(this, TransformBuilder);

        this._recordInitializer = settings.recordInitializer;
    }

    /**
     * Instantiate a new `addRecord` operation.
     *
     * @param {Record} record
     * @returns {AddRecordOperation}
     */
    TransformBuilder.prototype.addRecord = function addRecord(record) {
        if (this._recordInitializer) {
            this._recordInitializer.initializeRecord(record);
        }
        return { op: 'addRecord', record: record };
    };
    /**
     * Instantiate a new `replaceRecord` operation.
     *
     * @param {Record} record
     * @returns {ReplaceRecordOperation}
     */


    TransformBuilder.prototype.replaceRecord = function replaceRecord(record) {
        return { op: 'replaceRecord', record: record };
    };
    /**
     * Instantiate a new `removeRecord` operation.
     *
     * @param {RecordIdentity} record
     * @returns {RemoveRecordOperation}
     */


    TransformBuilder.prototype.removeRecord = function removeRecord(record) {
        return { op: 'removeRecord', record: record };
    };
    /**
     * Instantiate a new `replaceKey` operation.
     *
     * @param {RecordIdentity} record
     * @param {string} key
     * @param {string} value
     * @returns {ReplaceKeyOperation}
     */


    TransformBuilder.prototype.replaceKey = function replaceKey(record, key, value) {
        return { op: 'replaceKey', record: record, key: key, value: value };
    };
    /**
     * Instantiate a new `replaceAttribute` operation.
     *
     * @param {RecordIdentity} record
     * @param {string} attribute
     * @param {*} value
     * @returns {ReplaceAttributeOperation}
     */


    TransformBuilder.prototype.replaceAttribute = function replaceAttribute(record, attribute, value) {
        return { op: 'replaceAttribute', record: record, attribute: attribute, value: value };
    };
    /**
     * Instantiate a new `addToRelatedRecords` operation.
     *
     * @param {RecordIdentity} record
     * @param {string} relationship
     * @param {RecordIdentity} relatedRecord
     * @returns {AddToRelatedRecordsOperation}
     */


    TransformBuilder.prototype.addToRelatedRecords = function addToRelatedRecords(record, relationship, relatedRecord) {
        return { op: 'addToRelatedRecords', record: record, relationship: relationship, relatedRecord: relatedRecord };
    };
    /**
     * Instantiate a new `removeFromRelatedRecords` operation.
     *
     * @param {RecordIdentity} record
     * @param {string} relationship
     * @param {RecordIdentity} relatedRecord
     * @returns {RemoveFromRelatedRecordsOperation}
     */


    TransformBuilder.prototype.removeFromRelatedRecords = function removeFromRelatedRecords(record, relationship, relatedRecord) {
        return { op: 'removeFromRelatedRecords', record: record, relationship: relationship, relatedRecord: relatedRecord };
    };
    /**
     * Instantiate a new `replaceRelatedRecords` operation.
     *
     * @param {RecordIdentity} record
     * @param {string} relationship
     * @param {RecordIdentity[]} relatedRecords
     * @returns {ReplaceRelatedRecordsOperation}
     */


    TransformBuilder.prototype.replaceRelatedRecords = function replaceRelatedRecords(record, relationship, relatedRecords) {
        return { op: 'replaceRelatedRecords', record: record, relationship: relationship, relatedRecords: relatedRecords };
    };
    /**
     * Instantiate a new `replaceRelatedRecord` operation.
     *
     * @param {RecordIdentity} record
     * @param {string} relationship
     * @param {RecordIdentity} relatedRecord
     * @returns {ReplaceRelatedRecordOperation}
     */


    TransformBuilder.prototype.replaceRelatedRecord = function replaceRelatedRecord(record, relationship, relatedRecord) {
        return { op: 'replaceRelatedRecord', record: record, relationship: relationship, relatedRecord: relatedRecord };
    };

    _createClass$2(TransformBuilder, [{
        key: 'recordInitializer',
        get: function () {
            return this._recordInitializer;
        }
    }]);

    return TransformBuilder;
}();

var _createClass$1 = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck$6(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var __decorate$1 = undefined && undefined.__decorate || function (decorators, target, key, desc) {
    var c = arguments.length,
        r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
        d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) {
        if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    }return c > 3 && r && Object.defineProperty(target, key, r), r;
};
/**
 Base class for sources.

 @class Source
 @namespace Orbit
 @param {Object} [settings] - settings for source
 @param {String} [settings.name] - Name for source
 @param {Schema} [settings.schema] - Schema for source
 @constructor
 */
var Source = function () {
    function Source() {
        var _this = this;

        var settings = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

        _classCallCheck$6(this, Source);

        this._schema = settings.schema;
        this._keyMap = settings.keyMap;
        var name = this._name = settings.name;
        var bucket = this._bucket = settings.bucket;
        this._queryBuilder = settings.queryBuilder;
        this._transformBuilder = settings.transformBuilder;
        var requestQueueSettings = settings.requestQueueSettings || {};
        var syncQueueSettings = settings.syncQueueSettings || {};
        if (bucket) {
            _orbit_utils.assert('TransformLog requires a name if it has a bucket', !!name);
        }
        this._transformLog = new Orbit.Log({ name: name ? name + "-log" : undefined, bucket: bucket });
        this._requestQueue = new Orbit.TaskQueue(this, Object.assign({ name: name ? name + "-requests" : undefined, bucket: bucket }, requestQueueSettings));
        this._syncQueue = new Orbit.TaskQueue(this, Object.assign({ name: name ? name + "-sync" : undefined, bucket: bucket }, syncQueueSettings));
        if (this._schema && (settings.autoUpgrade === undefined || settings.autoUpgrade)) {
            this._schema.on('upgrade', function () {
                return _this.upgrade();
            });
        }
    }

    // Performer interface
    Source.prototype.perform = function perform(task) {
        var method = "__" + task.type + "__";
        return this[method].call(this, task.data);
    };

    /**
     * Upgrade source as part of a schema upgrade.
     *
     * @returns {Promise<void>}
     * @memberof Source
     */
    Source.prototype.upgrade = function upgrade() {
        return Orbit__default.Promise.resolve();
    };
    /////////////////////////////////////////////////////////////////////////////
    // Private methods
    /////////////////////////////////////////////////////////////////////////////
    /**
     Notifies listeners that this source has been transformed by emitting the
     `transform` event.
        Resolves when any promises returned to event listeners are resolved.
        Also, adds an entry to the Source's `transformLog` for each transform.
        @private
     @method _transformed
     @param {Array} transforms - Transforms that have occurred.
     @returns {Promise} Promise that resolves to transforms.
    */


    Source.prototype._transformed = function _transformed(transforms) {
        var _this2 = this;

        return transforms.reduce(function (chain, transform) {
            return chain.then(function () {
                if (_this2._transformLog.contains(transform.id)) {
                    return Orbit__default.Promise.resolve();
                }
                return _this2._transformLog.append(transform.id).then(function () {
                    return Orbit.settleInSeries(_this2, 'transform', transform);
                });
            });
        }, Orbit__default.Promise.resolve()).then(function () {
            return transforms;
        });
    };

    Source.prototype._enqueueRequest = function _enqueueRequest(type, data) {
        return this._requestQueue.push({ type: type, data: data });
    };

    Source.prototype._enqueueSync = function _enqueueSync(type, data) {
        return this._syncQueue.push({ type: type, data: data });
    };

    _createClass$1(Source, [{
        key: "name",
        get: function () {
            return this._name;
        }
    }, {
        key: "schema",
        get: function () {
            return this._schema;
        }
    }, {
        key: "keyMap",
        get: function () {
            return this._keyMap;
        }
    }, {
        key: "bucket",
        get: function () {
            return this._bucket;
        }
    }, {
        key: "transformLog",
        get: function () {
            return this._transformLog;
        }
    }, {
        key: "requestQueue",
        get: function () {
            return this._requestQueue;
        }
    }, {
        key: "syncQueue",
        get: function () {
            return this._syncQueue;
        }
    }, {
        key: "queryBuilder",
        get: function () {
            var qb = this._queryBuilder;
            if (qb === undefined) {
                qb = this._queryBuilder = new QueryBuilder();
            }
            return qb;
        }
    }, {
        key: "transformBuilder",
        get: function () {
            var tb = this._transformBuilder;
            if (tb === undefined) {
                tb = this._transformBuilder = new TransformBuilder({
                    recordInitializer: this._schema
                });
            }
            return tb;
        }
    }]);

    return Source;
}();
Source = __decorate$1([Orbit.evented], Source);

/* eslint-disable valid-jsdoc */
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
function buildTransform(transformOrOperations, transformOptions, transformId, transformBuilder) {
    if (typeof transformOrOperations === 'function') {
        return buildTransform(transformOrOperations(transformBuilder), transformOptions, transformId);
    } else {
        var transform = transformOrOperations;
        var operations = void 0;
        var options = void 0;
        if (_orbit_utils.isObject(transform) && transform.operations) {
            if (transform.id && !transformOptions && !transformId) {
                return transform;
            }
            operations = transform.operations;
            options = transformOptions || transform.options;
        } else {
            if (_orbit_utils.isArray(transformOrOperations)) {
                operations = transformOrOperations;
            } else {
                operations = [transformOrOperations];
            }
            options = transformOptions;
        }
        var id = transformId || Orbit__default.uuid();
        return { operations: operations, options: options, id: id };
    }
}

var PULLABLE = '__pullable__';
/**
 * Has a source been decorated as `@pullable`?
 *
 * @export
 * @param {Source} source
 * @returns
 */
function isPullable(source) {
    return !!source[PULLABLE];
}
/**
 * Marks a source as "pullable" and adds an implementation of the `Pullable`
 * interface.
 *
 * The `pull` method is part of the "request flow" in Orbit. Requests trigger
 * events before and after processing of each request. Observers can delay the
 * resolution of a request by returning a promise in an event listener.
 *
 * A pullable source emits the following events:
 *
 * - `beforePull` - emitted prior to the processing of `pull`, this event
 * includes the requested `Query` as an argument.
 *
 * - `pull` - emitted after a `pull` has successfully been requested, this
 * event's arguments include both the requested `Query` and an array of the
 * resulting `Transform` instances.
 *
 * - `pullFail` - emitted when an error has occurred processing a `pull`, this
 * event's arguments include both the requested `Query` and the error.
 *
 * A pullable source must implement a private method `_pull`, which performs
 * the processing required for `pull` and returns a promise that resolves to an
 * array of `Transform` instances.
 *
 * @export
 * @decorator
 * @param {SourceClass} Klass
 * @returns {void}
 */
function pullable(Klass) {
    var proto = Klass.prototype;
    if (isPullable(proto)) {
        return;
    }
    _orbit_utils.assert('Pullable interface can only be applied to a Source', proto instanceof Source);
    proto[PULLABLE] = true;
    proto.pull = function (queryOrExpression, options, id) {
        var query = buildQuery(queryOrExpression, options, id, this.queryBuilder);
        return this._enqueueRequest('pull', query);
    };
    proto.__pull__ = function (query) {
        var _this = this;

        return Orbit.fulfillInSeries(this, 'beforePull', query).then(function () {
            return _this._pull(query);
        }).then(function (result) {
            return _this._transformed(result);
        }).then(function (result) {
            return Orbit.settleInSeries(_this, 'pull', query, result).then(function () {
                return result;
            });
        }).catch(function (error) {
            return Orbit.settleInSeries(_this, 'pullFail', query, error).then(function () {
                throw error;
            });
        });
    };
}

var PUSHABLE = '__pushable__';
/**
 * Has a source been decorated as `@pushable`?
 *
 * @export
 * @param {Source} source
 * @returns
 */
function isPushable(source) {
    return !!source[PUSHABLE];
}
/**
 * Marks a source as "pushable" and adds an implementation of the `Pushable`
 * interface.
 *
 * The `push` method is part of the "request flow" in Orbit. Requests trigger
 * events before and after processing of each request. Observers can delay the
 * resolution of a request by returning a promise in an event listener.
 *
 * A pushable source emits the following events:
 *
 * - `beforePush` - emitted prior to the processing of `push`, this event
 * includes the requested `Transform` as an argument.
 *
 * - `push` - emitted after a `push` has successfully been applied, this event's
 * arguments include both the requested `Transform` and an array of the actual
 * applied `Transform` instances.
 *
 * - `pushFail` - emitted when an error has occurred pushing a transform, this
 * event's arguments include both the requested `Transform` and the error.
 *
 * A pushable source must implement a private method `_push`, which performs
 * the processing required for `push` and returns a promise that resolves to an
 * array of `Transform` instances.
 *
 * @export
 * @decorator
 * @param {SourceClass} Klass
 * @returns {void}
 */
function pushable(Klass) {
    var proto = Klass.prototype;
    if (isPushable(proto)) {
        return;
    }
    _orbit_utils.assert('Pushable interface can only be applied to a Source', proto instanceof Source);
    proto[PUSHABLE] = true;
    proto.push = function (transformOrOperations, options, id) {
        var transform = buildTransform(transformOrOperations, options, id, this.transformBuilder);
        if (this.transformLog.contains(transform.id)) {
            return Orbit__default.Promise.resolve([]);
        }
        return this._enqueueRequest('push', transform);
    };
    proto.__push__ = function (transform) {
        var _this = this;

        if (this.transformLog.contains(transform.id)) {
            return Orbit__default.Promise.resolve([]);
        }
        return Orbit.fulfillInSeries(this, 'beforePush', transform).then(function () {
            if (_this.transformLog.contains(transform.id)) {
                return Orbit__default.Promise.resolve([]);
            } else {
                return _this._push(transform).then(function (result) {
                    return _this._transformed(result).then(function () {
                        return Orbit.settleInSeries(_this, 'push', transform, result);
                    }).then(function () {
                        return result;
                    });
                });
            }
        }).catch(function (error) {
            return Orbit.settleInSeries(_this, 'pushFail', transform, error).then(function () {
                throw error;
            });
        });
    };
}

var QUERYABLE = '__queryable__';
/**
 * Has a source been decorated as `@queryable`?
 *
 * @export
 * @param {object} obj
 * @returns
 */
function isQueryable(source) {
    return !!source[QUERYABLE];
}
/**
 * Marks a source as "queryable" and adds an implementation of the `Queryable`
 * interface.
 *
 * The `query` method is part of the "request flow" in Orbit. Requests trigger
 * events before and after processing of each request. Observers can delay the
 * resolution of a request by returning a promise in an event listener.
 *
 * The `Queryable` interface introduces the following events:
 *
 * - `beforeQuery` - emitted prior to the processing of `query`, this event
 * includes the requested `Query` as an argument.
 *
 * - `query` - emitted after a `query` has successfully returned, this event's
 * arguments include both the requested `Query` and the results.
 *
 * - `queryFail` - emitted when an error has occurred processing a query, this
 * event's arguments include both the requested `Query` and the error.
 *
 * A queryable source must implement a private method `_query`, which performs
 * the processing required for `query` and returns a promise that resolves to a
 * set of results.
 *
 * @export
 * @decorator
 * @param {SourceClass} Klass
 * @returns {void}
 */
function queryable(Klass) {
    var proto = Klass.prototype;
    if (isQueryable(proto)) {
        return;
    }
    _orbit_utils.assert('Queryable interface can only be applied to a Source', proto instanceof Source);
    proto[QUERYABLE] = true;
    proto.query = function (queryOrExpression, options, id) {
        var query = buildQuery(queryOrExpression, options, id, this.queryBuilder);
        return this._enqueueRequest('query', query);
    };
    proto.__query__ = function (query) {
        var _this = this;

        return Orbit.fulfillInSeries(this, 'beforeQuery', query).then(function () {
            return _this._query(query);
        }).then(function (result) {
            return Orbit.settleInSeries(_this, 'query', query, result).then(function () {
                return result;
            });
        }).catch(function (error) {
            return Orbit.settleInSeries(_this, 'queryFail', query, error).then(function () {
                throw error;
            });
        });
    };
}

var SYNCABLE = '__syncable__';
/**
 * Has a source been decorated as `@syncable`?
 *
 * @export
 * @param {SourceClass} source
 * @returns
 */
function isSyncable(source) {
    return !!source[SYNCABLE];
}
/**
 * Marks a source as "syncable" and adds an implementation of the `Syncable`
 * interface.
 *
 * The `sync` method is part of the "sync flow" in Orbit. This flow is used to
 * synchronize the contents of sources.
 *
 * Other sources can participate in the resolution of a `sync` by observing the
 * `transform` event, which is emitted whenever a new `Transform` is applied to
 * a source.
 *
 * @export
 * @decorator
 * @param {SourceClass} Klass
 * @returns {void}
 */
function syncable(Klass) {
    var proto = Klass.prototype;
    if (isSyncable(proto)) {
        return;
    }
    _orbit_utils.assert('Syncable interface can only be applied to a Source', proto instanceof Source);
    proto[SYNCABLE] = true;
    proto.sync = function (transformOrTransforms) {
        var _this = this;

        if (_orbit_utils.isArray(transformOrTransforms)) {
            var transforms = transformOrTransforms;
            return transforms.reduce(function (chain, transform) {
                return chain.then(function () {
                    return _this.sync(transform);
                });
            }, Orbit__default.Promise.resolve());
        } else {
            var transform = transformOrTransforms;
            if (this.transformLog.contains(transform.id)) {
                return Orbit__default.Promise.resolve();
            }
            return this._enqueueSync('sync', transform);
        }
    };
    proto.__sync__ = function (transform) {
        var _this2 = this;

        if (this.transformLog.contains(transform.id)) {
            return Orbit__default.Promise.resolve();
        }
        return Orbit.fulfillInSeries(this, 'beforeSync', transform).then(function () {
            if (_this2.transformLog.contains(transform.id)) {
                return Orbit__default.Promise.resolve();
            } else {
                return _this2._sync(transform).then(function () {
                    return _this2._transformed([transform]);
                }).then(function () {
                    return Orbit.settleInSeries(_this2, 'sync', transform);
                });
            }
        }).catch(function (error) {
            return Orbit.settleInSeries(_this2, 'syncFail', transform, error).then(function () {
                throw error;
            });
        });
    };
}

var UPDATABLE = '__updatable__';
/**
 * Has a source been decorated as `@updatable`?
 *
 * @export
 * @param {*} obj
 * @returns
 */
function isUpdatable(source) {
    return !!source[UPDATABLE];
}
/**
 * Marks a source as "updatable" and adds an implementation of the `Updatable`
 * interface.
 *
 * The `update` method is part of the "request flow" in Orbit. Requests trigger
 * events before and after processing of each request. Observers can delay the
 * resolution of a request by returning a promise in an event listener.
 *
 * An updatable source emits the following events:
 *
 * - `beforeUpdate` - emitted prior to the processing of `update`, this event
 * includes the requested `Transform` as an argument.
 *
 * - `update` - emitted after an `update` has successfully been applied, this
 * event includes the requested `Transform` as an argument.
 *
 * - `updateFail` - emitted when an error has occurred applying an update, this
 * event's arguments include both the requested `Transform` and the error.
 *
 * An updatable source must implement a private method `_update`, which performs
 * the processing required for `update` and returns a promise that resolves when
 * complete.
 *
 * @export
 * @decorator
 * @param {SourceClass} Klass
 * @returns {void}
 */
function updatable(Klass) {
    var proto = Klass.prototype;
    if (isUpdatable(proto)) {
        return;
    }
    _orbit_utils.assert('Updatable interface can only be applied to a Source', proto instanceof Source);
    proto[UPDATABLE] = true;
    proto.update = function (transformOrOperations, options, id) {
        var transform = buildTransform(transformOrOperations, options, id, this.transformBuilder);
        if (this.transformLog.contains(transform.id)) {
            return Orbit__default.Promise.resolve();
        }
        return this._enqueueRequest('update', transform);
    };
    proto.__update__ = function (transform) {
        var _this = this;

        if (this.transformLog.contains(transform.id)) {
            return Orbit__default.Promise.resolve();
        }
        return Orbit.fulfillInSeries(this, 'beforeUpdate', transform).then(function () {
            if (_this.transformLog.contains(transform.id)) {
                return Orbit__default.Promise.resolve();
            } else {
                return _this._update(transform).then(function (result) {
                    return _this._transformed([transform]).then(function () {
                        return Orbit.settleInSeries(_this, 'update', transform, result);
                    }).then(function () {
                        return result;
                    });
                });
            }
        }).catch(function (error) {
            return Orbit.settleInSeries(_this, 'updateFail', transform, error).then(function () {
                throw error;
            });
        });
    };
}

var _QUnit$1 = QUnit;
var module$2 = _QUnit$1.module;
var test$1 = _QUnit$1.test;

module$2('Operation', function () {
    module$2('`coalesceRecordOperations`', function () {
        test$1('can coalesce replaceAttribute + replaceAttribute for the same record', function (assert$$1) {
            assert$$1.deepEqual(coalesceRecordOperations([{
                op: 'replaceAttribute',
                record: { type: 'contact', id: '1234' },
                attribute: 'name',
                value: null
            }, {
                op: 'replaceAttribute',
                record: { type: 'contact', id: '1234' },
                attribute: 'name',
                value: 'Jim'
            }]), [{
                op: 'replaceAttribute',
                record: { type: 'contact', id: '1234' },
                attribute: 'name',
                value: 'Jim'
            }]);
        });
        test$1('will not coalesce replaceAttribute + replaceAttribute for different records', function (assert$$1) {
            assert$$1.deepEqual(coalesceRecordOperations([{
                op: 'replaceAttribute',
                record: { type: 'contact', id: '1234' },
                attribute: 'name',
                value: null
            }, {
                op: 'replaceAttribute',
                record: { type: 'contact', id: '5678' },
                attribute: 'name',
                value: 'Jim'
            }]), [{
                op: 'replaceAttribute',
                record: { type: 'contact', id: '1234' },
                attribute: 'name',
                value: null
            }, {
                op: 'replaceAttribute',
                record: { type: 'contact', id: '5678' },
                attribute: 'name',
                value: 'Jim'
            }]);
        });
        test$1('can coalesce addRecord + replaceAttribute for the same record', function (assert$$1) {
            assert$$1.deepEqual(coalesceRecordOperations([{
                op: 'addRecord',
                record: { type: 'contact', id: '1234', attributes: { name: 'Joe' } }
            }, {
                op: 'replaceAttribute',
                record: { type: 'contact', id: '1234' },
                attribute: 'name',
                value: 'Jim'
            }]), [{
                op: 'addRecord',
                record: { type: 'contact', id: '1234', attributes: { name: 'Jim' } }
            }]);
        });
        test$1('can coalesce addRecord + replaceAttribute for a couple records', function (assert$$1) {
            assert$$1.deepEqual(coalesceRecordOperations([{
                op: 'addRecord',
                record: { type: 'contact', id: '1234', attributes: { name: 'Joe' } }
            }, {
                op: 'addRecord',
                record: { type: 'contact', id: '5678', attributes: { name: 'Jim' } }
            }, {
                op: 'replaceAttribute',
                record: { type: 'contact', id: '1234' },
                attribute: 'name',
                value: 'Joseph'
            }, {
                op: 'replaceAttribute',
                record: { type: 'contact', id: '5678' },
                attribute: 'name',
                value: 'James'
            }]), [{
                op: 'addRecord',
                record: { type: 'contact', id: '1234', attributes: { name: 'Joseph' } }
            }, {
                op: 'addRecord',
                record: { type: 'contact', id: '5678', attributes: { name: 'James' } }
            }]);
        });
        test$1('can coalesce addRecord + replaceRelatedRecords for the same record', function (assert$$1) {
            assert$$1.deepEqual(coalesceRecordOperations([{
                op: 'addRecord',
                record: { type: 'contact', id: '1234', attributes: { name: 'Joe' } }
            }, {
                op: 'replaceRelatedRecords',
                record: { type: 'contact', id: '1234' },
                relationship: 'phoneNumbers',
                relatedRecords: [{ type: 'phoneNumber', id: 'abc' }]
            }]), [{
                op: 'addRecord',
                record: {
                    type: 'contact', id: '1234',
                    attributes: { name: 'Joe' },
                    relationships: {
                        phoneNumbers: {
                            data: [{ type: 'phoneNumber', id: 'abc' }]
                        }
                    }
                }
            }]);
        });
        test$1('can coalesce addRecord + replaceRelatedRecord for the same record', function (assert$$1) {
            assert$$1.deepEqual(coalesceRecordOperations([{
                op: 'addRecord',
                record: { type: 'contact', id: '1234', attributes: { name: 'Joe' } }
            }, {
                op: 'replaceRelatedRecord',
                record: { type: 'contact', id: '1234' },
                relationship: 'address',
                relatedRecord: { type: 'address', id: 'abc' }
            }]), [{
                op: 'addRecord',
                record: {
                    type: 'contact', id: '1234',
                    attributes: { name: 'Joe' },
                    relationships: {
                        address: {
                            data: { type: 'address', id: 'abc' }
                        }
                    }
                }
            }]);
        });
        test$1('can coalesce addRecord + addToRelatedRecords for the same record', function (assert$$1) {
            assert$$1.deepEqual(coalesceRecordOperations([{
                op: 'addRecord',
                record: { type: 'contact', id: '1234', attributes: { name: 'Joe' } }
            }, {
                op: 'addToRelatedRecords',
                record: { type: 'contact', id: '1234' },
                relationship: 'phoneNumbers',
                relatedRecord: { type: 'phoneNumber', id: 'abc' }
            }]), [{
                op: 'addRecord',
                record: {
                    type: 'contact', id: '1234',
                    attributes: { name: 'Joe' },
                    relationships: {
                        phoneNumbers: {
                            data: [{ type: 'phoneNumber', id: 'abc' }]
                        }
                    }
                }
            }]);
        });
        test$1('can coalesce addRecord + replaceRelatedRecord for the same record', function (assert$$1) {
            assert$$1.deepEqual(coalesceRecordOperations([{
                op: 'addRecord',
                record: { type: 'contact', id: '1234', attributes: { name: 'Joe' } }
            }, {
                op: 'replaceRelatedRecord',
                record: { type: 'contact', id: '1234' },
                relationship: 'address',
                relatedRecord: { type: 'address', id: 'abc' }
            }]), [{
                op: 'addRecord',
                record: {
                    type: 'contact', id: '1234',
                    attributes: { name: 'Joe' },
                    relationships: {
                        address: {
                            data: { type: 'address', id: 'abc' }
                        }
                    }
                }
            }]);
        });
        test$1('can coalesce addRecord + replaceRelatedRecord for the same record + relationship', function (assert$$1) {
            assert$$1.deepEqual(coalesceRecordOperations([{
                op: 'addRecord',
                record: { type: 'contact', id: '1234', attributes: { name: 'Joe' },
                    relationships: {
                        address: {
                            data: { type: 'address', id: 'def' }
                        }
                    }
                }
            }, {
                op: 'replaceRelatedRecord',
                record: { type: 'contact', id: '1234' },
                relationship: 'address',
                relatedRecord: { type: 'address', id: 'abc' }
            }]), [{
                op: 'addRecord',
                record: {
                    type: 'contact', id: '1234',
                    attributes: { name: 'Joe' },
                    relationships: {
                        address: {
                            data: { type: 'address', id: 'abc' }
                        }
                    }
                }
            }]);
        });
        test$1('can coalesce replaceRelatedRecord + replaceRelatedRecord for the same record + relationship', function (assert$$1) {
            assert$$1.deepEqual(coalesceRecordOperations([{
                op: 'replaceRelatedRecord',
                record: { type: 'contact', id: '1234' },
                relationship: 'address',
                relatedRecord: { type: 'address', id: 'abc' }
            }, {
                op: 'replaceRelatedRecord',
                record: { type: 'contact', id: '1234' },
                relationship: 'address',
                relatedRecord: { type: 'address', id: 'def' }
            }]), [{
                op: 'replaceRelatedRecord',
                record: { type: 'contact', id: '1234' },
                relationship: 'address',
                relatedRecord: { type: 'address', id: 'def' }
            }]);
        });
        test$1('can coalesce addRecord + removeRecord for the same record', function (assert$$1) {
            assert$$1.deepEqual(coalesceRecordOperations([{
                op: 'addRecord',
                record: { type: 'contact', id: '1234', attributes: { name: 'Joe' } }
            }, {
                op: 'removeRecord',
                record: { type: 'contact', id: '1234' }
            }]), []);
        });
        test$1('can coalesce addRecord + replaceRelatedRecord + removeRecord for the same record', function (assert$$1) {
            assert$$1.deepEqual(coalesceRecordOperations([{
                op: 'addRecord',
                record: { type: 'contact', id: '1234', attributes: { name: 'Joe' },
                    relationships: {
                        address: {
                            data: { type: 'address', id: 'def' }
                        }
                    }
                }
            }, {
                op: 'replaceRelatedRecord',
                record: { type: 'contact', id: '1234' },
                relationship: 'address',
                relatedRecord: { type: 'address', id: 'abc' }
            }, {
                op: 'removeRecord',
                record: { type: 'contact', id: '1234' }
            }]), []);
        });
        test$1('can coalesce addRecord + replaceRelatedRecord + removeRecord for the same record in non-contiguous ops', function (assert$$1) {
            assert$$1.deepEqual(coalesceRecordOperations([{
                op: 'addRecord',
                record: { type: 'contact', id: '1234', attributes: { name: 'Joe' },
                    relationships: {
                        address: {
                            data: { type: 'address', id: 'def' }
                        }
                    }
                }
            }, {
                op: 'addRecord',
                record: { type: 'contact', id: '5678', attributes: { name: 'Jim' } }
            }, {
                op: 'replaceRelatedRecord',
                record: { type: 'contact', id: '1234' },
                relationship: 'address',
                relatedRecord: { type: 'address', id: 'abc' }
            }, {
                op: 'removeRecord',
                record: { type: 'contact', id: '1234' }
            }]), [{
                op: 'addRecord',
                record: { type: 'contact', id: '5678', attributes: { name: 'Jim' } }
            }]);
        });
        test$1('can coalesce removeRecord + removeRecord for the same record', function (assert$$1) {
            assert$$1.deepEqual(coalesceRecordOperations([{
                op: 'removeRecord',
                record: { type: 'contact', id: '1234' }
            }, {
                op: 'removeRecord',
                record: { type: 'contact', id: '1234' }
            }]), [{
                op: 'removeRecord',
                record: { type: 'contact', id: '1234' }
            }]);
        });
        test$1('coalesces operations, but doesn\'t allow reordering of ops that affect relationships', function (assert$$1) {
            assert$$1.deepEqual(coalesceRecordOperations([{
                op: 'addRecord',
                record: { type: 'address', id: 'def789' }
            }, {
                op: 'replaceAttribute',
                record: { type: 'address', id: 'def789' },
                attribute: 'street',
                value: 'a'
            }, {
                op: 'replaceRelatedRecord',
                record: { type: 'contact', id: '1234' },
                relationship: 'address',
                relatedRecord: { type: 'address', id: 'def789' }
            }, {
                op: 'replaceRelatedRecord',
                record: { type: 'address', id: 'def789' },
                relationship: 'contact',
                relatedRecord: { type: 'contact', id: '1234' }
            }, {
                op: 'replaceAttribute',
                record: { type: 'address', id: 'def789' },
                attribute: 'street',
                value: 'ab'
            }, {
                op: 'replaceAttribute',
                record: { type: 'address', id: 'def789' },
                attribute: 'street',
                value: 'abc'
            }]), [{
                op: 'addRecord',
                record: { type: 'address', id: 'def789', attributes: { street: 'abc' } }
            }, {
                op: 'replaceRelatedRecord',
                record: { type: 'contact', id: '1234' },
                relationship: 'address',
                relatedRecord: { type: 'address', id: 'def789' }
            }, {
                op: 'replaceRelatedRecord',
                record: { type: 'address', id: 'def789' },
                relationship: 'contact',
                relatedRecord: { type: 'contact', id: '1234' }
            }]);
        });
        test$1('can coalesce addToRelatedRecords + removeFromRelatedRecords for the same record + relationship', function (assert$$1) {
            assert$$1.deepEqual(coalesceRecordOperations([{
                op: 'addToRelatedRecords',
                record: { type: 'contact', id: '1234' },
                relationship: 'phoneNumbers',
                relatedRecord: { type: 'phoneNumber', id: 'abc' }
            }, {
                op: 'removeFromRelatedRecords',
                record: { type: 'contact', id: '1234' },
                relationship: 'phoneNumbers',
                relatedRecord: { type: 'phoneNumber', id: 'abc' }
            }]), []);
        });
        test$1('can coalesce addRecord + addToRelatedRecords for the same record', function (assert$$1) {
            assert$$1.deepEqual(coalesceRecordOperations([{
                op: 'addRecord',
                record: {
                    type: 'address',
                    id: 'def789',
                    attributes: { street: 'abc' },
                    relationships: {
                        phoneNumbers: {
                            data: [{ type: 'phoneNumber', id: 'abc' }]
                        }
                    }
                }
            }, {
                op: 'addToRelatedRecords',
                record: { type: 'address', id: 'def789' },
                relationship: 'phoneNumbers',
                relatedRecord: { type: 'phoneNumber', id: 'def' }
            }]), [{
                op: 'addRecord',
                record: {
                    type: 'address',
                    id: 'def789',
                    attributes: { street: 'abc' },
                    relationships: {
                        phoneNumbers: {
                            data: [{ type: 'phoneNumber', id: 'abc' }, { type: 'phoneNumber', id: 'def' }]
                        }
                    }
                }
            }]);
        });
        test$1('can coalesce replaceRecord + addToRelatedRecords for the same record', function (assert$$1) {
            assert$$1.deepEqual(coalesceRecordOperations([{
                op: 'replaceRecord',
                record: {
                    type: 'address',
                    id: 'def789',
                    attributes: { street: 'abc' },
                    relationships: {
                        phoneNumbers: {
                            data: [{ type: 'phoneNumber', id: 'abc' }]
                        }
                    }
                }
            }, {
                op: 'addToRelatedRecords',
                record: { type: 'address', id: 'def789' },
                relationship: 'phoneNumbers',
                relatedRecord: { type: 'phoneNumber', id: 'def' }
            }]), [{
                op: 'replaceRecord',
                record: {
                    type: 'address',
                    id: 'def789',
                    attributes: { street: 'abc' },
                    relationships: {
                        phoneNumbers: {
                            data: [{ type: 'phoneNumber', id: 'abc' }, { type: 'phoneNumber', id: 'def' }]
                        }
                    }
                }
            }]);
        });
        test$1('can coalesce removeFromRelatedRecords + addToRelatedRecords for the same record + relationship', function (assert$$1) {
            assert$$1.deepEqual(coalesceRecordOperations([{
                op: 'addToRelatedRecords',
                record: { type: 'address', id: 'def789' },
                relationship: 'phoneNumbers',
                relatedRecord: { type: 'phoneNumber', id: 'abc' }
            }, {
                op: 'removeFromRelatedRecords',
                record: { type: 'address', id: 'def789' },
                relationship: 'phoneNumbers',
                relatedRecord: { type: 'phoneNumber', id: 'abc' }
            }]), []);
        });
        test$1('can coalesce addRecord + removeFromRelatedRecords for the same record', function (assert$$1) {
            assert$$1.deepEqual(coalesceRecordOperations([{
                op: 'addRecord',
                record: {
                    type: 'address',
                    id: 'def789',
                    attributes: { street: 'abc' },
                    relationships: {
                        phoneNumbers: {
                            data: [{ type: 'phoneNumber', id: 'abc' }]
                        }
                    }
                }
            }, {
                op: 'removeFromRelatedRecords',
                record: { type: 'address', id: 'def789' },
                relationship: 'phoneNumbers',
                relatedRecord: { type: 'phoneNumber', id: 'abc' }
            }]), [{
                op: 'addRecord',
                record: {
                    type: 'address',
                    id: 'def789',
                    attributes: { street: 'abc' },
                    relationships: {
                        phoneNumbers: {
                            data: []
                        }
                    }
                }
            }]);
        });
    });
});

var _QUnit$2 = QUnit;
var module$3 = _QUnit$2.module;
var test$2 = _QUnit$2.test;

module$3('QueryBuilder', function (hooks) {
    var oqb = void 0;
    hooks.beforeEach(function () {
        oqb = new QueryBuilder();
    });
    test$2('findRecord', function (assert$$1) {
        assert$$1.deepEqual(oqb.findRecord({ type: 'planet', id: '123' }).toQueryExpression(), {
            op: 'findRecord',
            record: {
                type: 'planet',
                id: '123'
            }
        });
    });
    test$2('findRecords', function (assert$$1) {
        assert$$1.deepEqual(oqb.findRecords('planet').toQueryExpression(), {
            op: 'findRecords',
            type: 'planet'
        });
    });
    test$2('findRecords + filter', function (assert$$1) {
        assert$$1.deepEqual(oqb.findRecords('planet').filter({ attribute: 'name', value: 'Pluto' }).toQueryExpression(), {
            op: 'findRecords',
            type: 'planet',
            filter: [{
                op: 'equal',
                kind: 'attribute',
                attribute: 'name',
                value: 'Pluto'
            }]
        });
    });
    test$2('findRecords + filters', function (assert$$1) {
        assert$$1.deepEqual(oqb.findRecords('planet').filter({ attribute: 'atmosphere', value: true }, { attribute: 'classification', value: 'terrestrial' }).toQueryExpression(), {
            op: 'findRecords',
            type: 'planet',
            filter: [{
                op: 'equal',
                kind: 'attribute',
                attribute: 'atmosphere',
                value: true
            }, {
                op: 'equal',
                kind: 'attribute',
                attribute: 'classification',
                value: 'terrestrial'
            }]
        });
    });
    test$2('findRecords + sort (one field, compact)', function (assert$$1) {
        assert$$1.deepEqual(oqb.findRecords('planet').sort('name').toQueryExpression(), {
            op: 'findRecords',
            type: 'planet',
            sort: [{
                kind: 'attribute',
                attribute: 'name',
                order: 'ascending'
            }]
        });
    });
    test$2('findRecords + sort (one field descending, compact)', function (assert$$1) {
        assert$$1.deepEqual(oqb.findRecords('planet').sort('-name').toQueryExpression(), {
            op: 'findRecords',
            type: 'planet',
            sort: [{
                kind: 'attribute',
                attribute: 'name',
                order: 'descending'
            }]
        });
    });
    test$2('findRecords + sort (multiple fields, compact)', function (assert$$1) {
        assert$$1.deepEqual(oqb.findRecords('planet').sort('name', 'age').toQueryExpression(), {
            op: 'findRecords',
            type: 'planet',
            sort: [{
                kind: 'attribute',
                attribute: 'name',
                order: 'ascending'
            }, {
                kind: 'attribute',
                attribute: 'age',
                order: 'ascending'
            }]
        });
    });
    test$2('findRecords + sort (one field, verbose)', function (assert$$1) {
        assert$$1.deepEqual(oqb.findRecords('planet').sort({ attribute: 'name' }).toQueryExpression(), {
            op: 'findRecords',
            type: 'planet',
            sort: [{
                kind: 'attribute',
                attribute: 'name',
                order: 'ascending'
            }]
        });
    });
    test$2('findRecords + sort (one field, specified order, verbose)', function (assert$$1) {
        assert$$1.deepEqual(oqb.findRecords('planet').sort({ attribute: 'name', order: 'ascending' }).toQueryExpression(), {
            op: 'findRecords',
            type: 'planet',
            sort: [{
                kind: 'attribute',
                attribute: 'name',
                order: 'ascending'
            }]
        });
    });
    test$2('findRecords + sort (one field, specified order, verbose)', function (assert$$1) {
        assert$$1.deepEqual(oqb.findRecords('planet').sort({ attribute: 'name', order: 'ascending' }, { attribute: 'age', order: 'descending' }).toQueryExpression(), {
            op: 'findRecords',
            type: 'planet',
            sort: [{
                kind: 'attribute',
                attribute: 'name',
                order: 'ascending'
            }, {
                kind: 'attribute',
                attribute: 'age',
                order: 'descending'
            }]
        });
    });
    test$2('findRecords + sort (invalid sort expression)', function (assert$$1) {
        assert$$1.throws(function () {
            oqb.findRecords('planet').sort(null);
        }, new Error('Sort expression must be either an object or a string.'));
    });
    test$2('findRecords + page', function (assert$$1) {
        assert$$1.deepEqual(oqb.findRecords('planet').page({ offset: 1, limit: 10 }).toQueryExpression(), {
            op: 'findRecords',
            type: 'planet',
            page: { offset: 1, limit: 10 }
        });
    });
    test$2('findRecords + filter + sort + page', function (assert$$1) {
        assert$$1.deepEqual(oqb.findRecords('planet').filter({ attribute: 'name', value: 'Jupiter' }, { attribute: 'age', value: 23000000 }).page({ offset: 1, limit: 10 }).sort('-name').toQueryExpression(), {
            op: 'findRecords',
            type: 'planet',
            filter: [{
                op: 'equal',
                kind: 'attribute',
                attribute: 'name',
                value: 'Jupiter'
            }, {
                op: 'equal',
                kind: 'attribute',
                attribute: 'age',
                value: 23000000
            }],
            page: { offset: 1, limit: 10 },
            sort: [{
                kind: 'attribute',
                attribute: 'name',
                order: 'descending'
            }]
        });
    });
});

var _QUnit$3 = QUnit;
var module$4 = _QUnit$3.module;
var test$3 = _QUnit$3.test;
///////////////////////////////////////////////////////////////////////////////

module$4('buildQuery', function () {
    test$3('can instantiate a query from an expression', function (assert$$1) {
        var expression = {
            op: 'findRecords'
        };
        var query = buildQuery(expression);
        assert$$1.ok(query);
    });
    test$3('can instantiate a query that will be assigned an `id`', function (assert$$1) {
        var expression = {
            op: 'findRecords'
        };
        var query = buildQuery(expression);
        assert$$1.ok(query.id, 'query has an id');
    });
    test$3('can instantiate a query with an expression, options, and an id', function (assert$$1) {
        var expression = {
            op: 'findRecords'
        };
        var options = { sources: { jsonapi: { include: 'comments' } } };
        var query = buildQuery(expression, options, 'abc123');
        assert$$1.strictEqual(query.id, 'abc123', 'id was populated');
        assert$$1.strictEqual(query.expression, expression, 'expression was populated');
        assert$$1.strictEqual(query.options, options, 'options was populated');
    });
    test$3('will return a query passed into it', function (assert$$1) {
        var expression = {
            op: 'findRecords'
        };
        var query = buildQuery(expression);
        assert$$1.strictEqual(buildQuery(query), query);
    });
    test$3('will create a query using a QueryBuilder if a function is passed into it', function (assert$$1) {
        var qb = new QueryBuilder();
        var expression = {
            op: 'findRecords',
            type: 'planet'
        };
        var query = buildQuery(function (q) {
            return q.findRecords('planet');
        }, null, null, qb);
        assert$$1.deepEqual(query.expression, expression, 'expression was populated');
    });
    test$3('should call toQueryExpression() if available', function (assert$$1) {
        var expression = {
            op: 'findRecords',
            type: 'planet'
        };
        var queryFactory = new QueryTerm(expression);
        var query = buildQuery(queryFactory);
        assert$$1.strictEqual(query.expression, expression, 'expression was populated');
    });
});

var _QUnit$4 = QUnit;
var module$5 = _QUnit$4.module;
var test$4 = _QUnit$4.test;

module$5('Record', function () {
    test$4('`cloneRecordIdentity` returns a simple { type, id } identity object from any object with a `type` and `id`', function (assert$$1) {
        assert$$1.deepEqual(cloneRecordIdentity({ type: 'planet', id: '1' }), { type: 'planet', id: '1' });
    });
    test$4('`equalRecordIdentities` compares the type/id identity of two objects', function (assert$$1) {
        assert$$1.ok(equalRecordIdentities({ type: 'planet', id: '1' }, { type: 'planet', id: '1' }), 'identities match');
        assert$$1.ok(equalRecordIdentities(null, null), 'identities match');
        assert$$1.ok(!equalRecordIdentities({ type: 'planet', id: '1' }, { type: 'moon', id: '1' }), 'identities do not match');
        assert$$1.ok(!equalRecordIdentities({ type: 'planet', id: '1' }, null), 'identities do not match');
        assert$$1.ok(!equalRecordIdentities(null, { type: 'planet', id: '1' }), 'identities do not match');
    });
});

var _QUnit$5 = QUnit;
var module$6 = _QUnit$5.module;
var test$5 = _QUnit$5.test;
///////////////////////////////////////////////////////////////////////////////

module$6('Schema', function () {
    test$5('can be instantiated', function (assert$$1) {
        var schema = new Schema$1();
        assert$$1.ok(schema);
    });
    test$5('#version is assigned `1` by default', function (assert$$1) {
        var schema = new Schema$1();
        assert$$1.equal(schema.version, 1, 'version === 1');
    });
    test$5('#upgrade bumps the current version', function (assert$$1) {
        var done = assert$$1.async();
        var schema = new Schema$1({
            models: {
                planet: {}
            }
        });
        assert$$1.equal(schema.version, 1, 'version === 1');
        schema.on('upgrade', function (version) {
            assert$$1.equal(version, 2, 'version is passed as argument');
            assert$$1.equal(schema.version, 2, 'version === 2');
            assert$$1.ok(schema.getModel('planet').attributes.name, 'model attribute has been added');
            done();
        });
        schema.upgrade({
            models: {
                planet: {
                    attributes: {
                        name: { type: 'string' }
                    }
                }
            }
        });
    });
    test$5('#models provides access to model definitions', function (assert$$1) {
        var planetDefinition = {
            attributes: {
                name: { type: 'string', defaultValue: 'Earth' }
            }
        };
        var schema = new Schema$1({
            models: {
                planet: planetDefinition
            }
        });
        assert$$1.deepEqual(schema.models.planet.attributes, planetDefinition.attributes);
    });
    test$5('#getModel provides access to a model definition', function (assert$$1) {
        var planetDefinition = {
            attributes: {
                name: { type: 'string', defaultValue: 'Earth' }
            }
        };
        var schema = new Schema$1({
            models: {
                planet: planetDefinition
            }
        });
        assert$$1.deepEqual(schema.getModel('planet').attributes, planetDefinition.attributes);
    });
    test$5('#getModel throws an exception if a model definition is not found', function (assert$$1) {
        var schema = new Schema$1();
        assert$$1.throws(function () {
            schema.getModel('planet');
        }, /Schema error: Model definition for planet not found/);
    });
    test$5('#hasAttribute', function (assert$$1) {
        var schema = new Schema$1({
            models: {
                planet: {
                    attributes: {
                        name: { type: 'string', defaultValue: 'Earth' }
                    }
                }
            }
        });
        assert$$1.equal(schema.hasAttribute('planet', 'name'), true);
        assert$$1.equal(schema.hasAttribute('planet', 'unknown'), false);
    });
    test$5('#hasRelationship', function (assert$$1) {
        var schema = new Schema$1({
            models: {
                planet: {
                    relationships: {
                        moons: { type: 'hasMany', model: 'moon' }
                    }
                },
                moon: {}
            }
        });
        assert$$1.equal(schema.hasRelationship('planet', 'moons'), true);
        assert$$1.equal(schema.hasRelationship('planet', 'unknown'), false);
    });
    test$5('#pluralize simply adds an `s` to the end of words', function (assert$$1) {
        var schema = new Schema$1();
        assert$$1.equal(schema.pluralize('cow'), 'cows', 'no kine here');
    });
    test$5('#singularize simply removes a trailing `s` if present at the end of words', function (assert$$1) {
        var schema = new Schema$1();
        assert$$1.equal(schema.singularize('cows'), 'cow', 'no kine here');
        assert$$1.equal(schema.singularize('data'), 'data', 'no Latin knowledge here');
    });
    test$5('#generateId', function (assert$$1) {
        var schema = new Schema$1({
            generateId: function (modelName) {
                return modelName + '-123';
            },
            models: {
                moon: {}
            }
        });
        assert$$1.equal(schema.generateId('moon'), 'moon-123', 'provides the default value for the ID');
    });
    test$5('#initializeRecord', function (assert$$1) {
        var schema = new Schema$1({
            generateId: function (modelName) {
                return modelName + '-123';
            },
            models: {
                moon: {}
            }
        });
        var moon = { type: 'moon', id: undefined };
        schema.initializeRecord(moon);
        assert$$1.equal(moon.id, 'moon-123', 'generates an ID if `id` is undefined');
        moon = { type: 'moon', id: '234' };
        assert$$1.equal(moon.id, '234', 'does not alter an `id` that is already set');
    });
});

function _defaults$3(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _classCallCheck$8(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn$3(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits$3(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults$3(subClass, superClass); }

var __decorate$2 = undefined && undefined.__decorate || function (decorators, target, key, desc) {
    var c = arguments.length,
        r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
        d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) {
        if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    }return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var Promise$1 = Orbit__default.Promise;
var _QUnit$6 = QUnit;
var module$7 = _QUnit$6.module;
var test$6 = _QUnit$6.test;

module$7('@pullable', function (hooks) {
    var source = void 0;
    hooks.beforeEach(function () {
        var MySource = function (_Source) {
            _inherits$3(MySource, _Source);

            function MySource() {
                _classCallCheck$8(this, MySource);

                return _possibleConstructorReturn$3(this, _Source.apply(this, arguments));
            }

            return MySource;
        }(Source);
        MySource = __decorate$2([pullable], MySource);
        source = new MySource();
    });
    hooks.afterEach(function () {
        source = null;
    });
    test$6('isPullable - tests for the application of the @pullable decorator', function (assert$$1) {
        assert$$1.ok(isPullable(source));
    });
    // TODO
    // test('should be applied to a Source', function(assert) {
    //   assert.throws(function() {
    //     @pullable
    //     class Vanilla {}
    //   },
    //   Error('Assertion failed: Pullable interface can only be applied to a Source'),
    //   'assertion raised');
    // });
    test$6('#pull should resolve as a failure when _pull fails', function (assert$$1) {
        assert$$1.expect(2);
        source._pull = function () {
            return Promise$1.reject(':(');
        };
        return source.pull(function (q) {
            return q.findRecords('planet');
        }).catch(function (error) {
            assert$$1.ok(true, 'pull promise resolved as a failure');
            assert$$1.equal(error, ':(', 'failure');
        });
    });
    test$6('#pull should trigger `pull` event after a successful action in which `_pull` returns an array of transforms', function (assert$$1) {
        assert$$1.expect(9);
        var order = 0;
        var qe = { op: 'findRecords', type: 'planet' };
        var resultingTransforms = [buildTransform({ op: 'addRecord' }), buildTransform({ op: 'replaceRecordAttribute' })];
        source._pull = function (query) {
            assert$$1.equal(++order, 1, 'action performed after willPull');
            assert$$1.strictEqual(query.expression, qe, 'query object matches');
            return Promise$1.resolve(resultingTransforms);
        };
        var transformCount = 0;
        source.on('transform', function (transform) {
            assert$$1.strictEqual(transform, resultingTransforms[transformCount++], 'transform matches');
            return Promise$1.resolve();
        });
        source.on('pull', function (query, result) {
            assert$$1.equal(++order, 2, 'pull triggered after action performed successfully');
            assert$$1.strictEqual(query.expression, qe, 'query matches');
            assert$$1.strictEqual(result, resultingTransforms, 'result matches');
        });
        return source.pull(qe).then(function (result) {
            assert$$1.equal(++order, 3, 'promise resolved last');
            assert$$1.strictEqual(result, resultingTransforms, 'success!');
        });
    });
    test$6('#pull should resolve all promises returned from `beforePull` before calling `_transform`', function (assert$$1) {
        assert$$1.expect(12);
        var order = 0;
        var qe = { op: 'findRecords', type: 'planet' };
        var resultingTransforms = [buildTransform({ op: 'addRecord' }), buildTransform({ op: 'replaceRecordAttribute' })];
        source.on('beforePull', function () {
            assert$$1.equal(++order, 1, 'beforePull triggered first');
            return Promise$1.resolve();
        });
        source.on('beforePull', function () {
            assert$$1.equal(++order, 2, 'beforePull triggered second');
            return undefined;
        });
        source.on('beforePull', function () {
            assert$$1.equal(++order, 3, 'beforePull triggered third');
            return Promise$1.resolve();
        });
        source._pull = function (query) {
            assert$$1.equal(++order, 4, 'action performed after willPull');
            assert$$1.strictEqual(query.expression, qe, 'query object matches');
            return Promise$1.resolve(resultingTransforms);
        };
        var transformCount = 0;
        source.on('transform', function (transform) {
            assert$$1.strictEqual(transform, resultingTransforms[transformCount++], 'transform matches');
            return Promise$1.resolve();
        });
        source.on('pull', function (query, result) {
            assert$$1.equal(++order, 5, 'pull triggered after action performed successfully');
            assert$$1.strictEqual(query.expression, qe, 'query matches');
            assert$$1.strictEqual(result, resultingTransforms, 'result matches');
        });
        return source.pull(qe).then(function (result) {
            assert$$1.equal(++order, 6, 'promise resolved last');
            assert$$1.strictEqual(result, resultingTransforms, 'success!');
        });
    });
    test$6('#pull should resolve all promises returned from `beforePull` and fail if any fail', function (assert$$1) {
        assert$$1.expect(7);
        var order = 0;
        var qe = { op: 'findRecords', type: 'planet' };
        source.on('beforePull', function () {
            assert$$1.equal(++order, 1, 'beforePull triggered third');
            return Promise$1.resolve();
        });
        source.on('beforePull', function () {
            assert$$1.equal(++order, 2, 'beforePull triggered third');
            return Promise$1.reject(':(');
        });
        source._pull = function () {
            assert$$1.ok(false, '_pull should not be invoked');
        };
        source.on('pull', function () {
            assert$$1.ok(false, 'pull should not be triggered');
        });
        source.on('pullFail', function (query, error) {
            assert$$1.equal(++order, 3, 'pullFail triggered after an unsuccessful beforePull');
            assert$$1.strictEqual(query.expression, qe, 'query matches');
            assert$$1.equal(error, ':(', 'error matches');
        });
        return source.pull(qe).catch(function (error) {
            assert$$1.equal(++order, 4, 'promise resolved last');
            assert$$1.equal(error, ':(', 'failure');
        });
    });
    test$6('#pull should trigger `pullFail` event after an unsuccessful pull', function (assert$$1) {
        assert$$1.expect(7);
        var order = 0;
        var qe = { op: 'findRecords', type: 'planet' };
        source._pull = function (query) {
            assert$$1.equal(++order, 1, 'action performed after willPull');
            assert$$1.strictEqual(query.expression, qe, 'query object matches');
            return Promise$1.reject(':(');
        };
        source.on('pull', function () {
            assert$$1.ok(false, 'pull should not be triggered');
        });
        source.on('pullFail', function (query, error) {
            assert$$1.equal(++order, 2, 'pullFail triggered after an unsuccessful pull');
            assert$$1.strictEqual(query.expression, qe, 'query matches');
            assert$$1.equal(error, ':(', 'error matches');
        });
        return source.pull(qe).catch(function (error) {
            assert$$1.equal(++order, 3, 'promise resolved last');
            assert$$1.equal(error, ':(', 'failure');
        });
    });
});

function _defaults$4(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _classCallCheck$9(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn$4(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits$4(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults$4(subClass, superClass); }

var __decorate$3 = undefined && undefined.__decorate || function (decorators, target, key, desc) {
    var c = arguments.length,
        r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
        d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) {
        if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    }return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var Promise$2 = Orbit__default.Promise;
var _QUnit$7 = QUnit;
var module$8 = _QUnit$7.module;
var test$7 = _QUnit$7.test;

module$8('@pushable', function (hooks) {
    var source = void 0;
    hooks.beforeEach(function () {
        var MySource = function (_Source) {
            _inherits$4(MySource, _Source);

            function MySource() {
                _classCallCheck$9(this, MySource);

                return _possibleConstructorReturn$4(this, _Source.apply(this, arguments));
            }

            return MySource;
        }(Source);
        MySource = __decorate$3([pushable], MySource);
        source = new MySource({ name: 'src1' });
    });
    hooks.afterEach(function () {
        source = null;
    });
    test$7('isPushable - tests for the application of the @pushable decorator', function (assert$$1) {
        assert$$1.ok(isPushable(source));
    });
    // TODO
    // test('should be applied to a Source', function(assert) {
    //   assert.throws(function() {
    //     @pushable
    //     class Vanilla {}
    //   },
    //   Error('Assertion failed: Pushable interface can only be applied to a Source'),
    //   'assertion raised');
    // });
    test$7('#push should resolve as a failure when `transform` fails', function (assert$$1) {
        assert$$1.expect(2);
        source._push = function () {
            return Promise$2.reject(':(');
        };
        return source.push({ addRecord: {} }).catch(function (error) {
            assert$$1.ok(true, 'push promise resolved as a failure');
            assert$$1.equal(error, ':(', 'failure');
        });
    });
    test$7('#push should trigger `push` event after a successful action in which `transform` returns an array of transforms', function (assert$$1) {
        assert$$1.expect(12);
        var order = 0;
        var addRecordTransform = buildTransform({ op: 'addRecord' });
        var replaceAttributeTransform = buildTransform({ op: 'replaceRecordAttribute' });
        var resultingTransforms = [addRecordTransform, replaceAttributeTransform];
        source.on('beforePush', function (transform) {
            assert$$1.equal(++order, 1, 'beforePush triggered first');
            assert$$1.strictEqual(transform, addRecordTransform, 'transform matches');
        });
        source._push = function (transform) {
            assert$$1.equal(++order, 2, 'action performed after beforePush');
            assert$$1.strictEqual(transform, addRecordTransform, 'transform object matches');
            return Promise$2.resolve(resultingTransforms);
        };
        var transformCount = 0;
        source.on('transform', function (transform) {
            assert$$1.equal(++order, 3 + transformCount, 'transform triggered after action performed successfully');
            assert$$1.strictEqual(transform, resultingTransforms[transformCount++], 'transform matches');
            return Promise$2.resolve();
        });
        source.on('push', function (transform) {
            assert$$1.equal(++order, 5, 'push triggered after action performed successfully');
            assert$$1.strictEqual(transform, addRecordTransform, 'transform matches');
        });
        return source.push(addRecordTransform).then(function (result) {
            assert$$1.equal(++order, 6, 'promise resolved last');
            assert$$1.deepEqual(result, resultingTransforms, 'applied transforms are returned on success');
        });
    });
    test$7('#push should trigger `pushFail` event after an unsuccessful push', function (assert$$1) {
        assert$$1.expect(7);
        var addRecordTransform = buildTransform({ op: 'addRecord' });
        var order = 0;
        source._push = function (transform) {
            assert$$1.equal(++order, 1, 'action performed after willPush');
            assert$$1.strictEqual(transform, addRecordTransform, 'transform matches');
            return Promise$2.reject(':(');
        };
        source.on('push', function () {
            assert$$1.ok(false, 'push should not be triggered');
        });
        source.on('pushFail', function (transform, error) {
            assert$$1.equal(++order, 2, 'pushFail triggered after an unsuccessful push');
            assert$$1.strictEqual(transform, addRecordTransform, 'transform matches');
            assert$$1.equal(error, ':(', 'error matches');
        });
        return source.push(addRecordTransform).catch(function (error) {
            assert$$1.equal(++order, 3, 'promise resolved last');
            assert$$1.equal(error, ':(', 'failure');
        });
    });
    test$7('#push should resolve all promises returned from `beforePush` before calling `_push`', function (assert$$1) {
        assert$$1.expect(7);
        var order = 0;
        var addRecordTransform = buildTransform({ op: 'addRecord' });
        var replaceAttributeTransform = buildTransform({ op: 'replaceRecordAttribute' });
        var resultingTransforms = [addRecordTransform, replaceAttributeTransform];
        source.on('beforePush', function () {
            assert$$1.equal(++order, 1, 'beforePush triggered first');
            return Promise$2.resolve();
        });
        source.on('beforePush', function () {
            assert$$1.equal(++order, 2, 'beforePush triggered second');
            return undefined;
        });
        source.on('beforePush', function () {
            assert$$1.equal(++order, 3, 'beforePush triggered third');
            return Promise$2.resolve();
        });
        source._push = function () {
            assert$$1.equal(++order, 4, '_push invoked after all `beforePush` handlers');
            return Promise$2.resolve(resultingTransforms);
        };
        source.on('push', function () {
            assert$$1.equal(++order, 5, 'push triggered after action performed successfully');
        });
        return source.push(addRecordTransform).then(function (result) {
            assert$$1.equal(++order, 6, 'promise resolved last');
            assert$$1.deepEqual(result, resultingTransforms, 'applied transforms are returned on success');
        });
    });
    test$7('#push should not call `_push` if the transform has been applied as a result of `beforePush` resolution', function (assert$$1) {
        assert$$1.expect(2);
        var order = 0;
        var addRecordTransform = buildTransform({ op: 'addRecord' });
        source.on('beforePush', function () {
            assert$$1.equal(++order, 1, 'beforePush triggered first');
            // source transformed
            source.transformLog.append(addRecordTransform.id);
            return Promise$2.resolve();
        });
        source._push = function () {
            assert$$1.ok(false, '_push should not be reached');
        };
        source.on('push', function () {
            assert$$1.ok(false, 'push should not be reached');
        });
        return source.push(addRecordTransform).then(function () {
            assert$$1.equal(++order, 2, 'promise resolved last');
        });
    });
    test$7('#push should resolve all promises returned from `beforePush` and fail if any fail', function (assert$$1) {
        assert$$1.expect(5);
        var order = 0;
        var addRecordTransform = buildTransform({ op: 'addRecord' });
        source.on('beforePush', function () {
            assert$$1.equal(++order, 1, 'beforePush triggered first');
            return Promise$2.resolve();
        });
        source.on('beforePush', function () {
            assert$$1.equal(++order, 2, 'beforePush triggered again');
            return Promise$2.reject(':(');
        });
        source._push = function () {
            assert$$1.ok(false, '_push should not be invoked');
        };
        source.on('push', function () {
            assert$$1.ok(false, 'push should not be triggered');
        });
        source.on('pushFail', function () {
            assert$$1.equal(++order, 3, 'pushFail triggered after action failed');
        });
        return source.push(addRecordTransform).catch(function (error) {
            assert$$1.equal(++order, 4, 'promise failed because no actions succeeded');
            assert$$1.equal(error, ':(', 'failure');
        });
    });
});

function _defaults$5(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _classCallCheck$10(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn$5(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits$5(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults$5(subClass, superClass); }

var __decorate$4 = undefined && undefined.__decorate || function (decorators, target, key, desc) {
    var c = arguments.length,
        r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
        d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) {
        if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    }return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var Promise$3 = Orbit__default.Promise;
var _QUnit$8 = QUnit;
var module$9 = _QUnit$8.module;
var test$8 = _QUnit$8.test;

module$9('@queryable', function (hooks) {
    var source = void 0;
    hooks.beforeEach(function () {
        var MySource = function (_Source) {
            _inherits$5(MySource, _Source);

            function MySource() {
                _classCallCheck$10(this, MySource);

                return _possibleConstructorReturn$5(this, _Source.apply(this, arguments));
            }

            return MySource;
        }(Source);
        MySource = __decorate$4([queryable], MySource);
        source = new MySource({ name: 'src1' });
    });
    hooks.afterEach(function () {
        source = null;
    });
    test$8('isQueryable - tests for the application of the @queryable decorator', function (assert$$1) {
        assert$$1.ok(isQueryable(source));
    });
    // TODO
    // test('it should be applied to a Source', function(assert) {
    //   assert.throws(function() {
    //     @queryable
    //     class Vanilla {}
    //   },
    //   Error('Assertion failed: Queryable interface can only be applied to a Source'),
    //   'assertion raised');
    // });
    test$8('#query should resolve as a failure when _query fails', function (assert$$1) {
        assert$$1.expect(2);
        var qe = { op: 'findRecords', type: 'planet' };
        source._query = function () {
            return Promise$3.reject(':(');
        };
        return source.query(function (q) {
            return q.findRecords('planet');
        }).catch(function (error) {
            assert$$1.ok(true, 'query promise resolved as a failure');
            assert$$1.equal(error, ':(', 'failure');
        });
    });
    test$8('#query should trigger `query` event after a successful action in which `_query` resolves successfully', function (assert$$1) {
        assert$$1.expect(7);
        var order = 0;
        var qe = { op: 'findRecords', type: 'planet' };
        source._query = function (query) {
            assert$$1.equal(++order, 1, 'action performed after willQuery');
            assert$$1.strictEqual(query.expression, qe, 'query object matches');
            return Promise$3.resolve(':)');
        };
        source.on('query', function (query, result) {
            assert$$1.equal(++order, 2, 'query triggered after action performed successfully');
            assert$$1.strictEqual(query.expression, qe, 'query matches');
            assert$$1.equal(result, ':)', 'result matches');
        });
        return source.query(qe).then(function (result) {
            assert$$1.equal(++order, 3, 'promise resolved last');
            assert$$1.equal(result, ':)', 'success!');
        });
    });
    test$8('#query should trigger `query` event after a successful action in which `_query` just returns (not a promise)', function (assert$$1) {
        assert$$1.expect(7);
        var order = 0;
        var qe = { op: 'findRecords', type: 'planet' };
        source._query = function (query) {
            assert$$1.equal(++order, 1, 'action performed after willQuery');
            assert$$1.strictEqual(query.expression, qe, 'query object matches');
            return;
        };
        source.on('query', function (query, result) {
            assert$$1.equal(++order, 2, 'query triggered after action performed successfully');
            assert$$1.strictEqual(query.expression, qe, 'query matches');
            assert$$1.equal(result, undefined, 'result matches');
        });
        return source.query(qe).then(function (result) {
            assert$$1.equal(++order, 3, 'promise resolved last');
            assert$$1.equal(result, undefined, 'undefined result');
        });
    });
    test$8('`query` event should receive results as the last argument, even if they are an array', function (assert$$1) {
        assert$$1.expect(7);
        var order = 0;
        var qe = { op: 'findRecords', type: 'planet' };
        source._query = function (query) {
            assert$$1.equal(++order, 1, 'action performed after willQuery');
            assert$$1.strictEqual(query.expression, qe, 'query object matches');
            return new Promise$3(function (resolve) {
                resolve(['a', 'b', 'c']);
            });
        };
        source.on('query', function (query, result) {
            assert$$1.equal(++order, 2, 'query triggered after action performed successfully');
            assert$$1.strictEqual(query.expression, qe, 'query matches');
            assert$$1.deepEqual(result, ['a', 'b', 'c'], 'result matches');
        });
        return source.query(qe).then(function (result) {
            assert$$1.equal(++order, 3, 'promise resolved last');
            assert$$1.deepEqual(result, ['a', 'b', 'c'], 'success!');
        });
    });
    test$8('#query should trigger `queryFail` event after an unsuccessful query', function (assert$$1) {
        assert$$1.expect(7);
        var order = 0;
        var qe = { op: 'findRecords', type: 'planet' };
        source._query = function (query) {
            assert$$1.equal(++order, 1, 'action performed after willQuery');
            assert$$1.strictEqual(query.expression, qe, 'query object matches');
            return Promise$3.reject(':(');
        };
        source.on('query', function () {
            assert$$1.ok(false, 'query should not be triggered');
        });
        source.on('queryFail', function (query, error) {
            assert$$1.equal(++order, 2, 'queryFail triggered after an unsuccessful query');
            assert$$1.strictEqual(query.expression, qe, 'query matches');
            assert$$1.equal(error, ':(', 'error matches');
        });
        return source.query(qe).catch(function (error) {
            assert$$1.equal(++order, 3, 'promise resolved last');
            assert$$1.equal(error, ':(', 'failure');
        });
    });
    test$8('#query should resolve all promises returned from `beforeQuery` before calling `_query`', function (assert$$1) {
        assert$$1.expect(7);
        var order = 0;
        var qe = { op: 'findRecords', type: 'planet' };
        source.on('beforeQuery', function () {
            assert$$1.equal(++order, 1, 'beforeQuery triggered first');
            return Promise$3.resolve();
        });
        source.on('beforeQuery', function () {
            assert$$1.equal(++order, 2, 'beforeQuery triggered second');
            return undefined;
        });
        source.on('beforeQuery', function () {
            assert$$1.equal(++order, 3, 'beforeQuery triggered third');
            return Promise$3.resolve();
        });
        source._query = function () {
            assert$$1.equal(++order, 4, '_query invoked after all `beforeQuery` handlers');
            return Promise$3.resolve(':)');
        };
        source.on('query', function () {
            assert$$1.equal(++order, 5, 'query triggered after action performed successfully');
        });
        return source.query(qe).then(function (result) {
            assert$$1.equal(++order, 6, 'promise resolved last');
            assert$$1.equal(result, ':)', 'success!');
        });
    });
    test$8('#query should resolve all promises returned from `beforeQuery` and fail if any fail', function (assert$$1) {
        assert$$1.expect(5);
        var order = 0;
        var qe = { op: 'findRecords', type: 'planet' };
        source.on('beforeQuery', function () {
            assert$$1.equal(++order, 1, 'beforeQuery triggered first');
            return Promise$3.resolve();
        });
        source.on('beforeQuery', function () {
            assert$$1.equal(++order, 2, 'beforeQuery triggered again');
            return Promise$3.reject(':(');
        });
        source._query = function () {
            assert$$1.ok(false, '_query should not be invoked');
        };
        source.on('query', function () {
            assert$$1.ok(false, 'query should not be triggered');
        });
        source.on('queryFail', function () {
            assert$$1.equal(++order, 3, 'queryFail triggered after action failed');
        });
        return source.query(qe).catch(function (error) {
            assert$$1.equal(++order, 4, 'promise failed because no actions succeeded');
            assert$$1.equal(error, ':(', 'failure');
        });
    });
});

function _defaults$6(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _classCallCheck$11(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn$6(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits$6(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults$6(subClass, superClass); }

var __decorate$5 = undefined && undefined.__decorate || function (decorators, target, key, desc) {
    var c = arguments.length,
        r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
        d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) {
        if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    }return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var _QUnit$9 = QUnit;
var module$10 = _QUnit$9.module;
var test$9 = _QUnit$9.test;

module$10('@syncable', function (hooks) {
    var source = void 0;
    hooks.beforeEach(function () {
        var MySource = function (_Source) {
            _inherits$6(MySource, _Source);

            function MySource() {
                _classCallCheck$11(this, MySource);

                return _possibleConstructorReturn$6(this, _Source.apply(this, arguments));
            }

            return MySource;
        }(Source);
        MySource = __decorate$5([syncable], MySource);
        source = new MySource({ name: 'src1' });
    });
    hooks.afterEach(function () {
        source = null;
    });
    test$9('isSyncable - tests for the application of the @syncable decorator', function (assert$$1) {
        assert$$1.ok(isSyncable(source));
    });
    // TODO
    // test('it should be applied to a Source', function(assert) {
    //   assert.throws(function() {
    //     @syncable
    //     class Vanilla {}
    //   },
    //   Error('Assertion failed: Syncable interface can only be applied to a Source'),
    //   'assertion raised');
    // });
    test$9('#sync accepts a Transform and calls internal method `_sync`', function (assert$$1) {
        assert$$1.expect(2);
        var addPlanet = { op: 'addRecord', record: { type: 'planet', id: 'jupiter' } };
        source._sync = function (transform) {
            assert$$1.strictEqual(transform, addPlanet, 'argument to _sync is a Transform');
            return Orbit__default.Promise.resolve();
        };
        return source.sync(addPlanet).then(function () {
            assert$$1.ok(true, 'transformed promise resolved');
        });
    });
    test$9('#sync should resolve as a failure when `_sync` fails', function (assert$$1) {
        assert$$1.expect(2);
        source._sync = function () {
            return Promise.reject(':(');
        };
        return source.sync({ addRecord: {} }).catch(function (error) {
            assert$$1.ok(true, 'sync promise resolved as a failure');
            assert$$1.equal(error, ':(', 'failure');
        });
    });
    test$9('#sync should trigger `sync` event after a successful action in which `_sync` returns an array of transforms', function (assert$$1) {
        assert$$1.expect(9);
        var order = 0;
        var addRecordTransform = buildTransform({ op: 'addRecord' });
        source.on('beforeSync', function (transform) {
            assert$$1.equal(++order, 1, 'beforeSync triggered first');
            assert$$1.strictEqual(transform, addRecordTransform, 'transform matches');
        });
        source._sync = function (transform) {
            assert$$1.equal(++order, 2, 'action performed after beforeSync');
            assert$$1.strictEqual(transform, addRecordTransform, 'transform object matches');
            return Promise.resolve();
        };
        source.on('transform', function (transform) {
            assert$$1.equal(++order, 3, 'transform triggered after action performed successfully');
            assert$$1.strictEqual(transform, addRecordTransform, 'transform matches');
            return Promise.resolve();
        });
        source.on('sync', function (transform) {
            assert$$1.equal(++order, 4, 'sync triggered after action performed successfully');
            assert$$1.strictEqual(transform, addRecordTransform, 'sync transform matches');
        });
        return source.sync(addRecordTransform).then(function () {
            assert$$1.equal(++order, 5, 'promise resolved last');
        });
    });
    test$9('#sync should trigger `syncFail` event after an unsuccessful sync', function (assert$$1) {
        assert$$1.expect(7);
        var addRecordTransform = buildTransform({ op: 'addRecord' });
        var order = 0;
        source._sync = function (transform) {
            assert$$1.equal(++order, 1, 'action performed first');
            assert$$1.strictEqual(transform, addRecordTransform, 'transform matches');
            throw new Error(':(');
        };
        source.on('sync', function () {
            assert$$1.ok(false, 'sync should not be triggered');
        });
        source.on('syncFail', function (transform, error) {
            assert$$1.equal(++order, 2, 'syncFail triggered after an unsuccessful sync');
            assert$$1.strictEqual(transform, addRecordTransform, 'transform matches');
            assert$$1.equal(error.message, ':(', 'error matches');
        });
        return source.sync(addRecordTransform).catch(function (error) {
            assert$$1.equal(++order, 3, 'promise resolved last');
            assert$$1.equal(error.message, ':(', 'failure');
        });
    });
    test$9('#sync should not call `_sync` if the transform has been applied as a result of `beforeSync` resolution', function (assert$$1) {
        assert$$1.expect(2);
        var order = 0;
        var addRecordTransform = buildTransform({ op: 'addRecord' });
        source.on('beforeSync', function () {
            assert$$1.equal(++order, 1, 'beforeSync triggered first');
            // source transformed
            source.transformLog.append(addRecordTransform.id);
            return Promise.resolve();
        });
        source._sync = function () {
            assert$$1.ok(false, '_sync should not be reached');
        };
        source.on('sync', function () {
            assert$$1.ok(false, 'sync should not be reached');
        });
        return source.sync(addRecordTransform).then(function () {
            assert$$1.equal(++order, 2, 'promise resolved last');
        });
    });
    test$9('#sync should resolve all promises returned from `beforeSync` before calling `_sync`', function (assert$$1) {
        assert$$1.expect(6);
        var order = 0;
        var addRecordTransform = buildTransform({ op: 'addRecord' });
        source.on('beforeSync', function () {
            assert$$1.equal(++order, 1, 'beforeSync triggered first');
            return Promise.resolve();
        });
        source.on('beforeSync', function () {
            assert$$1.equal(++order, 2, 'beforeSync triggered second');
            return undefined;
        });
        source.on('beforeSync', function () {
            assert$$1.equal(++order, 3, 'beforeSync triggered third');
            return Promise.resolve();
        });
        source._sync = function () {
            assert$$1.equal(++order, 4, '_sync invoked after all `beforeSync` handlers');
            return Promise.resolve();
        };
        source.on('sync', function () {
            assert$$1.equal(++order, 5, 'sync triggered after action performed successfully');
        });
        return source.sync(addRecordTransform).then(function () {
            assert$$1.equal(++order, 6, 'promise resolved last');
        });
    });
    test$9('#sync should resolve all promises returned from `beforeSync` and fail if any fail', function (assert$$1) {
        assert$$1.expect(5);
        var order = 0;
        var addRecordTransform = buildTransform({ op: 'addRecord' });
        source.on('beforeSync', function () {
            assert$$1.equal(++order, 1, 'beforeSync triggered first');
            return Promise.resolve();
        });
        source.on('beforeSync', function () {
            assert$$1.equal(++order, 2, 'beforeSync triggered again');
            return Promise.reject(':(');
        });
        source._sync = function () {
            assert$$1.ok(false, '_sync should not be invoked');
        };
        source.on('sync', function () {
            assert$$1.ok(false, 'sync should not be triggered');
        });
        source.on('syncFail', function () {
            assert$$1.equal(++order, 3, 'syncFail triggered after action failed');
        });
        return source.sync(addRecordTransform).catch(function (error) {
            assert$$1.equal(++order, 4, 'promise failed because no actions succeeded');
            assert$$1.equal(error, ':(', 'failure');
        });
    });
});

function _defaults$7(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _classCallCheck$12(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn$7(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits$7(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults$7(subClass, superClass); }

var __decorate$6 = undefined && undefined.__decorate || function (decorators, target, key, desc) {
    var c = arguments.length,
        r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
        d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) {
        if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    }return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var Promise$4 = Orbit__default.Promise;
var _QUnit$10 = QUnit;
var module$11 = _QUnit$10.module;
var test$10 = _QUnit$10.test;

module$11('@updatable', function (hooks) {
    var source = void 0;
    hooks.beforeEach(function () {
        var MySource = function (_Source) {
            _inherits$7(MySource, _Source);

            function MySource() {
                _classCallCheck$12(this, MySource);

                return _possibleConstructorReturn$7(this, _Source.apply(this, arguments));
            }

            return MySource;
        }(Source);
        MySource = __decorate$6([updatable], MySource);
        source = new MySource({ name: 'src1' });
    });
    hooks.afterEach(function () {
        source = null;
    });
    test$10('isUpdatable - tests for the application of the @updatable decorator', function (assert$$1) {
        assert$$1.ok(isUpdatable(source));
    });
    // TODO
    // test('should be applied to a Source', function(assert) {
    //   assert.throws(function() {
    //     @updatable
    //     class Vanilla {}
    //   },
    //   Error('Assertion failed: Updatable interface can only be applied to a Source'),
    //   'assertion raised');
    // });
    test$10('#update should resolve as a failure when `transform` fails', function (assert$$1) {
        assert$$1.expect(2);
        source._update = function () {
            return Promise$4.reject(':(');
        };
        return source.update({ addRecord: {} }).catch(function (error) {
            assert$$1.ok(true, 'update promise resolved as a failure');
            assert$$1.equal(error, ':(', 'failure');
        });
    });
    test$10('#update should trigger `update` event after a successful action in which `_update` returns an array of transforms', function (assert$$1) {
        assert$$1.expect(11);
        var order = 0;
        var addRecordTransform = buildTransform({ op: 'addRecord' });
        source.on('beforeUpdate', function (transform) {
            assert$$1.equal(++order, 1, 'beforeUpdate triggered first');
            assert$$1.strictEqual(transform, addRecordTransform, 'transform matches');
        });
        source._update = function (transform) {
            assert$$1.equal(++order, 2, 'action performed after beforeUpdate');
            assert$$1.strictEqual(transform, addRecordTransform, 'transform object matches');
            return Promise$4.resolve(':)');
        };
        source.on('transform', function (transform) {
            assert$$1.equal(++order, 3, 'transform triggered after action performed successfully');
            assert$$1.strictEqual(transform, addRecordTransform, 'transform matches');
            return Promise$4.resolve();
        });
        source.on('update', function (transform, result) {
            assert$$1.equal(++order, 4, 'update triggered after action performed successfully');
            assert$$1.strictEqual(transform, addRecordTransform, 'update transform matches');
            assert$$1.equal(result, ':)', 'result matches');
        });
        return source.update(addRecordTransform).then(function (result) {
            assert$$1.equal(++order, 5, 'promise resolved last');
            assert$$1.equal(result, ':)', 'success!');
        });
    });
    test$10('`update` event should receive results as the last argument, even if they are an array', function (assert$$1) {
        assert$$1.expect(11);
        var order = 0;
        var addRecordTransform = buildTransform({ op: 'addRecord' });
        source.on('beforeUpdate', function (transform) {
            assert$$1.equal(++order, 1, 'beforeUpdate triggered first');
            assert$$1.strictEqual(transform, addRecordTransform, 'transform matches');
        });
        source._update = function (transform) {
            assert$$1.equal(++order, 2, 'action performed after beforeUpdate');
            assert$$1.strictEqual(transform, addRecordTransform, 'transform object matches');
            return Promise$4.resolve(['a', 'b', 'c']);
        };
        source.on('transform', function (transform) {
            assert$$1.equal(++order, 3, 'transform triggered after action performed successfully');
            assert$$1.strictEqual(transform, addRecordTransform, 'transform matches');
            return Promise$4.resolve();
        });
        source.on('update', function (transform, result) {
            assert$$1.equal(++order, 4, 'update triggered after action performed successfully');
            assert$$1.strictEqual(transform, addRecordTransform, 'update transform matches');
            assert$$1.deepEqual(result, ['a', 'b', 'c'], 'result matches');
        });
        return source.update(addRecordTransform).then(function (result) {
            assert$$1.equal(++order, 5, 'promise resolved last');
            assert$$1.deepEqual(result, ['a', 'b', 'c'], 'success!');
        });
    });
    test$10('#update should trigger `updateFail` event after an unsuccessful update', function (assert$$1) {
        assert$$1.expect(7);
        var addRecordTransform = buildTransform({ op: 'addRecord' });
        var order = 0;
        source._update = function (transform) {
            assert$$1.equal(++order, 1, 'action performed after beforeUpdate');
            assert$$1.strictEqual(transform, addRecordTransform, 'transform matches');
            return Promise$4.reject(':(');
        };
        source.on('update', function () {
            assert$$1.ok(false, 'update should not be triggered');
        });
        source.on('updateFail', function (transform, error) {
            assert$$1.equal(++order, 2, 'updateFail triggered after an unsuccessful update');
            assert$$1.strictEqual(transform, addRecordTransform, 'transform matches');
            assert$$1.equal(error, ':(', 'error matches');
        });
        return source.update(addRecordTransform).catch(function (error) {
            assert$$1.equal(++order, 3, 'promise resolved last');
            assert$$1.equal(error, ':(', 'failure');
        });
    });
    test$10('#update should resolve all promises returned from `beforeUpdate` before calling `_update`', function (assert$$1) {
        assert$$1.expect(6);
        var order = 0;
        var addRecordTransform = buildTransform({ op: 'addRecord' });
        source.on('beforeUpdate', function () {
            assert$$1.equal(++order, 1, 'beforeUpdate triggered first');
            return Promise$4.resolve();
        });
        source.on('beforeUpdate', function () {
            assert$$1.equal(++order, 2, 'beforeUpdate triggered second');
            return undefined;
        });
        source.on('beforeUpdate', function () {
            assert$$1.equal(++order, 3, 'beforeUpdate triggered third');
            return Promise$4.resolve();
        });
        source._update = function () {
            assert$$1.equal(++order, 4, '_update invoked after all `beforeUpdate` handlers');
            return Promise$4.resolve();
        };
        source.on('update', function () {
            assert$$1.equal(++order, 5, 'update triggered after action performed successfully');
        });
        return source.update(addRecordTransform).then(function () {
            assert$$1.equal(++order, 6, 'promise resolved last');
        });
    });
    test$10('#update should not call `_update` if the transform has been applied as a result of `beforeUpdate` resolution', function (assert$$1) {
        assert$$1.expect(2);
        var order = 0;
        var addRecordTransform = buildTransform({ op: 'addRecord' });
        source.on('beforeUpdate', function () {
            assert$$1.equal(++order, 1, 'beforeUpdate triggered first');
            // source transformed
            source.transformLog.append(addRecordTransform.id);
            return Promise$4.resolve();
        });
        source._update = function () {
            assert$$1.ok(false, '_update should not be reached');
        };
        source.on('update', function () {
            assert$$1.ok(false, 'update should not be reached');
        });
        return source.update(addRecordTransform).then(function () {
            assert$$1.equal(++order, 2, 'promise resolved last');
        });
    });
    test$10('#update should resolve all promises returned from `beforeUpdate` and fail if any fail', function (assert$$1) {
        assert$$1.expect(5);
        var order = 0;
        var addRecordTransform = buildTransform({ op: 'addRecord' });
        source.on('beforeUpdate', function () {
            assert$$1.equal(++order, 1, 'beforeUpdate triggered first');
            return Promise$4.resolve();
        });
        source.on('beforeUpdate', function () {
            assert$$1.equal(++order, 2, 'beforeUpdate triggered again');
            return Promise$4.reject(':(');
        });
        source._update = function () {
            assert$$1.ok(false, '_update should not be invoked');
        };
        source.on('update', function () {
            assert$$1.ok(false, 'update should not be triggered');
        });
        source.on('updateFail', function () {
            assert$$1.equal(++order, 3, 'updateFail triggered after action failed');
        });
        return source.update(addRecordTransform).catch(function (error) {
            assert$$1.equal(++order, 4, 'promise failed because no actions succeeded');
            assert$$1.equal(error, ':(', 'failure');
        });
    });
});

function _defaults$8(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _classCallCheck$13(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn$8(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits$8(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults$8(subClass, superClass); }

var _QUnit$11 = QUnit;
var module$12 = _QUnit$11.module;
var test$11 = _QUnit$11.test;

module$12('Source', function (hooks) {
    var source = void 0;
    var schema = void 0;

    var MySource = function (_Source) {
        _inherits$8(MySource, _Source);

        function MySource() {
            _classCallCheck$13(this, MySource);

            return _possibleConstructorReturn$8(this, _Source.apply(this, arguments));
        }

        return MySource;
    }(Source);

    hooks.beforeEach(function () {
        schema = new Schema$1();
    });
    test$11('it can be instantiated', function (assert$$1) {
        source = new MySource();
        assert$$1.ok(source);
        assert$$1.ok(source.transformLog, 'has a transform log');
    });
    test$11('it can be assigned a schema, which will be observed for upgrades by default', function (assert$$1) {
        assert$$1.expect(2);

        var MyDynamicSource = function (_Source2) {
            _inherits$8(MyDynamicSource, _Source2);

            function MyDynamicSource() {
                _classCallCheck$13(this, MyDynamicSource);

                return _possibleConstructorReturn$8(this, _Source2.apply(this, arguments));
            }

            MyDynamicSource.prototype.upgrade = function upgrade() {
                assert$$1.ok(true, 'upgrade called');
                return Orbit__default.Promise.resolve();
            };

            return MyDynamicSource;
        }(Source);

        
        source = new MyDynamicSource({ schema: schema });
        schema.upgrade({});
        assert$$1.ok(true, 'after upgrade');
    });
    test$11('it will not be auto-upgraded if autoUpgrade: false option is specified', function (assert$$1) {
        assert$$1.expect(1);

        var MyDynamicSource = function (_Source3) {
            _inherits$8(MyDynamicSource, _Source3);

            function MyDynamicSource() {
                _classCallCheck$13(this, MyDynamicSource);

                return _possibleConstructorReturn$8(this, _Source3.apply(this, arguments));
            }

            MyDynamicSource.prototype.upgrade = function upgrade() {
                assert$$1.ok(false, 'upgrade should not be called');
                return Orbit__default.Promise.resolve();
            };

            return MyDynamicSource;
        }(Source);

        
        source = new MyDynamicSource({ schema: schema, autoUpgrade: false });
        schema.upgrade({});
        assert$$1.ok(true, 'after upgrade');
    });
    test$11('creates a `transformLog`, `requestQueue`, and `syncQueue`, and assigns each the same bucket as the Source', function (assert$$1) {
        assert$$1.expect(8);
        var bucket = new FakeBucket();
        source = new MySource({ name: 'src1', schema: schema, bucket: bucket });
        assert$$1.equal(source.name, 'src1', 'source has been assigned name');
        assert$$1.equal(source.transformLog.name, 'src1-log', 'transformLog has been assigned name');
        assert$$1.equal(source.requestQueue.name, 'src1-requests', 'requestQueue has been assigned name');
        assert$$1.equal(source.syncQueue.name, 'src1-sync', 'syncQueue has been assigned name');
        assert$$1.strictEqual(source.bucket, bucket, 'source has been assigned bucket');
        assert$$1.strictEqual(source.transformLog.bucket, bucket, 'transformLog has been assigned bucket');
        assert$$1.strictEqual(source.requestQueue.bucket, bucket, 'requestQueue has been assigned bucket');
        assert$$1.strictEqual(source.syncQueue.bucket, bucket, 'syncQueue has been assigned bucket');
    });
    test$11('overrides default requestQueue settings with injected requestQueueSettings', function (assert$$1) {
        assert$$1.expect(3);
        var defaultBucket = new FakeBucket();
        var requestQueueBucket = new FakeBucket();
        var requestQueueSettings = {
            name: 'my-request-queue',
            autoProcess: false,
            bucket: requestQueueBucket
        };
        source = new MySource({ name: 'src1', bucket: defaultBucket, requestQueueSettings: requestQueueSettings });
        assert$$1.equal(source.requestQueue.name, 'my-request-queue', 'requestQueue has been assigned overriden name');
        assert$$1.equal(source.requestQueue.autoProcess, false, 'requestQueue has been assigned overriden autoProcess');
        assert$$1.equal(source.requestQueue.bucket, requestQueueBucket, 'requestQueue has been assigned overriden bucket');
    });
    test$11('overrides default syncQueue settings with injected syncQueueSettings', function (assert$$1) {
        assert$$1.expect(3);
        var defaultBucket = new FakeBucket();
        var syncQueueBucket = new FakeBucket();
        var syncQueueSettings = {
            name: 'my-sync-queue',
            autoProcess: false,
            bucket: syncQueueBucket
        };
        source = new MySource({ name: 'src1', bucket: defaultBucket, syncQueueSettings: syncQueueSettings });
        assert$$1.equal(source.syncQueue.name, 'my-sync-queue', 'syncQueue has been assigned overriden name');
        assert$$1.equal(source.syncQueue.autoProcess, false, 'syncQueue has been assigned overriden autoProcess');
        assert$$1.equal(source.syncQueue.bucket, syncQueueBucket, 'syncQueue has been assigned overriden bucket');
    });
    test$11('creates a `queryBuilder` upon first access', function (assert$$1) {
        var qb = source.queryBuilder;
        assert$$1.ok(qb, 'queryBuilder created');
        assert$$1.strictEqual(qb, source.queryBuilder, 'queryBuilder remains the same');
    });
    test$11('creates a `transformBuilder` upon first access', function (assert$$1) {
        var tb = source.transformBuilder;
        assert$$1.ok(tb, 'transformBuilder created');
        assert$$1.strictEqual(tb, source.transformBuilder, 'transformBuilder remains the same');
        assert$$1.strictEqual(source.transformBuilder.recordInitializer, source.schema, 'transformBuilder uses the schema to initialize records');
    });
    test$11('it can be instantiated with a `queryBuilder` and/or `transformBuilder`', function (assert$$1) {
        var queryBuilder = new QueryBuilder();
        var transformBuilder = new TransformBuilder();
        source = new MySource({ queryBuilder: queryBuilder, transformBuilder: transformBuilder });
        assert$$1.strictEqual(queryBuilder, source.queryBuilder, 'queryBuilder remains the same');
        assert$$1.strictEqual(transformBuilder, source.transformBuilder, 'transformBuilder remains the same');
    });
    test$11('#_transformed should trigger `transform` event BEFORE resolving', function (assert$$1) {
        assert$$1.expect(3);
        source = new MySource();
        var order = 0;
        var appliedTransform = buildTransform({ op: 'addRecord' });
        source.on('transform', function (transform) {
            assert$$1.equal(++order, 1, '`transform` event triggered after action performed successfully');
            assert$$1.strictEqual(transform, appliedTransform, 'applied transform matches');
        });
        return source._transformed([appliedTransform]).then(function () {
            assert$$1.equal(++order, 2, '_transformed promise resolved last');
        });
    });
    test$11('#transformLog contains transforms applied', function (assert$$1) {
        assert$$1.expect(2);
        source = new MySource();
        var appliedTransform = buildTransform({ op: 'addRecord' });
        assert$$1.ok(!source.transformLog.contains(appliedTransform.id));
        return source._transformed([appliedTransform]).then(function () {
            return assert$$1.ok(source.transformLog.contains(appliedTransform.id));
        });
    });
});

var _QUnit$12 = QUnit;
var module$13 = _QUnit$12.module;
var test$12 = _QUnit$12.test;

module$13('TransformBuilder', function (hooks) {
    var tb = void 0;
    hooks.beforeEach(function () {
        tb = new TransformBuilder();
    });
    test$12('#addRecord', function (assert$$1) {
        var record = { type: 'planet', id: 'jupiter' };
        assert$$1.deepEqual(tb.addRecord(record), { op: 'addRecord', record: record });
    });
    test$12('#replaceRecord', function (assert$$1) {
        var record = { type: 'planet', id: 'jupiter' };
        assert$$1.deepEqual(tb.replaceRecord(record), { op: 'replaceRecord', record: record });
    });
    test$12('#removeRecord', function (assert$$1) {
        var record = { type: 'planet', id: 'jupiter' };
        assert$$1.deepEqual(tb.removeRecord(record), { op: 'removeRecord', record: record });
    });
    test$12('#replaceKey', function (assert$$1) {
        var record = { type: 'planet', id: 'jupiter' };
        assert$$1.deepEqual(tb.replaceKey(record, 'remoteId', '123'), { op: 'replaceKey', record: record, key: 'remoteId', value: '123' });
    });
    test$12('#replaceAttribute', function (assert$$1) {
        var record = { type: 'planet', id: 'jupiter' };
        assert$$1.deepEqual(tb.replaceAttribute(record, 'name', 'Earth'), { op: 'replaceAttribute', record: record, attribute: 'name', value: 'Earth' });
    });
    test$12('#addToRelatedRecords', function (assert$$1) {
        var record = { type: 'planet', id: 'jupiter' };
        var relatedRecord = { type: 'moon', id: 'Io' };
        assert$$1.deepEqual(tb.addToRelatedRecords(record, 'moons', relatedRecord), { op: 'addToRelatedRecords', record: record, relationship: 'moons', relatedRecord: relatedRecord });
    });
    test$12('#removeFromRelatedRecords', function (assert$$1) {
        var record = { type: 'planet', id: 'jupiter' };
        var relatedRecord = { type: 'moon', id: 'Io' };
        assert$$1.deepEqual(tb.removeFromRelatedRecords(record, 'moons', relatedRecord), { op: 'removeFromRelatedRecords', record: record, relationship: 'moons', relatedRecord: relatedRecord });
    });
    test$12('#replaceRelatedRecords', function (assert$$1) {
        var record = { type: 'planet', id: 'jupiter' };
        var relatedRecords = [{ type: 'moon', id: 'Io' }];
        assert$$1.deepEqual(tb.replaceRelatedRecords(record, 'moons', relatedRecords), { op: 'replaceRelatedRecords', record: record, relationship: 'moons', relatedRecords: relatedRecords });
    });
    test$12('#replaceRelatedRecord', function (assert$$1) {
        var record = { type: 'moon', id: 'Io' };
        var relatedRecord = { type: 'planet', id: 'Jupiter' };
        assert$$1.deepEqual(tb.replaceRelatedRecord(record, 'planet', relatedRecord), { op: 'replaceRelatedRecord', record: record, relationship: 'planet', relatedRecord: relatedRecord });
    });
    test$12('#addRecord - when a recordInitializer has been set', function (assert$$1) {
        var recordInitializer = {
            initializeRecord: function (record) {
                if (record.id === undefined) {
                    record.id = 'abc123';
                }
            }
        };
        tb = new TransformBuilder({ recordInitializer: recordInitializer });
        var record = { type: 'planet' };
        assert$$1.deepEqual(tb.addRecord(record), { op: 'addRecord', record: { type: 'planet', id: 'abc123' } });
    });
});

var _QUnit$13 = QUnit;
var module$14 = _QUnit$13.module;
var test$13 = _QUnit$13.test;
///////////////////////////////////////////////////////////////////////////////

module$14('buildTransform', function () {
    test$13('can instantiate a transform from an empty array of operations', function (assert$$1) {
        var transform = buildTransform([]);
        assert$$1.ok(transform);
    });
    test$13('can instantiate a transform that will be assigned an `id`', function (assert$$1) {
        var transform = buildTransform([]);
        assert$$1.ok(transform.id, 'transform has an id');
    });
    test$13('can instantiate a transform with operations, options, and an id', function (assert$$1) {
        var operations = [{ op: 'addRecord' }];
        var options = { sources: { jsonapi: { include: 'comments' } } };
        var id = 'abc123';
        var transform = buildTransform(operations, options, id);
        assert$$1.strictEqual(transform.id, id, 'id was populated');
        assert$$1.strictEqual(transform.operations, operations, 'operations was populated');
        assert$$1.strictEqual(transform.options, options, 'options was populated');
    });
    test$13('will return a transform passed into it', function (assert$$1) {
        var transform = buildTransform([]);
        assert$$1.strictEqual(buildTransform(transform), transform);
    });
    test$13('will create a transform using a TransformBuilder if a function is passed into it', function (assert$$1) {
        var tb = new TransformBuilder();
        var planet = { type: 'planet', id: 'earth' };
        var operation = {
            op: 'addRecord',
            record: planet
        };
        var query = buildTransform(function (t) {
            return t.addRecord(planet);
        }, null, null, tb);
        assert$$1.deepEqual(query.operations, [operation], 'operations was populated');
    });
});

Object.defineProperty(exports, '__esModule', { value: true });

});
