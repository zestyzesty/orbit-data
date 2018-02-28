var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var __decorate = this && this.__decorate || function (decorators, target, key, desc) {
    var c = arguments.length,
        r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
        d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) {
        if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    }return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import Orbit from './main';
import { evented, settleInSeries, TaskQueue, Log } from '@orbit/core';
import QueryBuilder from './query-builder';
import TransformBuilder from './transform-builder';
import { assert } from '@orbit/utils';
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

        _classCallCheck(this, Source);

        this._schema = settings.schema;
        this._keyMap = settings.keyMap;
        var name = this._name = settings.name;
        var bucket = this._bucket = settings.bucket;
        this._queryBuilder = settings.queryBuilder;
        this._transformBuilder = settings.transformBuilder;
        var requestQueueSettings = settings.requestQueueSettings || {};
        var syncQueueSettings = settings.syncQueueSettings || {};
        if (bucket) {
            assert('TransformLog requires a name if it has a bucket', !!name);
        }
        this._transformLog = new Log({ name: name ? name + "-log" : undefined, bucket: bucket });
        this._requestQueue = new TaskQueue(this, Object.assign({ name: name ? name + "-requests" : undefined, bucket: bucket }, requestQueueSettings));
        this._syncQueue = new TaskQueue(this, Object.assign({ name: name ? name + "-sync" : undefined, bucket: bucket }, syncQueueSettings));
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
        return Orbit.Promise.resolve();
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
                    return Orbit.Promise.resolve();
                }
                return _this2._transformLog.append(transform.id).then(function () {
                    return settleInSeries(_this2, 'transform', transform);
                });
            });
        }, Orbit.Promise.resolve()).then(function () {
            return transforms;
        });
    };

    Source.prototype._enqueueRequest = function _enqueueRequest(type, data) {
        return this._requestQueue.push({ type: type, data: data });
    };

    Source.prototype._enqueueSync = function _enqueueSync(type, data) {
        return this._syncQueue.push({ type: type, data: data });
    };

    _createClass(Source, [{
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
Source = __decorate([evented], Source);
export { Source };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic291cmNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsic3JjL3NvdXJjZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFBQSxPQUFPLEFBQUssV0FBTSxBQUFRLEFBQUM7QUFDM0IsQUFBTyxTQUNMLEFBQU8sU0FBVyxBQUFjLGdCQUVoQyxBQUFTLFdBRVQsQUFBRyxBQUNKLFdBQU0sQUFBYSxBQUFDO0FBR3JCLE9BQU8sQUFBWSxrQkFBTSxBQUFpQixBQUFDO0FBRTNDLE9BQU8sQUFBZ0Isc0JBQU0sQUFBcUIsQUFBQztBQUNuRCxBQUFPLFNBQUUsQUFBTSxBQUFFLGNBQU0sQUFBYyxBQUFDO0FBZ0J0QyxBQVNHOzs7Ozs7Ozs7O0FBRUg7QUFrQkU7OztZQUFZLCtFQUEyQixBQUFFOzs7O0FBQ3ZDLEFBQUksYUFBQyxBQUFPLFVBQUcsQUFBUSxTQUFDLEFBQU0sQUFBQztBQUMvQixBQUFJLGFBQUMsQUFBTyxVQUFHLEFBQVEsU0FBQyxBQUFNLEFBQUM7QUFDL0IsWUFBTSxBQUFJLE9BQUcsQUFBSSxLQUFDLEFBQUssUUFBRyxBQUFRLFNBQUMsQUFBSSxBQUFDO0FBQ3hDLFlBQU0sQUFBTSxTQUFHLEFBQUksS0FBQyxBQUFPLFVBQUcsQUFBUSxTQUFDLEFBQU0sQUFBQztBQUM5QyxBQUFJLGFBQUMsQUFBYSxnQkFBRyxBQUFRLFNBQUMsQUFBWSxBQUFDO0FBQzNDLEFBQUksYUFBQyxBQUFpQixvQkFBRyxBQUFRLFNBQUMsQUFBZ0IsQUFBQztBQUNuRCxZQUFNLEFBQW9CLHVCQUFHLEFBQVEsU0FBQyxBQUFvQix3QkFBSSxBQUFFLEFBQUM7QUFDakUsWUFBTSxBQUFpQixvQkFBRyxBQUFRLFNBQUMsQUFBaUIscUJBQUksQUFBRSxBQUFDO0FBRTNELEFBQUUsQUFBQyxZQUFDLEFBQU0sQUFBQyxRQUFDLEFBQUM7QUFDWCxBQUFNLG1CQUFDLEFBQWlELG1EQUFFLENBQUMsQ0FBQyxBQUFJLEFBQUMsQUFBQyxBQUNwRTtBQUFD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QUksS0FBQyxBQUFPLEFBQ2hDLEFBQUMsQUFBQyxBQUNMO0FBSHFELGlCQUFyQjtBQUcvQjtBQUNELEFBQU0sbUJBQUMsQUFBRSxBQUFDLEFBQ1o7QUFBQzs7Ozs7QUEvRm1CLEFBQU0scUJBRDNCLEFBQU8sVUFDYyxBQUFNLEFBd0ozQjtTQXhKcUIsQUFBTSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBPcmJpdCBmcm9tICcuL21haW4nO1xuaW1wb3J0IHtcbiAgZXZlbnRlZCwgRXZlbnRlZCwgc2V0dGxlSW5TZXJpZXMsXG4gIEJ1Y2tldCxcbiAgVGFza1F1ZXVlLFxuICBUYXNrLCBQZXJmb3JtZXIsXG4gIExvZ1xufSBmcm9tICdAb3JiaXQvY29yZSc7XG5pbXBvcnQgS2V5TWFwIGZyb20gJy4va2V5LW1hcCc7XG5pbXBvcnQgU2NoZW1hIGZyb20gJy4vc2NoZW1hJztcbmltcG9ydCBRdWVyeUJ1aWxkZXIgZnJvbSAnLi9xdWVyeS1idWlsZGVyJztcbmltcG9ydCB7IFRyYW5zZm9ybSB9IGZyb20gJy4vdHJhbnNmb3JtJztcbmltcG9ydCBUcmFuc2Zvcm1CdWlsZGVyIGZyb20gJy4vdHJhbnNmb3JtLWJ1aWxkZXInO1xuaW1wb3J0IHsgYXNzZXJ0IH0gZnJvbSAnQG9yYml0L3V0aWxzJztcblxuZXhwb3J0IGludGVyZmFjZSBTb3VyY2VTZXR0aW5ncyB7XG4gIG5hbWU/OiBzdHJpbmc7XG4gIHNjaGVtYT86IFNjaGVtYTtcbiAga2V5TWFwPzogS2V5TWFwO1xuICBidWNrZXQ/OiBCdWNrZXQ7XG4gIHF1ZXJ5QnVpbGRlcj86IFF1ZXJ5QnVpbGRlcjtcbiAgdHJhbnNmb3JtQnVpbGRlcj86IFRyYW5zZm9ybUJ1aWxkZXI7XG4gIGF1dG9VcGdyYWRlPzogYm9vbGVhbjtcbiAgcmVxdWVzdFF1ZXVlU2V0dGluZ3M/OiBUYXNrUXVldWVTZXR0aW5ncztcbiAgc3luY1F1ZXVlU2V0dGluZ3M/OiBUYXNrUXVldWVTZXR0aW5ncztcbn1cblxuZXhwb3J0IHR5cGUgU291cmNlQ2xhc3MgPSAobmV3ICgpID0+IFNvdXJjZSk7XG5cbi8qKlxuIEJhc2UgY2xhc3MgZm9yIHNvdXJjZXMuXG5cbiBAY2xhc3MgU291cmNlXG4gQG5hbWVzcGFjZSBPcmJpdFxuIEBwYXJhbSB7T2JqZWN0fSBbc2V0dGluZ3NdIC0gc2V0dGluZ3MgZm9yIHNvdXJjZVxuIEBwYXJhbSB7U3RyaW5nfSBbc2V0dGluZ3MubmFtZV0gLSBOYW1lIGZvciBzb3VyY2VcbiBAcGFyYW0ge1NjaGVtYX0gW3NldHRpbmdzLnNjaGVtYV0gLSBTY2hlbWEgZm9yIHNvdXJjZVxuIEBjb25zdHJ1Y3RvclxuICovXG5AZXZlbnRlZFxuZXhwb3J0IGFic3RyYWN0IGNsYXNzIFNvdXJjZSBpbXBsZW1lbnRzIEV2ZW50ZWQsIFBlcmZvcm1lciB7XG4gIHByb3RlY3RlZCBfbmFtZTogc3RyaW5nO1xuICBwcm90ZWN0ZWQgX2J1Y2tldDogQnVja2V0O1xuICBwcm90ZWN0ZWQgX2tleU1hcDogS2V5TWFwO1xuICBwcm90ZWN0ZWQgX3NjaGVtYTogU2NoZW1hO1xuICBwcm90ZWN0ZWQgX3RyYW5zZm9ybUxvZzogTG9nO1xuICBwcm90ZWN0ZWQgX3JlcXVlc3RRdWV1ZTogVGFza1F1ZXVlO1xuICBwcm90ZWN0ZWQgX3N5bmNRdWV1ZTogVGFza1F1ZXVlO1xuICBwcm90ZWN0ZWQgX3F1ZXJ5QnVpbGRlcjogUXVlcnlCdWlsZGVyO1xuICBwcm90ZWN0ZWQgX3RyYW5zZm9ybUJ1aWxkZXI6IFRyYW5zZm9ybUJ1aWxkZXI7XG5cbiAgLy8gRXZlbnRlZCBpbnRlcmZhY2Ugc3R1YnNcbiAgb246IChldmVudDogc3RyaW5nLCBjYWxsYmFjazogRnVuY3Rpb24sIGJpbmRpbmc/OiBvYmplY3QpID0+IHZvaWQ7XG4gIG9mZjogKGV2ZW50OiBzdHJpbmcsIGNhbGxiYWNrOiBGdW5jdGlvbiwgYmluZGluZz86IG9iamVjdCkgPT4gdm9pZDtcbiAgb25lOiAoZXZlbnQ6IHN0cmluZywgY2FsbGJhY2s6IEZ1bmN0aW9uLCBiaW5kaW5nPzogb2JqZWN0KSA9PiB2b2lkO1xuICBlbWl0OiAoZXZlbnQ6IHN0cmluZywgLi4uYXJncykgPT4gdm9pZDtcbiAgbGlzdGVuZXJzOiAoZXZlbnQ6IHN0cmluZykgPT4gYW55W107XG5cbiAgY29uc3RydWN0b3Ioc2V0dGluZ3M6IFNvdXJjZVNldHRpbmdzID0ge30pIHtcbiAgICB0aGlzLl9zY2hlbWEgPSBzZXR0aW5ncy5zY2hlbWE7XG4gICAgdGhpcy5fa2V5TWFwID0gc2V0dGluZ3Mua2V5TWFwO1xuICAgIGNvbnN0IG5hbWUgPSB0aGlzLl9uYW1lID0gc2V0dGluZ3MubmFtZTtcbiAgICBjb25zdCBidWNrZXQgPSB0aGlzLl9idWNrZXQgPSBzZXR0aW5ncy5idWNrZXQ7XG4gICAgdGhpcy5fcXVlcnlCdWlsZGVyID0gc2V0dGluZ3MucXVlcnlCdWlsZGVyO1xuICAgIHRoaXMuX3RyYW5zZm9ybUJ1aWxkZXIgPSBzZXR0aW5ncy50cmFuc2Zvcm1CdWlsZGVyO1xuICAgIGNvbnN0IHJlcXVlc3RRdWV1ZVNldHRpbmdzID0gc2V0dGluZ3MucmVxdWVzdFF1ZXVlU2V0dGluZ3MgfHwge307XG4gICAgY29uc3Qgc3luY1F1ZXVlU2V0dGluZ3MgPSBzZXR0aW5ncy5zeW5jUXVldWVTZXR0aW5ncyB8fCB7fTtcblxuICAgIGlmIChidWNrZXQpIHtcbiAgICAgIGFzc2VydCgnVHJhbnNmb3JtTG9nIHJlcXVpcmVzIGEgbmFtZSBpZiBpdCBoYXMgYSBidWNrZXQnLCAhIW5hbWUpO1xuICAgIH1cblxuICAgIHRoaXMuX3RyYW5zZm9ybUxvZyA9IG5ldyBMb2coeyBuYW1lOiBuYW1lID8gYCR7bmFtZX0tbG9nYCA6IHVuZGVmaW5lZCwgYnVja2V0IH0pO1xuXG4gICAgdGhpcy5fcmVxdWVzdFF1ZXVlID0gbmV3IFRhc2tRdWV1ZSh0aGlzLCB7XG4gICAgICBuYW1lOiBuYW1lID8gYCR7bmFtZX0tcmVxdWVzdHNgIDogdW5kZWZpbmVkLFxuICAgICAgYnVja2V0LFxuICAgICAgLi4ucmVxdWVzdFF1ZXVlU2V0dGluZ3NcbiAgICB9KTtcblxuICAgIHRoaXMuX3N5bmNRdWV1ZSA9IG5ldyBUYXNrUXVldWUodGhpcywge1xuICAgICAgbmFtZTogbmFtZSA/IGAke25hbWV9LXN5bmNgIDogdW5kZWZpbmVkLFxuICAgICAgYnVja2V0LFxuICAgICAgLi4uc3luY1F1ZXVlU2V0dGluZ3NcbiAgICB9KTtcblxuICAgIGlmICh0aGlzLl9zY2hlbWEgJiYgKHNldHRpbmdzLmF1dG9VcGdyYWRlID09PSB1bmRlZmluZWQgfHwgc2V0dGluZ3MuYXV0b1VwZ3JhZGUpKSB7XG4gICAgICB0aGlzLl9zY2hlbWEub24oJ3VwZ3JhZGUnLCAoKSA9PiB0aGlzLnVwZ3JhZGUoKSk7XG4gICAgfVxuICB9XG5cbiAgZ2V0IG5hbWUoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpcy5fbmFtZTtcbiAgfVxuXG4gIGdldCBzY2hlbWEoKTogU2NoZW1hIHtcbiAgICByZXR1cm4gdGhpcy5fc2NoZW1hO1xuICB9XG5cbiAgZ2V0IGtleU1hcCgpOiBLZXlNYXAge1xuICAgIHJldHVybiB0aGlzLl9rZXlNYXA7XG4gIH1cblxuICBnZXQgYnVja2V0KCk6IEJ1Y2tldCB7XG4gICAgcmV0dXJuIHRoaXMuX2J1Y2tldDtcbiAgfVxuXG4gIGdldCB0cmFuc2Zvcm1Mb2coKTogTG9nIHtcbiAgICByZXR1cm4gdGhpcy5fdHJhbnNmb3JtTG9nO1xuICB9XG5cbiAgZ2V0IHJlcXVlc3RRdWV1ZSgpOiBUYXNrUXVldWUge1xuICAgIHJldHVybiB0aGlzLl9yZXF1ZXN0UXVldWU7XG4gIH1cblxuICBnZXQgc3luY1F1ZXVlKCk6IFRhc2tRdWV1ZSB7XG4gICAgcmV0dXJuIHRoaXMuX3N5bmNRdWV1ZTtcbiAgfVxuXG4gIGdldCBxdWVyeUJ1aWxkZXIoKTogUXVlcnlCdWlsZGVyIHtcbiAgICBsZXQgcWIgPSB0aGlzLl9xdWVyeUJ1aWxkZXI7XG4gICAgaWYgKHFiID09PSB1bmRlZmluZWQpIHtcbiAgICAgIHFiID0gdGhpcy5fcXVlcnlCdWlsZGVyID0gbmV3IFF1ZXJ5QnVpbGRlcigpO1xuICAgIH1cbiAgICByZXR1cm4gcWI7XG4gIH1cblxuICBnZXQgdHJhbnNmb3JtQnVpbGRlcigpOiBUcmFuc2Zvcm1CdWlsZGVyIHtcbiAgICBsZXQgdGIgPSB0aGlzLl90cmFuc2Zvcm1CdWlsZGVyO1xuICAgIGlmICh0YiA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICB0YiA9IHRoaXMuX3RyYW5zZm9ybUJ1aWxkZXIgPSBuZXcgVHJhbnNmb3JtQnVpbGRlcih7XG4gICAgICAgIHJlY29yZEluaXRpYWxpemVyOiB0aGlzLl9zY2hlbWFcbiAgICAgIH0pO1xuICAgIH1cbiAgICByZXR1cm4gdGI7XG4gIH1cblxuICAvLyBQZXJmb3JtZXIgaW50ZXJmYWNlXG4gIHBlcmZvcm0odGFzazogVGFzayk6IFByb21pc2U8YW55PiB7XG4gICAgbGV0IG1ldGhvZCA9IGBfXyR7dGFzay50eXBlfV9fYDtcbiAgICByZXR1cm4gdGhpc1ttZXRob2RdLmNhbGwodGhpcywgdGFzay5kYXRhKTtcbiAgfTtcblxuICAvKipcbiAgICogVXBncmFkZSBzb3VyY2UgYXMgcGFydCBvZiBhIHNjaGVtYSB1cGdyYWRlLlxuICAgKlxuICAgKiBAcmV0dXJucyB7UHJvbWlzZTx2b2lkPn1cbiAgICogQG1lbWJlcm9mIFNvdXJjZVxuICAgKi9cbiAgdXBncmFkZSgpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICByZXR1cm4gT3JiaXQuUHJvbWlzZS5yZXNvbHZlKCk7XG4gIH1cblxuICAvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuICAvLyBQcml2YXRlIG1ldGhvZHNcbiAgLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cblxuICAvKipcbiAgIE5vdGlmaWVzIGxpc3RlbmVycyB0aGF0IHRoaXMgc291cmNlIGhhcyBiZWVuIHRyYW5zZm9ybWVkIGJ5IGVtaXR0aW5nIHRoZVxuICAgYHRyYW5zZm9ybWAgZXZlbnQuXG5cbiAgIFJlc29sdmVzIHdoZW4gYW55IHByb21pc2VzIHJldHVybmVkIHRvIGV2ZW50IGxpc3RlbmVycyBhcmUgcmVzb2x2ZWQuXG5cbiAgIEFsc28sIGFkZHMgYW4gZW50cnkgdG8gdGhlIFNvdXJjZSdzIGB0cmFuc2Zvcm1Mb2dgIGZvciBlYWNoIHRyYW5zZm9ybS5cblxuICAgQHByaXZhdGVcbiAgIEBtZXRob2QgX3RyYW5zZm9ybWVkXG4gICBAcGFyYW0ge0FycmF5fSB0cmFuc2Zvcm1zIC0gVHJhbnNmb3JtcyB0aGF0IGhhdmUgb2NjdXJyZWQuXG4gICBAcmV0dXJucyB7UHJvbWlzZX0gUHJvbWlzZSB0aGF0IHJlc29sdmVzIHRvIHRyYW5zZm9ybXMuXG4gICovXG4gIHByaXZhdGUgX3RyYW5zZm9ybWVkKHRyYW5zZm9ybXM6IFRyYW5zZm9ybVtdKTogUHJvbWlzZTxUcmFuc2Zvcm1bXT4ge1xuICAgIHJldHVybiB0cmFuc2Zvcm1zXG4gICAgICAucmVkdWNlKChjaGFpbiwgdHJhbnNmb3JtKSA9PiB7XG4gICAgICAgIHJldHVybiBjaGFpbi50aGVuKCgpID0+IHtcbiAgICAgICAgICBpZiAodGhpcy5fdHJhbnNmb3JtTG9nLmNvbnRhaW5zKHRyYW5zZm9ybS5pZCkpIHtcbiAgICAgICAgICAgIHJldHVybiBPcmJpdC5Qcm9taXNlLnJlc29sdmUoKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICByZXR1cm4gdGhpcy5fdHJhbnNmb3JtTG9nLmFwcGVuZCh0cmFuc2Zvcm0uaWQpXG4gICAgICAgICAgICAudGhlbigoKSA9PiBzZXR0bGVJblNlcmllcyh0aGlzLCAndHJhbnNmb3JtJywgdHJhbnNmb3JtKSk7XG4gICAgICAgIH0pO1xuICAgICAgfSwgT3JiaXQuUHJvbWlzZS5yZXNvbHZlKCkpXG4gICAgICAudGhlbigoKSA9PiB0cmFuc2Zvcm1zKTtcbiAgfVxuXG4gIHByaXZhdGUgX2VucXVldWVSZXF1ZXN0KHR5cGU6IHN0cmluZywgZGF0YTogYW55KTogUHJvbWlzZTx2b2lkPiB7XG4gICAgcmV0dXJuIHRoaXMuX3JlcXVlc3RRdWV1ZS5wdXNoKHsgdHlwZSwgZGF0YSB9KTtcbiAgfVxuXG4gIHByaXZhdGUgX2VucXVldWVTeW5jKHR5cGU6IHN0cmluZywgZGF0YTogYW55KTogUHJvbWlzZTx2b2lkPiB7XG4gICAgcmV0dXJuIHRoaXMuX3N5bmNRdWV1ZS5wdXNoKHsgdHlwZSwgZGF0YSB9KTtcbiAgfVxufVxuIl19