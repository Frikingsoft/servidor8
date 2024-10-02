import bcrypt from "bcryptjs"
const encriptar_contra = (contra) =>{
    let salt = bcrypt.genSaltSync(10);
    contra = bcrypt.hashSync(contra, salt)
    return contra
}
const guardar_db = ()=>{
    
}
const conectar_db = () =>{
    
}
export {
    encriptar_contra
}