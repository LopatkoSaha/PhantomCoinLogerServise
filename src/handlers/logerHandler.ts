import { connection } from "../database";

async function setDatabase (type: string, path: string, body: string, message: string) {
    try {
      await connection.query(
        "INSERT INTO loger (type, path, body, message) VALUES (?, ?, ?, ?)", 
        [type, path, body, message]
    );
    } catch (error) {
      console.error("Error loger database: ", error);
    }
  }
  
export async function logerHandler (message: any) {
  if(message.value){
      const msg = JSON.parse(message.value.toString());
      console.log(
        `📩 Получено сообщение: ${msg.type} => ${JSON.stringify(msg.data)}`
      );
      await setDatabase(msg.type, msg.data.path, msg.data.body, msg.data.message);
    }
}
