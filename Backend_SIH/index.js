const express=require("express")
const cors=require("cors")
require("./Config/config");

const app=express();
const port=process.env.PORT || 3000;
app.use(express.json());
app.use(cors());
app.use("/uploads",express.static("./uploads"));

app.use("/complaint",require("./Routes/ComplaintRoutes"))
app.use("/assets",require("./Routes/AssetRoutes"))
app.use("/inventory",require("./Routes/InventoryRoutes"))

app.listen(port,()=>{
    console.log(`server is running on ${port}`)
});