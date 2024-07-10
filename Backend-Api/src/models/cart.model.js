import mongoose,{Schema} from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2"

const cartSchema = new Schema(
    {
        product_image: {
            type: String,
            required: true
        },
        company: {
            type: String,
            required: true
        },
        item_name: {
            type: String,
            required: true
        },
        original_price: {
            type: Number,
            required: true
        },
        current_price: {
            type: Number,
            required: true
        },
        discount_percentage: {
            type: Number,
            required: true
        },
        return_period: {
            type: Number,
            required: true
        },
        delivery_date: {
            type: Date,
            required: true
        },
        rating: {
            stars: {
                type: Number,
                required: true
            },
            count: {
                type: Number,
                required: true
            }
        }
    },
    {
        timestamps: true
    }
)

cartSchema.plugin(mongooseAggregatePaginate)

export const Cart = mongoose.model("Cart",cartSchema)