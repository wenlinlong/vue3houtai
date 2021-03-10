<template>
  <div class="all">
      <div class="header">
        <div v-if="show == true" class="logoBox">
          <img
            class="logo"
            src="https://demo.careyshop.cn/static/admin/image/theme/careyshop/logo/all.png"
            alt=""
          />
        </div>
        <div v-else class="logoBox2">
          <img
            class="logo2"
            src="https://demo.careyshop.cn/static/admin/image/theme/careyshop/logo/icon-only.png"
            alt=""
          />
        </div>
        <div class="iconFold">
          <i v-if="show == true" class="el-icon-s-fold" @click="showChange"></i>
          <i v-else class="el-icon-s-unfold" @click="showChange2"></i>
        </div>
        <div class="navTitle" v-for="(item,index) in data" :key="index">{{item.name}}</div>
      </div>
      <div class="aside" v-if="show == true"></div>
      <div class="aside2" v-else ></div>

     <div v-if="show == true" class="main">
        <router-view />
      </div>
     <div v-else class="main2">
        <router-view />
      </div>
  </div>
</template>

<script lang='ts'>
import { defineComponent, ref } from "vue";
import api from "@/http/api";
interface Obj{
    name:string
    children: Obj[]
}
export default defineComponent({
  name: "",
  props: {},
  components: {},
  setup() {
    // let data:Obj[]=[
    //    {
    //     name:'',
    //     children:[
    //         {
    //             name:'',
    //             children:[]
    //         }
    //     ]
    // }
    // ]
    let data = ref<any>([])
    let show = ref<boolean>(true);
    let showChange = (): void => {
      show.value = false;
    };
    let showChange2 = (): void => {
      show.value = true;
    };
    //获取导航栏
    api.getNav().then((res: any) => {
      console.log(res);
      data.value=res.data
      console.log(data);
      
    });
    return {
      show,
      showChange,
      showChange2,
      data
    };
  },
});
</script>

<style scoped lang='scss'>
.all{
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
}
.header {
  background-color: rgb(44, 54, 67);
  width: 100%;
  padding: 0;
  text-align: center;
  line-height: 60px;
  display: flex;
  .logoBox {
    width: 200px;
    height: 60px;
    display: flex;
    justify-content: center;
    align-items: center;
    .logo {
      width: 120px;
      height: 60px;
      cursor: pointer;
    }
  }
  .logoBox2 {
    width: 60px;
    height: 60px;
    display: flex;
    justify-content: center;
    align-items: center;
    .logo2 {
      width: 60px;
      height: 60px;
      cursor: pointer;
    }
  }
  .iconFold {
    width: 60px;
    height: 60px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: rgb(204, 204, 204);
    font-size: 22px;
    cursor: pointer;
  }
  .navTitle{
    width: 78px;
    height: 60px;
    line-height: 60px;
    font-size: 14px;
    text-align: center;
    color: rgb(204,204,204);
    cursor: pointer;
  }
}

.aside {
  background-color: rgb(44, 54, 67);
  position: absolute;
  width: 200px;
  top: 60px;
  left: 0;
  bottom: 0;
}
.aside2 {
  background-color: rgb(44, 54, 67);
  position: absolute;
  width: 60px;
  top: 60px;
  left: 0;
  bottom: 0;
}

.main {
  background-color:blue;
  position: absolute;
  left: 200px;
  top: 60px;
  bottom: 0;
  right: 0;
}
.main2 {
  background-color: blue;
  position: absolute;
  left: 60px;
  top: 60px;
  bottom: 0;
  right: 0;
}

// .el-menu-vertical-demo:not(.el-menu--collapse) {
//   width: 200px;
//   min-height: 400px;
// }
</style>