import * as mongoose from 'mongoose';

export function applyDeletedFieldBeforeHooks(schema: mongoose.Schema) {
  schema.pre('findOne', function (next) {
    this.where({ deleted: false });
    next();
  });
  schema.pre('find', function (next) {
    this.where({ deleted: false });
    next();
  });
  schema.pre('count', function (next) {
    this.where({ deleted: false });
    next();
  });
  schema.pre('countDocuments', function (next) {
    this.where({ deleted: false });
    next();
  });
  schema.pre('estimatedDocumentCount', function (next) {
    this.where({ deleted: false });
    next();
  });
}
