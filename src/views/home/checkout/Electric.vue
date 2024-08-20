<script setup lang="ts">
import { ref } from 'vue'
import { excelRequest } from '../../../api/excel';
import { ElMessage } from 'element-plus';

// Table 1 —— 电器检验(单)表
const tableCode = ref('') // 表码
const projectName = ref('') // 项目名称
const cabinetType = ref('') // 柜型
const cabinetNum = ref('') // 柜号
const inspector = ref('') // 检验员
const date = new Date().toISOString().slice(0, 10) // 日期
const other = ref('') // 其他
const remark = ref('') // 备注

// Table 2 —— 装备检验表
const testerNum = ref('') // 数字耐电压绝缘测试仪
const powerOnNum = ref('') // 通电测试设备
const proLoopNum = ref('') // 保护回路测量设备
const drawerConfirm = ref(-1) // 抽屉检确认
const processConfirm = ref(-1) // 过程检验确认
const transferListConfirm = ref(-1) // 流转单记录确认

// Table 3 —— 回路检验表
const loopVdc = ref('') // >1000Ω/V( )VDC
const voltage = ref('') // Voltage( )V/min
const formula = ref('') // 辅助回路公式
const l1Prevoltage = ref('') // 耐压前(M Ω)
const l2Prevoltage = ref('')
const l3Prevoltage = ref('')
const nPrevoltage = ref('')
const assistPrevoltage = ref('') // 辅助回路~~~
const l1NoPrevoltage = ref('') // 耐压后(M Ω)
const l2NoPrevoltage = ref('')
const l3NoPrevoltage = ref('')
const nNoPrevoltage = ref('')
const assistNoPrevoltage = ref('') // 辅助回路~~~
const l1LeakageCurrent = ref('') // 泄露电流(mA)
const l2LeakageCurrent = ref('')
const l3LeakageCurrent = ref('')
const nLeakageCurrent = ref('')
const assistLeakageCurrent = ref('') // 辅助回路~~~

// Table 4 —— 检验项表
const locationResult = ref(-1) // 源线取样位置(检查结果)——通电操作实验
const locationCorrector = ref('') // 整改人
const locationRetest = ref('') // 复检结果
const phaseSequenceResult = ref(-1) // 检查一次回路相序
const phaseSequenceCorrector = ref('')
const phaseSequenceRetest = ref('')
const secondaryElementResult = ref(-1) // 二次元件完整性
const secondaryElementCorrector = ref('')
const secondaryElementRetest = ref('')
const lightResult = ref(-1) // 电器指示灯
const lightCorrector = ref('')
const lightRetest = ref('')
const meterShowResult = ref(-1) // 各类表计显示
const meterShowCorrector = ref('')
const meterShowRetest = ref('')
const meterParamResult = ref(-1) // 表计参数设置
const meterParamCorrector = ref('')
const meterParamRetest = ref('')
const signalResult = ref(-1) // 外引信号
const signalCorrector = ref('')
const signalRetest = ref('')
const electricLinkageResult = ref(-1) // 联调-电气连锁
const electricLinkageCorrector = ref('')
const electricLinkageRetest = ref('')
const cableInterlockResult = ref(-1) // 缆绳联锁
const cableInterlockCorrector = ref('')
const cableInterlockRetest = ref('')
const allFunctionResult = ref(-1) // 各功能测试
const allFunctionCorrector = ref('')
const allFunctionRetest = ref('')
const powerControllerResult = ref(-1) // 功率因数控制器参数设置(检查结果)——CAP
const powerControllerCorrector = ref('')
const powerControllerRetest = ref('')
const switchResult = ref(-1) // 手动/自动投切
const switchCorrector = ref('')
const switchRetest = ref('')
const fanTemperatureResult = ref(-1) // 风扇/温度传感器
const fanTemperatureCorrector = ref('')
const fanTemperatureRetest = ref('')
const arresterResult = ref(-1) // 避雷器
const arresterCorrector = ref('')
const arresterRetest = ref('')
const doorLandResult = ref(-1) // 各门板接地点(检查结果)——接地连续性<0.1Ω
const doorLandCorrector = ref('')
const doorLandRetest = ref('')
const elementLandResult = ref(-1) // 主要元件接地点
const elementLandCorrector = ref('')
const elementLandRetest = ref('')
const specialPointResult = ref(-1) // 特殊注意点(检查结果)——开工单
const specialPointCorrector = ref('')
const specialPointRetest = ref('')
const blotResult = ref(-1) // 柜表污渍(检查结果)——清理
const blotCorrector = ref('')
const blotRetest = ref('')
const sundriesResult = ref(-1) // 柜内杂物
const sundriesCorrector = ref('')
const sundriesRetest = ref('')

// Table 5 —— 其它不合格项表
const oneText = ref('') // 不合格项1
const twoText = ref('')
const threeText = ref('')
const fourText = ref('')
const fiveText = ref('')
const sixText = ref('')
const oneCorrector = ref('') // 整改人1
const twoCorrector = ref('')
const threeCorrector = ref('')
const fourCorrector = ref('')
const fiveCorrector = ref('')
const sixCorrector = ref('')
const oneRecheck = ref('') // 复检1
const twoRecheck = ref('')
const threeRecheck = ref('')
const fourRecheck = ref('')
const fiveRecheck = ref('')
const sixRecheck = ref('')



async function handleSubmit() {


    if (!tableCode.value.trim()) {
        ElMessage.error({ message: "表码不能为空", center: true })
        return false
    }
    if (!projectName.value.trim()) {
        ElMessage.error({ message: "项目名称不能为空", center: true })
        return false
    }
    if (!cabinetType.value.trim()) {
        ElMessage.error({ message: "柜型不能为空", center: true })
        return false
    }
    if (!cabinetNum.value.trim()) {
        ElMessage.error({ message: "柜号不能为空", center: true })
        return false
    }
    if (!inspector.value.trim()) {
        ElMessage.error({ message: "检验员不能为空", center: true })
        return false
    }



    try {
        const res = await excelRequest({
            // Table 1 —— 电器检验(单)表
            tableCode: tableCode.value,
            projectName: projectName.value,
            cabinetType: cabinetType.value,
            cabinetNum: cabinetNum.value,
            inspector: inspector.value,
            date: date,
            other: other.value,
            remark: remark.value,

            // Table 2 —— 装备检验表
            testerNum: testerNum.value,
            powerOnNum: powerOnNum.value,
            proLoopNum: proLoopNum.value,
            drawerConfirm: drawerConfirm.value,
            processConfirm: processConfirm.value,
            transferListConfirm: transferListConfirm.value,

            // Table 3 —— 回路检验表
            loopVdc: loopVdc.value,
            voltage: voltage.value,
            formula: formula.value,
            l1Prevoltage: l1Prevoltage.value,
            l2Prevoltage: l2Prevoltage.value,
            l3Prevoltage: l3Prevoltage.value,
            nPrevoltage: nPrevoltage.value,
            assistPrevoltage: assistPrevoltage.value,
            l1NoPrevoltage: l1NoPrevoltage.value,
            l2NoPrevoltage: l2NoPrevoltage.value,
            l3NoPrevoltage: l3NoPrevoltage.value,
            nNoPrevoltage: nNoPrevoltage.value,
            assistNoPrevoltage: assistNoPrevoltage.value,
            l1LeakageCurrent: l1LeakageCurrent.value,
            l2LeakageCurrent: l2LeakageCurrent.value,
            l3LeakageCurrent: l3LeakageCurrent.value,
            nLeakageCurrent: nLeakageCurrent.value,
            assistLeakageCurrent: assistLeakageCurrent.value,

            // Table 4 —— 检验项表
            locationResult: locationResult.value,
            locationCorrector: locationCorrector.value,
            locationRetest: locationRetest.value,
            phaseSequenceResult: phaseSequenceResult.value,
            phaseSequenceCorrector: phaseSequenceCorrector.value,
            phaseSequenceRetest: phaseSequenceRetest.value,
            secondaryElementResult: secondaryElementResult.value,
            secondaryElementCorrector: secondaryElementCorrector.value,
            secondaryElementRetest: secondaryElementRetest.value,
            lightResult: lightResult.value,
            lightCorrector: lightCorrector.value,
            lightRetest: lightRetest.value,
            meterShowResult: meterShowResult.value,
            meterShowCorrector: meterShowCorrector.value,
            meterShowRetest: meterShowRetest.value,
            meterParamResult: meterParamResult.value,
            meterParamCorrector: meterParamCorrector.value,
            meterParamRetest: meterParamRetest.value,
            signalResult: signalResult.value,
            signalCorrector: signalCorrector.value,
            signalRetest: signalRetest.value,
            electricLinkageResult: electricLinkageResult.value,
            electricLinkageCorrector: electricLinkageCorrector.value,
            electricLinkageRetest: electricLinkageRetest.value,
            cableInterlockResult: cableInterlockResult.value,
            cableInterlockCorrector: cableInterlockCorrector.value,
            cableInterlockRetest: cableInterlockRetest.value,
            allFunctionResult: allFunctionResult.value,
            allFunctionCorrector: allFunctionCorrector.value,
            allFunctionRetest: allFunctionRetest.value,
            powerControllerResult: powerControllerResult.value,
            powerControllerCorrector: powerControllerCorrector.value,
            powerControllerRetest: powerControllerRetest.value,
            switchResult: switchResult.value,
            switchCorrector: switchCorrector.value,
            switchRetest: switchRetest.value,
            fanTemperatureResult: fanTemperatureResult.value,
            fanTemperatureCorrector: fanTemperatureCorrector.value,
            fanTemperatureRetest: fanTemperatureRetest.value,
            arresterResult: arresterResult.value,
            arresterCorrector: arresterCorrector.value,
            arresterRetest: arresterRetest.value,
            doorLandResult: doorLandResult.value,
            doorLandCorrector: doorLandCorrector.value,
            doorLandRetest: doorLandRetest.value,
            elementLandResult: elementLandResult.value,
            elementLandCorrector: elementLandCorrector.value,
            elementLandRetest: elementLandRetest.value,
            specialPointResult: specialPointResult.value,
            specialPointCorrector: specialPointCorrector.value,
            specialPointRetest: specialPointRetest.value,
            blotResult: blotResult.value,
            blotCorrector: blotCorrector.value,
            blotRetest: blotRetest.value,
            sundriesResult: sundriesResult.value,
            sundriesCorrector: sundriesCorrector.value,
            sundriesRetest: sundriesRetest.value,

            // Table 5 —— 其它不合格项表
            oneText: oneText.value,
            twoText: twoText.value,
            threeText: threeText.value,
            fourText: fourText.value,
            fiveText: fiveText.value,
            sixText: sixText.value,
            oneCorrector: oneCorrector.value,
            twoCorrector: twoCorrector.value,
            threeCorrector: threeCorrector.value,
            fourCorrector: fourCorrector.value,
            fiveCorrector: fiveCorrector.value,
            sixCorrector: sixCorrector.value,
            oneRecheck: oneRecheck.value,
            twoRecheck: twoRecheck.value,
            threeRecheck: threeRecheck.value,
            fourRecheck: fourRecheck.value,
            fiveRecheck: fiveRecheck.value,
            sixRecheck: sixRecheck.value,
        })

        if (res.isSuccess) {
            ElMessage.success({ message: "检验单提交成功", center: true })
            window.location.reload()
        } else {
            ElMessage.error({ message: "检验单提交失败", center: true })
        }

    } catch (error) {
        // 确保 error 是一个 Error 对象
        let errorMessage: string
        if (error instanceof Error) {
            errorMessage = error.message
        } else {
            // 如果 error 不是 Error 对象，但你知道它是一个字符串，可以直接使用
            errorMessage = String(error)
        }
        ElMessage.error({ message: errorMessage, center: true })
    }
}


</script>

<template>
    <div class="electric">
        <div class="tittle">
            <img src="/public/boer.png" />
            <span class="head">例行检验单-电气检验部分</span>
        </div>
        <div class="table-code">
            表码：<input type="text" v-model="tableCode" />
        </div>
        <div class="line"></div>
        <div class="all">
            <div class="top">
                <div>
                    <strong>项目名称：</strong><input type="text" v-model="projectName">
                </div>
                <div>
                    <strong>柜型：</strong><input type="text" v-model="cabinetType">
                </div>
                <div>
                    <strong>柜号：</strong><input type="text" v-model="cabinetNum">
                </div>
            </div>
            <div class="bottom">
                <div>
                    <strong>检验员：</strong>&nbsp;&nbsp;&nbsp;<input type="text" v-model="inspector">
                </div>
                <div>
                    <strong>日期：</strong><input type="date" style="width: 159px;" v-model="date">
                </div>
                <div>
                    <strong>其他：</strong><input type="text" v-model="other">
                </div>
            </div>
            <div class="table-one">
                <table>
                    <tr>
                        <td rowspan="4">测试前装备</td>
                        <td colspan="6">测试设备编号</td>
                        <td rowspan="4"></td>
                        <td colspan="4">抽查记录</td>
                    </tr>
                    <tr>
                        <td colspan="3">数字耐电压绝缘测试仪</td>
                        <td colspan="3" class="input-cell"><input class="input" type="text" v-model="testerNum">
                        </td>
                        <td colspan="3">抽屉检确认</td>
                        <td class="input-cell">
                            <select v-model="drawerConfirm" class="select">
                                <option value="-1">是否确认</option>
                                <option value="1">是</option>
                                <option value="0">否</option>
                            </select>
                        </td>
                    </tr>
                    <tr>

                        <td colspan="3">通电测试设备</td>
                        <td colspan="3" class="input-cell"><input class="input" type="text" v-model="powerOnNum">
                        </td>
                        <td colspan="3">过程检验确认</td>
                        <td class="input-cell">
                            <select v-model="processConfirm" class="select">
                                <option value="-1">是否确认</option>
                                <option value="1">是</option>
                                <option value="0">否</option>
                            </select>
                        </td>
                    </tr>
                    <tr>

                        <td colspan="3">保护回路测量设备</td>
                        <td colspan="3" class="input-cell"><input class="input" type="text" v-model="proLoopNum"></td>
                        <td colspan="3">流转单记录确认</td>
                        <td class="input-cell">
                            <select v-model="transferListConfirm" class="select">
                                <option value="-1">是否确认</option>
                                <option value="1">是</option>
                                <option value="0">否</option>
                            </select>
                        </td>
                    </tr>
                </table>
            </div>
            <div class="table-two">
                <table>
                    <tr>
                        <td colspan="5">绝缘电阻测试验证</td>
                        <td colspan="4">耐压测试</td>
                        <td colspan="3" rowspan="2">参考标准</td>
                    </tr>
                    <tr>
                        <td rowspan="2">测试回路</td>
                        <td colspan="4" class="input-cell">>1000Ω/V (<input class="input" type="number"
                                v-model="loopVdc" style="width: 30%;">) VDC</td>
                        <td colspan="4" class="input-cell">Voltage (<input class="input" type="number" v-model="voltage"
                                style="width: 30%;">) V/1s</td>
                    </tr>
                    <tr>
                        <td colspan="2"></td>
                        <td>耐压前(MΩ)</td>
                        <td>耐压后(MΩ)</td>
                        <td colspan="4">泄漏电流(mA)</td>
                        <td></td>
                        <td>额定绝缘电压Ui</td>
                        <td>介电测试电压</td>
                    </tr>
                    <tr>
                        <td rowspan="4">主回路</td>
                        <td colspan="2">L1-L2+L3+N+PE</td>
                        <td class="input-cell"><input class="input" type="number" v-model="l1Prevoltage"></td>
                        <td class="input-cell"><input class="input" type="number" v-model="l1NoPrevoltage"></td>
                        <td colspan="4" class="input-cell"><input class="input" type="number"
                                v-model="l1LeakageCurrent">
                        </td>
                        <td rowspan="3">主回路</td>
                        <td>300V < Ui ≤ 690V</td>
                        <td>1890V</td>
                    </tr>
                    <tr>
                        <td colspan="2">L2-L1+L3+N+PE</td>
                        <td class="input-cell"><input class="input" type="number" v-model="l2Prevoltage"></td>
                        <td class="input-cell"><input class="input" type="number" v-model="l2NoPrevoltage"></td>
                        <td colspan="4" class="input-cell"><input class="input" type="number"
                                v-model="l2LeakageCurrent">
                        </td>
                        <td>800V < Ui ≤ 1000V</td>
                        <td>2200V</td>
                    </tr>
                    <tr>
                        <td colspan="2">L3-L1+L2+N+PE</td>
                        <td class="input-cell"><input class="input" type="number" v-model="l3Prevoltage"></td>
                        <td class="input-cell"><input class="input" type="number" v-model="l3NoPrevoltage"></td>
                        <td colspan="4" class="input-cell"><input class="input" type="number"
                                v-model="l3LeakageCurrent">
                        </td>
                        <td>Ui ≤ 60V</td>
                        <td>1000V</td>
                    </tr>
                    <tr>
                        <td colspan="2">N-L1+L2+L3+PE</td>
                        <td class="input-cell"><input class="input" type="number" v-model="nPrevoltage"></td>
                        <td class="input-cell"><input class="input" type="number" v-model="nNoPrevoltage"></td>
                        <td colspan="4" class="input-cell"><input class="input" type="number" v-model="nLeakageCurrent">
                        </td>
                        <td rowspan="2">辅助回路</td>
                        <td rowspan="2">Ui > 60V</td>
                        <td rowspan="2">(2Ui+1000),<br>1500V min</td>
                    </tr>
                    <tr>
                        <td>辅助回路</td>
                        <td colspan="2" class="input-cell"><input class="input" type="text" v-model="formula"></td>
                        <td class="input-cell"><input class="input" type="number" v-model="assistPrevoltage"></td>
                        <td class="input-cell"><input class="input" type="number" v-model="assistNoPrevoltage"></td>
                        <td colspan="4" class="input-cell"><input class="input" type="number"
                                v-model="assistLeakageCurrent"></td>
                    </tr>
                    <tr class="td_hide">
                        <td></td>
                        <td></td>
                        <td></td>
                        <td colspan="9"></td>
                    </tr>
                </table>
            </div>
            <div class="table-three">
                <table>
                    <tr>
                        <td colspan="3" rowspan="2">检验项</td>
                        <td colspan="2" rowspan="2">检验标准</td>
                        <td colspan="5">检查结果</td>
                        <td rowspan="2">复检人</td>
                        <td rowspan="2">复检结果</td>
                    </tr>
                    <tr>
                        <td>合格</td>
                        <td colspan="4">不合格项</td>
                    </tr>
                    <tr>
                        <td rowspan="10">通电操作试验</td>
                        <td colspan="2">电源取样线位置</td>
                        <td colspan="2">符合图纸要求</td>
                        <td class="input-cell">
                            <select v-model="locationResult" class="select">
                                <option value="-1">是否合格</option>
                                <option value="1">✔</option>
                                <option value="0">✖</option>
                            </select>
                        </td>
                        <td>位置取错</td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td class="input-cell"><input class="input" type="text" v-model="locationCorrector"></td>
                        <td class="input-cell"><input class="input" type="text" v-model="locationRetest"></td>
                    </tr>
                    <tr>
                        <td colspan="2">检查一次回路相序</td>
                        <td colspan="2">符合图纸要求</td>
                        <td class="input-cell">
                            <select v-model="phaseSequenceResult" class="select">
                                <option value="-1">是否合格</option>
                                <option value="1">✔</option>
                                <option value="0">✖</option>
                            </select>
                        </td>
                        <td>相序错位</td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td class="input-cell"><input class="input" type="text" v-model="phaseSequenceCorrector"></td>
                        <td class="input-cell"><input class="input" type="text" v-model="phaseSequenceRetest"></td>
                    </tr>
                    <tr>
                        <td colspan="2">二次元件完整性</td>
                        <td colspan="2">符合图纸要求</td>
                        <td class="input-cell">
                            <select v-model="secondaryElementResult" class="select">
                                <option value="-1">是否合格</option>
                                <option value="1">✔</option>
                                <option value="0">✖</option>
                            </select>
                        </td>
                        <td>与图纸不符</td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td class="input-cell"><input class="input" type="text" v-model="secondaryElementCorrector">
                        </td>
                        <td class="input-cell"><input class="input" type="text" v-model="secondaryElementRetest"></td>
                    </tr>
                    <tr>
                        <td colspan="2">电器指示灯</td>
                        <td colspan="2">符合图纸要求</td>
                        <td class="input-cell">
                            <select v-model="lightResult" class="select">
                                <option value="-1">是否合格</option>
                                <option value="1">✔</option>
                                <option value="0">✖</option>
                            </select>
                        </td>
                        <td>不亮</td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td class="input-cell"><input class="input" type="text" v-model="lightCorrector"></td>
                        <td class="input-cell"><input class="input" type="text" v-model="lightRetest"></td>
                    </tr>
                    <tr>
                        <td colspan="2">各类表计显示</td>
                        <td colspan="2">符合图纸要求</td>
                        <td class="input-cell">
                            <select v-model="meterShowResult" class="select">
                                <option value="-1">是否合格</option>
                                <option value="1">✔</option>
                                <option value="0">✖</option>
                            </select>
                        </td>
                        <td>不显示</td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td class="input-cell"><input class="input" type="text" v-model="meterShowCorrector"></td>
                        <td class="input-cell"><input class="input" type="text" v-model="meterShowRetest"></td>
                    </tr>
                    <tr>
                        <td colspan="2">表计参数设置</td>
                        <td colspan="2">符合图纸要求</td>
                        <td class="input-cell">
                            <select v-model="meterParamResult" class="select">
                                <option value="-1">是否合格</option>
                                <option value="1">✔</option>
                                <option value="0">✖</option>
                            </select>
                        </td>
                        <td>与图纸不符</td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td class="input-cell"><input class="input" type="text" v-model="meterParamCorrector"></td>
                        <td class="input-cell"><input class="input" type="text" v-model="meterParamRetest"></td>
                    </tr>
                    <tr>
                        <td colspan="2">外引信号</td>
                        <td colspan="2">符合图纸要求</td>
                        <td class="input-cell">
                            <select v-model="signalResult" class="select">
                                <option value="-1">是否合格</option>
                                <option value="1">✔</option>
                                <option value="0">✖</option>
                            </select>
                        </td>
                        <td>未供</td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td class="input-cell"><input class="input" type="text" v-model="signalCorrector"></td>
                        <td class="input-cell"><input class="input" type="text" v-model="signalRetest"></td>
                    </tr>
                    <tr>
                        <td colspan="2">联调-电气连锁</td>
                        <td colspan="2">符合图纸要求</td>
                        <td class="input-cell">
                            <select v-model="electricLinkageResult" class="select">
                                <option value="-1">是否合格</option>
                                <option value="1">✔</option>
                                <option value="0">✖</option>
                            </select>
                        </td>
                        <td>与图纸不符</td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td class="input-cell"><input class="input" type="text" v-model="electricLinkageCorrector"></td>
                        <td class="input-cell"><input class="input" type="text" v-model="electricLinkageRetest"></td>
                    </tr>
                    <tr>
                        <td colspan="2">缆绳联锁</td>
                        <td colspan="2">符合图纸要求</td>
                        <td class="input-cell">
                            <select v-model="cableInterlockResult" class="select">
                                <option value="-1">是否合格</option>
                                <option value="1">✔</option>
                                <option value="0">✖</option>
                            </select>
                        </td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td class="input-cell"><input class="input" type="text" v-model="cableInterlockCorrector"></td>
                        <td class="input-cell"><input class="input" type="text" v-model="cableInterlockRetest"></td>
                    </tr>
                    <tr>
                        <td colspan="2">各功能测试</td>
                        <td colspan="2">符合图纸要求</td>
                        <td class="input-cell">
                            <select v-model="allFunctionResult" class="select">
                                <option value="-1">是否合格</option>
                                <option value="1">✔</option>
                                <option value="0">✖</option>
                            </select>
                        </td>
                        <td>未在图纸中标注</td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td class="input-cell"><input class="input" type="text" v-model="allFunctionCorrector"></td>
                        <td class="input-cell"><input class="input" type="text" v-model="allFunctionRetest"></td>
                    </tr>
                    <tr>
                        <td colspan="12"></td>
                    </tr>
                    <tr>
                        <td rowspan="4">CAP</td>
                        <td colspan="2">功率因数控制器参数设置</td>
                        <td colspan="2">符合图纸要求</td>
                        <td class="input-cell">
                            <select v-model="powerControllerResult" class="select">
                                <option value="-1">是否合格</option>
                                <option value="1">✔</option>
                                <option value="0">✖</option>
                            </select>
                        </td>
                        <td>与图纸不符</td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td class="input-cell"><input class="input" type="text" v-model="powerControllerCorrector"></td>
                        <td class="input-cell"><input class="input" type="text" v-model="powerControllerRetest"></td>
                    </tr>
                    <tr>
                        <td colspan="2">手动/自动投切</td>
                        <td colspan="2">符合图纸要求</td>
                        <td class="input-cell">
                            <select v-model="switchResult" class="select">
                                <option value="-1">是否合格</option>
                                <option value="1">✔</option>
                                <option value="0">✖</option>
                            </select>
                        </td>
                        <td>误切</td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td class="input-cell"><input class="input" type="text" v-model="switchCorrector"></td>
                        <td class="input-cell"><input class="input" type="text" v-model="switchRetest"></td>
                    </tr>
                    <tr>
                        <td colspan="2">风扇/温度传感器</td>
                        <td colspan="2">符合图纸要求</td>
                        <td class="input-cell">
                            <select v-model="fanTemperatureResult" class="select">
                                <option value="-1">是否合格</option>
                                <option value="1">✔</option>
                                <option value="0">✖</option>
                            </select>
                        </td>
                        <td>不转</td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td class="input-cell"><input class="input" type="text" v-model="fanTemperatureCorrector"></td>
                        <td class="input-cell"><input class="input" type="text" v-model="fanTemperatureRetest"></td>
                    </tr>
                    <tr>
                        <td colspan="2">避雷器</td>
                        <td colspan="2">符合图纸要求</td>
                        <td class="input-cell">
                            <select v-model="arresterResult" class="select">
                                <option value="-1">是否合格</option>
                                <option value="1">✔</option>
                                <option value="0">✖</option>
                            </select>
                        </td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td class="input-cell"><input class="input" type="text" v-model="arresterCorrector"></td>
                        <td class="input-cell"><input class="input" type="text" v-model="arresterRetest"></td>
                    </tr>
                    <tr>
                        <td colspan="12"></td>
                    </tr>
                    <tr>
                        <td rowspan="2">接地连续性 < 0.1Ω</td>
                        <td colspan="2">各门板接地点</td>
                        <td colspan="2">符合标准要求</td>
                        <td class="input-cell">
                            <select v-model="doorLandResult" class="select">
                                <option value="-1">是否合格</option>
                                <option value="1">✔</option>
                                <option value="0">✖</option>
                            </select>
                        </td>
                        <td>抽检不达标</td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td class="input-cell"><input class="input" type="text" v-model="doorLandCorrector"></td>
                        <td class="input-cell"><input class="input" type="text" v-model="doorLandRetest"></td>
                    </tr>
                    <tr>
                        <td colspan="2">主要元件接地点</td>
                        <td colspan="2">符合标准要求</td>
                        <td class="input-cell">
                            <select v-model="elementLandResult" class="select">
                                <option value="-1">是否合格</option>
                                <option value="1">✔</option>
                                <option value="0">✖</option>
                            </select>
                        </td>
                        <td>抽检不达标</td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td class="input-cell"><input class="input" type="text" v-model="elementLandCorrector"></td>
                        <td class="input-cell"><input class="input" type="text" v-model="elementLandRetest"></td>
                    </tr>
                </table>
                <table>
                    <tr>
                        <td>开工单</td>
                        <td colspan="2">特殊注意点</td>
                        <td colspan="2">符合要求</td>
                        <td class="input-cell">
                            <select v-model="specialPointResult" class="select">
                                <option value="-1">是否合格</option>
                                <option value="1">✔</option>
                                <option value="0">✖</option>
                            </select>
                        </td>
                        <td>不符合</td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td class="input-cell"><input class="input" type="text" v-model="specialPointCorrector"></td>
                        <td class="input-cell"><input class="input" type="text" v-model="specialPointRetest"></td>
                    </tr>
                </table>
                <table>
                    <tr>
                        <td rowspan="2">清理</td>
                        <td colspan="2">柜表污渍</td>
                        <td colspan="2">目视</td>
                        <td class="input-cell">
                            <select v-model="blotResult" class="select">
                                <option value="-1">是否合格</option>
                                <option value="1">✔</option>
                                <option value="0">✖</option>
                            </select>
                        </td>
                        <td>无磕碰划痕</td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td class="input-cell"><input class="input" type="text" v-model="blotCorrector"></td>
                        <td class="input-cell"><input class="input" type="text" v-model="blotRetest"></td>
                    </tr>
                    <tr>
                        <td colspan="2">柜内杂物</td>
                        <td colspan="2">目视</td>
                        <td class="input-cell">
                            <select v-model="sundriesResult" class="select">
                                <option value="-1">是否合格</option>
                                <option value="1">✔</option>
                                <option value="0">✖</option>
                            </select>
                        </td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td class="input-cell"><input class="input" type="text" v-model="sundriesCorrector"></td>
                        <td class="input-cell"><input class="input" type="text" v-model="sundriesRetest"></td>
                    </tr>
                </table>
            </div>
            <div class="table-four">
                <table>
                    <tr>
                        <td colspan="10">其它不合格项</td>
                        <td>整改人</td>
                        <td>复检</td>
                    </tr>
                    <tr>
                        <td>1</td>
                        <td colspan="9" class="input-cell"><input class="input" type="text" v-model="oneText"></td>
                        <td class="input-cell"><input class="input" type="text" v-model="oneCorrector"></td>
                        <td class="input-cell"><input class="input" type="text" v-model="oneRecheck"></td>
                    </tr>
                    <tr>
                        <td>2</td>
                        <td colspan="9" class="input-cell"><input class="input" type="text" v-model="twoText"></td>
                        <td class="input-cell"><input class="input" type="text" v-model="twoCorrector"></td>
                        <td class="input-cell"><input class="input" type="text" v-model="twoRecheck"></td>
                    </tr>
                    <tr>
                        <td>3</td>
                        <td colspan="9" class="input-cell"><input class="input" type="text" v-model="threeText"></td>
                        <td class="input-cell"><input class="input" type="text" v-model="threeCorrector"></td>
                        <td class="input-cell"><input class="input" type="text" v-model="threeRecheck"></td>
                    </tr>
                    <tr>
                        <td>4</td>
                        <td colspan="9" class="input-cell"><input class="input" type="text" v-model="fourText"></td>
                        <td class="input-cell"><input class="input" type="text" v-model="fourCorrector"></td>
                        <td class="input-cell"><input class="input" type="text" v-model="fourRecheck"></td>
                    </tr>
                    <tr>
                        <td>5</td>
                        <td colspan="9" class="input-cell"><input class="input" type="text" v-model="fiveText"></td>
                        <td class="input-cell"><input class="input" type="text" v-model="fiveCorrector"></td>
                        <td class="input-cell"><input class="input" type="text" v-model="fiveRecheck"></td>
                    </tr>
                    <tr>
                        <td>6</td>
                        <td colspan="9" class="input-cell"><input class="input" type="text" v-model="sixText"></td>
                        <td class="input-cell"><input class="input" type="text" v-model="sixCorrector"></td>
                        <td class="input-cell"><input class="input" type="text" v-model="sixRecheck"></td>
                    </tr>
                </table>
            </div>
            <div class="remark">
                备注：<textarea name="remark" rows="1" v-model="remark"></textarea>
            </div>

        </div>
        <button type="submit" class="submit-login" @click="handleSubmit">
            提交
        </button>
    </div>
</template>



<style lang="scss" scoped>
.electric {
    // margin-top: -300px;
    margin-left: 140px;

    .tittle {
        display: flex;
        justify-content: center;
        align-items: center;
        margin-bottom: 30px;

        img {
            width: 150px;
            height: 23px;
            margin-right: 50px;
        }

        .head {
            height: 30px;
            line-height: 30px;
            font-weight: 600;
            font-family: "宋体";
        }
    }

    .table-code {
        margin-left: 600px;
        margin-bottom: -1px;

        input {
            font-size: 14px;
            color: #359EFF;
            font-weight: 500;
            font-family: "PingFang SC";
            background-color: rgba(255, 255, 255, .6);
            border: 1px solid black;
            border-radius: 2px;
        }

        input:focus {
            border-color: red;
            outline: none;
            /* 可选：去除默认的轮廓线 */
        }

    }

    .line {
        position: relative;
        width: 1050px;
        height: 0px;
        border: 1.5px solid black;
        margin-bottom: 20px;
    }

    .all {
        width: 1000px;
        margin-left: 25px;

        /* 或者任何你需要的宽度 */
        .top,
        .bottom {
            display: flex;
            /* 启用Flexbox布局 */
            flex-wrap: wrap;
            /* 允许换行 */
            justify-content: space-between;
            /* 项目在主轴方向上平均分布 */
            align-items: flex-start;
            /* 项目在交叉轴方向上对齐到起始位置 */
            margin-left: 40px;
        }

        .bottom {
            margin-bottom: 10px;
        }

        .top>div,
        .bottom>div {
            flex-basis: calc(33.333% - 10px);
            /* 每个项目占据三分之一的容器宽度，减去间距 */
            margin: 5px;
            /* 每个项目之间的间距 */
            /* 以下属性确保即使文本长度不同也能垂直对齐 */
            display: flex;
            align-items: center;
        }

        /* 为input元素设置样式，以适应Flexbox布局 */
        .top input,
        .bottom input {
            color: #359EFF;
            font-size: 14px;
            font-weight: 500;
            margin-left: 5px;
            /* input与标签之间的间距 */
            font-family: "PingFang SC";
            background-color: rgba(255, 255, 255, .6);
            border: none;
            border-bottom: 2px solid black;

        }

        input:focus {
            border-color: red;
            outline: none;
            /* 可选：去除默认的轮廓线 */
        }

        .table-one,
        .table-two,
        .table-three,
        .table-four {
            margin-bottom: 15px;

            table {

                margin-bottom: 15px;
                width: 100%;
                /* 表格宽度为100% */
                border-collapse: collapse;
                /* 边框合并，使表格看起来更紧凑 */
            }

            td {
                box-sizing: border-box;
                height: 30px;
                font-size: 12px;
                width: 83.25px;
                max-width: 83.25px;
                border: 1px solid black;
                /* 单元格边框为1像素黑色实线 */
                padding: 4px;
                /* 单元格内边距 */
                text-align: center;
                /* 文本在单元格内左对齐 */
            }

            .td_hide td {
                border: none;
            }
        }

        .table-three {
            margin-top: -30px;
        }

        .remark {

            display: flex;
            /* 启用Flexbox布局 */
            align-items: center;
            /* 垂直居中子元素 */
            justify-content: flex-start;
            /* 水平居中子元素 */
            height: 100px;
            /* 给div设置一个高度，以便可以居中显示 */
            margin-left: -3px;
            font-size: 14px;


            textarea {
                box-sizing: border-box;
                font-size: 14px;
                font-family: "PingFang SC";
                font-weight: 500;
                color: #359EFF;
                border: none;
                border-bottom: 2px solid black;
                width: 955px;
                height: 22px;
                resize: none;
                overflow: hidden;
            }

            textarea:focus {
                border-color: red;
                outline: none;
                /* 可选：去除默认的轮廓线 */
            }
        }


        .input {
            font-size: 14px;
            font-family: "PingFang SC";
            font-weight: 500;
            color: #359EFF;
            width: 100%;
            /* 填满父元素的宽度 */
            box-sizing: border-box;
            /* 边框和内边距包含在元素尺寸内 */
            padding: 0;
            /* 移除内边距 */
            border: none;
            /* 移除边框 */
            outline: none;
            /* 可选：移除聚焦时的轮廓 */
            resize: none;
            /* 禁止调整大小 */
        }

        /* 输入框聚焦时，父元素的边框颜色变为红色 */
        .input-cell:focus-within {
            border: 2px solid red;
        }

        .select {
            border: none;
            outline: none;
            box-shadow: none;
            text-align: center;

        }

    }

    .submit-login {
        width: 311px;
        height: 43px;
        margin-left: 7px;
        padding: 11px 0 11px 0;
        border-radius: 4px;
        border: solid 1px #3083ff;
        background-color: #3083ff;
        box-shadow: 0 5px 8px 0 #185fff;
        font-size: 14px;
        font-weight: 100;
        color: #ffffff;
        text-align: center;
        line-height: 1.5;
        cursor: pointer;
    }

    button:focus {
        outline: none;
        /* 移除焦点时的默认黑色边框 */
    }



}
</style>