import React, { Component } from 'react';

/** 输入框 **/
import Input from './lib/Input.js';
/**
 * 文本区域输入
 */
import TextArea from './lib/TextArea.js';
/**
 * 数字输入
 */
import InputNumber from './lib/InputNumber.js';
/**
 * 文本区域输入
 */
import Select from './lib/Select.js';
/**
 * 区域选择
 */
import AreaSelect from './lib/areaSelect/index.js';
/**
 * 文件选择
 */
import upFile from './lib/file/upFile/index.js';


module.exports = {
    getViewArr() {
        return [
            {
                type: ["input","Input"],
                component: Input
            },
            {
                type: "TextArea",
                component: TextArea
            },
            {
                type: ["InputNumber","inputNumber","inputnumber"],
                component: InputNumber
            },
            {
                type: ["select","Select"],
                component: Select
            },
            {
                type: ["area","areaselect","AreaSelect"],
                component: AreaSelect
            },
            {
                type: ["file","File"],
                component: upFile
            },

        ]
    }
};
