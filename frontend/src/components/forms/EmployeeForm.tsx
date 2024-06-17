import { DatePicker, Form, Input, Select } from "antd";
import { FormInstance, useForm } from "antd/es/form/Form";
import { useEffect, useState } from "react";
import { TEmployee } from "../../types/employeeTypes";
import { getProvinceDatas } from "../../services/mstDataServices";
import { District, Province, SubDistrict } from "../../types/mstTypes";
import TextArea from "antd/es/input/TextArea";
type Props = {
  form: FormInstance<TEmployee>;
};
const EmployeeForm = ({ form }: Props) => {
  const [mstProvinceData, setMstProvinceData] = useState<Province[]>([]);
  const [districts, setDistricts] = useState<District[]>([]);
  const [subdistricts, setSubdistricts] = useState<SubDistrict[]>([]);

  useEffect(() => {
    let controller = new AbortController();

    const getProvince = async () => {
      try {
        const formValues = form.getFieldsValue();
        const res = await getProvinceDatas(controller.signal);

        if (formValues?.province) {
          const selectedDistricts =
            res.find((e) => e.name === formValues["province"])?.districts ?? [];
          setDistricts(selectedDistricts);
          setSubdistricts(
            selectedDistricts.find((e) => e.name === formValues["district"])
              ?.subdistricts ?? []
          );
        }

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

  const onFormValueChange = (changeValue: TEmployee, allValues: TEmployee) => {
    if (changeValue?.province) {
      const newDistricts =
        mstProvinceData.find((e) => e.name === allValues["province"])
          ?.districts ?? [];

      form.setFieldsValue({ district: undefined, subdistrict: undefined });

      setDistricts(newDistricts);
    }
    if (changeValue?.district) {
      const newSubDistricts =
        districts.find((e) => e.name === allValues["district"])?.subdistricts ??
        [];
      form.setFieldsValue({ subdistrict: undefined });
      setSubdistricts(newSubDistricts);
    }
  };

  return (
    <Form
      form={form}
      labelCol={{ span: 6 }}
      labelAlign="left"
      onValuesChange={onFormValueChange}
    >
      <Form.Item name="id" hidden />
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
          showSearch
        />
      </Form.Item>
      <Form.Item name="district" label="อำเภอ">
        <Select
          placeholder="อำเภอ"
          options={districts.map((e) => {
            return { label: e.name, value: e.name };
          })}
          showSearch
        />
      </Form.Item>
      <Form.Item name="subdistrict" label="ตำบล">
        <Select
          placeholder="ตำบล"
          options={subdistricts.map((e) => {
            return { label: e.name, value: e.name };
          })}
          showSearch
        />
      </Form.Item>
      <Form.Item name="address" label="ที่อยู่">
        <TextArea placeholder={"ที่อยู่"} rows={4} />
      </Form.Item>
      <Form.Item name="dateofbirth" label="วันเกิด">
        <DatePicker placeholder={"วันเกิด"} format={"DD-MM-YYYY"} />
      </Form.Item>
      <Form.Item name="dateofexpairy" label="วันที่บัตรหมดอายุ">
        <DatePicker placeholder={"วันที่บัตรหมดอายุ"} format={"DD-MM-YYYY"} />
      </Form.Item>
    </Form>
  );
};

export default EmployeeForm;
