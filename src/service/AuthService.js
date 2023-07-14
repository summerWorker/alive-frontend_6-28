import {postRequest} from "./ajax";
import {endpoint} from "../utils/endpoint";
import {message} from "antd";
import bcrypt from 'bcryptjs';
import {Encrypt} from "../utils/AESUtils";
export const login = (values) => {
    const password = values.password;
    // 密钥加密
    const hashedPassword = Encrypt(password);

    const url = endpoint+'/login_email';
    const data = {
        email: values.email,
        password: hashedPassword
    }
    console.log(data);
    const callback = (data) => {
        if (data.status <= 0) {
            message.error(data.msg);
            return false;
        } else {
            message.success(data.msg + '欢迎你，' + data.data.userInfo.nickname + '!');
            localStorage.setItem('token', data.token);
            return true;
        }
    };
    return postRequest(url, data, callback);
}