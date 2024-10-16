    import mongoose from "mongoose";
    const BlacklistSchema = new mongoose.Schema(
        {
            token: {
                type: String,
                required: true,
                ref: "User",
            },
            // createdAt: {
            //     type: Date,
            //     default: Date.now,
            //     expires: '20m', // Token will be removed automatically after 20 minutes
            //   },
        },
        { timestamps: true }
    );
    export default mongoose.model("blacklist", BlacklistSchema);