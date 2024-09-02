import type { FC } from "react";
import "./Content.scss";
import React, { useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import {
  AutoComplete,
  Button,
  Cascader,
  Checkbox,
  ColorPicker,
  DatePicker,
  Form,
  FormProps,
  Input,
  InputNumber,
  message,
  notification,
  Radio,
  Select,
  Slider,
  Space,
  Switch,
  TimePicker,
  TreeSelect,
  Upload,
} from "antd";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { useForm } from "antd/es/form/Form";

dayjs.extend(customParseFormat);

interface ContentProps {}

type FieldType = {
  notification: string;
  interval: number;
  time: any;
  day: number;
  email: string;
  count: number;
};

const Content: FC<ContentProps> = () => {
  const { TextArea } = Input;

  const [form] = useForm();

  const options = [
    { id: 1, value: "Go to grossery" },
    { id: 2, value: "Office meeting" },
    { id: 3, value: "Car washing" },
    { id: 4, value: "Pills" },
    { id: 5, value: "Call with John" },
    { id: 6, value: "dantist" },
    { id: 7, value: "call larry" },
    { id: 8, value: "Shoes cleaning" },
  ];

  const onFinish: FormProps<FieldType>["onFinish"] = (values) => {
    const data = {
      id: options.find((item) => item.value === values.notification)?.id,
      notification: values.notification,
      interval: values.interval,
      time: dayjs(values.time).format("HH:mm"),
      day: values.day,
      email: values.email,
      count: values.count,
    };

    try {
      fetch("https://notification-backend-gamma.vercel.app/schedule-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
        .then((response) => response.json())
        .then((data) => {
          message.success("Notification sent!");
        })
        .catch((error) => console.error("Error:", error));
    } catch (err) {
      throw new Error("Error on sending!");
    }
  };

  return (
    <div className={"content"}>
      <h1>Manage Bid Notifications</h1>
      <h3>Configure your email notifiacation settings for relevant business bids.</h3>
      <Form form={form} labelCol={{ span: 10 }} wrapperCol={{ span: 14 }} layout="horizontal" style={{ maxWidth: 500 }} onFinish={onFinish}>
        <Form.Item label="Input" name="notification" rules={[{ required: true, message: "Please input your notification!" }]}>
          <AutoComplete
            style={{ width: 200 }}
            options={options}
            placeholder="Start typing your notification"
            filterOption={(inputValue, option) => option!.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1}
          />
        </Form.Item>
        <Form.Item label="Notification interval" name="interval" rules={[{ required: true, message: "Please input your interval!" }]}>
          <Select>
            <Select.Option value="15">15 min</Select.Option>
            <Select.Option value="30">30 min</Select.Option>
            <Select.Option value="45">45 min</Select.Option>
            <Select.Option value="60">60 min</Select.Option>
            <Select.Option value="90">90 min</Select.Option>
            <Select.Option value="120">120 min</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item label="Notification Time" name="time" rules={[{ required: true, message: "Please select your time!" }]}>
          <TimePicker defaultOpenValue={dayjs("00:00", "HH:mm")} format={"HH:mm"} />
        </Form.Item>
        <Form.Item label="Weekly Notification Day" name="day" rules={[{ required: true, message: "Please select day!" }]}>
          <Select>
            <Select.Option value="0">Sunday</Select.Option>
            <Select.Option value="1">Monday</Select.Option>
            <Select.Option value="2">Tuesday</Select.Option>
            <Select.Option value="3">Wednesday</Select.Option>
            <Select.Option value="4">Thursday</Select.Option>
            <Select.Option value="5">Friday</Select.Option>
            <Select.Option value="6">Saturday</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item label="Notification Count" name="count" rules={[{ required: true, message: "Please select count!" }]}>
          <Select>
            <Select.Option value="1">1 time</Select.Option>
            <Select.Option value="2">2 times</Select.Option>
            <Select.Option value="3">3 times</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item label="Email" name="email" rules={[{ required: true, type: "email", message: "Please input your email!" }]}>
          <Input type="email" placeholder="Enter your email" />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 10, span: 16 }}>
          <Space>
            <Button
              htmlType="button"
              onClick={() => {
                form.resetFields();
              }}
            >
              Cancel
            </Button>
            <Button type="primary" htmlType="submit">
              Create
            </Button>
          </Space>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Content;
