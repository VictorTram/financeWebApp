export interface Transaction {
    name: String,
    purchaseDate: String,
    entryDate: {
        type:
            Date,
            default: Date
    },
    category: String,
    necessary: Boolean,
    price: String,
    description: String,
}