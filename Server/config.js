import dotenv from 'dotenv'
dotenv.config()


export const PORT = process.env.PORT || 4000;
export const DATABASE_URL = process.env.DATABASE_URL;
export const SECRET_KEY = process.env.SECRET_KEY || 'jjnc88uuiq99vsqwekkk9sam';

export const COLLECTIONS = {
    USERS: "users",
    CATEGORY: "category",
    SUB_CATEGORY: "subCategory",
    PRODUCT: "product",
    WISH_LIST: "wishList"
}




export const isNull = (field) => {
    return (
        field === undefined ||
        field === "undefined" ||
        field === "" ||
        field === null ||
        field === "null"
    ); // || !!!field;
};