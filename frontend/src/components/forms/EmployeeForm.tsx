import { Col, Form, Input, Row, Select } from "antd";
import { useForm } from "antd/es/form/Form";
import React, { useEffect, useMemo, useState } from "react";
import { TEmployee } from "../../types/employeeTypes";
import { getProvinceDatas } from "../../services/mstDataServices";
import { District, Province, SubDistrict } from "../../types/mstTypes";

type Props = {};

const EmployeeForm = (props: Props) => {
  const [form] = useForm<TEmployee>();
  const [mstProvinceData, setMstProvinceData] = useState<Province[]>([]);
  const [districts, setDistricts] = useState<District[]>([]);
  const [subdistricts, setSubdistricts] = useState<SubDistrict[]>([]);

  useEffect(() => {
    let controller = new AbortController();

    const getProvince = async () => {
      try {
        const res = await getProvinceDatas(controller.signal);
        setMstProvinceData(res);
      } catch (error) {
        console.error(error);
      }
    };

    getProvince();

    return () => {
      controller.abort();
    };
  }, []);

  const onFormValueChange = (changeValue: any, allValues: TEmployee) => {
    setDistricts(
      mstProvinceData.find((e) => e.name === allValues["province"])
        ?.districts ?? []
    );
    setSubdistricts(
      districts.find((e) => e.name === allValues["district"])?.subdistricts ??
        []
    );
  };

  return (
    <Form
      form={form}
      labelCol={{ span: 4 }}
      labelAlign="left"
      onValuesChange={onFormValueChange}
    >
      <Form.Item name="name" label="ชื่อ">
        <Input placeholder="ชื่อ" />
      </Form.Item>
      <Form.Item name="surname" label="นามสกุล">
        <Input placeholder="นามสกุล" />
      </Form.Item>
      <Form.Item name="province" label="จังหวัด">
        <Select
          placeholder="จังหวัด"
          options={mstProvinceData.map((e) => {
            return { label: e.name, value: e.name };
          })}
        />
      </Form.Item>
      <Form.Item name="district" label="อำเภอ">
        <Select
          placeholder="อำเภอ"
          options={districts.map((e) => {
            return { label: e.name, value: e.name };
          })}
        />
      </Form.Item>
      <Form.Item name="subdistrict" label="ตำบล">
        <Select
          placeholder="ตำบล"
          options={subdistricts.map((e) => {
            return { label: e.name, value: e.name };
          })}
        />
      </Form.Item>
    </Form>
  );
};

export default EmployeeForm;
