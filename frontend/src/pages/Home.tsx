import {
  Button,
  DatePicker,
  Modal,
  Space,
  Table,
  TableColumnType,
  TableProps,
  Typography,
  notification,
} from "antd";
import {
  createEmployee,
  delEmployee,
  exportFile,
  getEmployees,
  updateEmployee,
} from "../services/employeeServices";
import { useEffect, useState } from "react";
import { TEmployee } from "../types/employeeTypes";
import {
  DeleteOutlined,
  EditOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { FilterDropdownProps } from "antd/es/table/interface";
import dayjs from "dayjs";
import { checkExpireDate } from "../helper/dateHelper";
import EmployeeForm from "../components/forms/EmployeeForm";
import { useForm } from "antd/es/form/Form";
const { RangePicker } = DatePicker;
const { Text } = Typography;

type NotificationType = "success" | "info" | "warning" | "error";

type DataIndex = keyof TEmployee;
const Home = () => {
  const [empData, setEmpData] = useState([]);
  const [modal, modalcontextHolder] = Modal.useModal();
  const [form] = useForm<TEmployee>();
  const [notifi, notifiContextHolder] = notification.useNotification();
  const [filterValues, setFilterValues] = useState<any>({});

  useEffect(() => {
    fetch();
  }, []);

  const handleReset = (clearFilters: () => void) => {
    clearFilters();
  };

  const handleSearch = (
    selectedKeys: any,
    confirm: FilterDropdownProps["confirm"],
    dataIndex: DataIndex
  ) => {
    let values: any = filterValues;
    values[dataIndex] = selectedKeys;
    setFilterValues(values);
    confirm();
  };

  const getColumnSearchProps = (
    dataIndex: DataIndex
  ): TableColumnType<TEmployee> => ({
    filterDropdown({
      setSelectedKeys,
      confirm,
      clearFilters,
      close,
      selectedKeys,
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
              setSelectedKeys(dateString);
            }}
            format={"DD-MM-YYYY"}
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
              onClick={() =>
                handleSearch(selectedKeys as string[], confirm, dataIndex)
              }
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
  });

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
      render: (dateofbirth) => {
        return <>{dayjs(dateofbirth).format("DD-MM-YYYY")}</>;
      },
      ...getColumnSearchProps("dateofbirth"),
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
      sorter: (a, b) =>
        dayjs(a.dateofexpairy).diff(dayjs()) -
        dayjs(b.dateofexpairy).diff(dayjs()),
      render: (dateofexpairy) => {
        return (
          <Text type={checkExpireDate(dateofexpairy)}>
            {dayjs(dateofexpairy).format("DD-MM-YYYY")}
          </Text>
        );
      },
      ...getColumnSearchProps("dateofexpairy"),
    },
    {
      title: "",
      dataIndex: "",
      key: "actions",
      render: (_, rowData) => {
        return (
          <div style={{ display: "flex", gap: 10 }}>
            <Button
              icon={<EditOutlined />}
              onClick={() => onEditDataClick("Edit", rowData)}
            />
            <Button
              icon={
                <DeleteOutlined onClick={() => onDeleteDataClick(rowData.id)} />
              }
            />
          </div>
        );
      },
    },
  ];
  const fetch = async () => {
    const emps = await getEmployees();
    setEmpData(emps);
  };

  const onEditDataClick = (action: "Edit" | "Add", rowData?: TEmployee) => {
    form.resetFields();

    if (rowData) {
      rowData.dateofbirth = dayjs(rowData.dateofbirth);
      rowData.dateofexpairy = dayjs(rowData.dateofexpairy);

      form.setFieldsValue({ ...rowData });
    }
    modal.confirm({
      title: action,
      icon: <></>,
      centered: true,
      width: "40%",
      type: "confirm",
      content: <EmployeeForm form={form} />,
      onOk: () => onSubmit(action),
    });
  };

  const onDeleteDataClick = async (id: string) => {
    const res = await delEmployee(id);
    if (res.id) {
      fetch();
      openNotificationWithIcon("success", "Success", res.message);
    } else {
      openNotificationWithIcon("error", "Error", res.message);
    }
  };

  const onSubmit = async (action: "Edit" | "Add") => {
    let res = undefined;

    if (action === "Add") {
      res = await createEmployee(form.getFieldsValue());
    } else {
      res = await updateEmployee(form.getFieldsValue());
    }

    if (res.id) {
      fetch();
      openNotificationWithIcon("success", "Success", res.message);
    } else {
      openNotificationWithIcon("error", "Error", res.message);
    }
  };

  const openNotificationWithIcon = (
    type: NotificationType,
    title: string,
    message: string
  ) => {
    notifi[type]({
      message: title,
      description: message,
    });
  };

  const handleExport = async () => {
    const res = await exportFile(filterValues);
    if (res?.message) {
      openNotificationWithIcon("error", "Error", res.message);
    }
  };

  return (
    <>
      {modalcontextHolder}
      {notifiContextHolder}
      <div style={{ padding: 10, display: "flex", flexDirection: "column" }}>
        <div style={{ padding: 10, display: "flex", justifyContent: "end" }}>
          <Button
            onClick={() => {
              onEditDataClick("Add");
            }}
          >
            เพิ่มพนักงาน
          </Button>
          <Button onClick={() => handleExport()}>โหลดข้อมูล</Button>
        </div>
        <Table dataSource={empData} columns={columns} />
      </div>
    </>
  );
};

export default Home;
