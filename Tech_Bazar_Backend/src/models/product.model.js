import mongoose, {Schema} from "mongoose";

const productSchema = new Schema({
          productName:{
            type: String,
            required: true,
            index: true
          },
          productDiscription: {
            type: String,
            required: true
          },
          productCoverImage: {
            type: String,
            required: true

          },
          productImages: [
            {
                type: String
            }
          ],
          productOwner: {
            type: Schema.Types.ObjectId,
            ref: "User"
          },
          productPrice: {
            type: String,
             required: true
          },
          productCategory: {
            required: true,
            type: String
          }
},{
    timestamps: true
})


export const Product = mongoose.model("Product", productSchema);