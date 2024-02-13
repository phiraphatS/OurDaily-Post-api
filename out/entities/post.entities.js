"use strict";
var __esDecorate = (this && this.__esDecorate) || function (ctor, descriptorIn, decorators, contextIn, initializers, extraInitializers) {
    function accept(f) { if (f !== void 0 && typeof f !== "function") throw new TypeError("Function expected"); return f; }
    var kind = contextIn.kind, key = kind === "getter" ? "get" : kind === "setter" ? "set" : "value";
    var target = !descriptorIn && ctor ? contextIn["static"] ? ctor : ctor.prototype : null;
    var descriptor = descriptorIn || (target ? Object.getOwnPropertyDescriptor(target, contextIn.name) : {});
    var _, done = false;
    for (var i = decorators.length - 1; i >= 0; i--) {
        var context = {};
        for (var p in contextIn) context[p] = p === "access" ? {} : contextIn[p];
        for (var p in contextIn.access) context.access[p] = contextIn.access[p];
        context.addInitializer = function (f) { if (done) throw new TypeError("Cannot add initializers after decoration has completed"); extraInitializers.push(accept(f || null)); };
        var result = (0, decorators[i])(kind === "accessor" ? { get: descriptor.get, set: descriptor.set } : descriptor[key], context);
        if (kind === "accessor") {
            if (result === void 0) continue;
            if (result === null || typeof result !== "object") throw new TypeError("Object expected");
            if (_ = accept(result.get)) descriptor.get = _;
            if (_ = accept(result.set)) descriptor.set = _;
            if (_ = accept(result.init)) initializers.unshift(_);
        }
        else if (_ = accept(result)) {
            if (kind === "field") initializers.unshift(_);
            else descriptor[key] = _;
        }
    }
    if (target) Object.defineProperty(target, contextIn.name, descriptor);
    done = true;
};
var __runInitializers = (this && this.__runInitializers) || function (thisArg, initializers, value) {
    var useValue = arguments.length > 2;
    for (var i = 0; i < initializers.length; i++) {
        value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
    }
    return useValue ? value : void 0;
};
var __setFunctionName = (this && this.__setFunctionName) || function (f, name, prefix) {
    if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
    return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Post = void 0;
const typeorm_1 = require("typeorm");
const post_img_entities_1 = require("./post_img.entities");
let Post = (() => {
    let _classDecorators = [(0, typeorm_1.Entity)()];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _instanceExtraInitializers = [];
    let _id_decorators;
    let _id_initializers = [];
    let _contentText_decorators;
    let _contentText_initializers = [];
    let _isViewed_decorators;
    let _isViewed_initializers = [];
    let _isActive_decorators;
    let _isActive_initializers = [];
    let _isDeleted_decorators;
    let _isDeleted_initializers = [];
    let _createdDate_decorators;
    let _createdDate_initializers = [];
    let _modifiedDate_decorators;
    let _modifiedDate_initializers = [];
    let _createdBy_decorators;
    let _createdBy_initializers = [];
    let _modifiedBy_decorators;
    let _modifiedBy_initializers = [];
    let _postImg_decorators;
    let _postImg_initializers = [];
    var Post = _classThis = class {
        constructor() {
            this.id = (__runInitializers(this, _instanceExtraInitializers), __runInitializers(this, _id_initializers, void 0));
            this.contentText = __runInitializers(this, _contentText_initializers, void 0);
            this.isViewed = __runInitializers(this, _isViewed_initializers, void 0);
            this.isActive = __runInitializers(this, _isActive_initializers, void 0);
            this.isDeleted = __runInitializers(this, _isDeleted_initializers, void 0);
            this.createdDate = __runInitializers(this, _createdDate_initializers, void 0);
            this.modifiedDate = __runInitializers(this, _modifiedDate_initializers, void 0);
            this.createdBy = __runInitializers(this, _createdBy_initializers, void 0);
            this.modifiedBy = __runInitializers(this, _modifiedBy_initializers, void 0);
            this.postImg = __runInitializers(this, _postImg_initializers, void 0);
        }
    };
    __setFunctionName(_classThis, "Post");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _id_decorators = [(0, typeorm_1.PrimaryGeneratedColumn)({ name: "ID" })];
        _contentText_decorators = [(0, typeorm_1.Column)("varchar", { name: "CONTENT_TEXT", length: 1500 })];
        _isViewed_decorators = [(0, typeorm_1.Column)("integer", { name: "IS_VIEWED" })];
        _isActive_decorators = [(0, typeorm_1.Column)("integer", { name: "IS_ACTIVE" })];
        _isDeleted_decorators = [(0, typeorm_1.Column)("integer", { name: "IS_DELETED" })];
        _createdDate_decorators = [(0, typeorm_1.Column)({ type: 'datetime', name: 'CREATED_DATE' })];
        _modifiedDate_decorators = [(0, typeorm_1.UpdateDateColumn)({ type: 'datetime', name: 'MODIFIED_DATE' })];
        _createdBy_decorators = [(0, typeorm_1.Column)("integer", { name: "CREATED_BY" })];
        _modifiedBy_decorators = [(0, typeorm_1.Column)("integer", { name: "MODIFIED_BY" })];
        _postImg_decorators = [(0, typeorm_1.OneToMany)(() => post_img_entities_1.PostImg, (postImg) => postImg.postId)];
        __esDecorate(null, null, _id_decorators, { kind: "field", name: "id", static: false, private: false, access: { has: obj => "id" in obj, get: obj => obj.id, set: (obj, value) => { obj.id = value; } }, metadata: _metadata }, _id_initializers, _instanceExtraInitializers);
        __esDecorate(null, null, _contentText_decorators, { kind: "field", name: "contentText", static: false, private: false, access: { has: obj => "contentText" in obj, get: obj => obj.contentText, set: (obj, value) => { obj.contentText = value; } }, metadata: _metadata }, _contentText_initializers, _instanceExtraInitializers);
        __esDecorate(null, null, _isViewed_decorators, { kind: "field", name: "isViewed", static: false, private: false, access: { has: obj => "isViewed" in obj, get: obj => obj.isViewed, set: (obj, value) => { obj.isViewed = value; } }, metadata: _metadata }, _isViewed_initializers, _instanceExtraInitializers);
        __esDecorate(null, null, _isActive_decorators, { kind: "field", name: "isActive", static: false, private: false, access: { has: obj => "isActive" in obj, get: obj => obj.isActive, set: (obj, value) => { obj.isActive = value; } }, metadata: _metadata }, _isActive_initializers, _instanceExtraInitializers);
        __esDecorate(null, null, _isDeleted_decorators, { kind: "field", name: "isDeleted", static: false, private: false, access: { has: obj => "isDeleted" in obj, get: obj => obj.isDeleted, set: (obj, value) => { obj.isDeleted = value; } }, metadata: _metadata }, _isDeleted_initializers, _instanceExtraInitializers);
        __esDecorate(null, null, _createdDate_decorators, { kind: "field", name: "createdDate", static: false, private: false, access: { has: obj => "createdDate" in obj, get: obj => obj.createdDate, set: (obj, value) => { obj.createdDate = value; } }, metadata: _metadata }, _createdDate_initializers, _instanceExtraInitializers);
        __esDecorate(null, null, _modifiedDate_decorators, { kind: "field", name: "modifiedDate", static: false, private: false, access: { has: obj => "modifiedDate" in obj, get: obj => obj.modifiedDate, set: (obj, value) => { obj.modifiedDate = value; } }, metadata: _metadata }, _modifiedDate_initializers, _instanceExtraInitializers);
        __esDecorate(null, null, _createdBy_decorators, { kind: "field", name: "createdBy", static: false, private: false, access: { has: obj => "createdBy" in obj, get: obj => obj.createdBy, set: (obj, value) => { obj.createdBy = value; } }, metadata: _metadata }, _createdBy_initializers, _instanceExtraInitializers);
        __esDecorate(null, null, _modifiedBy_decorators, { kind: "field", name: "modifiedBy", static: false, private: false, access: { has: obj => "modifiedBy" in obj, get: obj => obj.modifiedBy, set: (obj, value) => { obj.modifiedBy = value; } }, metadata: _metadata }, _modifiedBy_initializers, _instanceExtraInitializers);
        __esDecorate(null, null, _postImg_decorators, { kind: "field", name: "postImg", static: false, private: false, access: { has: obj => "postImg" in obj, get: obj => obj.postImg, set: (obj, value) => { obj.postImg = value; } }, metadata: _metadata }, _postImg_initializers, _instanceExtraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        Post = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return Post = _classThis;
})();
exports.Post = Post;
