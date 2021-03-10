<template>
 <div class="all">
    <div class="loginBox">
      <el-form
    :model="ruleForm"
    :rules="rules"
    ref="form"
    class="demo-ruleForm"
  >
    <el-form-item>
      <div class="btn"><img src="https://demo.careyshop.cn/static/admin/img/logo_100.18c454b3.png" alt=""></div>
    </el-form-item>
    <el-form-item prop="username">
      <el-input v-model="ruleForm.username" placeholder="请输入用户名"></el-input>
    </el-form-item>
    <el-form-item prop="password">
      <el-input v-model="ruleForm.password" placeholder="请输入密码"></el-input>
    </el-form-item>
    <el-form-item>
      <div class="btn"><el-button type="primary" style="width:100px" @click="login">登录</el-button></div>
    </el-form-item>
  </el-form>
    </div>
 </div>
</template>

<script lang='ts'>
import { ElMessage } from "element-plus";
import {defineComponent,onMounted, ref } from 'vue'
import api from "@/http/api";
import { useRouter } from "vue-router";
import { Rules } from "../../types/index";
import store from '@/store'
export interface Model {
  username: string;
  password: string;
}
export interface Rule {
  username: Rules[];
  password: Rules[];
}
 export default defineComponent({
   name: '',
   props: {
   },
   components: {

   },
   setup() {
     const router=useRouter()//this.$router
    const form = ref<any>(null);
    const ruleForm = ref<Model>({
      username: "",
      password: "",
    });
    const rules = ref<Rule>({
      username: [
        {
          required: true,
          message: "用户名不能为空",
          trigger: "blur",
        },
      ],
      password: [
        {
          required: true,
          message: "密码不能为空",
          trigger: "blur",
        },
      ],
    });
    const login = (): void => {
      form.value.validate((valid: boolean) => {
        if (valid) {
          api
            .login({
              username: ruleForm.value.username,
              password: ruleForm.value.password,
            })
            .then((res: any) => {
              console.log(res);
              if(res.token){
               ElMessage.success("登录成功");
               localStorage.setItem('token',res.token)
               localStorage.setItem('user',JSON.stringify(res.user))
               store.commit('setuser')
               store.commit('settoken')
               router.push('/')
              }else {
          ElMessage.error(res.msg);
        }
            });
        } else {
          ElMessage.error("表单输入有误");
        }
      });
    };
    return {
      ruleForm,
      login,
      form,
      rules
    };
   }
 })
</script>

<style scoped lang='scss'>
.all{
    position: absolute;
    width: 100%;
    height: 100%;
    background-image: url('https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3060476037,2939104136&fm=26&gp=0.jpg');
    background-size: 100% 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}
.loginBox{
  width: 380px;
  height: 435px;
  background-color: rgba($color: #000000, $alpha: 0.3);
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  overflow: hidden;
}
.btn{
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>