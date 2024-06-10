import {
  Button,
  DatePicker,
  Modal,
  Space,
  Table,
  TableProps,
  Typography,
} from "antd";
import { getEmployees } from "../services/employeeServices";
import { useEffect, useState } from "react";
import { TEmployee } from "../types/employeeTypes";
import { SearchOutlined } from "@ant-design/icons";
import { FilterDropdownProps } from "antd/es/table/interface";
import dayjs from "dayjs";
import { checkExpireDate } from "../helper/dateHelper";
import EmployeeForm from "../components/forms/EmployeeForm";
const { RangePicker } = DatePicker;
const { Text } = Typography;
type Props = {};

const Home = (props: Props) => {
  const [empData, setEmpData] = useState([]);
  const [modal, contextHolder] = Modal.useModal();

  useEffect(() => {
    fetch();
  }, []);

  const handleReset = (clearFilters: () => void) => {
    clearFilters();
  };

  const columns: TableProps<TEmployee>["columns"] = [
    {
      title: "ชื่อ",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "นามสกุล",
      dataIndex: "surname",
      key: "surname",
    },
    {
      title: "เพศ",
      dataIndex: "gender",
      key: "gender",
    },
    {
      title: "วันเกิด",
      dataIndex: "dateofbirth",
      key: "dateofbirth",
      filterDropdown({
        setSelectedKeys,
        confirm,
        clearFilters,
        close,
      }: FilterDropdownProps) {
        return (
          <div
            style={{
              padding: 8,
              display: "flex",
              flexDirection: "column",
              gap: 10,
            }}
            onKeyDown={(e) => e.stopPropagation()}
          >
            <RangePicker
              onChange={(e, dateString) => {
                if (!Array.isArray(dateString)) {
                  setSelectedKeys(dateString ? [dateString] : []);
                }
              }}
              format={"YYYY-MM-DD"}
              presets={[
                {
                  label: "Today",
                  value: [dayjs(), dayjs()],
                },
                {
                  label: "This month",
                  value: [dayjs().startOf("month"), dayjs().endOf("month")],
                },
              ]}
            />
            <Space>
              <Button
                type="primary"
                onClick={() => {
                  confirm();
                }}
                icon={<SearchOutlined />}
                size="small"
                style={{ width: 90 }}
              >
                Search
              </Button>
              <Button
                onClick={() => clearFilters && handleReset(clearFilters)}
                size="small"
                style={{ width: 90 }}
              >
                Reset
              </Button>
              <Button
                type="link"
                size="small"
                onClick={() => {
                  close();
                }}
              >
                close
              </Button>
            </Space>
          </div>
        );
      },
      onFilter: (value, record) => {
        return record["dateofbirth"]
          .toString()
          .toLowerCase()
          .includes((value as string).toLowerCase());
      },
      filterIcon: (filtered: boolean) => (
        <SearchOutlined style={{ color: filtered ? "#1677ff" : undefined }} />
      ),
    },
    {
      title: "จังหวัด",
      dataIndex: "province",
      key: "province",
    },
    {
      title: "อำเภอ",
      dataIndex: "district",
      key: "district",
    },
    {
      title: "ตำบล",
      dataIndex: "subdistrict",
      key: "subdistrict",
    },
    {
      title: "ที่อยู่",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "วันที่บัตรหมดอายุ",
      dataIndex: "dateofexpairy",
      key: "dateofexpairy",
      render: (_) => {
        return <Text type={checkExpireDate(_)}>{_}</Text>;
      },
    },
  ];
  const fetch = async () => {
    const emps = await getEmployees();
    setEmpData(emps);
  };

  const onEditDataClick = (action: string) => {
    modal.confirm({
      title: action,
      icon: <></>,
      width: "40%",
      type: "confirm",
      content: <EmployeeForm />,
    });
  };

  return (
    <>
      {contextHolder}
      <div style={{ padding: 10, display: "flex", flexDirection: "column" }}>
        <div style={{ padding: 10, display: "flex", justifyContent: "end" }}>
          <Button
            onClick={() => {
              onEditDataClick("Add");
            }}
          >
            เพิ่มพนักงาน
          </Button>
        </div>
        <Table dataSource={empData} columns={columns} />
      </div>
    </>
  );
};

export default Home;
