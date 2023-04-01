import mongoose from "mongoose";


type connectionProps = {
    isConnected:number
}

const connection:connectionProps = {isConnected:0};

async function connect() {
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


const convertToObject = () => {
//     doc._id = doc._id.toString()
//     doc.createdAt = doc.createdAt.toString()
//     doc.updatedAt = doc.updatedAt.toString()
//     return doc
 }

const db = {connect, disconnect, convertToObject}

export default db