import mongoose, { Schema, Document } from 'mongoose';

interface ICollection {
  id: string;
  title: string;
}

export interface ICustomerRecord extends Document {
  collections: ICollection[];
  siteID: string;
  webflowToken: string;
}

const CustomerRecordSchema: Schema = new Schema({
  name: { type: String, required: true },
  collections: [{ id: String, title: String }],
  siteID: { type: String, required: true },
  webflowToken: { type: String, required: true },
});

export default mongoose.model<ICustomerRecord>('CustomerRecord', CustomerRecordSchema);
