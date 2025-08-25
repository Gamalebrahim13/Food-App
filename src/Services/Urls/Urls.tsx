import axios from "axios";

export const baseURL="https://upskilling-egypt.com:3006/api/v1/";
export const img_URL="https://upskilling-egypt.com:3006/";
export const publicAxiosInstance =axios.create({baseURL})

export const privateAxiosInstance =axios.create({baseURL,  headers:{Authorization:localStorage.getItem("token")}})



export const USERS_URLS={
    Login :`Users/Login`,
    Register :`Users/Register`,
    Delete_User :(id :number)=>`Users/${id}`,
    Forget_Pass :`Users/Reset/Request`,
    Reset_Pass :`Users/Reset`,
    Change_Pass :`Users/ChangePassword`,
    VERIFY:`Users/verify`,
    CURRENTUSER:`Users/currentUser`,
}


export const Categories_Urls={
    Get_Category :`Category`,
    Add_Category :`Category/`,
    Update_Category :`Category/`,
  
}
export const Recipes_Urls={
    Get_Recipes :`Recipe`,
    Add_Recipes :`Recipe/`,
    Update_Recipes :`Recipe/`,
  
}
export const Users_Urls={
    Get_Users :`Users`,
    Delete_Users :`Users`,
}
export const FAVS_URLS={
    Get_Favs :`userRecipe`,
    ADD_Favs :`userRecipe`,
}
export const Tags_Urls={
    Get_Tags :`tag/`
}