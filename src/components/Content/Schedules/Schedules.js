import { NavBar } from 'ELUI/navbar';

export default {
    data() {
        return {
            menuDepts:[],
            menuPlans:[],
            bsArr:[],
            isShowMenu: false,
            menuDeptSingle: [], //title上面的值好取
            staffs: [], //对应的值班人员
            menus: [], //隐藏的各个菜单
            arrIndex: 0,
            dateObj: {
                month: new Date().getMonth() + 1,
                year: new Date().getFullYear(),
                day: new Date().getDate()
            },
            nowDate: '',
            bs: {
                email: 'ML_490@pingan.com.cn',
                name: '部署组',
                work_tel: '--'
            },
            workingStaffArr: [],
            weekStaffArr: [],
            groupArr: [{
                name: '测试环境部署(9:30~11:30,12:30~18:00)',
                liable: '责任人',
                leading: '负责人',
                judge: ['测试班负责人', '测试班成员']
            },
                {name: '生产环境部署(9:30~11:30,12:30~18:00)', liable: '责任人', leading: '负责人', judge: ['生产班负责人', '生产班成员']},
                {
                    name: '其他',
                    liable: 'ITSM问题处理 (09:00~18:00)',
                    leading: '巡检/生产环境紧急处理 (07:30~16:30)',
                    judge: ['早班', '白班']
                },
                {name: '晚班', liable: '(22:00~次日6:00)', leading: '(16:00~24:00)', judge: ['小晚班', '大晚班']}],
            timeArr: [{time: '9:30,18:30'}, {time: '9:30,18:30'}, {time: '07:30,18:00'}, {time: '16:00:00,23:59:59'}, {time: '22:00,23:59:59'}]
        }
    },
    components: {
       'vue-bar': NavBar
    },
    methods: {
        renderData(menuDepts, index) {
            this.arrIndex = index;
            if (index < this.menus.length - 1) {
                this.menuDeptSingle.name = menuDepts.name;
                this.menuDeptSingle.email = menuDepts.email;
                this.menuDeptSingle.work_tel = menuDepts.work_tel;
                this.staffs = menuDepts.staffs;
            } else if (index === this.menus.length - 1) {
                this.menuDeptSingle.name = '部署组';
                this.menuDeptSingle.email = 'ML_490@pingan.com.cn';
                this.menuDeptSingle.work_tel = '--';
            }
            this.menuDeptSingle.showMail = this.menuDeptSingle.email.split('@')[0];
        },
        getDetailDept:function(index) {
            this.isShowMenu = false;
            this.renderData(this.menuDepts[index], index);
        },
        toTel:function(tel) {
            if (tel.length < 8) {
                return;
            }
            window.location.href = "tel://" + tel;
        },
        toEmail:function(email) {
            window.location.href = "mailto:" + email;
        },
        //初始化工作日部署
        initWorkingStaffArr:function() {
            var dayWorking = [];// 白班
            var nightWorking = []; //晚班
            this.groupArr.map(function(group, index){
                var obj = {
                    name: group.name,
                    desc: '',
                    duty: [{
                        name: group.leading,
                        leadings: []
                    }, {
                        name: group.liable,
                        leadings: []
                    }]
                };
                if (group.name !== '晚班') {
                    dayWorking.push(obj)
                } else {
                    nightWorking.push(obj)
                }
            });

            this.workingStaffArr.push({
                name: '白班',
                dayWorking: dayWorking
            });
            this.workingStaffArr.push({
                name: '',
                dayWorking: nightWorking
            });
        },
        //处理工作日数据的格式
        handlerWorkingData:function() {
            var _this = this;
            var xbsArr=_this.bsArr;
            xbsArr.map(function(bsData){
                _this.groupArr.map(function(group, index){
                    group.judge.map(function(jdg, i){
                        if (bsData.WORK_NAME === jdg) {
                            if (index < 3) {
                                _this.workingStaffArr[0].dayWorking[index].duty[i].leadings.push(bsData)
                            }
                            if (index === 3) {
                                _this.workingStaffArr[1].dayWorking[0].duty[i].leadings.push(bsData)
                            }
                        }
                    })
                })
            });

            //处理时间段----显示高亮
            this.timeArr.map(function(time, index){
                _this.bsCompareTime(time.time.split(',')[0], time.time.split(',')[1], index)
            })
        },
        //处理部署数据
        handlerBsData:function() {
            var xbsArr=this.bsArr;
            if (xbsArr.length === 0) return;

            if (xbsArr[0].WORK_NAME.indexOf('周末及节假日') > -1) {
                //周末及节假日
                this.weekStaffArr = xbsArr;
            } else {
                this.initWorkingStaffArr();
                //处理工作日格式数据
                this.handlerWorkingData();
            }
        },
        bsCompareTime:function(firstTime, lastTime, index) {
            var yMD = this.dateObj.year + '/' + this.dateObj.month + '/' + this.dateObj.day;
            var _this = this;

            firstTime = new Date(yMD + ' ' + firstTime).getTime();
            lastTime = new Date(yMD + ' ' + lastTime).getTime();
            var timer = setInterval(() => {
                if (document.getElementsByClassName('working')) {
                    clearInterval(timer);
                    var eles = document.getElementsByClassName('working');
                    var ulNight = document.getElementsByClassName('ul-night');
                    if (_this.nowDate > firstTime && _this.nowDate < lastTime) {
                        switch (index) {
                            case 0:
                            case 1:
                            case 2:
                                eles[index].setAttribute('class', 'working contact-selected-bg');
                                break;
                            case 3:
                                ulNight[0].setAttribute('class', 'ul-night contact-selected-bg');
                                break;
                            case 4:
                                ulNight[1].setAttribute('class', 'ul-night contact-selected-bg');
                                break;
                        }
                    }

                }
            }, 10)
        },
    },
    mounted() {
        console.log(this)
        console.log('============')
        this.$store.dispatch('getAddressDuty').then(res => {
            console.log(res)
            let data = res.data.rosters;
            this.menus = data.depts;
            console.log(this.menus)
            this.menus.push(this.bs);
            
        });
        this.$store.dispatch('getDeployDuty').then(data => {
            console.log(data)
        })
    }
};
