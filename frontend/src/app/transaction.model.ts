export interface Transaction {
    id: Number,
    name: String,
    purchyear: Number,
    purchmonth: Number,
    purchday: Number,
    entrydate: {
        type:
            Date,
            default: Date
    },
    necessary: Boolean,
    labels: String,
    price: Number,
    description: String,
}

/*
name
purchYear
purchMonth
purchDay
entrydate
necessary
labels
price
decription
 
 
 */