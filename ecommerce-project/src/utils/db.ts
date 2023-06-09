import mongoose from "mongoose";


type connectionProps = {
    isConnected:number
}

const connection:connectionProps = {isConnected:0};

async function connect() {

    console.log(mongoose.connections) 

    if (connection.isConnected){
        console.log("already connected")
        return
    }

    if (mongoose.connections.length > 0) {
        connection.isConnected = mongoose.connections[0].readyState
        if(connection.isConnected === 1){
            console.log('use previous connection')
            return
        }
        await mongoose.disconnect()
    }

    const db = await mongoose.connect(process.env.MONGODB_URI!)
    console.log("new connection")

    connection.isConnected = db.connections[0].readyState
}

async function disconnect() {
    if (connection.isConnected) {
        if (process.env.NODE_ENV ==="production"){
            await mongoose.disconnect()
        }
        else {
            console.log("not disconnected")
        }
    }
}


const db = {connect, disconnect}

export default db