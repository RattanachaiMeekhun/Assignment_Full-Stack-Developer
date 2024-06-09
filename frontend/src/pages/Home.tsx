import { Button, Card, DatePicker, Space, Table, TableProps } from "antd";
import { getEmployees } from "../services/employeeServices";
import { useEffect, useState } from "react";
import { TEmployee } from "../types/employeeTypes";
import { SearchOutlined } from "@ant-design/icons";
import { FilterDropdownProps } from "antd/es/table/interface";
import dayjs from "dayjs";

type Props = {};

type DataIndex = keyof TEmployee;

const Home = (props: Props) => {
  const [empData, setEmpData] = useState([]);
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
            <DatePicker
              onChange={(e, dateString) => {
                if (!Array.isArray(dateString)) {
                  setSelectedKeys(dateString ? [dateString] : []);
                }
              }}
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
  ];
  const fetch = async () => {
    const emps = await getEmployees();
    setEmpData(emps);
  };
  return (
    <div>
      <Table dataSource={empData} columns={columns} />
    </div>
  );
};

export default Home;
