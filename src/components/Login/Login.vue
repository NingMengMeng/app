<template>
    <div style="padding: 0.5rem">
        <vue-cell-group>
            <vue-cell-item>
                <span slot="left">用户名：</span>
                <vue-input slot="right" required v-model="user" placeholder="请输入UM账号"></vue-input>
            </vue-cell-item>
            <vue-cell-item>
                <span slot="left">密码：</span>
                <vue-input slot="right" required type="password" v-model="pass" placeholder="请输入开机密码"></vue-input>
            </vue-cell-item>
        </vue-cell-group>
        <vue-button type="primary" size="large" @click.native="commitToLogin">提交</vue-button>
    </div>
</template>

<script src='./Login.js'></script>
